"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/",        label: "INPUT"    },
  { href: "/growth",  label: "RECEIPTS" },
  { href: "/profile", label: "IMPACT"   },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "var(--nav-bg)",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      borderTop: "1px solid rgba(26,26,26,0.15)",
      zIndex: 50,
    }}>
      {tabs.map((tab) => {
        const isActive = tab.href === "/"
          ? pathname === "/" || pathname === "/rewrite"
          : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: isActive ? 700 : 400,
              letterSpacing: 1,
              color: "var(--ink)",
              textDecoration: "none",
              paddingBottom: isActive ? 2 : 4,
              borderBottom: isActive ? "2px solid var(--ink)" : "2px solid transparent",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
