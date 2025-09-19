import { authCheck } from "@/features/auths/db/auths";
import { redirect } from "next/navigation";
import { canCreateOrder } from "../permissions/orders";

interface CheckoutInput {
    address: string;
    phone: string;
    note?: string;
    useProfileData?: string;

}

export const createOrder = async (input: CheckoutInput) => {
    
    const user = authCheck()

    if (!user || !canCreateOrder(user)) {
        redirect('/auth/signin')
    }

    try {
        const userProfileData = input.useProfileData === 'on'

        if(userProfileData && user.address && user.tel){
            input.address = user.address;
            input.phone = user.tel
        }

    } catch (error) {
        console.error('Error creating order:', error)
        return {
            message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง'
        }
    }

}