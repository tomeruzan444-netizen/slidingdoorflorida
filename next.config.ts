import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { isStaging } from "./content/business";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Trailing-slash URLs get a 301 in proxy.ts (Next's built-in redirect is a 308).
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  // Inline the (small) Tailwind CSS into the HTML so first paint doesn't wait on a stylesheet request.
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(isStaging ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
    ];
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
