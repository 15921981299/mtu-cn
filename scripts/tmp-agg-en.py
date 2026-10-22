#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aggregate ALL maximal English runs across dist HTML, classify vs a protected set."""
import os, re, json

DIST = 'dist'
PROTECTED = set(w.lower() for w in [
    # brands / legal entities (must stay verbatim — buyers search by these)
    'mtu','detroit','diesel','cummins','deutz','shanghai','david','joe','loctite',
    'molykote','mann','imo','eu','nato','iso','ce','astm','din','en','gb','sae',
    'zoho','whatsapp','ga4','b2b','seo','rfq','oem','odm','hs','npt','bsp','pn','dn',
    'rpm','kw','bhp','hp','mm','cm','kg','g','l','w','v','a','hz','pa','pcs','tuv','ul',
    'rohs','fda','ccc','cqc','sgs','epa','cfr','pdf','xlsx','csv','svg','png','jpg',
    'webp','css','js','xml','json','md','txt','cad','bom','etk','moq','fob','cif',
    'ddp','exw','cip','erp','crm','sku','ean','upc','utm','gtm','gid','api','tcp',
    'udp','ssl','tls','ip','dns','ttl','cdn','html','lang','charset','utf','xmlns',
    'www','http','https','smtp','imap','pop','cta','noindex','nofollow','nav','tel',
    'ai','dat','fig','tab','sec','app','sys','rev','ref','sn','nos','qty','no','ok',
    'ru','by','to','of','and','the','for','with','via','vs','et','al','co','ltd',
    'inc','corp','gmbh','ag','sa','llc','plc','kg','bv','nv','srl','spa','sl','ab',
    'ad','id','faq','oem','odm','en','gb','cn','com',
])

SCRIPT_RE = re.compile(r'<script[\s\S]*?</script>', re.I)
STYLE_RE = re.compile(r'<style[\s\S]*?</style>', re.I)
SVG_RE = re.compile(r'<svg[\s\S]*?</svg>', re.I)
HEAD_RE = re.compile(r'<head[\s\S]*?</head>', re.I)
COMMENT_RE = re.compile(r'<!--[\s\S]*?-->')
TAG_RE = re.compile(r'<[^>]+>')
WORD_RE = re.compile(r"[A-Za-z][A-Za-z'\.\-]*")
CODE_WITH_DIGIT = re.compile(r'[0-9][A-Za-z]|[A-Za-z][0-9]')

def is_code(tok):
    return bool(CODE_WITH_DIGIT.search(tok)) and any(c.isdigit() for c in tok)

def visible_text(html):
    html = SCRIPT_RE.sub(' ', html); html = STYLE_RE.sub(' ', html)
    html = SVG_RE.sub(' ', html); html = HEAD_RE.sub(' ', html)
    html = COMMENT_RE.sub(' ', html); html = TAG_RE.sub(' ', html)
    return html.replace('&amp;','&').replace('&nbsp;',' ').replace('&quot;','"').replace('&#39;',"'").replace('&lt;','<').replace('&gt;','>')

def english_runs(text):
    runs = []
    consec = []
    for t in re.split(r'\s+', text.strip()):
        wt = t.strip('.,;:!?()[]{}"\'/')
        if not wt:
            if consec: runs.append(consec); consec=[]
            continue
        if re.fullmatch(r'[A-Za-z][A-Za-z\'.\-]*', wt) and len(wt) >= 2 and not is_code(wt):
            low = wt.lower()
            if low in PROTECTED:
                if consec: runs.append(consec); consec=[]
                continue
            consec.append(wt)
        else:
            if consec: runs.append(consec); consec=[]
    if consec: runs.append(consec)
    # only keep runs of >=2 words
    return [' '.join(r) for r in runs if len(r) >= 2]

agg = {}
examples = {}
for root, _, files in os.walk(DIST):
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        try:
            html = open(p, encoding='utf-8', errors='replace').read()
        except Exception:
            continue
        text = visible_text(html)
        for run in english_runs(text):
            key = run.lower()
            agg[key] = agg.get(key, 0) + 1
            if key not in examples:
                examples[key] = os.path.relpath(p, DIST)

rows = sorted(agg.items(), key=lambda kv: -kv[1])
print(f"UNIQUE ENGLISH RUNS (>=2 words, non-protected): {len(rows)}\n")
for k, c in rows:
    print(f"{c:5d}  {k}   [{examples[k]}]")
