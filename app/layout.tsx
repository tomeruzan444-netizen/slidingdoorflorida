import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Space_Grotesk } from "next/font/google";
import { business, siteUrl } from "@/content/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import "./globals.css";

// next/font downloads these at build time and serves them from our own domain.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", weight: ["500", "600", "700"] });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: business.brandName,
  formatDetection: { telephone: false },
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
