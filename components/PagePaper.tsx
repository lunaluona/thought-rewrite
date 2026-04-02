import { ReactNode } from "react";

export default function PagePaper({
  bgClass,
  rotate = 2,
  children,
}: {
  bgClass: string;
  rotate?: number;
  children: ReactNode;
}) {
  return (
    // Full-width colored background
    <div
      className={`page-bg ${bgClass}`}
      style={{ minHeight: "100vh" }}
    >
      {/* Centered content column */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "28px 20px 28px" }}>
        {/* Rotated cream paper */}
        <div
          style={{
            backgroundColor: "#F2EDE0",
            transform: `rotate(${rotate}deg)`,
            transformOrigin: "50% 0",
            padding: "48px 26px 80px",
            minHeight: "calc(100vh - 56px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
