"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export default function ThoughtInput() {
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!thought.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought: thought.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed");
      }
      const data = await res.json();
      sessionStorage.setItem("thoughtResult", JSON.stringify({ thought: thought.trim(), ...data }));
      router.push("/rewrite");
    } catch (err) {
      setError(err instanceof Error ? err.message : "出了点问题，请再试一次。");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Label */}
      <p style={{ ...M, fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "var(--ink)", margin: 0 }}>
        你现在的想法
      </p>

      {/* Textarea */}
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="e.g., '我总觉得自己什么都做不好...'"
        rows={5}
        disabled={loading}
        style={{
          ...M,
          width: "100%",
          backgroundColor: "transparent",
          border: "1px solid rgba(26,26,26,0.4)",
          padding: 14,
          fontSize: 16,
          color: "var(--ink)",
          lineHeight: 1.65,
          resize: "none",
          outline: "none",
          opacity: loading ? 0.6 : 1,
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(26,26,26,0.4)")}
      />

      {error && (
        <p style={{ ...M, fontSize: 12, color: "#C41E00", margin: 0 }}>{error}</p>
      )}

      {/* CHECKOUT button */}
      <button
        type="submit"
        disabled={loading || !thought.trim()}
        style={{
          ...M,
          backgroundColor: loading || !thought.trim() ? "rgba(26,26,26,0.35)" : "var(--btn-dark)",
          color: "#F5F0E8",
          border: "none",
          height: 52,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 3,
          cursor: loading || !thought.trim() ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transition: "background-color 0.15s",
        }}
      >
        {loading ? (
          <>
            <span className="spinner" />
            PRINTING...
          </>
        ) : (
          "结算  CHECKOUT"
        )}
      </button>
    </form>
  );
}
