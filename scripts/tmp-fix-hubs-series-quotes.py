# -*- coding: utf-8 -*-
"""fix: restore trailing quote+comma on 12 lines broken by tmp-translate-hubs-series.py."""
import io, sys
PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()
REPLACEMENTS = [
# ── MTU 2000 series ──
('''每件零件在报价前均按零件号与发动机出厂编号核验。
    searchTopics: [''',
'''每件零件在报价前均按零件号与发动机出厂编号核验。',
    searchTopics: ['''),
('''        description: '为 16V 2000 船用、发电、轨交与工业发动机提供零件支持，按完整型号与出厂编号核验。
        href: '/products/mtu-2000-series-parts/16v-2000-engine-parts/',''',
'''        description: '为 16V 2000 船用、发电、轨交与工业发动机提供零件支持，按完整型号与出厂编号核验。',
        href: '/products/mtu-2000-series-parts/16v-2000-engine-parts/','''),
('''        description: '船用推进与游艇发动机零件，按完整的 M96L 序列号与部件编号核验。
        href: '/products/mtu-2000-series-parts/mtu-m96l-engine-parts/',''',
'''        description: '船用推进与游艇发动机零件，按完整的 M96L 序列号与部件编号核验。',
        href: '/products/mtu-2000-series-parts/mtu-m96l-engine-parts/','''),
('''        description: '适用于推进、辅助动力与船载发电机组的保养件与大修件。
        href: '/products/mtu-2000-series-parts/marine-generator-service-parts/',''',
'''        description: '适用于推进、辅助动力与船载发电机组的保养件与大修件。',
        href: '/products/mtu-2000-series-parts/marine-generator-service-parts/','''),
# ── MTU 4000 series ──
('''可提供原厂配套（OEM）与原厂配套替代件选项。
    searchTopics: [''',
'''可提供原厂配套（OEM）与原厂配套替代件选项。',
    searchTopics: ['''),
('''        description: '燃油、冷却、滤清、传感器、涡轮增压器与大修零件，按确切的 12V 4000 变型核验。
        href: '/products/mtu-4000-series-parts/12v-4000-engine-parts/',''',
'''        description: '燃油、冷却、滤清、传感器、涡轮增压器与大修零件，按确切的 12V 4000 变型核验。',
        href: '/products/mtu-4000-series-parts/12v-4000-engine-parts/','''),
('''        description: '为 16V 4000 船用、机车、发电与重型工业应用提供零件支持。
        href: '/products/mtu-4000-series-parts/16v-4000-engine-parts/',''',
'''        description: '为 16V 4000 船用、机车、发电与重型工业应用提供零件支持。',
        href: '/products/mtu-4000-series-parts/16v-4000-engine-parts/','''),
('''        description: '按尺寸分级的内部零部件与整合后的大修清单，逐项核验。
        href: '/products/mtu-4000-series-parts/overhaul-parts/',''',
'''        description: '按尺寸分级的内部零部件与整合后的大修清单，逐项核验。',
        href: '/products/mtu-4000-series-parts/overhaul-parts/','''),
# ── MTU 396 series ──
('''支持老款及已被替代的零件号。
    type: 'series',''',
'''支持老款及已被替代的零件号。',
    type: 'series','''),
# ── MTU 595 series ──
('''    description: '浏览 MTU 595 系列零件：气缸套、活塞、连杆、垫片、燃油管路、电磁阀、冷却水泵与涡轮增压器部件。
    type: 'series',''',
'''    description: '浏览 MTU 595 系列零件：气缸套、活塞、连杆、垫片、燃油管路、电磁阀、冷却水泵与涡轮增压器部件。',
    type: 'series','''),
# ── MTU 956 series ──
('''    description: '浏览 MTU 956 系列零件：气缸盖、垫片、轴承、气门、喷油器、冷却水泵、叶轮、机油喷嘴与燃油系统部件。
    type: 'series',''',
'''    description: '浏览 MTU 956 系列零件：气缸盖、垫片、轴承、气门、喷油器、冷却水泵、叶轮、机油喷嘴与燃油系统部件。',
    type: 'series','''),
# ── MTU 1163 series ──
('''    description: '浏览 MTU 1163 系列零件：气缸盖、轴承、气门、冷却系统、燃油系统、垫片与密封件。
    type: 'series',''',
'''    description: '浏览 MTU 1163 系列零件：气缸盖、轴承、气门、冷却系统、燃油系统、垫片与密封件。',
    type: 'series','''),
]
missed = []
for old, new in REPLACEMENTS:
    if old not in t:
        missed.append(old[:80]); continue
    t = t.replace(old, new, 1)
io.open(PATH, 'w', encoding='utf-8').write(t)
print('applied:', len(REPLACEMENTS) - len(missed), '/', len(REPLACEMENTS))
if missed:
    print('MISSED:'); [print(' -', m) for m in missed]; sys.exit(1)
