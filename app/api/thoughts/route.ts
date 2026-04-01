import { NextResponse } from "next/server";
import { getThoughts } from "@/lib/db";

export async function GET() {
  try {
    const thoughts = await getThoughts();
    return NextResponse.json({ thoughts });
  } catch (err) {
    console.error("Thoughts fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch thoughts" }, { status: 500 });
  }
}
