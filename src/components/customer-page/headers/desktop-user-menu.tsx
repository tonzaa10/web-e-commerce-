import { UserType } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SignoutButton, UserAvatarSmall, UserDropdownAvatar } from "./user-comp";

interface DesktopUserMenuProps {
  user: UserType;
}

const DesktopUserMenu = ({ user }: DesktopUserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <UserAvatarSmall user={user}/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={4} className="w-56">
        <DropdownMenuLabel className="flex flex-col items-center gap-2">
          <UserDropdownAvatar user={user}/>
          <span>สวัสดี {user.name || user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">โปรไฟล์ของฉัน</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/cart">
            <span>ตะกร้าของฉัน</span>
            <Badge className="ml-auto bg-primary/50">0</Badge>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/my-oders">ประวัติการสั่งซื้อ</Link>
        </DropdownMenuItem>

        {user.role === "Admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin">หลังบ้าน</Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator/>
        <div>
            <SignoutButton/>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopUserMenu;
