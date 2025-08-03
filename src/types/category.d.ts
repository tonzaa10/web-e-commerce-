import {Category} from "@prisma/client"


export type Category = Omit<Category, 'createdAT', 'updatedAt'>