import { NextRequest, NextResponse } from "next/server";
import { OrderSchema } from "@/lib/validations";
import { findManyOrders, countOrders, createOrder } from "@/lib/services/orders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      findManyOrders({
        where,
        include: { items: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      countOrders(where),
    ]);

    return NextResponse.json({
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = OrderSchema.parse(body);

    const order = await createOrder({
      customerName: parsed.customerName,
      email: parsed.email,
      phone: parsed.phone,
      address: parsed.address,
      notes: parsed.notes,
      items: parsed.items,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
