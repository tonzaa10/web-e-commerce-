import { db } from "@/lib/db";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { getProductGlobalTag } from "./cache";
import { createProductSchema } from "../schemas/products";
import { revalidateCategoryCache } from "@/features/categories/db/cache";
import { authCheck } from "@/features/auths/db/auths";
import { redirect } from "next/navigation";
import { canCreateProduct } from "../permissions/products";


interface CreateProductInput {
    title: string;
    description: string;
    cost?: number;
    basePrice: number;
    price: number;
    stock: number;
    categoryId: string;
}

export const getProducts = async () => {

    "use cache"

    cacheLife("hours")
    cacheTag(getProductGlobalTag());

    try {
        const products = await db.product.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
            },
        });

        return products.map((product) => ({
            ...product,
            lowStock: 5,
            sku: product.id.substring(0, 8).toUpperCase(),
        }))

    } catch (error) {
        console.error("Error getting products:", error);
        return [];
    }
};


export const createProduct = async (input: CreateProductInput) => {

    const user = await authCheck();
    if (!user || !canCreateProduct(user)) {
        redirect('/')
    }
    try {
        const { success, data, error } = createProductSchema.safeParse(input)

        if (!success) {
            return {
                message: "Please enter valid product information",
                error: error.flatten().fieldErrors
            }
        }

        //Check if categor esists
        const category = await db.category.findUnique({
            where: {
                id: data.categoryId,
                status: 'Active'
            }
        })

        if (!category) {
            return {
                message: "Selected category not found or inactive"
            }
        }

        //Create new product

        const newProduct = await db.product.create({
            data: {
                title: data.title,
                description: data.description,
                cost: data.cost,
                basePrice: data.basePrice,
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId,
            }
        })
        revalidateCategoryCache(newProduct.id);

    } catch (error) {
        console.error("Error createing product:", error)
        return {
            message: "Something went worng. Please try again later.",
        }
    }
}