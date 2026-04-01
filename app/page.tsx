import ThoughtInput from "@/components/ThoughtInput";
import PagePaper from "@/components/PagePaper";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export default function Home() {
  return (
    <PagePaper bgClass="bg-input" rotate={3}>
      <h1 style={{ fontWeight: 700, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 16px" }}>
        <span style={{ display: "block", fontSize: 38, fontFamily: "sans-serif" }}>转念小票</span>
        <span style={{ ...M, display: "block", fontSize: 28, letterSpacing: 3 }}>THOUGHT REWRITE</span>
      </h1>

      <p style={{
        ...M,
        fontSize: 12,
        color: "var(--ink-muted)",
        lineHeight: 1.65,
        margin: "0 0 40px",
        maxWidth: 280,
      }}>
        We are your ONE-STOP-SHOP for reframing negative thoughts, served hot, fresh and fully processed straight to your mind.
      </p>

      <ThoughtInput />
    </PagePaper>
  );
}
