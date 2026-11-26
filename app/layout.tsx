import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Space_Grotesk } from "next/font/google";
import { business, isStaging, siteUrl } from "@/content/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import "./globals.css";

// next/font self-hosts these. "optional" avoids a late font swap repainting the hero (protects LCP);
// the fallback is metric-adjusted, so a first visit on a slow connection still looks right.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "optional", weight: ["500", "600", "700"] });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "optional" });

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
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
