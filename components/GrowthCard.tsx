const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export interface GrowthCardProps {
  thought: string;
  emotion: string;
  cognitive_bias: string;
  reframe: string;
  micro_action: string;
}

export default function GrowthCard({
  thought,
  emotion,
  cognitive_bias,
  reframe,
  micro_action,
}: GrowthCardProps) {
  return (
    <div style={{ padding: "0 24px 32px" }}>
      {/* ── RECEIPT header ── */}
      <div style={{ textAlign: "center", padding: "28px 0 4px" }}>
        <p style={{ ...M, fontSize: 32, fontWeight: 700, letterSpacing: 6, color: "var(--ink)", margin: 0 }}>
          RECEIPT
        </p>
      </div>

      <div style={{ padding: "10px 0 12px" }}>
        <p style={{ ...M, fontSize: 12, fontStyle: "italic", color: "var(--ink-muted)", margin: 0 }}>
          Reframing your thoughts, one receipt at a time.
        </p>
      </div>

      {/* ── 01 Original Thought ── */}
      <SectionHeader title="原念头  INPUT" num="01." />
      <div style={{ padding: "14px 0 18px" }}>
        <p style={{ ...M, fontSize: 15, fontWeight: 400, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
          &ldquo;{thought}&rdquo;
        </p>
      </div>

      {/* ── 02 Be Aware Of ── */}
      <SectionHeader title="觉察  BE AWARE OF" num="02." />
      <div style={{ padding: "14px 0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        <RowItem label="情绪识别" value={emotion} />
        <RowItem label="思维偏差" value={cognitive_bias} />
      </div>

      {/* ── 03 Reframe ── */}
      <SectionHeader title="新视角  REFRAME" num="03." />
      <div style={{ padding: "14px 0 18px" }}>
        <p style={{ ...M, fontSize: 13, fontWeight: 400, color: "var(--ink)", lineHeight: 1.75, margin: 0 }}>
          {reframe}
        </p>
      </div>

      {/* ── 04 Action ── */}
      <SectionHeader title="小行动  ACTION" num="04." />
      <div style={{ padding: "14px 0 18px" }}>
        <p style={{ ...M, fontSize: 13, fontWeight: 400, color: "var(--ink)", lineHeight: 1.75, margin: 0 }}>
          {micro_action}
        </p>
      </div>

      {/* ── Financial ── */}
      <div style={{ borderTop: "2px solid var(--ink)", margin: "4px 0 0" }} />
      <div style={{ padding: "14px 0 4px", display: "flex", flexDirection: "column", gap: 8 }}>
        <RowItem label="SUBTOTAL" value="I REFRAME" small />
        <RowItem label="TAX (SELF-CARE)" value="FREE" small />
        <RowItem label="TOTAL" value="PRICELESS" bold />
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────── */


function SectionHeader({ title, num }: { title: string; num: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "9px 0",
    }}>
      <span style={{ ...M, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--ink)" }}>
        {title}
      </span>
      <span style={{ ...M, fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{num}</span>
    </div>
  );
}

function RowItem({
  label, value, bold, small,
}: {
  label: string; value: string; bold?: boolean; small?: boolean;
}) {
  const size = small ? 12 : bold ? 15 : 13;
  const labelColor = bold ? "var(--ink)" : "var(--ink-muted)";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
      <span style={{ ...M, fontSize: size, fontWeight: bold ? 700 : 400, color: labelColor, whiteSpace: "nowrap", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ ...M, fontSize: size, fontWeight: bold ? 700 : 400, color: "var(--ink)", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
