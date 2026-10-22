#!/usr/bin/env python3
"""汉化 imported-pages.ts。
注意：12 个页面的 title/seoTitle/summary 运行时均被 imported-page-content.ts
覆盖（内容已中文），此处仅为兜底值；但 section 字段无覆盖，会在面包屑与
「栏目」行可见，必须汉化。section 译名避开 applicationContext 的英文关键词
检测（marine/generator/power/rail/cummins/deutz），轨交页的 'rail' 由 slug 保留。"""
import io
import sys

P = 'src/data/imported-pages.ts'

REPLACEMENTS = [
    # genuine-oem-parts
    ("title: 'Verified OEM Sourcing',", "title: '经核验的 OEM 采购',"),
    ("seoTitle: 'Verified OEM Sourcing | Diesel Part Source',", "seoTitle: '经核验的 OEM 采购 | 国晁动力',"),
    ("section: 'Verified OEM Sourcing',", "section: '经核验的 OEM 采购',"),
    ("summary: 'Verified OEM sourcing information page for engine parts sourcing, service planning, and quotation support.',", "summary: '经核验的 OEM 采购信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # mtu-coolants
    ("title: 'MTU Coolants',", "title: 'MTU 冷却液',"),
    ("seoTitle: 'MTU Coolants | Diesel Part Source',", "seoTitle: 'MTU 冷却液 | 国晁动力',"),
    ("section: 'MTU Coolants',", "section: 'MTU 冷却液',"),
    ("summary: 'MTU Coolants information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 冷却液信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # mtu-oils
    ("title: 'MTU Oils',", "title: 'MTU 机油',"),
    ("seoTitle: 'MTU Oils | Diesel Part Source',", "seoTitle: 'MTU 机油 | 国晁动力',"),
    ("section: 'MTU Oils',", "section: 'MTU 机油',"),
    ("summary: 'MTU Oils information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 机油信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # part/mtu-1800-parts
    ("title: 'MTU 1800 Parts',", "title: 'MTU 1800 零件',"),
    ("seoTitle: 'MTU 1800 Parts | Diesel Part Source',", "seoTitle: 'MTU 1800 零件 | 国晁动力',"),
    ("section: 'Part',", "section: '零件',"),
    ("summary: 'MTU 1800 Parts information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 1800 零件信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # part/mtu-183-parts
    ("title: 'MTU 183 Parts',", "title: 'MTU 183 零件',"),
    ("seoTitle: 'MTU 183 Parts | Diesel Part Source',", "seoTitle: 'MTU 183 零件 | 国晁动力',"),
    ("summary: 'MTU 183 Parts information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 183 零件信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # part/mtu-538-parts
    ("title: 'MTU 538 Parts',", "title: 'MTU 538 零件',"),
    ("seoTitle: 'MTU 538 Parts | Diesel Part Source',", "seoTitle: 'MTU 538 零件 | 国晁动力',"),
    ("summary: 'MTU 538 Parts information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 538 零件信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # part/mtu-specialized-tools
    ("title: 'MTU Specialized Tools',", "title: 'MTU 专用工具',"),
    ("seoTitle: 'MTU Specialized Tools | Diesel Part Source',", "seoTitle: 'MTU 专用工具 | 国晁动力',"),
    ("summary: 'MTU Specialized Tools information page for engine parts sourcing, service planning, and quotation support.',", "summary: 'MTU 专用工具信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # rail-drive-solutions
    ("title: 'Rail Drive Solutions',", "title: '轨交驱动解决方案',"),
    ("seoTitle: 'Rail Drive Solutions | Diesel Part Source',", "seoTitle: '轨交驱动解决方案 | 国晁动力',"),
    ("section: 'Rail Drive Solutions',", "section: '轨交驱动解决方案',"),
    ("summary: 'Rail Drive Solutions information page for engine parts sourcing, service planning, and quotation support.',", "summary: '轨交驱动解决方案信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # series-4000-r03
    ("title: 'Series 4000 R03',", "title: '4000 系列 R03',"),
    ("seoTitle: 'Series 4000 R03 | Diesel Part Source',", "seoTitle: '4000 系列 R03 | 国晁动力',"),
    ("section: 'Series 4000 R03',", "section: '4000 系列 R03',"),
    ("summary: 'Series 4000 R03 information page for engine parts sourcing, service planning, and quotation support.',", "summary: '4000 系列 R03 信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # series-4000-r04
    ("title: 'Series 4000 R04',", "title: '4000 系列 R04',"),
    ("seoTitle: 'Series 4000 R04 | Diesel Part Source',", "seoTitle: '4000 系列 R04 | 国晁动力',"),
    ("section: 'Series 4000 R04',", "section: '4000 系列 R04',"),
    ("summary: 'Series 4000 R04 information page for engine parts sourcing, service planning, and quotation support.',", "summary: '4000 系列 R04 信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # stock
    ("title: 'Stock',", "title: '库存',"),
    ("seoTitle: 'Stock | Diesel Part Source',", "seoTitle: '库存 | 国晁动力',"),
    ("section: 'Stock',", "section: '库存',"),
    ("summary: 'Stock information page for engine parts sourcing, service planning, and quotation support.',", "summary: '库存信息页，服务于发动机零件采购、保养计划与报价支持。',"),
    # support-services
    ("title: 'Support Services',", "title: '支持服务',"),
    ("seoTitle: 'Support Services | Diesel Part Source',", "seoTitle: '支持服务 | 国晁动力',"),
    ("section: 'Support Services',", "section: '支持服务',"),
    ("summary: 'Support Services information page for engine parts sourcing, service planning, and quotation support.',", "summary: '支持服务信息页，服务于发动机零件采购、保养计划与报价支持。',"),
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
