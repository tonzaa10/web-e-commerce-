import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";


export const getProductGlobagTag = () => {
    return getGlobalTag('products');

}

export const getProductIdTag = (id :string) => {
    return getIdTag('products', id);
}

export const revalidateProductCache = (id:string) => {
    revalidateTag(getProductGlobagTag());
    revalidateTag(getProductIdTag(id));
}