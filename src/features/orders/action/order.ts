'use server'

import { createOrder } from "../db/order"


export const checkoutAction = async (formDaat: FormData) => {
    const data = {
        address: formDaat.get('address') as string,
        phone: formDaat.get('phone') as string,
        note: formDaat.get('note') as string,
        useProfileData : formDaat.get('use-profile-data') as string
    }

    await createOrder(data)

}

