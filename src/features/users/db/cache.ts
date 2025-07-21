import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

// Get user global tag
export const getUserGlobalTag = () => {
    return  getGlobalTag("users")
}


// Get user id tag
export const getUserIdTag = (id: string) => {
    return getIdTag('users', id)
}

export const revalidateUserCache = async (id: string) => {
    revalidateTag(await getUserGlobalTag())
    revalidateTag(await getUserIdTag(id))
}