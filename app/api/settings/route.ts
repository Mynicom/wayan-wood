import { NextRequest, NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/mock-auth";
import { SettingsSchema } from "@/lib/validations";
import { getSettings, updateSettings } from "@/lib/services/settings";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireSuperAdmin();
    const body = await request.json();
    const parsed = SettingsSchema.parse(body);

    const settings = await updateSettings(parsed as any);

    return NextResponse.json(settings);
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error?.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Hanya super admin yang bisa mengubah settings" }, { status: 403 });
    }
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validasi gagal", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
