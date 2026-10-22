# -*- coding: utf-8 -*-
"""mtu-parts.ts translation, chunk 2: highValue generators, catalogDescription,
applyCatalogDetails summary, applyStandardName compat, leftover fallbacks."""
import io, sys

PATH = 'src/data/mtu-parts.ts'
t = io.open(PATH, encoding='utf-8').read()

REPLACEMENTS = []

def rep(old, new, count=1):
    REPLACEMENTS.append((old, new, count))

# ── import zhPartName ──
rep("import { sentencePartName, standardPartName } from './part-names';",
    "import { sentencePartName, standardPartName } from './part-names';\nimport { zhCategoryName, zhPartName } from './part-names-zh';")

# ── leftover categoryDefaults fallbacks (batch-1 misses) ──
rep("weightKg: 'Confirmed with quotation',", "weightKg: '报价时确认',", count=14)
rep("dimensions: 'Confirmed by part number with quotation',",
    "dimensions: '报价时按零件号确认',", count=6)

# ── highValueScenarios ──
rep("""  'Fuel system': [
    'fuel pressure is unstable, injector balance is poor, or the engine shows hard-start symptoms',
    'the old part number is superseded and the correct replacement route needs confirmation',
    'fleet operators need a verified spare before scheduled engine service',
  ],""",
"""  'Fuel system': [
    '燃油压力不稳定、喷油器均衡性差或发动机出现启动困难症状',
    '旧零件号已被替代，需确认正确的替换路线',
    '船队客户需要在计划保养前备妥经过核验的备件',
  ],""")

rep("""  'Filters': [
    'oil, fuel, or air filter intervals are due and bulk replenishment is required',
    'filter restriction, water contamination, or pressure drop is found during service',
    'mixed filter lists need line-by-line confirmation before dispatch',
  ],""",
"""  'Filters': [
    '机油、燃油或空气滤清器保养周期已到，需要批量补充',
    '保养中发现滤清器压差超标、水分污染或压力下降',
    '混合滤清器清单需要在发货前逐项核对',
  ],""")

rep("""  'Sensors and electrical': [
    'alarm history points to a speed, pressure, temperature, or level signal fault',
    'connector type, signal range, or ECU version must be matched before replacement',
    'a vessel or generator set needs an urgent electrical spare to reduce downtime',
  ],""",
"""  'Sensors and electrical': [
    '报警历史指向转速、压力、温度或液位信号故障',
    '更换前必须匹配接头类型、信号量程或 ECU 版本',
    '船舶或发电机组急需电气备件以缩短停机时间',
  ],""")

rep("""  'Gaskets and seals': [
    'oil, coolant, or exhaust leakage is found during inspection',
    'the engine is opened for overhaul and one-time-use seals must be replaced',
    'material grade, thickness, or sealing position must be confirmed before order',
  ],""",
"""  'Gaskets and seals': [
    '检查中发现机油、冷却液或排气泄漏',
    '发动机解体大修，一次性密封件必须更换',
    '下单前必须确认材料等级、厚度或密封位置',
  ],""")

rep("""  'Cooling system': [
    'coolant temperature is high, seawater flow is weak, or pump wear is visible',
    'pump, impeller, flange, or cooler parts are needed for scheduled maintenance',
    'marine and generator installations require the correct cooling-system variant',
  ],""",
"""  'Cooling system': [
    '冷却液温度偏高、海水流量不足或水泵可见磨损',
    '计划保养需要水泵、叶轮、法兰或冷却器零件',
    '船用与发电安装需要正确的冷却系统变型',
  ],""")

rep("""  'Pistons and liners': [
    'compression loss, liner wear, scoring, or high oil consumption is reported',
    'size grade must match the engine overhaul specification',
    'a major overhaul list needs matched piston, ring, liner, and bearing references',
  ],""",
"""  'Pistons and liners': [
    '反馈压缩损失、缸套磨损拉伤或机油消耗偏高',
    '尺寸等级必须与发动机大修规格一致',
    '大修清单需要活塞、活塞环、缸套与轴承参考号配套',
  ],""")

rep("""  'Bearings': [
    'crankshaft, conrod, camshaft, or thrust bearing clearance is outside service limits',
    'standard or size-grade selection must be checked before quoting',
    'major overhaul parts are being purchased as a matched set',
  ],""",
"""  'Bearings': [
    '曲轴、连杆、凸轮轴或推力轴承间隙超出使用极限',
    '报价前必须核查标准或尺寸等级选择',
    '大修零件正以配套组方式采购',
  ],""")

rep("""  'Valve train': [
    'compression loss, valve-seat wear, or abnormal exhaust temperature is found',
    'cylinder-head overhaul requires matched valves, guides, springs, and collets',
    'installation position and engine series must be confirmed before dispatch',
  ],""",
"""  'Valve train': [
    '发现压缩损失、气门座磨损或排气温度异常',
    '缸盖大修需要配套的气门、导管、弹簧与锁夹',
    '发货前必须确认安装位置与发动机系列',
  ],""")

rep("""  'Turbocharging': [
    'boost pressure, exhaust temperature, or turbocharger vibration is outside normal range',
    'wheel, seal, bearing, or housing compatibility must be checked against turbo model',
    'a reman or replacement turbo route is being evaluated for urgent downtime',
  ],""",
"""  'Turbocharging': [
    '增压压力、排气温度或增压器振动超出正常范围',
    '叶轮、密封、轴承或壳体兼容性须对照增压器型号核查',
    '正在评估再制造或替换增压器路线以应对紧急停机',
  ],""")

rep("""  'Lubrication': [
    'oil pressure, oil temperature, or lube-system contamination requires service',
    'pump, cooler, nozzle, or separator references must be verified by engine model',
    'overhaul buyers need lubrication items quoted with the main parts list',
  ],""",
"""  'Lubrication': [
    '机油压力、油温或润滑系统污染需要保养',
    '油泵、冷却器、喷嘴或分离器参考号须按发动机型号核验',
    '大修客户需要润滑件与主件清单一并报价',
  ],""")

rep("""  'Drive components': [
    'bolts, clamps, washers, couplings, or small hardware are replaced during assembly',
    'single-use fasteners need confirmation by assembly position',
    'service teams need small parts included with the main overhaul shipment',
  ],""",
"""  'Drive components': [
    '装配过程中更换螺栓、卡箍、垫圈、联轴器或小型紧固件',
    '一次性紧固件需按装配位置确认',
    '服务团队需要小型件随大修主件一同发货',
  ],""")

rep("""  'Engine components': [
    'the part is part of a scheduled overhaul or urgent downtime repair',
    'the old number, engine serial number, and installation position need cross-checking',
    'buyers need a verified replacement option before arranging international shipping',
  ],""",
"""  'Engine components': [
    '该零件属于计划大修或紧急停机维修',
    '旧号、发动机出厂编号与安装位置需要交叉核对',
    '采购方需要在安排国际运输前获得经过核验的替换选项',
  ],""")

# ── highValueQuoteChecklist ──
rep("""const highValueQuoteChecklist = (part: MtuPart, seriesText: string) => [
  `Exact part number: ${part.partNumber}`,
  `Part name or assembly position: ${part.name}`,
  `Engine model / series: ${seriesText}`,
  'Engine serial number from nameplate',
  'Old-part photo showing number, connector, port, or size marking',
  'Required quantity and whether partial shipment is acceptable',
  'Destination country, delivery deadline, and preferred shipping method',
];""",
"""const highValueQuoteChecklist = (part: MtuPart, seriesText: string) => [
  `准确零件号：${part.partNumber}`,
  `零件名称或装配位置：${zhPartName(part.name)}`,
  `发动机型号 / 系列：${seriesText}`,
  '铭牌上的发动机出厂编号',
  '旧件照片（显示零件号、接头、接口或尺寸标识）',
  '所需数量以及是否接受分批发货',
  '目的国、交货期限与期望的运输方式',
];""")

# ── highValueFaqs ──
rep("""    ? `${part.partNumber} may relate to ${part.replacementFor.join(', ')}. Final replacement status is checked against the engine serial number before quote.`
    : `${part.partNumber} is checked for supersession before quote. If there is a newer or reman route, we confirm it with the engine serial number and old-part photo.`;""",
"""    ? `${part.partNumber} 可能与 ${part.replacementFor.join('、')} 相关。最终替换状态在报价前对照发动机出厂编号核定。`
    : `${part.partNumber} 在报价前进行替代关系核查。如存在更新型号或再制造路线，我们将结合发动机出厂编号与旧件照片予以确认。`;""")

rep("""      question: `Does ${part.partNumber} fit ${seriesText}?`,
      answer: `${part.partNumber} ${part.name} is checked against ${seriesText}. Final fitment depends on the engine serial number, rating, and installation position.`,""",
"""      question: `${part.partNumber} 适用于 ${seriesText} 吗？`,
      answer: `${part.partNumber}（${zhPartName(part.name)}）已对照 ${seriesText} 核验。最终适配性取决于发动机出厂编号、功率标定与安装位置。`,""")

rep("""      question: `What information is needed to quote ${part.partNumber}?`,
      answer: `Send the part number, engine model, engine serial number, old-part photo, quantity, destination country, and required delivery date. This lets us confirm stock route, packing, and shipping options.`,""",
"""      question: `报价 ${part.partNumber} 需要提供哪些信息？`,
      answer: `请提供零件号、发动机型号、出厂编号、旧件照片、数量、目的国与要求交期。据此我们确认库存路线、包装与运输方案。`,""")

rep("""      question: `Can you check alternatives or superseded numbers for ${part.partNumber}?`,""",
"""      question: `能否核查 ${part.partNumber} 的替代件或被替代号？`,""")

rep("""      question: `When is ${part.partNumber} usually replaced?`,
      answer: scenarios.join('; ') + '.',""",
"""      question: `${part.partNumber} 通常在什么情况下需要更换？`,
      answer: scenarios.join('；') + '。',""")

# ── inferNameSpecificScenarios ──
rep("""    return [
      'scheduled service interval is due and the filter list needs line-by-line confirmation',
      'restriction, contamination, or pressure-drop alarms point to filter replacement',
      'fleet buyers need the same filter reference packed for repeated maintenance jobs',
    ];""",
"""    return [
      '计划保养周期已到，滤清器清单需逐项确认',
      '压差、污染或压力下降报警提示需要更换滤清器',
      '船队客户需要同一滤清器参考号配套包装，用于重复性保养作业',
    ];""")

rep("""    return [
      'ECU alarms, unstable signal readings, or intermittent shutdown events require electrical diagnosis',
      'connector, voltage, signal range, and installation position must match the old part',
      'urgent replacement is needed to restore engine monitoring or control functions',
    ];""",
"""    return [
      'ECU 报警、信号读数不稳或间歇性停机需要电气诊断',
      '接头、电压、信号量程与安装位置必须与旧件一致',
      '急需更换以恢复发动机监测或控制功能',
    ];""")

rep("""    return [
      'oil, coolant, air, or exhaust leakage is found during inspection',
      'the engine is opened for overhaul and one-time-use sealing parts must be replaced',
      'material, section shape, and sealing position need confirmation from the old part or catalog drawing',
    ];""",
"""    return [
      '检查中发现机油、冷却液、空气或排气泄漏',
      '发动机解体大修，一次性密封件必须更换',
      '材料、截面形状与密封位置需对照旧件或目录图纸确认',
    ];""")

rep("""    return [
      'bearing clearance, surface scoring, or abnormal crankshaft/camshaft wear is found during overhaul',
      'standard or size-grade selection must be confirmed before shipment',
      'buyers need matched bearing references for the same overhaul kit',
    ];""",
"""    return [
      '大修中发现轴承间隙、表面拉伤或曲轴/凸轮轴异常磨损',
      '发货前必须确认标准或尺寸等级选择',
      '客户需要同一大修包配套的轴承参考号',
    ];""")

rep("""    return [
      'combustion quality, fuel delivery, compression, or exhaust temperature is outside normal range',
      'installation position and matched mating parts must be checked before replacement',
      'overhaul buyers need verified valve, nozzle, injector, or pump references before dispatch',
    ];""",
"""    return [
      '燃烧质量、燃油供给、压缩或排气温度超出正常范围',
      '更换前必须核查安装位置与配套配合件',
      '大修客户需要在发货前获得经过核验的气门、喷嘴、喷油器或泵参考号',
    ];""")

rep("""    return [
      'coolant, seawater, fuel, or oil flow is weak or temperature is above normal range',
      'flange, port, drive, and installation variant must match the existing assembly',
      'scheduled marine or generator maintenance requires a verified replacement route',
    ];""",
"""    return [
      '冷却液、海水、燃油或机油流量不足，或温度高于正常范围',
      '法兰、接口、驱动与安装变型必须与现有总成匹配',
      '计划中的船用或发电保养需要经过核验的替换路线',
    ];""")

rep("""    return [
      'compression loss, liner scoring, high blow-by, or oil consumption is reported',
      'size grade and matched cylinder components must be confirmed for the overhaul scope',
      'a major overhaul list needs piston, ring, liner, and bearing references checked together',
    ];""",
"""    return [
      '反馈压缩损失、缸套拉伤、下窜气偏高或机油消耗异常',
      '必须按大修范围确认尺寸等级与配套缸内零件',
      '大修清单需要活塞、活塞环、缸套与轴承参考号一并核查',
    ];""")

# ── enrichHighValuePart ──
rep("""    ? part.applicableEngines!
    : `${seriesText}; final fitment is confirmed by engine serial number and parts-catalog position.`;""",
"""    ? part.applicableEngines!
    : `${seriesText}；最终适配性经发动机出厂编号与零件目录位置确认。`;""")

rep("""    recordBits.push(`${part.replacementFor.length} superseded reference${part.replacementFor.length > 1 ? 's' : ''} traced`);""",
"""    recordBits.push(`追溯 ${part.replacementFor.length} 个被替代参考号`);""")

rep("""  const recordText = recordBits.length > 0 ? ` ${recordBits.join('; ')} on record.` : '';""",
"""  const recordText = recordBits.length > 0 ? ` 档案记录：${recordBits.join('；')}。` : '';""")

rep("""    summary: part.hasCatalogDetails ? part.summary : `${part.partNumber} ${part.name}. Request a part-number and engine-serial check before quotation.${recordText}`,""",
"""    summary: part.hasCatalogDetails ? part.summary : `${part.partNumber} ${zhPartName(part.name)}。报价前请提供零件号与发动机出厂编号进行核验。${recordText}`,""")

rep("""    orderingNotes: part.orderingNotes ?? `For ${part.partNumber}, send the engine model, serial number, quantity, old-part photo, and destination country. We will confirm whether the item is OEM, OEM-alternative, reman, or superseded before quotation.`,""",
"""    orderingNotes: part.orderingNotes ?? `订购 ${part.partNumber} 请提供发动机型号、出厂编号、数量、旧件照片与目的国。报价前我们将确认该件为原厂配套（OEM）、原厂配套替代件、再制造件还是已被替代。`,""")

rep("""    leadTime: part.leadTime ?? 'Priority stock check; fastest available OEM, OEM-alternative, or reman route quoted per inquiry',""",
"""    leadTime: part.leadTime ?? '优先核查库存；按询价报最快的原厂配套、原厂配套替代或再制造路线',""")

rep("""    imageAlt: part.imageAlt ?? `${part.partNumber} ${part.name} - MTU ${part.category} catalog reference`,""",
"""    imageAlt: part.imageAlt ?? `${part.partNumber} ${zhPartName(part.name)}——MTU ${zhCategoryName(part.category)}目录参考`,""")

rep("""      'Priority item: part number, supersession, and export packing details are checked before quote.',""",
"""      '优先项：报价前核验零件号、替代关系与出口包装细节。',""")

# ── catalogImageAlt ──
rep("""const catalogImageAlt = (part: MtuPart, series: string[]) =>
  `${standardPartName(part.name)} ${part.partNumber} for ${seriesPhrase(series)} engines`;""",
"""const catalogImageAlt = (part: MtuPart, series: string[]) =>
  `${zhPartName(part.name)}（${standardPartName(part.name)}）${part.partNumber}——适用于 ${seriesPhrase(series)} 发动机`;""")

# ── catalogDescription ──
rep("""  const article = /^[aeiou]|^(HP|LP|NTC)\\b/i.test(name) ? 'an' : 'a';
  const where = model ? `the MTU ${model.toUpperCase()}` : `${seriesPhrase(series)} engines`;
  sentences.push(
    assembly
      ? `${part.partNumber} is ${article} ${name} from the ${readableName(assembly)} group of ${where}.`
      : `${part.partNumber} is ${article} ${name} catalogued for ${where}.`,
  );""",
"""  const where = model ? `MTU ${model.toUpperCase()}` : `${seriesPhrase(series)} 系列发动机`;
  sentences.push(
    assembly
      ? `${part.partNumber} 是${where}的${readableName(assembly)}组${zhPartName(part.name)}（${name}）。`
      : `${part.partNumber} 是为${where}目录收录的${zhPartName(part.name)}（${name}）。`,
  );""")

rep("""    sentences.push(`It is the later number for ${replaces.slice(0, 4).join(', ')}${replaces.length > 4 ? ` and ${replaces.length - 4} more earlier references` : ''}, so lists quoting ${replaces.length === 1 ? 'that number' : 'those numbers'} are normally supplied as ${part.partNumber}.`);""",
"""    sentences.push(`它是 ${replaces.slice(0, 4).join('、')}${replaces.length > 4 ? ` 等另外 ${replaces.length - 4} 个更早参考号` : ''} 的后续号，清单中引用${replaces.length === 1 ? '该号' : '这些号'}的通常以 ${part.partNumber} 供货。`);""")

rep("""    sentences.push(`Catalog history lists ${replacedBy[0]} as its later number; we check whether the later part can be fitted alone or needs related parts changed with it.`);""",
"""    sentences.push(`目录沿革记载 ${replacedBy[0]} 为其后续号；我们会核查该后续件能否单独装配，还是需要同时更换相关零件。`);""")

rep("""    sentences.push(`The catalog unit weight is ${weight.toLowerCase()}, which we use to estimate freight before quoting.`);""",
"""    sentences.push(`目录单件重量为 ${weight.toLowerCase()}，我们据此在报价前估算运费。`);""")

# ── applyCatalogDetails summary ──
rep("""    summary: `${part.partNumber} ${part.name}. Listed in ${uniqueSeries.join(', ') || 'MTU'} catalog references; confirm installation and current availability before ordering.`,""",
"""    summary: `${part.partNumber} ${zhPartName(part.name)}。收录于 ${uniqueSeries.join('、') || 'MTU'} 目录参考；订购前请确认安装位置与当前供货情况。`,""")

# ── mergePartVariants: 'Also catalogued as' note generation ──
rep("""    ...(rest.length > 0 ? [`Also catalogued as: ${rest.map((part) => part.name).join('; ')}.`] : []),""",
"""    ...(rest.length > 0 ? [`另收录为：${rest.map((part) => part.name).join('；')}。`] : []),""")

rep("""  const isGeneratedCatalogText = (value: string) => value.startsWith(`${primary.partNumber} is `);""",
"""  const isGeneratedCatalogText = (value: string) => value.startsWith(`${primary.partNumber} 是`);""")

# ── applyStandardName: 'Also catalogued as' note parsing ──
rep("""      if (!note.startsWith('Also catalogued as: ')) return [swap(note)];
      const variants = [...new Set(note.slice(20, -1).split('; ').map(standardPartName))].filter((variant) => variant !== name);
      return variants.length > 0 ? [`Also catalogued as: ${variants.join('; ')}.`] : [];""",
"""      if (!note.startsWith('另收录为：')) return [swap(note)];
      const variants = [...new Set(note.slice(5, -1).split('；').map(standardPartName))].filter((variant) => variant !== name);
      return variants.length > 0 ? [`另收录为：${variants.join('；')}。`] : [];""")

missed = []
for old, new, count in REPLACEMENTS:
    found = t.count(old)
    if found < count:
        missed.append((old[:70], 'expected %d, found %d' % (count, found)))
        continue
    t = t.replace(old, new, count)

io.open(PATH, 'w', encoding='utf-8').write(t)
print('applied:', len(REPLACEMENTS) - len(missed), '/', len(REPLACEMENTS))
if missed:
    print('MISSED:')
    for m, why in missed:
        print(' -', m, '|', why)
    sys.exit(1)
