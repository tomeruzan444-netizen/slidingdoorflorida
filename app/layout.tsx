import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import { business, isStaging, siteUrl } from "@/content/business";
import { Header, TopBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import "./globals.css";

// next/font self-hosts Assistant (variable font, one file for every weight).
// "swap" guarantees Assistant always renders; the metric-adjusted fallback keeps the swap from shifting layout.
const assistant = Assistant({ subsets: ["latin"], variable: "--font-assistant", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: business.brandName,
  formatDetection: { telephone: false },
  ...(isStaging ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0f5c5e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={assistant.variable}>
      <body>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
