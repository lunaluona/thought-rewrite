import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import DeviceInit from "@/components/DeviceInit";
import "./globals.css";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "转念小票",
  description: "把烦恼想法变成一张转念小票。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${courierPrime.variable}`}>
        <DeviceInit />
        <main
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
