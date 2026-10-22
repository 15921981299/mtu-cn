# -*- coding: utf-8 -*-
"""hub translation: category hubs."""
import io, sys
PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()
REPLACEMENTS = [
  # ── 1. mtu-filters ──
  ('''    title: 'MTU Oil, Fuel & Air Filters | Parts Catalog',
    h1Title: 'MTU Oil, Fuel, Air & Coolant Filters',
    summary: 'MTU filter elements for scheduled maintenance and overhaul — oil filters, fuel filters, air filters, and coolant filters.',
    description: 'Compare MTU oil, fuel, air, and coolant filter references by installed number and engine application. Send a single filter number or a mixed service list for availability and shipping checks.',
    searchTopics: [
      {
        title: 'MTU Oil Filters',
        description: 'Spin-on oil filters and replaceable filter cartridges for routine service and fleet replenishment.',
      },
      {
        title: 'MTU Fuel Filters',
        description: 'Primary and secondary fuel filters selected by exact part number and engine application.',
      },
      {
        title: 'MTU Air Filters',
        description: 'Air-filter elements and intake filtration references for marine, generator, and industrial engines.',
      },
    ],
    longDescription: `Oil-filter references include 0031845201 and 0031845301; fuel-filter references include X57508300091 and 0020922801. Air filters such as 0030944304 and replaceable elements such as 0000925105 require different mounting and sealing checks.

    For spin-on filters, confirm the mounting thread, sealing-ring dimensions, canister diameter, and height. For cartridge elements, include the housing number, end-cap arrangement, and filtration rating. A matching outer diameter or engine series alone does not establish interchangeability.

    Keep the installed number in your inquiry even when a newer reference is listed. X57508300091 has X59408300151 listed as a later catalog number, while 0020922801 has X00012879. Each replacement needs an application check.

    Send part numbers, quantities, and destination to start an inquiry. Add label photos or a datasheet request when dimensions are unclear. Service intervals follow the engine's maintenance documentation and operating conditions.`,''',
   '''    title: 'MTU 机油、燃油与空气滤清器零件目录',
    h1Title: 'MTU 机油、燃油、空气与冷却液滤清器',
    summary: '适用于定期保养与大修的 MTU 滤芯——涵盖机油滤清器、燃油滤清器、空气滤清器和冷却液滤清器。',
    description: '按机上零件号与发动机应用场景对比 MTU 机油、燃油、空气及冷却液滤清器型号。可发送单个滤清器零件号或混合保养清单，以核查供货情况与发货安排。',
    searchTopics: [
      {
        title: 'MTU 机油滤清器',
        description: '旋装式机油滤清器与可更换滤芯，适用于日常保养与机群补给。',
      },
      {
        title: 'MTU 燃油滤清器',
        description: '按确切零件号与发动机应用选型的一级与二级燃油滤清器。',
      },
      {
        title: 'MTU 空气滤清器',
        description: '适用于船用、发电与工业发动机的空气滤清器滤芯及进气过滤型号。',
      },
    ],
    longDescription: `机油滤清器（Oil Filter）型号包括 0031845201 与 0031845301；燃油滤清器型号包括 X57508300091 与 0020922801。空气滤清器如 0030944304，可更换滤芯如 0000925105，安装方式与密封检查要求各不相同。

    对于旋装式滤清器，需确认安装螺纹、密封环尺寸、滤筒直径与高度；对于筒式滤芯，请提供壳体型号、端盖形式与过滤精度。仅凭外径相同或发动机系列相同，不能认定可互换。

    询价时请保留机上现有零件号，即使目录中已列出更新型号：X57508300091 在目录中的后续型号为 X59408300151，0020922801 的后续型号为 X00012879。每个替代号均需进行适用性核查。

    询价请提供零件号、数量与目的地；如尺寸不明确，可附上标签照片或索取数据表。保养周期遵循发动机的维护文件与运行工况。`,'''),
  # ── 2. mtu-injectors ──
  ('''    title: 'MTU Injectors & Nozzle Parts | Parts Catalog',
    h1Title: 'MTU Engine Injectors & Nozzle Parts',
    summary: 'MTU injectors, nozzle holders, nozzle elements, and related injection parts verified by stamped reference and engine serial number.',
    description: 'Browse MTU injector and nozzle references for 2000, 4000, 396, 595, and 956 series engines. New, OEM-alternative, and remanufactured routes are quoted only after the stamped injector number, complete engine model, and serial number have been checked.',
    searchTopics: [
      {
        title: 'MTU Engine Injectors',
        description: 'New, OEM-alternative, and reman injector routes verified by stamped reference and engine serial number.',
      },
      {
        title: 'MTU Fuel Pumps',
        description: 'High-pressure and low-pressure fuel pumps checked against model, rating, and installation position.',
        href: '/part-products/catalog/mtu-fuel-pumps/',
      },
      {
        title: 'MTU Injector Identification',
        description: 'Use the complete body marking, connector, nozzle reference, engine model, and serial number to separate nearby injector variants.',
      },
    ],
    longDescription: `MTU common-rail and unit-pump injection systems operate at extreme pressure. Injector performance directly affects combustion balance, exhaust temperature, fuel consumption, and emissions. A single underperforming injector can cause hard starting, rough running, excessive smoke, increased return flow, or a cylinder-temperature deviation.

    This page is limited to injectors, nozzle holders, nozzle elements, and directly related injection components. We supply new OEM, OEM-alternative, and professionally remanufactured routes when available. A remanufactured option should be supported by a traceable test process and clearly identified as remanufactured in the quotation.

    References include EX52407500064 for MTU 4000 catalog applications and X53507500012 for MTU 2000 catalog applications. Send the complete number stamped on the injector body, including prefixes, plus connector and nozzle-end photos. Multiple variants can exist within one engine series because of power rating, emissions configuration, or production revision.

    For injector dimensions in millimeters or inches, request the offered unit's drawing or measurements with clearly identified endpoints. The EX52407500064 page does not yet publish verified dimensions. For a remanufactured option, ask what test documentation and core-return conditions apply.

    If the fault relates to supply pressure rather than injection quality, use the dedicated MTU fuel-pump catalog. Pump quotations require the pump label, drive arrangement, installation position, engine model, and serial number.`,''',
   '''    title: 'MTU 喷油器与喷嘴零件目录',
    h1Title: 'MTU 发动机喷油器与喷嘴零件',
    summary: 'MTU 喷油器、喷嘴座、喷嘴芯及相关喷射零件，均按壳体压印编号与发动机出厂编号核验。',
    description: '浏览适用于 2000、4000、396、595 与 956 系列发动机的 MTU 喷油器与喷嘴型号。新原厂配套（OEM）件、原厂配套替代件与再制造件路线，仅在核验喷油器压印编号、完整发动机型号与出厂编号后报价。',
    searchTopics: [
      {
        title: 'MTU 发动机喷油器',
        description: '新件、原厂配套替代件与再制造喷油器路线，按压印编号与发动机出厂编号核验。',
      },
      {
        title: 'MTU 燃油泵',
        description: '高压与低压燃油泵，按型号、功率等级与安装位置核验。',
        href: '/part-products/catalog/mtu-fuel-pumps/',
      },
      {
        title: 'MTU 喷油器鉴别',
        description: '通过完整的壳体标记、连接器、喷嘴型号、发动机型号与出厂编号，区分相近的喷油器变体。',
      },
    ],
    longDescription: `MTU 共轨（Common-rail）与单体泵（Unit-pump）喷射系统在极高压力下运行。喷油器性能直接影响燃烧均衡、排气温度、燃油消耗与排放。单个喷油器性能不良即可导致启动困难、运转不稳、排烟过量、回油量增大或缸温偏差。

    本页仅涵盖喷油器、喷嘴座、喷嘴芯及直接相关的喷射部件。可供货渠道包括新原厂配套（OEM）件、原厂配套替代件与专业再制造件，视供货情况而定。再制造件应具备可追溯的测试流程，并在报价中明确标注为再制造件。

    涉及的型号包括适用于 MTU 4000 目录应用的 EX52407500064，以及适用于 MTU 2000 目录应用的 X53507500012。请提供喷油器壳体上压印的完整编号（含前缀），并附上连接器与喷嘴端照片。同一发动机系列内可能因功率等级、排放配置或生产版本不同而存在多个变体。

    如需喷油器的毫米或英寸尺寸，请索取所报产品的图纸或标注了明确端点的测量数据。EX52407500064 页面尚未发布经核验的尺寸。对于再制造件，请询问适用的测试文件与旧件返还条件。

    如故障与供油压力相关而非喷射质量，请查阅 MTU 燃油泵专题目录。燃油泵询价需提供油泵铭牌、传动形式、安装位置、发动机型号与出厂编号。`,'''),
  # ── 3. mtu-fuel-pumps ──
  ('''    title: 'MTU Fuel Pumps | High & Low Pressure Parts Catalog',
    h1Title: 'MTU Fuel Pumps',
    summary: 'MTU high-pressure fuel pumps, low-pressure feed pumps, hand pumps, and delivery-pump references for marine, generator, rail, and industrial engines.',
    description: 'Browse MTU fuel pump references and send the pump nameplate, complete engine model, serial number, installation position, and required quantity for compatibility verification before quotation.',
    searchTopics: [
      {
        title: 'MTU High-Pressure Fuel Pumps',
        description: 'High-pressure pump assemblies checked by pump label, engine rating, emissions configuration, and serial number.',
      },
      {
        title: 'MTU Low-Pressure Fuel Pumps',
        description: 'Feed and delivery pumps verified by inlet and outlet arrangement, drive type, and engine application.',
      },
      {
        title: 'MTU Injectors and Nozzles',
        description: 'Injection components have a separate catalog so injector and pump search intent remains clear.',
        href: '/part-products/catalog/mtu-injectors/',
      },
    ],
    longDescription: `An MTU fuel pump must be matched by more than the engine series. High-pressure pumps, low-pressure feed pumps, hand-priming pumps, and delivery pumps differ by pressure range, drive arrangement, port orientation, engine rating, and production revision. Ordering from a shortened engine description can result in a pump that mounts correctly but does not meet the required pressure or control specification.

    This catalog focuses only on fuel-pump references, including X53508200001 low-pressure fuel pump, E0060704101 high-pressure fuel pump, X52808100014 fuel delivery pump, X53608200005 low-pressure fuel pump, and related delivery-pump assemblies. Availability can include new OEM, OEM-alternative, remanufactured, or replacement routes, with the supply condition stated clearly in the quotation.

    Common pump-related service symptoms include difficult priming, low rail or supply pressure, power loss under load, abnormal pump noise, external leakage, and pressure faults that remain after filters and control valves have been checked. These symptoms do not prove that the pump itself has failed, so a diagnostic code, measured pressure, and existing pump label are useful before ordering.

    For an RFQ, send the complete pump number, engine model and serial number, pump nameplate photo, inlet and outlet orientation, quantity, destination, and required delivery date. For a remanufactured route, also confirm whether a serviceable core is available.`,''',
   '''    title: 'MTU 燃油泵零件目录——高压与低压',
    h1Title: 'MTU 燃油泵',
    summary: 'MTU 高压燃油泵、低压供油泵、手泵与输油泵型号，适用于船用、发电、轨道交通与工业发动机。',
    description: '浏览 MTU 燃油泵型号；报价前请提供油泵铭牌、完整发动机型号、出厂编号、安装位置与所需数量，以完成适配性核验。',
    searchTopics: [
      {
        title: 'MTU 高压燃油泵',
        description: '高压泵总成，按油泵铭牌、发动机功率等级、排放配置与出厂编号核验。',
      },
      {
        title: 'MTU 低压燃油泵',
        description: '供油泵与输油泵，按进出油口布置、传动形式与发动机应用场景核验。',
      },
      {
        title: 'MTU 喷油器与喷嘴',
        description: '喷射部件设有独立目录，以便喷油器与燃油泵的检索意图保持清晰。',
        href: '/part-products/catalog/mtu-injectors/',
      },
    ],
    longDescription: `MTU 燃油泵的适配不能仅凭发动机系列确定。高压泵、低压供油泵、手压泵与输油泵在压力范围、传动形式、油口朝向、发动机功率等级与生产版本上各有不同。仅凭简化的发动机描述下单，可能买到安装无误但压力或控制规格不达标的油泵。

    本目录仅聚焦燃油泵型号，包括 X53508200001 低压燃油泵、E0060704101 高压燃油泵、X52808100014 输油泵、X53608200005 低压燃油泵及相关输油泵总成。供货渠道可包括新原厂配套（OEM）件、原厂配套替代件、再制造件或替代件，报价中将明确注明供货状态。

    油泵相关的常见故障现象包括：预压困难、轨压或供油压力低、负载下功率下降、油泵异响、外部泄漏，以及在滤清器与控制阀检查完毕后仍存在的压力故障。这些现象并不能证明油泵本身已经失效，因此下单前提供故障码、实测压力与现有油泵铭牌信息将很有帮助。

    询价（RFQ）请提供完整油泵编号、发动机型号与出厂编号、油泵铭牌照片、进出油口朝向、数量、目的地与要求的交货期。如选择再制造件路线，还请确认是否具备可再制造的旧件。`,'''),
  # ── 4. mtu-turbocharger-parts ──
  ('''    title: 'MTU Turbocharger Parts — Turbine Wheels, Housings, Seals | Parts Catalog',
    h1Title: 'MTU Turbocharger Components',
    summary: 'MTU turbocharger parts — turbine wheels, bearing housings, heat shields, piston rings, and compressor wheels.',
    description: 'Turbocharger components operate under high thermal and mechanical loads. We verify each part number against your turbocharger serial number. New, OEM-alternative, and remanufactured options quoted per inquiry for MTU 2000, 4000, and 396 series engines.',
    searchTopics: [
      {
        title: 'MTU Turbochargers',
        description: 'Complete turbocharger and reman routes checked by turbo nameplate, engine application, and power rating.',
      },
      {
        title: 'MTU Turbocharger Parts',
        description: 'Turbine wheels, compressor wheels, bearing housings, heat shields, piston rings, and sealing components.',
      },
    ],''',
   '''    title: 'MTU 涡轮增压器零件目录——涡轮、壳体与密封件',
    h1Title: 'MTU 涡轮增压器部件',
    summary: 'MTU 涡轮增压器零件——涡轮、轴承壳体、隔热罩、活塞环与压气机叶轮。',
    description: '涡轮增压器部件在极高的热负荷与机械负荷下运行。我们对照您的增压器出厂编号逐一核验每个零件号。针对 MTU 2000、4000 与 396 系列发动机的新件、原厂配套替代件与再制造件方案，按询价逐一报价。',
    searchTopics: [
      {
        title: 'MTU 涡轮增压器',
        description: '增压器整机与再制造路线，按增压器铭牌、发动机应用与功率等级核验。',
      },
      {
        title: 'MTU 涡轮增压器零件',
        description: '涡轮、压气机叶轮、轴承壳体、隔热罩、活塞环与密封部件。',
      },
    ],'''),
  ('''    longDescription: `Separate a complete turbocharger from a rotating assembly, wheel, housing or sealing component. Request the turbocharger nameplate and complete assembly reference; an engine family alone does not identify the installed turbocharger build.

    Our turbocharger parts catalog covers the complete rotating assembly: turbine wheels (5110804420, 5110800220, 5110800420), compressor wheels (5090251301), bearing housings (5110803201), piston ring seals (5110850060, 5120850560), heat shields (5110812603, 5110820226), and diffusers (5361420025). We verify each part number against your turbocharger nameplate — not just the engine serial — because turbocharger variants within the same engine series can differ by application, power rating, and emissions certification.

    Common failure modes include foreign-object damage to turbine blades from intake debris or exhaust manifold fragments, bearing housing bore wear causing radial play and oil leakage into the exhaust stream, and heat shield cracking from thermal cycling on engines with frequent start-stop duty cycles. We quote new OEM, OEM-alternative, and remanufactured options with transparent lead times.`,''',
   '''    longDescription: `请将完整的涡轮增压器（Turbocharger）与旋转总成、叶轮、壳体或密封部件区分开来。请提供增压器铭牌与完整总成型号；仅凭发动机系列无法确定机上所装的增压器构型。

    我们的涡轮增压器零件目录覆盖完整旋转总成：涡轮（5110804420、5110800220、5110800420）、压气机叶轮（5090251301）、轴承壳体（5110803201）、活塞环密封件（5110850060、5120850560）、隔热罩（5110812603、5110820226）与扩压器（5361420025）。我们对照您的增压器铭牌——而非仅发动机出厂编号——逐一核验零件号，因为同一发动机系列内的增压器变体可能因应用场景、功率等级与排放认证而异。

    常见故障模式包括：进气异物或排气歧管碎屑造成的涡轮叶片异物损伤；轴承壳体孔磨损导致径向间隙并伴随机油漏入排气流；以及频繁启停工况下热循环导致的隔热罩开裂。我们为新件、原厂配套替代件与再制造件方案提供交货期透明的报价。`,'''),
  # ── 5. mtu-sensors ──
  ('''    title: 'MTU Sensors & Electrical Components | Parts Catalog',
    h1Title: 'MTU Sensors & Electrical Parts',
    summary: 'MTU sensors and electrical components — speed sensors, pressure sensors, temperature sensors, level monitors, and solenoid valves.',
    description: 'Electrical and sensor parts require precise matching — connector type, thread size, and signal range vary by engine installation. We cross-check part numbers against engine serial numbers for MTU 2000, 4000, 396, and 595 series.',''',
   '''    title: 'MTU 传感器与电气元件零件目录',
    h1Title: 'MTU 传感器与电气零件',
    summary: 'MTU 传感器与电气元件——转速传感器、压力传感器、温度传感器、液位监测器与电磁阀。',
    description: '电气与传感器零件需要精确匹配——连接器类型、螺纹规格与信号范围因发动机装机而异。针对 MTU 2000、4000、396 与 595 系列，我们对照发动机出厂编号交叉核验零件号。','''),
  ('''    longDescription: `This catalog includes speed sensors such as 0005357633, pressure sensors such as 0035352231 and X00E50214075, temperature sensor 0005356430, and level monitor X00E50203659. Choose by the complete component marking and measuring position, not by connector appearance alone.

    Catalog history lists X00E50214075 as a later number for 0035352231 and X00E50203659 as a later number for 0005355103. These records need an engine-specific check. Similar numbers, including 0005356633 and 0005357633, must not be assumed interchangeable.

    Include the pressure range or temperature characteristic where marked, connector pin arrangement, mounting thread, and cable or probe length. An alarm alone does not identify a failed sensor; wiring and system diagnosis should accompany the parts request when available.

    Send a number and quantity to start. Photos, engine serial number, and any required drawing help resolve missing specifications before a replacement is quoted.`,''',
   '''    longDescription: `本目录包括转速传感器（Speed Sensor）如 0005357633、压力传感器如 0035352231 与 X00E50214075、温度传感器 0005356430 及液位监测器 X00E50203659。选型请依据完整的部件标记与测量位置，不能仅凭连接器外观判断。

    目录沿革显示，X00E50214075 是 0035352231 的后续型号，X00E50203659 是 0005355103 的后续型号。这些记录需按具体发动机核验。相近编号（如 0005356633 与 0005357633）不得假定为可互换。

    如标有压力量程或温度特性，请一并提供；另请提供连接器针脚布置、安装螺纹及线缆或探杆长度。仅凭报警不能判定传感器失效；如有可能，零件询价请附上线束与系统诊断信息。

    询价请先提供零件号与数量。照片、发动机出厂编号及所需图纸，有助于在报价替代件之前补齐缺失的规格信息。`,'''),
  # ── 6. mtu-starter-motors-alternators ──
  ('''    title: 'MTU Starter Motors & Alternators | Parts Catalog',
    h1Title: 'MTU Starter Motors & Alternators',
    summary: 'MTU electric starter motors, alternators, charging generators, and related electrical drive references verified by voltage, mounting, and engine application.',
    description: 'Browse MTU starter and alternator references for marine, generator, rail, and industrial engines. Confirm voltage, rotation, mounting flange, terminal layout, pulley or drive arrangement, and engine serial number before quotation.',
    searchTopics: [
      {
        title: 'MTU Starter Motors',
        description: 'Electric starters checked by system voltage, rotation direction, pinion, flange, terminal layout, and engine application.',
      },
      {
        title: 'MTU Alternators',
        description: 'Charging alternators and generators checked by output rating, pulley or coupling, mounting position, and connector arrangement.',
      },
      {
        title: 'Electrical Identification',
        description: 'Send the complete unit label and clear photos; voltage alone is not enough to confirm interchangeability.',
      },
    ],
    longDescription: `MTU starter motors and alternators are installation-specific electrical assemblies. Units used on marine propulsion engines, generator sets, locomotives, and industrial power units can differ in system voltage, rotation direction, mounting flange, pinion or pulley arrangement, terminal position, output rating, and environmental protection. A visually similar unit should not be treated as interchangeable without checking these fields.

    This catalog covers electric starter and charging references such as X59417200010 starter electric, X52421300004 alternator, X51621300033 generator, and 0071548102 three-phase generator. The available route may be new OEM, OEM-alternative, professionally remanufactured, or a verified replacement, with condition and warranty information identified before order confirmation.

    Common starter complaints include slow cranking, intermittent engagement, pinion or solenoid faults, overheating, and voltage drop under load. Alternator complaints include low charging voltage, unstable output, bearing noise, belt or pulley wear, and regulator faults. Before replacing an assembly, verify batteries, cables, grounds, belts, and control signals so an installation fault is not mistaken for a failed unit.

    For quotation, send the complete label number, engine model and serial number, system voltage, mounting and terminal photos, quantity, destination, and required delivery date. For alternators, include output rating and pulley details; for starters, include rotation and pinion information when available.`,''',
   '''    title: 'MTU 起动机与交流发电机零件目录',
    h1Title: 'MTU 起动机与交流发电机',
    summary: 'MTU 电动起动机、交流发电机、充电发电机及相关电气传动型号，均按电压、安装形式与发动机应用核验。',
    description: '浏览适用于船用、发电、轨道交通与工业发动机的 MTU 起动机与交流发电机型号。报价前请确认电压、旋向、安装法兰、端子布置、皮带轮或传动形式及发动机出厂编号。',
    searchTopics: [
      {
        title: 'MTU 起动机',
        description: '电动起动机，按系统电压、旋转方向、驱动齿轮、法兰、端子布置与发动机应用核验。',
      },
      {
        title: 'MTU 交流发电机',
        description: '充电用交流发电机与发电机，按输出功率、皮带轮或联轴器、安装位置与连接器布置核验。',
      },
      {
        title: '电气件鉴别',
        description: '请提供完整的整机铭牌与清晰照片；仅凭电压不足以确认可互换性。',
      },
    ],
    longDescription: `MTU 起动机（Starter）与交流发电机（Alternator）属于依装机而异的电气总成。用于船用推进发动机、发电机组、机车与工业动力装置的整机，在系统电压、旋转方向、安装法兰、驱动齿轮或皮带轮布置、端子位置、输出功率与防护等级上可能各不相同。未经逐项核验，外观相近的整机不得视为可互换。

    本目录涵盖电动起动与充电相关型号，如 X59417200010 电动起动机、X52421300004 交流发电机、X51621300033 发电机及 0071548102 三相发电机。可供货渠道包括新原厂配套（OEM）件、原厂配套替代件、专业再制造件或经验证的替代件；订单确认前将明确状态与保修信息。

    起动机的常见反馈包括起动缓慢、偶发性啮合不良、驱动齿轮或电磁阀故障、过热及负载下电压跌落。交流发电机的常见反馈包括充电电压低、输出不稳、轴承异响、皮带或皮带轮磨损及调节器故障。更换整机前，请先核查蓄电池、线缆、接地、皮带与控制信号，以免将安装问题误判为整机失效。

    询价请提供完整铭牌编号、发动机型号与出厂编号、系统电压、安装与端子照片、数量、目的地及要求的交货期。交流发电机请附输出功率与皮带轮详情；起动机请尽可能提供旋向与驱动齿轮信息。`,'''),
  # ── 7. mtu-gasket-kits ──
  ('''    title: 'MTU Gaskets & Seal Kits | Parts Catalog',
    h1Title: 'MTU Gaskets, Seals & O-Rings',
    summary: 'MTU gaskets and seals — cylinder head gaskets, O-rings, sealing rings, shaft seals, and complete gasket kits.',
    description: 'Request individual MTU gaskets or an itemized overhaul sealing list. Confirm material, thickness, shape and installation position; stock and kit contents are checked for each quotation.',''',
   '''    title: 'MTU 垫片与密封套件零件目录',
    h1Title: 'MTU 垫片、密封件与 O 型圈',
    summary: 'MTU 垫片与密封件——气缸盖垫片（缸垫）、O 型圈、密封环、轴封及成套垫片组。',
    description: '可单独申购 MTU 垫片，也可提供逐项列出的大修密封件清单。请确认材质、厚度、形状与安装位置；库存与套件内容将在每笔报价中逐一核查。','''),
  ('''    longDescription: `Gaskets, seals, and O-rings may be the smallest parts on an MTU engine by weight, but they are among the most consequential. A failed cylinder head gasket can pressurize the cooling system and cause overheating within minutes. A leaking turbocharger oil seal can empty the oil sump into the exhaust. A deteriorated O-ring on a fuel injector sleeve can allow combustion gas into the fuel return circuit. Every gasket and seal in this catalog has been selected because it serves a critical containment function.

    Catalog references include cylinder head gaskets (5240161580, 5410160920, 5550161420), O-rings (700429260000, 700429050003), shaft seals (8699970499, XP51529700004), sealing rings (007603016105) and valve stem seals (0000530361). Current stock and material grades remain subject to supplier confirmation. A gasket-set quote must identify its contents and quantities; a kit label alone does not establish complete coverage or a lower price.`,''',
   '''    longDescription: `垫片（Gasket）、密封件（Seal）与 O 型圈（O-ring）就重量而言或许是 MTU 发动机上最小的零件，但其重要性却居于前列。气缸盖垫片失效可在数分钟内使冷却系统带压并导致过热；涡轮增压器油封泄漏可将油底壳的机油排入排气系统；燃油喷油器衬套上的 O 型圈老化可令燃烧气体进入回油回路。本目录中的每一款垫片与密封件，都因其承担关键的封闭功能而入选。

    目录型号包括气缸盖垫片（5240161580、5410160920、5550161420）、O 型圈（700429260000、700429050003）、轴封（8699970499、XP51529700004）、密封环（007603016105）与气门油封（0000530361）。现有库存与材质等级仍以供应商确认为准。垫片组报价必须列明所含件号与数量；仅凭套件名称不能证明覆盖完整或价格更优。`,'''),
  # ── 8. mtu-pistons-liners ──
  ('''    title: 'MTU Pistons, Liners & Rings | Parts Catalog',
    h1Title: 'MTU Pistons, Cylinder Liners & Ring Sets',
    summary: 'MTU piston assemblies, cylinder liners, piston rings, piston pins, and connecting rod components.',
    description: 'MTU piston, liner and ring references need component markings, size-grade documentation and engine serial-number checks. Supply condition and available grades are confirmed for the offered number.',''',
   '''    title: 'MTU 活塞、缸套与活塞环零件目录',
    h1Title: 'MTU 活塞、气缸套与活塞环组',
    summary: 'MTU 活塞总成、气缸套、活塞环、活塞销及连杆部件。',
    description: 'MTU 活塞、缸套与活塞环型号需要部件标记、尺寸等级文件及发动机出厂编号核验。所报型号的供货状态与可选等级将在报价中确认。','''),
  ('''    longDescription: `The piston-and-liner assembly is the heart of every MTU engine's combustion system. These are size-graded, precision-machined components where clearance between the piston skirt and cylinder liner is measured in hundredths of a millimeter. An incorrect size grade — even one step off — leads to scuffing, excessive oil consumption, or in severe cases, piston seizure. This is not a commodity part; it is an engineered assembly where the price of a mistake is measured in engine hours lost.

    Catalog references include cylinder liners (5240113410, 5320110110, 5840111810), pistons (5240303917, 5840300917), ring components (0120370618, 0090375019, 0080375819) and piston pins (5410370220). Request the included components and mating grades explicitly. Do not assume every grade code means a universal oversize increment; confirm it against the applicable drawing and offered unit.`,''',
   '''    longDescription: `活塞与缸套（Piston & Liner）总成是每台 MTU 发动机燃烧系统的核心。这些零件按尺寸等级分组、精密加工，活塞裙部与气缸套之间的间隙以百分之一毫米计量。尺寸等级差一级——哪怕只差一级——就会导致拉缸、机油消耗过量，严重时甚至活塞抱死。这不是普通商品件，而是经过工程设计的组合部件；一旦选错，代价以损失的发动机运行小时计算。

    目录型号包括气缸套（5240113410、5320110110、5840111810）、活塞（5240303917、5840300917）、活塞环部件（0120370618、0090375019、0080375819）与活塞销（5410370220）。请明确说明所需包含的部件与配合等级。不要假定每个等级代码都对应统一的加大尺寸级别；请对照适用图纸与所报产品确认。`,'''),
  # ── 9. mtu-valve-train ──
  ('''    title: 'MTU Valve Train Parts — Valves, Springs, Guides, Tappets | Parts Catalog',
    h1Title: 'MTU Valve Train Components',
    summary: 'MTU valve train parts — inlet and exhaust valves, valve springs, spring retainers, collets, guides, tappets, and push rods.',
    description: 'Valve train wear directly affects compression, fuel efficiency, and exhaust emissions. We supply individual components and complete cylinder-head overhaul kits for MTU 2000, 4000, 396, and 595 series. Kit pricing available for overhaul quantities.',''',
   '''    title: 'MTU 配气机构零件目录——气门、弹簧、导管与挺柱',
    h1Title: 'MTU 配气机构部件',
    summary: 'MTU 配气机构零件——进气门与排气门、气门弹簧、弹簧座、锁夹、导管、挺柱与推杆。',
    description: '配气机构磨损直接影响气缸压力、燃油效率与排气排放。我们为 MTU 2000、4000、396 与 595 系列提供单个部件与完整的气缸盖大修包；按大修批量可提供套件价格。','''),
  # ── 10. mtu-bearings ──
  ('''    title: 'MTU Engine Bearings — Crankshaft, Conrod, Camshaft, Thrust | Parts Catalog',
    h1Title: 'MTU Engine Bearings',
    summary: 'MTU bearings — crankshaft main bearings, connecting rod bearings, camshaft bearings, thrust bearings, and bushings.',
    description: 'Compare MTU main, connecting-rod, camshaft and thrust-bearing references. Specify shell position, grade markings, measured journal size and shaft repair history; available grades are checked per inquiry.',''',
   '''    title: 'MTU 发动机轴承零件目录——曲轴、连杆、凸轮轴与推力轴承',
    h1Title: 'MTU 发动机轴承',
    summary: 'MTU 轴承——曲轴主轴承、连杆轴承、凸轮轴轴承、推力轴承与衬套。',
    description: '对比 MTU 主轴承、连杆轴承、凸轮轴轴承与推力轴承型号。请注明轴瓦位置、等级标记、实测轴颈尺寸与曲轴修磨史；可选等级将在每笔询价中核查。','''),
  ('''    longDescription: `MTU engine bearings — crankshaft main bearings, connecting rod bearings, camshaft bearings, and thrust washers — are precision-graded components manufactured to tolerances that determine oil film thickness, load distribution, and ultimately engine life. A bearing set that is one size grade off will not "almost work"; it will wipe within the first hours of operation and take the crankshaft journal with it.

    Catalog references include main-bearing shells (5240334901, 5240335602, 5410330605), connecting-rod bearing components (5240383710, 5240382711, 5550302160), camshaft bearings (5240510110) and thrust components (5090200512, 5110200412, 5360330262). Confirm shell position and grade using applicable documentation and workshop measurements. No universal undersize increments or current stock grades are established by this catalog.`,''',
   '''    longDescription: `MTU 发动机轴承（Bearing）——曲轴主轴承、连杆轴承、凸轮轴轴承与推力垫——属于精密分级零件，其制造公差决定油膜厚度、载荷分布，并最终决定发动机寿命。轴承组差一个尺寸等级不会「勉强能用」；它会在运行最初几小时内烧瓦，并连带损伤曲轴轴颈。

    目录型号包括主轴承轴瓦（5240334901、5240335602、5410330605）、连杆轴承部件（5240383710、5240382711、5550302160）、凸轮轴轴承（5240510110）与推力部件（5090200512、5110200412、5360330262）。请依据适用文件与车间测量结果确认轴瓦位置与等级。本目录不设定统一的缩小尺寸级别或现有库存等级。`,'''),
  # ── 11. mtu-cylinder-heads ──
  ('''    title: 'MTU Cylinder Heads & Covers | Parts Catalog',
    h1Title: 'MTU Cylinder Heads and Covers',
    summary: 'MTU cylinder heads, head assemblies, head covers and valve heads — referenced by engine series and build, checked by part number and serial number.',
    description: 'Browse MTU cylinder-head references for marine, generator, rail and industrial engines. Head assemblies, bare heads and covers are quoted against the exact part number, engine serial number, and installation position.',''',
   '''    title: 'MTU 气缸盖与气门室盖零件目录',
    h1Title: 'MTU 气缸盖与气门室盖',
    summary: 'MTU 气缸盖、缸盖总成、气门室盖与气门头部——按发动机系列与构型索引，经零件号与出厂编号核验。',
    description: '浏览适用于船用、发电、轨道交通与工业发动机的 MTU 气缸盖型号。缸盖总成、裸缸盖与气门室盖的报价，均以确切零件号、发动机出厂编号与安装位置为依据。','''),
  ('''    longDescription: `The cylinder head is the most consequential single assembly on an MTU engine: it carries the valves, injector sleeves, and the fire deck seal, and it sets the compression that everything downstream depends on. A head that has been overheated even once may hold pressure today and crack under load next season — so head enquiries are quoted against the exact part number, engine serial number, and service history, not against a series name alone.

    Catalog references include complete head assemblies, bare heads, head covers, and valve-head components across Series 2000, 4000, 396, 956 and 1163 applications. When requesting a quotation, state whether the unit is required bare, assembled with valves, or with the injector sleeves fitted, and include the build code from the nameplate so the correct variant is identified before order confirmation.

    For overhaul programs, send the full parts list together with the engine model and serial number; heads are usually quoted alongside the gasket set, valve-train components, and injector sleeves that the same job consumes.`,''',
   '''    longDescription: `气缸盖（Cylinder Head）是 MTU 发动机上最为关键的单体总成：它承载气门、喷油器衬套与火力面密封，并决定下游一切部件所依赖的气缸压力。一只曾经历过过热的缸盖，今天或许还能保持压力，下一个赛季就可能在高负载下开裂——因此缸盖询价以确切零件号、发动机出厂编号与维修履历为依据，而非仅凭系列名称。

    目录型号涵盖 2000、4000、396、956 与 1163 系列应用中的完整缸盖总成、裸缸盖、气门室盖及气门头部部件。询价时请注明所需为裸缸盖、带气门装配的缸盖，还是已装喷油器衬套的缸盖，并提供铭牌上的构型代码，以便在订单确认前识别正确的变体。

    对于大修项目，请随附发动机型号与出厂编号一并发送完整零件清单；缸盖通常与同一作业所需的垫片组、配气机构部件及喷油器衬套一并报价。`,'''),
  # ── 12. mtu-fasteners-retaining-rings ──
  ('''    title: 'MTU Fasteners & Retaining Rings | Parts Catalog',
    h1Title: 'MTU Fasteners and Retaining Rings',
    summary: 'MTU bolts, screws, shims, snap rings, retaining rings and locking hardware — torque-to-yield stretch bolts quoted as single-use items.',
    description: 'MTU fasteners and retaining hardware by part number. Stretch bolts are single-use torque-to-yield items; grade markings and installation position are confirmed before quotation.',''',
   '''    title: 'MTU 紧固件与卡环零件目录',
    h1Title: 'MTU 紧固件与卡环',
    summary: 'MTU 螺栓、螺钉、调整垫片、卡环、挡圈与锁紧件——塑性域拉伸螺栓按一次性使用件报价。',
    description: 'MTU 紧固件与挡圈类零件按零件号检索。拉伸螺栓属于一次性使用的塑性域（Torque-to-yield）螺栓；报价前将确认强度等级标记与安装位置。','''),
  ('''    longDescription: `Fasteners on a high-speed diesel are not commodity hardware. Cylinder-head bolts, connecting-rod bolts and main-bearing bolts on MTU engines are torque-to-yield (stretch) items: they are tightened to a specified elongation, they deform permanently on first installation, and they are single-use by design. Re-installing a used stretch bolt is one of the most common causes of head-gasket failure and joint relaxation, so overhaul quotations treat them as consumables rather than reusable stock.

    Catalog references include hex screws, grub and adjusting screws, banjo and hollow screws, shims, snap rings, retaining rings, circlip kits, locking plates, and threaded plugs across Series 2000, 4000, 396, 956, 1163 and 183 applications. Grade markings, thread form, length, and installation position are confirmed per inquiry, because visually similar bolts from adjacent builds differ in both specification and torque figure.

    Send the part number, engine model and serial number, and the joint the fastener belongs to — head, rod, main-bearing cap, or cover — so the correct single-use specification is quoted rather than a generic equivalent.`,''',
   '''    longDescription: `高速柴油机上的紧固件并非普通五金。MTU 发动机的气缸盖螺栓、连杆螺栓与主轴承螺栓属于塑性域（Torque-to-yield）拉伸件：它们按规定的伸长量拧紧，在首次安装时即发生永久变形，按设计一次性使用。重复安装使用过的拉伸螺栓，是缸垫失效与结合面松脱最常见的原因之一，因此大修报价将其视为易损件，而非可复用库存。

    目录型号涵盖 2000、4000、396、956、1163 与 183 系列应用中的六角螺钉、紧定与调节螺钉、banjo 接头与空心螺钉、调整垫片、卡环、挡圈、卡环套件、锁片与螺塞。强度等级标记、螺纹形式、长度与安装位置按询价逐一确认——因为相邻构型中外观相近的螺栓，其规格与扭矩数值可能并不相同。

    请提供零件号、发动机型号与出厂编号，以及该紧固件所属的结合部位——缸盖、连杆、主轴承盖或盖板——以便报价正确的一次性使用规格，而非通用等效件。`,'''),
  # ── 13. mtu-tools-service-supplies ──
  ('''    title: 'MTU Special Tools & Service Supplies | Parts Catalog',
    h1Title: 'MTU Special Tools and Service Supplies',
    summary: 'MTU service tools and assembly supplies — pullers, barring tools, setting mandrels, removal devices, gauges, and assembly compounds.',
    description: 'MTU workshop tools and service supplies referenced by tool number. Barring devices, setting mandrels and pullers are checked by tool number and engine application before quotation.',''',
   '''    title: 'MTU 专用工具与服务耗材零件目录',
    h1Title: 'MTU 专用工具与服务耗材',
    summary: 'MTU 维修工具与装配辅料——拉马、盘车工具、定位心轴、拆卸装置、量具与装配涂剂。',
    description: 'MTU 车间工具与服务耗材按工具号索引。盘车装置、定位心轴与拉马在报价前按工具号与发动机应用核验。','''),
  ('''    longDescription: `Several MTU operations cannot be done correctly without the factory tool: turning the engine to top dead centre with the barring device, setting injector height with the mandrel, pulling a sleeve or a pulley without loading the housing, or recording compression with the press recorder. These tools are identified by tool number (the F-prefix series) rather than by engine part number, and a substitute improvised in a workshop usually damages the very component it is meant to service.

    Catalog references include barring tools and devices, pullers, fitting-removal devices, setting mandrels, milling cutters, feeler gauges, compression recorders, tool kits, assembly pastes and sealants across Series 2000, 4000, 396, 956, 1163 and legacy 183 applications. When requesting a quotation, send the tool number stamped on the unit together with the engine model it is used on — tool numbers are reused across builds, and the engine application is what pins down the correct variant.

    For a planned overhaul, ask for the tool list alongside the parts list: the same job usually needs the barring device, the setting mandrel, and at least one puller, and ordering them together avoids a workshop stoppage mid-job.`,''',
   '''    longDescription: `MTU 的若干项操作离开原厂工具便无法正确完成：用盘车装置将发动机转到上止点、用心轴设定喷油器高度、在不使壳体受载的前提下拆下衬套或皮带轮、用压力记录仪记录气缸压力。这些工具以工具号（F 前缀系列）标识，而非发动机零件号；车间里临时凑合的代用件，往往会损坏其本想保养的部件本身。

    目录型号涵盖 2000、4000、396、956、1163 系列及老旧 183 系列应用中的盘车工具与装置、拉马、拆装工具、定位心轴、铣刀、塞尺、气缸压力记录仪、工具套件、装配膏与密封剂。询价时请提供工具上压印的工具号及其所配发动机型号——工具号在不同构型间存在复用，正是发动机应用才能锁定正确的变体。

    计划大修时，请连同零件清单一并索取工具清单：同一作业通常需要盘车装置、定位心轴与至少一件拉马，将它们一并下单，可避免作业中途因工具短缺而停工。`,'''),
  # ── 14. mtu-cooling-system ──
  ('''    title: 'MTU Cooling System Parts — Pumps, Impellers, Thermostats | Parts Catalog',
    h1Title: 'MTU Cooling System Components',
    summary: 'MTU cooling system parts — coolant pumps, seawater pumps, impellers, thermostats, flanges, hoses, and heat exchangers.',
    description: 'Cooling system parts vary by engine application — marine (raw-water or keel-cooled), industrial (radiator), or rail. We confirm the correct variant by engine model and serial number for MTU 2000, 4000, 396, 595, and 956 series.',''',
   '''    title: 'MTU 冷却系统零件目录——水泵、叶轮与节温器',
    h1Title: 'MTU 冷却系统部件',
    summary: 'MTU 冷却系统零件——冷却水泵、海水泵、叶轮、节温器、法兰、软管与热交换器。',
    description: '冷却系统零件因发动机应用而异——船用（开式海水冷却或舷外冷却）、工业（散热器）或轨道交通。针对 MTU 2000、4000、396、595 与 956 系列，我们按发动机型号与出厂编号确认正确的变体。','''),
  ('''    searchTopics: [
      {
        title: 'MTU Coolant Pumps',
        description: 'Engine coolant pumps, shafts, seals, housings, and related replacement components.',
      },
      {
        title: 'MTU Seawater Pumps and Impellers',
        description: 'Marine raw-water pump parts selected by engine model and cooling-system configuration.',
      },
      {
        title: 'MTU Thermostats',
        description: 'Thermostats and temperature-control parts for marine, generator, rail, and industrial installations.',
      },
    ],''',
   '''    searchTopics: [
      {
        title: 'MTU 冷却水泵',
        description: '发动机冷却水泵、泵轴、密封件、壳体及相关更换部件。',
      },
      {
        title: 'MTU 海水泵与叶轮',
        description: '按发动机型号与冷却系统配置选型的船用海水泵零件。',
      },
      {
        title: 'MTU 节温器',
        description: '适用于船用、发电、轨道交通与工业装机的节温器与温控部件。',
      },
    ],'''),
  ('''    longDescription: `MTU engine cooling systems are application-specific — a marine engine running on raw-water cooling through a keel cooler requires different pump and thermostat configurations than an industrial engine on a closed-loop radiator or a rail engine with split-circuit cooling. Ordering the wrong cooling-system variant is one of the most common parts-matching errors because the same engine series can have multiple cooling configurations.

    Our cooling system catalog covers coolant pumps (5062000601, 5592001001/31), seawater pumps (5502003201), impellers (X00022524, 5582040406, 5592010007, 5592010307), thermostats (5841800175), coolant pump shafts (5552010005, 5842040714), flanges (8490740063), and sight glasses (5502030060). For each inquiry, we confirm the correct variant by engine model, serial number, and application type. Common replacement triggers include impeller wear from abrasive cooling water, pump shaft seal leakage, and thermostat sticking in the open or closed position.`,''',
   '''    longDescription: `MTU 发动机冷却系统依应用而定——采用开式冷却并经舷外冷却器换热的船用发动机，与采用闭式循环散热器的工业发动机或采用分区冷却的轨交发动机，所需的水泵与节温器配置各不相同。订购错误的冷却系统变体是最常见的零件选配失误之一，因为同一发动机系列可能存在多种冷却配置。

    我们的冷却系统目录涵盖冷却水泵（5062000601、5592001001/31）、海水泵（5502003201）、叶轮（X00022524、5582040406、5592010007、5592010307）、节温器（5841800175）、冷却水泵轴（5552010005、5842040714）、法兰（8490740063）与观察镜（5502030060）。每笔询价均按发动机型号、出厂编号与应用类型确认正确的变体。常见的更换诱因包括：磨蚀性冷却水造成的叶轮磨损、泵轴密封泄漏，以及节温器卡在开启或关闭位置。`,'''),
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
