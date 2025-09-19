import z from "zod";

const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRDSS_LENGTH = 255;
const PHONE_LENGTH = 10;
const PHONE_REGEX = /^((06|08|09)[0-9]{8})$/;


const ERROR_MESSAGE = {
    address: {
        min: `ที่อยู่ต้องมีความยาวอย่างน้อย ${MIN_ADDRESS_LENGTH} ตัวอักษร`,
        max: `ที่อยู่ต้องมีความยาวไม่เกิน ${MAX_ADDRDSS_LENGTH} ตัวอักษร`
    },
    phone: {
        length: `เบอร์โทรศัพท์ต้องมี ${PHONE_LENGTH} หลัก`,
        regex: 'เบอร์โทรศัพท์ไม่ถูกต้อง'
    }
}

export const checkoutSchem = z.object({
    address: z
        .string()
        .min(MIN_ADDRESS_LENGTH, { message: ERROR_MESSAGE.address.min })
        .max(MAX_ADDRDSS_LENGTH, { message: ERROR_MESSAGE.address.max }),

    phone: z
        .string()
        .min(PHONE_LENGTH, { message: ERROR_MESSAGE.phone.length })
        .max(PHONE_LENGTH, { message: ERROR_MESSAGE.phone.length })
        .regex(PHONE_REGEX, { message: ERROR_MESSAGE.phone.regex }),

    note: z.string() .optional()

})