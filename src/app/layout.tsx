import "./globals.css";

import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Web Store | E-Commerce Workshop",
    template: "%s | E-Commerce Workshop",
  },
  description:
    "ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้าไอทีครบวงจร พร้อมบริการจัดส่งเร็วและราคาคุ้มค่า!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster/>
      </body>
    </html>
  );
};
export default RootLayout;
