"use client";

import { useState } from "react";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export default function SaveReceiptButton({ targetId }: { targetId: string }) {
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const el = document.getElementById(targetId);
    if (!el || saving) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
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

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      style={{
        ...M,
        width: "100%",
        height: 52,
        backgroundColor: saving ? "rgba(26,26,26,0.5)" : "var(--btn-dark)",
        color: "#F5F0E8",
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
            stroke="#F5F0E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          SAVE RECEIPT
        </>
      )}
    </button>
  );
}
