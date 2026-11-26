import { NextResponse, type NextRequest } from "next/server";

/** 301 from any trailing-slash URL to the clean version (spec requires 301, Next's default is 308). */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = req.headers.get("host") ?? "";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    // Build from the raw URL: NextURL can re-apply its own trailing-slash handling.
    const url = new URL(req.url);
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    url.search = search;
    return new NextResponse(null, { status: 301, headers: { Location: url.toString() } });
  }
  const res = NextResponse.next();
  // Vercel's own addresses serve the same pages; only davisslidingdoorflorida.com should be indexed.
  if (host.endsWith(".vercel.app")) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // Skip static assets and API routes so the proxy only runs on page requests.
  matcher: ["/((?!_next/|api/|favicon|icon|.*\\.[a-z0-9]+$).*)"],
};
