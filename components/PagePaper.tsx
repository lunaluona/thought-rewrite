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
    <div
      className={`page-bg ${bgClass}`}
      style={{ minHeight: "100vh", padding: "28px 20px 28px" }}
    >
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
  );
}
