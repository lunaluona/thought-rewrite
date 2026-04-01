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

const SYSTEM_PROMPT = `你是一位温暖的心理成长教练，帮助用户重新看待负面想法。

任务步骤：
1. 识别情绪（用简短的词语，如"焦虑"、"沮丧"）
2. 识别认知偏差（如"灾难化"、"以偏概全"）
3. 用更健康的视角重构这个想法
4. 建议一个5分钟内可以完成的微小行动
5. 提出一个促进自我洞察的反思问题

规则：
- 语气温暖、鼓励，像朋友一样
- 避免心理治疗术语
- 所有回复必须使用中文
- 微行动要简单、具体、易于执行

只返回 JSON，不要加 markdown 或任何说明。格式如下：
{
  "emotion": "",
  "cognitive_bias": "",
  "reframe": "",
  "micro_action": "",
  "reflection_question": ""
}`;

export async function rewriteThought(thought: string): Promise<ThoughtAnalysis> {
  const completion = await client.chat.completions.create({
    model: "deepseek-chat",
    max_tokens: 512,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: thought },
    ],
  });

  const text = completion.choices[0]?.message?.content ?? "";
  const parsed = JSON.parse(text.trim()) as ThoughtAnalysis;
  return parsed;
}
