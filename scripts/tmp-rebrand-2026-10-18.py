"""One-off: 品牌更名国晁动力 → 国晁动力 / 主体改为 上海国晁动力设备有限公司。

- 只做纯文本替换，不动结构；中英混排的空格在中文语境下顺手收干净
- 幂等：重复执行不会产生二次修改
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(".")

OLD_BRAND = "柴油零件源"
NEW_BRAND = "国晁动力"

TARGETS = [
    "src",
    "public/llms.txt",
    "public/llms-full.txt",
    "scripts",
    "cloud-functions",
]

CJK = r"[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]"


def rewrite(text: str) -> str:
    if OLD_BRAND not in text:
        return text
    text = text.replace(OLD_BRAND, NEW_BRAND)
    # 中文 + 空格 + 品牌  或  品牌 + 空格 + 中文 → 去掉空格
    text = re.sub(rf"(?<={CJK})\s+(?={NEW_BRAND})", "", text)
    text = re.sub(rf"(?<={NEW_BRAND})\s+(?={CJK})", "", text)
    return text


def main() -> None:
    changed = []
    for target in TARGETS:
        p = ROOT / target
        files = [p] if p.is_file() else [f for f in p.rglob("*") if f.suffix in {
            ".ts", ".astro", ".js", ".mjs", ".txt", ".json", ".md", ".py", ".css"}]
        for f in files:
            try:
                raw = f.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            new = rewrite(raw)
            if new != raw:
                f.write_text(new, encoding="utf-8")
                changed.append((str(f), raw.count(OLD_BRAND)))

    for name, n in changed:
        print(f"{n:>3}  {name}")
    print(f"\n{len(changed)} files, {sum(n for _, n in changed)} occurrences")


if __name__ == "__main__":
    sys.exit(main())
