import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireSuperAdmin } from "@/lib/auth-api";
import { UserSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { findManyUsers, createUser, findUniqueUser } from "@/lib/services/users";

export async function GET() {
  try {
    await requireAuth();
    const users = await findManyUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();
    const body = await request.json();
    const parsed = UserSchema.parse(body);

    if (!parsed.password) {
      return NextResponse.json(
        { error: "Password wajib diisi untuk user baru" },
        { status: 400 }
      );
    }

    const existingUser = await findUniqueUser({ email: parsed.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const user = await createUser({
      name: parsed.name || null,
      email: parsed.email,
      password: hashedPassword,
      role: parsed.role,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error?.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Hanya super admin yang bisa membuat user" }, { status: 403 });
    }
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
