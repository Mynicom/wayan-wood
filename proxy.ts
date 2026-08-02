import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeAuthCookie } from "@/lib/mock-auth";

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get("auth-user")?.value;
  const isLoggedIn = authCookie ? !!decodeAuthCookie(authCookie) : false;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/panel/login";

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/panel/login", request.url));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/panel/login"],
};
