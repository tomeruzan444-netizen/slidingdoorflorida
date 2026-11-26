/**
 * Ping IndexNow (Bing, Yandex and others; several AI search engines rely on Bing's index).
 * Usage: npm run indexnow -- /sliding-door-track-repair /   (paths that changed)
 *        npm run indexnow -- --all
 * The key file lives at /public/9c54fc2665706fd566ea7298663a3036.txt and must stay deployed.
 */
import { siteUrl } from "../content/business";
import { pages, pathFor } from "../content/pages";

const KEY = "9c54fc2665706fd566ea7298663a3036";
const args = process.argv.slice(2);
const paths = args.includes("--all") ? pages.map((p) => pathFor(p.slug)) : args;
if (!paths.length) {
  console.error("Pass changed paths, or --all");
  process.exit(1);
}
if (siteUrl.includes("example.com")) {
  console.error("Set the real domain in content/business.ts (or NEXT_PUBLIC_SITE_URL) first.");
  process.exit(1);
}
const host = new URL(siteUrl).host;
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${siteUrl}/${KEY}.txt`, urlList: paths.map((p) => siteUrl + p) }),
});
console.log("IndexNow", res.status, res.statusText, paths.length, "URL(s)");
