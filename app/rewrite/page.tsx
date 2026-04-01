"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GrowthCard from "@/components/GrowthCard";
import PagePaper from "@/components/PagePaper";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

interface ThoughtResult {
  thought: string;
  emotion: string;
  cognitive_bias: string;
  reframe: string;
  micro_action: string;
}

export default function RewritePage() {
  const [result, setResult] = useState<ThoughtResult | null>(null);
  const [saving, setSaving] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("thoughtResult");
    if (!stored) { router.push("/"); return; }
    setResult(JSON.parse(stored) as ThoughtResult);
  }, [router]);

  async function handleSave() {
    if (!captureRef.current || saving) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#F2EDE0",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `receipt-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setSaving(false);
    }
  }

  if (!result) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120, gap: 10 }}>
        <span style={{
          display: "inline-block", width: 14, height: 14,
          border: "2px solid var(--ink-muted)", borderTopColor: "var(--ink)",
          borderRadius: "50%", animation: "spin 0.7s linear infinite",
        }} />
        <p style={{ ...M, fontSize: 13, color: "var(--ink-muted)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Off-screen straight capture zone — outside the rotated paper so html2canvas saves a level image */}
      <div
        ref={captureRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "-9999px",
          width: 390,
          backgroundColor: "#F2EDE0",
        }}
      >
        <GrowthCard
          thought={result.thought}
          emotion={result.emotion}
          cognitive_bias={result.cognitive_bias}
          reframe={result.reframe}
          micro_action={result.micro_action}
        />
      </div>

      {/* Visual display — rotated paper */}
      <PagePaper bgClass="bg-receipt" rotate={-2}>
        <GrowthCard
          thought={result.thought}
          emotion={result.emotion}
          cognitive_bias={result.cognitive_bias}
          reframe={result.reframe}
          micro_action={result.micro_action}
        />

        <div style={{ paddingTop: 16 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              ...M,
              width: "100%",
              height: 52,
              backgroundColor: saving ? "rgba(26,26,26,0.5)" : "var(--btn-dark)",
              color: "#F2EDE0",
              border: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 3,
              cursor: saving ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {saving ? (
              <>
                <span className="spinner" />
                SAVING...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#F2EDE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                SAVE RECEIPT
              </>
            )}
          </button>
        </div>
      </PagePaper>
    </div>
  );
}
