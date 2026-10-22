# -*- coding: utf-8 -*-
"""mtu-parts.ts translation, chunk 4: categoryTitleMap + generated hub templates."""
import io, sys

PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()

OLD_MAP = """const categoryTitleMap: Record<string, string> = {
  'Fuel system': 'Fuel System',
  'Filters': 'Filters',
  'Gaskets and seals': 'Gaskets and Seals',
  'Pistons and liners': 'Pistons, Liners and Rings',
  'Valve train': 'Valve Train',
  'Bearings': 'Engine Bearings',
  'Turbocharging': 'Turbocharger Parts',
  'Cooling system': 'Cooling System',
  'Sensors and electrical': 'Sensors and Electrical',
  'Cylinder heads': 'Cylinder Heads',
  'Fasteners and retaining rings': 'Fasteners and Retaining Rings',
  'Tools and supplies': 'Special Tools and Supplies',
  'Starting and charging': 'Starters and Alternators',
};"""

NEW_MAP = """const categoryTitleMap: Record<string, string> = {
  'Fuel system': '燃油系统',
  'Filters': '滤清器',
  'Gaskets and seals': '垫片与密封件',
  'Pistons and liners': '活塞、缸套与活塞环',
  'Valve train': '配气机构',
  'Bearings': '发动机轴承',
  'Turbocharging': '涡轮增压器零件',
  'Cooling system': '冷却系统',
  'Sensors and electrical': '传感器与电气元件',
  'Cylinder heads': '气缸盖',
  'Fasteners and retaining rings': '紧固件与卡环',
  'Tools and supplies': '专用工具与耗材',
  'Starting and charging': '起动机与发电机',
};"""

OLD_TPL = """        title: `${series} ${categoryTitle} Parts Catalog`,
        h1Title: `${series} ${categoryTitle} Parts`,
        summary: `${count} ${series} ${categoryTitle.toLowerCase()} part numbers for RFQ, availability checks, and serial-number verification.`,
        description: `Browse ${series} ${categoryTitle.toLowerCase()} part numbers. This catalog page groups exact part-number pages by engine series and category so buyers can prepare cleaner RFQs for ${cleanSeries} service, overhaul, and maintenance work.`,
        longDescription: `${series} ${categoryTitle.toLowerCase()} parts are checked by exact part number, engine serial number, replacement status, and shipping destination before quotation.\\n\\nUse this page when your inquiry is narrower than the full ${series} catalog but broader than one single part number. The representative list below helps procurement teams compare available references, weight and HS code data, and related part pages before sending a consolidated request.`,"""

NEW_TPL = """        title: `${series} ${categoryTitle}零件目录`,
        h1Title: `${series} ${categoryTitle}零件`,
        summary: `${count} 个 ${series} ${categoryTitle}零件号——用于询价、供货核查与出厂编号核验。`,
        description: `浏览 ${series} ${categoryTitle}零件号。本目录页按发动机系列与品类归并准确的零件号页面，便于采购方为 ${cleanSeries} 保养、大修与维修工作准备更清晰的询价清单。`,
        longDescription: `${series} ${categoryTitle}零件在报价前按准确零件号、发动机出厂编号、替换状态与运输目的地逐项核验。\\n\\n当您的询价范围小于完整的 ${series} 目录、又大于单个零件号时，请使用本页。下方代表性清单可帮助采购团队在发送合并询价前，比对可用参考号、重量与 HS 编码数据以及相关零件页面。`,"""

REPLACEMENTS = [(OLD_MAP, NEW_MAP), (OLD_TPL, NEW_TPL)]

missed = []
for old, new in REPLACEMENTS:
    if old not in t:
        missed.append(old[:60])
        continue
    t = t.replace(old, new, 1)

io.open(PATH, 'w', encoding='utf-8').write(t)
print('applied:', len(REPLACEMENTS) - len(missed), '/', len(REPLACEMENTS))
for m in missed:
    print('MISS:', m)
if missed:
    sys.exit(1)
