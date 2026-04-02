import { NextRequest, NextResponse } from "next/server";
import { rewriteThought } from "@/lib/ai";
import { saveThought } from "@/lib/db";
import { getDeviceId } from "@/lib/device";

export async function POST(req: NextRequest) {
  try {
    const userId = await getDeviceId();
    if (!userId) {
      return NextResponse.json({ error: "Device not identified" }, { status: 400 });
    }

    const { thought } = (await req.json()) as { thought: string };
    if (!thought || thought.trim().length === 0) {
      return NextResponse.json({ error: "Thought is required" }, { status: 400 });
    }

    const analysis = await rewriteThought(thought.trim());

    const record = await saveThought(userId, {
      thought_text: thought.trim(),
      emotion: analysis.emotion,
      cognitive_bias: analysis.cognitive_bias,
      reframe_text: analysis.reframe,
      micro_action: analysis.micro_action,
      reflection_question: analysis.reflection_question,
    });

    return NextResponse.json({
      id: record.id,
      emotion: analysis.emotion,
      cognitive_bias: analysis.cognitive_bias,
      reframe: analysis.reframe,
      micro_action: analysis.micro_action,
      reflection_question: analysis.reflection_question,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Rewrite error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
