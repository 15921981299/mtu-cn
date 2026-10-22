# -*- coding: utf-8 -*-
"""mtu-parts.ts translation, chunk 3: manual entries, enriched array fields, map fallbacks."""
import io, sys

PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()

REPLACEMENTS = []

def rep(old, new, count=1):
    REPLACEMENTS.append((old, new, count))

# ── 25 manual entries (summary/availability/applications/notes) ──
rep("""    summary: 'MTU valve guide inquiry support for inlet-side service and overhaul work.',
    image: partImage,
    availability: 'Check stock and replacement status by engine serial number.',
    applications: ['Marine propulsion', 'Shipyard overhaul', 'Power generation'],
    notes: ['Confirm cylinder head configuration before ordering.', 'Send old part photos when size marking is unclear.'],""",
"""    summary: 'MTU 进气门导管询价支持——面向进气侧保养与大修作业。',
    image: partImage,
    availability: '按发动机出厂编号核查库存与替换状态。',
    applications: ['船舶推进', '船厂大修', '发电'],
    notes: ['订购前确认缸盖构型。', '尺寸标识不清时请发送旧件照片。'],""")

rep("""    summary: 'Relief valve sourcing for MTU high-pressure fuel pump service.',
    image: partImage,
    availability: 'Quoted by pump model, engine series, and destination.',
    applications: ['Marine engines', 'Generator sets', 'Industrial power units'],
    notes: ['Verify pump configuration and fuel-system version.', 'Include engine model and serial number in the inquiry.'],""",
"""    summary: 'MTU 高压燃油泵保养用溢流阀寻源。',
    image: partImage,
    availability: '按泵型号、发动机系列与目的地报价。',
    applications: ['船用发动机', '发电机组', '工业动力机组'],
    notes: ['请核验泵构型与燃油系统版本。', '询价时请提供发动机型号与出厂编号。'],""")

rep("""    summary: 'MTU pressure sensor availability check with part-number and connector verification.',
    image: partImage,
    availability: 'Often requested for urgent service; confirm by part number and photo.',
    applications: ['Marine propulsion', 'Power generation', 'Rail maintenance'],
    notes: ['Send connector photo and installed location if possible.', 'Check supersession before shipment.'],""",
"""    summary: 'MTU 压力传感器供货核查——经零件号与接头核验。',
    image: partImage,
    availability: '紧急保养常用件；按零件号与照片确认。',
    applications: ['船舶推进', '发电', '轨道交通维修'],
    notes: ['如可能请提供接头照片与安装位置。', '发货前核查替代关系。'],""")

rep("""    summary: 'Pressure sensor inquiry page for MTU service teams and procurement buyers.',
    image: partImage,
    availability: 'Stock or sourcing route confirmed after serial-number check.',
    applications: ['Generator engines', 'Industrial engines', 'Marine auxiliary engines'],
    notes: ['Confirm whether the old part has a superseded reference.', 'Photos reduce wrong-sensor risk.'],""",
"""    summary: '面向 MTU 服务团队与采购客户的压力传感器询价页。',
    image: partImage,
    availability: '经出厂编号核查后确认库存或寻源路线。',
    applications: ['发电发动机', '工业发动机', '船用辅机'],
    notes: ['请确认旧件是否有被替代参考号。', '提供照片可降低错配风险。'],""")

rep("""    summary: 'MTU speed sensor support for control, monitoring, and engine protection systems.',
    image: partImage,
    availability: 'Check by sensor part number, engine model, and cable/connector details.',
    applications: ['Marine engines', 'Rail engines', 'Power generation'],
    notes: ['Confirm cable length and connector type.', 'Send nameplate or old sensor markings.'],""",
"""    summary: 'MTU 转速传感器——用于控制、监测与发动机保护系统。',
    image: partImage,
    availability: '按传感器零件号、发动机型号与电缆/接头细节核查。',
    applications: ['船用发动机', '轨交发动机', '发电'],
    notes: ['确认电缆长度与接头类型。', '请发送铭牌或旧传感器标识。'],""")

rep("""    summary: 'Speed sensor sourcing for MTU engine monitoring and replacement work.',
    image: partImage,
    availability: 'Quoted by stock, replacement option, and shipping destination.',
    applications: ['Shipyards', 'Generator maintenance', 'Fleet service'],
    notes: ['Send the old sensor photo before purchase.', 'Check compatibility against engine serial number.'],""",
"""    summary: 'MTU 发动机监测与更换用转速传感器寻源。',
    image: partImage,
    availability: '按库存、替换选项与运输目的地报价。',
    applications: ['船厂', '发电机组维修', '船队服务'],
    notes: ['购买前请发送旧传感器照片。', '对照发动机出厂编号核查适配性。'],""")

rep("""    summary: 'Oil spray nozzle support for MTU lubrication and overhaul maintenance.',
    image: partImage,
    availability: 'Available routes checked by series and required quantity.',
    applications: ['Marine propulsion', 'Major overhaul', 'Power plant service'],
    notes: ['Verify installed position and engine series.', 'Best ordered with related seals or gaskets.'],""",
"""    summary: 'MTU 润滑与大修保养用机油喷嘴支持。',
    image: partImage,
    availability: '按系列与所需数量核查可行路线。',
    applications: ['船舶推进', '大修', '电厂服务'],
    notes: ['核验安装位置与发动机系列。', '建议与相关密封件或垫片一同订购。'],""")

rep("""    summary: 'MTU repair kit inquiry support for planned service and urgent maintenance.',
    image: partImage,
    availability: 'Kit contents and lead time confirmed before quotation.',
    applications: ['Service workshops', 'Shipyards', 'Generator maintenance'],
    notes: ['Confirm kit scope before purchase.', 'Send engine model and repair location details.'],""",
"""    summary: 'MTU 修理包询价支持——面向计划保养与紧急维修。',
    image: partImage,
    availability: '报价前确认包内容物与交货期。',
    applications: ['维修车间', '船厂', '发电机组维修'],
    notes: ['购买前确认修理包范围。', '请提供发动机型号与维修位置细节。'],""")

rep("""    summary: 'Exhaust turbocharger sourcing for MTU marine and generator engines.',
    image: partImage,
    availability: 'New, replacement, or repair option quoted by application.',
    applications: ['Marine propulsion', 'Generator sets', 'Industrial engines'],
    notes: ['Confirm engine rating and turbocharger plate.', 'Shipping size and packing affect delivery route.'],""",
"""    summary: 'MTU 船用与发电发动机废气涡轮增压器寻源。',
    image: partImage,
    availability: '按应用报新件、替换或维修选项。',
    applications: ['船舶推进', '发电机组', '工业发动机'],
    notes: ['确认发动机功率标定与增压器铭牌。', '运输尺寸与包装影响发货路线。'],""")

rep("""    summary: 'MTU turbocharger availability check with application and rating verification.',
    image: partImage,
    availability: 'Quoted after checking rating, flange, and replacement route.',
    applications: ['Vessels', 'Power generation', 'Industrial equipment'],
    notes: ['Send turbocharger nameplate photo.', 'Include required delivery date for downtime orders.'],""",
"""    summary: 'MTU 增压器供货核查——经应用与功率标定核验。',
    image: partImage,
    availability: '核验标定、法兰与替换路线后报价。',
    applications: ['船舶', '发电', '工业设备'],
    notes: ['请发送增压器铭牌照片。', '停机订单请注明要求交期。'],""")

rep("""    summary: 'Seawater pump support for MTU marine cooling systems.',
    image: partImage,
    availability: 'Check by pump reference, engine model, and vessel location.',
    applications: ['Marine propulsion', 'Auxiliary engines', 'Shipyard repair'],
    notes: ['Photos of old pump and ports help confirm fit.', 'Ask for gasket and seal requirements together.'],""",
"""    summary: 'MTU 船用冷却系统海水泵支持。',
    image: partImage,
    availability: '按泵参考号、发动机型号与船舶位置核查。',
    applications: ['船舶推进', '辅机', '船厂维修'],
    notes: ['旧泵与接口照片有助于确认适配。', '请一并提出垫片与密封件需求。'],""")

rep("""    summary: 'MTU fuel delivery pump sourcing for service and repair.',
    image: partImage,
    availability: 'Quoted by engine serial number and stock route.',
    applications: ['Marine', 'Generator', 'Industrial engine service'],
    notes: ['Confirm pump reference on the old part.', 'Check related fuel lines or seals when replacing.'],""",
"""    summary: 'MTU 燃油输送泵寻源——面向保养与维修。',
    image: partImage,
    availability: '按发动机出厂编号与库存路线报价。',
    applications: ['船用', '发电', '工业发动机维修'],
    notes: ['确认旧件上的泵参考号。', '更换时检查相关燃油管或密封件。'],""")

rep("""    summary: 'Fuel rail connector inquiry support for MTU fuel-system maintenance.',
    image: partImage,
    availability: 'Line-item stock check available for overhaul lists.',
    applications: ['Marine engines', 'Power generation', 'Fleet maintenance'],
    notes: ['Verify rear rail configuration.', 'Send complete fuel-system list for consolidated quotation.'],""",
"""    summary: 'MTU 燃油系统保养用燃油轨接头询价支持。',
    image: partImage,
    availability: '大修清单可逐项核查库存。',
    applications: ['船用发动机', '发电', '船队保养'],
    notes: ['核验后轨构型。', '发送完整燃油系统清单以获得合并报价。'],""")

rep("""    summary: 'High-pressure fuel line sourcing for MTU 4000 service work.',
    image: partImage,
    availability: 'Checked by cylinder position, engine serial number, and required quantity.',
    applications: ['MTU 4000 marine engines', 'Generator maintenance', 'Industrial engines'],
    notes: ['Confirm exact line position.', 'Do not substitute without serial-number verification.'],""",
"""    summary: 'MTU 4000 保养用高压燃油管寻源。',
    image: partImage,
    availability: '按缸位、发动机出厂编号与所需数量核查。',
    applications: ['MTU 4000 船用发动机', '发电机组维修', '工业发动机'],
    notes: ['确认确切油管位置。', '未经出厂编号核验不得代用。'],""")

rep("""    summary: 'MTU flange inquiry support for cooling and fluid-circuit service.',
    image: partImage,
    availability: 'Confirmed by part number and old-part photo.',
    applications: ['Shipyard repair', 'Industrial engine service', 'Generator engines'],
    notes: ['Send mating part information when possible.', 'Confirm gasket needs before shipment.'],""",
"""    summary: 'MTU 法兰询价支持——面向冷却与液体回路保养。',
    image: partImage,
    availability: '经零件号与旧件照片确认。',
    applications: ['船厂维修', '工业发动机维修', '发电发动机'],
    notes: ['如可能请提供配合件信息。', '发货前确认垫片需求。'],""")

rep("""    summary: 'Coolant pump shaft support for MTU pump repair and overhaul.',
    image: partImage,
    availability: 'Availability checked by pump assembly and engine series.',
    applications: ['Marine engines', 'Power plants', 'Repair workshops'],
    notes: ['Confirm pump assembly reference.', 'Ask for seals and bearings in the same inquiry.'],""",
"""    summary: 'MTU 水泵维修与大修用水泵轴支持。',
    image: partImage,
    availability: '按泵总成与发动机系列核查供货。',
    applications: ['船用发动机', '电厂', '维修车间'],
    notes: ['确认泵总成参考号。', '请在同一询价中提出密封件与轴承需求。'],""")

rep("""    summary: 'MTU gasket sourcing for maintenance kits and overhaul lists.',
    image: partImage,
    availability: 'Good candidate for consolidated shipment with other service parts.',
    applications: ['Overhaul work', 'Routine service', 'Marine maintenance'],
    notes: ['Confirm engine series and installed position.', 'Send full gasket list for faster quote.'],""",
"""    summary: 'MTU 垫片寻源——面向保养包与大修清单。',
    image: partImage,
    availability: '适合与其他保养件合并发货。',
    applications: ['大修', '例行保养', '船用维修'],
    notes: ['确认发动机系列与安装位置。', '发送完整垫片清单以加快报价。'],""")

rep("""    summary: 'Gasket availability check for MTU service and repair requirements.',
    image: partImage,
    availability: 'Stock and replacement status checked after inquiry.',
    applications: ['Service kits', 'Generator maintenance', 'Shipyard service'],
    notes: ['Part-number verification prevents wrong gasket selection.', 'Quantity and destination affect packing route.'],""",
"""    summary: 'MTU 保养与维修用垫片供货核查。',
    image: partImage,
    availability: '询价后核查库存与替换状态。',
    applications: ['保养包', '发电机组维修', '船厂服务'],
    notes: ['零件号核验可避免垫片错选。', '数量与目的地影响包装路线。'],""")

rep("""    summary: 'Damper strip support for MTU fuel and engine assembly service.',
    image: partImage,
    availability: 'Checked by engine series and required quantity.',
    applications: ['Marine service', 'Industrial maintenance', 'Legacy engine support'],
    notes: ['Legacy series may require replacement confirmation.', 'Photos help when old markings are worn.'],""",
"""    summary: 'MTU 燃油与发动机装配保养用阻尼条支持。',
    image: partImage,
    availability: '按发动机系列与所需数量核查。',
    applications: ['船用服务', '工业维修', '老机型支持'],
    notes: ['老系列可能需要替换确认。', '旧标识磨损时照片有帮助。'],""")

rep("""    summary: 'Spring retainer sourcing for MTU cylinder-head and valve-train work.',
    image: partImage,
    availability: 'Quoted by stock or sourcing option.',
    applications: ['Cylinder-head repair', 'Major overhaul', 'Marine engines'],
    notes: ['Confirm matching valve-train parts.', 'Send quantities by cylinder count.'],""",
"""    summary: 'MTU 缸盖与配气机构作业用弹簧座寻源。',
    image: partImage,
    availability: '按库存或寻源选项报价。',
    applications: ['缸盖维修', '大修', '船用发动机'],
    notes: ['确认配套配气机构零件。', '请按缸数提供数量。'],""")

rep("""    summary: 'MTU gasket inquiry page for planned maintenance and repair.',
    image: partImage,
    availability: 'Line-item availability confirmed before quotation.',
    applications: ['Shipyards', 'Service companies', 'Power generation'],
    notes: ['Confirm exact part number against the manual.', 'Best quoted with other service-kit items.'],""",
"""    summary: 'MTU 垫片询价页——面向计划保养与维修。',
    image: partImage,
    availability: '报价前逐项确认供货情况。',
    applications: ['船厂', '服务公司', '发电'],
    notes: ['请对照手册确认准确零件号。', '建议与其他保养包件一并报价。'],""")

rep("""    summary: 'Coupling sourcing for MTU engine drive and auxiliary systems.',
    image: partImage,
    availability: 'Quoted by dimensions, old part photo, and engine application.',
    applications: ['Marine propulsion', 'Power generation', 'Industrial drives'],
    notes: ['Confirm mating equipment and installed position.', 'Packing size may affect freight choice.'],""",
"""    summary: 'MTU 发动机传动与辅助系统联轴器寻源。',
    image: partImage,
    availability: '按尺寸、旧件照片与发动机应用报价。',
    applications: ['船舶推进', '发电', '工业传动'],
    notes: ['确认配合设备与安装位置。', '包装尺寸可能影响运费选择。'],""")

rep("""    summary: 'Temperature sensor availability check for MTU monitoring and protection systems.',
    image: partImage,
    availability: 'Check stock by part number, connector, and engine serial number.',
    applications: ['Marine', 'Generator', 'Rail and industrial engines'],
    notes: ['Send connector photo.', 'Check supersession and installation point.'],""",
"""    summary: 'MTU 监测与保护系统用温度传感器供货核查。',
    image: partImage,
    availability: '按零件号、接头与发动机出厂编号核查库存。',
    applications: ['船用', '发电', '轨交与工业发动机'],
    notes: ['请发送接头照片。', '核查替代关系与安装点。'],""")

rep("""    summary: 'MTU air hose support for charge-air and intake system service.',
    image: partImage,
    availability: 'Availability confirmed by hose shape, old part photo, and part number.',
    applications: ['Marine engines', 'Industrial engines', 'Generator sets'],
    notes: ['Photos are useful because hose routing varies.', 'Ask for clamps or sleeves together.'],""",
"""    summary: 'MTU 充气与进气系统保养用空气软管支持。',
    image: partImage,
    availability: '经软管形状、旧件照片与零件号确认供货。',
    applications: ['船用发动机', '工业发动机', '发电机组'],
    notes: ['软管走向各异，照片很有用。', '请一并提出卡箍或护套需求。'],""")

rep("""    summary: 'Legacy MTU gasket sourcing for repair and maintenance programs.',
    image: partImage,
    availability: 'Legacy-part availability checked by engine series and quantity.',
    applications: ['Legacy marine engines', 'Industrial service', 'Repair workshops'],
    notes: ['Check superseded numbers before ordering.', 'Send old gasket or manual reference when possible.'],""",
"""    summary: '老型号 MTU 垫片寻源——面向维修与保养计划。',
    image: partImage,
    availability: '按发动机系列与数量核查老型号供货。',
    applications: ['老型号船用发动机', '工业服务', '维修车间'],
    notes: ['订购前核查被替代号。', '如可能请发送旧垫片或手册参考。'],""")

# ── enriched array: stockStatus (longest-first not needed: closing quote prevents collisions) ──
SS = [
 ("Common service item — typically in stock", "常用保养件——通常有库存"),
 ("Common overhaul item — standard grade in stock", "常用大修件——标准等级有库存"),
 ("Commonly in stock — kit pricing available", "常有库存——可报套件价"),
 ("Common overhaul item — kit pricing available", "常用大修件——可报套件价"),
 ("Standard grade — common stock item, confirmed after engine serial check", "标准等级——常备库存件，经出厂编号核查后确认"),
 ("Checked by engine variant — OEM and alternative options quoted", "按发动机变型核查——原厂与替代件均可报价"),
 ("Quoted by size grade — OEM and alternative grades available", "按尺寸等级报价——原厂与替代等级可选"),
 ("Quoted by engine serial and crown part number", "按发动机出厂编号与活塞顶零件号报价"),
 ("Quoted with matching crown — kit options available", "与配套活塞顶一并报价——可选套件"),
 ("Quoted by size grade (STD/0.25/0.50/0.75)", "按尺寸等级报价（标准/0.25/0.50/0.75）"),
 ("Commonly in stock — always replaced as a set", "常有库存——始终整组更换"),
 ("Quoted per unit or full set", "按件或整组报价"),
 ("Always replaced as a set during overhaul", "大修时始终整组更换"),
 ("Checked by part number — replaced during injector service", "按零件号核查——喷油器保养时更换"),
 ("Checked by turbocharger serial number — new and reman options", "按增压器出厂编号核查——新件与再制造件可选"),
 ("Quoted by turbo model and serial", "按增压器型号与出厂编号报价"),
 ("Checked by injector part number and engine serial — new and reman", "按喷油器零件号与发动机出厂编号核查——新件与再制造件"),
 ("Checked by engine application — new and reman options", "按发动机应用核查——新件与再制造件可选"),
 ("Quoted as set for cylinder-head work", "缸盖作业按组报价"),
 ("Checked by injector PN and engine serial — new and reman options", "按喷油器零件号与发动机出厂编号核查——新件与再制造件可选"),
 ("Quoted by engine serial — OEM and alternative options", "按发动机出厂编号报价——原厂与替代件可选"),
 ("Quoted by size grade (STD/0.25/0.50)", "按尺寸等级报价（标准/0.25/0.50）"),
 ("Checked by engine model — new and reman options", "按发动机型号核查——新件与再制造件可选"),
 ("Quoted by part number and connector type", "按零件号与接头类型报价"),
 ("Quoted by part number and engine variant", "按零件号与发动机变型报价"),
 ("Quoted by size grade — standard grade commonly available", "按尺寸等级报价——标准等级常供"),
 ("Checked by connector type and engine variant", "按接头类型与发动机变型核查"),
 ("Quoted by part number — OEM and alternative options", "按零件号报价——原厂与替代件可选"),
 ("Quoted by size grade — OEM and alternative options", "按尺寸等级报价——原厂与替代件可选"),
 ("Quoted with matching piston crown", "与配套活塞顶一并报价"),
 ("Quoted by engine serial and crown PN", "按发动机出厂编号与活塞顶零件号报价"),
 ("Quoted by engine serial and ECU version", "按发动机出厂编号与 ECU 版本报价"),
 ("Common service item", "常用保养件"),
 ("Small part — commonly in stock", "小件——常有库存"),
 ("Small consumable — typically in stock", "小型耗材——通常有库存"),
 ("Common sensor — typically in stock", "常用传感器——通常有库存"),
 ("Standard ring set item", "标准活塞环组件"),
 ("Common consumable — typically in stock", "常用耗材——通常有库存"),
 ("Quoted by part number and engine installation", "按零件号与发动机安装形式报价"),
 ("Common consumable — bulk quantities available", "常用耗材——可批量供货"),
 ("High-volume consumable — typically in stock", "高频耗材——通常有库存"),
 ("Checked by pump PN — new and reman options", "按泵零件号核查——新件与再制造件可选"),
 ("Small consumable — bulk quantities available", "小型耗材——可批量供货"),
 ("Checked by injector PN — new and reman options", "按喷油器零件号核查——新件与再制造件可选"),
 ("Checked by pump model — new and reman options", "按泵型号核查——新件与再制造件可选"),
 ("Common consumable item", "常用耗材"),
 ("Quoted per unit — OEM and alternative options", "按件报价——原厂与替代件可选"),
 ("Quoted by engine variant — OEM and alternative options", "按发动机变型报价——原厂与替代件可选"),
 ("Small consumable — commonly in stock", "小型耗材——常有库存"),
 ("Quoted by engine serial number", "按发动机出厂编号报价"),
 ("Quoted per unit or set", "按件或按组报价"),
 ("Quoted by size grade", "按尺寸等级报价"),
 ("Quoted per unit", "按件报价"),
 ("Quoted by part number", "按零件号报价"),
 ("Quoted by engine variant", "按发动机变型报价"),
 ("Quoted by engine application", "按发动机应用报价"),
 ("Quoted by pump model", "按泵型号报价"),
 ("Quoted by engine serial", "按发动机出厂编号报价"),
 ("Quoted by turbo model", "按增压器型号报价"),
 ("Small consumable", "小型耗材"),
 ("Checked by engine application", "按发动机应用核查"),
 ("Common injector service part", "喷油器常用保养件"),
 ("Availability checked per inquiry", "按询价逐项核查供货"),
 ("Checked by engine serial", "按发动机出厂编号核查"),
 ("Checked by connector type", "按接头类型核查"),
 ("Always replaced as a set", "始终整组更换"),
 ("Quoted by engine model", "按发动机型号报价"),
]
for en, zh in SS:
    rep("stockStatus: '%s'," % en, "stockStatus: '%s'," % zh, count=99)

# ── enriched array: commonFailureScenarios blocks ──
rep("commonFailureScenarios: ['Cavitation erosion on water-jacket side', 'Wear ridge at top ring travel — check at major overhaul', 'Scuffing from coolant contamination']",
    "commonFailureScenarios: ['水套侧气蚀侵蚀', '顶环行程处磨损台阶——大修时检查', '冷却液污染导致拉伤']")
rep("commonFailureScenarios: ['External coolant leak at cylinder head joint', 'Combustion gas blow-by into cooling system', 'Oil contamination in coolant from failed gasket']",
    "commonFailureScenarios: ['缸盖结合面外部冷却液泄漏', '燃烧气体窜入冷却系统', '垫片失效导致机油污染冷却液']")
rep("commonFailureScenarios: ['Uneven fuel delivery causing cylinder imbalance', 'Nozzle tip carbon fouling at high hours', 'Internal leakage raising return-flow volume']",
    "commonFailureScenarios: ['燃油供给不均导致缸间不均衡', '高工时后喷嘴头部积碳', '内部泄漏使回油量升高']")
rep("commonFailureScenarios: ['Nozzle coking from low-load operation', 'Injector body internal wear at 12,000-15,000 hours', 'Sealing surface leakage causing compression loss']",
    "commonFailureScenarios: ['低负荷运行导致喷嘴结焦', '喷油器体内磨损（12,000–15,000 小时）', '密封面泄漏导致压缩损失']")

# ── enriched array: orderingNotes ──
rep("orderingNotes: 'Always verify size grade (0/1/2) via engine serial number before ordering. Replace liner, piston rings, and sealing rings as a set.'",
    "orderingNotes: '订购前务必经发动机出厂编号核验尺寸等级（0/1/2）。缸套、活塞环与密封环应整组更换。'")
rep("orderingNotes: 'Replace as a complete set (one per cylinder). Always replace head bolts at the same time.'",
    "orderingNotes: '整组更换（每缸一件）。同时务必更换缸盖螺栓。'")
rep("orderingNotes: 'Send injector serial number for reman exchange. New OEM and OEM-alternative both available.'",
    "orderingNotes: '再制造置换请提供喷油器出厂编号。新原厂件与原厂配套替代件均可提供。'")
rep("orderingNotes: 'Reman exchange program available — core return required. New OEM-alternative injectors also quoted. Send engine serial and injector part number.'",
    "orderingNotes: '可走再制造置换——需退回旧芯。新原厂配套替代喷油器亦可报价。请提供发动机出厂编号与喷油器零件号。'")

# ── catalog-seed map fallbacks ──
rep("      availability: 'Stock, replacement status, lead time, and shipping route confirmed after inquiry.',",
    "      availability: '库存、替换状态、交货期与运输路线均在询价后确认。',")
rep("""      notes: [
        'Confirm engine model, serial number, required quantity, and destination before ordering.',
        'Send old part photos or nameplate details when markings or replacement status are unclear.',
      ],""",
"""      notes: [
        '订购前请确认发动机型号、出厂编号、所需数量与收货地。',
        '标识或替换状态不明确时，请发送旧件照片或铭牌信息。',
      ],""")
rep("      dimensions: spec.dimensions ?? seed.dimensions ?? 'Confirm by part number, old-part photo, or catalog drawing',",
    "      dimensions: spec.dimensions ?? seed.dimensions ?? '按零件号、旧件照片或目录图纸确认',")

missed = []
for old, new, count in REPLACEMENTS:
    found = t.count(old)
    if found < 1:
        missed.append((old[:70], 'found 0'))
        continue
    t = t.replace(old, new, count if count < 99 else found)

io.open(PATH, 'w', encoding='utf-8').write(t)
print('applied:', len(REPLACEMENTS) - len(missed), '/', len(REPLACEMENTS))
if missed:
    print('MISSED:')
    for m, why in missed:
        print(' -', m, '|', why)
    sys.exit(1)
