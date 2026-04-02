import { notFound } from "next/navigation";
import Link from "next/link";
import GrowthCard from "@/components/GrowthCard";
import SaveReceiptButton from "@/components/SaveReceiptButton";
import PagePaper from "@/components/PagePaper";
import { getDeviceId } from "@/lib/device";

const M: React.CSSProperties = { fontFamily: "var(--font-mono)" };

async function getThought(id: string) {
  try {
    const userId = await getDeviceId();
    if (!userId) return null;
    const { getThoughtById } = await import("@/lib/db");
    return await getThoughtById(id, userId);
  } catch { return null; }
}

export default async function ReceiptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getThought(id);
  if (!record) notFound();

  return (
    <div style={{ position: "relative" }}>
      {/* Off-screen straight capture zone — outside the rotated paper */}
      <div
        id="receipt-capture"
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
          thought={record.thought_text}
          emotion={record.emotion}
          cognitive_bias={record.cognitive_bias}
          reframe={record.reframe_text}
          micro_action={record.micro_action}
        />
      </div>

      {/* Visual display — rotated paper */}
      <PagePaper bgClass="bg-receipt" rotate={-2}>
        <div style={{ marginBottom: 16 }}>
          <Link href="/growth" style={{ ...M, fontSize: 11, color: "var(--ink-muted)", textDecoration: "none", letterSpacing: 1 }}>
            ← RECEIPTS
          </Link>
        </div>

        <GrowthCard
          thought={record.thought_text}
          emotion={record.emotion}
          cognitive_bias={record.cognitive_bias}
          reframe={record.reframe_text}
          micro_action={record.micro_action}
        />

        <div style={{ paddingTop: 16 }}>
          <SaveReceiptButton targetId="receipt-capture" />
        </div>
      </PagePaper>
    </div>
  );
}
