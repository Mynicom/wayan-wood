import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-api";
import { CategorySchema } from "@/lib/validations";
import { findManyCategoriesWithCount, createCategory, findUniqueCategory } from "@/lib/services/categories";

export async function GET() {
  try {
    const categories = await findManyCategoriesWithCount();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = CategorySchema.parse(body);

    const existing = await findUniqueCategory({ slug: parsed.slug });
    if (existing) {
      return NextResponse.json(
        { error: "Slug kategori sudah ada" },
        { status: 400 }
      );
    }

    const category = await createCategory(parsed);

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
