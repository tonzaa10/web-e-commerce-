
import { UserType } from "@/types/user";

export const canCreateOrder = (user: UserType) =>{
    return user.status === 'Active';
}

export const canCancelOrder = (user:UserType) => {
   return user.status === 'Active';
}

export const canUpdaeStatusOrer = (user:UserType) => {
    return user.role === 'Admin';
}