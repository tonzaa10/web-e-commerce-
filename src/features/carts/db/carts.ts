import { redirect } from "next/navigation";
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag,
} from 'next/cache'
import { getCartTag } from "./cache";
import { db } from "@/lib/db";

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
