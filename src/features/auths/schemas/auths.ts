import { z } from "zod";

// Define Contants
const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;
const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>';

//Define Error Message
const ERROR_MESSAGE = {
  name: `ซื้อต้องมีความยาวอย่างน้อย ${MIN_NAME_LENGTH} ตัวอักษร`,
  email: {
    format: "กรุณากรอกอีกเมลให้ถูกต้อง",
    domain: "อีเมลต้องเป็น Gmail, Hotmail, Outlook หรือ Yahoo",
  },
  password: {
    length: `รหัสผ่านต้องมีความยาวอย่างน้อย ${MIN_PASSWORD_LENGTH} ตัวอักษร`,
    uppercase: "รหัสผ่านต้องมีตัวอักรพิมพ์ใหญ่อย่างน้อง 1 ตัวอักษร",
    lowpercase: "รหัสผ่านต้องมีตัวอักรพิมพ์เล็กอย่างน้อง 1 ตัวอักษร",
    number: "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว",
    special: `รหัสผ่านต้องมีตัวอักขระพิเศษ ${SPECIAL_CHARS} อย่างน้อย 1 ตัว`,
  },
  confirmPassword: "รหัสผ่านไม่ตรงกัน",
};

//Define Valid Email Domin
const VALID_EMAIL = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

//Check Email
const isValidEmailDomain = (email: string) => {
  const domain = email ? email.split("@")[1].toLocaleLowerCase() : "";
  return VALID_EMAIL.includes(domain);
};

//Pssword Schema
const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, { message: ERROR_MESSAGE.password.length })
  .regex(/[A-Z]/, { message: ERROR_MESSAGE.password.uppercase })
  .regex(/[a-z]/, { message: ERROR_MESSAGE.password.lowpercase })
  .regex(/[0-9]/, { message: ERROR_MESSAGE.password.number })
  .regex(new RegExp(`[${SPECIAL_CHARS}]`), {
    message: ERROR_MESSAGE.password.special,
  });

//Main Signup Schema
export const signupSchema = z
  .object({
    name: z
      .string()
      .optional()
      .refine((name) => !name || name.length >= MIN_NAME_LENGTH, {
        message: ERROR_MESSAGE.name,
      }),

    email: z
      .string()
      .email({ message: ERROR_MESSAGE.email.format })
      .refine((email) => isValidEmailDomain(email), {
        message: ERROR_MESSAGE.email.domain,
      }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGE.confirmPassword,
    path: ["confirmPassword"],
  });

//Main Signin Schema
export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: ERROR_MESSAGE.email.format })
    .refine((email) => isValidEmailDomain(email), {
      message: ERROR_MESSAGE.email.domain,
    }),
  password: passwordSchema,
});
