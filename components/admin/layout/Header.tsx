"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user as SessionUser | undefined;
  const userName = user?.name || "Admin";
  const userRole = user?.role || "Admin";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 bg-white border-b border-[#E7E3DD] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <Link href="/" className="text-gray-500 hover:text-[#1B1B1B] transition-colors" title="Back to Website">
          <Home className="w-5 h-5" />
        </Link>
        <h1 className="text-[#1B1B1B] text-[1.25rem] font-semibold truncate min-w-0">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-[0.875rem] font-medium text-[#1B1B1B]">{userName}</p>
          <Badge variant="outline" className="text-[0.6875rem] border-[#C89B5B] text-[#C89B5B]">
            {userRole}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer" />}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#C89B5B] text-white font-semibold">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/panel/login" })}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
