import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const SidebarLink = ({ label, href, icon, isActive }: SidebarLinkProps) => {
  return (
    <Button variant={isActive ? "secondary" : "ghost"} asChild>
      <Link
        href={href}
        className={cn(
          "w-full justify-start gap-x-3",
          isActive
            ? "font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarLink;
