# -*- coding: utf-8 -*-
"""hub translation: series hubs."""
import io, sys
PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()
REPLACEMENTS = [
# ── MTU 2000 series: title/h1/summary/description ──
('''    title: 'MTU 2000 Series Parts Catalog',
    h1Title: 'MTU 2000 Series Engine Parts',
    summary: 'Complete parts catalog for MTU 2000 series diesel engines — marine, industrial, generator, and rail applications.',
    description: 'Browse MTU 2000 series parts by category: pistons, liners, bearings, valves, gaskets, fuel system, cooling, turbocharging, sensors, and filters. Each part is verified by part number and engine serial number before quotation.',''',
'''    title: 'MTU 2000 系列零件目录',
    h1Title: 'MTU 2000 系列发动机零件',
    summary: 'MTU 2000 系列柴油发动机完整零件目录——适用于船用、工业、发电与轨交应用。',
    description: '按类别浏览 MTU 2000 系列零件：活塞、缸套、轴承、气门、垫片、燃油系统、冷却系统、涡轮增压、传感器与滤清器。每件零件在报价前均按零件号与发动机出厂编号核验。'''),
# ── MTU 2000 series: searchTopics ──
('''        title: 'MTU 16V 2000 Engine Parts',
        description: 'Parts support for 16V 2000 marine, generator, rail, and industrial engines, checked by full model and serial number.',''',
'''        title: 'MTU 16V 2000 发动机零件',
        description: '为 16V 2000 船用、发电、轨交与工业发动机提供零件支持，按完整型号与出厂编号核验。'''),
('''        title: 'MTU 16V 2000 M96L Engine Parts',
        description: 'Marine propulsion and yacht-engine parts checked against the complete M96L serial and component references.',''',
'''        title: 'MTU 16V 2000 M96L 发动机零件',
        description: '船用推进与游艇发动机零件，按完整的 M96L 序列号与部件编号核验。'''),
('''        title: 'MTU 2000 Marine Engine Parts',
        description: 'Service and overhaul parts for propulsion, auxiliary-power, and onboard generator applications.',''',
'''        title: 'MTU 2000 船用发动机零件',
        description: '适用于推进、辅助动力与船载发电机组的保养件与大修件。'''),
# ── MTU 2000 series: longDescription ──
('''    longDescription: `The MTU 2000 series is one of the most widely deployed diesel engine families in the world, powering everything from fast ferries and naval vessels to generator sets and locomotives. Available in 8V, 12V, 16V, and 18V configurations across multiple power ratings (M84, M91, M93, M94, M96), these engines share a common parts architecture that makes maintenance programs predictable — but also demanding when parts are needed urgently.''',
'''    longDescription: `MTU 2000 系列是全球装用范围最广的柴油发动机系列之一，从快速渡轮、海军舰艇到发电机组与机车均有采用。该系列提供 8V、12V、16V 与 18V 构型，覆盖多个功率等级（M84、M91、M93、M94、M96）；各机型共享通用的零件架构，使维护计划具有可预期性——但在零件急需时，也对供货响应提出更高要求。'''),
('''    Catalog listings identify part numbers and component families, but they do not establish fitment for every engine build. The complete model, serial number, and installation position are needed to check the offered replacement. Public catalog references are distinguished from confirmed measurements and current supply information.''',
'''    目录清单标明零件号与部件族，但并不能确定其适用于每一台发动机的构型。核对所供替换件，需要完整的型号、出厂编号与安装位置。公开目录编号应与经确认的实测数据和当前供货信息区分开来。'''),
('''    Catalog references include cylinder-head gaskets, fuel injectors, service filters, sensors, and sealing components. Stock, dimensions, supplied condition, and lead time are confirmed for the exact reference in the quotation, rather than inferred from a series name.''',
'''    目录编号包括缸垫、燃油喷油器、保养滤清器、传感器与密封件。库存、尺寸、供货状态与交货期均在报价中按确切编号确认，而非仅凭系列名称推断。'''),
('''    If you are maintaining a fleet of MTU 2000 engines — whether in a shipyard, a power plant, or a rail depot — send us your parts list and engine serial numbers. We check availability line by line and quote practical shipping from Shanghai to your destination.`,''',
'''    无论您在船厂、电厂还是铁路机务段维护 MTU 2000 发动机机群，都欢迎将零件清单与发动机出厂编号发送给我们。我们逐项核对供货情况，并报出自上海发往目的地的可行运输方案。`,'''),
# ── MTU 4000 series: title/h1/summary/description ──
('''    title: 'MTU 4000 Series Parts Catalog',
    h1Title: 'MTU 4000 Series Engine Parts',
    summary: 'Complete parts catalog for MTU 4000 series diesel engines — marine propulsion, power generation, locomotive, and heavy equipment.',
    description: 'Browse MTU 4000 series parts by category: cylinder liners, pistons, cylinder heads, bearings, valves, gaskets, fuel injection, cooling pumps, turbochargers, sensors, and filters. OEM and alternative options available.',''',
'''    title: 'MTU 4000 系列零件目录',
    h1Title: 'MTU 4000 系列发动机零件',
    summary: 'MTU 4000 系列柴油发动机完整零件目录——适用于船用推进、发电、机车与重型设备。',
    description: '按类别浏览 MTU 4000 系列零件：气缸套、活塞、气缸盖、轴承、气门、垫片、燃油喷射、冷却水泵、涡轮增压器、传感器与滤清器。可提供原厂配套（OEM）与原厂配套替代件选项。'''),
# ── MTU 4000 series: searchTopics ──
('''        title: 'MTU 12V 4000 Engine Parts',
        description: 'Fuel, cooling, filtration, sensor, turbocharger, and overhaul parts checked by exact 12V 4000 variant.',''',
'''        title: 'MTU 12V 4000 发动机零件',
        description: '燃油、冷却、滤清、传感器、涡轮增压器与大修零件，按确切的 12V 4000 变型核验。'''),
('''        title: 'MTU 16V 4000 Engine Parts',
        description: 'Parts support for 16V 4000 marine, locomotive, generator, and heavy industrial applications.',''',
'''        title: 'MTU 16V 4000 发动机零件',
        description: '为 16V 4000 船用、机车、发电与重型工业应用提供零件支持。'''),
('''        title: 'MTU 4000 Overhaul Parts',
        description: 'Graded internal components and consolidated overhaul lists with line-by-line verification.',''',
'''        title: 'MTU 4000 大修零件',
        description: '按尺寸分级的内部零部件与整合后的大修清单，逐项核验。'''),
# ── MTU 4000 series: longDescription ──
('''    longDescription: `The MTU 4000 series represents the top tier of MTU's high-speed diesel engine range, with power outputs from 1,500 kW to over 4,300 kW in 12V, 16V, and 20V configurations. These engines are found in the world's most demanding applications: fast naval vessels, superyachts, offshore supply vessels, mission-critical data center generators, and heavy-haul locomotives.''',
'''    longDescription: `MTU 4000 系列位居 MTU 高速柴油发动机系列的顶端，12V、16V 与 20V 构型的功率输出自 1,500 kW 至 4,300 kW 以上。这些发动机见于全球要求最严苛的应用场景：高速海军舰艇、超级游艇、海洋工程供应船、任务关键型数据中心发电机组与重载机车。'''),
('''    Cylinder liners, pistons, and bearings require size-grade and installation checks. Catalog references are starting points for identification, not proof of compatibility with every MTU 4000 build. The quotation should state the exact offered number and condition, including any replacement or exchange terms.''',
'''    气缸套、活塞与轴承需按尺寸等级与安装状态核对。目录编号只是识别的起点，并不能证明与每一台 MTU 4000 构型兼容。报价应写明所供的确切编号与状态，包括任何替代或换货条款。'''),
('''    For injector, pump, and control-component inquiries, retain the complete reference including prefixes and suffixes. For an overhaul, identify each component and size grade separately. Availability and shipping lead time depend on the offered item and are confirmed with the quotation.''',
'''    就喷油器、泵与控制元件询价时，请保留含前、后缀的完整编号。进行大修时，请分别标明每个部件及其尺寸等级。供货情况与发货货期取决于所供货物，并随报价一并确认。'''),
('''    For major overhauls, we recommend sending a complete parts list with engine serial numbers. We verify each line item, flag any superseded part numbers, and quote shipping from Shanghai via express courier, air freight, or sea freight depending on urgency and part dimensions.`,''',
'''    进行大型大修时，我们建议提交附发动机出厂编号的完整零件清单。我们会逐项核验、标出任何已被替代的零件号，并根据紧急程度与零件尺寸，报出自上海发出的快递、空运或海运方案。`,'''),
# ── MTU 396 series: title/h1/summary/description ──
('''    title: 'MTU 396 Series Parts Catalog',
    h1Title: 'MTU 396 Series Engine Parts',
    summary: 'Parts catalog for legacy MTU 396 series engines — marine, industrial, and power generation applications.',
    description: 'Browse MTU 396 series parts including cylinder liners, pistons, bearings, valves, gaskets, fuel system, cooling, and turbocharger components. Legacy and superseded part numbers supported.',''',
'''    title: 'MTU 396 系列零件目录',
    h1Title: 'MTU 396 系列发动机零件',
    summary: '老款 MTU 396 系列发动机零件目录——适用于船用、工业与发电应用。',
    description: '浏览 MTU 396 系列零件，包括气缸套、活塞、轴承、气门、垫片、燃油系统、冷却与涡轮增压器部件。支持老款及已被替代的零件号。'''),
# ── MTU 396 series: longDescription ──
('''    longDescription: `For an MTU 396 parts request, retain the full nameplate designation and serial number. Legacy installations can have changed components, so include the number on the installed item as well as any old invoice or parts-list reference.''',
'''    longDescription: `提交 MTU 396 零件询价时，请保留铭牌所示的完整型号名称与出厂编号。老款装机可能已更换过部件，因此请一并提供所装件上的编号，以及任何旧发票或旧零件清单上的编号。'''),
('''    Because the 396 series is now a legacy platform, OEM-route availability can be inconsistent. This is where our verification process adds value: we check each part number against your engine serial number, confirm whether superseded references apply, and quote OEM, OEM-alternative, reman, or replacement options with transparent lead times. Common 396 series requests include cylinder liners (5320110110), cylinder head covers (5320100130), exhaust valves (5410500227), inlet valves (4570530001), valve springs (5320530020), main and thrust bearings, oil pumps (5321800001), oil separators (5410100163), and turbocharger turbine wheels (5110800220/5110804420).''',
'''    由于 396 系列现已属老款平台，原厂配套（OEM）渠道的供货情况可能不稳定。这正是我们核验流程的价值所在：我们按您的发动机出厂编号核对每个零件号，确认是否适用已被替代的编号，并就原厂配套（OEM）、原厂配套替代件、再制造件或替代件选项报价，同时给出明确的交货期。MTU 396 系列的常见询价包括气缸套（5320110110）、气门室盖（5320100130）、排气门（5410500227）、进气门（4570530001）、气门弹簧（5320530020）、主轴承与推力轴承、机油泵（5321800001）、机油分离器（5410100163）以及涡轮增压器涡轮（5110800220/5110804420）。'''),
('''    For major overhauls, we recommend sending a complete parts list organized by engine serial number. Legacy engines often have running changes that affect part number compatibility — our verification step catches these before shipment.`,''',
'''    进行大型大修时，我们建议提交按发动机出厂编号整理的完整零件清单。老款发动机常有影响零件号兼容性的运行变更——我们的核验步骤会在发货前将这些问题逐一识别。`,'''),
# ── MTU 595 series: title/h1/summary/description ──
('''    title: 'MTU 595 Series Parts Catalog',
    h1Title: 'MTU 595 Series Engine Parts',
    summary: 'Parts catalog for MTU 595 series engines — heavy-duty marine and industrial power units.',
    description: 'Browse MTU 595 series parts: cylinder liners, pistons, connecting rods, gaskets, fuel lines, solenoid valves, cooling pumps, and turbocharger components.',''',
'''    title: 'MTU 595 系列零件目录',
    h1Title: 'MTU 595 系列发动机零件',
    summary: 'MTU 595 系列发动机零件目录——重型船用与工业动力装置。',
    description: '浏览 MTU 595 系列零件：气缸套、活塞、连杆、垫片、燃油管路、电磁阀、冷却水泵与涡轮增压器部件。'''),
# ── MTU 595 series: longDescription ──
('''    longDescription: `The MTU 595 series is a heavy-duty, high-output diesel engine platform designed for the most demanding marine and industrial applications. With bore sizes exceeding 200mm and power outputs per cylinder that place it firmly in the medium-speed engine category, the 595 series is found in naval combatants, large offshore supply vessels, and base-load power stations where reliability is non-negotiable.''',
'''    longDescription: `MTU 595 系列是面向最严苛船用与工业应用的重型、高输出柴油发动机平台。其缸径超过 200 mm，单缸功率输出使其稳居中速发动机范畴；595 系列见于海军作战舰艇、大型海洋工程供应船与基荷电站——在这些场合，可靠性没有妥协余地。'''),
('''    Parts for the 595 series reflect its heavy engineering heritage: cylinder liners weighing over 50 kg, pistons with separate crowns and skirts (5840371625 crown, 5840300615 skirt), connecting rods built for extreme cylinder pressures, and fuel systems operating at high injection pressures with HP fuel lines (5840700632-87) and solenoid valves (5840900595, 5840980257). Every component is size-graded and serial-number-specific.''',
'''    595 系列的零件体现了其重型工程传承：重量超过 50 kg 的气缸套，活塞顶与活塞裙分离式活塞（活塞顶 5840371625、活塞裙 5840300615），按极高气缸压力设计的连杆，以及在高喷射压力下工作、配高压（HP）燃油管路（5840700632-87）与电磁阀（5840900595、5840980257）的燃油系统。每个部件均按尺寸分级，并与出厂编号一一对应。'''),
('''    Because 595 series engines often serve in continuous-duty applications, parts traceability and documentation requirements can be stringent. We support part-number verification with engine serial numbers, provide HS codes and approximate weights for freight planning, and can quote with material certificates where required.`,''',
'''    由于 595 系列发动机常用于连续运转工况，零件的可追溯性与单证要求可能十分严格。我们支持按发动机出厂编号核验零件号，提供 HS 编码与大致重量以便规划运输，并可在需要时随报价提供材质证书。`,'''),
# ── MTU 956 series: title/h1/summary/description ──
('''    title: 'MTU 956 Series Parts Catalog',
    h1Title: 'MTU 956 Series Engine Parts',
    summary: 'Parts catalog for MTU 956 series engines — marine and heavy industrial applications.',
    description: 'Browse MTU 956 series parts: cylinder heads, gaskets, bearings, valves, injectors, cooling pumps, impellers, oil nozzles, and fuel system components.',''',
'''    title: 'MTU 956 系列零件目录',
    h1Title: 'MTU 956 系列发动机零件',
    summary: 'MTU 956 系列发动机零件目录——船用与重型工业应用。',
    description: '浏览 MTU 956 系列零件：气缸盖、垫片、轴承、气门、喷油器、冷却水泵、叶轮、机油喷嘴与燃油系统部件。'''),
# ── MTU 956 series: longDescription ──
('''    longDescription: `The MTU 956 series is a proven workhorse in the medium-speed diesel segment, powering naval vessels, commercial ships, and heavy industrial installations. It shares many design characteristics with the 1163 series, and parts frequently cross-reference between the two families. Cylinder heads (5550105141), gaskets (5550161420), bearings (5550302160, 5550307540), and cooling system components (5552010005) are among the most commonly requested parts.''',
'''    longDescription: `MTU 956 系列是中速柴油机领域久经验证的主力机型，为海军舰艇、商船与重型工业装置提供动力。它与 1163 系列共享许多设计特征，两个系列的零件经常可交叉引用。气缸盖（5550105141）、垫片（5550161420）、轴承（5550302160、5550307540）与冷却系统部件（5552010005）均属最常被询价的零件。'''),
('''    For 956 series engines still in active duty, parts availability can vary by region and engine variant. We verify each part number against your engine serial number, check for supersessions, and quote both OEM and OEM-alternative options. Marine-specific components like seawater pump impellers (5592010007) and oil spray nozzles (5550101251) are high-demand items where we typically maintain stock references.`,''',
'''    对于仍在服役的 956 系列发动机，零件供货情况可能因地区与发动机变型而异。我们按您的发动机出厂编号核验每个零件号、检查替代关系，并就原厂配套（OEM）与原厂配套替代件选项报价。海水泵叶轮（5592010007）与机油喷嘴（5550101251）等船用专用部件属高频需求件，我们通常备有相应的库存编号。`,'''),
# ── MTU 1163 series: title/h1/summary/description ──
('''    title: 'MTU 1163 Series Parts Catalog',
    h1Title: 'MTU 1163 Series Engine Parts',
    summary: 'Parts catalog for MTU 1163 series engines — high-output marine propulsion.',
    description: 'Browse MTU 1163 series parts: cylinder heads, bearings, valves, cooling system, fuel system, gaskets, and seals.',''',
'''    title: 'MTU 1163 系列零件目录',
    h1Title: 'MTU 1163 系列发动机零件',
    summary: 'MTU 1163 系列发动机零件目录——高输出船用推进。',
    description: '浏览 MTU 1163 系列零件：气缸盖、轴承、气门、冷却系统、燃油系统、垫片与密封件。'''),
# ── MTU 1163 series: longDescription ──
('''    longDescription: `MTU 1163 parts requests need the full engine designation, serial number and installation position. Catalog references include cylinder-head components, main bearings (5550330130), connecting rod bearings (5550302160) and cooling pump shafts (5562010105). Treat each reference as a separate identification task rather than a universally compatible 1163 part.''',
'''    longDescription: `MTU 1163 零件询价需要完整的发动机型号名称、出厂编号与安装位置。目录编号包括缸盖部件、主轴承（5550330130）、连杆轴承（5550302160）与冷却泵轴（5562010105）。每个编号都应作为独立的识别任务对待，而非通用于所有 1163 发动机的零件。'''),
('''    Some public records list references under both 1163 and 956. That does not prove fitment across both families. Provide the engine serial number, installed component marking and drawing revision for an application-specific check. Access to a current manufacturer catalog and current stock is not established by this public listing.`,''',
'''    部分公开记录将同一编号同时列于 1163 与 956 系列之下，但这并不能证明其通用于两个系列。进行针对具体应用的核对时，请提供发动机出厂编号、所装部件标记与图纸版本。本公开目录并不代表可访问最新的原厂产品目录与当前库存。`,'''),
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
