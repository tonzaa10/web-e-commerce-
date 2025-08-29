import z from "zod";
import { de } from "zod/v4/locales";

// Define Constants
const MIN_TITLE_LENGTH = 3;
const MIN_DESC_LENGTH = 10;

// Define Error Message

const ERROR_MESSAGES = {
    title: `Product tite must be at least ${MIN_TITLE_LENGTH} characters.`,
    description: `Product description must be at least ${MIN_DESC_LENGTH} characters.`,
    categoryId: "Category is required.",
    basePrice: "Base price must be a positive number.",
    price: "Sale price must be a positive number.",
    stock: "Stock price must be a positive number.",
}


// Careate Product Schema

export const createProductSchema = z.object({
    title: z.string().min(MIN_TITLE_LENGTH, { message: ERROR_MESSAGES.title }),

    description: z.string().min(MIN_DESC_LENGTH, { message: ERROR_MESSAGES.description }),

    categoryId: z.string().min(1,{ message: ERROR_MESSAGES.categoryId }),

    cost: z.coerce.number().nonnegative().nonoptional(),

    basePrice: z.coerce.number().positive({ message: ERROR_MESSAGES.basePrice}),

    price: z.coerce.number().positive({ message: ERROR_MESSAGES.price}),

    stock: z.coerce.number().nonnegative({ message: ERROR_MESSAGES.stock}),


})