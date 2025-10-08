import Link from "next/link";

interface AuthFooterProps {
  type: "signup" | "signin";
}

const authTextMap = {
  signup: {
    foterText: "มีบัญชีอยู่แล้ว?",
    linkText: "เข้าสู่ระบบ",
    linkHref: "/auth/signin",
  },
  signin: {
    foterText: "ยังไม่มีบัญชี",
    linkText: "สมัครสมาชิก",
    linkHref: "/auth/signup",
  },
};

const AuthFooter = ({ type }: AuthFooterProps) => {
  const { foterText, linkText, linkHref } = authTextMap[type];
  return (
    <div className="text-center">
      <p className="text-accent-foreground">
        {foterText}{" "}
        <Link className="text-primary hover:underline" href={linkHref}>
          {linkText}
        </Link>
      </p>
      {type === "signin" &&(
        <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary hover:underline">ลืมรหัสผ่าน</Link>
      )}
    </div>
  );
};

export default AuthFooter;
