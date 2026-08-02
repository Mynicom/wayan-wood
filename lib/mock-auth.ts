import { cookies } from "next/headers";
import { mockUsers } from "@/lib/mock-data/users";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const COOKIE_NAME = "auth-user";

export function encodeAuthCookie(user: AuthUser): string {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}

export function decodeAuthCookie(value: string): AuthUser | null {
  try {
    return JSON.parse(Buffer.from(value, "base64").toString());
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME)?.value;
  if (!authCookie) return null;
  return decodeAuthCookie(authCookie);
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function requireSuperAdmin(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== "super_admin") {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) return null;

  if (password !== "password123") return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? "",
    role: user.role,
  };
}
