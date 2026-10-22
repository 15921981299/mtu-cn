#!/usr/bin/env python3
"""汉化 quotation-examples.ts 的 line.name（复合描述串，词典不覆盖）。
报价行项目为展示内容（title/context/lesson 均已中文），行名一并中文化；
零件号 / 型号 / HS 码等代码字段不动。"""
import io
import sys

P = 'src/data/quotation-examples.ts'

REPLACEMENTS = [
    # 发电机组保养
    ("name: 'Fuel filter cartridge'", "name: '燃油滤清器滤芯'"),
    ("name: 'Oil filter element'", "name: '机油滤清器滤芯'"),
    ("name: 'Centrifugal oil-filter paper element'", "name: '离心式机油滤清器纸滤芯'"),
    ("name: 'EasyChange fuel filter; requested earlier number X57508300091'", "name: '易换式（EasyChange）燃油滤清器；客户先前询价号 X57508300091'"),
    ("name: 'Poly-vee belt 8PK, alternator drive'", "name: '多楔皮带 8PK，发电机驱动'"),
    # 混合清单
    ("name: 'Spare parts kit'", "name: '备件包'"),
    ("name: 'Fuel filter; earlier reference X57508300091'", "name: '燃油滤清器；先前参考号 X57508300091'"),
    ("name: 'Alternator-drive poly-vee belt 8PK'", "name: '发电机驱动多楔皮带 8PK'"),
    ("name: 'Seal ring'", "name: '密封环'"),
    ("name: 'Cylinder-head gasket'", "name: '缸盖垫片'"),
    ("name: 'Cylinder-head bolt'", "name: '缸盖螺栓'"),
    ("name: 'Thrust washer, original RFQ line 10'", "name: '止推垫圈，原询价第 10 行'"),
    ("name: 'Cylinder-head hexagon bolt'", "name: '缸盖六角螺栓'"),
    ("name: 'Thrust washer, original RFQ line 12'", "name: '止推垫圈，原询价第 12 行'"),
    ("name: 'Pushrod'", "name: '推杆'"),
    ("name: 'Thrust washer, original RFQ line 4'", "name: '止推垫圈，原询价第 4 行'"),
    ("name: 'Thrust washer, original RFQ line 6'", "name: '止推垫圈，原询价第 6 行'"),
    ("name: 'Molded tubing'", "name: '成型软管'"),
]


def main():
    s = io.open(P, encoding='utf-8').read()
    applied = 0
    misses = []
    for old, new in REPLACEMENTS:
        n = s.count(old)
        if n == 0:
            misses.append(old)
            continue
        s = s.replace(old, new)
        applied += n
    io.open(P, 'w', encoding='utf-8', newline='').write(s)
    print(f'applied={applied} distinct={len(REPLACEMENTS)}')
    if misses:
        print('MISS:')
        for m in misses:
            print(' -', m)
        sys.exit(1)


if __name__ == '__main__':
    main()
