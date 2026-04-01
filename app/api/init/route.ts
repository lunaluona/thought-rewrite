import { NextResponse } from "next/server";
import { initSchema } from "@/lib/db";

export async function GET() {
  try {
    await initSchema();
    return NextResponse.json({ ok: true, message: "Schema initialized successfully" });
  } catch (err) {
    console.error("Init error:", err);
    return NextResponse.json({ error: "Failed to initialize schema" }, { status: 500 });
  }
}
