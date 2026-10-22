#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Scan built dist HTML for residual user-facing English prose.
Extracts visible text (strip script/style/svg/head/comment), then flags
runs of >=2 consecutive English words that are NOT on the allow-list.
"""
import os, re, sys

DIST = 'dist'
ALLOW = set(w.lower() for w in [
    'mtu','rfq','zoho','seo','b2b','ga4','whatsapp','email','url','http','https',
    'id','faq','oem','odm','hs','nato','iso','ce','astm','din','en','gb','npt','bsp',
    'pn','dn','rpm','kw','bhp','hp','mm','cm','kg','g','l','w','v','a','hz','pa','pc',
    'pcs','tuv','ul','rohs','fda','ccc','cqc','sgs','epa','cfr','usace','pdf','xlsx',
    'csv','nav','tel','cn','com','svg','png','jpg','jpeg','webp','css','js','xml','json',
    'md','txt','ai','cad','bom','etk','moq','tbd','ok','qty','no','nos','sn','ref','rev',
    'fig','tab','sec','app','sys','noindex','nofollow','utm','gtm','gid','ab','ad','api',
    'tcp','udp','ssl','tls','ip','dns','ttl','cdn','html','lang','charset','utf','xmlns',
    'rel','href','src','alt','aria','viewbox','svg','xml','www','http','https','smtp',
    'imap','pop','ddl','cta','erp','crm','sku','ean','upc','fob','cif','ddp','exw','cip',
    'cpt','dat','oba','ru','by','to','of','and','the','for','with','via','vs','et','al',
    'co','ltd','inc','corp','gmbh','ag','sa','llc','plc','kg','bv','nv','srl','spa','sl',
])

SCRIPT_RE = re.compile(r'<script[\s\S]*?</script>', re.I)
STYLE_RE = re.compile(r'<style[\s\S]*?</style>', re.I)
SVG_RE = re.compile(r'<svg[\s\S]*?</svg>', re.I)
HEAD_RE = re.compile(r'<head[\s\S]*?</head>', re.I)
COMMENT_RE = re.compile(r'<!--[\s\S]*?-->')
TAG_RE = re.compile(r'<[^>]+>')
WORD_RE = re.compile(r"[A-Za-z][A-Za-z'\.\-]*")
# model-code-ish: contains a digit, e.g. 12V2000G63, X59507300001
CODE_RE = re.compile(r'[A-Za-z0-9\-]{4,}')
CODE_WITH_DIGIT = re.compile(r'[0-9][A-Za-z]|[A-Za-z][0-9]')

def is_code(tok):
    return bool(CODE_WITH_DIGIT.search(tok)) and any(c.isdigit() for c in tok)

def visible_text(html):
    html = SCRIPT_RE.sub(' ', html)
    html = STYLE_RE.sub(' ', html)
    html = SVG_RE.sub(' ', html)
    html = HEAD_RE.sub(' ', html)
    html = COMMENT_RE.sub(' ', html)
    html = TAG_RE.sub(' ', html)
    # decode a few entities
    html = html.replace('&amp;','&').replace('&nbsp;',' ').replace('&quot;','"').replace('&#39;',"'").replace('&lt;','<').replace('&gt;','>')
    return html

def has_english_run(text):
    # split into whitespace tokens
    toks = re.split(r'\s+', text.strip())
    consec = 0
    best = []
    for t in toks:
        wt = t.strip('.,;:!?()[]{}"\'/')
        if not wt:
            consec = 0; best = []; continue
        if re.fullmatch(r'[A-Za-z][A-Za-z\'.\-]*', wt) and len(wt) >= 2:
            low = wt.lower()
            if low in ALLOW or is_code(wt):
                consec = 0; best = []; continue
            # allow short connector words only if surrounded
            consec += 1
            best.append(wt)
            if consec >= 2:
                return ' '.join(best)
        else:
            consec = 0; best = []
    return None

def main():
    hits = 0
    files = 0
    report = []
    for root, _, files_list in os.walk(DIST):
        for fn in files_list:
            if not fn.endswith('.html'): continue
            p = os.path.join(root, fn)
            try:
                with open(p, encoding='utf-8', errors='replace') as f:
                    html = f.read()
            except Exception:
                continue
            files += 1
            text = visible_text(html)
            # per logical line
            for line in text.split('\n'):
                line = line.strip()
                if not line: continue
                # only consider lines that also contain CJK (mixed) OR are suspicious
                flag = has_english_run(line)
                if flag and re.search(r'[一-鿿]', line):
                    hits += 1
                    rel = os.path.relpath(p, DIST)
                    report.append(f"{rel}: …{line[:160]}…  >>EN: {flag}")
                elif flag and len(line) < 200 and not re.search(r'[一-鿿]', line):
                    # pure-English short line (could be a label/button) — report sparingly
                    hits += 1
                    rel = os.path.relpath(p, DIST)
                    report.append(f"{rel}: {line[:160]}  >>EN: {flag}")
    print(f"Scanned {files} html files, {hits} suspicious lines")
    out = '\n'.join(report)
    with open('tmp/built-html-en-scan.txt','w',encoding='utf-8') as f:
        f.write(out)
    # print first 60
    print('\n'.join(report[:60]))

if __name__ == '__main__':
    main()
