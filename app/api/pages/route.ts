import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/mock-auth";
import { PageSchema } from "@/lib/validations";
import { findManyPages, createPage, findUniquePage } from "@/lib/services/pages";

export async function GET() {
  try {
    const pages = await findManyPages();
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = PageSchema.parse(body);

    const existing = await findUniquePage({ slug: parsed.slug });
    if (existing) {
      return NextResponse.json(
        { error: "Slug halaman sudah ada" },
        { status: 400 }
      );
    }

    const page = await createPage(parsed);

    return NextResponse.json(page, { status: 201 });
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
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
