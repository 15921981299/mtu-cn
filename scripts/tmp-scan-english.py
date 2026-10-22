#!/usr/bin/env python3
"""扫描 src/ 下剩余的英文可见文案（数据层 + 模板层）。

判据：
- astro 模板：>text< 文本节点，含 >=2 个英文单词（3+ 字母）且无 CJK
- ts 数据：单/双引号字符串，含 >=3 个英文单词且无 CJK
白名单：URL、邮箱、文件名、slug、CSS、单位、代码标识符等
"""
import os
import re
import sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src')

CJK = re.compile(r'[\u4e00-\u9fff]')
WORD = re.compile(r'[A-Za-z]{3,}')

# 常见非文案模式
WHITELIST_PAT = re.compile(
    r'(^https?://|^mailto:|^/|^\.\.?/|@|\.(com|cn|net|org|io|svg|png|jpg|jpeg|webp|pdf|xlsx|csv|css|js|ts|astro|json|xml|txt|md)$'
    r'|^[a-z0-9]+(-[a-z0-9]+)*$'          # slug / kebab-case 标识
    r'|^[A-Z0-9][A-Z0-9\-/ ]*$'           # 零件号风格全大写串
    r'|^[a-z]+[A-Z][a-zA-Z]*$'            # camelCase 标识符
    r'|^[A-Z][a-z]+[A-Z][a-zA-Z]*$'       # PascalCase 组件名
    r'|^(GET|POST|HEAD|OPTIONS|PUT|DELETE|PATCH)$'
    r'|^[A-Za-z]{1,3}$'                   # 短串（单位/缩写）
    r'|^\d)'                             # 数字开头（闭合最外层分组）
)
# 这些英文术语在中文站中英混排方案下允许保留
TERM_WHITELIST = {
    'MTU', 'Detroit', 'Diesel', 'Cummins', 'DEUTZ', 'NATO', 'ISO', 'OEM', 'HS',
    'RFQ', 'PDF', 'XLSX', 'CSV', 'KB', 'MB', 'GB', 'R2', 'SMTP', 'API', 'URL',
    'GA4', 'SEO', 'SERP', 'CTR', 'FAQ', 'FAQPage', 'YouTube', 'WhatsApp', 'LinkedIn',
    'Facebook', 'Instagram', 'Twitter', 'M84', 'M86', 'M96', 'R03', 'R04', 'TE', 'TB', 'TC',
    'EX', 'XP', 'X', 'G', 'M', 'L', 'V', 'R', 'S', 'N', 'C', 'P', 'E', 'K', 'T', 'A', 'B', 'D',
    'Google', 'Search', 'Console', 'Cloudflare', 'Workers', 'Zoho', 'Resend', 'Gmail',
    'US', 'USA', 'UK', 'EU', 'CN', 'SG', 'AU', 'DE', 'FR', 'JP', 'KR', 'IN', 'BR', 'CA',
    'English', 'Chinese', 'Home', 'FAQ', 'LLM', 'AI', 'LLMs', 'robots', 'index', 'follow',
}


def is_whitelisted(s: str) -> bool:
    st = s.strip()
    if not st:
        return True
    if CJK.search(st):
        return True
    if WHITELIST_PAT.search(st):
        return True
    words = set(WORD.findall(st))
    if words and words <= TERM_WHITELIST:
        return True
    # 全大写零件号风格（含数字与空格）
    if re.fullmatch(r'[A-Z0-9][A-Z0-9 \-/&.]*', st) and len(st) <= 60:
        return True
    return False


def scan_astro(path: str):
    """提取 >text< 文本节点与属性字符串。"""
    out = []
    with open(path, encoding='utf-8') as f:
        code = f.read()
    # 去掉 frontmatter 与 script/style 块，避免误报代码
    body = re.sub(r'^---\n[\s\S]*?\n---', '', code)
    body = re.sub(r'<script[\s\S]*?</script>', '', body)
    body = re.sub(r'<style[\s\S]*?</style>', '', body)
    # 文本节点 >...<
    for m in re.finditer(r'>([^<>{}]+)<', body):
        text = m.group(1).strip()
        if len(text) < 3 or CJK.search(text):
            continue
        words = WORD.findall(text)
        if len(words) >= 2 and not is_whitelisted(text):
            line = body[:m.start()].count('\n') + 1
            out.append((path, line, text))
    # HTML 注释
    for m in re.finditer(r'<!--([\s\S]*?)-->', body):
        text = m.group(1).strip()
        if text and not CJK.search(text) and len(WORD.findall(text)) >= 2 and not is_whitelisted(text):
            line = body[:m.start()].count('\n') + 1
            out.append((path, line, 'COMMENT: ' + text))
    return out


def scan_ts(path: str):
    """提取字符串字面量。"""
    out = []
    with open(path, encoding='utf-8') as f:
        code = f.read()
    # 去注释与 import 行
    code = re.sub(r'/\*[\s\S]*?\*/', '', code)
    code = re.sub(r'//.*', '', code)
    code = re.sub(r'^import .*$', '', code, flags=re.M)
    for m in re.finditer(r"'([^'\\\n]+)'|\"([^\"\\\n]+)\"", code):
        text = (m.group(1) or m.group(2) or '').strip()
        if len(text) < 4 or CJK.search(text):
            continue
        words = WORD.findall(text)
        if len(words) >= 3 and not is_whitelisted(text):
            line = code[:m.start()].count('\n') + 1
            out.append((path, line, text))
    return out


def main():
    hits = []
    for root, dirs, files in os.walk(SRC):
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.git')]
        for fn in files:
            p = os.path.join(root, fn)
            rel = os.path.relpath(p, SRC)
            if fn.endswith('.astro'):
                hits.extend(scan_astro(p))
            elif fn.endswith('.ts'):
                hits.extend(scan_ts(p))
    hits.sort()
    print(f'TOTAL HITS: {len(hits)}')
    for path, line, text in hits:
        print(f'{os.path.relpath(path, SRC)}:{line}: {text[:160]}')


if __name__ == '__main__':
    main()
