import { authCheck } from "@/features/auths/db/auths";
import { redirect } from "next/navigation";
import HeaderCustomer from "@/components/customer-page/headers/header";


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {

  const user = await authCheck();

  if (user) {
    redirect('/'); // Redirect to home if user is authenticated
  }


  return (
    <>
      <div className="flex flex-col justify-center min-h-svh">
        <HeaderCustomer user={null} />
        <main>{children}</main>
      </div>
    </>
  );
};

export default AuthLayout;
