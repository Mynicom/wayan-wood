import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const session = await auth();
    if (!session?.user) return null;
    return {
      user: {
        id: session.user.id || "",
        email: session.user.email || "",
        name: session.user.name || "",
        role: (session.user as any).role || "admin",
      },
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthSession> {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function requireSuperAdmin(): Promise<AuthSession> {
  const session = await requireAuth();
  if (session.user.role !== "super_admin") {
    throw new Error("FORBIDDEN");
  }
  return session;
}
