"""
Registers city pages from briefs/cities/{slug}.meta.json:
- appends a PageEntry (kind "city") to content/pages.ts, or replaces an existing one
- writes the city's FAQs into content/faq-registry.json

Usage: python scripts/add-city-pages.py            (all meta files)
       python scripts/add-city-pages.py miami ...   (only these city keys)
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CITIES = {
    "miami": ("Miami", "Miami-Dade County"),
    "hialeah": ("Hialeah", "Miami-Dade County"),
    "miami-gardens": ("Miami Gardens", "Miami-Dade County"),
    "miramar": ("Miramar", "Broward County"),
    "pembroke-pines": ("Pembroke Pines", "Broward County"),
    "hollywood": ("Hollywood", "Broward County"),
    "fort-lauderdale": ("Fort Lauderdale", "Broward County"),
    "davie": ("Davie", "Broward County"),
    "plantation": ("Plantation", "Broward County"),
    "sunrise": ("Sunrise", "Broward County"),
    "coral-springs": ("Coral Springs", "Broward County"),
    "pompano-beach": ("Pompano Beach", "Broward County"),
    "deerfield-beach": ("Deerfield Beach", "Broward County"),
    "boca-raton": ("Boca Raton", "Palm Beach County"),
    "west-palm-beach": ("West Palm Beach", "Palm Beach County"),
}
UPDATED = "2026-11-26"


def ts_str(v: str) -> str:
    return json.dumps(v, ensure_ascii=False)


def entry(key: str, meta: dict) -> str:
    name, county = CITIES[key]
    slug = f"sliding-glass-door-repair-{key}"
    return f"""  {{
    slug: {ts_str(slug)},
    kind: "city",
    metaTitle: {ts_str(meta["metaTitle"])},
    description: {ts_str(meta["description"])},
    h1: {ts_str(meta["h1"])},
    subline: {ts_str(meta["subline"])},
    answer: {ts_str(meta["answer"])},
    breadcrumb: {ts_str(name)},
    primaryKeyword: {ts_str("sliding glass door repair " + name.lower())},
    updated: {ts_str(UPDATED)},
    faqHeading: {ts_str(meta["faqHeading"])},
    closing: {ts_str(meta["closing"])},
    city: {{ name: {ts_str(name)}, county: {ts_str(county)} }},
  }},
"""


def main(keys):
    pages_ts = os.path.join(ROOT, "content", "pages.ts")
    reg_path = os.path.join(ROOT, "content", "faq-registry.json")
    src = open(pages_ts, encoding="utf8").read()
    reg = json.load(open(reg_path, encoding="utf8"))
    for key in keys:
        slug = f"sliding-glass-door-repair-{key}"
        meta_path = os.path.join(ROOT, "briefs", "cities", f"{slug}.meta.json")
        if not os.path.exists(meta_path) or not os.path.exists(os.path.join(ROOT, "content", "pages", f"{slug}.mdx")):
            print(f"skip {key}: meta or mdx missing")
            continue
        meta = json.load(open(meta_path, encoding="utf8"))
        block = entry(key, meta)
        existing = re.compile(r"  \{\n    slug: \"" + re.escape(slug) + r"\",.*?\n  \},\n", re.S)
        if existing.search(src):
            src = existing.sub(block, src, count=1)
        else:
            end = src.rindex("];")
            src = src[:end] + block + src[end:]
        reg["pages"][slug] = [{"q": f["q"], "a": f["a"]} for f in meta["faqs"]]
        print(f"registered {key}")
    open(pages_ts, "w", encoding="utf8", newline="\n").write(src)
    open(reg_path, "w", encoding="utf8", newline="\n").write(json.dumps(reg, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main(sys.argv[1:] or list(CITIES))
