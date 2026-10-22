import io, json

p = 'src/data/download-catalogs.json'
s = io.open(p, encoding='utf-8').read()

reps = {
    "MTU Engine Parts Catalog — Complete Reference List (PDF)":
        "MTU 发动机零件目录 — 完整参考清单（PDF）",
    "MTU Engine Parts — Complete Reference List":
        "MTU 发动机零件 — 完整参考清单",
    "All catalogued part numbers across every engine series we supply.":
        "我们供应的全部发动机系列的已收录零件号。",
    "MTU 2000 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 2000 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 2000 Series Parts Catalog": "MTU 2000 系列零件目录",
    "12V, 16V and 18V 2000 series part numbers.": "12V、16V 与 18V 2000 系列零件号。",
    "MTU 4000 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 4000 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 4000 Series Parts Catalog": "MTU 4000 系列零件目录",
    "12V, 16V and 20V 4000 series part numbers.": "12V、16V 与 20V 4000 系列零件号。",
    "MTU 396 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 396 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 396 Series Parts Catalog": "MTU 396 系列零件目录",
    "8V, 12V and 16V 396 series part numbers.": "8V、12V 与 16V 396 系列零件号。",
    "MTU 1163 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 1163 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 1163 Series Parts Catalog": "MTU 1163 系列零件目录",
    "12V, 16V and 20V 1163 series part numbers.": "12V、16V 与 20V 1163 系列零件号。",
    "MTU 956 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 956 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 956 Series Parts Catalog": "MTU 956 系列零件目录",
    "Medium-speed 956 series part numbers.": "中速 956 系列零件号。",
    "MTU 538 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 538 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 538 Series Parts Catalog": "MTU 538 系列零件目录",
    "High-speed marine 538 series part numbers.": "高速船用 538 系列零件号。",
    "MTU 595 Series Parts Catalog (PDF) — Part Numbers by System":
        "MTU 595 系列零件目录（PDF）— 按系统排列的零件号",
    "MTU 595 Series Parts Catalog": "MTU 595 系列零件目录",
    "Heavy-duty 595 series part numbers.": "重载 595 系列零件号。",
}

for old, new in reps.items():
    n = s.count(old)
    if n == 0:
        print("MISS", old)
    s = s.replace(old, new)

# validate JSON still parses
json.loads(s)
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print("download-catalogs.json translated; replaced", sum(1 for _ in reps), "keys")
