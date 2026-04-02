import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export interface ThoughtAnalysis {
  emotion: string;
  cognitive_bias: string;
  reframe: string;
  micro_action: string;
  reflection_question: string;
}

function buildPrompt(lang: "zh" | "en"): string {
  if (lang === "en") {
    return `You are a warm mental growth coach helping users reframe negative thoughts.

Steps:
1. Identify the emotion (short phrase, e.g. "anxious", "hopeless")
2. Identify the cognitive distortion (e.g. "catastrophizing", "overgeneralizing")
3. Reframe the thought from a healthier perspective
4. Suggest one small action completable in 5 minutes
5. Offer a reflective question for self-insight

Rules:
- Warm, encouraging tone — like a supportive friend
- Avoid clinical jargon
- Reply ONLY in English
- Keep the micro-action simple, specific, and doable

Return ONLY valid JSON, no markdown or explanation:
{
  "emotion": "",
  "cognitive_bias": "",
  "reframe": "",
  "micro_action": "",
  "reflection_question": ""
}`;
  }

  return `你是一位温暖的心理成长教练，帮助用户重新看待负面想法。

任务步骤：
1. 识别情绪（用简短的词语，如"焦虑"、"沮丧"）
2. 识别认知偏差（如"灾难化"、"以偏概全"）
3. 用更健康的视角重构这个想法
4. 建议一个5分钟内可以完成的微小行动
5. 提出一个促进自我洞察的反思问题

规则：
- 语气温暖、鼓励，像朋友一样
- 避免心理治疗术语
- 只用中文回复
- 微行动要简单、具体、易于执行

只返回 JSON，不要加 markdown 或任何说明。格式如下：
{
  "emotion": "",
  "cognitive_bias": "",
  "reframe": "",
  "micro_action": "",
  "reflection_question": ""
}`;
}

function detectLang(text: string): "zh" | "en" {
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  return chineseChars > 0 ? "zh" : "en";
}

export async function rewriteThought(thought: string): Promise<ThoughtAnalysis> {
  const lang = detectLang(thought);
  const completion = await client.chat.completions.create({
    model: "deepseek-chat",
    max_tokens: 512,
    messages: [
      { role: "system", content: buildPrompt(lang) },
      { role: "user", content: thought },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  // Strip markdown code fences if model wraps response in ```json ... ```
  const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  const parsed = JSON.parse(text) as ThoughtAnalysis;
  return parsed;
}
