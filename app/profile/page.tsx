import PagePaper from "@/components/PagePaper";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

interface Stats { total: number; streak: number; topEmotion?: string | null; topBias?: string | null; }

async function getStats(): Promise<Stats> {
  try {
    const { getStats } = await import("@/lib/db");
    return await getStats();
  } catch { return { total: 0, streak: 0, topEmotion: null, topBias: null }; }
}

function Rule() {
  return <div style={{ borderTop: "1px solid rgba(26,26,26,0.25)" }} />;
}

function SectionRow({ label, num }: { label: string; num: string }) {
  return (
    <>
      <Rule />
      <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0" }}>
        <span style={{ ...M, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--ink)" }}>{label}</span>
        <span style={{ ...M, fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{num}</span>
      </div>
      <Rule />
    </>
  );
}

export default async function ProfilePage() {
  const stats = await getStats();

  return (
    <PagePaper bgClass="bg-impact" rotate={-3}>
      {/* Brand title — Chinese quote as hero */}
      <h1 style={{ ...M, fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: "var(--ink)", margin: "0 0 14px" }}>
        每一次温柔的反思和转念，<br />
        都是在持续投资自己。
      </h1>
      <p style={{ ...M, fontSize: 12, fontStyle: "italic", color: "var(--ink-muted)", lineHeight: 1.65, margin: "0 0 32px" }}>
        We&rsquo;re your ONE-STOP-SHOP for reframing negative thoughts, served fresh to your mind.
      </p>

      {/* 01 Your Impact */}
      <SectionRow label="YOUR IMPACT" num="01." />
      <div style={{ padding: "12px 0 20px" }}>
        <p style={{ ...M, fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.65, margin: 0 }}>
          Sizzling stats with a side of self-awareness, finished with a dollop of growth.
        </p>
      </div>

      {/* 02 Thoughts Reframed */}
      <SectionRow label="THOUGHTS REFRAMED" num="02." />
      <div style={{ padding: "16px 0 24px" }}>
        <p style={{ ...M, fontSize: 56, fontWeight: 700, lineHeight: 1, color: "var(--ink)", margin: 0 }}>
          {stats.total}
        </p>
      </div>

      {/* 03 Healing Streak */}
      <SectionRow label="HEALING STREAK" num="03." />
      <div style={{ padding: "16px 0 24px" }}>
        <p style={{ ...M, fontSize: 48, fontWeight: 700, lineHeight: 1, color: "var(--ink)", margin: 0 }}>
          {stats.streak} <span style={{ fontSize: 28, fontWeight: 400 }}>day{stats.streak !== 1 ? "s" : ""}</span>
        </p>
      </div>

      <Rule />

      {/* Keep it up */}
      <div style={{ padding: "20px 0" }}>
        <p style={{ ...M, fontSize: 16, fontWeight: 700, letterSpacing: 2, color: "var(--ink)", margin: 0 }}>
          KEEP IT UP!
        </p>
      </div>
    </PagePaper>
  );
}
