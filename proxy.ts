import { NextResponse, type NextRequest } from "next/server";

/** 301 from any trailing-slash URL to the clean version (spec requires 301, Next's default is 308). */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    url.search = search;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and API routes so the proxy only runs on page requests.
  matcher: ["/((?!_next/|api/|favicon|icon|.*\\.[a-z0-9]+$).*)"],
};
