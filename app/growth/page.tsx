import Link from "next/link";
import PagePaper from "@/components/PagePaper";
import { getDeviceId } from "@/lib/device";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

interface ThoughtRecord {
  id: string;
  thought_text: string;
  reframe_text: string;
  created_at: string;
}

async function getThoughts(): Promise<ThoughtRecord[]> {
  try {
    const userId = await getDeviceId();
    if (!userId) return [];
    const { getThoughts } = await import("@/lib/db");
    return await getThoughts(userId);
  } catch { return []; }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return (
    `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}` +
    `  ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  );
}

export default async function GrowthPage() {
  const thoughts = await getThoughts();

  return (
    <PagePaper bgClass="bg-receipts" rotate={0}>
      {/* Brand title */}
      <h1 style={{ fontWeight: 700, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 12px" }}>
        <span style={{ display: "block", fontSize: 38, fontFamily: "sans-serif" }}>转念小票</span>
        <span style={{ ...M, display: "block", fontSize: 28, letterSpacing: 3 }}>THOUGHT REWRITE</span>
      </h1>
      <p style={{ ...M, fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.65, margin: "0 0 32px", maxWidth: 280 }}>
        Your reframing history — every thought transformed, one receipt at a time.
      </p>

      {thoughts.length === 0 ? (
        <>
          {/* Section header */}
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.25)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0" }}>
            <span style={{ ...M, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>THE RECEIPTS</span>
            <span style={{ ...M, fontSize: 11, fontWeight: 700 }}>01.</span>
          </div>
          <div style={{ borderTop: "1px solid rgba(26,26,26,0.25)", marginBottom: 24 }} />
          <p style={{ ...M, fontSize: 13, color: "var(--ink-muted)" }}>还没有小票。</p>
          <Link
            href="/"
            style={{
              ...M, display: "inline-block", marginTop: 16, padding: "13px 24px",
              backgroundColor: "var(--btn-dark)", color: "#F5F0E8",
              fontSize: 13, fontWeight: 700, letterSpacing: 2, textDecoration: "none",
            }}
          >
            PRINT FIRST RECEIPT
          </Link>
        </>
      ) : (
        <>
          {thoughts.map((t, i) => (
            <div key={t.id}>
              {/* Section-header row: first shows "THE RECEIPTS", rest show only number */}
              <div style={{ borderTop: "1px solid rgba(26,26,26,0.25)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" }}>
                {i === 0 ? (
                  <span style={{ ...M, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--ink)" }}>
                    THE RECEIPTS
                  </span>
                ) : (
                  <span />
                )}
                <span style={{ ...M, fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>
                  {String(i + 1).padStart(2, "0")}.
                </span>
              </div>
              <div style={{ borderTop: "1px solid rgba(26,26,26,0.25)" }} />

              {/* Bordered card */}
              <Link href={`/growth/${t.id}`} style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  border: "1px solid rgba(26,26,26,0.2)",
                  padding: "14px 16px",
                  margin: "16px 0",
                }}>
                  <p style={{ ...M, fontSize: 11, color: "var(--ink-muted)", margin: "0 0 6px", letterSpacing: 0.5 }}>
                    {formatDate(t.created_at)}
                  </p>
                  <p style={{
                    ...M, fontSize: 14, color: "var(--ink)",
                    margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    &ldquo;{t.thought_text}&rdquo;
                  </p>
                  {t.reframe_text && (
                    <p style={{
                      ...M, fontSize: 12, color: "var(--ink-muted)", margin: 0,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      → {t.reframe_text}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </PagePaper>
  );
}
