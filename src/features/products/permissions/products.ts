import { UserType } from "@/types/user";

export const canCreateProduct = (user: UserType) => {
  return user.role === "Admin";
};

export const canUpdaeProduct = (user: UserType) => {
  return user.role === "Admin";
};