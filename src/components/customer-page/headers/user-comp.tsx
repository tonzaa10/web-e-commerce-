"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { useSignOut } from "@/hooks/use-sign-out";
import { Loader2 } from "lucide-react";
import { UserType } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface UserCompProps {
  user: UserType;
}

export const AuthButtons = () => (
  <div className="flex justify-center items-center gap-3">
    <Button size="lg" asChild>
      <SheetClose asChild>
        <Link href="/auth/signup">ลงทะเบียน</Link>
      </SheetClose>
    </Button>
    <Button size="lg" variant="outline" asChild>
      <SheetClose asChild>
        <Link href="/auth/signin">เข้าสู่ระบบ</Link>
      </SheetClose>
    </Button>
  </div>
);

export const SignoutButton = () => {
  const { isPanding, handleSignout } = useSignOut();
  return (
    <SheetClose asChild>
      <Button
        variant="destructive"
        size="lg"
        disabled={isPanding}
        onClick={handleSignout}
      >
        {isPanding ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          "ออกจากระบบ"
        )}
      </Button>
    </SheetClose>
  );
};

export const UserAvatar = ({ user }: UserCompProps) => (
  <div className="px-4">
    <Card className="border-primary/20">
      <CardContent className="flex flex-col items-center gap-3">
        {/* Picture */}
        <Image
          alt={user.name || "Profiloe"}
          src={user.picture || "/images/no-user-image.webp"}
          width={128}
          height={128}
          className="rounded-full border-2 border-primary object-cover"
        />

        {/* Name & Email */}
        <h2 className="text-xl font-semibold">
            {user.name || user.email}
        </h2>
      </CardContent>
    </Card>
  </div>
);
