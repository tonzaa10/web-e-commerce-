'use server'

import { createOrder } from "../db/order"


export const checkoutAction = async (formData: FormData) => {
  const data = {
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    note: formData.get("note") as string,
    useProfileData: formData.get("use-profile-data") as string,
  };

    await createOrder(data)

}

