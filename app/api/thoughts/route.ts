import { NextResponse } from "next/server";
import { getThoughts } from "@/lib/db";
import { getDeviceId } from "@/lib/device";

export async function GET() {
  try {
    const userId = await getDeviceId();
    if (!userId) return NextResponse.json({ thoughts: [] });
    const thoughts = await getThoughts(userId);
    return NextResponse.json({ thoughts });
  } catch (err) {
    console.error("Thoughts fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch thoughts" }, { status: 500 });
  }
}
