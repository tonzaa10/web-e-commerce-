import Footer from "@/components/customer-page/footer/page";
import HeaderCustomer from "@/components/customer-page/headers/header";
import { authCheck } from "@/features/auths/db/auths";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
    const user = await authCheck();
    return (
        <div className="min-h-svh flex flex-col ">
            <HeaderCustomer user={user} />
            <main className="pt-16">{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
