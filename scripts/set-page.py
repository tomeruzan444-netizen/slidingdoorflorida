# Dev helper: python scripts/set-page.py <slug> <json-file>  (sets answer/faqHeading/closing in pages.ts and FAQs in registry)
import io, json, re, sys
slug, src = sys.argv[1], sys.argv[2]
d = json.load(io.open(src, encoding='utf8'))
reg_p = 'content/faq-registry.json'
reg = json.load(io.open(reg_p, encoding='utf8'))
if 'faqs' in d:
    reg['pages'][slug or 'home'] = d['faqs']
    io.open(reg_p, 'w', encoding='utf8').write(json.dumps(reg, indent=2, ensure_ascii=False) + '\n')
p = 'content/pages.ts'
s = io.open(p, encoding='utf8').read()
start = s.index(f'slug: "{slug}",')
end = s.index('\n  },', start)
block = s[start:end]
block = re.sub(r'\n    (answer|faqHeading|closing): .*', '', block)
extra = ''.join(f'\n    {k}: {json.dumps(d[k], ensure_ascii=False)},' for k in ('answer', 'faqHeading', 'closing') if k in d)
s = s[:start] + block + extra + s[end:]
io.open(p, 'w', encoding='utf8').write(s)
print('ok', slug, len(d.get('faqs', [])), 'faqs')
