import { authCheck } from "@/features/auths/db/auths";
import { redirect } from "next/navigation";
import { canCreateOrder } from "../permissions/orders";
import { checkoutSchema } from "../schemas/orders";
import { db } from "@/lib/db";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { clearCart } from "@/features/carts/db/carts";
import { getOrderIdTag, revalidateOrderCache } from "./cache";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import formatData from "@/lib/formatDate";

interface CheckoutInput {
  address: string;
  phone: string;
  note?: string;
  useProfileData?: string;
}

export const createOrder = async (input: CheckoutInput) => {
  const user = await authCheck();

  if (!user || !canCreateOrder(user)) {
    redirect("/auth/signin");
  }

  try {
    const useProfileData = input.useProfileData === "on";

    if (useProfileData && user.address && user.tel) {
      input.address = user.address;
      input.phone = user.tel;
    }

    const { success, data, error } = checkoutSchema.safeParse(input);

    if (!success) {
      return {
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
        error: error.flatten().fieldErrors,
      };
    }

    const cart = await db.cart.findFirst({
      where: { orderedById: user.id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.products.length === 0) {
      return {
        message: "ไม่มีสินค้าในตะกร้า",
      };
    }

    const shippingFee = 50;

    const orderNumber = generateOrderNumber();

    const totalAmount = cart.cartTotal + shippingFee;

    // สร้างคำสั่งซื้อใหม่
    const newOrder = await db.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          totalAmount,
          status: "Pending",
          address: data.address,
          phone: data.phone,
          note: data.note,
          shippingFee,
          customerId: user.id,
          updatedAt: new Date(),
        },
      });

      for (const item of cart.products) {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
          include: {
            images: true,
          },
        });

        if (!product || product.stock < item.count) {
          throw new Error(`สินค้า ${product?.title} มีไม่เพียงพอ`);
        }

        const mainImage = product.images.find((image) => image.isMain);

        await prisma.orderItem.create({
          data: {
            quantity: item.count,
            price: product.price,
            totalPrice: item.price,
            productTitle: product.title,
            productImage: mainImage?.url || null,
            orderId: order.id,
            productId: item.productId,
            updatedAt: new Date(),
          },
        });

        await prisma.product.update({
          where: {
            id: item.productId,
          },
          data: {
            sold: product.sold + item.count,
            stock: product.stock - item.count,
          },
        });
      }

      return order;
    });

    if (!newOrder) {
      return {
        message: "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ",
      };
    }

    await clearCart();

    revalidateOrderCache(newOrder.id, newOrder.customerId);

    return {
      orderId: newOrder.id,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ กรุณาลองใหม่ในภายหลัง",
    };
  }
};

export const getOrderById = async (userId: string, orderId: string) => {
  "use cache";
  if (!userId) {
    redirect("/auth/signin");
  }
  cacheLife("minutes");
  cacheTag(getOrderIdTag(orderId));

  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              include: {
                category: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    const items = order.items.map((item) => {
      const mainImage = item.product.images.find((image) => image.isMain);

      return {
        ...item,
        product: {
          ...item.product,
          mainImage,
          lowStock: item.product.id.substring(0, 8).toUpperCase()
        }
      }
    })

    return {
      ...order,
      items,
      createAtFormatted: formatData(order.createdAt),
      paymentAtFormatted: order.paymentAt ? formatData(order.paymentAt) : null,
    }

  } catch (error) {
    console.error(`Error getting order ${orderId}`, error);
  }
};
