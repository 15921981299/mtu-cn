"""把 public/_redirects 与 dist/seo-redirects.json 合并成 edgeone.json 的 redirects 字段。

背景：EdgeOne Makers 不读 _redirects，只认 edgeone.json（上限 100 条）。
build:edgeone 不跑 scripts/create-worker-entry.mjs（避免 dist/_worker.js 被当静态资源公开），
所以原来由它合并的两部分重定向必须落到 edgeone.json 里：
  1. public/_redirects        —— 手写规则（旧营销 URL）
  2. dist/seo-redirects.json  —— 零件页去重映射（duplicate-part-number losers）

用法：先 `npm run build:edgeone` 产出 dist/seo-redirects.json，再跑本脚本。
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
EDGEONE = ROOT / "edgeone.json"
HAND_WRITTEN = ROOT / "public" / "_redirects"
LEGACY_MAP = ROOT / "dist" / "seo-redirects.json"

MAX_RULES = 100  # EdgeOne 上限


def load_hand_written():
    rules = []
    for raw in HAND_WRITTEN.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 2:
            continue
        source, destination = parts[0], parts[1]
        status = parts[2] if len(parts) > 2 else "301"
        if status != "301":
            # EdgeOne redirects 支持 301/302；410 走 src/data/retired-urls.txt
            print(f"! 跳过非 301 规则（{status}）：{line}")
            continue
        rules.append({"source": source, "destination": destination, "statusCode": 301})
    return rules


def load_legacy():
    if not LEGACY_MAP.exists():
        raise SystemExit(
            "dist/seo-redirects.json 不存在——先跑 `npm run build:edgeone` 生成它，"
            "否则零件页去重映射（26 条）会丢失。"
        )
    legacy = json.loads(LEGACY_MAP.read_text(encoding="utf-8"))
    return [
        {
            "source": f"/part-products/{frm}/",
            "destination": f"/part-products/{to}/",
            "statusCode": 301,
        }
        for frm, to in sorted(legacy.items())
    ]


def main():
    hand = load_hand_written()
    legacy = load_legacy()

    seen = set()
    merged = []
    dupes = []
    for rule in hand + legacy:
        if rule["source"] in seen:
            dupes.append(rule["source"])
            continue
        seen.add(rule["source"])
        merged.append(rule)

    if dupes:
        print(f"! {len(dupes)} 条重复 source 已去重：{', '.join(dupes)}")
    if len(merged) > MAX_RULES:
        raise SystemExit(
            f"{len(merged)} 条规则超过 EdgeOne 上限 {MAX_RULES}，需按优先级裁剪。"
        )

    for rule in merged:
        if not rule["source"].startswith("/") or not rule["destination"].startswith("/"):
            raise SystemExit(f"非法规则（须以 / 开头）：{rule}")

    cfg = json.loads(EDGEONE.read_text(encoding="utf-8"))
    cfg["redirects"] = merged
    EDGEONE.write_text(
        json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"手写规则 {len(hand)} 条 + 零件页去重 {len(legacy)} 条 = {len(merged)} 条（上限 {MAX_RULES}，余量 {MAX_RULES - len(merged)}）")
    print(f"已写入 {EDGEONE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
