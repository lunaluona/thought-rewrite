import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export interface ThoughtRecord {
  id: string;
  user_id: string;
  thought_text: string;
  emotion: string;
  cognitive_bias: string;
  reframe_text: string;
  micro_action: string;
  reflection_question: string;
  created_at: string;
}

export async function initSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS thoughts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID,
      thought_text TEXT,
      emotion TEXT,
      cognitive_bias TEXT,
      reframe_text TEXT,
      micro_action TEXT,
      reflection_question TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    INSERT INTO users (id, email) VALUES
      ('00000000-0000-0000-0000-000000000001', 'mock@user.com')
    ON CONFLICT DO NOTHING
  `;
}

export async function saveThought(data: {
  thought_text: string;
  emotion: string;
  cognitive_bias: string;
  reframe_text: string;
  micro_action: string;
  reflection_question: string;
}): Promise<ThoughtRecord> {
  const rows = await sql`
    INSERT INTO thoughts (user_id, thought_text, emotion, cognitive_bias, reframe_text, micro_action, reflection_question)
    VALUES (
      ${MOCK_USER_ID},
      ${data.thought_text},
      ${data.emotion},
      ${data.cognitive_bias},
      ${data.reframe_text},
      ${data.micro_action},
      ${data.reflection_question}
    )
    RETURNING *
  `;
  return rows[0] as ThoughtRecord;
}

export async function getThoughtById(id: string): Promise<ThoughtRecord | null> {
  const rows = await sql`
    SELECT * FROM thoughts
    WHERE id = ${id} AND user_id = ${MOCK_USER_ID}
    LIMIT 1
  `;
  return (rows[0] as ThoughtRecord) ?? null;
}

export async function getThoughts(): Promise<ThoughtRecord[]> {
  const rows = await sql`
    SELECT * FROM thoughts
    WHERE user_id = ${MOCK_USER_ID}
    ORDER BY created_at DESC
    LIMIT 20
  `;
  return rows as ThoughtRecord[];
}

export async function getStats(): Promise<{
  total: number;
  streak: number;
  topEmotion: string | null;
  topBias: string | null;
}> {
  const countRows = await sql`
    SELECT COUNT(*) as total FROM thoughts WHERE user_id = ${MOCK_USER_ID}
  `;
  const total = parseInt(String(countRows[0].total), 10);

  // Streak: count consecutive days from today backwards
  const streakRows = await sql`
    SELECT DISTINCT DATE(created_at) as day
    FROM thoughts
    WHERE user_id = ${MOCK_USER_ID}
    ORDER BY day DESC
  `;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < streakRows.length; i++) {
    const day = new Date(String(streakRows[i].day));
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    if (day.toDateString() === expected.toDateString()) {
      streak++;
    } else {
      break;
    }
  }

  const emotionRows = await sql`
    SELECT emotion, COUNT(*) as cnt
    FROM thoughts WHERE user_id = ${MOCK_USER_ID}
    GROUP BY emotion ORDER BY cnt DESC LIMIT 1
  `;
  const biasRows = await sql`
    SELECT cognitive_bias, COUNT(*) as cnt
    FROM thoughts WHERE user_id = ${MOCK_USER_ID}
    GROUP BY cognitive_bias ORDER BY cnt DESC LIMIT 1
  `;

  return {
    total,
    streak,
    topEmotion: emotionRows[0]?.emotion ?? null,
    topBias: biasRows[0]?.cognitive_bias ?? null,
  };
}
