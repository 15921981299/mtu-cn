import { catalogPartDetailsByPartNumber, catalogPartDetailsBySlug, catalogPartSeeds } from './catalog-part-details';

import { applySearchPartContent, partSearchContent } from './part-search-content';
import { sentencePartName, standardPartName } from './part-names';
import { zhCategoryName, zhEngineType, zhPartName, zhSeriesLabel } from './part-names-zh';

export type MtuPart = {
  slug: string;
  partNumber: string;
  name: string;
  series: string[];
  category: string;
  summary: string;
  description?: string;
  image: string;
  availability: string;
  stockStatus?: string;
  applications: string[];
  notes: string[];
  hasCatalogDetails?: boolean;
  /** Cross-reference / alternative OEM numbers */
  replacementFor?: string[];
  crossReferences?: { partNumber: string; relationship: 'replaces' | 'replaced-by' | 'reference' }[];
  specificationChecks?: string[];
  /** Typical shipping weight per unit (kg) */
  weightKg?: string;
  /** HS code for customs */
  hsCode?: string;
  /** Specific engine models this part fits */
  applicableEngines?: string;
  /** Common failure or replacement scenarios */
  commonFailureScenarios?: string[];
  /** Ordering notes for procurement */
  orderingNotes?: string;
  /** Typical lead time after order confirmation */
  leadTime?: string;
  /** Package or unit dimensions (L x W x H or diam) */
  dimensions?: string;
  /** Engine type shown in public parts references */
  engineType?: string;
  /** NATO stock/version number when available */
  natoNumber?: string;
  /** RFQ checklist tailored to this part */
  quoteChecklist?: string[];
  /** FAQ content for priority part pages */
  faqs?: { question: string; answer: string }[];
  /** More descriptive alt text for part-page hero image */
  imageAlt?: string;
};

const partImage = '/images/mtu-2000-series-parts.webp';

/** Each category gets its own image — avoids every part page showing the same picture. */
const categoryImages: Record<string, string> = {
  'Turbocharging': '/images/industrial-diesel-engine-parts.webp',
  'Filters': '/images/diesel-filter-parts-category.jpg',
  'Fuel system': '/images/diesel-fuel-system-parts-category.jpg',
  'Sensors and electrical': '/images/diesel-sensors-electrical-parts-category.jpg',
  'Pistons and liners': '/images/generator-engine-parts.webp',
  'Valve train': '/images/industrial-diesel-engine-parts.webp',
  'Bearings': '/images/mtu-2000-series-parts.webp',
  'Gaskets and seals': '/images/diesel-gaskets-seals-category.jpg',
  'Cooling system': '/images/marine-diesel-engine-parts.webp',
  'Lubrication': '/images/engine-parts-hero.webp',
  'Drive components': '/images/engine-parts-verification-desk.webp',
  'Air and intake': '/images/mtu-2000-series-parts.webp',
  'Engine components': '/images/generator-engine-parts.webp',
  'Control components': '/images/engine-parts-sensors-catalog.webp',
};
const defaultPartImage = '/images/mtu-2000-series-parts.webp';

export const isRealPartImage = (image: string) =>
  image.includes('/images/mtu-catalog-parts/') || image.includes('/images/diesel-part-source-parts/');

/** Popular/high-value parts get a more relevant image. */
const popularPartImages: Record<string, string> = {
  '5240113410-cylinder-liner-size-0': '/images/generator-engine-parts.webp',
  'x53507500012-injector': '/images/engine-parts-hero.webp',
  'ex52407500064-injector': '/images/engine-parts-hero.webp',
  '5110804420-turbine-wheel': '/images/industrial-diesel-engine-parts.webp',
  '0020940204-filter-cartridge': '/images/engine-parts-sensors-catalog.webp',
  'x57508300091-fuel-filter-spin-on': '/images/engine-parts-sensors-catalog.webp',
  '0031845201-oil-filter-spin-on': '/images/engine-parts-sensors-catalog.webp',
  '5240161580-cylinder-head-gasket': '/images/engine-parts-verification-desk.webp',
  '5410160920-cylinder-head-gasket': '/images/engine-parts-verification-desk.webp',
  '5240530301-inlet-valve': '/images/industrial-diesel-engine-parts.webp',
  '0005358233-speed-sensor': '/images/engine-parts-sensors-catalog.webp',
  '5240380471-conrod-bolt': '/images/engine-parts-verification-desk.webp',
  '5502003201-seawater-pump': '/images/marine-diesel-engine-parts.webp',
  'x00022524-impeller': '/images/marine-diesel-engine-parts.webp',
  '5240780824-conn-fuel-rail-rear': '/images/engine-parts-hero.webp',
  'x54707700072-relief-valve-for-4-cyl-hp-pump': '/images/engine-parts-hero.webp',
  '8495340000-solenoid-valve': '/images/engine-parts-sensors-catalog.webp',
  '0005342732-valve-block-electric': '/images/engine-parts-sensors-catalog.webp',
  '5840980257-2-2-way-solenoid-valve': '/images/engine-parts-sensors-catalog.webp',
  '0005357933-speed-sensor': '/images/engine-parts-sensors-catalog.webp',
  '0035352731-pressure-sensor': '/images/engine-parts-sensors-catalog.webp',
  '0035351731-pressure-sensor': '/images/engine-parts-sensors-catalog.webp',
  '0035352931-pressure-sensor': '/images/engine-parts-sensors-catalog.webp',
  '0005355303-level-monitor': '/images/engine-parts-sensors-catalog.webp',
  '0002000001-coolant-pump': '/images/marine-diesel-engine-parts.webp',
  '0012040100-seawater-pump': '/images/marine-diesel-engine-parts.webp',
  '5410100163-oil-separator': '/images/engine-parts-hero.webp',
  '0021882301-29-oil-cooler': '/images/engine-parts-hero.webp',
  '5240510110-bearing-camshaft-std': '/images/mtu-4000-series-overhaul-parts.webp',
  'x00016024-crankshaft-bearing-size-0-0': '/images/mtu-4000-series-overhaul-parts.webp',
  '5240336602-crankshaft-bearing-lower-half': '/images/mtu-4000-series-overhaul-parts.webp',
  'x52403100003-crankshaft-bearing-size-0-1': '/images/mtu-4000-series-overhaul-parts.webp',
  '5240336702-crankshaft-bearing-size-0-1': '/images/mtu-4000-series-overhaul-parts.webp',
  'x00009806-rectangular-section-ring': '/images/generator-engine-parts.webp',
  '0090375019-taper-face-compression-ring': '/images/generator-engine-parts.webp',
  '0120373618-oil-control-ring': '/images/generator-engine-parts.webp',
  'x52404200037-gasket-for-cylinder-head': '/images/engine-parts-verification-desk.webp',
  'x52404100226-inlet-valve': '/images/industrial-diesel-engine-parts.webp',
  '5240530805-exhaust-valve': '/images/industrial-diesel-engine-parts.webp',
  '5240530122-valve-spring-inner': '/images/industrial-diesel-engine-parts.webp',
  '0030947404-air-filter-element': '/images/engine-parts-sensors-catalog.webp',
  '0030948104-air-filter-element': '/images/engine-parts-sensors-catalog.webp',
  '0020921901-fuel-filter-spin-on': '/images/engine-parts-sensors-catalog.webp',
  '0000925105-filter-element': '/images/engine-parts-sensors-catalog.webp',
};

/** Category-specific defaults — keeps each category feeling different */
const categoryDefaults: Record<string, {
  summary: string;
  description: string;
  stockStatus: string;
  applications: string[];
  weightKg: string;
  hsCode: string;
  leadTime: string;
  dimensions: string;
}> = {
  'Turbocharging': {
    summary: 'MTU 发动机涡轮增压器（Turbocharger）配件——报价前按零件号与发动机出厂编号核验。',
    description: '涡轮增压器（Turbocharger）配件在高热载与高机械载荷下工作。我们对照您的发动机出厂编号核验每个零件号，以确认在 MTU 各系列上的适配性。替换件与原厂配套替代（OEM-alternative）方案均随交货期与运输路线一并报价。',
    stockStatus: '按零件号核查——新件、原厂配套替代件或再制造件按询价报价',
    applications: ['船舶推进', '发电', '机车发动机', '重型设备'],
    weightKg: '报价时确认',
    hsCode: '8414.90',
    leadTime: '现货：3–7 个工作日；特殊订货：2–4 周；再制造件：按旧芯供应情况报价。',
    dimensions: '因增压器型号而异——询价时请提供发动机与增压器编号',
  },
  'Filters': {
    summary: 'MTU 滤清器滤芯——机油、燃油、空气或冷却液。零件号核验确认适配性。',
    description: '滤清器是 MTU 维护计划中的高频易损件。我们常备常用滤清器参考号，并可寻源特定应用滤芯。面向船队与服务公司计划可提供批量数量。',
    stockStatus: '常用参考号有库存——零件号核对后确认',
    applications: ['定期保养', '船队服务计划', '船舶机舱', '发电机组维修'],
    weightKg: '报价时确认',
    hsCode: '8421.23',
    leadTime: '常用参考号：2–5 个工作日；批量订单：1–2 周。',
    dimensions: '因滤清器类型而异——旋装式滤芯外径通常 80–150mm、长度 150–300mm',
  },
  'Fuel system': {
    summary: 'MTU 燃油系统配件——喷油器、泵、阀、管路。经发动机型号与出厂编号核验。',
    description: '燃油系统配件直接影响燃烧质量、排放合规与燃油经济性。我们按发动机型号与出厂编号确认适配。可提供原厂配套（OEM）与原厂配套替代件；适用时再制造件亦可报价。',
    stockStatus: '按零件号与发动机应用逐项核查',
    applications: ['船用柴油发动机', '发电机组', '轨道交通牵引发动机', '工业设备'],
    weightKg: '报价时确认',
    hsCode: '8413.30',
    leadTime: '新原厂件：5–10 个工作日；再制造置换：旧芯确认后 3–7 个工作日；原厂配套替代件：3–7 个工作日。',
    dimensions: '报价时按零件号确认',
  },
  'Sensors and electrical': {
    summary: 'MTU 传感器、电磁阀或电气元件——经接头类型与发动机安装形式核验。',
    description: '电气与传感器配件需要精确匹配——接头类型、螺纹尺寸与信号量程随发动机安装形式而异。我们对照发动机出厂编号交叉核验您的零件号，避免错配。',
    stockStatus: '零件号与接头核对后报价',
    applications: ['发动机监控系统', '控制柜', '改造与升级项目'],
    weightKg: '报价时确认',
    hsCode: '9032.89',
    leadTime: '常用传感器：3–7 个工作日；特殊量程或老型号传感器：1–3 周。',
    dimensions: '传感器通常为 M12–M18 螺纹、长 40–120mm；电磁阀不一——询价时确认',
  },
  'Pistons and liners': {
    summary: 'MTU 活塞、缸套或活塞环组——尺寸等级与发动机系列必须精确匹配。',
    description: '活塞、缸套与活塞环均为分尺寸等级零件。等级选错会导致早期磨损或咬缸。报价前我们核验尺寸代码、发动机系列与出厂编号。可提供原厂配套与原厂配套替代等级。',
    stockStatus: '按尺寸等级与系列报价——原厂与替代方案可选',
    applications: ['大修', '就车翻新', '船用发动机维修', '工业发动机维修'],
    weightKg: '报价时确认',
    hsCode: '8409.99',
    leadTime: '标准尺寸等级：5–10 个工作日；非标准等级：2–6 周。',
    dimensions: '报价时按零件号确认',
  },
  'Valve train': {
    summary: 'MTU 配气机构配件——气门、弹簧、导管、挺柱。零件号与发动机系列已经核验。',
    description: '配气机构磨损直接影响压缩比、燃油效率与排放。报价前我们确认零件号、发动机系列与安装位置。缸盖大修计划可提供套件。',
    stockStatus: '按零件号报价——大修批量可享套件价',
    applications: ['缸盖大修', '船用发动机保养', '发电服务'],
    weightKg: '报价时确认',
    hsCode: '8409.91',
    leadTime: '常用气门/弹簧：3–7 个工作日；整套数量：1–2 周。',
    dimensions: '报价时按零件号确认',
  },
  'Bearings': {
    summary: 'MTU 轴承——曲轴、连杆、凸轮轴或推力轴承。尺寸等级必须与发动机规格一致。',
    description: '轴承是精密分等级零件，可提供小尺寸、标准与加大等级。报价前我们核验发动机出厂编号以确认正确等级。',
    stockStatus: '按尺寸等级报价——标准等级更易供货',
    applications: ['发动机大修', '曲轴维修', '船用与工业发动机'],
    weightKg: '报价时确认',
    hsCode: '8483.30',
    leadTime: '标准尺寸等级：3–7 个工作日；小尺寸/加大等级：1–3 周。',
    dimensions: '报价时按零件号确认',
  },
  'Gaskets and seals': {
    summary: 'MTU 垫片或密封件——缸盖、排气、机油、水路。报价前确认正确的材料等级。',
    description: '垫片与密封件按应用而定——材料等级、厚度与形状随发动机安装形式而异。我们对照发动机系列确认零件号，并为大修项目推荐整套垫片包。',
    stockStatus: '常用垫片有库存——特殊等级按询价报价',
    applications: ['大修包', '船用服务', '工业维护', '发电机组维修'],
    weightKg: '报价时确认',
    hsCode: '8484.10',
    leadTime: '常用垫片/O 型圈：2–5 个工作日；特殊材料等级：1–3 周。',
    dimensions: '单个垫片因应用而异；整套包按完整零件清单报价',
  },
  'Cooling system': {
    summary: 'MTU 冷却系统配件——水泵、节温器、软管、法兰。经发动机型号与安装形式核验。',
    description: '冷却系统配件因发动机应用而异——船用（开式海水冷却或舷外冷却）、工业（散热器）或轨交。我们按发动机型号与出厂编号确认正确变型。',
    stockStatus: '按零件号与发动机应用报价',
    applications: ['船用冷却系统', '工业散热器系统', '发电机组冷却'],
    weightKg: '报价时确认',
    hsCode: '8419.50',
    leadTime: '水泵：视型号 5–15 个工作日；叶轮：2–5 个工作日；节温器：3–7 个工作日。',
    dimensions: '报价时按零件号确认',
  },
  'Lubrication': {
    summary: 'MTU 润滑系统配件——油泵、冷却器、喷嘴、分离器。零件号与系列已经核验。',
    description: '润滑配件关乎发动机寿命。我们对照您的发动机出厂编号核验每个零件号，并可按主要保养周期报整套润滑系统包。',
    stockStatus: '按零件号报价——可选套件',
    applications: ['船用发动机', '工业发动机', '发电机组保养'],
    weightKg: '报价时确认',
    hsCode: '8413.30',
    leadTime: '机油泵与冷却器：5–15 个工作日；喷嘴与分离器：3–7 个工作日。',
    dimensions: '报价时按零件号确认',
  },
  'Drive components': {
    summary: 'MTU 传动元件——螺栓、螺母、垫圈、卡箍、联轴器。经发动机装配位置核验。',
    description: '传动与紧固元件必须与发动机装配版本一致。我们对照您发动机出厂编号对应的最新零件目录核验零件号。',
    stockStatus: '常用紧固件有库存——特殊件按询价报价',
    applications: ['发动机装配', '船舶推进', '工业传动', '发电机组'],
    weightKg: '报价时确认',
    hsCode: '7318.15',
    leadTime: '常用紧固件：2–5 个工作日；特殊螺栓/联轴器：1–3 周。',
    dimensions: '紧固件通常为 M6–M24；联轴器随轴径而异——询价时确认',
  },
  'Air and intake': {
    summary: 'MTU 进气系统配件——滤清器、软管、歧管。经发动机型号核验。',
    description: '进气系统配件必须与发动机进气配置一致。我们按发动机型号确认零件号，并可报整套空气滤清器保养包。',
    stockStatus: '滤芯常有库存——特殊件报价待确认',
    applications: ['船舶机舱', '工业现场', '发电机组罩壳'],
    weightKg: '报价时确认',
    hsCode: '8421.31',
    leadTime: '滤芯：2–5 个工作日；进气歧管与软管：1–3 周。',
    dimensions: '报价时按零件号确认',
  },
  'Engine components': {
    summary: 'MTU 发动机组件——按零件号、发动机型号与出厂编号核验。',
    description: '通用发动机组件对照您的发动机出厂编号与最新版 MTU 零件目录核验。报价前我们确认适配性、库存状态与运输方案。',
    stockStatus: '发动机核验后按零件号报价',
    applications: ['船用服务', '工业维护', '发电', '轨道交通牵引'],
    weightKg: '报价时确认',
    hsCode: '8409.99',
    leadTime: '发动机核验后按零件号报价——通常 3–15 个工作日。',
    dimensions: '因零件而异——询价时请提供零件号与发动机型号',
  },
  'Control components': {
    summary: 'MTU 发动机控制元件——调速器、执行器或监测设备。经发动机构型核验。',
    description: '控制元件随构型而定。我们核验您的零件号与发动机出厂编号，以确认正确的控制系统变型。',
    stockStatus: '按零件号与发动机构型报价',
    applications: ['发动机控制系统', '船舶自动化', '发电机组控制屏'],
    weightKg: '报价时确认',
    hsCode: '9032.89',
    leadTime: '按零件号报价——视构型通常 5–15 个工作日。',
    dimensions: '调速器与执行器随型号而异——询价时请提供发动机出厂编号',
  },
};

const slugifyPart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type CatalogPartSeed = {
  partNumber: string;
  name: string;
  series: readonly string[];
  category: string;
  /** Optional: override the category-default stock status */
  stockStatus?: string;
  /** Optional: extra cross-reference OEM numbers */
  replacementFor?: readonly string[];
  engineType?: string;
  dimensions?: string;
  weightKg?: string;
  hsCode?: string;
  natoNumber?: string;
  leadTime?: string;
  applicableEngines?: string;
  image?: string;
  imageAlt?: string;
  summary?: string;
  description?: string;
};

const inferTextMatchedPartImage = (part: Pick<CatalogPartSeed, 'partNumber' | 'name' | 'category' | 'image'>) => {
  if (part.image) return part.image;

  const slug = `${slugifyPart(part.partNumber)}-${slugifyPart(part.name)}`;
  if (popularPartImages[slug]) return popularPartImages[slug];

  const text = `${part.name} ${part.category}`.toLowerCase();
  if (/(sensor|monitor|switch|actuator|solenoid|transistor|lamp|regulator|control|governor)/.test(text)) {
    return '/images/diesel-sensors-electrical-parts-category.jpg';
  }
  if (/(filter|cartridge|prefilter|strainer|separator)/.test(text)) {
    return '/images/diesel-filter-parts-category.jpg';
  }
  if (/(injector|nozzle|fuel|pump|rail|delivery|pressure|valve)/.test(text)) {
    return '/images/diesel-fuel-system-parts-category.jpg';
  }
  if (/(gasket|seal|o-ring|ring|washer|plug|bushing|bolt|screw|nut|clamp)/.test(text)) {
    return '/images/diesel-gaskets-seals-category.jpg';
  }
  if (/(coolant|water|seawater|impeller|thermostat|cooler)/.test(text)) {
    return '/images/marine-diesel-engine-parts.webp';
  }
  if (/(turbo|turbine|compressor|exhaust|charge air|intake)/.test(text)) {
    return '/images/industrial-diesel-engine-parts.webp';
  }
  if (/(piston|liner|bearing|conrod|crankshaft|cylinder head|valve train)/.test(text)) {
    return '/images/mtu-4000-series-overhaul-parts.webp';
  }

  return categoryImages[part.category] ?? defaultPartImage;
};

const publicPartSpecs: Record<string, Partial<CatalogPartSeed>> = {
  '5110804420': { engineType: 'MTU 4000', dimensions: 'ATL ZR175/082', weightKg: '3.850 KG', hsCode: '84149000', natoNumber: '2950123856295' },
  '0020940204': { engineType: 'MTU 956', dimensions: 'TKZ.45 940 55 124 S. INT. VERM.', weightKg: '16.00 KG', hsCode: '84219990', natoNumber: 'N/A' },
  '8490740063': { engineType: 'MTU 956/1163', dimensions: 'N/A', weightKg: '3.086 KG', hsCode: '84139100', natoNumber: '2910123890394' },
  'EX52407500064': { engineType: 'MTU 4000', dimensions: 'N/A', weightKg: '1.873 KG', hsCode: '84099900', natoNumber: 'N/A' },
  'X57508300091': { engineType: 'MTU 4000', dimensions: 'N/A', weightKg: '1.288 KG', hsCode: '84212300', natoNumber: '2910124051513' },
  '8495340000': { engineType: 'MTU 956/1163', dimensions: '用于阀块 0005342732', weightKg: '0.650 KG', hsCode: '84812090', natoNumber: '4810123693952' },
  '0005342732': { engineType: 'MTU 956/1163', dimensions: 'N/A', weightKg: '6.234 KG', hsCode: '84811005', natoNumber: '4810123604998' },
  '5840300917': { engineType: 'MTU 1163', dimensions: 'N/A', weightKg: '28.888 KG', hsCode: '84099900', natoNumber: '2805124101245' },
  '0080375619': { engineType: 'MTU 1163', dimensions: 'N/A', weightKg: '0.210 KG', hsCode: '84099900', natoNumber: '2815123580495' },
  '0080370018': { engineType: 'MTU 1163', dimensions: 'N/A', weightKg: '0.240 KG', hsCode: '84099900', natoNumber: '2815123349274' },
  '5410500227': {
    engineType: 'MTU 2000',
    dimensions: '45 degree',
    weightKg: '0.142 KG',
    hsCode: '84099900',
    natoNumber: '2815123583600',
    replacementFor: ['4570500127', '5410500127', '23527979', 'A5410500227', 'DDE A5410500227'],
  },
  '5320100130': { engineType: 'MTU 2000', dimensions: 'N/A', weightKg: '2.100 KG', hsCode: '84099900', natoNumber: '2815123859406' },
  '5090200512': { engineType: 'MTU 2000', dimensions: 'N/A', weightKg: '0.155 KG', hsCode: '84833080', natoNumber: '3130123845856' },
  '5090250141': { engineType: 'MTU 2000', dimensions: 'N/A', weightKg: '0.899 KG', hsCode: '84149000', natoNumber: '5330123855185' },
  '5090200071': { engineType: 'MTU 2000', dimensions: 'M10X1.25 LH', weightKg: '0.037 KG', hsCode: '73181631', natoNumber: 'N/A' },
  'XT1310100012': { engineType: 'MTU 2000', dimensions: 'M10X1.25 LH', weightKg: '0.037 KG', hsCode: '73181631', natoNumber: 'N/A' },
  '5090251301': { engineType: 'MTU 2000', dimensions: 'N/A', weightKg: '0.420 KG', hsCode: '84149000', natoNumber: '2950123736701' },
  '0000180680': { engineType: 'MTU 2000', dimensions: 'N/A', weightKg: '0.003 KG', hsCode: '40169300', natoNumber: '5330123733969' },
  // ── MTU 4000 / 2000 overhaul & service parts ──
  '5240113410': { engineType: 'MTU 4000', hsCode: '84099900', natoNumber: 'N/A', replacementFor: ['5240113510', '5240114210'] },
  '5240161580': { engineType: 'MTU 4000', hsCode: '84841000', natoNumber: 'N/A' },
  '5240380471': { engineType: 'MTU 4000', hsCode: '73181500', natoNumber: 'N/A' },
  '5240530301': { engineType: 'MTU 4000', hsCode: '84099100', natoNumber: 'N/A' },
  '5240530805': { engineType: 'MTU 4000', hsCode: '84099100', natoNumber: 'N/A' },
  '5240334901': { engineType: 'MTU 4000', hsCode: '84833080', natoNumber: 'N/A' },
  '5240383710': { engineType: 'MTU 4000', hsCode: '84833080', natoNumber: 'N/A' },
  '5241840501': { engineType: 'MTU 4000', hsCode: '84212300', natoNumber: 'N/A' },
  'X53507500012': { engineType: 'MTU 2000', weightKg: '0.298 KG', hsCode: '84099900', natoNumber: '2910123804421' },
  '5410160920': { engineType: 'MTU 2000', hsCode: '84841000', natoNumber: 'N/A' },
  '4570530001': { engineType: 'MTU 396', hsCode: '84099100', natoNumber: 'N/A' },
  '5320110110': { engineType: 'MTU 396', hsCode: '84099900', natoNumber: 'N/A' },
  '5321800001': { engineType: 'MTU 396', hsCode: '84133000', natoNumber: 'N/A' },
  '5592010307': { engineType: 'MTU 396', weightKg: '1.377 KG', hsCode: '84139100', natoNumber: 'N/A' },
  '5502003201': { engineType: 'MTU 2000', hsCode: '84137000', natoNumber: 'N/A' },
  'X00022524': { engineType: 'MTU 2000', hsCode: '84139100', natoNumber: 'N/A' },
  '5240530120': { engineType: 'MTU 4000', hsCode: '84099100', natoNumber: 'N/A' },
  '5240530122': { engineType: 'MTU 4000', hsCode: '84099100', natoNumber: 'N/A' },
  '5240103420': { engineType: 'MTU 4000', hsCode: '84099100', natoNumber: 'N/A' },
  '5240303917': { engineType: 'MTU 4000', hsCode: '84099900', natoNumber: 'N/A' },
  // ── MTU 2000 fuel & cooling ──
  'X53508200001': { engineType: 'MTU 2000', hsCode: '84133000', natoNumber: 'N/A' },
  'E0060704101': { engineType: 'MTU 2000', hsCode: '84133000', natoNumber: 'N/A' },
  '5501800016': { engineType: 'MTU 396', weightKg: '0.658 KG', hsCode: '84212300', natoNumber: '2940123179421' },
  '0010928801': { engineType: 'MTU 2000', hsCode: '84212300', natoNumber: 'N/A' },
  '0030944304': { engineType: 'MTU 2000', hsCode: '84213100', natoNumber: 'N/A' },
  // ── MTU 595 / 956 / 1163 ──
  '5840111810': { engineType: 'MTU 595', hsCode: '84099900', natoNumber: 'N/A' },
  '5550105141': { engineType: 'MTU 956/1163', hsCode: '84099100', natoNumber: 'N/A' },
  '5550161420': { engineType: 'MTU 956/1163', hsCode: '84841000', natoNumber: 'N/A' },
  '5550307540': { engineType: 'MTU 956/1163', hsCode: '84833080', natoNumber: 'N/A' },
  '5550530105': { engineType: 'MTU 956/1163', hsCode: '84099100', natoNumber: 'N/A' },
  // ── Common consumables ──
  '0031845201': { engineType: 'MTU 2000/4000', hsCode: '84212300', natoNumber: 'N/A' },
  '0031845301': { engineType: 'MTU 2000/4000', hsCode: '84212300', natoNumber: 'N/A' },
  '0020922801': { engineType: 'MTU 2000/4000', hsCode: '84212300', natoNumber: 'N/A' },
  '700429260000': { engineType: 'MTU 2000/4000', hsCode: '40169300', natoNumber: '5331121786280' },
  '5532031580': { engineType: 'MTU 396', hsCode: '84841000', natoNumber: 'N/A' },
  '5361420025': { engineType: 'MTU 2000', hsCode: '84149000', natoNumber: '2990123768494' },
  '8699970213': { engineType: 'MTU 396', hsCode: '40169300', natoNumber: 'N/A' },
};

const inferEngineType = (series: readonly string[]) =>
  series.length > 0 ? series.map((item) => item.replace(/^MTU\s*/i, 'MTU ')).join('/') : '按发动机出厂编号核验';

const inferLeadTime = (category: string) =>
  category === 'Filters' || category === 'Gaskets and seals'
    ? '常用参考号通常核查最快'
    : '按库存、替换路线与目的地报价';

/**
 * 类目兜底摘要：注入料号+品名+系列，避免整类目共享同一句字节级文本
 * （AI-Slop「信息熵极低」信号防御——每页摘要必须可区分）。
 */
const buildCatalogSummary = (part: CatalogPartSeed, catSummary: string): string => {
  const joined = part.series.map((s) => s.replace(/^MTU\s*/i, '').trim()).filter(Boolean).join('/');
  const scoped = joined ? catSummary.replace(/^MTU\s*/i, `MTU ${joined} `) : catSummary;
  return `${part.partNumber} ${part.name}: ${scoped}`;
};

const createCatalogPart = (part: CatalogPartSeed): MtuPart => {
  const cat = categoryDefaults[part.category] ?? categoryDefaults['Engine components'];
  const spec = publicPartSpecs[part.partNumber] ?? {};
  const replacementFor = [...(part.replacementFor ?? spec.replacementFor ?? [])];
  return {
    slug: `${slugifyPart(part.partNumber)}-${slugifyPart(part.name)}`,
    partNumber: part.partNumber,
    name: part.name,
    series: [...part.series],
    category: part.category,
    summary: part.summary ?? buildCatalogSummary(part, cat.summary),
    description: part.description ?? cat.description,
    image: inferTextMatchedPartImage(part),
    availability: '库存、替换状态、交货期与运输路线均在询价后确认。',
    stockStatus: part.stockStatus ?? cat.stockStatus,
    applications: cat.applications,
    notes: [
      `订购 ${part.partNumber} 前，请确认发动机型号、出厂编号、所需数量与收货地。`,
      `如 ${part.partNumber} 的标识或替换状态不明确，请发送旧件照片或铭牌信息。`,
    ],
    replacementFor,
    weightKg: part.weightKg ?? spec.weightKg ?? cat.weightKg,
    hsCode: part.hsCode ?? spec.hsCode ?? cat.hsCode,
    leadTime: part.leadTime ?? spec.leadTime ?? inferLeadTime(part.category),
    dimensions: part.dimensions ?? spec.dimensions ?? '按零件号、旧件照片或目录图纸确认',
    engineType: part.engineType ?? spec.engineType ?? inferEngineType(part.series),
    natoNumber: part.natoNumber ?? spec.natoNumber ?? 'N/A',
    applicableEngines: part.applicableEngines ?? spec.applicableEngines ?? inferEngineType(part.series),
    imageAlt: part.imageAlt,
  };
};

const expandedMtuParts = [
  { partNumber: '5110804420', name: 'Turbine Wheel', series: ['MTU 4000'], category: 'Turbocharging' },
  { partNumber: '0020940204', name: 'Filter Cartridge', series: ['MTU 956'], category: 'Filters' },
  { partNumber: '8490740063', name: 'Flange', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: 'EX52407500064', name: 'Injector', series: ['MTU 4000'], category: 'Fuel system' },
  { partNumber: '5240780824', name: 'Conn Fuel Rail Rear', series: ['MTU 4000'], category: 'Fuel system' },
  { partNumber: 'X53507500012', name: 'Injector', series: ['MTU 2000'], category: 'Fuel system' },
  { partNumber: 'X57508300091', name: 'Fuel Filter Spin-On', series: ['MTU 4000'], category: 'Filters' },
  { partNumber: '8495340000', name: 'Solenoid Valve', series: ['MTU 956', 'MTU 1163'], category: 'Sensors and electrical' },
  { partNumber: '0005342732', name: 'Valve Block Electric', series: ['MTU 956', 'MTU 1163'], category: 'Sensors and electrical' },
  { partNumber: '5840900595', name: '2/2-Way Solenoid Valve', series: ['MTU 595'], category: 'Sensors and electrical' },
  { partNumber: '5840980257', name: '2/2-Way Solenoid Valve', series: ['MTU 595'], category: 'Sensors and electrical' },
  { partNumber: '5840300917', name: 'Piston', series: ['MTU 1163'], category: 'Pistons and liners' },
  { partNumber: '0080375619', name: 'Rectangular-Section Ring', series: ['MTU 1163'], category: 'Pistons and liners' },
  { partNumber: '0080370018', name: 'Oil Control Ring', series: ['MTU 1163'], category: 'Pistons and liners' },
  { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 2000'], category: 'Valve train' },
  { partNumber: '5320100130', name: 'Cylinder Head Cover Lower Part', series: ['MTU 2000'], category: 'Cylinder heads' },
  { partNumber: '5090200512', name: 'Thrust Bearing', series: ['MTU 2000'], category: 'Bearings' },
  { partNumber: '5090250141', name: 'Retaining Ring', series: ['MTU 2000'], category: 'Drive components' },
  { partNumber: '5090200071', name: 'Magnetic Nut', series: ['MTU 2000'], category: 'Drive components' },
  { partNumber: 'XT1310100012', name: 'Magnetic Nut', series: ['MTU 2000'], category: 'Drive components' },
  { partNumber: '5090251301', name: 'Compressor Wheel', series: ['MTU 2000'], category: 'Turbocharging' },
  { partNumber: '0000180680', name: 'Gasket', series: ['MTU 2000'], category: 'Gaskets and seals' },
  { partNumber: 'X54707700072', name: 'Relief Valve for 4 Cyl HP Pump', series: ['MTU 4000'], category: 'Fuel system' },
  { partNumber: 'X00012160', name: 'Wiring Harness to Injector', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00011800', name: 'Wiring Harness for Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005358233', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005357933', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352531', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352731', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035351731', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '5205304531', name: 'Pressure Sensor', series: ['MTU 4000'], category: 'Sensors and electrical' },
  { partNumber: '0035352931', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005356430', name: 'Temperature Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005355103', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005355303', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '5410100163', name: 'Oil Separator', series: ['MTU 396'], category: 'Lubrication' },
  { partNumber: 'XP51529700004', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP51529700005', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP52229700007', name: 'Track Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '8699970499', name: 'Radial-Lip Shaft Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00028154', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '8699970497', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00E50201022', name: 'Governor', series: [], category: 'Control components' },
  { partNumber: 'X00028031', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0009953502', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '5320700246', name: 'Relief Valve', series: ['MTU 396'], category: 'Fuel system' },
  { partNumber: '0031845301', name: 'Oil Filter Spin-On', series: [], category: 'Filters' },
  { partNumber: '0031845201', name: 'Oil Filter Spin-On', series: [], category: 'Filters' },
  { partNumber: '8699970498', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5240510110', name: 'Bearing Camshaft STD', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: 'X00027830', name: 'Cylinder Liner Size 0 C23', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: '5240332630', name: 'Crankshaft Bearing Aux PTO End', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: 'X00016024', name: 'Crankshaft Bearing Size 0-0', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: '5240336602', name: 'Crankshaft Bearing Lower Half', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: 'X52403100003', name: 'Crankshaft Bearing Size 0-1', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: '5240336702', name: 'Crankshaft Bearing Size 0-1', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: 'X00009806', name: 'Rectangular-Section Ring', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: '0090375019', name: 'Taper Face Compression Ring', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: '0120373618', name: 'Oil Control Ring', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: '5240380471', name: 'Conrod Bolt', series: ['MTU 4000'], category: 'Drive components' },
  { partNumber: 'X52404200052', name: 'Seal Ring', series: ['MTU 4000'], category: 'Gaskets and seals' },
  { partNumber: 'X52404200037', name: 'Gasket for Cylinder Head', series: ['MTU 4000'], category: 'Gaskets and seals' },
  { partNumber: 'X52404100226', name: 'Inlet Valve', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530805', name: 'Exhaust Valve', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530122', name: 'Valve Spring Inner', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530120', name: 'Valve Spring Outer', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: 'X52405400013', name: 'Pushrod', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: 'X52499100259', name: 'Adjusting Screw', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240550550', name: 'Bushing', series: ['MTU 4000'], category: 'Drive components' },
  { partNumber: '5320530020', name: 'Valve Spring', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '3669900240', name: 'Washer Valve Spring', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '4570530001', name: 'Inlet Valve', series: ['MTU 396'], category: 'Valve train' },
].map(createCatalogPart);

// BEGIN IMPORTED SITEMAP PARTS
const sitemapMtuParts = [
  { partNumber: '000007005115', name: 'Dowel Pin', series: [], category: 'Drive components' },
  { partNumber: '0000160119', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000170660', name: 'Ce Ring', series: [], category: 'Engine components' },
  { partNumber: '0000180680', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000530126', name: 'Valve Collet', series: [], category: 'Valve train' },
  { partNumber: '0000530361', name: 'Valve Stem Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000530826', name: 'Valve Collet', series: [], category: 'Valve train' },
  { partNumber: '0000530926', name: 'Valve Keeper Wedge', series: [], category: 'Valve train' },
  { partNumber: '0000533235', name: 'Valve Rotator', series: [], category: 'Valve train' },
  { partNumber: '0000533635', name: 'Valve Rotator', series: [], category: 'Valve train' },
  { partNumber: '0000533735', name: 'Rotocap', series: [], category: 'Valve train' },
  { partNumber: '0000911128', name: 'Diaphragm', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000925105', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: '0000943268', name: 'Indicator Air Filter Restrister', series: [], category: 'Filters' },
  { partNumber: '0000943409', name: 'Intake Manifold', series: [], category: 'Air and intake' },
  { partNumber: '0000981465', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000981565', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000982780', name: 'Sealing Block', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000983080', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0000983180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '000125013012', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '000137010202', name: 'Washer Spring B10', series: [], category: 'Drive components' },
  { partNumber: '000137012202', name: 'Washer Spring B12', series: [], category: 'Drive components' },
  { partNumber: '0001424957', name: 'Ring Exh Manif', series: [], category: 'Engine components' },
  { partNumber: '0001427157', name: 'Lamellar Ring', series: [], category: 'Engine components' },
  { partNumber: '0001510433', name: 'Multiple Disc Clutch', series: [], category: 'Drive components' },
  { partNumber: '0001536132', name: 'Pressure Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0001536720', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0001800015', name: 'Pressure Reducing Va Lve Assy', series: [], category: 'Control components' },
  { partNumber: '0001883180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0002000001', name: 'Coolant Pump', series: [], category: 'Cooling system' },
  { partNumber: '0002010418', name: 'Counterring', series: [], category: 'Engine components' },
  { partNumber: '0002017519', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '0002030181', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0002032088', name: 'Actuator', series: [], category: 'Sensors and electrical' },
  { partNumber: '0002033288', name: 'Actuator', series: [], category: 'Sensors and electrical' },
  { partNumber: '0002041116', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '0004905565', name: 'Boot', series: [], category: 'Gaskets and seals' },
  { partNumber: '0005342732', name: 'Valve Block Electric', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005351733', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005355103', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005355303', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005356430', name: 'Temperature Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005357333', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005357633', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005357833', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005357933', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005358033', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005358133', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005358233', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005358333', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005360001', name: 'Lamp', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005360101', name: 'Illum Pushbutton', series: [], category: 'Sensors and electrical' },
  { partNumber: '0005360201', name: 'Switch', series: [], category: 'Sensors and electrical' },
  { partNumber: '000908010002', name: 'Screwed Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000908016001', name: 'Threaded Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000908020000', name: 'Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000908030002', name: 'Thread Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000910016002', name: 'Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000912010014', name: 'Bolt Hex Soc Hd', series: [], category: 'Drive components' },
  { partNumber: '000931012156', name: 'Hex Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000933008040', name: 'Hex Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000933010093', name: 'Hex Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '000934012008', name: 'Nut Hex', series: [], category: 'Drive components' },
  { partNumber: '0009813527', name: 'Anglr Cont Ball Brg', series: [], category: 'Bearings' },
  { partNumber: '0009953502', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '000N13235', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '000N33714', name: 'Valve', series: [], category: 'Valve train' },
  { partNumber: '000N33715', name: 'Delivery Valve', series: [], category: 'Fuel system' },
  { partNumber: '000N33726', name: 'Nozzle Element', series: [], category: 'Fuel system' },
  { partNumber: '000N33730', name: 'Strainer Filter', series: [], category: 'Filters' },
  { partNumber: '0010175412', name: 'Nozzle', series: [], category: 'Fuel system' },
  { partNumber: '0010742280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0010928801', name: 'Fuel Prefilter', series: [], category: 'Filters' },
  { partNumber: '0012040100', name: 'Seawater Pump', series: [], category: 'Cooling system' },
  { partNumber: '0019813727', name: 'Angl Cont Ball Brg', series: [], category: 'Bearings' },
  { partNumber: '0020172112', name: 'Hole Type Nozzle', series: [], category: 'Fuel system' },
  { partNumber: '0020921901', name: 'Fuel Filter Spin On', series: [], category: 'Filters' },
  { partNumber: '0020922801', name: 'Fuel Filter Spin On', series: [], category: 'Filters' },
  { partNumber: '0020940204', name: 'Filter Cartridge', series: [], category: 'Filters' },
  { partNumber: '0021540506', name: 'Transistor Regulator', series: [], category: 'Sensors and electrical' },
  { partNumber: '0021882301', name: 'Oil Cooler', series: [], category: 'Lubrication' },
  { partNumber: '0029971248', name: 'Rubber Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0029977940', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0030176421', name: 'Nozzle Holder W Nozzle', series: [], category: 'Fuel system' },
  { partNumber: '0030944304', name: 'Air Filter', series: [], category: 'Filters' },
  { partNumber: '0030947404', name: 'Air Filter Element', series: [], category: 'Filters' },
  { partNumber: '0030948104', name: 'Air Filter Element', series: [], category: 'Filters' },
  { partNumber: '0031845201', name: 'Oil Filter Spin On', series: [], category: 'Filters' },
  { partNumber: '0031845301', name: 'Oil Filter Spin On', series: [], category: 'Filters' },
  { partNumber: '0035351731', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352231', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352531', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352731', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035352931', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0035364610', name: 'Tachometer Engine Speed', series: [], category: 'Sensors and electrical' },
  { partNumber: '0039978648', name: 'Seal Rotary Pump', series: [], category: 'Gaskets and seals' },
  { partNumber: '0040175021', name: 'Nozzle Holder W Nozzle', series: [], category: 'Fuel system' },
  { partNumber: '0045426917', name: 'Temperature Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: '0045457528', name: 'Blade Receptacle', series: [], category: 'Sensors and electrical' },
  { partNumber: '0049976548', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0049976736', name: 'Valve Drain', series: [], category: 'Valve train' },
  { partNumber: '0049979947', name: 'Seal Shaft', series: [], category: 'Gaskets and seals' },
  { partNumber: '0059812225', name: 'Grooved Ball Bearing', series: [], category: 'Bearings' },
  { partNumber: '0070372419', name: 'Compression Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '0071548102', name: 'Three Phase Generator', series: [], category: 'Starting and charging' },
  { partNumber: '007603014104', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '007603016105', name: 'Copper Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '007603033100', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '007603064100', name: 'Washer A Cop', series: [], category: 'Drive components' },
  { partNumber: '0079977247', name: 'Shaft Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '0080370018', name: 'Oil Control Ring', series: [], category: 'Lubrication' },
  { partNumber: '0080372819', name: 'Rectanglr Sect Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '0080375619', name: 'Rectanglr Sect Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '0090374419', name: 'Keystone Compr Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '0090375019', name: 'Taper Face Comp Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '0090378218', name: 'Oil Control Ring', series: [], category: 'Lubrication' },
  { partNumber: '0120373618', name: 'Oil Control Ring', series: ['MTU 4000'], category: 'Lubrication' },
  { partNumber: '0129970648', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '0170942502', name: 'Air Filter', series: [], category: 'Filters' },
  { partNumber: '0180944502', name: 'Prefilter', series: [], category: 'Filters' },
  { partNumber: '0180945802', name: 'Cleaner Air W Adap Ftg', series: [], category: 'Air and intake' },
  { partNumber: '0189978947', name: 'Seal Rear Crankshaft', series: [], category: 'Gaskets and seals' },
  { partNumber: '0199977747', name: 'Radial Lip Shft Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '0219976547', name: 'Seal Ring Crankshaft Front', series: [], category: 'Gaskets and seals' },
  { partNumber: '0219976647', name: 'Seal Ring Crankshaft Rear', series: [], category: 'Gaskets and seals' },
  { partNumber: '0229978348', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0249975047', name: 'Shaft Seal Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '0299976748', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '05122439', name: 'Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '05132155', name: 'Ring Sealing', series: [], category: 'Gaskets and seals' },
  { partNumber: '05144768', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '070852035000', name: 'Slotted Nut', series: [], category: 'Drive components' },
  { partNumber: '111D03014', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '114C62033', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '11506101', name: 'Nut', series: [], category: 'Drive components' },
  { partNumber: '135A45008', name: 'Sleeve', series: [], category: 'Engine components' },
  { partNumber: '135B03020', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '135B03062', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '135B03090', name: 'Oil Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '135B09041', name: 'Conrod', series: [], category: 'Pistons and liners' },
  { partNumber: '135B09742', name: 'Conrod Bearing', series: [], category: 'Pistons and liners' },
  { partNumber: '135B14008', name: 'Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '135C01006', name: 'Slotted Nut', series: [], category: 'Drive components' },
  { partNumber: '135C01007', name: 'Collared Bushing', series: [], category: 'Bearings' },
  { partNumber: '135C01010', name: 'Spacer Bushing', series: [], category: 'Bearings' },
  { partNumber: '135C01013', name: 'Collared Bushing', series: [], category: 'Bearings' },
  { partNumber: '135C04501', name: 'Connecting Piece', series: [], category: 'Engine components' },
  { partNumber: '135C05716', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '135C10002', name: 'Valve Spring Inner', series: [], category: 'Valve train' },
  { partNumber: '135C10017', name: 'Guide Sleeve', series: [], category: 'Valve train' },
  { partNumber: '135C10020', name: 'Valve Head Inlet', series: [], category: 'Valve train' },
  { partNumber: '135C10143', name: 'Valve Head', series: [], category: 'Valve train' },
  { partNumber: '135D01012', name: 'Rubber Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: '135D08007', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '135D11003', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '135D11005', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '135D11006', name: 'Rubber Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '135D17033', name: 'Tappet', series: [], category: 'Valve train' },
  { partNumber: '135D17708', name: 'Hyd Lash Adjuster', series: [], category: 'Valve train' },
  { partNumber: '135D19004', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: '135L35003', name: 'Bushing', series: [], category: 'Bearings' },
  { partNumber: '135L35037', name: 'Standpipe', series: [], category: 'Engine components' },
  { partNumber: '135L45018', name: 'Slotted Nut', series: [], category: 'Drive components' },
  { partNumber: '135M37018', name: 'Rubber Sleeve', series: [], category: 'Gaskets and seals' },
  { partNumber: '161A15027', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '161M37002', name: 'Rubber Sleeve', series: [], category: 'Gaskets and seals' },
  { partNumber: '200472082000', name: 'Snap Ring', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '200988045000', name: 'Support Plate', series: [], category: 'Engine components' },
  { partNumber: '205412223002', name: 'Cyl Roller Bearing', series: [], category: 'Bearings' },
  { partNumber: '206925008000', name: 'Hex Nut', series: [], category: 'Drive components' },
  { partNumber: '234110196000', name: 'Piston Ring Comp', series: [], category: 'Pistons and liners' },
  { partNumber: '23524783', name: 'Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '23540304', name: 'A1 Gasket Kit', series: [], category: 'Gaskets and seals' },
  { partNumber: '23540455', name: 'Centrifugal Oil Filter Asm', series: [], category: 'Filters' },
  { partNumber: '270952035100', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '3669900240', name: 'Washer Valve Spring', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '40041', name: 'Paste Molykote G N Plus', series: [], category: 'Tools and supplies' },
  { partNumber: '4021800009', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: '4041420180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4220300124', name: 'Piston Ring Kit', series: [], category: 'Pistons and liners' },
  { partNumber: '4220530196', name: 'Valve Stem Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '4221880001', name: 'Oil Cooler', series: [], category: 'Lubrication' },
  { partNumber: '4231801101', name: 'Oil Pump', series: [], category: 'Lubrication' },
  { partNumber: '4420110059', name: 'Tombak Ring', series: [], category: 'Engine components' },
  { partNumber: '4420150060', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4420160420', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4420302240', name: 'Main Bearing', series: [], category: 'Bearings' },
  { partNumber: '4420500227', name: 'Exhaust Valve', series: [], category: 'Valve train' },
  { partNumber: '4420500526', name: 'Inlet Valve', series: [], category: 'Valve train' },
  { partNumber: '4421411780', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4421800543', name: 'Oil Nozzle', series: [], category: 'Lubrication' },
  { partNumber: '4421870180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4421880580', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4449900063', name: 'Bajo Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '4570530001', name: 'Inlet Valve', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '4571410080', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '4760500025', name: 'Tappet', series: [], category: 'Valve train' },
  { partNumber: '5030210580', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '505890921-00', name: 'Compression Press Re Corder', series: [], category: 'Tools and supplies' },
  { partNumber: '5062000601', name: 'Coolant Pump', series: [], category: 'Cooling system' },
  { partNumber: '50773', name: 'Silcone Rubber Locti', series: [], category: 'Gaskets and seals' },
  { partNumber: '5090200071', name: 'Magnetic Nut', series: ['MTU 396'], category: 'Drive components' },
  { partNumber: '5090200512', name: 'Thrust Bearing', series: [], category: 'Bearings' },
  { partNumber: '5090250141', name: 'Retaining Ring', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5090250350', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: '5090251301', name: 'Compressor Wheel', series: [], category: 'Turbocharging' },
  { partNumber: '5090850060', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5090850160', name: 'Piston Ring F Turbocharger', series: [], category: 'Turbocharging' },
  { partNumber: '5100250050', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: '5100850060', name: 'Ring Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '5100850160', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5100850260', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5110200278', name: 'Valve', series: [], category: 'Valve train' },
  { partNumber: '5110200412', name: 'Thrust Bearing', series: [], category: 'Bearings' },
  { partNumber: '5110200510', name: 'Thrust Bearing', series: [], category: 'Bearings' },
  { partNumber: '5110250050', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: '5110250376', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5110250576', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5110251476', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5110251976', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5110252110', name: 'Ring Carrier', series: [], category: 'Engine components' },
  { partNumber: '5110252210', name: 'Bearing', series: [], category: 'Bearings' },
  { partNumber: '5110800220', name: 'Turbine Wheel', series: [], category: 'Turbocharging' },
  { partNumber: '5110800420', name: 'Turbine Wheel', series: [], category: 'Turbocharging' },
  { partNumber: '5110803201', name: 'Bearing Housing', series: [], category: 'Bearings' },
  { partNumber: '5110804420', name: 'Turbine Wheel', series: [], category: 'Turbocharging' },
  { partNumber: '5110809821TURBINE', name: 'Turbine Wheel', series: [], category: 'Turbocharging' },
  { partNumber: '5110812603', name: 'Heat Shield', series: [], category: 'Engine components' },
  { partNumber: '5110820226', name: 'Heat Shield', series: [], category: 'Engine components' },
  { partNumber: '5110850060', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5110850460', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5110850560', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5110850960', name: 'Piston Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5119900051', name: 'Hex Nut', series: [], category: 'Drive components' },
  { partNumber: '5119910060', name: 'Dowel Pin', series: [], category: 'Drive components' },
  { partNumber: '5119940330', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '5120200112', name: 'Thrust Bearing', series: [], category: 'Bearings' },
  { partNumber: '5120251210', name: 'Bearing', series: [], category: 'Bearings' },
  { partNumber: '5120252076', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5120820226', name: 'Heat Shield', series: [], category: 'Engine components' },
  { partNumber: '5120850560', name: 'Piston Ring F Turbocharger', series: [], category: 'Turbocharging' },
  { partNumber: '5129940030', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '513D01017', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '514D19001', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5205300171', name: 'Magnetic Nut', series: [], category: 'Drive components' },
  { partNumber: '5205304069', name: 'Speed Transmitter', series: [], category: 'Sensors and electrical' },
  { partNumber: '5205304131', name: 'Travel Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: '5205304531', name: 'Pressure Sensor', series: ['MTU 4000'], category: 'Sensors and electrical' },
  { partNumber: '5240111380', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5240111480', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5240114210', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners' },
  { partNumber: '5240160153', name: 'Tube Injector', series: [], category: 'Fuel system' },
  { partNumber: '5240332608', name: 'Bearing Thrust 0 1 Up Ril', series: [], category: 'Bearings' },
  { partNumber: '5240332630', name: 'Crankshaft Bearing Aux Pto End', series: [], category: 'Bearings' },
  { partNumber: '5240332730', name: 'Crankshaft Bearing Driving', series: [], category: 'Bearings' },
  { partNumber: '5240333407', name: 'Bearing Thrust 0 1 Lo Spt', series: [], category: 'Bearings' },
  { partNumber: '5240336602', name: 'Crankshaft Bearing Lower Half', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: '5240336702', name: 'Crankshaft Bearing Size 0 1', series: [], category: 'Bearings' },
  { partNumber: '5240380471', name: 'Conrod Bolt', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: '5240382550', name: 'Bushing Conrod Size 0', series: [], category: 'Pistons and liners' },
  { partNumber: '5240384110', name: 'Conrod Bearing Upper Half', series: [], category: 'Pistons and liners' },
  { partNumber: '5240384210', name: 'Conrod Bearing Size 0 1', series: [], category: 'Pistons and liners' },
  { partNumber: '5240510110', name: 'Bearing Camshaft Std', series: [], category: 'Bearings' },
  { partNumber: '5240530120', name: 'Valve Spring Outer', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530122', name: 'Valve Spring Inner', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530805', name: 'Exhaust Valve', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: '5240530830', name: 'Valve Guide', series: [], category: 'Valve train' },
  { partNumber: '5240530905', name: 'Exhaust Valve', series: [], category: 'Valve train' },
  { partNumber: '5240531101', name: 'Inlet Valve', series: [], category: 'Valve train' },
  { partNumber: '5240550550', name: 'Bushing', series: ['MTU 4000'], category: 'Bearings' },
  { partNumber: '5240980281', name: 'Hose', series: [], category: 'Air and intake' },
  { partNumber: '5241420057', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5241420780', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5241840501', name: 'Lube Oil Full Flow Filter', series: [], category: 'Filters' },
  { partNumber: '5241870380', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5241880180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5244920181', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5249900605', name: 'Bolt Hex Cap', series: [], category: 'Drive components' },
  { partNumber: '5249900705', name: 'Bolt Hex Flg', series: [], category: 'Drive components' },
  { partNumber: '5255380580', name: 'Memory Module', series: [], category: 'Sensors and electrical' },
  { partNumber: '5260160153', name: 'Sleeve', series: [], category: 'Engine components' },
  { partNumber: '5260200305', name: 'Housing Rotating Asm', series: [], category: 'Engine components' },
  { partNumber: '5272010153', name: 'Spacer Sleeve', series: [], category: 'Engine components' },
  { partNumber: '5272010505', name: 'Shaft Wat Pump', series: [], category: 'Drive components' },
  { partNumber: '5310900337', name: 'Charge Air Line', series: [], category: 'Turbocharging' },
  { partNumber: '5311550215', name: 'Belt Pulley for Generator', series: [], category: 'Drive components' },
  { partNumber: '5314770056', name: 'Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5319970245', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5320100130', name: 'Cylinder Head Cover', series: ['MTU 396'], category: 'Cylinder heads' },
  { partNumber: '5320110027', name: 'Ring', series: [], category: 'Engine components' },
  { partNumber: '5320110110', name: 'Cylinder Liner', series: [], category: 'Pistons and liners' },
  { partNumber: '5320140022', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5320160221', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5320530020', name: 'Valve Spring', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '5320700246', name: 'Relief Valve', series: ['MTU 396'], category: 'Fuel system' },
  { partNumber: '5320900001', name: 'Air Filter', series: [], category: 'Filters' },
  { partNumber: '5320900136', name: 'Plug In Pipe', series: [], category: 'Engine components' },
  { partNumber: '5320980080', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5321800001', name: 'Oil Pump', series: [], category: 'Lubrication' },
  { partNumber: '5321800143', name: 'Oil Spray Nozzle', series: [], category: 'Lubrication' },
  { partNumber: '5350980065', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5351420480', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5360320014', name: 'Sleeve Wear Front Cr Shf', series: [], category: 'Engine components' },
  { partNumber: '5360330262', name: 'Thrust Washer', series: [], category: 'Drive components' },
  { partNumber: '5360702032', name: 'Fuel Line', series: [], category: 'Fuel system' },
  { partNumber: '5360780131', name: 'Elbow', series: [], category: 'Engine components' },
  { partNumber: '5360780180', name: 'Gasket For Fuel', series: [], category: 'Gaskets and seals' },
  { partNumber: '5360780441', name: 'Retainer', series: [], category: 'Engine components' },
  { partNumber: '5360900001', name: 'Air Filter', series: [], category: 'Filters' },
  { partNumber: '5360900250', name: 'Fuel Delivery Pump', series: [], category: 'Fuel system' },
  { partNumber: '5361420025', name: 'Diffuser Exhaust', series: [], category: 'Engine components' },
  { partNumber: '5361800515', name: 'Valve Asm Oil Press Relief', series: [], category: 'Lubrication' },
  { partNumber: '5362030180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5369970040', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '536E03003', name: 'Buffer', series: [], category: 'Engine components' },
  { partNumber: '5370550050', name: 'Bushing', series: [], category: 'Bearings' },
  { partNumber: '5372030880', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5410100163', name: 'Oil Separator', series: ['MTU 396'], category: 'Lubrication' },
  { partNumber: '5410180233', name: 'Diaphragm', series: [], category: 'Gaskets and seals' },
  { partNumber: '5410180233', name: 'Diaphragm F Oil Separator', series: [], category: 'Gaskets and seals' },
  { partNumber: '5410330605', name: 'Crankshaft Bearing Size 0 0', series: [], category: 'Bearings' },
  { partNumber: '5410337101', name: 'Crankshaft Bearing Size 0 0', series: [], category: 'Bearings' },
  { partNumber: '5410370220', name: 'Piston Pin', series: [], category: 'Pistons and liners' },
  { partNumber: '5410380250', name: 'Conrod Bushing', series: [], category: 'Pistons and liners' },
  { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 396'], category: 'Valve train' },
  { partNumber: '5410501336', name: 'Rocker Shaft Support', series: [], category: 'Drive components' },
  { partNumber: '5410530225', name: 'Valve Sprng Retainer', series: [], category: 'Valve train' },
  { partNumber: '5410530226', name: 'Valve Collet', series: [], category: 'Valve train' },
  { partNumber: '5410530532', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train' },
  { partNumber: '5410532131', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train' },
  { partNumber: '5410532730', name: 'Valve Guide', series: [], category: 'Valve train' },
  { partNumber: '5419900501', name: 'Point Head Screw', series: [], category: 'Engine components' },
  { partNumber: '5500100061', name: 'Oil Separator', series: [], category: 'Lubrication' },
  { partNumber: '5500100330', name: 'Cylinder Head Cover', series: [], category: 'Cylinder heads' },
  { partNumber: '5500160069', name: 'Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5500160119', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5500160121', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5500160405', name: 'Cylinder Head Cover', series: [], category: 'Cylinder heads' },
  { partNumber: '5500160432', name: 'Pipe', series: [], category: 'Engine components' },
  { partNumber: '5500160597', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '5500170260', name: 'Support Ring', series: [], category: 'Engine components' },
  { partNumber: '5500180280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5500500225', name: 'Roller Tappet', series: [], category: 'Valve train' },
  { partNumber: '5500500333', name: 'Rocker Arm Inlet', series: [], category: 'Valve train' },
  { partNumber: '5500500334', name: 'Rocker Arm Exhaust', series: [], category: 'Valve train' },
  { partNumber: '5500511710', name: 'Camshaft Bearing', series: [], category: 'Bearings' },
  { partNumber: '5500530020', name: 'Valve Spring Outer', series: [], category: 'Valve train' },
  { partNumber: '5500530232', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train' },
  { partNumber: '5500530401', name: 'Inlet Valve', series: [], category: 'Valve train' },
  { partNumber: '5500531231', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train' },
  { partNumber: '5500980280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5501800016', name: 'Oil Filter Element', series: [], category: 'Filters' },
  { partNumber: '5501800106', name: 'Idler Gear', series: [], category: 'Drive components' },
  { partNumber: '5501800915', name: 'Press Limiting Valve', series: [], category: 'Control components' },
  { partNumber: '5501801015', name: 'Press Relief Valve', series: [], category: 'Fuel system' },
  { partNumber: '5501801115', name: 'Press Relief Valve', series: [], category: 'Fuel system' },
  { partNumber: '5501840832', name: 'Valve Piston', series: [], category: 'Pistons and liners' },
  { partNumber: '5501872401', name: 'Pipe', series: [], category: 'Engine components' },
  { partNumber: '5502002002', name: 'Drive Shaft', series: [], category: 'Drive components' },
  { partNumber: '5502003201', name: 'Seawater Pump', series: [], category: 'Cooling system' },
  { partNumber: '5502010276', name: 'Thrust Washer', series: [], category: 'Drive components' },
  { partNumber: '5502030060', name: 'Sight Glass', series: [], category: 'Cooling system' },
  { partNumber: '5502032080', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5502035680', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5502035780', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5502040176', name: 'Plate Control Washer', series: [], category: 'Drive components' },
  { partNumber: '5502040403', name: 'Cover', series: [], category: 'Engine components' },
  { partNumber: '5502040906', name: 'Impeller', series: [], category: 'Cooling system' },
  { partNumber: '5532031280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5532031580', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5541870180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5550100051', name: 'Nozzle Holder W Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system' },
  { partNumber: '5550100651', name: 'Nozzle Holder W Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system' },
  { partNumber: '5550101251', name: 'Oil Spray Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication' },
  { partNumber: '5550102451', name: 'Nozzle Holder W Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system' },
  { partNumber: '5550105141', name: 'Cylinder Head W Valve', series: ['MTU 956', 'MTU 1163'], category: 'Cylinder heads' },
  { partNumber: '5550160095', name: 'Spacer Plate', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '5550161420', name: 'Cylinder Head Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5550162320', name: 'Cylinder Head Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5550162420', name: 'Cylinder Head Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5550170013', name: 'Thrust Screw', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5550170053', name: 'Protective Sleeve', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '5550170553', name: 'Pressure Sleeve', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '5550302160', name: 'Conrod Bearing Size 0 0', series: ['MTU 956', 'MTU 1163'], category: 'Pistons and liners' },
  { partNumber: '5550307540', name: 'Crankshaft Bearing Size 0 0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings' },
  { partNumber: '5550330130', name: 'Crankshaft Bearing Size 0 0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings' },
  { partNumber: '5550530105', name: 'Exhaust Valve', series: ['MTU 956', 'MTU 1163'], category: 'Valve train' },
  { partNumber: '5551800015', name: 'Press Limiting Valve', series: ['MTU 956', 'MTU 1163'], category: 'Control components' },
  { partNumber: '5551800122', name: 'Oil Line', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication' },
  { partNumber: '5552010005', name: 'Coolant Pump Shaft', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: '5552010010', name: 'Bearing Housing', series: ['MTU 956', 'MTU 1163'], category: 'Bearings' },
  { partNumber: '5552030388', name: 'Slide Valve', series: ['MTU 956', 'MTU 1163'], category: 'Control components' },
  { partNumber: '5559901501', name: 'Screw', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5561421884', name: 'Shim', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5562010105', name: 'Coolant Pump Shaft', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: '5582040406', name: 'Impeller', series: [], category: 'Cooling system' },
  { partNumber: '5590981380', name: 'Sealing Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5591420020', name: 'Guard Plate', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '5591420451', name: 'Ring Sealing', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5591421180', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5591422180', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5592010007', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: '5592010307', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: '5600100083', name: 'Screw', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5600160071', name: 'Plug', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5600160180', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600160280', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600170509', name: 'Burner', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '5600180080', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600510080', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600510580', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600512280', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600513580', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600513680', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600513780', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600520080', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600550070', name: 'Threaded Ring', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5600740280', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600980180', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5600980380', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5601400441', name: 'V Band Clamp', series: ['MTU 956', 'MTU 1163'], category: 'Drive components' },
  { partNumber: '5601420084', name: 'Shim', series: ['MTU 956', 'MTU 1163'], category: 'Fasteners and retaining rings' },
  { partNumber: '5602010880', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602010980', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602011280', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602011380', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602011480', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602011880', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602030380', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5602030680', name: 'Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '5610105420', name: 'Cylinder Head', series: [], category: 'Cylinder heads' },
  { partNumber: '5610110059', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5610380850', name: 'Conrod Bushing Size 0', series: [], category: 'Pistons and liners' },
  { partNumber: '5610380950', name: 'Conrod Bushing Size 1', series: [], category: 'Pistons and liners' },
  { partNumber: '5610381150', name: 'Conrod Bushing Size 3', series: [], category: 'Pistons and liners' },
  { partNumber: '5611420680', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5619810086', name: 'Roller Size 0', series: [], category: 'Engine components' },
  { partNumber: '5700150380', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5700380150', name: 'Conrod Bushing Size 0', series: [], category: 'Pistons and liners' },
  { partNumber: '5700510150', name: 'Bushing', series: [], category: 'Bearings' },
  { partNumber: '5700530001', name: 'Valve', series: [], category: 'Valve train' },
  { partNumber: '5700530005', name: 'Valve', series: [], category: 'Valve train' },
  { partNumber: '5700530025', name: 'Spring Retainer', series: [], category: 'Engine components' },
  { partNumber: '5702030280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5709970144', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5730110080', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5730110180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5730110280', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5730110380', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5730110480', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760100081', name: 'Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5760110059', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760110062', name: 'Thrust Washer', series: [], category: 'Drive components' },
  { partNumber: '5760110153', name: 'Plug In Pipe', series: [], category: 'Engine components' },
  { partNumber: '5760110159', name: 'Carbon Scraper Ring', series: [], category: 'Pistons and liners' },
  { partNumber: '5760150180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760160071', name: 'Plug', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5760160419', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760162553', name: 'Sleeve', series: [], category: 'Engine components' },
  { partNumber: '5760370076', name: 'Shim', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5760530020', name: 'Valve Spring Outer', series: [], category: 'Valve train' },
  { partNumber: '5760530022', name: 'Valve Spring Inner', series: [], category: 'Valve train' },
  { partNumber: '5760540532', name: 'Guide Bushing', series: [], category: 'Bearings' },
  { partNumber: '5760550180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760550280', name: 'Profile Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5760550350', name: 'Bushing', series: [], category: 'Bearings' },
  { partNumber: '5760550450', name: 'Bushing', series: [], category: 'Bearings' },
  { partNumber: '5761420057', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5769900004', name: 'Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5769900619', name: 'Stress Bolt', series: [], category: 'Drive components' },
  { partNumber: '5769940030', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '5769970119', name: 'Grub Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5800110259', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5800110558', name: 'Seal Carrier', series: [], category: 'Gaskets and seals' },
  { partNumber: '5800150460', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5800162319', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5800300617', name: 'Piston Composite', series: [], category: 'Pistons and liners' },
  { partNumber: '5800530101', name: 'Inlet Valve', series: [], category: 'Valve train' },
  { partNumber: '5800530205', name: 'Exhaust Valve', series: [], category: 'Valve train' },
  { partNumber: '5802040072', name: 'Nut', series: [], category: 'Drive components' },
  { partNumber: '5802040290', name: 'Retainer', series: [], category: 'Engine components' },
  { partNumber: '5802040801', name: 'Spiral Housing', series: [], category: 'Turbocharging' },
  { partNumber: '5802040806', name: 'Impeller', series: [], category: 'Cooling system' },
  { partNumber: '5809900819', name: 'Stress Bolt', series: [], category: 'Drive components' },
  { partNumber: '5809970048', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5840111810', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners' },
  { partNumber: '5840150980', name: 'Gasket Right Side', series: [], category: 'Gaskets and seals' },
  { partNumber: '5840300020-42', name: 'Connecting Rod', series: [], category: 'Pistons and liners' },
  { partNumber: '5840300615', name: 'Piston Skirt', series: [], category: 'Pistons and liners' },
  { partNumber: '5840300917', name: 'Piston', series: [], category: 'Pistons and liners' },
  { partNumber: '5840371625', name: 'Piston Crown', series: [], category: 'Pistons and liners' },
  { partNumber: '5840530129', name: 'Valve Guide Inlet Size 0', series: [], category: 'Valve train' },
  { partNumber: '5840700632-87', name: 'HP Fuel Line', series: [], category: 'Fuel system' },
  { partNumber: '5840780024', name: 'Thrust Member', series: [], category: 'Engine components' },
  { partNumber: '5840782802', name: 'Supply Pipe', series: [], category: 'Engine components' },
  { partNumber: '5840900054', name: 'Valve Housing', series: [], category: 'Valve train' },
  { partNumber: '5840900595', name: '2 2 Way Solenoid Valve', series: [], category: 'Sensors and electrical' },
  { partNumber: '5840940180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5840980257', name: '2 2 Way Solenoid Valve', series: [], category: 'Sensors and electrical' },
  { partNumber: '5840982719', name: 'Pump Timing Piston', series: [], category: 'Pistons and liners' },
  { partNumber: '5841400282-87', name: 'Bellows With Test Cert 3 1', series: [], category: 'Gaskets and seals' },
  { partNumber: '5841400344', name: 'Flange', series: [], category: 'Drive components' },
  { partNumber: '5841420154', name: 'Cable Conduit', series: [], category: 'Sensors and electrical' },
  { partNumber: '5841420445', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '5841420857', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5841421257', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5841800175', name: 'Oil Thermostat', series: [], category: 'Cooling system' },
  { partNumber: '5842030252', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: '5842030362', name: 'Pin', series: [], category: 'Drive components' },
  { partNumber: '5842030562', name: 'Pin', series: [], category: 'Drive components' },
  { partNumber: '5842032780', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5842040151', name: 'Spacer Ring', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5842040180', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: '5842040219', name: 'Bearing Housing', series: [], category: 'Bearings' },
  { partNumber: '5842040257', name: 'Seal Carrier', series: [], category: 'Gaskets and seals' },
  { partNumber: '5842040551', name: 'Spacer Ring', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '5842040714', name: 'Coolant Pump Shaft', series: [], category: 'Cooling system' },
  { partNumber: '5849900851', name: 'Nut', series: [], category: 'Drive components' },
  { partNumber: '5849931601', name: 'Pressure Spring', series: [], category: 'Engine components' },
  { partNumber: '5849932001', name: 'Leaf Spring', series: [], category: 'Engine components' },
  { partNumber: '5849935201', name: 'Pressure Spring', series: [], category: 'Engine components' },
  { partNumber: '5849970040', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '5849970572', name: 'Screw Fitting Union', series: [], category: 'Engine components' },
  { partNumber: '5900530426', name: 'Valve Collet', series: [], category: 'Valve train' },
  { partNumber: '5909970040', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700217040001', name: 'Shaft Seal Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700223010000', name: 'Bolt Banjo A12', series: [], category: 'Drive components' },
  { partNumber: '700292013000', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '700327012000', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: '700327015000', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: '700327022000', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: '700327028000', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: '700368035002', name: 'Rubber Sleeve', series: [], category: 'Gaskets and seals' },
  { partNumber: '700368090002', name: 'Sleeve Rubber', series: [], category: 'Gaskets and seals' },
  { partNumber: '700386032000', name: 'Shaft Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429014000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429021000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429028001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429036001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429038003', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429040003', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429042001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429045000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429100000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429108000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429126000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429150001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429178000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429260000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429270001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429460001', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '700429540000', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '735038008106', name: 'Rubber Hose', series: [], category: 'Air and intake' },
  { partNumber: '735074100000', name: 'Cover', series: [], category: 'Engine components' },
  { partNumber: '735082235000', name: 'Valve Trim', series: [], category: 'Valve train' },
  { partNumber: '806A06020', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '806A23001', name: 'Locking Plate', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '806B01035', name: 'Spacer Ring', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: '8352010073', name: 'Tab Washer', series: [], category: 'Drive components' },
  { partNumber: '8381810625', name: 'Bearing Pin', series: [], category: 'Bearings' },
  { partNumber: '8490740063', name: 'Flange', series: ['MTU 956', 'MTU 1163'], category: 'Drive components' },
  { partNumber: '8492000005', name: 'Rotary Seal', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8495340000', name: 'Solenoid Valve', series: ['MTU 956', 'MTU 1163'], category: 'Sensors and electrical' },
  { partNumber: '8690920024', name: 'Gauge Vacuum', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '8691840027', name: 'Rotor Complete', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '8692030121', name: 'Actuating Element', series: ['MTU 956', 'MTU 1163'], category: 'Control components' },
  { partNumber: '8692030530', name: 'Pump', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '8692040010', name: 'Ring Thrust', series: ['MTU 956', 'MTU 1163'], category: 'Engine components' },
  { partNumber: '8692040067', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system' },
  { partNumber: '8692040113', name: 'Washer', series: ['MTU 956', 'MTU 1163'], category: 'Drive components' },
  { partNumber: '8692040115', name: 'Washer', series: ['MTU 956', 'MTU 1163'], category: 'Drive components' },
  { partNumber: '8695860572', name: 'Gasket Kit', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699810032', name: 'Cyl Roller Bearing', series: ['MTU 956', 'MTU 1163'], category: 'Bearings' },
  { partNumber: '8699810033', name: 'Anglr Cont Ball Brg', series: ['MTU 956', 'MTU 1163'], category: 'Bearings' },
  { partNumber: '8699890005', name: 'Adhesive', series: ['MTU 2000'], category: 'Tools and supplies' },
  { partNumber: '8699970114', name: 'Sealing Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699970212', name: 'O-Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699970213', name: 'O-Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699970497', name: 'Sealing Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699970498', name: 'Sealing Ring', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8699970499', name: 'Radial Lip Shft Seal', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals' },
  { partNumber: '8700380171', name: 'Conrod Bolt', series: [], category: 'Pistons and liners' },
  { partNumber: '8800110159', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: '915005020001', name: 'Sealing Cone', series: [], category: 'Gaskets and seals' },
  { partNumber: '916016006202', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '916016012201', name: 'Clamp', series: [], category: 'Drive components' },
  { partNumber: '999900010000', name: 'Rivet Nut', series: [], category: 'Drive components' },
  { partNumber: 'EX00008371', name: 'Piston', series: [], category: 'Pistons and liners' },
  { partNumber: 'EX00035690', name: 'Piston', series: [], category: 'Pistons and liners' },
  { partNumber: 'EX52407500064', name: 'Injector', series: [], category: 'Fuel system' },
  { partNumber: 'EX59403700072', name: 'Piston', series: [], category: 'Pistons and liners' },
  { partNumber: 'EX59403800070-42', name: 'Conrod', series: [], category: 'Pistons and liners' },
  { partNumber: 'F30006212', name: 'Ratchet With Extensi On', series: [], category: 'Tools and supplies' },
  { partNumber: 'F30378324', name: 'Setting Mandrel', series: [], category: 'Tools and supplies' },
  { partNumber: 'F30379104', name: 'Oil Fiter Wrench', series: [], category: 'Lubrication' },
  { partNumber: 'F30452562', name: 'Tool Kit', series: [], category: 'Tools and supplies' },
  { partNumber: 'F30452578', name: 'Slotted Nut Driver', series: [], category: 'Drive components' },
  { partNumber: 'F30452739', name: 'Milling Cutter', series: [], category: 'Tools and supplies' },
  { partNumber: 'F30453006', name: 'Tool Kit', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6558557', name: 'Barring Device', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6780561', name: 'Puller', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6780562', name: 'Puller', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6781539', name: 'Hydraulic Pressure Spindle', series: [], category: 'Drive components' },
  { partNumber: 'F6789889', name: 'Fitting Removal Device', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6792918', name: 'Barring Tool', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6794703', name: 'Fitting Removal Dev', series: [], category: 'Tools and supplies' },
  { partNumber: 'F6801820', name: 'Barring Gear', series: [], category: 'Drive components' },
  { partNumber: 'S', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'T80090944', name: 'Bracket', series: [], category: 'Drive components' },
  { partNumber: 'X00003277', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: 'X00004135', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00004882', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00005152', name: 'Injector', series: [], category: 'Fuel system' },
  { partNumber: 'X00005363', name: 'Oil Separator', series: [], category: 'Lubrication' },
  { partNumber: 'X00005852', name: 'Protective Sleeve', series: [], category: 'Engine components' },
  { partNumber: 'X00007116', name: 'V Band Clamp', series: [], category: 'Drive components' },
  { partNumber: 'X00008172', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00008369', name: 'Piston', series: [], category: 'Pistons and liners' },
  { partNumber: 'X00009196', name: 'Damper Ring For Injector', series: [], category: 'Fuel system' },
  { partNumber: 'X00009806', name: 'Rectanglr Sect Ring', series: [], category: 'Pistons and liners' },
  { partNumber: 'X00010421', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: 'X00010425', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: 'X00011779', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00011800', name: 'Wiring Harness For Senso', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00012160', name: 'Wiring Harness To Injector', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00014782', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00016024', name: 'Crankshaft Bearing Size 0 0', series: [], category: 'Bearings' },
  { partNumber: 'X00016599', name: 'Bearing Bushing', series: [], category: 'Bearings' },
  { partNumber: 'X00017269', name: 'Impeller', series: [], category: 'Cooling system' },
  { partNumber: 'X00018687', name: 'Washer', series: [], category: 'Drive components' },
  { partNumber: 'X00019018', name: 'Restrictor For Cooling System', series: [], category: 'Cooling system' },
  { partNumber: 'X00023888', name: 'Sealing Washer', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00027830', name: 'Cylinder Liner Size 0 C23', series: ['MTU 4000'], category: 'Pistons and liners' },
  { partNumber: 'X00028017', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00028031', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00028154', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00038531', name: 'Hose Turbo Oil Suppl', series: [], category: 'Turbocharging' },
  { partNumber: 'X00040012', name: 'Speed Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00041465', name: 'Gaiter', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00041552', name: 'Cooler Plate', series: [], category: 'Engine components' },
  { partNumber: 'X00043219', name: 'Conrod Bearing Size 0 1', series: [], category: 'Pistons and liners' },
  { partNumber: 'X00044065', name: 'Sleeve Rubber', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X00E50200176', name: 'Connection Interface', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50200664', name: 'Plug In Board', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50201022', name: 'Governor', series: [], category: 'Control components' },
  { partNumber: 'X00E50201372', name: 'Temperature Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50203606', name: 'S0002 Knocking Module', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50203659', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50207213', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50208847', name: 'Plug In Board', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50209325', name: 'Level Monitor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50214075', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X00E50214448', name: 'Actuator', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X51114500001', name: '2 2 Way Solenoid Vlv', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X51199100026', name: 'Strainer', series: [], category: 'Filters' },
  { partNumber: 'X51204200003', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X51214200004', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X51299100019', name: 'V Ribbed Belt', series: [], category: 'Drive components' },
  { partNumber: 'X51510100022', name: 'Flange', series: [], category: 'Drive components' },
  { partNumber: 'X51604200016', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X51610100001', name: 'Nozzle', series: [], category: 'Fuel system' },
  { partNumber: 'X51621300033', name: 'Generator', series: [], category: 'Starting and charging' },
  { partNumber: 'X51699100034', name: 'Radial Lip Shft Seal Aux Pto End', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X51699100327', name: 'Shaft Seal Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52212500032', name: 'Rubber Sleeve Charge Air Line', series: [], category: 'Turbocharging' },
  { partNumber: 'X52403100003', name: 'Crankshaft Bearing Size 0 1', series: [], category: 'Bearings' },
  { partNumber: 'X52403800001', name: 'Conrod Bearing', series: [], category: 'Pistons and liners' },
  { partNumber: 'X52404100226', name: 'Inlet Valve', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: 'X52404200010', name: 'Valve Guide', series: [], category: 'Valve train' },
  { partNumber: 'X52404200037', name: 'Gasket For Cylinder Head', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52404200043', name: 'Gasket For Cylinder Head', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52404200052', name: 'Seal Ring', series: ['MTU 4000'], category: 'Gaskets and seals' },
  { partNumber: 'X52404200071', name: 'Gasket For Cylinder Head', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52404500056', name: 'Sparkplug', series: [], category: 'Engine components' },
  { partNumber: 'X52405400013', name: 'Pushrod', series: ['MTU 4000'], category: 'Valve train' },
  { partNumber: 'X52405500190', name: 'Profile Gasket F Cylind', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52407800004', name: 'Flow Restrict Valve', series: [], category: 'Control components' },
  { partNumber: 'X52408100007', name: 'Link', series: [], category: 'Drive components' },
  { partNumber: 'X52408300025', name: 'Fuel Hand Pump', series: [], category: 'Fuel system' },
  { partNumber: 'X52412400138', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52414100123', name: 'Gasket F Exhaust Manifold', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52414100132', name: 'Gasket For Exhaust Pipe', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52414700025', name: 'Insulating Mat For Exh Pipe', series: [], category: 'Engine components' },
  { partNumber: 'X52420200075', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52420300037', name: 'Thermal Actuator', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X52421300004', name: 'Alternator', series: [], category: 'Starting and charging' },
  { partNumber: 'X52499100022', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52499100259', name: 'Adjusting Screw', series: ['MTU 4000'], category: 'Fasteners and retaining rings' },
  { partNumber: 'X52499100774', name: 'Support Plate', series: [], category: 'Engine components' },
  { partNumber: 'X52499100815', name: '4 2 Way Sol Valve', series: [], category: 'Control components' },
  { partNumber: 'X52601600011', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X52607700009', name: 'Adapter Jacketed', series: [], category: 'Fuel system' },
  { partNumber: 'X52808100004', name: 'Fuel Delivery Pump', series: [], category: 'Fuel system' },
  { partNumber: 'X53220200002', name: 'Sealing Sleeve', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X53507500012', name: 'Injector', series: [], category: 'Fuel system' },
  { partNumber: 'X53604200004', name: 'Gasket Plate Outer', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X53604200005', name: 'Sealing Plate Inner', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X53608200005', name: 'Fuel Pump Low Pressure', series: [], category: 'Fuel system' },
  { partNumber: 'X53620200052-87', name: 'Coolant Pump', series: [], category: 'Cooling system' },
  { partNumber: 'X54404200018', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X54514100028', name: 'Diaphragm', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X54799101554', name: 'Non Return Valve With Baffle', series: [], category: 'Control components' },
  { partNumber: 'X54920200040-87', name: 'Water Pump High Temp Circuit', series: [], category: 'Cooling system' },
  { partNumber: 'X54999100010', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X56912300043', name: 'Actuating Cylinder', series: [], category: 'Control components' },
  { partNumber: 'X57508300091', name: 'Fuel Filter Spin On', series: [], category: 'Filters' },
  { partNumber: 'X58708300028', name: 'Fuel Filter Element', series: [], category: 'Filters' },
  { partNumber: 'X58712500010', name: 'Bleed Valve', series: [], category: 'Control components' },
  { partNumber: 'X58720700011', name: 'Gear No 11', series: [], category: 'Engine components' },
  { partNumber: 'X58799102324', name: 'N00 Safety Valve', series: [], category: 'Control components' },
  { partNumber: 'X59301300049', name: 'Cylinder Liner Stage 0', series: [], category: 'Pistons and liners' },
  { partNumber: 'X59320200040', name: 'Filter Cartridge For Coolant', series: [], category: 'Filters' },
  { partNumber: 'X59399100031', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X59399100033', name: 'Grommet', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X59399100141', name: 'Bellows', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X59403800071-42', name: 'Connecting Rod', series: [], category: 'Pistons and liners' },
  { partNumber: 'X59407700014', name: 'Adapter', series: [], category: 'Fuel system' },
  { partNumber: 'X59407700021', name: 'Adaptateur P Conduite HP', series: [], category: 'Fuel system' },
  { partNumber: 'X59414100022', name: 'Restrictor', series: [], category: 'Control components' },
  { partNumber: 'X59417200010', name: 'Starter Electric', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X59420200233', name: 'Restrictor', series: [], category: 'Control components' },
  { partNumber: 'X59420200234', name: 'Restrictor', series: [], category: 'Control components' },
  { partNumber: 'X59420200235', name: 'Restrictor', series: [], category: 'Control components' },
  { partNumber: 'X59420200238', name: 'Restrictor', series: [], category: 'Control components' },
  { partNumber: 'X59499100014', name: 'Hose For Air Compressor', series: [], category: 'Air and intake' },
  { partNumber: 'X59499100015', name: 'Hose For Air Compressor', series: [], category: 'Air and intake' },
  { partNumber: 'X59607700020', name: 'Adapter For HP Line', series: [], category: 'Fuel system' },
  { partNumber: 'X59610100061', name: 'Bearing Body', series: [], category: 'Bearings' },
  { partNumber: 'X59610100101', name: 'Thrust Bearing', series: [], category: 'Bearings' },
  { partNumber: 'X59620600007', name: 'Thermal Actuator', series: [], category: 'Sensors and electrical' },
  { partNumber: 'X59620700004', name: 'Seal Carrier', series: [], category: 'Gaskets and seals' },
  { partNumber: 'X59699100285', name: 'Pressure Spring', series: [], category: 'Fuel system' },
  { partNumber: 'X59699100286', name: 'Pressure Spring', series: [], category: 'Fuel system' },
  { partNumber: 'X59699101095', name: 'Banjo Screw', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: 'XP00A36400005', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP51107300001', name: 'Suction Restr Valve', series: [], category: 'Control components' },
  { partNumber: 'XP51108300002', name: 'Filter Cartridge', series: [], category: 'Filters' },
  { partNumber: 'XP51529700004', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP51529700005', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP51529700006', name: 'Rotary Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP52229700007', name: 'Track Ring', series: [], category: 'Engine components' },
  { partNumber: 'XP52414800015', name: 'Sealing Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP52618300032', name: 'Oil Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP52712100002', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP52712100003', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP52712100005', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP52712100006', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP52718300060', name: 'Paper Insert', series: [], category: 'Filters' },
  { partNumber: 'XP52718300064', name: 'Gasket Kit', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP52718300065', name: 'Circlip Kit', series: [], category: 'Fasteners and retaining rings' },
  { partNumber: 'XP52799101135', name: 'Seal Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP56918300055', name: 'Overflow Valve', series: [], category: 'Control components' },
  { partNumber: 'XP58420400009', name: 'Gasket', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP58799100596', name: 'Seal', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP59307500002', name: 'O-Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP59400600004', name: 'Gasket Kit', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP59408300054', name: 'Filter Cartridge', series: [], category: 'Filters' },
  { partNumber: 'XP59420300091', name: 'Seal Ring', series: [], category: 'Gaskets and seals' },
  { partNumber: 'XP59420700027', name: 'Impeller', series: [], category: 'Cooling system' },
  { partNumber: 'XP59501800123', name: 'Filter Element', series: [], category: 'Filters' },
  { partNumber: 'XP59612300047', name: 'Insulation', series: [], category: 'Engine components' },
  { partNumber: 'XT1310100012', name: 'Magnetic Nut', series: ['MTU 396'], category: 'Drive components' },
  { partNumber: 'XT5610100140', name: 'Piston Ring F Turbocharger', series: [], category: 'Turbocharging' },
  { partNumber: 'Y20098771', name: 'Feeler Gauge', series: [], category: 'Tools and supplies' },
  { partNumber: 'Z', name: 'Ball Cock', series: [], category: 'Control components' },
].map(createCatalogPart);
// END IMPORTED SITEMAP PARTS




const mtuPartsRaw: MtuPart[] = [
  ...sitemapMtuParts,
  ...catalogPartSeeds.map(createCatalogPart),
  {
    slug: '5840530229-valve-guide-inlet-size-1',
    partNumber: '5840530229',
    name: 'Valve Guide Inlet, Size 1',
    series: ['MTU 595', 'MTU 956', 'MTU 1163'],
    category: 'Valve train',
    summary: 'MTU 进气门导管询价支持——面向进气侧保养与大修作业。',
    image: partImage,
    availability: '按发动机出厂编号核查库存与替换状态。',
    applications: ['船舶推进', '船厂大修', '发电'],
    notes: ['订购前确认缸盖构型。', '尺寸标识不清时请发送旧件照片。'],
  },
  {
    slug: 'x54707700072-relief-valve-for-4-cyl-hp-pump',
    partNumber: 'X54707700072',
    name: 'Relief Valve for 4-Cylinder HP Pump',
    series: [],
    category: 'Fuel system',
    summary: 'MTU 高压燃油泵保养用溢流阀寻源。',
    image: partImage,
    availability: '按泵型号、发动机系列与目的地报价。',
    applications: ['船用发动机', '发电机组', '工业动力机组'],
    notes: ['请核验泵构型与燃油系统版本。', '询价时请提供发动机型号与出厂编号。'],
  },
  {
    slug: 'x00e50207217-pressure-sensor',
    partNumber: 'X00E50207217',
    name: 'Pressure Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: 'MTU 压力传感器供货核查——经零件号与接头核验。',
    image: partImage,
    availability: '紧急保养常用件；按零件号与照片确认。',
    applications: ['船舶推进', '发电', '轨道交通维修'],
    notes: ['如可能请提供接头照片与安装位置。', '发货前核查替代关系。'],
  },
  {
    slug: 'x00e50207196-pressure-sensor',
    partNumber: 'X00E50207196',
    name: 'Pressure Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: '面向 MTU 服务团队与采购客户的压力传感器询价页。',
    image: partImage,
    availability: '经出厂编号核查后确认库存或寻源路线。',
    applications: ['发电发动机', '工业发动机', '船用辅机'],
    notes: ['请确认旧件是否有被替代参考号。', '提供照片可降低错配风险。'],
  },
  {
    slug: '0005357533-speed-sensor',
    partNumber: '0005357533',
    name: 'Speed Sensor',
    series: ['MTU 396', 'MTU 4000'],
    category: 'Sensors and electrical',
    summary: 'MTU 转速传感器——用于控制、监测与发动机保护系统。',
    image: partImage,
    availability: '按传感器零件号、发动机型号与电缆/接头细节核查。',
    applications: ['船用发动机', '轨交发动机', '发电'],
    notes: ['确认电缆长度与接头类型。', '请发送铭牌或旧传感器标识。'],
  },
  {
    slug: '0005357433-speed-sensor',
    partNumber: '0005357433',
    name: 'Speed Sensor',
    series: ['MTU 396', 'MTU 4000'],
    category: 'Sensors and electrical',
    summary: 'MTU 发动机监测与更换用转速传感器寻源。',
    image: partImage,
    availability: '按库存、替换选项与运输目的地报价。',
    applications: ['船厂', '发电机组维修', '船队服务'],
    notes: ['购买前请发送旧传感器照片。', '对照发动机出厂编号核查适配性。'],
  },
  {
    slug: '5841800143-oil-spray-nozzle',
    partNumber: '5841800143',
    name: 'Oil Spray Nozzle',
    series: ['MTU 595', 'MTU 956', 'MTU 1163'],
    category: 'Lubrication',
    summary: 'MTU 润滑与大修保养用机油喷嘴支持。',
    image: partImage,
    availability: '按系列与所需数量核查可行路线。',
    applications: ['船舶推进', '大修', '电厂服务'],
    notes: ['核验安装位置与发动机系列。', '建议与相关密封件或垫片一同订购。'],
  },
  {
    slug: '0005862709-repair-kit',
    partNumber: '0005862709',
    name: 'Repair Kit',
    series: [],
    category: 'Repair kits',
    summary: 'MTU 修理包询价支持——面向计划保养与紧急维修。',
    image: partImage,
    availability: '报价前确认包内容物与交货期。',
    applications: ['维修车间', '船厂', '发电机组维修'],
    notes: ['购买前确认修理包范围。', '请提供发动机型号与维修位置细节。'],
  },
  {
    slug: 'e0070960299-exhaust-turbocharger',
    partNumber: 'E0070960299',
    name: 'Exhaust Turbocharger',
    series: [],
    category: 'Turbocharging',
    summary: 'MTU 船用与发电发动机废气涡轮增压器寻源。',
    image: partImage,
    availability: '按应用报新件、替换或维修选项。',
    applications: ['船舶推进', '发电机组', '工业发动机'],
    notes: ['确认发动机功率标定与增压器铭牌。', '运输尺寸与包装影响发货路线。'],
  },
  {
    slug: 'e0070960399-exhaust-turbocharger',
    partNumber: 'E0070960399',
    name: 'Exhaust Turbocharger',
    series: [],
    category: 'Turbocharging',
    summary: 'MTU 增压器供货核查——经应用与功率标定核验。',
    image: partImage,
    availability: '核验标定、法兰与替换路线后报价。',
    applications: ['船舶', '发电', '工业设备'],
    notes: ['请发送增压器铭牌照片。', '停机订单请注明要求交期。'],
  },
  {
    slug: 'ex53620700005-87-seawater-pump',
    partNumber: 'EX53620700005/87',
    name: 'Seawater Pump',
    series: [],
    category: 'Cooling system',
    summary: 'MTU 船用冷却系统海水泵支持。',
    image: partImage,
    availability: '按泵参考号、发动机型号与船舶位置核查。',
    applications: ['船舶推进', '辅机', '船厂维修'],
    notes: ['旧泵与接口照片有助于确认适配。', '请一并提出垫片与密封件需求。'],
  },
  {
    slug: 'x52808100014-fuel-delivery-pump',
    partNumber: 'X52808100014',
    name: 'Fuel Delivery Pump',
    series: [],
    category: 'Fuel system',
    summary: 'MTU 燃油输送泵寻源——面向保养与维修。',
    image: partImage,
    availability: '按发动机出厂编号与库存路线报价。',
    applications: ['船用', '发电', '工业发动机维修'],
    notes: ['确认旧件上的泵参考号。', '更换时检查相关燃油管或密封件。'],
  },
  {
    slug: '5240780824-conn-fuel-rail-rear',
    partNumber: '5240780824',
    name: 'Connector, Fuel Rail Rear',
    series: [],
    category: 'Fuel system',
    summary: 'MTU 燃油系统保养用燃油轨接头询价支持。',
    image: partImage,
    availability: '大修清单可逐项核查库存。',
    applications: ['船用发动机', '发电', '船队保养'],
    notes: ['核验后轨构型。', '发送完整燃油系统清单以获得合并报价。'],
  },
  {
    slug: 'x59407700023-hp-fuel-line',
    partNumber: 'X59407700023',
    name: 'HP Fuel Line',
    series: [],
    category: 'Fuel system',
    summary: 'MTU 4000 保养用高压燃油管寻源。',
    image: partImage,
    availability: '按缸位、发动机出厂编号与所需数量核查。',
    applications: ['MTU 4000 船用发动机', '发电机组维修', '工业发动机'],
    notes: ['确认确切油管位置。', '未经出厂编号核验不得代用。'],
  },
  {
    slug: '5552035639-flange',
    partNumber: '5552035639',
    name: 'Flange',
    series: ['MTU 396', 'MTU 595'],
    category: 'Cooling system',
    summary: 'MTU 法兰询价支持——面向冷却与液体回路保养。',
    image: partImage,
    availability: '经零件号与旧件照片确认。',
    applications: ['船厂维修', '工业发动机维修', '发电发动机'],
    notes: ['如可能请提供配合件信息。', '发货前确认垫片需求。'],
  },
  {
    slug: 'x58720700002-coolant-pump-shaft',
    partNumber: 'X58720700002',
    name: 'Coolant Pump Shaft',
    series: [],
    category: 'Cooling system',
    summary: 'MTU 水泵维修与大修用水泵轴支持。',
    image: partImage,
    availability: '按泵总成与发动机系列核查供货。',
    applications: ['船用发动机', '电厂', '维修车间'],
    notes: ['确认泵总成参考号。', '请在同一询价中提出密封件与轴承需求。'],
  },
  {
    slug: '5590982680-gasket',
    partNumber: '5590982680',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 595', 'MTU 956'],
    category: 'Gaskets and seals',
    summary: 'MTU 垫片寻源——面向保养包与大修清单。',
    image: partImage,
    availability: '适合与其他保养件合并发货。',
    applications: ['大修', '例行保养', '船用维修'],
    notes: ['确认发动机系列与安装位置。', '发送完整垫片清单以加快报价。'],
  },
  {
    slug: '0001750080-gasket',
    partNumber: '0001750080',
    name: 'Gasket',
    series: ['MTU 183', 'MTU 396', 'MTU 4000'],
    category: 'Gaskets and seals',
    summary: 'MTU 保养与维修用垫片供货核查。',
    image: partImage,
    availability: '询价后核查库存与替换状态。',
    applications: ['保养包', '发电机组维修', '船厂服务'],
    notes: ['零件号核验可避免垫片错选。', '数量与目的地影响包装路线。'],
  },
  {
    slug: '5370780038-damper-strip',
    partNumber: '5370780038',
    name: 'Damper Strip',
    series: ['MTU 396', 'MTU 538'],
    category: 'Fuel system',
    summary: 'MTU 燃油与发动机装配保养用阻尼条支持。',
    image: partImage,
    availability: '按发动机系列与所需数量核查。',
    applications: ['船用服务', '工业维修', '老机型支持'],
    notes: ['老系列可能需要替换确认。', '旧标识磨损时照片有帮助。'],
  },
  {
    slug: '5500530025-spring-retainer',
    partNumber: '5500530025',
    name: 'Spring Retainer',
    series: ['MTU 396', 'MTU 595'],
    category: 'Valve train',
    summary: 'MTU 缸盖与配气机构作业用弹簧座寻源。',
    image: partImage,
    availability: '按库存或寻源选项报价。',
    applications: ['缸盖维修', '大修', '船用发动机'],
    notes: ['确认配套配气机构零件。', '请按缸数提供数量。'],
  },
  {
    slug: '5550630180-gasket',
    partNumber: '5550630180',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 595'],
    category: 'Gaskets and seals',
    summary: 'MTU 垫片询价页——面向计划保养与维修。',
    image: partImage,
    availability: '报价前逐项确认供货情况。',
    applications: ['船厂', '服务公司', '发电'],
    notes: ['请对照手册确认准确零件号。', '建议与其他保养包件一并报价。'],
  },
  {
    slug: '8492500001-coupling',
    partNumber: '8492500001',
    name: 'Coupling',
    series: ['MTU 4000', 'MTU 8000'],
    category: 'Drive components',
    summary: 'MTU 发动机传动与辅助系统联轴器寻源。',
    image: partImage,
    availability: '按尺寸、旧件照片与发动机应用报价。',
    applications: ['船舶推进', '发电', '工业传动'],
    notes: ['确认配合设备与安装位置。', '包装尺寸可能影响运费选择。'],
  },
  {
    slug: '0005354330-temperature-sensor',
    partNumber: '0005354330',
    name: 'Temperature Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: 'MTU 监测与保护系统用温度传感器供货核查。',
    image: partImage,
    availability: '按零件号、接头与发动机出厂编号核查库存。',
    applications: ['船用', '发电', '轨交与工业发动机'],
    notes: ['请发送接头照片。', '核查替代关系与安装点。'],
  },
  {
    slug: 'x50441600048-air-hose',
    partNumber: 'X50441600048',
    name: 'Air Hose',
    series: [],
    category: 'Air and intake',
    summary: 'MTU 充气与进气系统保养用空气软管支持。',
    image: partImage,
    availability: '经软管形状、旧件照片与零件号确认供货。',
    applications: ['船用发动机', '工业发动机', '发电机组'],
    notes: ['软管走向各异，照片很有用。', '请一并提出卡箍或护套需求。'],
  },
  {
    slug: '4441410480-gasket',
    partNumber: '4441410480',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 493'],
    category: 'Gaskets and seals',
    summary: '老型号 MTU 垫片寻源——面向维修与保养计划。',
    image: partImage,
    availability: '按发动机系列与数量核查老型号供货。',
    applications: ['老型号船用发动机', '工业服务', '维修车间'],
    notes: ['订购前核查被替代号。', '如可能请发送旧垫片或手册参考。'],
  },
  // ═══════════════════════════════════════════════
  // ENRICHED VERIFIED PARTS (real data from supplier catalogs)
  // ═══════════════════════════════════════════════
  ...([
    // ── MTU 4000 Overhaul Parts ──
    { partNumber: '5240113410', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners', stockStatus: '标准等级——常备库存件，经出厂编号核查后确认', replacementFor: ['5240113510', '5240114210'], hsCode: '8409.99', applicableEngines: '12V 4000 M70, 16V 4000 M90, 20V 4000 M93', commonFailureScenarios: ['水套侧气蚀侵蚀', '顶环行程处磨损台阶——大修时检查', '冷却液污染导致拉伤'], orderingNotes: '订购前务必经发动机出厂编号核验尺寸等级（0/1/2）。缸套、活塞环与密封环应整组更换。' },
    { partNumber: '5240103420', name: 'Cylinder Head Assembly', series: [], category: 'Cylinder heads', stockStatus: '按发动机变型核查——原厂与替代件均可报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240161580', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: ['5240160380'], hsCode: '8484.10', applicableEngines: '12V/16V/20V 4000 series — all variants', commonFailureScenarios: ['缸盖结合面外部冷却液泄漏', '燃烧气体窜入冷却系统', '垫片失效导致机油污染冷却液'], orderingNotes: '整组更换（每缸一件）。同时务必更换缸盖螺栓。' },
    { partNumber: '5240303917', name: 'Piston Assembly', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价——原厂与替代等级可选', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240372525', name: 'Piston Crown', series: [], category: 'Pistons and liners', stockStatus: '按发动机出厂编号与活塞顶零件号报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240300215', name: 'Piston Skirt', series: [], category: 'Pistons and liners', stockStatus: '与配套活塞顶一并报价——可选套件', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0120370618', name: 'Oil Control Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set — commonly in stock', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0120370819', name: 'Taper Face Compression Ring', series: [], category: 'Pistons and liners', stockStatus: '标准活塞环组件', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080375819', name: 'Rectangular Section Ring', series: [], category: 'Pistons and liners', stockStatus: '标准活塞环组件', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240383710', name: 'Conrod Bearing Upper Half', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价（标准/0.25/0.50/0.75）', replacementFor: ['5240384110'], hsCode: '8483.30' },
    { partNumber: '5240382711', name: 'Conrod Bearing Lower Half', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5240384210'], hsCode: '8483.30' },
    { partNumber: '5240380471', name: 'Conrod Bolt', series: ['MTU 4000'], category: 'Drive components', stockStatus: '常有库存——始终整组更换', replacementFor: [], hsCode: '7318.15' },
    { partNumber: '5240334901', name: 'Crankshaft Bearing Upper', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5240336602'], hsCode: '8483.30' },
    { partNumber: '5240335602', name: 'Crankshaft Bearing Lower', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5240336702'], hsCode: '8483.30' },
    { partNumber: '5240332730', name: 'Crankshaft Bearing Driving End', series: [], category: 'Bearings', stockStatus: '按发动机出厂编号报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5240332630', name: 'Crankshaft Bearing Free End', series: [], category: 'Bearings', stockStatus: '按发动机出厂编号报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5240530301', name: 'Inlet Valve', series: [], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: ['X52404100226'], hsCode: '8409.91' },
    { partNumber: '5240530305', name: 'Exhaust Valve', series: [], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: ['5240530805', '5240530905'], hsCode: '8409.91' },
    { partNumber: '5240530152', name: 'Valve Spring Inner', series: [], category: 'Valve train', stockStatus: '常有库存——可报套件价', replacementFor: ['5240530122'], hsCode: '8409.91' },
    { partNumber: '5240530120', name: 'Valve Spring Outer', series: ['MTU 4000'], category: 'Valve train', stockStatus: '常有库存——可报套件价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '0000534335', name: 'Valve Rotator', series: [], category: 'Valve train', stockStatus: '按件或整组报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '0000530926', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240160069', name: 'Cylinder Head Bolt', series: [], category: 'Drive components', stockStatus: '大修时始终整组更换', replacementFor: ['5249900701'], hsCode: '7318.15' },
    { partNumber: '5240160153', name: 'Injector Sleeve', series: [], category: 'Fuel system', stockStatus: '按零件号核查——喷油器保养时更换', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5240500930', name: 'Push Rod', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: ['X52405400013'], hsCode: '8409.91' },
    // ── MTU 4000 Turbocharger ──
    { partNumber: '5110804420', name: 'Turbine Wheel', series: [], category: 'Turbocharging', stockStatus: '按增压器出厂编号核查——新件与再制造件可选', replacementFor: ['5110800220', '5110800420'], hsCode: '8414.90' },
    { partNumber: '5110803201', name: 'Bearing Housing', series: [], category: 'Turbocharging', stockStatus: '按增压器型号与出厂编号报价', replacementFor: [], hsCode: '8414.90' },
    { partNumber: '5110850060', name: 'Piston Ring for Turbocharger', series: [], category: 'Turbocharging', stockStatus: '小件——常有库存', replacementFor: ['5090850060'], hsCode: '8414.90' },
    // ── MTU 4000 Fuel System ──
    { partNumber: 'EX52407500064', name: 'Injector', series: [], category: 'Fuel system', stockStatus: '按喷油器零件号与发动机出厂编号核查——新件与再制造件', replacementFor: [], hsCode: '8413.30', applicableEngines: '12V/16V 4000 M70, M90, M93 — common rail variants', commonFailureScenarios: ['燃油供给不均导致缸间不均衡', '高工时后喷嘴头部积碳', '内部泄漏使回油量升高'], orderingNotes: '再制造置换请提供喷油器出厂编号。新原厂件与原厂配套替代件均可提供。' },
    { partNumber: 'X57508300091', name: 'Fuel Filter Spin-On', series: [], category: 'Filters', stockStatus: '常用耗材——通常有库存', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '5240160153', name: 'Tube Injector', series: [], category: 'Fuel system', stockStatus: '按件报价', replacementFor: [], hsCode: '8413.30' },
    // ── MTU 4000 Cooling ──
    { partNumber: '5062000601', name: 'Coolant Pump', series: [], category: 'Cooling system', stockStatus: '按发动机应用核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5582040406', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: ['5802040806'], hsCode: '8413.30' },
    { partNumber: '5240980281', name: 'Hose', series: [], category: 'Cooling system', stockStatus: '按零件号与发动机安装形式报价', replacementFor: [], hsCode: '4009.31' },
    // ── MTU 4000 Filters ──
    { partNumber: '5241840501', name: 'Lube Oil Full Flow Filter', series: [], category: 'Filters', stockStatus: '常用耗材——可批量供货', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '0031845201', name: 'Oil Filter Spin-On', series: [], category: 'Filters', stockStatus: '高频耗材——通常有库存', replacementFor: ['0031845301'], hsCode: '8421.23' },
    { partNumber: '0020922801', name: 'Fuel Filter Spin-On', series: [], category: 'Filters', stockStatus: '高频耗材——通常有库存', replacementFor: ['0020921901'], hsCode: '8421.23' },
    // ── MTU 4000 Seals ──
    { partNumber: '5241420780', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5241870380', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5241880180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'X52404200052', name: 'Seal Ring', series: ['MTU 4000'], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },

    // ── MTU 2000 Overhaul Parts ──
    { partNumber: '5410160920', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: ['5500160420'], hsCode: '8484.10' },
    { partNumber: '5310160021', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5419970645', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: ['5419970545'], hsCode: '8484.10' },
    { partNumber: '5501871280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5220980080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5411420180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5410530020', name: 'Valve Spring', series: [], category: 'Valve train', stockStatus: '常用大修件——可报套件价', replacementFor: ['5500530020'], hsCode: '8409.91' },
    { partNumber: '5500530401', name: 'Inlet Valve', series: [], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: ['5500500227', '4420500227'], hsCode: '8409.91' },
    { partNumber: '5410540505', name: 'Push Rod', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5419900304', name: 'Rocker Shaft Bolt', series: [], category: 'Drive components', stockStatus: '缸盖作业按组报价', replacementFor: [], hsCode: '7318.15' },
    // ── MTU 2000 Fuel System ──
    { partNumber: 'X53507500012', name: 'Injector', series: [], category: 'Fuel system', stockStatus: '按喷油器零件号与发动机出厂编号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30', applicableEngines: '8V/12V/16V/18V 2000 M84, M91, M93, M94, M96', commonFailureScenarios: ['低负荷运行导致喷嘴结焦', '喷油器体内磨损（12,000–15,000 小时）', '密封面泄漏导致压缩损失'], orderingNotes: '可走再制造置换——需退回旧芯。新原厂配套替代喷油器亦可报价。请提供发动机出厂编号与喷油器零件号。' },
    { partNumber: 'X53508200001', name: 'Low Pressure Fuel Pump', series: [], category: 'Fuel system', stockStatus: '按泵零件号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: 'E0060704101', name: 'High Pressure Pump', series: [], category: 'Fuel system', stockStatus: '按发动机出厂编号报价——原厂与替代件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5360900250', name: 'Fuel Delivery Pump', series: [], category: 'Fuel system', stockStatus: '按发动机应用核查', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5360702032', name: 'Fuel Line', series: [], category: 'Fuel system', stockStatus: '按零件号与发动机安装形式报价', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5501801015', name: 'Pressure Relief Valve', series: [], category: 'Fuel system', stockStatus: '按件报价', replacementFor: ['5501801115'], hsCode: '8481.40' },
    // ── MTU 2000 Injector Parts ──
    { partNumber: '0030176421', name: 'Nozzle Holder with Nozzle', series: [], category: 'Fuel system', stockStatus: '按喷油器零件号核查——新件与再制造件可选', replacementFor: ['0040175021'], hsCode: '8413.30' },
    { partNumber: '0010175412', name: 'Nozzle', series: [], category: 'Fuel system', stockStatus: '喷油器常用保养件', replacementFor: [], hsCode: '8413.30' },
    // ── MTU 2000 Cooling ──
    { partNumber: 'X00022524', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: ['X00008653'], hsCode: '8413.30' },
    { partNumber: '5502003201', name: 'Seawater Pump', series: [], category: 'Cooling system', stockStatus: '按泵型号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.70' },
    { partNumber: '5502002002', name: 'Drive Shaft', series: [], category: 'Drive components', stockStatus: '按零件号报价', replacementFor: [], hsCode: '8483.10' },
    { partNumber: '5502040906', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5502030060', name: 'Sight Glass', series: [], category: 'Cooling system', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7017.90' },
    // ── MTU 2000 Filters ──
    { partNumber: '5501800016', name: 'Oil Filter Element', series: ['MTU 396'], category: 'Filters', stockStatus: '按询价逐项核查供货', replacementFor: [], weightKg: '0.658 KG', hsCode: '84212300' },
    { partNumber: '0010928801', name: 'Fuel Prefilter', series: [], category: 'Filters', stockStatus: '常用耗材——通常有库存', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '0030944304', name: 'Air Filter', series: [], category: 'Filters', stockStatus: '常用耗材——可批量供货', replacementFor: ['0030947404', '0030948104'], hsCode: '8421.31' },
    { partNumber: '0180944502', name: 'Prefilter', series: [], category: 'Filters', stockStatus: '常用耗材', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '0170942502', name: 'Air Filter', series: [], category: 'Filters', stockStatus: '常用耗材——通常有库存', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '5360900001', name: 'Air Filter', series: [], category: 'Filters', stockStatus: '常用耗材', replacementFor: [], hsCode: '8421.31' },
    // ── MTU 2000 Bearings ──
    { partNumber: '5500511710', name: 'Camshaft Bearing', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '4420302240', name: 'Main Bearing', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价（标准/0.25/0.50）', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5700510150', name: 'Bushing', series: [], category: 'Bearings', stockStatus: '按件报价', replacementFor: ['5500550550', '5240550550'], hsCode: '8483.30' },
    // ── MTU 2000 Lubrication ──
    { partNumber: '5500100061', name: 'Oil Separator', series: [], category: 'Lubrication', stockStatus: '按件报价——原厂与替代件可选', replacementFor: ['5410100163'], hsCode: '8421.29' },
    { partNumber: '4221880001', name: 'Oil Cooler', series: [], category: 'Lubrication', stockStatus: '按发动机型号核查——新件与再制造件可选', replacementFor: ['0021882301'], hsCode: '8419.50' },
    { partNumber: '4231801101', name: 'Oil Pump', series: [], category: 'Lubrication', stockStatus: '按泵零件号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5361800515', name: 'Oil Pressure Relief Valve', series: [], category: 'Lubrication', stockStatus: '按件报价', replacementFor: [], hsCode: '8481.40' },
    // ── MTU 2000 Sensors ──
    { partNumber: '0005358233', name: 'Speed Sensor', series: [], category: 'Sensors and electrical', stockStatus: '常用传感器——通常有库存', replacementFor: ['0005357933', '0005357633'], hsCode: '9032.89' },
    { partNumber: '0035352531', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical', stockStatus: '常用传感器——通常有库存', replacementFor: ['0035352731', '0035351731', '0035352931'], hsCode: '9032.89' },
    { partNumber: '0005356430', name: 'Temperature Sensor', series: [], category: 'Sensors and electrical', stockStatus: '常用传感器——通常有库存', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0005355103', name: 'Level Monitor', series: [], category: 'Sensors and electrical', stockStatus: '按零件号与接头类型报价', replacementFor: ['0005355303'], hsCode: '9032.89' },
    { partNumber: '5205304531', name: 'Pressure Sensor', series: ['MTU 4000'], category: 'Sensors and electrical', stockStatus: '常用传感器——通常有库存', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0045426917', name: 'Temperature Monitor', series: [], category: 'Sensors and electrical', stockStatus: '按零件号报价', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0001536132', name: 'Pressure Monitor', series: [], category: 'Sensors and electrical', stockStatus: '按零件号报价', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '5205304131', name: 'Travel Sensor', series: [], category: 'Sensors and electrical', stockStatus: '按发动机应用报价', replacementFor: [], hsCode: '9032.89' },
    // ── MTU 2000 Turbocharger ──
    { partNumber: '5310900337', name: 'Charge Air Line', series: [], category: 'Turbocharging', stockStatus: '按零件号与发动机变型报价', replacementFor: [], hsCode: '8414.90' },
    { partNumber: '5120850560', name: 'Piston Ring for Turbocharger', series: [], category: 'Turbocharging', stockStatus: '小件——常有库存', replacementFor: ['5100850060'], hsCode: '8414.90' },
    { partNumber: '5361420025', name: 'Diffuser Exhaust', series: [], category: 'Turbocharging', stockStatus: '按增压器型号报价', replacementFor: [], hsCode: '8414.90' },
    // ── MTU 2000 Cylinder Head ──
    { partNumber: '5610105420', name: 'Cylinder Head', series: [], category: 'Cylinder heads', stockStatus: '按发动机变型报价——原厂与替代件可选', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500100330', name: 'Cylinder Head Cover', series: [], category: 'Cylinder heads', stockStatus: '按发动机变型报价', replacementFor: ['5500160405'], hsCode: '8409.91' },
    { partNumber: '5500530232', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500531231', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500225', name: 'Roller Tappet', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '4760500025', name: 'Tappet', series: [], category: 'Valve train', stockStatus: '按件报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500333', name: 'Rocker Arm Inlet', series: [], category: 'Valve train', stockStatus: '按件报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500334', name: 'Rocker Arm Exhaust', series: [], category: 'Valve train', stockStatus: '按件报价', replacementFor: [], hsCode: '8409.91' },

    // ── MTU 396 Overhaul Parts ──
    { partNumber: '5320110110', name: 'Cylinder Liner', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价——标准等级常供', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5320100130', name: 'Cylinder Head Cover', series: ['MTU 396'], category: 'Cylinder heads', stockStatus: '按发动机变型报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: ['5110200278'], hsCode: '8409.91' },
    { partNumber: '4570530001', name: 'Inlet Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410370220', name: 'Piston Pin', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5410380250', name: 'Conrod Bushing', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5320530020', name: 'Valve Spring', series: ['MTU 396'], category: 'Valve train', stockStatus: '常用大修件——可报套件价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530225', name: 'Valve Spring Retainer', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530226', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530532', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410532131', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410532730', name: 'Valve Guide', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: [], hsCode: '8409.91' },
    // ── MTU 396 Bearings ──
    { partNumber: '5410330605', name: 'Crankshaft Bearing Size 0-0', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5410337101'], hsCode: '8483.30' },
    { partNumber: '5090200512', name: 'Thrust Bearing', series: [], category: 'Bearings', stockStatus: '按发动机出厂编号核查', replacementFor: ['5110200412'], hsCode: '8483.30' },
    { partNumber: '5110252210', name: 'Bearing', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5370550050', name: 'Bushing', series: [], category: 'Bearings', stockStatus: '按件报价', replacementFor: [], hsCode: '8483.30' },
    // ── MTU 396 Lubrication ──
    { partNumber: '5410100163', name: 'Oil Separator', series: ['MTU 396'], category: 'Lubrication', stockStatus: '按件报价——原厂与替代件可选', replacementFor: [], hsCode: '8421.29' },
    { partNumber: '5321800001', name: 'Oil Pump', series: [], category: 'Lubrication', stockStatus: '按泵零件号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5321800143', name: 'Oil Spray Nozzle', series: [], category: 'Lubrication', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.99' },
    // ── MTU 396 Fuel ──
    { partNumber: '5320700246', name: 'Relief Valve', series: ['MTU 396'], category: 'Fuel system', stockStatus: '按件报价', replacementFor: [], hsCode: '8481.40' },
    { partNumber: '5410180233', name: 'Diaphragm for Oil Separator', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 396 Filters ──
    { partNumber: '5320900001', name: 'Air Filter', series: [], category: 'Filters', stockStatus: '常用耗材——通常有库存', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '0000921705', name: 'Filter Element', series: [], category: 'Filters', stockStatus: '常用耗材——可批量供货', replacementFor: [], hsCode: '8421.23' },
    // ── MTU 396 Cooling ──
    { partNumber: '5592010307', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5110812603', name: 'Heat Shield', series: [], category: 'Turbocharging', stockStatus: '按增压器型号报价', replacementFor: ['5110820226', '5120820226'], hsCode: '8414.90' },
    // ── MTU 396 Seals / Gaskets ──
    { partNumber: '5532031580', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: ['5532030080'], hsCode: '8484.10' },
    { partNumber: '5372030880', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320160221', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320980080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320140022', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5550630180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4571410080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0029977940', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——可批量供货', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000170660', name: 'Ce Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 396 Sensors ──
    { partNumber: '0005353960', name: 'Thermocouple', series: [], category: 'Sensors and electrical', stockStatus: '按接头类型与发动机变型核查', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '8495340000', name: 'Solenoid Valve', series: [], category: 'Sensors and electrical', stockStatus: '按零件号报价——原厂与替代件可选', replacementFor: ['0005342732'], hsCode: '8481.80' },

    // ── MTU 595 Overhaul Parts ──
    { partNumber: '5840111810', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300917', name: 'Piston', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价——原厂与替代件可选', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300020-42', name: 'Connecting Rod', series: [], category: 'Pistons and liners', stockStatus: '按发动机出厂编号报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300615', name: 'Piston Skirt', series: [], category: 'Pistons and liners', stockStatus: '与配套活塞顶一并报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840371625', name: 'Piston Crown', series: [], category: 'Pistons and liners', stockStatus: '按发动机出厂编号与活塞顶零件号报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840530129', name: 'Valve Guide Inlet Size 0', series: [], category: 'Valve train', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5840900595', name: '2/2-Way Solenoid Valve', series: [], category: 'Sensors and electrical', stockStatus: '按零件号报价', replacementFor: ['5840980257'], hsCode: '8481.80' },
    { partNumber: '5840900054', name: 'Valve Housing', series: [], category: 'Valve train', stockStatus: '按发动机变型报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5840700632-87', name: 'HP Fuel Line', series: [], category: 'Fuel system', stockStatus: '按零件号与发动机安装形式报价', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5840782802', name: 'Supply Pipe', series: [], category: 'Fuel system', stockStatus: '按零件号报价', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5841400344', name: 'Flange', series: [], category: 'Cooling system', stockStatus: '按零件号报价', replacementFor: ['8490740063'], hsCode: '8419.50' },
    { partNumber: '5841800175', name: 'Oil Thermostat', series: [], category: 'Lubrication', stockStatus: '按发动机应用报价', replacementFor: [], hsCode: '9032.10' },
    { partNumber: '5842040714', name: 'Coolant Pump Shaft', series: [], category: 'Cooling system', stockStatus: '按泵型号报价', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5842032780', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5842040180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },

    // ── MTU 956 / 1163 Parts ──
    { partNumber: '5550105141', name: 'Cylinder Head with Valve', series: ['MTU 956', 'MTU 1163'], category: 'Cylinder heads', stockStatus: '按发动机变型报价——原厂与替代件可选', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5550161420', name: 'Cylinder Head Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: ['5550162320', '5550162420'], hsCode: '8484.10' },
    { partNumber: '5550302160', name: 'Conrod Bearing Size 0-0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5550307540', name: 'Crankshaft Bearing Size 0-0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5550330130'], hsCode: '8483.30' },
    { partNumber: '5550530105', name: 'Exhaust Valve', series: ['MTU 956', 'MTU 1163'], category: 'Valve train', stockStatus: '常用大修件——标准等级有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5550100051', name: 'Nozzle Holder with Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system', stockStatus: '按喷油器零件号核查——新件与再制造件可选', replacementFor: ['5550100651', '5550102451'], hsCode: '8413.30' },
    { partNumber: '5552010005', name: 'Coolant Pump Shaft', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: '按泵型号报价', replacementFor: ['5562010105'], hsCode: '8413.30' },
    { partNumber: '5592010007', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: ['5592010307'], hsCode: '8413.30' },
    { partNumber: '8490740063', name: 'Flange', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: '按零件号报价', replacementFor: ['5841400344'], hsCode: '8419.50' },
    { partNumber: '5551800015', name: 'Pressure Limiting Valve', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system', stockStatus: '按件报价', replacementFor: [], hsCode: '8481.40' },
    { partNumber: '5550101251', name: 'Oil Spray Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5551800122', name: 'Oil Line', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication', stockStatus: '按零件号报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5582040406', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: '常用保养件——通常有库存', replacementFor: ['5802040806'], hsCode: '8413.30' },
    { partNumber: '5552030388', name: 'Slide Valve', series: ['MTU 956', 'MTU 1163'], category: 'Control components', stockStatus: '按件报价', replacementFor: [], hsCode: '8481.20' },

    // ── MTU 183 Parts ──
    { partNumber: '0031845201', name: 'Oil Filter Spin-On', series: [], category: 'Filters', stockStatus: '高频耗材——通常有库存', replacementFor: ['0031845301'], hsCode: '8421.23' },

    // ── Common O-Rings & Small Parts (MTU multi-series) ──
    { partNumber: '700429260000', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——可批量供货', replacementFor: ['0019972348', '0089977545'], hsCode: '8484.10' },
    { partNumber: '700429050003', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '8699970213', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '700429021000', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——可批量供货', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP51529700004', name: 'Rotary Seal', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP51529700005', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000180680', name: 'Gasket', series: ['MTU 396', 'MTU 4000'], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '007603016105', name: 'Copper Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000530826', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: '小件——常有库存', replacementFor: ['0000530126'], hsCode: '8409.91' },
    { partNumber: '0000530361', name: 'Valve Stem Seal', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '3669900240', name: 'Washer Valve Spring', series: ['MTU 396'], category: 'Valve train', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '8699970499', name: 'Radial-Lip Shaft Seal', series: [], category: 'Gaskets and seals', stockStatus: '按件报价', replacementFor: ['8699970497', '8699970498'], hsCode: '8484.10' },
    { partNumber: '0009953502', name: 'Clamp', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.19' },
    // ── Additional MTU 2000 Engine Components ──
    { partNumber: '5311550215', name: 'Belt Pulley for Generator', series: [], category: 'Drive components', stockStatus: '按发动机应用报价', replacementFor: [], hsCode: '8483.50' },
    { partNumber: '5360320014', name: 'Sleeve Wear Front Crankshaft', series: [], category: 'Engine components', stockStatus: '按发动机出厂编号报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5500160597', name: 'Clamp', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.19' },
    { partNumber: 'X00027830', name: 'Cylinder Liner Size 0 C23', series: ['MTU 4000'], category: 'Pistons and liners', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240530830', name: 'Valve Guide', series: [], category: 'Valve train', stockStatus: '按件或按组报价', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240382550', name: 'Bushing Conrod Size 0', series: [], category: 'Pistons and liners', stockStatus: '按尺寸等级报价', replacementFor: ['5240382650'], hsCode: '8409.99' },
    // ── Additional MTU 2000 Gaskets ──
    { partNumber: '4471870180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000160119', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420160420', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420150060', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420110059', name: 'Tombak Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5030210580', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5532031280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5541870180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5700150380', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5362030180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5502010280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5760550180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5760550280', name: 'Profile Gasket', series: [], category: 'Gaskets and seals', stockStatus: '按零件号报价', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5730110180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 2000 Additional Sensors/Electrical ──
    { partNumber: '0001536720', name: 'Speed Sensor', series: [], category: 'Sensors and electrical', stockStatus: '常用传感器——通常有库存', replacementFor: ['0005357333', '0005357833'], hsCode: '9032.89' },
    { partNumber: '5205304069', name: 'Speed Transmitter', series: [], category: 'Sensors and electrical', stockStatus: '按零件号报价', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '5255380580', name: 'Memory Module', series: [], category: 'Sensors and electrical', stockStatus: '按发动机出厂编号与 ECU 版本报价', replacementFor: [], hsCode: '9032.89' },
    // ── MTU 2000 Drive Components ──
    { partNumber: '5501800106', name: 'Idler Gear', series: [], category: 'Drive components', stockStatus: '按发动机变型报价', replacementFor: [], hsCode: '8483.40' },
    { partNumber: '5272010505', name: 'Shaft Water Pump', series: [], category: 'Drive components', stockStatus: '按泵型号报价', replacementFor: [], hsCode: '8483.10' },
    { partNumber: '5502040176', name: 'Plate Control Washer', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5502010276', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: '按件报价', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5760110062', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: '按件报价', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5360330262', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: '按件报价', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5802040072', name: 'Nut', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.16' },
    { partNumber: '5769900619', name: 'Stress Bolt', series: [], category: 'Drive components', stockStatus: '始终整组更换', replacementFor: ['5809900819'], hsCode: '7318.15' },
    { partNumber: '5249900605', name: 'Bolt Hex Cap', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.15' },
    // ── MTU 396 Additional Parts ──
    { partNumber: '5592001001/31', name: 'Coolant Pump', series: [], category: 'Cooling system', stockStatus: '按泵型号核查——新件与再制造件可选', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5100200212', name: 'Thrust Bearing', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: ['5090200512'], hsCode: '8483.30' },
    { partNumber: '5500706932', name: 'Leak Off Line', series: [], category: 'Fuel system', stockStatus: '按零件号报价', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5500110559', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材——通常有库存', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5550160071', name: 'Plug', series: [], category: 'Fasteners and retaining rings', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5590981585', name: 'Support Plate', series: [], category: 'Engine components', stockStatus: '按件报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5562030980', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0002036946', name: 'Cooler Plate', series: [], category: 'Cooling system', stockStatus: '按发动机型号报价', replacementFor: [], hsCode: '8419.50' },
    { partNumber: '23504304', name: 'Bearing', series: [], category: 'Bearings', stockStatus: '按尺寸等级报价', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '23523615', name: 'Clamp', series: [], category: 'Drive components', stockStatus: '小件——常有库存', replacementFor: [], hsCode: '7318.19' },
    { partNumber: '000625900175', name: 'Grooved Ball Bearing', series: [], category: 'Bearings', stockStatus: '按件报价', replacementFor: ['0059812225'], hsCode: '8482.10' },
    { partNumber: '0005330760', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: '常用保养件', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP52807300012', name: 'Thermocouple', series: [], category: 'Sensors and electrical', stockStatus: '按接头类型核查', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0009922130', name: 'Clamping Element', series: [], category: 'Drive components', stockStatus: '按件报价', replacementFor: [], hsCode: '7318.19' },
    { partNumber: '0020371319', name: 'Rectangular Ring', series: [], category: 'Pistons and liners', stockStatus: '按件报价', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080375619', name: 'Rectangular-Section Ring', series: [], category: 'Pistons and liners', stockStatus: '标准活塞环组件', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080370018', name: 'Oil Control Ring', series: [], category: 'Pistons and liners', stockStatus: '标准活塞环组件', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0002040479', name: 'Cup Seal', series: [], category: 'Gaskets and seals', stockStatus: '小型耗材', replacementFor: [], hsCode: '8484.10' },
  ] as const).map((p) => {
    const seed = p as CatalogPartSeed & { commonFailureScenarios?: string[]; orderingNotes?: string };
    const cat = categoryDefaults[seed.category] ?? categoryDefaults['Engine components'];
    const spec = publicPartSpecs[seed.partNumber] ?? {};
    const replacementFor = seed.replacementFor && seed.replacementFor.length > 0 ? [...seed.replacementFor] : [...(spec.replacementFor ?? [])];
    return {
      slug: `${slugifyPart(seed.partNumber)}-${slugifyPart(seed.name)}`,
      partNumber: seed.partNumber,
      name: seed.name,
      series: [...seed.series],
      category: seed.category,
      summary: cat.summary,
      description: cat.description,
      image: inferTextMatchedPartImage(seed),
      availability: '库存、替换状态、交货期与运输路线均在询价后确认。',
      stockStatus: seed.stockStatus ?? cat.stockStatus,
      applications: cat.applications,
      notes: [
        '订购前请确认发动机型号、出厂编号、所需数量与收货地。',
        '标识或替换状态不明确时，请发送旧件照片或铭牌信息。',
      ],
      replacementFor,
      weightKg: spec.weightKg ?? seed.weightKg ?? cat.weightKg,
      hsCode: spec.hsCode ?? seed.hsCode ?? cat.hsCode,
      commonFailureScenarios: seed.commonFailureScenarios ?? undefined,
      orderingNotes: seed.orderingNotes ?? undefined,
      applicableEngines: spec.applicableEngines ?? seed.applicableEngines ?? inferEngineType(seed.series),
      leadTime: spec.leadTime ?? seed.leadTime ?? inferLeadTime(seed.category),
      dimensions: spec.dimensions ?? seed.dimensions ?? '按零件号、旧件照片或目录图纸确认',
      engineType: spec.engineType ?? seed.engineType ?? inferEngineType(seed.series),
      natoNumber: spec.natoNumber ?? seed.natoNumber ?? 'N/A',
    } satisfies MtuPart;
  }),
  ...expandedMtuParts,
];

/** Deduplicate by partNumber+name slug — last occurrence wins (expanded > enriched > sitemap imports). */
const highValuePartNumbers = new Set<string>([
  '5240113410', '5240103420', '5240161580', '5240303917', '5240372525',
  '5240300215', '0120370618', '0120370819', '0080375819', '5240383710',
  '5240382711', '5240380471', '5240334901', '5240335602', '5240332730',
  '5240332630', '5240530301', '5240530305', '5240530152', '5240530120',
  '0000534335', '0000530926', '5240160069', '5240160153', '5240500930',
  '5110804420', '5110803201', '5110850060', 'EX52407500064', 'X57508300091',
  '5062000601', '5582040406', '5240980281', '5241840501', '0031845201',
  '0020922801', '5241420780', '5241870380', '5241880180', 'X52404200052',
  '5410160920', '5310160021', '5419970645', '5501871280', '5220980080',
  '5411420180', '5410530020', '5500530401', '5410500227', '5410540505',
  '5419900304', 'X53507500012', 'X53508200001', 'E0060704101', '5360900250',
  '5360702032', '5501801015', '0030176421', '0010175412', 'X00022524',
  '5502003201', '5502002002', '5502040906', '5502030060', '5501800016',
  '0010928801', '0030944304', '0180944502', '0170942502', '5360900001',
  '5500511710', '4420302240', '5700510150', '5500100061', '4221880001',
  '4231801101', '5361800515', '0005358233', '0035352531', '0005356430',
  '0005355103', '5205304531', '0045426917', '0001536132', '5205304131',
  '5310900337', '5120850560', '5361420025', '5610105420', '5500100330',
  '5500530232', '5592001001/31', '5100200212', '5500706932', '5500110559',
  '5550160071', '5590981585', '5562030980', '0002036946', '23504304',
  '23523615', '000625900175', '0005330760', 'XP52807300012', '0009922130',
  '0020371319', '0002040479', '5840111810', '5840300917', '5840300020-42',
  '5840300615', '5840371625', '5840530129', '5840900595', '5840900054',
  '5840700632-87', '5840782802', '5841400344', '5841800175', '5842040714',
  '5842032780', '5842040180', '5550105141', '5550161420', '5550302160',
  '5550307540', '5550530105', '5550100051', '5552010005', '5592010007',
  '8490740063', '5551800015', '5550101251', '5551800122', '5552030388',
  '700429260000', '700429050003', '8699970213', '700429021000', 'XP51529700004',
  'XP51529700005', '007603016105', '0000530826', '0000530361', '3669900240',
  '8699970499', '0009953502', '5311550215', '5360320014', '5500160597',
  'X00027830', '5240530830', '5240382550', '4471870180', '0000160119',
  '4420160420', '4420150060', '4420110059', '5030210580', '5532031280',
  '5541870180', '5700150380', '5362030180', '5502010280', '5760550180',
  '5760550280', '5730110180', '0001536720', '5205304069', '5255380580',
  '5501800106', '5272010505', '5502040176', '5502010276', '5760110062',
  '5360330262', '5802040072', '5769900619', '5249900605', '0031845301',
  '0020940204', '5240780824', '8495340000', '0005342732', '5840980257',
  '0080375619', '0080370018', '5090200512', '5090250141', '0000180680',
  'X54707700072', 'X00012160', 'X00011800', '0005357933', '0035352731',
  '0035351731', '0035352931', '0005355303', '5410100163', 'XP52229700007',
  'X00028154', '8699970497', 'X00E50201022', 'X00028031', '5320700246',
  '8699970498', '5240510110', 'X00016024', '5240336602', 'X52403100003',
  '5240336702', 'X00009806', '0090375019', '0120373618', 'X52404200037',
  'X52404100226', '5240530805', '5240530122', 'X52405400013', 'X52499100259',
  '5320530020', '4570530001', '0000530126', '0000533235', '0000533635',
  '0000911128', '0000925105', '0000943268', '0000981465', '0000981565',
  '0000982780', '0000983080', '0000983180', '0002000001', '0002017519',
  '0002030181', '0002032088', '0002033288', '0002041116', '0005351733',
  '0005357333', '0005357633', '0005357833', '0005358033', '0005358133',
  '0005358333', '0012040100', '0020921901', '0021882301', '0030947404',
  '0030948104', '0035352231', '0035364610', '0039978648', '0040175021',
  '0059812225', '0070372419', '007603014104', '007603033100', '0079977247',
]);

const highValueScenarios: Record<string, string[]> = {
  'Fuel system': [
    '燃油压力不稳定、喷油器均衡性差或发动机出现启动困难症状',
    '旧零件号已被替代，需确认正确的替换路线',
    '船队客户需要在计划保养前备妥经过核验的备件',
  ],
  'Filters': [
    '机油、燃油或空气滤清器保养周期已到，需要批量补充',
    '保养中发现滤清器压差超标、水分污染或压力下降',
    '混合滤清器清单需要在发货前逐项核对',
  ],
  'Sensors and electrical': [
    '报警历史指向转速、压力、温度或液位信号故障',
    '更换前必须匹配接头类型、信号量程或 ECU 版本',
    '船舶或发电机组急需电气备件以缩短停机时间',
  ],
  'Gaskets and seals': [
    '检查中发现机油、冷却液或排气泄漏',
    '发动机解体大修，一次性密封件必须更换',
    '下单前必须确认材料等级、厚度或密封位置',
  ],
  'Cooling system': [
    '冷却液温度偏高、海水流量不足或水泵可见磨损',
    '计划保养需要水泵、叶轮、法兰或冷却器零件',
    '船用与发电安装需要正确的冷却系统变型',
  ],
  'Pistons and liners': [
    '反馈压缩损失、缸套磨损拉伤或机油消耗偏高',
    '尺寸等级必须与发动机大修规格一致',
    '大修清单需要活塞、活塞环、缸套与轴承参考号配套',
  ],
  'Bearings': [
    '曲轴、连杆、凸轮轴或推力轴承间隙超出使用极限',
    '报价前必须核查标准或尺寸等级选择',
    '大修零件正以配套组方式采购',
  ],
  'Valve train': [
    '发现压缩损失、气门座磨损或排气温度异常',
    '缸盖大修需要配套的气门、导管、弹簧与锁夹',
    '发货前必须确认安装位置与发动机系列',
  ],
  'Turbocharging': [
    '增压压力、排气温度或增压器振动超出正常范围',
    '叶轮、密封、轴承或壳体兼容性须对照增压器型号核查',
    '正在评估再制造或替换增压器路线以应对紧急停机',
  ],
  'Lubrication': [
    '机油压力、油温或润滑系统污染需要保养',
    '油泵、冷却器、喷嘴或分离器参考号须按发动机型号核验',
    '大修客户需要润滑件与主件清单一并报价',
  ],
  'Drive components': [
    '装配过程中更换螺栓、卡箍、垫圈、联轴器或小型紧固件',
    '一次性紧固件需按装配位置确认',
    '服务团队需要小型件随大修主件一同发货',
  ],
  'Engine components': [
    '该零件属于计划大修或紧急停机维修',
    '旧号、发动机出厂编号与安装位置需要交叉核对',
    '采购方需要在安排国际运输前获得经过核验的替换选项',
  ],
};

const highValueQuoteChecklist = (part: MtuPart, seriesText: string) => [
  `准确零件号：${part.partNumber}`,
  `零件名称或装配位置：${zhPartName(part.name)}`,
  `发动机型号 / 系列：${seriesText}`,
  '铭牌上的发动机出厂编号',
  '旧件照片（显示零件号、接头、接口或尺寸标识）',
  '所需数量以及是否接受分批发货',
  '目的国、交货期限与期望的运输方式',
];

const highValueFaqs = (part: MtuPart, seriesText: string, scenarios: string[]) => {
  const replacementText = part.replacementFor && part.replacementFor.length > 0
    ? `${part.partNumber} 可能与 ${part.replacementFor.join('、')} 相关。最终替换状态在报价前对照发动机出厂编号核定。`
    : `${part.partNumber} 在报价前进行替代关系核查。如存在更新型号或再制造路线，我们将结合发动机出厂编号与旧件照片予以确认。`;

  return [
    {
      question: `${part.partNumber} 适用于 ${seriesText} 吗？`,
      answer: `${part.partNumber}（${zhPartName(part.name)}）已对照 ${seriesText} 核验。最终适配性取决于发动机出厂编号、功率标定与安装位置。`,
    },
    {
      question: `报价 ${part.partNumber} 需要提供哪些信息？`,
      answer: `请提供零件号、发动机型号、出厂编号、旧件照片、数量、目的国与要求交期。据此我们确认库存路线、包装与运输方案。`,
    },
    {
      question: `能否核查 ${part.partNumber} 的替代件或被替代号？`,
      answer: replacementText,
    },
    {
      question: `${part.partNumber} 通常在什么情况下需要更换？`,
      answer: scenarios.join('；') + '。',
    },
  ];
};

const inferHighValueApplication = (part: MtuPart): string => {
  const hasSpecificEngineType = part.engineType && !/^按发动机出厂编号核验$/.test(part.engineType);
  const hasSpecificApplicableEngines = part.applicableEngines && !/^按发动机出厂编号核验$/.test(part.applicableEngines);

  if (part.series.length > 0) return part.series.join(', ');
  if (hasSpecificEngineType) return zhEngineType(part.engineType!);
  if (hasSpecificApplicableEngines) return part.applicableEngines!;
  return '经发动机出厂编号核验的 MTU 应用';
};

const inferNameSpecificScenarios = (part: MtuPart, fallback: string[]) => {
  const name = part.name.toLowerCase();

  if (name.includes('filter') || name.includes('strainer')) {
    return [
      '计划保养周期已到，滤清器清单需逐项确认',
      '压差、污染或压力下降报警提示需要更换滤清器',
      '船队客户需要同一滤清器参考号配套包装，用于重复性保养作业',
    ];
  }
  if (name.includes('sensor') || name.includes('monitor') || name.includes('tachometer') || name.includes('actuator') || name.includes('solenoid')) {
    return [
      'ECU 报警、信号读数不稳或间歇性停机需要电气诊断',
      '接头、电压、信号量程与安装位置必须与旧件一致',
      '急需更换以恢复发动机监测或控制功能',
    ];
  }
  if (name.includes('gasket') || name.includes('seal') || name.includes('o ring') || name.includes('o-ring') || name.includes('ring sealing')) {
    return [
      '检查中发现机油、冷却液、空气或排气泄漏',
      '发动机解体大修，一次性密封件必须更换',
      '材料、截面形状与密封位置需对照旧件或目录图纸确认',
    ];
  }
  if (name.includes('bearing')) {
    return [
      '大修中发现轴承间隙、表面拉伤或曲轴/凸轮轴异常磨损',
      '发货前必须确认标准或尺寸等级选择',
      '客户需要同一大修包配套的轴承参考号',
    ];
  }
  if (name.includes('valve') || name.includes('nozzle') || name.includes('injector')) {
    return [
      '燃烧质量、燃油供给、压缩或排气温度超出正常范围',
      '更换前必须核查安装位置与配套配合件',
      '大修客户需要在发货前获得经过核验的气门、喷嘴、喷油器或泵参考号',
    ];
  }
  if (name.includes('pump') || name.includes('impeller') || name.includes('cooler')) {
    return [
      '冷却液、海水、燃油或机油流量不足，或温度高于正常范围',
      '法兰、接口、驱动与安装变型必须与现有总成匹配',
      '计划中的船用或发电保养需要经过核验的替换路线',
    ];
  }
  if (name.includes('ring') || name.includes('liner') || name.includes('piston')) {
    return [
      '反馈压缩损失、缸套拉伤、下窜气偏高或机油消耗异常',
      '必须按大修范围确认尺寸等级与配套缸内零件',
      '大修清单需要活塞、活塞环、缸套与轴承参考号一并核查',
    ];
  }

  return fallback;
};

const enrichHighValuePart = (part: MtuPart): MtuPart => {
  if (!highValuePartNumbers.has(part.partNumber)) return part;

  const seriesText = inferHighValueApplication(part);
  const scenarios = inferNameSpecificScenarios(part, highValueScenarios[part.category] ?? highValueScenarios['Engine components']);
  const hasSpecificApplicableEngines = part.applicableEngines && !/^按发动机出厂编号核验$/.test(part.applicableEngines);
  const applicationText = hasSpecificApplicableEngines
    ? part.applicableEngines!
    : `${seriesText}；最终适配性经发动机出厂编号与零件目录位置确认。`;

  // 第二句按真实数据变化（类目 + NATO + 替代号数量），避免 700+ 页共享同一字节级句子
  const natoRef = part.natoNumber && !/^n\/a$/i.test(part.natoNumber.trim()) ? part.natoNumber.trim() : '';
  const recordBits: string[] = [];
  if (natoRef) recordBits.push(`NATO ${natoRef}`);
  if (part.replacementFor && part.replacementFor.length > 0) {
    recordBits.push(`追溯 ${part.replacementFor.length} 个被替代参考号`);
  }
  const recordText = recordBits.length > 0 ? ` 档案记录：${recordBits.join('；')}。` : '';

  return {
    ...part,
    summary: part.hasCatalogDetails ? part.summary : `${part.partNumber} ${zhPartName(part.name)}。报价前请提供零件号与发动机出厂编号进行核验。${recordText}`,
    description: part.description,
    commonFailureScenarios: part.commonFailureScenarios ?? scenarios,
    orderingNotes: part.orderingNotes ?? `订购 ${part.partNumber} 请提供发动机型号、出厂编号、数量、旧件照片与目的国。报价前我们将确认该件为原厂配套（OEM）、原厂配套替代件、再制造件还是已被替代。`,
    applicableEngines: applicationText,
    leadTime: part.leadTime ?? '优先核查库存；按询价报最快的原厂配套、原厂配套替代或再制造路线',
    quoteChecklist: part.quoteChecklist ?? highValueQuoteChecklist(part, seriesText),
    faqs: part.faqs ?? highValueFaqs(part, seriesText, part.commonFailureScenarios ?? scenarios),
    imageAlt: part.imageAlt ?? `${part.partNumber} ${zhPartName(part.name)}——MTU ${zhCategoryName(part.category)}目录参考`,
    notes: Array.from(new Set([
      ...part.notes,
      '优先项：报价前核验零件号、替代关系与出口包装细节。',
    ])),
  };
};

const readableName = sentencePartName;

const seriesPhrase = (series: string[]) =>
  series.length === 0 ? 'MTU' : series.length === 1 ? series[0] : `${series.slice(0, -1).join(', ')} and ${series[series.length - 1]}`;

const catalogImageAlt = (part: MtuPart, series: string[]) =>
  `${zhPartName(part.name)}（${standardPartName(part.name)}）${part.partNumber}——适用于 ${seriesPhrase(series)} 发动机`;

/** Built from catalog facts so part pages never reuse third-party description text. */
const catalogDescription = (
  part: MtuPart,
  detail: { sourceDescription: string; weightKg: string; dimensions: string },
  series: string[],
  crossReferences: NonNullable<MtuPart['crossReferences']>,
) => {
  const name = readableName(part.name);
  const model = detail.sourceDescription.match(/^MTU\s+(\d{1,2}V\s+\d{3,4}\s+[A-Z]{1,2}\d{2}[A-Z]?)\b/i)?.[1];
  const assembly = detail.sourceDescription.match(/original\s+(.+?)\s+parts\s+\S/i)?.[1];
  const sentences: string[] = [];

  const where = model ? `MTU ${model.toUpperCase()}` : `${seriesPhrase(series)} 系列发动机`;
  sentences.push(
    assembly
      ? `${part.partNumber} 是${where}的${readableName(assembly)}组${zhPartName(part.name)}（${name}）。`
      : `${part.partNumber} 是为${where}目录收录的${zhPartName(part.name)}（${name}）。`,
  );

  const replaces = crossReferences.filter((ref) => ref.relationship === 'replaces').map((ref) => ref.partNumber);
  const replacedBy = crossReferences.filter((ref) => ref.relationship === 'replaced-by').map((ref) => ref.partNumber);
  if (replaces.length > 0) {
    sentences.push(`它是 ${replaces.slice(0, 4).join('、')}${replaces.length > 4 ? ` 等另外 ${replaces.length - 4} 个更早参考号` : ''} 的后续号，清单中引用${replaces.length === 1 ? '该号' : '这些号'}的通常以 ${part.partNumber} 供货。`);
  }
  if (replacedBy.length > 0) {
    sentences.push(`目录沿革记载 ${replacedBy[0]} 为其后续号；我们会核查该后续件能否单独装配，还是需要同时更换相关零件。`);
  }

  const weight = detail.weightKg.trim();
  if (weight && !/^n\/a$/i.test(weight)) {
    sentences.push(`目录单件重量为 ${weight.toLowerCase()}，我们据此在报价前估算运费。`);
  }
  return sentences.join(' ');
};

const applyCatalogDetails = (part: MtuPart): MtuPart => {
  const detail = catalogPartDetailsBySlug[part.slug] ?? catalogPartDetailsByPartNumber[part.partNumber.toUpperCase()];
  if (!detail) return part;

  const usable = (value: string) => value.trim() && !/^n\/a$/i.test(value.trim()) ? value.trim() : undefined;
  const isReference = (value: string) => /\d/.test(value) && /^[a-z0-9][a-z0-9 /._-]*$/i.test(value)
    && !/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(value) && value.toUpperCase() !== part.partNumber.toUpperCase();
  const replacementFor = Array.from(new Set(detail.replacementFor.filter(isReference)));
  const oldMatch = detail.sourceDescription.match(/OLD P\/N:\s*(.*?)\s*[,.;]?\s*NEW P\/N:/i);
  const newMatch = detail.sourceDescription.match(/NEW P\/N:\s*([a-z0-9/._-]+)/i);
  const earlier = (oldMatch?.[1] ?? '').split(',').map((number) => number.trim()).filter(isReference);
  const later = newMatch?.[1].replace(/[.,;]+$/, '');
  const crossReferences: NonNullable<MtuPart['crossReferences']> = replacementFor.map((number) => ({
    partNumber: number,
    relationship: later?.toUpperCase() === part.partNumber.toUpperCase() && earlier.includes(number) ? 'replaces'
      : later?.toUpperCase() === number.toUpperCase() && oldMatch?.[1].split(',').some((old) => old.trim().toUpperCase() === part.partNumber.toUpperCase()) ? 'replaced-by' : 'reference',
  }));
  const series = detail.series.flatMap((label) => {
    const combined = label.match(/^MTU\s+(\d+(?:\/\d+)+)$/i);
    return combined ? combined[1].split('/').map((number) => `MTU ${number}`) : [label];
  });
  const uniqueSeries = [...new Set(series)];

  return {
    ...part,
    image: detail.image || part.image,
    imageAlt: catalogImageAlt(part, uniqueSeries),
    hasCatalogDetails: true,
    series: uniqueSeries,
    summary: `${part.partNumber} ${zhPartName(part.name)}。收录于 ${uniqueSeries.map((s) => zhSeriesLabel(s)).join('、') || 'MTU'} 目录参考；订购前请确认安装位置与当前供货情况。`,
    description: catalogDescription(part, detail, uniqueSeries, crossReferences),
    engineType: usable(detail.engineType),
    applicableEngines: usable(detail.applicableEngines),
    dimensions: usable(detail.dimensions),
    weightKg: usable(detail.weightKg),
    hsCode: usable(detail.hsCode),
    natoNumber: usable(detail.natoNumber),
    replacementFor,
    crossReferences,
  };
};

const dedupedParts = new Map<string, MtuPart>();
for (const part of mtuPartsRaw) {
  const key = `${slugifyPart(part.partNumber)}-${slugifyPart(part.name)}`;
  dedupedParts.set(key, enrichHighValuePart(applyCatalogDetails(part)));
}

// ── Collapse naming variants of the same part number ─────────────────────────
// The catalogue is assembled from several imports, so one real part can arrive
// more than once under different transcription conventions ("Nozzle Holder
// W/Nozzle" vs "Nozzle Holder with Nozzle", "Sleeve WEAR Front CR SHF" vs
// "Sleeve Wear Front Crankshaft"). A part number identifies exactly one
// product, so every record sharing a part number is merged into a single
// canonical page and the remaining URLs are 301-redirected onto it through
// `mtuPartSlugRedirects`.
//
// The ranker below never rewrites a name into a different word — it only
// prefers a fully expanded spelling over the abbreviated transcription of the
// same words. Sibling variants that differ by a real descriptor (for example
// "Crankshaft Bearing Aux PTO End" vs "... Free End") are still merged, because
// one number is one product, but every discarded label is preserved in the
// page notes so the merge stays auditable by hand.
const ABBREVIATED_NAME_PATTERN =
  /(\bw\/|\bf\/|\bshft\b|\bsprng\b|\brectanglr\b|\bcomp\b|\basm\b|\bsect\b|\bsenso\b|\bwat\b|\bpress\b|\bcr shf\b)/;

const partNameRank = (name: string): number => {
  const lower = name.toLowerCase();
  const wordCount = lower.split(/[^a-z0-9]+/).filter(Boolean).length;
  return (ABBREVIATED_NAME_PATTERN.test(lower) ? 0 : 100) + wordCount * 10 + name.length;
};

const partNumberKey = (value: string) => value.trim().toUpperCase();

const isFilled = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

const firstFilled = <T>(values: Array<T | undefined>): T | undefined => values.find(isFilled);

const mergePartVariants = (variants: MtuPart[]): MtuPart => {
  const [primary, ...rest] = variants;
  const all = [primary, ...rest];
  const merged: MtuPart = { ...primary };

  merged.series = Array.from(new Set(all.flatMap((part) => part.series)));
  merged.applications = Array.from(new Set(all.flatMap((part) => part.applications)));
  merged.notes = Array.from(new Set([
    ...all.flatMap((part) => part.notes),
    ...(rest.length > 0 ? [`另收录为：${rest.map((part) => part.name).join('；')}。`] : []),
  ]));

  const replacementFor = Array.from(new Set(all.flatMap((part) => part.replacementFor ?? [])));
  if (replacementFor.length > 0) merged.replacementFor = replacementFor;

  const bestImage = all.find((part) => isRealPartImage(part.image));
  if (bestImage) merged.image = bestImage.image;

  // Variants are ranked best-first, so the first filled value is the richest one.
  const isGeneratedCatalogText = (value: string) => value.startsWith(`${primary.partNumber} 是`);
  const description = all
    .map((part) => part.description?.trim())
    .filter((value): value is string => Boolean(value))
    .filter((value, index, list) => list.indexOf(value) === index)
    .filter((value, index, list) => !isGeneratedCatalogText(value) || list.findIndex(isGeneratedCatalogText) === index)
    .join(' ')
    .trim();

  const scalarFields: Array<[keyof MtuPart, unknown]> = [
    ['imageAlt', firstFilled(all.map((part) => part.imageAlt))],
    ['summary', firstFilled(all.map((part) => part.summary))],
    ['stockStatus', firstFilled(all.map((part) => part.stockStatus))],
    ['engineType', firstFilled(all.map((part) => part.engineType))],
    ['applicableEngines', firstFilled(all.map((part) => part.applicableEngines))],
    ['dimensions', firstFilled(all.map((part) => part.dimensions))],
    ['weightKg', firstFilled(all.map((part) => part.weightKg))],
    ['hsCode', firstFilled(all.map((part) => part.hsCode))],
    ['natoNumber', firstFilled(all.map((part) => part.natoNumber))],
    ['leadTime', firstFilled(all.map((part) => part.leadTime))],
    ['orderingNotes', firstFilled(all.map((part) => part.orderingNotes))],
    ['commonFailureScenarios', firstFilled(all.map((part) => part.commonFailureScenarios))],
    ['quoteChecklist', firstFilled(all.map((part) => part.quoteChecklist))],
    ['faqs', firstFilled(all.map((part) => part.faqs))],
  ];

  if (description) merged.description = description;
  for (const [field, value] of scalarFields) {
    if (value === undefined) continue;
    // Field names are fixed above, so this assignment is type-safe in practice.
    (merged as Record<string, unknown>)[field as string] = value;
  }

  return merged;
};

const variantGroups = new Map<string, MtuPart[]>();
for (const part of dedupedParts.values()) {
  const key = partNumberKey(part.partNumber);
  const group = variantGroups.get(key);
  if (group) group.push(part);
  else variantGroups.set(key, [part]);
}

const variantSlugRedirects: Record<string, string> = {};
const winnerByPartNumber = new Map<string, MtuPart>();

for (const [key, group] of variantGroups) {
  const ranked = [...group].sort(
    (a, b) =>
      partNameRank(b.name) - partNameRank(a.name) ||
      a.name.localeCompare(b.name) ||
      a.slug.localeCompare(b.slug),
  );
  const winner = mergePartVariants(ranked);
  winnerByPartNumber.set(key, winner);

  for (const variant of ranked) {
    if (variant.slug !== winner.slug) variantSlugRedirects[variant.slug] = winner.slug;
  }
}

/** Superseded part-page slugs → the canonical slug they must redirect to. */
export const mtuPartSlugRedirects: Record<string, string> = variantSlugRedirects;

const canonicalParts: MtuPart[] = [];
const emittedSlugs = new Set<string>();
for (const part of dedupedParts.values()) {
  const winner = winnerByPartNumber.get(partNumberKey(part.partNumber));
  if (!winner || emittedSlugs.has(winner.slug)) continue;
  emittedSlugs.add(winner.slug);
  canonicalParts.push(winner);
}

const replaceAll = (text: string, from: string, to: string) => (from === to ? text : text.split(from).join(to));

/** Display names are normalised last so slugs, dedupe keys, and variant ranking keep using the raw names. */
const applyStandardName = (part: MtuPart): MtuPart => {
  const name = standardPartName(part.name);
  const swap = (text: string) => replaceAll(text, part.name, name);
  const swapOptional = (text?: string) => (text === undefined ? text : swap(text));
  return {
    ...part,
    name,
    summary: swap(part.summary),
    description: swapOptional(part.description),
    imageAlt: swapOptional(part.imageAlt),
    orderingNotes: swapOptional(part.orderingNotes),
    notes: part.notes.flatMap((note) => {
      if (!note.startsWith('另收录为：')) return [swap(note)];
      const variants = [...new Set(note.slice(5, -1).split('；').map(standardPartName))].filter((variant) => variant !== name);
      return variants.length > 0 ? [`另收录为：${variants.join('；')}。`] : [];
    }),
    quoteChecklist: part.quoteChecklist?.map(swap),
    commonFailureScenarios: part.commonFailureScenarios?.map(swap),
    faqs: part.faqs?.map((faq) => ({ question: swap(faq.question), answer: swap(faq.answer) })),
  };
};

export const mtuPartsDeduped: MtuPart[] = canonicalParts.map(applySearchPartContent).map(applyStandardName);
export const mtuParts: MtuPart[] = mtuPartsDeduped;
export const mtuPartCategories = Array.from(new Set(mtuPartsDeduped.map((part) => part.category))).sort();
export const mtuPartSeries = Array.from(new Set(mtuPartsDeduped.flatMap((part) => part.series))).sort();

const genericPartDescriptions = new Set(
  Object.values(categoryDefaults).map((category) => category.description),
);

/**
 * Hand-verified, assembly-level part numbers.
 *
 * These are complete assemblies and sub-assemblies (cylinder head, piston,
 * bearings, valves, fuel pumps) whose numbers are confirmed against the MTU
 * catalogue and whose pages carry a real part number, a real name, engine
 * applicability, HS code and supersession data — but no part-specific
 * photograph and no bespoke description. Without a bespoke description they
 * used to land one point short of the index threshold, which was an artefact
 * of the score rather than a statement about the page.
 *
 * Keep this list short, and verify each number in the MTU parts catalogue
 * before adding it: an entry here is a deliberate decision to index the page.
 */
const verifiedAssemblyParts = new Set([
  '000625900175', // deep-groove ball bearing
  '5100200212', // thrust bearing
  '5240103420', // cylinder head assembly
  '5240160069', // cylinder head bolt
  '5240303917', // piston assembly
  '5240335602', // crankshaft bearing, lower
  '5240382711', // conrod bearing, lower half
  '5240500930', // push rod
  '5240530152', // inner valve spring
  '5240530305', // exhaust valve
  '5410530020', // valve spring
  '5419970645', // sealing ring
  'E0060704101', // high-pressure pump
  'X53508200001', // low-pressure fuel pump
]);

/**
 * Keep thin, template-only part records out of the index until they have
 * enough part-specific evidence to answer a buyer's query.
 *
 * NOTE: weightKg and dimensions are deliberately NOT scored. The estimated
 * values were stripped from this dataset on 2026-10-10 precisely because they
 * could not be stood behind, and scoring them meant a part could clear the
 * threshold by publishing numbers we had decided not to publish. Measured
 * effect of removing them: 0 pages lost, because every part that clears the
 * bar today does so on a real image or a part-specific description.
 */
export function isPartPageIndexable(part: MtuPart): boolean {
  const hasSpecificDescription =
    Boolean(part.description?.trim()) && !genericPartDescriptions.has(part.description!.trim());
  const hasSpecificEngine =
    Boolean(part.engineType?.trim()) && !/^按发动机出厂编号核验$/.test(part.engineType!);
  const hasSpecificFitment =
    Boolean(part.applicableEngines?.trim()) &&
    !/^按发动机出厂编号核验$/.test(part.applicableEngines!);
  const hasSpecificHsCode =
    Boolean(part.hsCode?.trim()) && !/varies|confirm|quoted|n\/a/i.test(part.hsCode!);
  const hasCrossReferences = Boolean(part.replacementFor?.length);
  const isVerifiedAssembly = verifiedAssemblyParts.has(String(part.partNumber ?? '').toUpperCase());

  const evidenceScore =
    (isRealPartImage(part.image) ? 2 : 0) +
    (hasSpecificDescription ? 2 : 0) +
    (hasSpecificEngine ? 1 : 0) +
    (hasSpecificFitment ? 1 : 0) +
    (hasSpecificHsCode ? 1 : 0) +
    (hasCrossReferences ? 1 : 0) +
    (isVerifiedAssembly ? 1 : 0);

  return evidenceScore >= 4;
}

export function getMtuPart(slug: string) {
  return mtuPartsDeduped.find((part) => part.slug === slug);
}

/** Same engine series — scored by how many series overlap. */
export function getSameSeriesParts(part: MtuPart, limit = 6) {
  if (part.series.length === 0) return [];
  return mtuPartsDeduped
    .filter((c) => c.slug !== part.slug && c.series.some((s) => part.series.includes(s)))
    .sort((a, b) => {
      const aOverlap = a.series.filter((s) => part.series.includes(s)).length;
      const bOverlap = b.series.filter((s) => part.series.includes(s)).length;
      return bOverlap - aOverlap || a.partNumber.localeCompare(b.partNumber);
    })
    .slice(0, limit);
}

/** Same system (category) — different series, same functional group. */
export function getSameCategoryParts(part: MtuPart, limit = 6) {
  return mtuPartsDeduped
    .filter((c) => c.slug !== part.slug && c.category === part.category && !c.series.some((s) => part.series.includes(s)))
    .slice(0, limit);
}

/** Other service categories in the same engine series; not order-history data. */
export function getSameSeriesServiceParts(part: MtuPart, limit = 4): MtuPart[] {
  if (part.series.length === 0) return [];
  const pairs: Record<string, string[]> = {
    'Pistons and liners': ['Gaskets and seals', 'Bearings', 'Lubrication'],
    'Valve train': ['Gaskets and seals', 'Pistons and liners', 'Turbocharging'],
    'Bearings': ['Pistons and liners', 'Lubrication', 'Gaskets and seals'],
    'Turbocharging': ['Gaskets and seals', 'Lubrication', 'Air and intake'],
    'Fuel system': ['Filters', 'Gaskets and seals', 'Sensors and electrical'],
    'Filters': ['Fuel system', 'Lubrication', 'Cooling system'],
    'Cooling system': ['Filters', 'Gaskets and seals', 'Lubrication'],
    'Lubrication': ['Filters', 'Cooling system', 'Bearings'],
    'Sensors and electrical': ['Fuel system', 'Control components', 'Engine components'],
    'Gaskets and seals': ['Pistons and liners', 'Valve train', 'Cooling system'],
  };
  const pairedCategories = pairs[part.category] ?? ['Gaskets and seals', 'Filters'];
  return mtuPartsDeduped
    .filter((c) => c.slug !== part.slug && pairedCategories.includes(c.category) && c.series.some((series) => part.series.includes(series)))
    .sort((a, b) => a.partNumber.localeCompare(b.partNumber))
    .slice(0, limit);
}

export function getRelatedMtuParts(part: MtuPart, limit = 4) {
  return mtuPartsDeduped
    .filter((candidate) => candidate.slug !== part.slug)
    .map((candidate) => ({
      part: candidate,
      score:
        (candidate.category === part.category ? 2 : 0) +
        candidate.series.filter((series) => part.series.includes(series)).length,
    }))
    .sort((a, b) => b.score - a.score || a.part.partNumber.localeCompare(b.part.partNumber))
    .slice(0, limit)
    .map(({ part }) => part);
}

// ═══════════════════════════════════════
// CATALOG HUB PAGES
// ═══════════════════════════════════════

export interface MtuCatalogHub {
  slug: string;
  title: string;
  h1Title: string;
  summary: string;
  description: string;
  longDescription?: string;
  searchTopics?: Array<{
    title: string;
    description: string;
    href?: string;
  }>;
  type: 'series' | 'category';
  /** Filter function to select parts for this hub */
  partFilter: (part: MtuPart) => boolean;
}

const manualMtuCatalogHubs: MtuCatalogHub[] = [
  // ── Series Hubs ──
  {
    slug: 'mtu-2000-series',
    title: 'MTU 2000 系列零件目录',
    h1Title: 'MTU 2000 系列发动机零件',
    summary: 'MTU 2000 系列柴油发动机完整零件目录——适用于船用、工业、发电与轨交应用。',
    description: '按类别浏览 MTU 2000 系列零件：活塞、缸套、轴承、气门、垫片、燃油系统、冷却系统、涡轮增压、传感器与滤清器。每件零件在报价前均按零件号与发动机出厂编号核验。',
    searchTopics: [
      {
        title: 'MTU 16V 2000 发动机零件',
        description: '为 16V 2000 船用、发电、轨交与工业发动机提供零件支持，按完整型号与出厂编号核验。',
        href: '/products/mtu-2000-series-parts/16v-2000-engine-parts/',
      },
      {
        title: 'MTU 16V 2000 M96L 发动机零件',
        description: '船用推进与游艇发动机零件，按完整的 M96L 序列号与部件编号核验。',
        href: '/products/mtu-2000-series-parts/mtu-m96l-engine-parts/',
      },
      {
        title: 'MTU 2000 船用发动机零件',
        description: '适用于推进、辅助动力与船载发电机组的保养件与大修件。',
        href: '/products/mtu-2000-series-parts/marine-generator-service-parts/',
      },
    ],
    longDescription: `MTU 2000 系列是全球装用范围最广的柴油发动机系列之一，从快速渡轮、海军舰艇到发电机组与机车均有采用。该系列提供 8V、12V、16V 与 18V 构型，覆盖多个功率等级（M84、M91、M93、M94、M96）；各机型共享通用的零件架构，使维护计划具有可预期性——但在零件急需时，也对供货响应提出更高要求。

    目录清单标明零件号与部件族，但并不能确定其适用于每一台发动机的构型。核对所供替换件，需要完整的型号、出厂编号与安装位置。公开目录编号应与经确认的实测数据和当前供货信息区分开来。

    目录编号包括缸垫、燃油喷油器、保养滤清器、传感器与密封件。库存、尺寸、供货状态与交货期均在报价中按确切编号确认，而非仅凭系列名称推断。

    无论您在船厂、电厂还是铁路机务段维护 MTU 2000 发动机机群，都欢迎将零件清单与发动机出厂编号发送给我们。我们逐项核对供货情况，并报出自上海发往目的地的可行运输方案。`,
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('2000')),
  },
  {
    slug: 'mtu-4000-series',
    title: 'MTU 4000 系列零件目录',
    h1Title: 'MTU 4000 系列发动机零件',
    summary: 'MTU 4000 系列柴油发动机完整零件目录——适用于船用推进、发电、机车与重型设备。',
    description: '按类别浏览 MTU 4000 系列零件：气缸套、活塞、气缸盖、轴承、气门、垫片、燃油喷射、冷却水泵、涡轮增压器、传感器与滤清器。可提供原厂配套（OEM）与原厂配套替代件选项。',
    searchTopics: [
      {
        title: 'MTU 12V 4000 发动机零件',
        description: '燃油、冷却、滤清、传感器、涡轮增压器与大修零件，按确切的 12V 4000 变型核验。',
        href: '/products/mtu-4000-series-parts/12v-4000-engine-parts/',
      },
      {
        title: 'MTU 16V 4000 发动机零件',
        description: '为 16V 4000 船用、机车、发电与重型工业应用提供零件支持。',
        href: '/products/mtu-4000-series-parts/16v-4000-engine-parts/',
      },
      {
        title: 'MTU 4000 大修零件',
        description: '按尺寸分级的内部零部件与整合后的大修清单，逐项核验。',
        href: '/products/mtu-4000-series-parts/overhaul-parts/',
      },
    ],
    longDescription: `MTU 4000 系列位居 MTU 高速柴油发动机系列的顶端，12V、16V 与 20V 构型的功率输出自 1,500 kW 至 4,300 kW 以上。这些发动机见于全球要求最严苛的应用场景：高速海军舰艇、超级游艇、海洋工程供应船、任务关键型数据中心发电机组与重载机车。

    气缸套、活塞与轴承需按尺寸等级与安装状态核对。目录编号只是识别的起点，并不能证明与每一台 MTU 4000 构型兼容。报价应写明所供的确切编号与状态，包括任何替代或换货条款。

    就喷油器、泵与控制元件询价时，请保留含前、后缀的完整编号。进行大修时，请分别标明每个部件及其尺寸等级。供货情况与发货货期取决于所供货物，并随报价一并确认。

    进行大型大修时，我们建议提交附发动机出厂编号的完整零件清单。我们会逐项核验、标出任何已被替代的零件号，并根据紧急程度与零件尺寸，报出自上海发出的快递、空运或海运方案。`,
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('4000')),
  },
  {
    slug: 'mtu-396-series',
    title: 'MTU 396 系列零件目录',
    h1Title: 'MTU 396 系列发动机零件',
    summary: '老款 MTU 396 系列发动机零件目录——适用于船用、工业与发电应用。',
    description: '浏览 MTU 396 系列零件，包括气缸套、活塞、轴承、气门、垫片、燃油系统、冷却与涡轮增压器部件。支持老款及已被替代的零件号。',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('396')),
    longDescription: `提交 MTU 396 零件询价时，请保留铭牌所示的完整型号名称与出厂编号。老款装机可能已更换过部件，因此请一并提供所装件上的编号，以及任何旧发票或旧零件清单上的编号。

    由于 396 系列现已属老款平台，原厂配套（OEM）渠道的供货情况可能不稳定。这正是我们核验流程的价值所在：我们按您的发动机出厂编号核对每个零件号，确认是否适用已被替代的编号，并就原厂配套（OEM）、原厂配套替代件、再制造件或替代件选项报价，同时给出明确的交货期。MTU 396 系列的常见询价包括气缸套（5320110110）、气门室盖（5320100130）、排气门（5410500227）、进气门（4570530001）、气门弹簧（5320530020）、主轴承与推力轴承、机油泵（5321800001）、机油分离器（5410100163）以及涡轮增压器涡轮（5110800220/5110804420）。

    进行大型大修时，我们建议提交按发动机出厂编号整理的完整零件清单。老款发动机常有影响零件号兼容性的运行变更——我们的核验步骤会在发货前将这些问题逐一识别。`,
  },
  {
    slug: 'mtu-595-series',
    title: 'MTU 595 系列零件目录',
    h1Title: 'MTU 595 系列发动机零件',
    summary: 'MTU 595 系列发动机零件目录——重型船用与工业动力装置。',
    description: '浏览 MTU 595 系列零件：气缸套、活塞、连杆、垫片、燃油管路、电磁阀、冷却水泵与涡轮增压器部件。',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('595')),
    longDescription: `MTU 595 系列是面向最严苛船用与工业应用的重型、高输出柴油发动机平台。其缸径超过 200 mm，单缸功率输出使其稳居中速发动机范畴；595 系列见于海军作战舰艇、大型海洋工程供应船与基荷电站——在这些场合，可靠性没有妥协余地。

    595 系列的零件体现了其重型工程传承：重量超过 50 kg 的气缸套，活塞顶与活塞裙分离式活塞（活塞顶 5840371625、活塞裙 5840300615），按极高气缸压力设计的连杆，以及在高喷射压力下工作、配高压（HP）燃油管路（5840700632-87）与电磁阀（5840900595、5840980257）的燃油系统。每个部件均按尺寸分级，并与出厂编号一一对应。

    由于 595 系列发动机常用于连续运转工况，零件的可追溯性与单证要求可能十分严格。我们支持按发动机出厂编号核验零件号，提供 HS 编码与大致重量以便规划运输，并可在需要时随报价提供材质证书。`,
  },
  {
    slug: 'mtu-956-series',
    title: 'MTU 956 系列零件目录',
    h1Title: 'MTU 956 系列发动机零件',
    summary: 'MTU 956 系列发动机零件目录——船用与重型工业应用。',
    description: '浏览 MTU 956 系列零件：气缸盖、垫片、轴承、气门、喷油器、冷却水泵、叶轮、机油喷嘴与燃油系统部件。',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('956')),
    longDescription: `MTU 956 系列是中速柴油机领域久经验证的主力机型，为海军舰艇、商船与重型工业装置提供动力。它与 1163 系列共享许多设计特征，两个系列的零件经常可交叉引用。气缸盖（5550105141）、垫片（5550161420）、轴承（5550302160、5550307540）与冷却系统部件（5552010005）均属最常被询价的零件。

    对于仍在服役的 956 系列发动机，零件供货情况可能因地区与发动机变型而异。我们按您的发动机出厂编号核验每个零件号、检查替代关系，并就原厂配套（OEM）与原厂配套替代件选项报价。海水泵叶轮（5592010007）与机油喷嘴（5550101251）等船用专用部件属高频需求件，我们通常备有相应的库存编号。`,
  },
  {
    slug: 'mtu-1163-series',
    title: 'MTU 1163 系列零件目录',
    h1Title: 'MTU 1163 系列发动机零件',
    summary: 'MTU 1163 系列发动机零件目录——高输出船用推进。',
    description: '浏览 MTU 1163 系列零件：气缸盖、轴承、气门、冷却系统、燃油系统、垫片与密封件。',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('1163')),
    longDescription: `MTU 1163 零件询价需要完整的发动机型号名称、出厂编号与安装位置。目录编号包括缸盖部件、主轴承（5550330130）、连杆轴承（5550302160）与冷却泵轴（5562010105）。每个编号都应作为独立的识别任务对待，而非通用于所有 1163 发动机的零件。

    部分公开记录将同一编号同时列于 1163 与 956 系列之下，但这并不能证明其通用于两个系列。进行针对具体应用的核对时，请提供发动机出厂编号、所装部件标记与图纸版本。本公开目录并不代表可访问最新的原厂产品目录与当前库存。`,
  },

  // ── Category Hubs ──
  {
    slug: 'mtu-filters',
    title: 'MTU 机油、燃油与空气滤清器零件目录',
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

    询价请提供零件号、数量与目的地；如尺寸不明确，可附上标签照片或索取数据表。保养周期遵循发动机的维护文件与运行工况。`,
    type: 'category',
    partFilter: (p) => p.category === 'Filters',
  },
  {
    slug: 'mtu-injectors',
    title: 'MTU 喷油器与喷嘴零件目录',
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

    如故障与供油压力相关而非喷射质量，请查阅 MTU 燃油泵专题目录。燃油泵询价需提供油泵铭牌、传动形式、安装位置、发动机型号与出厂编号。`,
    type: 'category',
    partFilter: (p) => p.category === 'Fuel system' && /(injector|nozzle)/i.test(p.name),
  },
  {
    slug: 'mtu-fuel-pumps',
    title: 'MTU 燃油泵零件目录——高压与低压',
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

    询价（RFQ）请提供完整油泵编号、发动机型号与出厂编号、油泵铭牌照片、进出油口朝向、数量、目的地与要求的交货期。如选择再制造件路线，还请确认是否具备可再制造的旧件。`,
    type: 'category',
    partFilter: (p) => /fuel/i.test(`${p.name} ${p.category}`) && /pump/i.test(p.name),
  },
  {
    slug: 'mtu-turbocharger-parts',
    title: 'MTU 涡轮增压器零件目录——涡轮、壳体与密封件',
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
    ],
    type: 'category',
    partFilter: (p) => p.category === 'Turbocharging',
    longDescription: `请将完整的涡轮增压器（Turbocharger）与旋转总成、叶轮、壳体或密封部件区分开来。请提供增压器铭牌与完整总成型号；仅凭发动机系列无法确定机上所装的增压器构型。

    我们的涡轮增压器零件目录覆盖完整旋转总成：涡轮（5110804420、5110800220、5110800420）、压气机叶轮（5090251301）、轴承壳体（5110803201）、活塞环密封件（5110850060、5120850560）、隔热罩（5110812603、5110820226）与扩压器（5361420025）。我们对照您的增压器铭牌——而非仅发动机出厂编号——逐一核验零件号，因为同一发动机系列内的增压器变体可能因应用场景、功率等级与排放认证而异。

    常见故障模式包括：进气异物或排气歧管碎屑造成的涡轮叶片异物损伤；轴承壳体孔磨损导致径向间隙并伴随机油漏入排气流；以及频繁启停工况下热循环导致的隔热罩开裂。我们为新件、原厂配套替代件与再制造件方案提供交货期透明的报价。`,
  },
  {
    slug: 'mtu-sensors',
    title: 'MTU 传感器与电气元件零件目录',
    h1Title: 'MTU 传感器与电气零件',
    summary: 'MTU 传感器与电气元件——转速传感器、压力传感器、温度传感器、液位监测器与电磁阀。',
    description: '电气与传感器零件需要精确匹配——连接器类型、螺纹规格与信号范围因发动机装机而异。针对 MTU 2000、4000、396 与 595 系列，我们对照发动机出厂编号交叉核验零件号。',
    type: 'category',
    partFilter: (p) => p.category === 'Sensors and electrical',
    longDescription: `本目录包括转速传感器（Speed Sensor）如 0005357633、压力传感器如 0035352231 与 X00E50214075、温度传感器 0005356430 及液位监测器 X00E50203659。选型请依据完整的部件标记与测量位置，不能仅凭连接器外观判断。

    目录沿革显示，X00E50214075 是 0035352231 的后续型号，X00E50203659 是 0005355103 的后续型号。这些记录需按具体发动机核验。相近编号（如 0005356633 与 0005357633）不得假定为可互换。

    如标有压力量程或温度特性，请一并提供；另请提供连接器针脚布置、安装螺纹及线缆或探杆长度。仅凭报警不能判定传感器失效；如有可能，零件询价请附上线束与系统诊断信息。

    询价请先提供零件号与数量。照片、发动机出厂编号及所需图纸，有助于在报价替代件之前补齐缺失的规格信息。`,
  },
  {
    slug: 'mtu-starter-motors-alternators',
    title: 'MTU 起动机与交流发电机零件目录',
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

    询价请提供完整铭牌编号、发动机型号与出厂编号、系统电压、安装与端子照片、数量、目的地及要求的交货期。交流发电机请附输出功率与皮带轮详情；起动机请尽可能提供旋向与驱动齿轮信息。`,
    type: 'category',
    partFilter: (p) => p.category === 'Starting and charging' || /(starter|alternator|three phase generator)/i.test(p.name),
  },
  {
    slug: 'mtu-gasket-kits',
    title: 'MTU 垫片与密封套件零件目录',
    h1Title: 'MTU 垫片、密封件与 O 型圈',
    summary: 'MTU 垫片与密封件——气缸盖垫片（缸垫）、O 型圈、密封环、轴封及成套垫片组。',
    description: '可单独申购 MTU 垫片，也可提供逐项列出的大修密封件清单。请确认材质、厚度、形状与安装位置；库存与套件内容将在每笔报价中逐一核查。',
    type: 'category',
    partFilter: (p) => p.category === 'Gaskets and seals',
    longDescription: `垫片（Gasket）、密封件（Seal）与 O 型圈（O-ring）就重量而言或许是 MTU 发动机上最小的零件，但其重要性却居于前列。气缸盖垫片失效可在数分钟内使冷却系统带压并导致过热；涡轮增压器油封泄漏可将油底壳的机油排入排气系统；燃油喷油器衬套上的 O 型圈老化可令燃烧气体进入回油回路。本目录中的每一款垫片与密封件，都因其承担关键的封闭功能而入选。

    目录型号包括气缸盖垫片（5240161580、5410160920、5550161420）、O 型圈（700429260000、700429050003）、轴封（8699970499、XP51529700004）、密封环（007603016105）与气门油封（0000530361）。现有库存与材质等级仍以供应商确认为准。垫片组报价必须列明所含件号与数量；仅凭套件名称不能证明覆盖完整或价格更优。`,
  },
  {
    slug: 'mtu-pistons-liners',
    title: 'MTU 活塞、缸套与活塞环零件目录',
    h1Title: 'MTU 活塞、气缸套与活塞环组',
    summary: 'MTU 活塞总成、气缸套、活塞环、活塞销及连杆部件。',
    description: 'MTU 活塞、缸套与活塞环型号需要部件标记、尺寸等级文件及发动机出厂编号核验。所报型号的供货状态与可选等级将在报价中确认。',
    type: 'category',
    partFilter: (p) => p.category === 'Pistons and liners',
    longDescription: `活塞与缸套（Piston & Liner）总成是每台 MTU 发动机燃烧系统的核心。这些零件按尺寸等级分组、精密加工，活塞裙部与气缸套之间的间隙以百分之一毫米计量。尺寸等级差一级——哪怕只差一级——就会导致拉缸、机油消耗过量，严重时甚至活塞抱死。这不是普通商品件，而是经过工程设计的组合部件；一旦选错，代价以损失的发动机运行小时计算。

    目录型号包括气缸套（5240113410、5320110110、5840111810）、活塞（5240303917、5840300917）、活塞环部件（0120370618、0090375019、0080375819）与活塞销（5410370220）。请明确说明所需包含的部件与配合等级。不要假定每个等级代码都对应统一的加大尺寸级别；请对照适用图纸与所报产品确认。`,
  },
  {
    slug: 'mtu-valve-train',
    title: 'MTU 配气机构零件目录——气门、弹簧、导管与挺柱',
    h1Title: 'MTU 配气机构部件',
    summary: 'MTU 配气机构零件——进气门与排气门、气门弹簧、弹簧座、锁夹、导管、挺柱与推杆。',
    description: '配气机构磨损直接影响气缸压力、燃油效率与排气排放。我们为 MTU 2000、4000、396 与 595 系列提供单个部件与完整的气缸盖大修包；按大修批量可提供套件价格。',
    type: 'category',
    partFilter: (p) => p.category === 'Valve train',
  },
  {
    slug: 'mtu-bearings',
    title: 'MTU 发动机轴承零件目录——曲轴、连杆、凸轮轴与推力轴承',
    h1Title: 'MTU 发动机轴承',
    summary: 'MTU 轴承——曲轴主轴承、连杆轴承、凸轮轴轴承、推力轴承与衬套。',
    description: '对比 MTU 主轴承、连杆轴承、凸轮轴轴承与推力轴承型号。请注明轴瓦位置、等级标记、实测轴颈尺寸与曲轴修磨史；可选等级将在每笔询价中核查。',
    type: 'category',
    partFilter: (p) => p.category === 'Bearings',
    longDescription: `MTU 发动机轴承（Bearing）——曲轴主轴承、连杆轴承、凸轮轴轴承与推力垫——属于精密分级零件，其制造公差决定油膜厚度、载荷分布，并最终决定发动机寿命。轴承组差一个尺寸等级不会「勉强能用」；它会在运行最初几小时内烧瓦，并连带损伤曲轴轴颈。

    目录型号包括主轴承轴瓦（5240334901、5240335602、5410330605）、连杆轴承部件（5240383710、5240382711、5550302160）、凸轮轴轴承（5240510110）与推力部件（5090200512、5110200412、5360330262）。请依据适用文件与车间测量结果确认轴瓦位置与等级。本目录不设定统一的缩小尺寸级别或现有库存等级。`,
  },
  {
    slug: 'mtu-cylinder-heads',
    title: 'MTU 气缸盖与气门室盖零件目录',
    h1Title: 'MTU 气缸盖与气门室盖',
    summary: 'MTU 气缸盖、缸盖总成、气门室盖与气门头部——按发动机系列与构型索引，经零件号与出厂编号核验。',
    description: '浏览适用于船用、发电、轨道交通与工业发动机的 MTU 气缸盖型号。缸盖总成、裸缸盖与气门室盖的报价，均以确切零件号、发动机出厂编号与安装位置为依据。',
    type: 'category',
    partFilter: (p) => p.category === 'Cylinder heads',
    longDescription: `气缸盖（Cylinder Head）是 MTU 发动机上最为关键的单体总成：它承载气门、喷油器衬套与火力面密封，并决定下游一切部件所依赖的气缸压力。一只曾经历过过热的缸盖，今天或许还能保持压力，下一个赛季就可能在高负载下开裂——因此缸盖询价以确切零件号、发动机出厂编号与维修履历为依据，而非仅凭系列名称。

    目录型号涵盖 2000、4000、396、956 与 1163 系列应用中的完整缸盖总成、裸缸盖、气门室盖及气门头部部件。询价时请注明所需为裸缸盖、带气门装配的缸盖，还是已装喷油器衬套的缸盖，并提供铭牌上的构型代码，以便在订单确认前识别正确的变体。

    对于大修项目，请随附发动机型号与出厂编号一并发送完整零件清单；缸盖通常与同一作业所需的垫片组、配气机构部件及喷油器衬套一并报价。`,
  },
  {
    slug: 'mtu-fasteners-retaining-rings',
    title: 'MTU 紧固件与卡环零件目录',
    h1Title: 'MTU 紧固件与卡环',
    summary: 'MTU 螺栓、螺钉、调整垫片、卡环、挡圈与锁紧件——塑性域拉伸螺栓按一次性使用件报价。',
    description: 'MTU 紧固件与挡圈类零件按零件号检索。拉伸螺栓属于一次性使用的塑性域（Torque-to-yield）螺栓；报价前将确认强度等级标记与安装位置。',
    type: 'category',
    partFilter: (p) => p.category === 'Fasteners and retaining rings',
    longDescription: `高速柴油机上的紧固件并非普通五金。MTU 发动机的气缸盖螺栓、连杆螺栓与主轴承螺栓属于塑性域（Torque-to-yield）拉伸件：它们按规定的伸长量拧紧，在首次安装时即发生永久变形，按设计一次性使用。重复安装使用过的拉伸螺栓，是缸垫失效与结合面松脱最常见的原因之一，因此大修报价将其视为易损件，而非可复用库存。

    目录型号涵盖 2000、4000、396、956、1163 与 183 系列应用中的六角螺钉、紧定与调节螺钉、banjo 接头与空心螺钉、调整垫片、卡环、挡圈、卡环套件、锁片与螺塞。强度等级标记、螺纹形式、长度与安装位置按询价逐一确认——因为相邻构型中外观相近的螺栓，其规格与扭矩数值可能并不相同。

    请提供零件号、发动机型号与出厂编号，以及该紧固件所属的结合部位——缸盖、连杆、主轴承盖或盖板——以便报价正确的一次性使用规格，而非通用等效件。`,
  },
  {
    slug: 'mtu-tools-service-supplies',
    title: 'MTU 专用工具与服务耗材零件目录',
    h1Title: 'MTU 专用工具与服务耗材',
    summary: 'MTU 维修工具与装配辅料——拉马、盘车工具、定位心轴、拆卸装置、量具与装配涂剂。',
    description: 'MTU 车间工具与服务耗材按工具号索引。盘车装置、定位心轴与拉马在报价前按工具号与发动机应用核验。',
    type: 'category',
    partFilter: (p) => p.category === 'Tools and supplies',
    longDescription: `MTU 的若干项操作离开原厂工具便无法正确完成：用盘车装置将发动机转到上止点、用心轴设定喷油器高度、在不使壳体受载的前提下拆下衬套或皮带轮、用压力记录仪记录气缸压力。这些工具以工具号（F 前缀系列）标识，而非发动机零件号；车间里临时凑合的代用件，往往会损坏其本想保养的部件本身。

    目录型号涵盖 2000、4000、396、956、1163 系列及老旧 183 系列应用中的盘车工具与装置、拉马、拆装工具、定位心轴、铣刀、塞尺、气缸压力记录仪、工具套件、装配膏与密封剂。询价时请提供工具上压印的工具号及其所配发动机型号——工具号在不同构型间存在复用，正是发动机应用才能锁定正确的变体。

    计划大修时，请连同零件清单一并索取工具清单：同一作业通常需要盘车装置、定位心轴与至少一件拉马，将它们一并下单，可避免作业中途因工具短缺而停工。`,
  },
  {
    slug: 'mtu-cooling-system',
    title: 'MTU 冷却系统零件目录——水泵、叶轮与节温器',
    h1Title: 'MTU 冷却系统部件',
    summary: 'MTU 冷却系统零件——冷却水泵、海水泵、叶轮、节温器、法兰、软管与热交换器。',
    description: '冷却系统零件因发动机应用而异——船用（开式海水冷却或舷外冷却）、工业（散热器）或轨道交通。针对 MTU 2000、4000、396、595 与 956 系列，我们按发动机型号与出厂编号确认正确的变体。',
    searchTopics: [
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
    ],
    type: 'category',
    partFilter: (p) => p.category === 'Cooling system',
    longDescription: `MTU 发动机冷却系统依应用而定——采用开式冷却并经舷外冷却器换热的船用发动机，与采用闭式循环散热器的工业发动机或采用分区冷却的轨交发动机，所需的水泵与节温器配置各不相同。订购错误的冷却系统变体是最常见的零件选配失误之一，因为同一发动机系列可能存在多种冷却配置。

    我们的冷却系统目录涵盖冷却水泵（5062000601、5592001001/31）、海水泵（5502003201）、叶轮（X00022524、5582040406、5592010007、5592010307）、节温器（5841800175）、冷却水泵轴（5552010005、5842040714）、法兰（8490740063）与观察镜（5502030060）。每笔询价均按发动机型号、出厂编号与应用类型确认正确的变体。常见的更换诱因包括：磨蚀性冷却水造成的叶轮磨损、泵轴密封泄漏，以及节温器卡在开启或关闭位置。`,
  },
];

const seriesCatalogTargets = ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 595', 'MTU 956', 'MTU 1163'] as const;
const categoryCatalogTargets = [
  'Fuel system',
  'Filters',
  'Gaskets and seals',
  'Pistons and liners',
  'Valve train',
  'Bearings',
  'Turbocharging',
  'Cooling system',
  'Sensors and electrical',
  'Cylinder heads',
] as const;

const categoryTitleMap: Record<string, string> = {
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
};

const generatedSeriesCategoryHubs: MtuCatalogHub[] = seriesCatalogTargets.flatMap((series) =>
  categoryCatalogTargets
    .map((category) => ({
      series,
      category,
      count: mtuParts.filter((part) => part.series.includes(series) && part.category === category).length,
    }))
    .filter(({ count }) => count >= 2)
    .map(({ series, category, count }) => {
      const seriesSlug = slugifyPart(series.replace('MTU ', 'mtu-'));
      const categorySlug = slugifyPart(category);
      const categoryTitle = categoryTitleMap[category] ?? category;
      const cleanSeries = series.replace('MTU ', '');
      return {
        slug: `${seriesSlug}-${categorySlug}-parts`,
        title: `${series} ${categoryTitle}零件目录`,
        h1Title: `${series} ${categoryTitle}零件`,
        summary: `${count} 个 ${series} ${categoryTitle}零件号——用于询价、供货核查与出厂编号核验。`,
        description: `浏览 ${series} ${categoryTitle}零件号。本目录页按发动机系列与品类归并准确的零件号页面，便于采购方为 ${cleanSeries} 保养、大修与维修工作准备更清晰的询价清单。`,
        longDescription: `${series} ${categoryTitle}零件在报价前按准确零件号、发动机出厂编号、替换状态与运输目的地逐项核验。\n\n当您的询价范围小于完整的 ${series} 目录、又大于单个零件号时，请使用本页。下方代表性清单可帮助采购团队在发送合并询价前，比对可用参考号、重量与 HS 编码数据以及相关零件页面。`,
        type: 'category',
        partFilter: (part: MtuPart) => part.series.includes(series) && part.category === category,
      } satisfies MtuCatalogHub;
    })
);

export const mtuCatalogHubs: MtuCatalogHub[] = [
  ...manualMtuCatalogHubs,
  ...generatedSeriesCategoryHubs,
];

/**
 * Priorities reviewed against Bing 2026-09-27 and the current GSC exports.
 * Editorial order, not traffic totals across unlike date ranges.
 */
export const searchPriorityPartNumbers = [
  '0031845201',
  'X57508300091',
  'EX52407500064',
  'X00E50203659',
  '5244920181',
  '0020922801',
  '0035352231',
  '0000925105',
  '0005356430',
  '0005357633',
  'X00E50214075',
  'X52421300004',
  '0002000001',
  '5410180233',
  '0030944304',
  '0049976736',
  'XP52618300032',
  '0180945802',
  'XP52718300060',
  '5240530122',
  'XP59501800123',
  'XP00A36400005',
  '700429050003',
  '0005351733',
  '5240530301',
  'XP58799100596',
  'F6794703',
  '5360702032',
  '5840780024',
  '0000982780',
  '5849900851',
  '5240332730',
  '5240530830',
  'X52420300037',
  '0005358233',
  '700327012000',
  '205412223002',
  'X58720700011',
  '23540455',
  '0031845301',
] as const;

export const searchPriorityPartRank = new Map<string, number>(
  [...new Set([...searchPriorityPartNumbers, ...Object.keys(partSearchContent)])]
    .map((partNumber, index) => [partNumber.toUpperCase(), index]),
);
