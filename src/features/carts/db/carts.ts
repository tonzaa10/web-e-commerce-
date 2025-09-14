import { redirect } from "next/navigation";
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag,
} from 'next/cache'
import { getCartTag, revalidateCartCache } from "./cache";
import { db } from "@/lib/db";

import { authCheck } from "@/features/auths/db/auths";
import { canUpdateUserCart } from "../permissions/cart";

interface AddToCartInput {
    productId: string;
    count: number;
}

export const getUserCart = async (userId: string | null) => {

    'use cache'

    if (!userId) {
        redirect('/auth/signin')
    }
    cacheLife('hours')
    cacheTag(getCartTag(userId))


    try {
        const cart = await db.cart.findFirst({
            where: {
                orderedById: userId
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                category: true,
                            }
                        }
                    }
                }
            }
        })

        if (!cart) return null;

        const cartWithDetails = {
            ...cart,
            items: cart.products.map((item) => {
                const mainImage = item.product.images.find((image) => image.isMain)

                return {
                    id: item.id,
                    count: item.count,
                    price: item.price,
                    product: {
                        ...item.product,
                        mainImage: mainImage || null,
                        lowStock: 5,
                        sku: item.product.id.substring(0, 8).toLowerCase()
                    }

                }
            }),

            itemCount: cart.products.reduce((sum, item) => sum + item.count, 0)
        }

        return cartWithDetails;

    } catch (error) {
        console.error('Error getting user cart:', error)
        return null
    }
};

export const getCartItemCount = async (userId: string | null) => {

    'use cache'

    if (!userId) {
        redirect('/auth/signin')
    }
    cacheLife('hours')
    cacheTag(getCartTag(userId))

    try {
        const cart = await db.cart.findFirst({
            where: {
                orderedById: userId
            },
            include: {
                products: true,
            }
        })

        if (!cart) return 0

        return cart.products.reduce((sum, item) => sum + item.count, 0)

    } catch (error) {
        console.error('Error getting cart item count :', error)
        return 0
    }
}

const recalculateCartTotal = async (cartId: string) => {
    const cartItems = await db.cartItem.findMany({
        where: { cartId },
    })

    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0)
    await db.cart.update({
        where: { id: cartId },
        data: { cartTotal }
    })
}

export const addToCart = async (input: AddToCartInput) => {

    const user = await authCheck()
    if (!user || !canUpdateUserCart(user)) {
        redirect('/auth/signin')
    }

    try {

        const product = await db.product.findUnique({
            where: {
                id: input.productId,
                status: 'Active'
            }
        })

        if (!product) {
            return {
                message: 'ไม่มีสินค้าหรือไม่จำหน่าย'
            }
        }

        if (product.stock < input.count) {
            return {
                message: 'สต๊อกสินค้าไม่เพียงพอ'
            }
        }

        let cart = await db.cart.findFirst({
            where: {
                orderedById: user.id,
            }
        });

        if (!cart) {
            cart = await db.cart.create({
                data: {
                    cartTotal: 0,
                    orderedById: user.id,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                },
            })
        }

        const existingProduct = await db.cartItem.findFirst({
            where:{
                cartId: cart.id,
                productId: product.id
            }
        })

        if(existingProduct){
            await db.cartItem.update({
                where: {
                    id: existingProduct.id,

                },
                data: {
                    count: existingProduct.count + input.count,
                    price: (existingProduct .count + input.count) * product.price
                }
            })
        } else {
            await db.cartItem.create ({
                data: {
                    count: input.count,
                    price: product.price * input.count,
                    cartId: cart.id,
                    productId: product.id 
                }
            })
        }

        await recalculateCartTotal(cart.id)

        revalidateCartCache(user.id)

    } catch (error) {
        console.error('Error adding to cart:', error)
        return {
            message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้าในตะกร้า'
        }
    }
}
