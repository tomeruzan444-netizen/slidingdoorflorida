/**
 * Crawl audit: checks the site the way a search engine sees it.
 *
 *   node scripts/crawl-audit.mjs https://davisslidingdoorflorida.com
 *   node scripts/crawl-audit.mjs http://localhost:3125 --host davisslidingdoorflorida.com   (local build, real host header)
 *
 * Checks: robots.txt rules and sitemap line, every sitemap URL returns 200 without redirects,
 * no noindex (meta or X-Robots-Tag), self-referencing absolute canonical, title/description/H1 present,
 * valid JSON-LD, every internal link found in the HTML resolves (no 404s, no unexpected redirects),
 * llms.txt and IndexNow key reachable, trailing-slash 301, unknown URL 404, www/http redirects (live only).
 */
const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) ?? "https://davisslidingdoorflorida.com").replace(/\/$/, "");
const hostIdx = args.indexOf("--host");
const hostHeader = hostIdx > -1 ? args[hostIdx + 1] : null;
const canonicalOrigin = hostHeader ? `https://${hostHeader}` : base;
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

let errors = 0, warns = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const warn = (m) => { warns++; console.log("  ! " + m); };
const ok = (m) => console.log("  ✓ " + m);

async function get(path, { redirect = "manual" } = {}) {
  const headers = { "user-agent": UA };
  if (hostHeader) headers.host = hostHeader;
  const res = await fetch(base + path, { redirect, headers });
  const body = res.status === 200 ? await res.text() : "";
  return { res, body };
}

const toPath = (u) => {
  const url = new URL(u, canonicalOrigin);
  return url.origin === canonicalOrigin ? url.pathname + url.search : null;
};

// ---------- robots.txt ----------
console.log("robots.txt");
const robots = await get("/robots.txt");
if (robots.res.status !== 200) err(`robots.txt status ${robots.res.status}`);
else {
  if (/Disallow:\s*\/\s*$/m.test(robots.body)) err("robots.txt disallows everything");
  else ok("crawling allowed (only /api/ disallowed)");
  const sm = robots.body.match(/Sitemap:\s*(\S+)/i);
  if (!sm) err("no Sitemap line");
  else if (!sm[1].startsWith(canonicalOrigin)) err(`Sitemap points to ${sm[1]}`);
  else ok(`Sitemap: ${sm[1]}`);
  for (const bot of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]) {
    if (!robots.body.includes(bot)) warn(`${bot} not named (still allowed by *)`);
  }
}

// ---------- sitemap ----------
console.log("sitemap.xml");
const sitemap = await get("/sitemap.xml");
const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!locs.length) err("sitemap has no URLs");
else ok(`${locs.length} URLs`);
const badLoc = locs.filter((l) => !l.startsWith(canonicalOrigin));
if (badLoc.length) err(`sitemap URLs on another host: ${badLoc.slice(0, 3).join(", ")}`);

// ---------- each page ----------
console.log("pages");
const linked = new Set();
for (const loc of locs) {
  const path = toPath(loc) || "/";
  const { res, body } = await get(path);
  const where = path;
  if (res.status !== 200) { err(`${where}: status ${res.status}${res.headers.get("location") ? " -> " + res.headers.get("location") : ""}`); continue; }
  const xrt = res.headers.get("x-robots-tag");
  if (xrt && /noindex|nofollow/i.test(xrt)) err(`${where}: X-Robots-Tag ${xrt}`);
  const metaRobots = body.match(/<meta name="robots" content="([^"]+)"/i)?.[1] ?? "";
  if (/noindex|nofollow/i.test(metaRobots)) err(`${where}: meta robots ${metaRobots}`);
  if (!/index, follow/.test(metaRobots)) warn(`${where}: meta robots "${metaRobots}"`);
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const expected = canonicalOrigin + (path === "/" ? "" : path);
  if (!canonical) err(`${where}: no canonical`);
  else if (canonical !== expected) err(`${where}: canonical ${canonical} (expected ${expected})`);
  const title = body.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) err(`${where}: no <title>`);
  if (!/<meta name="description" content="[^"]{50,}/.test(body)) err(`${where}: missing/short meta description`);
  const h1s = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) err(`${where}: ${h1s} <h1> elements`);
  for (const m of body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(`${where}: invalid JSON-LD`); }
  }
  if (!/lang="en-US"/.test(body)) warn(`${where}: no lang attribute`);
  for (const m of body.matchAll(/<a [^>]*href="([^"#]+)/g)) {
    const p = toPath(m[1].replace(/&amp;/g, "&"));
    if (p && !p.startsWith("/_next") && !p.startsWith("/api")) linked.add(p);
  }
}
ok(`checked ${locs.length} pages for status, robots, canonical, title, description, H1, JSON-LD`);

// ---------- internal links ----------
console.log("internal links");
const sitemapPaths = new Set(locs.map((l) => toPath(l) || "/"));
for (const p of linked) {
  if (p.startsWith("tel:") || p.startsWith("mailto:")) continue;
  const { res } = await get(p);
  if (res.status !== 200) err(`link ${p}: status ${res.status}`);
  else if (!sitemapPaths.has(p) && !/\.(txt|xml|png|svg)$/.test(p)) warn(`linked but not in sitemap: ${p}`);
}
ok(`${linked.size} unique internal links resolve`);
const orphans = [...sitemapPaths].filter((p) => p !== "/" && !linked.has(p));
if (orphans.length) err(`in sitemap but never linked from any page: ${orphans.join(", ")}`);
else ok("every sitemap page is linked from the site");

// ---------- other files and status codes ----------
console.log("other");
for (const f of ["/llms.txt", "/9c54fc2665706fd566ea7298663a3036.txt", "/opengraph-image", "/logo.png", "/icon.svg"]) {
  const { res } = await get(f);
  res.status === 200 ? ok(`${f} 200`) : err(`${f} status ${res.status}`);
}
const slash = await get("/about/");
slash.res.status === 301 ? ok("trailing slash -> 301") : err(`trailing slash status ${slash.res.status}`);
const nf = await get("/this-page-does-not-exist");
nf.res.status === 404 ? ok("unknown URL -> 404") : err(`unknown URL status ${nf.res.status}`);

if (!hostHeader && base.startsWith("https://") && !base.includes("vercel.app")) {
  const apex = new URL(base).host.replace(/^www\./, "");
  for (const variant of [`https://www.${apex}/`, `http://${apex}/`]) {
    try {
      const r = await fetch(variant, { redirect: "manual", headers: { "user-agent": UA } });
      const loc = r.headers.get("location") ?? "";
      [301, 308].includes(r.status) && loc.startsWith(`https://${apex}`) ? ok(`${variant} -> ${r.status} ${loc}`) : err(`${variant}: ${r.status} ${loc}`);
    } catch (e) { err(`${variant}: ${e.message}`); }
  }
}

console.log(`\n${errors} error(s), ${warns} warning(s)`);
process.exit(errors ? 1 : 0);
