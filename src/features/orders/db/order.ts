import { authCheck } from "@/features/auths/db/auths";
import { redirect } from "next/navigation";
import { canCreateOrder } from "../permissions/orders";
import { checkoutSchema } from "../schemas/orders";
import { db } from "@/lib/db";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { it } from "node:test";
import { clearCart } from "@/features/carts/db/carts";
import { revalidateOrderCache } from "./cache";

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
                message: "ตะกร้าสินค้าว่างเปล่า ไม่สามารถสร้างคำสั่งซื้อได้",
            };
        }

        const shippingFee = 50; // Free shipping

        const orderNumber = generateOrderNumber();

        const totalAmount = cart.cartTotal + shippingFee;

        //Order creation with transaction
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
                },
            });
            //Order Items creation
            for (const item of cart.products) {
                const product = await prisma.product.findUnique({
                    where: { id: item.id },
                    include: {
                        images: true,
                    },
                });
                if (!product || product.stock < item.count) {
                    throw new Error(`สินค้า: ${product?.title} มีจำนวนไม่เพียงพอ`);
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
                    },
                });

                //Update product stock
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        sold: product.sold + item.count,
                        stock: product.stock - item.count,
                    }
                })
            }
            return order;
        });

        if (!newOrder) {
            return {
                message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ กรุณาลองใหม่ในภายหลัง',
            }
        }

        await clearCart()

        revalidateOrderCache(newOrder.id, newOrder.customerId);

        return {
            orderID: newOrder.id,
        }

    } catch (error) {
        console.error("Error creating order:", error);
        return {
            message: "เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ กรุณาลองใหม่ในภายหลัง",
        };
    }
};
