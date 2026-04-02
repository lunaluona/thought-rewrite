import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";
import { getDeviceId } from "@/lib/device";

export async function GET() {
  try {
    const userId = await getDeviceId();
    if (!userId) return NextResponse.json({ total: 0, streak: 0, topEmotion: null, topBias: null });
    const stats = await getStats(userId);
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Stats fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
