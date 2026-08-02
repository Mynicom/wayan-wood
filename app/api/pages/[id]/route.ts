import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-api";
import { PageSchema } from "@/lib/validations";
import { findUniquePage, updatePage, deletePage } from "@/lib/services/pages";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = parseInt(id);
    if (isNaN(pageId)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 });
    }

    const page = await findUniquePage({ id: pageId });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const pageId = parseInt(id);
    if (isNaN(pageId)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = PageSchema.partial().parse(body);

    if (parsed.slug) {
      const existing = await findUniquePage({ slug: parsed.slug });
      if (existing && existing.id !== pageId) {
        return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 400 });
      }
    }

    const page = await updatePage(pageId, parsed);

    return NextResponse.json(page);
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
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const pageId = parseInt(id);
    if (isNaN(pageId)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 });
    }

    const page = await findUniquePage({ id: pageId });
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    await deletePage(pageId);

    return NextResponse.json({ message: "Page deleted" });
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
