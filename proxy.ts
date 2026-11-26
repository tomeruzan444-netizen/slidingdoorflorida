import { NextResponse, type NextRequest } from "next/server";

/** 301 from any trailing-slash URL to the clean version (spec requires 301, Next's default is 308). */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    // Build from the raw URL: NextURL can re-apply its own trailing-slash handling.
    const url = new URL(req.url);
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    url.search = search;
    return new NextResponse(null, { status: 301, headers: { Location: url.toString() } });
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and API routes so the proxy only runs on page requests.
  matcher: ["/((?!_next/|api/|favicon|icon|.*\\.[a-z0-9]+$).*)"],
};
