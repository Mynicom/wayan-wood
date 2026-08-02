import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateCredentials, encodeAuthCookie } from "@/lib/mock-auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = validateCredentials(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("auth-user", encodeAuthCookie(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ user });
}
