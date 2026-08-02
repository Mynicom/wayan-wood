import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/mock-auth";
import { ProductSchema } from "@/lib/validations";
import { findManyProducts, countProducts, createProduct } from "@/lib/services/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const isBestSeller = searchParams.get("isBestSeller");
    const isFeatured = searchParams.get("isFeatured");
    const search = searchParams.get("search");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };

    if (categoryId) {
      const cid = parseInt(categoryId);
      if (!isNaN(cid)) where.categoryId = cid;
    }
    if (isBestSeller === "true") where.isBestSeller = true;
    if (isFeatured === "true") where.isFeatured = true;
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim(), mode: "insensitive" } },
        { shortDescription: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const [products, total] = await Promise.all([
      findManyProducts({
        where,
        include: { category: true, images: true, dimensions: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      countProducts(where),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const parsed = ProductSchema.parse(body);
    const { dimensions, images, ...productData } = parsed;

    const existing = await findManyProducts({ where: { slug: productData.slug } });
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Slug produk sudah ada" },
        { status: 400 }
      );
    }

    const result = await createProduct({
      ...productData,
      dimensions: dimensions || undefined,
      images: images || [],
    });

    return NextResponse.json(result, { status: 201 });
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
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
