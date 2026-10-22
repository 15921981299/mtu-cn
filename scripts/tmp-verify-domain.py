# -*- coding: utf-8 -*-
"""Post-build check: every SEO-facing URL must point at the new domain."""
import glob
import os
import re

NEW = "mtupeijian.com"
OLD = "dieselpartsource.com"
# The public mailbox intentionally still lives on the English domain until the
# new domain has working mail routing (see site.ts comment).
MAILBOX = "sales@dieselpartsource.com"

ok = True


def check(label, cond, detail=""):
    global ok
    if not cond:
        ok = False
    print(("[PASS] " if cond else "[FAIL] ") + label + (("  " + detail) if detail else ""))


# 1. sitemap
locs = []
for f in sorted(glob.glob("dist/sitemap*.xml")):
    locs += re.findall(r"<loc>(.*?)</loc>", open(f, encoding="utf-8").read())
print(f"sitemap files: {[os.path.basename(f) for f in glob.glob('dist/sitemap*.xml')]}")
print(f"sitemap urls : {len(locs)}")
check("sitemap: all <loc> on new domain", all(NEW in u for u in locs),
      f"offenders={sum(1 for u in locs if NEW not in u)}")

# 2. robots.txt
robots = open("dist/robots.txt", encoding="utf-8").read()
check("robots.txt: Sitemap points to new domain", f"https://{NEW}/sitemap-index.xml" in robots)
check("robots.txt: no old domain", OLD not in robots)

# 3. homepage head
home = open("dist/index.html", encoding="utf-8").read()
canon = re.search(r'<link rel="canonical" href="([^"]+)"', home)
ogurl = re.search(r'<meta property="og:url" content="([^"]+)"', home)
check("canonical on new domain", bool(canon) and canon.group(1).startswith(f"https://{NEW}"),
      canon.group(1) if canon else "MISSING")
check("og:url on new domain", bool(ogurl) and ogurl.group(1).startswith(f"https://{NEW}"),
      ogurl.group(1) if ogurl else "MISSING")
check("applicable-device meta present", 'name="applicable-device"' in home)
check("baidu-site-verification slot present (empty ok)",
      "baidu-site-verification" not in home or "content=\"\"" not in home)

# 4. deep page (part detail) — canonical + JSON-LD
part = "dist/part-products/0031845201-oil-filter-spin-on/index.html"
if os.path.exists(part):
    p = open(part, encoding="utf-8").read()
    c = re.search(r'<link rel="canonical" href="([^"]+)"', p)
    check("part page canonical on new domain", bool(c) and NEW in c.group(1),
          c.group(1) if c else "MISSING")
    check("part page JSON-LD has no old domain", OLD not in p.replace(MAILBOX, ""))

# 5. sitewide sweep for the old domain (the legacy mailbox is allowed on purpose)
hits = []
for f in glob.glob("dist/**/*.html", recursive=True):
    s = open(f, encoding="utf-8", errors="replace").read().replace(MAILBOX, "")
    if OLD in s:
        hits.append((f, s.count(OLD)))
print(f"\nHTML files scanned: {len(glob.glob('dist/**/*.html', recursive=True))}")
print(f"files with old domain OUTSIDE the mailbox: {len(hits)}")
for f, n in hits[:10]:
    print(f"   {n:>3}x  {f}")
check("no old domain anywhere except the mailbox", not hits)

# 6. llms files
for f in ("dist/llms.txt", "dist/llms-full.txt"):
    if os.path.exists(f):
        s = open(f, encoding="utf-8", errors="replace").read()
        check(f"{os.path.basename(f)} on new domain", NEW in s)
        # the only allowed old-domain mention is the mailbox
        leftover = [m for m in re.findall(r"[A-Za-z0-9@._-]*dieselpartsource\.com", s)
                    if not m.startswith("sales@")]
        check(f"{os.path.basename(f)}: no non-mailbox old refs", not leftover, str(leftover[:3]))

print("\nRESULT:", "ALL PASS" if ok else "HAS FAILURES")
