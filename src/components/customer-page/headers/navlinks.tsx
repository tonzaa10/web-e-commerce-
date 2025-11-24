import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

const NAV_LINKS = [
  { title: "หน้าหลัก", href: "/" },
  { title: "สินค้าทั้งหมด", href: "/products" },
  { title: "เกี่ยวกับเรา", href: "/about" },
  { title: "ติดต่อเรา", href: "/contact" },
];

export const MobileNavLinks = () => (
  <div className="flex flex-col gap-2">
    {NAV_LINKS.map((link, index) => (
      <SheetClose key={index} asChild>
        <Button variant="secondary" size="lg" asChild>
          <Link href={link.href}>{link.title}</Link>
        </Button>
      </SheetClose>
    ))}
  </div>
);

export const DesktopNavLinks = () => (
  <div className="flex items-center gap-1">
    {NAV_LINKS.map((link, index) => (
      <Button key={index} variant="ghost" size="sm" asChild>
        <Link href={link.href}>{link.title}</Link>
      </Button>
    ))}
  </div>
);

export const FooterNavLinks = () => (
  <div className="flex items-center gap-1">
    <ul className="flex flex-col gap-2">
      {NAV_LINKS.map((link, index) => (
        <li key={index} className=""> <Link href={link.href} className="hover:text-purple-500 transition-all duration-200">{link.title}</Link></li>
      ))}
    </ul>
  </div>
)

