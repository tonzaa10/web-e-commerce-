import { db } from "@/lib/db";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { getCategoryGlobalTag, revalidateCategoryCache } from "./cache";
import { categorySchema } from "@/features/categories/schemas/categories";
import { authCheck } from "@/features/auths/db/auths";
import { canCreateCategory, canUpdateCategory } from "@/features/categories/permissions/categories";
import { redirect } from "next/navigation";

interface CreateCategoryInput  {
  name: string;
}

interface UpdateCategoryInput {
  id: string;
  name: string;
}

export const getCategoies = async () => {
  "use cache";

  cacheLife("days");
  cacheTag(getCategoryGlobalTag());

  try {
    return await db.category.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  } catch (error) {
    console.error("Error getting categories data :", error);
    return [];
  }
};

export const createCategory = async (input: CreateCategoryInput) => {
  const user = await authCheck();

  if (!user || !canCreateCategory(user)) {
    redirect("/");
  }

  try {
    const { success, data, error } = categorySchema.safeParse(input);

    if (!success) {
      return {
        message: "Please enter valid data",
        error: error.flatten().fieldErrors,
      };
    }

    // Check Category already exists from ddatabase
    const category = await db.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        message: "A category with this name already exists",
      };
    }

    // Create new category
    const newCategory = await db.category.create({
      data: {
        name: data.name,
      },
    });

    revalidateCategoryCache(newCategory.id);
  } catch (error) {
    console.error("Error ccreating new category :", error);
    return {
      message: "Someting went worng. Please try again later",
    };
  }
};

export const updateCategory = async (input: UpdateCategoryInput) => {
  const user = await authCheck();

  if (!user || !canUpdateCategory(user)) {
    redirect("/");
  }

  try {
    const { success, data, error } = categorySchema.safeParse(input);
    if (!success) {
      return {
        message: "Please enter valid data",
        error: error.flatten().fieldErrors,
      };
    }

    // Check if category exists
    const existsingCategory = await db.category.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!existsingCategory) {
      return {
        message: "Category not found",
      };
    }

    // Check if another category with the same name exists
    const duplicateCategory = await db.category.findFirst({
      where: {
        name: data.name,
        id: {
          not: input.id,
        },
      },
    });

    if (duplicateCategory) {
      return {
        message: "A category with this name already exists",
      };
    }

    // Update category
    const updatedCategory = await db.category.update({
      where: {
        id: input.id,
      },
      data: {
        name: data.name,
      },
    });

    revalidateCategoryCache(updatedCategory.id);
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      message: "Something went wrong. Please try again later",
    };
  }
};
