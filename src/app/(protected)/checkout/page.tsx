import { authCheck } from "@/features/auths/db/auths"
import CheckoutForm from "@/features/orders/components/checkout-form"
import { redirect } from "next/navigation"


const CheckoutPage = async () => {
    const user = await authCheck()
    if(!user){
        redirect('/auth/signin') 
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">ชำระเงิน</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CheckoutForm user={user} />
                </div>
                <div className="lg:col-s">
                    xxx
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage