# -*- coding: utf-8 -*-
"""mtu-parts.ts translation, chunk 1: categoryDefaults + generator templates."""
import io, sys

PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()

REPLACEMENTS = [
# ── categoryDefaults ──
("summary: 'Turbocharger component for MTU engines — verified by part number and engine serial number before quotation.',",
 "summary: 'MTU 发动机涡轮增压器（Turbocharger）配件——报价前按零件号与发动机出厂编号核验。',"),
("description: 'Turbocharger parts operate under high thermal and mechanical loads. We verify each part number against your engine serial number to confirm fitment across MTU series. Replacement and OEM-alternative options are quoted with lead time and shipping route.',",
 "description: '涡轮增压器（Turbocharger）配件在高热载与高机械载荷下工作。我们对照您的发动机出厂编号核验每个零件号，以确认在 MTU 各系列上的适配性。替换件与原厂配套替代（OEM-alternative）方案均随交货期与运输路线一并报价。',"),
("stockStatus: 'Checked by part number — new, OEM-alternative, or reman options quoted per inquiry',",
 "stockStatus: '按零件号核查——新件、原厂配套替代件或再制造件按询价报价',"),
("applications: ['Marine propulsion', 'Power generation', 'Locomotive engines', 'Heavy equipment'],",
 "applications: ['船舶推进', '发电', '机车发动机', '重型设备'],"),
("weightKg: 'Confirmed with quotation',\n    hsCode: '8414.90',",
 "weightKg: '报价时确认',\n    hsCode: '8414.90',"),
("leadTime: 'Stock: 3-7 working days. Special order: 2-4 weeks. Reman: quoted per core availability.',",
 "leadTime: '现货：3–7 个工作日；特殊订货：2–4 周；再制造件：按旧芯供应情况报价。',"),
("dimensions: 'Varies by turbocharger model — quoted on inquiry with engine and turbo serial numbers',",
 "dimensions: '因增压器型号而异——询价时请提供发动机与增压器编号',"),

("summary: 'MTU filter element — oil, fuel, air, or coolant. Part-number verification confirms compatibility.',",
 "summary: 'MTU 滤清器滤芯——机油、燃油、空气或冷却液。零件号核验确认适配性。',"),
("description: 'Filters are high-frequency consumables in any MTU maintenance program. We stock common filter references and can source application-specific elements. Bulk quantities available for fleet and service-company programs.',",
 "description: '滤清器是 MTU 维护计划中的高频易损件。我们常备常用滤清器参考号，并可寻源特定应用滤芯。面向船队与服务公司计划可提供批量数量。',"),
("stockStatus: 'Common references in stock — confirmed after part-number check',",
 "stockStatus: '常用参考号有库存——零件号核对后确认',"),
("applications: ['Scheduled maintenance', 'Fleet service programs', 'Marine engine rooms', 'Generator servicing'],",
 "applications: ['定期保养', '船队服务计划', '船舶机舱', '发电机组维修'],"),
("leadTime: 'Common references: 2-5 working days. Bulk orders: 1-2 weeks.',",
 "leadTime: '常用参考号：2–5 个工作日；批量订单：1–2 周。',"),
("dimensions: 'Varies by filter type — spin-on cartridges typically 80-150mm OD x 150-300mm L',",
 "dimensions: '因滤清器类型而异——旋装式滤芯外径通常 80–150mm、长度 150–300mm',"),

("summary: 'MTU fuel-system component — injectors, pumps, valves, lines. Verified by engine model and serial number.',",
 "summary: 'MTU 燃油系统配件——喷油器、泵、阀、管路。经发动机型号与出厂编号核验。',"),
("description: 'Fuel-system parts directly affect combustion quality, emissions compliance, and fuel economy. We confirm fitment by engine model and serial number. OEM and OEM-alternative options available; reman options quoted where applicable.',",
 "description: '燃油系统配件直接影响燃烧质量、排放合规与燃油经济性。我们按发动机型号与出厂编号确认适配。可提供原厂配套（OEM）与原厂配套替代件；适用时再制造件亦可报价。',"),
("stockStatus: 'Checked per part number and engine application',",
 "stockStatus: '按零件号与发动机应用逐项核查',"),
("applications: ['Marine diesel engines', 'Power generation sets', 'Rail traction engines', 'Industrial equipment'],",
 "applications: ['船用柴油发动机', '发电机组', '轨道交通牵引发动机', '工业设备'],"),
("leadTime: 'New OEM: 5-10 working days. Reman exchange: 3-7 working days after core approval. OEM-alternative: 3-7 working days.',",
 "leadTime: '新原厂件：5–10 个工作日；再制造置换：旧芯确认后 3–7 个工作日；原厂配套替代件：3–7 个工作日。',"),
("dimensions: 'Confirmed by part number with quotation',",
 "dimensions: '报价时按零件号确认',"),

("summary: 'MTU sensor, solenoid, or electrical component — verified by connector type and engine installation.',",
 "summary: 'MTU 传感器、电磁阀或电气元件——经接头类型与发动机安装形式核验。',"),
("description: 'Electrical and sensor parts require precise matching — connector type, thread size, and signal range all vary by engine installation. We cross-check your part number against the engine serial number to avoid mismatch.',",
 "description: '电气与传感器配件需要精确匹配——接头类型、螺纹尺寸与信号量程随发动机安装形式而异。我们对照发动机出厂编号交叉核验您的零件号，避免错配。',"),
("stockStatus: 'Quoted after part-number and connector check',",
 "stockStatus: '零件号与接头核对后报价',"),
("applications: ['Engine monitoring systems', 'Control panels', 'Retrofit and upgrade projects'],",
 "applications: ['发动机监控系统', '控制柜', '改造与升级项目'],"),
("leadTime: 'Common sensors: 3-7 working days. Special-range or legacy sensors: 1-3 weeks.',",
 "leadTime: '常用传感器：3–7 个工作日；特殊量程或老型号传感器：1–3 周。',"),
("dimensions: 'Sensors typically M12-M18 thread, 40-120mm length; solenoid valves vary — quoted on inquiry',",
 "dimensions: '传感器通常为 M12–M18 螺纹、长 40–120mm；电磁阀不一——询价时确认',"),

("summary: 'MTU piston, liner, or ring set — size grade and engine series must match exactly.',",
 "summary: 'MTU 活塞、缸套或活塞环组——尺寸等级与发动机系列必须精确匹配。',"),
("description: 'Pistons, liners, and rings are size-graded components. Incorrect grade selection causes premature wear or seizure. We verify size code, engine series, and serial number before quotation. OEM and OEM-alternative grades available.',",
 "description: '活塞、缸套与活塞环均为分尺寸等级零件。等级选错会导致早期磨损或咬缸。报价前我们核验尺寸代码、发动机系列与出厂编号。可提供原厂配套与原厂配套替代等级。',"),
("stockStatus: 'Quoted by size grade and series — OEM and alternative options',",
 "stockStatus: '按尺寸等级与系列报价——原厂与替代方案可选',"),
("applications: ['Major overhaul', 'In-frame rebuild', 'Marine engine service', 'Industrial engine repair'],",
 "applications: ['大修', '就车翻新', '船用发动机维修', '工业发动机维修'],"),
("leadTime: 'Standard size grades: 5-10 working days. Non-standard grades: 2-6 weeks.',",
 "leadTime: '标准尺寸等级：5–10 个工作日；非标准等级：2–6 周。',"),

("summary: 'MTU valve-train component — valves, springs, guides, tappets. Part number and engine series verified.',",
 "summary: 'MTU 配气机构配件——气门、弹簧、导管、挺柱。零件号与发动机系列已经核验。',"),
("description: 'Valve-train wear directly affects compression, fuel efficiency, and exhaust emissions. We confirm part number, engine series, and installation position before quotation. Kits available for cylinder-head overhaul programs.',",
 "description: '配气机构磨损直接影响压缩比、燃油效率与排放。报价前我们确认零件号、发动机系列与安装位置。缸盖大修计划可提供套件。',"),
("stockStatus: 'Quoted per part number — kit pricing available for overhaul quantities',",
 "stockStatus: '按零件号报价——大修批量可享套件价',"),
("applications: ['Cylinder-head overhaul', 'Marine engine maintenance', 'Power generation service'],",
 "applications: ['缸盖大修', '船用发动机保养', '发电服务'],"),
("leadTime: 'Common valves/springs: 3-7 working days. Full kit quantities: 1-2 weeks.',",
 "leadTime: '常用气门/弹簧：3–7 个工作日；整套数量：1–2 周。',"),

("summary: 'MTU bearing — crankshaft, connecting rod, camshaft, or thrust. Size grade must match engine specification.',",
 "summary: 'MTU 轴承——曲轴、连杆、凸轮轴或推力轴承。尺寸等级必须与发动机规格一致。',"),
("description: 'Bearings are precision-graded components. Undersize, standard, and oversize grades available. We verify engine serial number to confirm the correct grade before quotation.',",
 "description: '轴承是精密分等级零件，可提供小尺寸、标准与加大等级。报价前我们核验发动机出厂编号以确认正确等级。',"),
("stockStatus: 'Quoted by size grade — standard grades more readily available',",
 "stockStatus: '按尺寸等级报价——标准等级更易供货',"),
("applications: ['Engine overhaul', 'Crankshaft service', 'Marine and industrial engines'],",
 "applications: ['发动机大修', '曲轴维修', '船用与工业发动机'],"),
("leadTime: 'Standard size grades: 3-7 working days. Undersize/oversize grades: 1-3 weeks.',",
 "leadTime: '标准尺寸等级：3–7 个工作日；小尺寸/加大等级：1–3 周。',"),

("summary: 'MTU gasket or seal — cylinder head, exhaust, oil, water. Correct material grade confirmed before quotation.',",
 "summary: 'MTU 垫片或密封件——缸盖、排气、机油、水路。报价前确认正确的材料等级。',"),
("description: 'Gaskets and seals are application-specific — material grade, thickness, and shape all vary by engine installation. We confirm part number against engine series and recommend full gasket kits for overhaul projects.',",
 "description: '垫片与密封件按应用而定——材料等级、厚度与形状随发动机安装形式而异。我们对照发动机系列确认零件号，并为大修项目推荐整套垫片包。',"),
("stockStatus: 'Common gaskets in stock — special grades quoted per inquiry',",
 "stockStatus: '常用垫片有库存——特殊等级按询价报价',"),
("applications: ['Overhaul kits', 'Marine service', 'Industrial maintenance', 'Generator repair'],",
 "applications: ['大修包', '船用服务', '工业维护', '发电机组维修'],"),
("leadTime: 'Common gaskets/O-rings: 2-5 working days. Special material grades: 1-3 weeks.',",
 "leadTime: '常用垫片/O 型圈：2–5 个工作日；特殊材料等级：1–3 周。',"),
("dimensions: 'Individual gaskets vary by application; complete kits quoted with full parts list',",
 "dimensions: '单个垫片因应用而异；整套包按完整零件清单报价',"),

("summary: 'MTU cooling-system component — pumps, thermostats, hoses, flanges. Verified by engine model and installation.',",
 "summary: 'MTU 冷却系统配件——水泵、节温器、软管、法兰。经发动机型号与安装形式核验。',"),
("description: 'Cooling-system parts vary by engine application — marine (raw-water or keel-cooled), industrial (radiator), or rail. We confirm the correct variant by engine model and serial number.',",
 "description: '冷却系统配件因发动机应用而异——船用（开式海水冷却或舷外冷却）、工业（散热器）或轨交。我们按发动机型号与出厂编号确认正确变型。',"),
("stockStatus: 'Quoted per part number and engine application',",
 "stockStatus: '按零件号与发动机应用报价',"),
("applications: ['Marine cooling systems', 'Industrial radiator systems', 'Generator cooling'],",
 "applications: ['船用冷却系统', '工业散热器系统', '发电机组冷却'],"),
("leadTime: 'Pumps: 5-15 working days depending on model. Impellers: 2-5 working days. Thermostats: 3-7 working days.',",
 "leadTime: '水泵：视型号 5–15 个工作日；叶轮：2–5 个工作日；节温器：3–7 个工作日。',"),

("summary: 'MTU lubrication-system component — pumps, coolers, nozzles, separators. Part number and series verified.',",
 "summary: 'MTU 润滑系统配件——油泵、冷却器、喷嘴、分离器。零件号与系列已经核验。',"),
("description: 'Lubrication parts are critical to engine life. We verify every part number against your engine serial number and can quote complete lube-system kits for major service intervals.',",
 "description: '润滑配件关乎发动机寿命。我们对照您的发动机出厂编号核验每个零件号，并可按主要保养周期报整套润滑系统包。',"),
("stockStatus: 'Quoted per part number — kit options available',",
 "stockStatus: '按零件号报价——可选套件',"),
("applications: ['Marine engines', 'Industrial engines', 'Generator maintenance'],",
 "applications: ['船用发动机', '工业发动机', '发电机组保养'],"),
("leadTime: 'Oil pumps and coolers: 5-15 working days. Spray nozzles and separators: 3-7 working days.',",
 "leadTime: '机油泵与冷却器：5–15 个工作日；喷嘴与分离器：3–7 个工作日。',"),

("summary: 'MTU drive component — bolts, nuts, washers, clamps, couplings. Verified by engine assembly position.',",
 "summary: 'MTU 传动元件——螺栓、螺母、垫圈、卡箍、联轴器。经发动机装配位置核验。',"),
("description: 'Drive and fastening components must match the engine assembly revision. We verify part numbers against the latest parts catalog for your engine serial number.',",
 "description: '传动与紧固元件必须与发动机装配版本一致。我们对照您发动机出厂编号对应的最新零件目录核验零件号。',"),
("stockStatus: 'Common fasteners in stock — special items quoted per inquiry',",
 "stockStatus: '常用紧固件有库存——特殊件按询价报价',"),
("applications: ['Engine assembly', 'Marine propulsion', 'Industrial drives', 'Generator sets'],",
 "applications: ['发动机装配', '船舶推进', '工业传动', '发电机组'],"),
("leadTime: 'Common fasteners: 2-5 working days. Special bolts/couplings: 1-3 weeks.',",
 "leadTime: '常用紧固件：2–5 个工作日；特殊螺栓/联轴器：1–3 周。',"),
("dimensions: 'Fasteners M6-M24 typical; couplings vary by shaft size — quoted on inquiry',",
 "dimensions: '紧固件通常为 M6–M24；联轴器随轴径而异——询价时确认',"),

("summary: 'MTU air and intake component — filters, hoses, manifolds. Verified by engine model.',",
 "summary: 'MTU 进气系统配件——滤清器、软管、歧管。经发动机型号核验。',"),
("description: 'Air-system parts must match the engine intake configuration. We confirm part numbers by engine model and can quote complete air-filter service kits.',",
 "description: '进气系统配件必须与发动机进气配置一致。我们按发动机型号确认零件号，并可报整套空气滤清器保养包。',"),
("stockStatus: 'Filter elements commonly in stock — special items quoted',",
 "stockStatus: '滤芯常有库存——特殊件报价待确认',"),
("applications: ['Marine engine rooms', 'Industrial sites', 'Generator enclosures'],",
 "applications: ['船舶机舱', '工业现场', '发电机组罩壳'],"),
("leadTime: 'Filter elements: 2-5 working days. Intake manifolds and hoses: 1-3 weeks.',",
 "leadTime: '滤芯：2–5 个工作日；进气歧管与软管：1–3 周。',"),

("summary: 'MTU engine component — verified by part number, engine model, and serial number.',",
 "summary: 'MTU 发动机组件——按零件号、发动机型号与出厂编号核验。',"),
("description: 'General engine components are verified against your engine serial number and the latest MTU parts catalog revision. We confirm fitment, stock status, and shipping options before quotation.',",
 "description: '通用发动机组件对照您的发动机出厂编号与最新版 MTU 零件目录核验。报价前我们确认适配性、库存状态与运输方案。',"),
("stockStatus: 'Quoted per part number after engine verification',",
 "stockStatus: '发动机核验后按零件号报价',"),
("applications: ['Marine service', 'Industrial maintenance', 'Power generation', 'Rail traction'],",
 "applications: ['船用服务', '工业维护', '发电', '轨道交通牵引'],"),
("leadTime: 'Quoted per part number after engine verification — typically 3-15 working days.',",
 "leadTime: '发动机核验后按零件号报价——通常 3–15 个工作日。',"),
("dimensions: 'Varies by component — quoted on inquiry with part number and engine model',",
 "dimensions: '因零件而异——询价时请提供零件号与发动机型号',"),

("summary: 'MTU engine control component — governor, actuator, or monitoring device. Verified by engine configuration.',",
 "summary: 'MTU 发动机控制元件——调速器、执行器或监测设备。经发动机构型核验。',"),
("description: 'Control components are configuration-specific. We verify your part number and engine serial number to confirm the correct control-system variant.',",
 "description: '控制元件随构型而定。我们核验您的零件号与发动机出厂编号，以确认正确的控制系统变型。',"),
("stockStatus: 'Quoted per part number and engine configuration',",
 "stockStatus: '按零件号与发动机构型报价',"),
("applications: ['Engine control systems', 'Marine automation', 'Generator control panels'],",
 "applications: ['发动机控制系统', '船舶自动化', '发电机组控制屏'],"),
("leadTime: 'Quoted per part number — typically 5-15 working days depending on configuration.',",
 "leadTime: '按零件号报价——视构型通常 5–15 个工作日。',"),
("dimensions: 'Governors and actuators vary by model — quoted on inquiry with engine serial number',",
 "dimensions: '调速器与执行器随型号而异——询价时请提供发动机出厂编号',"),

# ── inferLeadTime ──
("    ? 'Common references are usually checked fastest'\n    : 'Quoted by stock, replacement route, and destination';",
 "    ? '常用参考号通常核查最快'\n    : '按库存、替换路线与目的地报价';"),

# ── createCatalogPart ──
("    availability: 'Stock, replacement status, lead time, and shipping route confirmed after inquiry.',",
 "    availability: '库存、替换状态、交货期与运输路线均在询价后确认。',"),
("      `For ${part.partNumber}, confirm engine model, serial number, required quantity, and destination before ordering.`,\n      `If ${part.partNumber} markings or replacement status are unclear, send old-part photos or nameplate details.`,",
 "      `订购 ${part.partNumber} 前，请确认发动机型号、出厂编号、所需数量与收货地。`,\n      `如 ${part.partNumber} 的标识或替换状态不明确，请发送旧件照片或铭牌信息。`,"),
("    dimensions: part.dimensions ?? spec.dimensions ?? 'Confirm by part number, old-part photo, or catalog drawing',",
 "    dimensions: part.dimensions ?? spec.dimensions ?? '按零件号、旧件照片或目录图纸确认',"),
]

missed = []
for old, new in REPLACEMENTS:
    if old not in t:
        missed.append(old[:80])
        continue
    t = t.replace(old, new, 1)

io.open(PATH, 'w', encoding='utf-8').write(t)
print('applied:', len(REPLACEMENTS) - len(missed), '/', len(REPLACEMENTS))
if missed:
    print('MISSED:')
    for m in missed: print(' -', m)
    sys.exit(1)
