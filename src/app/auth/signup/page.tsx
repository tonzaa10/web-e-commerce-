import AuthForm from "@/features/auths/components/auth-form";
import AuthHeader from "@/features/auths/components/auth-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description:
    "ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้าไอทีครบวงจร พร้อมบริการจัดส่งเร็วและราคาคุ้มค่า!",
};

const SignupPage = () => {
  const type = "signup";

  return (
    <div>
      <AuthHeader type={type}>
        <AuthForm type={type} />
      </AuthHeader>
    </div>
  );
};

export default SignupPage;
