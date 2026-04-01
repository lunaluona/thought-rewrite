import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasKey: !!process.env.MOONSHOT_API_KEY,
    keyPrefix: process.env.MOONSHOT_API_KEY?.slice(0, 10) ?? "NOT FOUND",
    hasDb: !!process.env.DATABASE_URL,
  });
}
