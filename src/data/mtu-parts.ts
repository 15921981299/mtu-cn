import { catalogPartDetailsByPartNumber, catalogPartDetailsBySlug, catalogPartSeeds } from './catalog-part-details';

import { applySearchPartContent, partSearchContent } from './part-search-content';
import { sentencePartName, standardPartName } from './part-names';

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
    summary: 'Turbocharger component for MTU engines — verified by part number and engine serial number before quotation.',
    description: 'Turbocharger parts operate under high thermal and mechanical loads. We verify each part number against your engine serial number to confirm fitment across MTU series. Replacement and OEM-alternative options are quoted with lead time and shipping route.',
    stockStatus: 'Checked by part number — new, OEM-alternative, or reman options quoted per inquiry',
    applications: ['Marine propulsion', 'Power generation', 'Locomotive engines', 'Heavy equipment'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8414.90',
    leadTime: 'Stock: 3-7 working days. Special order: 2-4 weeks. Reman: quoted per core availability.',
    dimensions: 'Varies by turbocharger model — quoted on inquiry with engine and turbo serial numbers',
  },
  'Filters': {
    summary: 'MTU filter element — oil, fuel, air, or coolant. Part-number verification confirms compatibility.',
    description: 'Filters are high-frequency consumables in any MTU maintenance program. We stock common filter references and can source application-specific elements. Bulk quantities available for fleet and service-company programs.',
    stockStatus: 'Common references in stock — confirmed after part-number check',
    applications: ['Scheduled maintenance', 'Fleet service programs', 'Marine engine rooms', 'Generator servicing'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8421.23',
    leadTime: 'Common references: 2-5 working days. Bulk orders: 1-2 weeks.',
    dimensions: 'Varies by filter type — spin-on cartridges typically 80-150mm OD x 150-300mm L',
  },
  'Fuel system': {
    summary: 'MTU fuel-system component — injectors, pumps, valves, lines. Verified by engine model and serial number.',
    description: 'Fuel-system parts directly affect combustion quality, emissions compliance, and fuel economy. We confirm fitment by engine model and serial number. OEM and OEM-alternative options available; reman options quoted where applicable.',
    stockStatus: 'Checked per part number and engine application',
    applications: ['Marine diesel engines', 'Power generation sets', 'Rail traction engines', 'Industrial equipment'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8413.30',
    leadTime: 'New OEM: 5-10 working days. Reman exchange: 3-7 working days after core approval. OEM-alternative: 3-7 working days.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Sensors and electrical': {
    summary: 'MTU sensor, solenoid, or electrical component — verified by connector type and engine installation.',
    description: 'Electrical and sensor parts require precise matching — connector type, thread size, and signal range all vary by engine installation. We cross-check your part number against the engine serial number to avoid mismatch.',
    stockStatus: 'Quoted after part-number and connector check',
    applications: ['Engine monitoring systems', 'Control panels', 'Retrofit and upgrade projects'],
    weightKg: 'Confirmed with quotation',
    hsCode: '9032.89',
    leadTime: 'Common sensors: 3-7 working days. Special-range or legacy sensors: 1-3 weeks.',
    dimensions: 'Sensors typically M12-M18 thread, 40-120mm length; solenoid valves vary — quoted on inquiry',
  },
  'Pistons and liners': {
    summary: 'MTU piston, liner, or ring set — size grade and engine series must match exactly.',
    description: 'Pistons, liners, and rings are size-graded components. Incorrect grade selection causes premature wear or seizure. We verify size code, engine series, and serial number before quotation. OEM and OEM-alternative grades available.',
    stockStatus: 'Quoted by size grade and series — OEM and alternative options',
    applications: ['Major overhaul', 'In-frame rebuild', 'Marine engine service', 'Industrial engine repair'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8409.99',
    leadTime: 'Standard size grades: 5-10 working days. Non-standard grades: 2-6 weeks.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Valve train': {
    summary: 'MTU valve-train component — valves, springs, guides, tappets. Part number and engine series verified.',
    description: 'Valve-train wear directly affects compression, fuel efficiency, and exhaust emissions. We confirm part number, engine series, and installation position before quotation. Kits available for cylinder-head overhaul programs.',
    stockStatus: 'Quoted per part number — kit pricing available for overhaul quantities',
    applications: ['Cylinder-head overhaul', 'Marine engine maintenance', 'Power generation service'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8409.91',
    leadTime: 'Common valves/springs: 3-7 working days. Full kit quantities: 1-2 weeks.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Bearings': {
    summary: 'MTU bearing — crankshaft, connecting rod, camshaft, or thrust. Size grade must match engine specification.',
    description: 'Bearings are precision-graded components. Undersize, standard, and oversize grades available. We verify engine serial number to confirm the correct grade before quotation.',
    stockStatus: 'Quoted by size grade — standard grades more readily available',
    applications: ['Engine overhaul', 'Crankshaft service', 'Marine and industrial engines'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8483.30',
    leadTime: 'Standard size grades: 3-7 working days. Undersize/oversize grades: 1-3 weeks.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Gaskets and seals': {
    summary: 'MTU gasket or seal — cylinder head, exhaust, oil, water. Correct material grade confirmed before quotation.',
    description: 'Gaskets and seals are application-specific — material grade, thickness, and shape all vary by engine installation. We confirm part number against engine series and recommend full gasket kits for overhaul projects.',
    stockStatus: 'Common gaskets in stock — special grades quoted per inquiry',
    applications: ['Overhaul kits', 'Marine service', 'Industrial maintenance', 'Generator repair'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8484.10',
    leadTime: 'Common gaskets/O-rings: 2-5 working days. Special material grades: 1-3 weeks.',
    dimensions: 'Individual gaskets vary by application; complete kits quoted with full parts list',
  },
  'Cooling system': {
    summary: 'MTU cooling-system component — pumps, thermostats, hoses, flanges. Verified by engine model and installation.',
    description: 'Cooling-system parts vary by engine application — marine (raw-water or keel-cooled), industrial (radiator), or rail. We confirm the correct variant by engine model and serial number.',
    stockStatus: 'Quoted per part number and engine application',
    applications: ['Marine cooling systems', 'Industrial radiator systems', 'Generator cooling'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8419.50',
    leadTime: 'Pumps: 5-15 working days depending on model. Impellers: 2-5 working days. Thermostats: 3-7 working days.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Lubrication': {
    summary: 'MTU lubrication-system component — pumps, coolers, nozzles, separators. Part number and series verified.',
    description: 'Lubrication parts are critical to engine life. We verify every part number against your engine serial number and can quote complete lube-system kits for major service intervals.',
    stockStatus: 'Quoted per part number — kit options available',
    applications: ['Marine engines', 'Industrial engines', 'Generator maintenance'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8413.30',
    leadTime: 'Oil pumps and coolers: 5-15 working days. Spray nozzles and separators: 3-7 working days.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Drive components': {
    summary: 'MTU drive component — bolts, nuts, washers, clamps, couplings. Verified by engine assembly position.',
    description: 'Drive and fastening components must match the engine assembly revision. We verify part numbers against the latest parts catalog for your engine serial number.',
    stockStatus: 'Common fasteners in stock — special items quoted per inquiry',
    applications: ['Engine assembly', 'Marine propulsion', 'Industrial drives', 'Generator sets'],
    weightKg: 'Confirmed with quotation',
    hsCode: '7318.15',
    leadTime: 'Common fasteners: 2-5 working days. Special bolts/couplings: 1-3 weeks.',
    dimensions: 'Fasteners M6-M24 typical; couplings vary by shaft size — quoted on inquiry',
  },
  'Air and intake': {
    summary: 'MTU air and intake component — filters, hoses, manifolds. Verified by engine model.',
    description: 'Air-system parts must match the engine intake configuration. We confirm part numbers by engine model and can quote complete air-filter service kits.',
    stockStatus: 'Filter elements commonly in stock — special items quoted',
    applications: ['Marine engine rooms', 'Industrial sites', 'Generator enclosures'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8421.31',
    leadTime: 'Filter elements: 2-5 working days. Intake manifolds and hoses: 1-3 weeks.',
    dimensions: 'Confirmed by part number with quotation',
  },
  'Engine components': {
    summary: 'MTU engine component — verified by part number, engine model, and serial number.',
    description: 'General engine components are verified against your engine serial number and the latest MTU parts catalog revision. We confirm fitment, stock status, and shipping options before quotation.',
    stockStatus: 'Quoted per part number after engine verification',
    applications: ['Marine service', 'Industrial maintenance', 'Power generation', 'Rail traction'],
    weightKg: 'Confirmed with quotation',
    hsCode: '8409.99',
    leadTime: 'Quoted per part number after engine verification — typically 3-15 working days.',
    dimensions: 'Varies by component — quoted on inquiry with part number and engine model',
  },
  'Control components': {
    summary: 'MTU engine control component — governor, actuator, or monitoring device. Verified by engine configuration.',
    description: 'Control components are configuration-specific. We verify your part number and engine serial number to confirm the correct control-system variant.',
    stockStatus: 'Quoted per part number and engine configuration',
    applications: ['Engine control systems', 'Marine automation', 'Generator control panels'],
    weightKg: 'Confirmed with quotation',
    hsCode: '9032.89',
    leadTime: 'Quoted per part number — typically 5-15 working days depending on configuration.',
    dimensions: 'Governors and actuators vary by model — quoted on inquiry with engine serial number',
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
  '8495340000': { engineType: 'MTU 956/1163', dimensions: 'For valve block 0005342732', weightKg: '0.650 KG', hsCode: '84812090', natoNumber: '4810123693952' },
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
  series.length > 0 ? series.map((item) => item.replace(/^MTU\s*/i, 'MTU ')).join('/') : 'Verify by engine serial number';

const inferLeadTime = (category: string) =>
  category === 'Filters' || category === 'Gaskets and seals'
    ? 'Common references are usually checked fastest'
    : 'Quoted by stock, replacement route, and destination';

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
    availability: 'Stock, replacement status, lead time, and shipping route confirmed after inquiry.',
    stockStatus: part.stockStatus ?? cat.stockStatus,
    applications: cat.applications,
    notes: [
      `For ${part.partNumber}, confirm engine model, serial number, required quantity, and destination before ordering.`,
      `If ${part.partNumber} markings or replacement status are unclear, send old-part photos or nameplate details.`,
    ],
    replacementFor,
    weightKg: part.weightKg ?? spec.weightKg ?? cat.weightKg,
    hsCode: part.hsCode ?? spec.hsCode ?? cat.hsCode,
    leadTime: part.leadTime ?? spec.leadTime ?? inferLeadTime(part.category),
    dimensions: part.dimensions ?? spec.dimensions ?? 'Confirm by part number, old-part photo, or catalog drawing',
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
    summary: 'MTU valve guide inquiry support for inlet-side service and overhaul work.',
    image: partImage,
    availability: 'Check stock and replacement status by engine serial number.',
    applications: ['Marine propulsion', 'Shipyard overhaul', 'Power generation'],
    notes: ['Confirm cylinder head configuration before ordering.', 'Send old part photos when size marking is unclear.'],
  },
  {
    slug: 'x54707700072-relief-valve-for-4-cyl-hp-pump',
    partNumber: 'X54707700072',
    name: 'Relief Valve for 4-Cylinder HP Pump',
    series: [],
    category: 'Fuel system',
    summary: 'Relief valve sourcing for MTU high-pressure fuel pump service.',
    image: partImage,
    availability: 'Quoted by pump model, engine series, and destination.',
    applications: ['Marine engines', 'Generator sets', 'Industrial power units'],
    notes: ['Verify pump configuration and fuel-system version.', 'Include engine model and serial number in the inquiry.'],
  },
  {
    slug: 'x00e50207217-pressure-sensor',
    partNumber: 'X00E50207217',
    name: 'Pressure Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: 'MTU pressure sensor availability check with part-number and connector verification.',
    image: partImage,
    availability: 'Often requested for urgent service; confirm by part number and photo.',
    applications: ['Marine propulsion', 'Power generation', 'Rail maintenance'],
    notes: ['Send connector photo and installed location if possible.', 'Check supersession before shipment.'],
  },
  {
    slug: 'x00e50207196-pressure-sensor',
    partNumber: 'X00E50207196',
    name: 'Pressure Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: 'Pressure sensor inquiry page for MTU service teams and procurement buyers.',
    image: partImage,
    availability: 'Stock or sourcing route confirmed after serial-number check.',
    applications: ['Generator engines', 'Industrial engines', 'Marine auxiliary engines'],
    notes: ['Confirm whether the old part has a superseded reference.', 'Photos reduce wrong-sensor risk.'],
  },
  {
    slug: '0005357533-speed-sensor',
    partNumber: '0005357533',
    name: 'Speed Sensor',
    series: ['MTU 396', 'MTU 4000'],
    category: 'Sensors and electrical',
    summary: 'MTU speed sensor support for control, monitoring, and engine protection systems.',
    image: partImage,
    availability: 'Check by sensor part number, engine model, and cable/connector details.',
    applications: ['Marine engines', 'Rail engines', 'Power generation'],
    notes: ['Confirm cable length and connector type.', 'Send nameplate or old sensor markings.'],
  },
  {
    slug: '0005357433-speed-sensor',
    partNumber: '0005357433',
    name: 'Speed Sensor',
    series: ['MTU 396', 'MTU 4000'],
    category: 'Sensors and electrical',
    summary: 'Speed sensor sourcing for MTU engine monitoring and replacement work.',
    image: partImage,
    availability: 'Quoted by stock, replacement option, and shipping destination.',
    applications: ['Shipyards', 'Generator maintenance', 'Fleet service'],
    notes: ['Send the old sensor photo before purchase.', 'Check compatibility against engine serial number.'],
  },
  {
    slug: '5841800143-oil-spray-nozzle',
    partNumber: '5841800143',
    name: 'Oil Spray Nozzle',
    series: ['MTU 595', 'MTU 956', 'MTU 1163'],
    category: 'Lubrication',
    summary: 'Oil spray nozzle support for MTU lubrication and overhaul maintenance.',
    image: partImage,
    availability: 'Available routes checked by series and required quantity.',
    applications: ['Marine propulsion', 'Major overhaul', 'Power plant service'],
    notes: ['Verify installed position and engine series.', 'Best ordered with related seals or gaskets.'],
  },
  {
    slug: '0005862709-repair-kit',
    partNumber: '0005862709',
    name: 'Repair Kit',
    series: [],
    category: 'Repair kits',
    summary: 'MTU repair kit inquiry support for planned service and urgent maintenance.',
    image: partImage,
    availability: 'Kit contents and lead time confirmed before quotation.',
    applications: ['Service workshops', 'Shipyards', 'Generator maintenance'],
    notes: ['Confirm kit scope before purchase.', 'Send engine model and repair location details.'],
  },
  {
    slug: 'e0070960299-exhaust-turbocharger',
    partNumber: 'E0070960299',
    name: 'Exhaust Turbocharger',
    series: [],
    category: 'Turbocharging',
    summary: 'Exhaust turbocharger sourcing for MTU marine and generator engines.',
    image: partImage,
    availability: 'New, replacement, or repair option quoted by application.',
    applications: ['Marine propulsion', 'Generator sets', 'Industrial engines'],
    notes: ['Confirm engine rating and turbocharger plate.', 'Shipping size and packing affect delivery route.'],
  },
  {
    slug: 'e0070960399-exhaust-turbocharger',
    partNumber: 'E0070960399',
    name: 'Exhaust Turbocharger',
    series: [],
    category: 'Turbocharging',
    summary: 'MTU turbocharger availability check with application and rating verification.',
    image: partImage,
    availability: 'Quoted after checking rating, flange, and replacement route.',
    applications: ['Vessels', 'Power generation', 'Industrial equipment'],
    notes: ['Send turbocharger nameplate photo.', 'Include required delivery date for downtime orders.'],
  },
  {
    slug: 'ex53620700005-87-seawater-pump',
    partNumber: 'EX53620700005/87',
    name: 'Seawater Pump',
    series: [],
    category: 'Cooling system',
    summary: 'Seawater pump support for MTU marine cooling systems.',
    image: partImage,
    availability: 'Check by pump reference, engine model, and vessel location.',
    applications: ['Marine propulsion', 'Auxiliary engines', 'Shipyard repair'],
    notes: ['Photos of old pump and ports help confirm fit.', 'Ask for gasket and seal requirements together.'],
  },
  {
    slug: 'x52808100014-fuel-delivery-pump',
    partNumber: 'X52808100014',
    name: 'Fuel Delivery Pump',
    series: [],
    category: 'Fuel system',
    summary: 'MTU fuel delivery pump sourcing for service and repair.',
    image: partImage,
    availability: 'Quoted by engine serial number and stock route.',
    applications: ['Marine', 'Generator', 'Industrial engine service'],
    notes: ['Confirm pump reference on the old part.', 'Check related fuel lines or seals when replacing.'],
  },
  {
    slug: '5240780824-conn-fuel-rail-rear',
    partNumber: '5240780824',
    name: 'Connector, Fuel Rail Rear',
    series: [],
    category: 'Fuel system',
    summary: 'Fuel rail connector inquiry support for MTU fuel-system maintenance.',
    image: partImage,
    availability: 'Line-item stock check available for overhaul lists.',
    applications: ['Marine engines', 'Power generation', 'Fleet maintenance'],
    notes: ['Verify rear rail configuration.', 'Send complete fuel-system list for consolidated quotation.'],
  },
  {
    slug: 'x59407700023-hp-fuel-line',
    partNumber: 'X59407700023',
    name: 'HP Fuel Line',
    series: [],
    category: 'Fuel system',
    summary: 'High-pressure fuel line sourcing for MTU 4000 service work.',
    image: partImage,
    availability: 'Checked by cylinder position, engine serial number, and required quantity.',
    applications: ['MTU 4000 marine engines', 'Generator maintenance', 'Industrial engines'],
    notes: ['Confirm exact line position.', 'Do not substitute without serial-number verification.'],
  },
  {
    slug: '5552035639-flange',
    partNumber: '5552035639',
    name: 'Flange',
    series: ['MTU 396', 'MTU 595'],
    category: 'Cooling system',
    summary: 'MTU flange inquiry support for cooling and fluid-circuit service.',
    image: partImage,
    availability: 'Confirmed by part number and old-part photo.',
    applications: ['Shipyard repair', 'Industrial engine service', 'Generator engines'],
    notes: ['Send mating part information when possible.', 'Confirm gasket needs before shipment.'],
  },
  {
    slug: 'x58720700002-coolant-pump-shaft',
    partNumber: 'X58720700002',
    name: 'Coolant Pump Shaft',
    series: [],
    category: 'Cooling system',
    summary: 'Coolant pump shaft support for MTU pump repair and overhaul.',
    image: partImage,
    availability: 'Availability checked by pump assembly and engine series.',
    applications: ['Marine engines', 'Power plants', 'Repair workshops'],
    notes: ['Confirm pump assembly reference.', 'Ask for seals and bearings in the same inquiry.'],
  },
  {
    slug: '5590982680-gasket',
    partNumber: '5590982680',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 595', 'MTU 956'],
    category: 'Gaskets and seals',
    summary: 'MTU gasket sourcing for maintenance kits and overhaul lists.',
    image: partImage,
    availability: 'Good candidate for consolidated shipment with other service parts.',
    applications: ['Overhaul work', 'Routine service', 'Marine maintenance'],
    notes: ['Confirm engine series and installed position.', 'Send full gasket list for faster quote.'],
  },
  {
    slug: '0001750080-gasket',
    partNumber: '0001750080',
    name: 'Gasket',
    series: ['MTU 183', 'MTU 396', 'MTU 4000'],
    category: 'Gaskets and seals',
    summary: 'Gasket availability check for MTU service and repair requirements.',
    image: partImage,
    availability: 'Stock and replacement status checked after inquiry.',
    applications: ['Service kits', 'Generator maintenance', 'Shipyard service'],
    notes: ['Part-number verification prevents wrong gasket selection.', 'Quantity and destination affect packing route.'],
  },
  {
    slug: '5370780038-damper-strip',
    partNumber: '5370780038',
    name: 'Damper Strip',
    series: ['MTU 396', 'MTU 538'],
    category: 'Fuel system',
    summary: 'Damper strip support for MTU fuel and engine assembly service.',
    image: partImage,
    availability: 'Checked by engine series and required quantity.',
    applications: ['Marine service', 'Industrial maintenance', 'Legacy engine support'],
    notes: ['Legacy series may require replacement confirmation.', 'Photos help when old markings are worn.'],
  },
  {
    slug: '5500530025-spring-retainer',
    partNumber: '5500530025',
    name: 'Spring Retainer',
    series: ['MTU 396', 'MTU 595'],
    category: 'Valve train',
    summary: 'Spring retainer sourcing for MTU cylinder-head and valve-train work.',
    image: partImage,
    availability: 'Quoted by stock or sourcing option.',
    applications: ['Cylinder-head repair', 'Major overhaul', 'Marine engines'],
    notes: ['Confirm matching valve-train parts.', 'Send quantities by cylinder count.'],
  },
  {
    slug: '5550630180-gasket',
    partNumber: '5550630180',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 595'],
    category: 'Gaskets and seals',
    summary: 'MTU gasket inquiry page for planned maintenance and repair.',
    image: partImage,
    availability: 'Line-item availability confirmed before quotation.',
    applications: ['Shipyards', 'Service companies', 'Power generation'],
    notes: ['Confirm exact part number against the manual.', 'Best quoted with other service-kit items.'],
  },
  {
    slug: '8492500001-coupling',
    partNumber: '8492500001',
    name: 'Coupling',
    series: ['MTU 4000', 'MTU 8000'],
    category: 'Drive components',
    summary: 'Coupling sourcing for MTU engine drive and auxiliary systems.',
    image: partImage,
    availability: 'Quoted by dimensions, old part photo, and engine application.',
    applications: ['Marine propulsion', 'Power generation', 'Industrial drives'],
    notes: ['Confirm mating equipment and installed position.', 'Packing size may affect freight choice.'],
  },
  {
    slug: '0005354330-temperature-sensor',
    partNumber: '0005354330',
    name: 'Temperature Sensor',
    series: [],
    category: 'Sensors and electrical',
    summary: 'Temperature sensor availability check for MTU monitoring and protection systems.',
    image: partImage,
    availability: 'Check stock by part number, connector, and engine serial number.',
    applications: ['Marine', 'Generator', 'Rail and industrial engines'],
    notes: ['Send connector photo.', 'Check supersession and installation point.'],
  },
  {
    slug: 'x50441600048-air-hose',
    partNumber: 'X50441600048',
    name: 'Air Hose',
    series: [],
    category: 'Air and intake',
    summary: 'MTU air hose support for charge-air and intake system service.',
    image: partImage,
    availability: 'Availability confirmed by hose shape, old part photo, and part number.',
    applications: ['Marine engines', 'Industrial engines', 'Generator sets'],
    notes: ['Photos are useful because hose routing varies.', 'Ask for clamps or sleeves together.'],
  },
  {
    slug: '4441410480-gasket',
    partNumber: '4441410480',
    name: 'Gasket',
    series: ['MTU 396', 'MTU 493'],
    category: 'Gaskets and seals',
    summary: 'Legacy MTU gasket sourcing for repair and maintenance programs.',
    image: partImage,
    availability: 'Legacy-part availability checked by engine series and quantity.',
    applications: ['Legacy marine engines', 'Industrial service', 'Repair workshops'],
    notes: ['Check superseded numbers before ordering.', 'Send old gasket or manual reference when possible.'],
  },
  // ═══════════════════════════════════════════════
  // ENRICHED VERIFIED PARTS (real data from supplier catalogs)
  // ═══════════════════════════════════════════════
  ...([
    // ── MTU 4000 Overhaul Parts ──
    { partNumber: '5240113410', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners', stockStatus: 'Standard grade — common stock item, confirmed after engine serial check', replacementFor: ['5240113510', '5240114210'], hsCode: '8409.99', applicableEngines: '12V 4000 M70, 16V 4000 M90, 20V 4000 M93', commonFailureScenarios: ['Cavitation erosion on water-jacket side', 'Wear ridge at top ring travel — check at major overhaul', 'Scuffing from coolant contamination'], orderingNotes: 'Always verify size grade (0/1/2) via engine serial number before ordering. Replace liner, piston rings, and sealing rings as a set.' },
    { partNumber: '5240103420', name: 'Cylinder Head Assembly', series: [], category: 'Cylinder heads', stockStatus: 'Checked by engine variant — OEM and alternative options quoted', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240161580', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: ['5240160380'], hsCode: '8484.10', applicableEngines: '12V/16V/20V 4000 series — all variants', commonFailureScenarios: ['External coolant leak at cylinder head joint', 'Combustion gas blow-by into cooling system', 'Oil contamination in coolant from failed gasket'], orderingNotes: 'Replace as a complete set (one per cylinder). Always replace head bolts at the same time.' },
    { partNumber: '5240303917', name: 'Piston Assembly', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade — OEM and alternative grades available', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240372525', name: 'Piston Crown', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by engine serial and crown part number', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240300215', name: 'Piston Skirt', series: [], category: 'Pistons and liners', stockStatus: 'Quoted with matching crown — kit options available', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0120370618', name: 'Oil Control Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set — commonly in stock', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0120370819', name: 'Taper Face Compression Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set item', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080375819', name: 'Rectangular Section Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set item', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240383710', name: 'Conrod Bearing Upper Half', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade (STD/0.25/0.50/0.75)', replacementFor: ['5240384110'], hsCode: '8483.30' },
    { partNumber: '5240382711', name: 'Conrod Bearing Lower Half', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5240384210'], hsCode: '8483.30' },
    { partNumber: '5240380471', name: 'Conrod Bolt', series: ['MTU 4000'], category: 'Drive components', stockStatus: 'Commonly in stock — always replaced as a set', replacementFor: [], hsCode: '7318.15' },
    { partNumber: '5240334901', name: 'Crankshaft Bearing Upper', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5240336602'], hsCode: '8483.30' },
    { partNumber: '5240335602', name: 'Crankshaft Bearing Lower', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5240336702'], hsCode: '8483.30' },
    { partNumber: '5240332730', name: 'Crankshaft Bearing Driving End', series: [], category: 'Bearings', stockStatus: 'Quoted by engine serial number', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5240332630', name: 'Crankshaft Bearing Free End', series: [], category: 'Bearings', stockStatus: 'Quoted by engine serial number', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5240530301', name: 'Inlet Valve', series: [], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: ['X52404100226'], hsCode: '8409.91' },
    { partNumber: '5240530305', name: 'Exhaust Valve', series: [], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: ['5240530805', '5240530905'], hsCode: '8409.91' },
    { partNumber: '5240530152', name: 'Valve Spring Inner', series: [], category: 'Valve train', stockStatus: 'Commonly in stock — kit pricing available', replacementFor: ['5240530122'], hsCode: '8409.91' },
    { partNumber: '5240530120', name: 'Valve Spring Outer', series: ['MTU 4000'], category: 'Valve train', stockStatus: 'Commonly in stock — kit pricing available', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '0000534335', name: 'Valve Rotator', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or full set', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '0000530926', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240160069', name: 'Cylinder Head Bolt', series: [], category: 'Drive components', stockStatus: 'Always replaced as a set during overhaul', replacementFor: ['5249900701'], hsCode: '7318.15' },
    { partNumber: '5240160153', name: 'Injector Sleeve', series: [], category: 'Fuel system', stockStatus: 'Checked by part number — replaced during injector service', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5240500930', name: 'Push Rod', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: ['X52405400013'], hsCode: '8409.91' },
    // ── MTU 4000 Turbocharger ──
    { partNumber: '5110804420', name: 'Turbine Wheel', series: [], category: 'Turbocharging', stockStatus: 'Checked by turbocharger serial number — new and reman options', replacementFor: ['5110800220', '5110800420'], hsCode: '8414.90' },
    { partNumber: '5110803201', name: 'Bearing Housing', series: [], category: 'Turbocharging', stockStatus: 'Quoted by turbo model and serial', replacementFor: [], hsCode: '8414.90' },
    { partNumber: '5110850060', name: 'Piston Ring for Turbocharger', series: [], category: 'Turbocharging', stockStatus: 'Small part — commonly in stock', replacementFor: ['5090850060'], hsCode: '8414.90' },
    // ── MTU 4000 Fuel System ──
    { partNumber: 'EX52407500064', name: 'Injector', series: [], category: 'Fuel system', stockStatus: 'Checked by injector part number and engine serial — new and reman', replacementFor: [], hsCode: '8413.30', applicableEngines: '12V/16V 4000 M70, M90, M93 — common rail variants', commonFailureScenarios: ['Uneven fuel delivery causing cylinder imbalance', 'Nozzle tip carbon fouling at high hours', 'Internal leakage raising return-flow volume'], orderingNotes: 'Send injector serial number for reman exchange. New OEM and OEM-alternative both available.' },
    { partNumber: 'X57508300091', name: 'Fuel Filter Spin-On', series: [], category: 'Filters', stockStatus: 'Common consumable — typically in stock', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '5240160153', name: 'Tube Injector', series: [], category: 'Fuel system', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8413.30' },
    // ── MTU 4000 Cooling ──
    { partNumber: '5062000601', name: 'Coolant Pump', series: [], category: 'Cooling system', stockStatus: 'Checked by engine application — new and reman options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5582040406', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: ['5802040806'], hsCode: '8413.30' },
    { partNumber: '5240980281', name: 'Hose', series: [], category: 'Cooling system', stockStatus: 'Quoted by part number and engine installation', replacementFor: [], hsCode: '4009.31' },
    // ── MTU 4000 Filters ──
    { partNumber: '5241840501', name: 'Lube Oil Full Flow Filter', series: [], category: 'Filters', stockStatus: 'Common consumable — bulk quantities available', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '0031845201', name: 'Oil Filter Spin-On', series: [], category: 'Filters', stockStatus: 'High-volume consumable — typically in stock', replacementFor: ['0031845301'], hsCode: '8421.23' },
    { partNumber: '0020922801', name: 'Fuel Filter Spin-On', series: [], category: 'Filters', stockStatus: 'High-volume consumable — typically in stock', replacementFor: ['0020921901'], hsCode: '8421.23' },
    // ── MTU 4000 Seals ──
    { partNumber: '5241420780', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5241870380', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5241880180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'X52404200052', name: 'Seal Ring', series: ['MTU 4000'], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },

    // ── MTU 2000 Overhaul Parts ──
    { partNumber: '5410160920', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: ['5500160420'], hsCode: '8484.10' },
    { partNumber: '5310160021', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5419970645', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: ['5419970545'], hsCode: '8484.10' },
    { partNumber: '5501871280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5220980080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5411420180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5410530020', name: 'Valve Spring', series: [], category: 'Valve train', stockStatus: 'Common overhaul item — kit pricing available', replacementFor: ['5500530020'], hsCode: '8409.91' },
    { partNumber: '5500530401', name: 'Inlet Valve', series: [], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: ['5500500227', '4420500227'], hsCode: '8409.91' },
    { partNumber: '5410540505', name: 'Push Rod', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5419900304', name: 'Rocker Shaft Bolt', series: [], category: 'Drive components', stockStatus: 'Quoted as set for cylinder-head work', replacementFor: [], hsCode: '7318.15' },
    // ── MTU 2000 Fuel System ──
    { partNumber: 'X53507500012', name: 'Injector', series: [], category: 'Fuel system', stockStatus: 'Checked by injector PN and engine serial — new and reman options', replacementFor: [], hsCode: '8413.30', applicableEngines: '8V/12V/16V/18V 2000 M84, M91, M93, M94, M96', commonFailureScenarios: ['Nozzle coking from low-load operation', 'Injector body internal wear at 12,000-15,000 hours', 'Sealing surface leakage causing compression loss'], orderingNotes: 'Reman exchange program available — core return required. New OEM-alternative injectors also quoted. Send engine serial and injector part number.' },
    { partNumber: 'X53508200001', name: 'Low Pressure Fuel Pump', series: [], category: 'Fuel system', stockStatus: 'Checked by pump PN — new and reman options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: 'E0060704101', name: 'High Pressure Pump', series: [], category: 'Fuel system', stockStatus: 'Quoted by engine serial — OEM and alternative options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5360900250', name: 'Fuel Delivery Pump', series: [], category: 'Fuel system', stockStatus: 'Checked by engine application', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5360702032', name: 'Fuel Line', series: [], category: 'Fuel system', stockStatus: 'Quoted by part number and engine installation', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5501801015', name: 'Pressure Relief Valve', series: [], category: 'Fuel system', stockStatus: 'Quoted per unit', replacementFor: ['5501801115'], hsCode: '8481.40' },
    // ── MTU 2000 Injector Parts ──
    { partNumber: '0030176421', name: 'Nozzle Holder with Nozzle', series: [], category: 'Fuel system', stockStatus: 'Checked by injector PN — new and reman options', replacementFor: ['0040175021'], hsCode: '8413.30' },
    { partNumber: '0010175412', name: 'Nozzle', series: [], category: 'Fuel system', stockStatus: 'Common injector service part', replacementFor: [], hsCode: '8413.30' },
    // ── MTU 2000 Cooling ──
    { partNumber: 'X00022524', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: ['X00008653'], hsCode: '8413.30' },
    { partNumber: '5502003201', name: 'Seawater Pump', series: [], category: 'Cooling system', stockStatus: 'Checked by pump model — new and reman options', replacementFor: [], hsCode: '8413.70' },
    { partNumber: '5502002002', name: 'Drive Shaft', series: [], category: 'Drive components', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '8483.10' },
    { partNumber: '5502040906', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5502030060', name: 'Sight Glass', series: [], category: 'Cooling system', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7017.90' },
    // ── MTU 2000 Filters ──
    { partNumber: '5501800016', name: 'Oil Filter Element', series: ['MTU 396'], category: 'Filters', stockStatus: 'Availability checked per inquiry', replacementFor: [], weightKg: '0.658 KG', hsCode: '84212300' },
    { partNumber: '0010928801', name: 'Fuel Prefilter', series: [], category: 'Filters', stockStatus: 'Common consumable — typically in stock', replacementFor: [], hsCode: '8421.23' },
    { partNumber: '0030944304', name: 'Air Filter', series: [], category: 'Filters', stockStatus: 'Common consumable — bulk quantities available', replacementFor: ['0030947404', '0030948104'], hsCode: '8421.31' },
    { partNumber: '0180944502', name: 'Prefilter', series: [], category: 'Filters', stockStatus: 'Common consumable item', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '0170942502', name: 'Air Filter', series: [], category: 'Filters', stockStatus: 'Common consumable — typically in stock', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '5360900001', name: 'Air Filter', series: [], category: 'Filters', stockStatus: 'Common consumable item', replacementFor: [], hsCode: '8421.31' },
    // ── MTU 2000 Bearings ──
    { partNumber: '5500511710', name: 'Camshaft Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '4420302240', name: 'Main Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade (STD/0.25/0.50)', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5700510150', name: 'Bushing', series: [], category: 'Bearings', stockStatus: 'Quoted per unit', replacementFor: ['5500550550', '5240550550'], hsCode: '8483.30' },
    // ── MTU 2000 Lubrication ──
    { partNumber: '5500100061', name: 'Oil Separator', series: [], category: 'Lubrication', stockStatus: 'Quoted per unit — OEM and alternative options', replacementFor: ['5410100163'], hsCode: '8421.29' },
    { partNumber: '4221880001', name: 'Oil Cooler', series: [], category: 'Lubrication', stockStatus: 'Checked by engine model — new and reman options', replacementFor: ['0021882301'], hsCode: '8419.50' },
    { partNumber: '4231801101', name: 'Oil Pump', series: [], category: 'Lubrication', stockStatus: 'Checked by pump PN — new and reman options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5361800515', name: 'Oil Pressure Relief Valve', series: [], category: 'Lubrication', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8481.40' },
    // ── MTU 2000 Sensors ──
    { partNumber: '0005358233', name: 'Speed Sensor', series: [], category: 'Sensors and electrical', stockStatus: 'Common sensor — typically in stock', replacementFor: ['0005357933', '0005357633'], hsCode: '9032.89' },
    { partNumber: '0035352531', name: 'Pressure Sensor', series: [], category: 'Sensors and electrical', stockStatus: 'Common sensor — typically in stock', replacementFor: ['0035352731', '0035351731', '0035352931'], hsCode: '9032.89' },
    { partNumber: '0005356430', name: 'Temperature Sensor', series: [], category: 'Sensors and electrical', stockStatus: 'Common sensor — typically in stock', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0005355103', name: 'Level Monitor', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number and connector type', replacementFor: ['0005355303'], hsCode: '9032.89' },
    { partNumber: '5205304531', name: 'Pressure Sensor', series: ['MTU 4000'], category: 'Sensors and electrical', stockStatus: 'Common sensor — typically in stock', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0045426917', name: 'Temperature Monitor', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0001536132', name: 'Pressure Monitor', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '5205304131', name: 'Travel Sensor', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by engine application', replacementFor: [], hsCode: '9032.89' },
    // ── MTU 2000 Turbocharger ──
    { partNumber: '5310900337', name: 'Charge Air Line', series: [], category: 'Turbocharging', stockStatus: 'Quoted by part number and engine variant', replacementFor: [], hsCode: '8414.90' },
    { partNumber: '5120850560', name: 'Piston Ring for Turbocharger', series: [], category: 'Turbocharging', stockStatus: 'Small part — commonly in stock', replacementFor: ['5100850060'], hsCode: '8414.90' },
    { partNumber: '5361420025', name: 'Diffuser Exhaust', series: [], category: 'Turbocharging', stockStatus: 'Quoted by turbo model', replacementFor: [], hsCode: '8414.90' },
    // ── MTU 2000 Cylinder Head ──
    { partNumber: '5610105420', name: 'Cylinder Head', series: [], category: 'Cylinder heads', stockStatus: 'Quoted by engine variant — OEM and alternative options', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500100330', name: 'Cylinder Head Cover', series: [], category: 'Cylinder heads', stockStatus: 'Quoted by engine variant', replacementFor: ['5500160405'], hsCode: '8409.91' },
    { partNumber: '5500530232', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500531231', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500225', name: 'Roller Tappet', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '4760500025', name: 'Tappet', series: [], category: 'Valve train', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500333', name: 'Rocker Arm Inlet', series: [], category: 'Valve train', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5500500334', name: 'Rocker Arm Exhaust', series: [], category: 'Valve train', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8409.91' },

    // ── MTU 396 Overhaul Parts ──
    { partNumber: '5320110110', name: 'Cylinder Liner', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade — standard grade commonly available', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5320100130', name: 'Cylinder Head Cover', series: ['MTU 396'], category: 'Cylinder heads', stockStatus: 'Quoted by engine variant', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410500227', name: 'Exhaust Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: ['5110200278'], hsCode: '8409.91' },
    { partNumber: '4570530001', name: 'Inlet Valve', series: ['MTU 396'], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410370220', name: 'Piston Pin', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5410380250', name: 'Conrod Bushing', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5320530020', name: 'Valve Spring', series: ['MTU 396'], category: 'Valve train', stockStatus: 'Common overhaul item — kit pricing available', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530225', name: 'Valve Spring Retainer', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530226', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410530532', name: 'Valve Seat Insert Exhaust', series: [], category: 'Valve train', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410532131', name: 'Valve Seat Insert Inlet', series: [], category: 'Valve train', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5410532730', name: 'Valve Guide', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: [], hsCode: '8409.91' },
    // ── MTU 396 Bearings ──
    { partNumber: '5410330605', name: 'Crankshaft Bearing Size 0-0', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5410337101'], hsCode: '8483.30' },
    { partNumber: '5090200512', name: 'Thrust Bearing', series: [], category: 'Bearings', stockStatus: 'Checked by engine serial', replacementFor: ['5110200412'], hsCode: '8483.30' },
    { partNumber: '5110252210', name: 'Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5370550050', name: 'Bushing', series: [], category: 'Bearings', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8483.30' },
    // ── MTU 396 Lubrication ──
    { partNumber: '5410100163', name: 'Oil Separator', series: ['MTU 396'], category: 'Lubrication', stockStatus: 'Quoted per unit — OEM and alternative options', replacementFor: [], hsCode: '8421.29' },
    { partNumber: '5321800001', name: 'Oil Pump', series: [], category: 'Lubrication', stockStatus: 'Checked by pump PN — new and reman options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5321800143', name: 'Oil Spray Nozzle', series: [], category: 'Lubrication', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.99' },
    // ── MTU 396 Fuel ──
    { partNumber: '5320700246', name: 'Relief Valve', series: ['MTU 396'], category: 'Fuel system', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8481.40' },
    { partNumber: '5410180233', name: 'Diaphragm for Oil Separator', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 396 Filters ──
    { partNumber: '5320900001', name: 'Air Filter', series: [], category: 'Filters', stockStatus: 'Common consumable — typically in stock', replacementFor: [], hsCode: '8421.31' },
    { partNumber: '0000921705', name: 'Filter Element', series: [], category: 'Filters', stockStatus: 'Common consumable — bulk quantities available', replacementFor: [], hsCode: '8421.23' },
    // ── MTU 396 Cooling ──
    { partNumber: '5592010307', name: 'Impeller', series: [], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5110812603', name: 'Heat Shield', series: [], category: 'Turbocharging', stockStatus: 'Quoted by turbo model', replacementFor: ['5110820226', '5120820226'], hsCode: '8414.90' },
    // ── MTU 396 Seals / Gaskets ──
    { partNumber: '5532031580', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: ['5532030080'], hsCode: '8484.10' },
    { partNumber: '5372030880', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320160221', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320980080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5320140022', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5550630180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4571410080', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0029977940', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — bulk quantities available', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000170660', name: 'Ce Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 396 Sensors ──
    { partNumber: '0005353960', name: 'Thermocouple', series: [], category: 'Sensors and electrical', stockStatus: 'Checked by connector type and engine variant', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '8495340000', name: 'Solenoid Valve', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number — OEM and alternative options', replacementFor: ['0005342732'], hsCode: '8481.80' },

    // ── MTU 595 Overhaul Parts ──
    { partNumber: '5840111810', name: 'Cylinder Liner Size 0', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300917', name: 'Piston', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade — OEM and alternative options', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300020-42', name: 'Connecting Rod', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by engine serial', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840300615', name: 'Piston Skirt', series: [], category: 'Pistons and liners', stockStatus: 'Quoted with matching piston crown', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840371625', name: 'Piston Crown', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by engine serial and crown PN', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5840530129', name: 'Valve Guide Inlet Size 0', series: [], category: 'Valve train', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5840900595', name: '2/2-Way Solenoid Valve', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number', replacementFor: ['5840980257'], hsCode: '8481.80' },
    { partNumber: '5840900054', name: 'Valve Housing', series: [], category: 'Valve train', stockStatus: 'Quoted by engine variant', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5840700632-87', name: 'HP Fuel Line', series: [], category: 'Fuel system', stockStatus: 'Quoted by part number and engine installation', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5840782802', name: 'Supply Pipe', series: [], category: 'Fuel system', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5841400344', name: 'Flange', series: [], category: 'Cooling system', stockStatus: 'Quoted by part number', replacementFor: ['8490740063'], hsCode: '8419.50' },
    { partNumber: '5841800175', name: 'Oil Thermostat', series: [], category: 'Lubrication', stockStatus: 'Quoted by engine application', replacementFor: [], hsCode: '9032.10' },
    { partNumber: '5842040714', name: 'Coolant Pump Shaft', series: [], category: 'Cooling system', stockStatus: 'Quoted by pump model', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5842032780', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5842040180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },

    // ── MTU 956 / 1163 Parts ──
    { partNumber: '5550105141', name: 'Cylinder Head with Valve', series: ['MTU 956', 'MTU 1163'], category: 'Cylinder heads', stockStatus: 'Quoted by engine variant — OEM and alternative options', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5550161420', name: 'Cylinder Head Gasket', series: ['MTU 956', 'MTU 1163'], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: ['5550162320', '5550162420'], hsCode: '8484.10' },
    { partNumber: '5550302160', name: 'Conrod Bearing Size 0-0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '5550307540', name: 'Crankshaft Bearing Size 0-0', series: ['MTU 956', 'MTU 1163'], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5550330130'], hsCode: '8483.30' },
    { partNumber: '5550530105', name: 'Exhaust Valve', series: ['MTU 956', 'MTU 1163'], category: 'Valve train', stockStatus: 'Common overhaul item — standard grade in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5550100051', name: 'Nozzle Holder with Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system', stockStatus: 'Checked by injector PN — new and reman options', replacementFor: ['5550100651', '5550102451'], hsCode: '8413.30' },
    { partNumber: '5552010005', name: 'Coolant Pump Shaft', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: 'Quoted by pump model', replacementFor: ['5562010105'], hsCode: '8413.30' },
    { partNumber: '5592010007', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: ['5592010307'], hsCode: '8413.30' },
    { partNumber: '8490740063', name: 'Flange', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: 'Quoted by part number', replacementFor: ['5841400344'], hsCode: '8419.50' },
    { partNumber: '5551800015', name: 'Pressure Limiting Valve', series: ['MTU 956', 'MTU 1163'], category: 'Fuel system', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8481.40' },
    { partNumber: '5550101251', name: 'Oil Spray Nozzle', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5551800122', name: 'Oil Line', series: ['MTU 956', 'MTU 1163'], category: 'Lubrication', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5582040406', name: 'Impeller', series: ['MTU 956', 'MTU 1163'], category: 'Cooling system', stockStatus: 'Common service item — typically in stock', replacementFor: ['5802040806'], hsCode: '8413.30' },
    { partNumber: '5552030388', name: 'Slide Valve', series: ['MTU 956', 'MTU 1163'], category: 'Control components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8481.20' },

    // ── MTU 183 Parts ──
    { partNumber: '0031845201', name: 'Oil Filter Spin-On', series: [], category: 'Filters', stockStatus: 'High-volume consumable — typically in stock', replacementFor: ['0031845301'], hsCode: '8421.23' },

    // ── Common O-Rings & Small Parts (MTU multi-series) ──
    { partNumber: '700429260000', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — bulk quantities available', replacementFor: ['0019972348', '0089977545'], hsCode: '8484.10' },
    { partNumber: '700429050003', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '8699970213', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '700429021000', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — bulk quantities available', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP51529700004', name: 'Rotary Seal', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP51529700005', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000180680', name: 'Gasket', series: ['MTU 396', 'MTU 4000'], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '007603016105', name: 'Copper Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000530826', name: 'Valve Collet', series: [], category: 'Valve train', stockStatus: 'Small part — commonly in stock', replacementFor: ['0000530126'], hsCode: '8409.91' },
    { partNumber: '0000530361', name: 'Valve Stem Seal', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — commonly in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '3669900240', name: 'Washer Valve Spring', series: ['MTU 396'], category: 'Valve train', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '8699970499', name: 'Radial-Lip Shaft Seal', series: [], category: 'Gaskets and seals', stockStatus: 'Quoted per unit', replacementFor: ['8699970497', '8699970498'], hsCode: '8484.10' },
    { partNumber: '0009953502', name: 'Clamp', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.19' },
    // ── Additional MTU 2000 Engine Components ──
    { partNumber: '5311550215', name: 'Belt Pulley for Generator', series: [], category: 'Drive components', stockStatus: 'Quoted by engine application', replacementFor: [], hsCode: '8483.50' },
    { partNumber: '5360320014', name: 'Sleeve Wear Front Crankshaft', series: [], category: 'Engine components', stockStatus: 'Quoted by engine serial', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5500160597', name: 'Clamp', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.19' },
    { partNumber: 'X00027830', name: 'Cylinder Liner Size 0 C23', series: ['MTU 4000'], category: 'Pistons and liners', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5240530830', name: 'Valve Guide', series: [], category: 'Valve train', stockStatus: 'Quoted per unit or set', replacementFor: [], hsCode: '8409.91' },
    { partNumber: '5240382550', name: 'Bushing Conrod Size 0', series: [], category: 'Pistons and liners', stockStatus: 'Quoted by size grade', replacementFor: ['5240382650'], hsCode: '8409.99' },
    // ── Additional MTU 2000 Gaskets ──
    { partNumber: '4471870180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0000160119', name: 'Sealing Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420160420', name: 'Cylinder Head Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420150060', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '4420110059', name: 'Tombak Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5030210580', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5532031280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5541870180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5700150380', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5362030180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5502010280', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5760550180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5760550280', name: 'Profile Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5730110180', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    // ── MTU 2000 Additional Sensors/Electrical ──
    { partNumber: '0001536720', name: 'Speed Sensor', series: [], category: 'Sensors and electrical', stockStatus: 'Common sensor — typically in stock', replacementFor: ['0005357333', '0005357833'], hsCode: '9032.89' },
    { partNumber: '5205304069', name: 'Speed Transmitter', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '5255380580', name: 'Memory Module', series: [], category: 'Sensors and electrical', stockStatus: 'Quoted by engine serial and ECU version', replacementFor: [], hsCode: '9032.89' },
    // ── MTU 2000 Drive Components ──
    { partNumber: '5501800106', name: 'Idler Gear', series: [], category: 'Drive components', stockStatus: 'Quoted by engine variant', replacementFor: [], hsCode: '8483.40' },
    { partNumber: '5272010505', name: 'Shaft Water Pump', series: [], category: 'Drive components', stockStatus: 'Quoted by pump model', replacementFor: [], hsCode: '8483.10' },
    { partNumber: '5502040176', name: 'Plate Control Washer', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5502010276', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5760110062', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5360330262', name: 'Thrust Washer', series: [], category: 'Drive components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '7318.22' },
    { partNumber: '5802040072', name: 'Nut', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.16' },
    { partNumber: '5769900619', name: 'Stress Bolt', series: [], category: 'Drive components', stockStatus: 'Always replaced as a set', replacementFor: ['5809900819'], hsCode: '7318.15' },
    { partNumber: '5249900605', name: 'Bolt Hex Cap', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.15' },
    // ── MTU 396 Additional Parts ──
    { partNumber: '5592001001/31', name: 'Coolant Pump', series: [], category: 'Cooling system', stockStatus: 'Checked by pump model — new and reman options', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5100200212', name: 'Thrust Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: ['5090200512'], hsCode: '8483.30' },
    { partNumber: '5500706932', name: 'Leak Off Line', series: [], category: 'Fuel system', stockStatus: 'Quoted by part number', replacementFor: [], hsCode: '8413.30' },
    { partNumber: '5500110559', name: 'O-Ring', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable — typically in stock', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '5550160071', name: 'Plug', series: [], category: 'Fasteners and retaining rings', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5590981585', name: 'Support Plate', series: [], category: 'Engine components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '5562030980', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: '0002036946', name: 'Cooler Plate', series: [], category: 'Cooling system', stockStatus: 'Quoted by engine model', replacementFor: [], hsCode: '8419.50' },
    { partNumber: '23504304', name: 'Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted by size grade', replacementFor: [], hsCode: '8483.30' },
    { partNumber: '23523615', name: 'Clamp', series: [], category: 'Drive components', stockStatus: 'Small part — commonly in stock', replacementFor: [], hsCode: '7318.19' },
    { partNumber: '000625900175', name: 'Grooved Ball Bearing', series: [], category: 'Bearings', stockStatus: 'Quoted per unit', replacementFor: ['0059812225'], hsCode: '8482.10' },
    { partNumber: '0005330760', name: 'Gasket', series: [], category: 'Gaskets and seals', stockStatus: 'Common service item', replacementFor: [], hsCode: '8484.10' },
    { partNumber: 'XP52807300012', name: 'Thermocouple', series: [], category: 'Sensors and electrical', stockStatus: 'Checked by connector type', replacementFor: [], hsCode: '9032.89' },
    { partNumber: '0009922130', name: 'Clamping Element', series: [], category: 'Drive components', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '7318.19' },
    { partNumber: '0020371319', name: 'Rectangular Ring', series: [], category: 'Pistons and liners', stockStatus: 'Quoted per unit', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080375619', name: 'Rectangular-Section Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set item', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0080370018', name: 'Oil Control Ring', series: [], category: 'Pistons and liners', stockStatus: 'Standard ring set item', replacementFor: [], hsCode: '8409.99' },
    { partNumber: '0002040479', name: 'Cup Seal', series: [], category: 'Gaskets and seals', stockStatus: 'Small consumable', replacementFor: [], hsCode: '8484.10' },
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
      availability: 'Stock, replacement status, lead time, and shipping route confirmed after inquiry.',
      stockStatus: seed.stockStatus ?? cat.stockStatus,
      applications: cat.applications,
      notes: [
        'Confirm engine model, serial number, required quantity, and destination before ordering.',
        'Send old part photos or nameplate details when markings or replacement status are unclear.',
      ],
      replacementFor,
      weightKg: spec.weightKg ?? seed.weightKg ?? cat.weightKg,
      hsCode: spec.hsCode ?? seed.hsCode ?? cat.hsCode,
      commonFailureScenarios: seed.commonFailureScenarios ?? undefined,
      orderingNotes: seed.orderingNotes ?? undefined,
      applicableEngines: spec.applicableEngines ?? seed.applicableEngines ?? inferEngineType(seed.series),
      leadTime: spec.leadTime ?? seed.leadTime ?? inferLeadTime(seed.category),
      dimensions: spec.dimensions ?? seed.dimensions ?? 'Confirm by part number, old-part photo, or catalog drawing',
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
    'fuel pressure is unstable, injector balance is poor, or the engine shows hard-start symptoms',
    'the old part number is superseded and the correct replacement route needs confirmation',
    'fleet operators need a verified spare before scheduled engine service',
  ],
  'Filters': [
    'oil, fuel, or air filter intervals are due and bulk replenishment is required',
    'filter restriction, water contamination, or pressure drop is found during service',
    'mixed filter lists need line-by-line confirmation before dispatch',
  ],
  'Sensors and electrical': [
    'alarm history points to a speed, pressure, temperature, or level signal fault',
    'connector type, signal range, or ECU version must be matched before replacement',
    'a vessel or generator set needs an urgent electrical spare to reduce downtime',
  ],
  'Gaskets and seals': [
    'oil, coolant, or exhaust leakage is found during inspection',
    'the engine is opened for overhaul and one-time-use seals must be replaced',
    'material grade, thickness, or sealing position must be confirmed before order',
  ],
  'Cooling system': [
    'coolant temperature is high, seawater flow is weak, or pump wear is visible',
    'pump, impeller, flange, or cooler parts are needed for scheduled maintenance',
    'marine and generator installations require the correct cooling-system variant',
  ],
  'Pistons and liners': [
    'compression loss, liner wear, scoring, or high oil consumption is reported',
    'size grade must match the engine overhaul specification',
    'a major overhaul list needs matched piston, ring, liner, and bearing references',
  ],
  'Bearings': [
    'crankshaft, conrod, camshaft, or thrust bearing clearance is outside service limits',
    'standard or size-grade selection must be checked before quoting',
    'major overhaul parts are being purchased as a matched set',
  ],
  'Valve train': [
    'compression loss, valve-seat wear, or abnormal exhaust temperature is found',
    'cylinder-head overhaul requires matched valves, guides, springs, and collets',
    'installation position and engine series must be confirmed before dispatch',
  ],
  'Turbocharging': [
    'boost pressure, exhaust temperature, or turbocharger vibration is outside normal range',
    'wheel, seal, bearing, or housing compatibility must be checked against turbo model',
    'a reman or replacement turbo route is being evaluated for urgent downtime',
  ],
  'Lubrication': [
    'oil pressure, oil temperature, or lube-system contamination requires service',
    'pump, cooler, nozzle, or separator references must be verified by engine model',
    'overhaul buyers need lubrication items quoted with the main parts list',
  ],
  'Drive components': [
    'bolts, clamps, washers, couplings, or small hardware are replaced during assembly',
    'single-use fasteners need confirmation by assembly position',
    'service teams need small parts included with the main overhaul shipment',
  ],
  'Engine components': [
    'the part is part of a scheduled overhaul or urgent downtime repair',
    'the old number, engine serial number, and installation position need cross-checking',
    'buyers need a verified replacement option before arranging international shipping',
  ],
};

const highValueQuoteChecklist = (part: MtuPart, seriesText: string) => [
  `Exact part number: ${part.partNumber}`,
  `Part name or assembly position: ${part.name}`,
  `Engine model / series: ${seriesText}`,
  'Engine serial number from nameplate',
  'Old-part photo showing number, connector, port, or size marking',
  'Required quantity and whether partial shipment is acceptable',
  'Destination country, delivery deadline, and preferred shipping method',
];

const highValueFaqs = (part: MtuPart, seriesText: string, scenarios: string[]) => {
  const replacementText = part.replacementFor && part.replacementFor.length > 0
    ? `${part.partNumber} may relate to ${part.replacementFor.join(', ')}. Final replacement status is checked against the engine serial number before quote.`
    : `${part.partNumber} is checked for supersession before quote. If there is a newer or reman route, we confirm it with the engine serial number and old-part photo.`;

  return [
    {
      question: `Does ${part.partNumber} fit ${seriesText}?`,
      answer: `${part.partNumber} ${part.name} is checked against ${seriesText}. Final fitment depends on the engine serial number, rating, and installation position.`,
    },
    {
      question: `What information is needed to quote ${part.partNumber}?`,
      answer: `Send the part number, engine model, engine serial number, old-part photo, quantity, destination country, and required delivery date. This lets us confirm stock route, packing, and shipping options.`,
    },
    {
      question: `Can you check alternatives or superseded numbers for ${part.partNumber}?`,
      answer: replacementText,
    },
    {
      question: `When is ${part.partNumber} usually replaced?`,
      answer: scenarios.join('; ') + '.',
    },
  ];
};

const inferHighValueApplication = (part: MtuPart): string => {
  const hasSpecificEngineType = part.engineType && !/^Verify by engine serial number$/i.test(part.engineType);
  const hasSpecificApplicableEngines = part.applicableEngines && !/^Verify by engine serial number$/i.test(part.applicableEngines);

  if (part.series.length > 0) return part.series.join(', ');
  if (hasSpecificEngineType) return part.engineType!;
  if (hasSpecificApplicableEngines) return part.applicableEngines!;
  return 'MTU engine serial-number verified applications';
};

const inferNameSpecificScenarios = (part: MtuPart, fallback: string[]) => {
  const name = part.name.toLowerCase();

  if (name.includes('filter') || name.includes('strainer')) {
    return [
      'scheduled service interval is due and the filter list needs line-by-line confirmation',
      'restriction, contamination, or pressure-drop alarms point to filter replacement',
      'fleet buyers need the same filter reference packed for repeated maintenance jobs',
    ];
  }
  if (name.includes('sensor') || name.includes('monitor') || name.includes('tachometer') || name.includes('actuator') || name.includes('solenoid')) {
    return [
      'ECU alarms, unstable signal readings, or intermittent shutdown events require electrical diagnosis',
      'connector, voltage, signal range, and installation position must match the old part',
      'urgent replacement is needed to restore engine monitoring or control functions',
    ];
  }
  if (name.includes('gasket') || name.includes('seal') || name.includes('o ring') || name.includes('o-ring') || name.includes('ring sealing')) {
    return [
      'oil, coolant, air, or exhaust leakage is found during inspection',
      'the engine is opened for overhaul and one-time-use sealing parts must be replaced',
      'material, section shape, and sealing position need confirmation from the old part or catalog drawing',
    ];
  }
  if (name.includes('bearing')) {
    return [
      'bearing clearance, surface scoring, or abnormal crankshaft/camshaft wear is found during overhaul',
      'standard or size-grade selection must be confirmed before shipment',
      'buyers need matched bearing references for the same overhaul kit',
    ];
  }
  if (name.includes('valve') || name.includes('nozzle') || name.includes('injector')) {
    return [
      'combustion quality, fuel delivery, compression, or exhaust temperature is outside normal range',
      'installation position and matched mating parts must be checked before replacement',
      'overhaul buyers need verified valve, nozzle, injector, or pump references before dispatch',
    ];
  }
  if (name.includes('pump') || name.includes('impeller') || name.includes('cooler')) {
    return [
      'coolant, seawater, fuel, or oil flow is weak or temperature is above normal range',
      'flange, port, drive, and installation variant must match the existing assembly',
      'scheduled marine or generator maintenance requires a verified replacement route',
    ];
  }
  if (name.includes('ring') || name.includes('liner') || name.includes('piston')) {
    return [
      'compression loss, liner scoring, high blow-by, or oil consumption is reported',
      'size grade and matched cylinder components must be confirmed for the overhaul scope',
      'a major overhaul list needs piston, ring, liner, and bearing references checked together',
    ];
  }

  return fallback;
};

const enrichHighValuePart = (part: MtuPart): MtuPart => {
  if (!highValuePartNumbers.has(part.partNumber)) return part;

  const seriesText = inferHighValueApplication(part);
  const scenarios = inferNameSpecificScenarios(part, highValueScenarios[part.category] ?? highValueScenarios['Engine components']);
  const hasSpecificApplicableEngines = part.applicableEngines && !/^Verify by engine serial number$/i.test(part.applicableEngines);
  const applicationText = hasSpecificApplicableEngines
    ? part.applicableEngines!
    : `${seriesText}; final fitment is confirmed by engine serial number and parts-catalog position.`;

  // 第二句按真实数据变化（类目 + NATO + 替代号数量），避免 700+ 页共享同一字节级句子
  const natoRef = part.natoNumber && !/^n\/a$/i.test(part.natoNumber.trim()) ? part.natoNumber.trim() : '';
  const recordBits: string[] = [];
  if (natoRef) recordBits.push(`NATO ${natoRef}`);
  if (part.replacementFor && part.replacementFor.length > 0) {
    recordBits.push(`${part.replacementFor.length} superseded reference${part.replacementFor.length > 1 ? 's' : ''} traced`);
  }
  const recordText = recordBits.length > 0 ? ` ${recordBits.join('; ')} on record.` : '';

  return {
    ...part,
    summary: part.hasCatalogDetails ? part.summary : `${part.partNumber} ${part.name}. Request a part-number and engine-serial check before quotation.${recordText}`,
    description: part.description,
    commonFailureScenarios: part.commonFailureScenarios ?? scenarios,
    orderingNotes: part.orderingNotes ?? `For ${part.partNumber}, send the engine model, serial number, quantity, old-part photo, and destination country. We will confirm whether the item is OEM, OEM-alternative, reman, or superseded before quotation.`,
    applicableEngines: applicationText,
    leadTime: part.leadTime ?? 'Priority stock check; fastest available OEM, OEM-alternative, or reman route quoted per inquiry',
    quoteChecklist: part.quoteChecklist ?? highValueQuoteChecklist(part, seriesText),
    faqs: part.faqs ?? highValueFaqs(part, seriesText, part.commonFailureScenarios ?? scenarios),
    imageAlt: part.imageAlt ?? `${part.partNumber} ${part.name} - MTU ${part.category} catalog reference`,
    notes: Array.from(new Set([
      ...part.notes,
      'Priority item: part number, supersession, and export packing details are checked before quote.',
    ])),
  };
};

const readableName = sentencePartName;

const seriesPhrase = (series: string[]) =>
  series.length === 0 ? 'MTU' : series.length === 1 ? series[0] : `${series.slice(0, -1).join(', ')} and ${series[series.length - 1]}`;

const catalogImageAlt = (part: MtuPart, series: string[]) =>
  `${standardPartName(part.name)} ${part.partNumber} for ${seriesPhrase(series)} engines`;

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

  const article = /^[aeiou]|^(HP|LP|NTC)\b/i.test(name) ? 'an' : 'a';
  const where = model ? `the MTU ${model.toUpperCase()}` : `${seriesPhrase(series)} engines`;
  sentences.push(
    assembly
      ? `${part.partNumber} is ${article} ${name} from the ${readableName(assembly)} group of ${where}.`
      : `${part.partNumber} is ${article} ${name} catalogued for ${where}.`,
  );

  const replaces = crossReferences.filter((ref) => ref.relationship === 'replaces').map((ref) => ref.partNumber);
  const replacedBy = crossReferences.filter((ref) => ref.relationship === 'replaced-by').map((ref) => ref.partNumber);
  if (replaces.length > 0) {
    sentences.push(`It is the later number for ${replaces.slice(0, 4).join(', ')}${replaces.length > 4 ? ` and ${replaces.length - 4} more earlier references` : ''}, so lists quoting ${replaces.length === 1 ? 'that number' : 'those numbers'} are normally supplied as ${part.partNumber}.`);
  }
  if (replacedBy.length > 0) {
    sentences.push(`Catalog history lists ${replacedBy[0]} as its later number; we check whether the later part can be fitted alone or needs related parts changed with it.`);
  }

  const weight = detail.weightKg.trim();
  if (weight && !/^n\/a$/i.test(weight)) {
    sentences.push(`The catalog unit weight is ${weight.toLowerCase()}, which we use to estimate freight before quoting.`);
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
    summary: `${part.partNumber} ${part.name}. Listed in ${uniqueSeries.join(', ') || 'MTU'} catalog references; confirm installation and current availability before ordering.`,
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
    ...(rest.length > 0 ? [`Also catalogued as: ${rest.map((part) => part.name).join('; ')}.`] : []),
  ]));

  const replacementFor = Array.from(new Set(all.flatMap((part) => part.replacementFor ?? [])));
  if (replacementFor.length > 0) merged.replacementFor = replacementFor;

  const bestImage = all.find((part) => isRealPartImage(part.image));
  if (bestImage) merged.image = bestImage.image;

  // Variants are ranked best-first, so the first filled value is the richest one.
  const isGeneratedCatalogText = (value: string) => value.startsWith(`${primary.partNumber} is `);
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
      if (!note.startsWith('Also catalogued as: ')) return [swap(note)];
      const variants = [...new Set(note.slice(20, -1).split('; ').map(standardPartName))].filter((variant) => variant !== name);
      return variants.length > 0 ? [`Also catalogued as: ${variants.join('; ')}.`] : [];
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
    Boolean(part.engineType?.trim()) && !/^Verify by engine serial number$/i.test(part.engineType!);
  const hasSpecificFitment =
    Boolean(part.applicableEngines?.trim()) &&
    !/^Verify by engine serial number$/i.test(part.applicableEngines!);
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
    title: 'MTU 2000 Series Parts Catalog',
    h1Title: 'MTU 2000 Series Engine Parts',
    summary: 'Complete parts catalog for MTU 2000 series diesel engines — marine, industrial, generator, and rail applications.',
    description: 'Browse MTU 2000 series parts by category: pistons, liners, bearings, valves, gaskets, fuel system, cooling, turbocharging, sensors, and filters. Each part is verified by part number and engine serial number before quotation.',
    searchTopics: [
      {
        title: 'MTU 16V 2000 Engine Parts',
        description: 'Parts support for 16V 2000 marine, generator, rail, and industrial engines, checked by full model and serial number.',
        href: '/products/mtu-2000-series-parts/16v-2000-engine-parts/',
      },
      {
        title: 'MTU 16V 2000 M96L Engine Parts',
        description: 'Marine propulsion and yacht-engine parts checked against the complete M96L serial and component references.',
        href: '/products/mtu-2000-series-parts/mtu-m96l-engine-parts/',
      },
      {
        title: 'MTU 2000 Marine Engine Parts',
        description: 'Service and overhaul parts for propulsion, auxiliary-power, and onboard generator applications.',
        href: '/products/mtu-2000-series-parts/marine-generator-service-parts/',
      },
    ],
    longDescription: `The MTU 2000 series is one of the most widely deployed diesel engine families in the world, powering everything from fast ferries and naval vessels to generator sets and locomotives. Available in 8V, 12V, 16V, and 18V configurations across multiple power ratings (M84, M91, M93, M94, M96), these engines share a common parts architecture that makes maintenance programs predictable — but also demanding when parts are needed urgently.

    Catalog listings identify part numbers and component families, but they do not establish fitment for every engine build. The complete model, serial number, and installation position are needed to check the offered replacement. Public catalog references are distinguished from confirmed measurements and current supply information.

    Catalog references include cylinder-head gaskets, fuel injectors, service filters, sensors, and sealing components. Stock, dimensions, supplied condition, and lead time are confirmed for the exact reference in the quotation, rather than inferred from a series name.

    If you are maintaining a fleet of MTU 2000 engines — whether in a shipyard, a power plant, or a rail depot — send us your parts list and engine serial numbers. We check availability line by line and quote practical shipping from Shanghai to your destination.`,
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('2000')),
  },
  {
    slug: 'mtu-4000-series',
    title: 'MTU 4000 Series Parts Catalog',
    h1Title: 'MTU 4000 Series Engine Parts',
    summary: 'Complete parts catalog for MTU 4000 series diesel engines — marine propulsion, power generation, locomotive, and heavy equipment.',
    description: 'Browse MTU 4000 series parts by category: cylinder liners, pistons, cylinder heads, bearings, valves, gaskets, fuel injection, cooling pumps, turbochargers, sensors, and filters. OEM and alternative options available.',
    searchTopics: [
      {
        title: 'MTU 12V 4000 Engine Parts',
        description: 'Fuel, cooling, filtration, sensor, turbocharger, and overhaul parts checked by exact 12V 4000 variant.',
        href: '/products/mtu-4000-series-parts/12v-4000-engine-parts/',
      },
      {
        title: 'MTU 16V 4000 Engine Parts',
        description: 'Parts support for 16V 4000 marine, locomotive, generator, and heavy industrial applications.',
        href: '/products/mtu-4000-series-parts/16v-4000-engine-parts/',
      },
      {
        title: 'MTU 4000 Overhaul Parts',
        description: 'Graded internal components and consolidated overhaul lists with line-by-line verification.',
        href: '/products/mtu-4000-series-parts/overhaul-parts/',
      },
    ],
    longDescription: `The MTU 4000 series represents the top tier of MTU's high-speed diesel engine range, with power outputs from 1,500 kW to over 4,300 kW in 12V, 16V, and 20V configurations. These engines are found in the world's most demanding applications: fast naval vessels, superyachts, offshore supply vessels, mission-critical data center generators, and heavy-haul locomotives.

    Cylinder liners, pistons, and bearings require size-grade and installation checks. Catalog references are starting points for identification, not proof of compatibility with every MTU 4000 build. The quotation should state the exact offered number and condition, including any replacement or exchange terms.

    For injector, pump, and control-component inquiries, retain the complete reference including prefixes and suffixes. For an overhaul, identify each component and size grade separately. Availability and shipping lead time depend on the offered item and are confirmed with the quotation.

    For major overhauls, we recommend sending a complete parts list with engine serial numbers. We verify each line item, flag any superseded part numbers, and quote shipping from Shanghai via express courier, air freight, or sea freight depending on urgency and part dimensions.`,
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('4000')),
  },
  {
    slug: 'mtu-396-series',
    title: 'MTU 396 Series Parts Catalog',
    h1Title: 'MTU 396 Series Engine Parts',
    summary: 'Parts catalog for legacy MTU 396 series engines — marine, industrial, and power generation applications.',
    description: 'Browse MTU 396 series parts including cylinder liners, pistons, bearings, valves, gaskets, fuel system, cooling, and turbocharger components. Legacy and superseded part numbers supported.',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('396')),
    longDescription: `For an MTU 396 parts request, retain the full nameplate designation and serial number. Legacy installations can have changed components, so include the number on the installed item as well as any old invoice or parts-list reference.

    Because the 396 series is now a legacy platform, OEM-route availability can be inconsistent. This is where our verification process adds value: we check each part number against your engine serial number, confirm whether superseded references apply, and quote OEM, OEM-alternative, reman, or replacement options with transparent lead times. Common 396 series requests include cylinder liners (5320110110), cylinder head covers (5320100130), exhaust valves (5410500227), inlet valves (4570530001), valve springs (5320530020), main and thrust bearings, oil pumps (5321800001), oil separators (5410100163), and turbocharger turbine wheels (5110800220/5110804420).

    For major overhauls, we recommend sending a complete parts list organized by engine serial number. Legacy engines often have running changes that affect part number compatibility — our verification step catches these before shipment.`,
  },
  {
    slug: 'mtu-595-series',
    title: 'MTU 595 Series Parts Catalog',
    h1Title: 'MTU 595 Series Engine Parts',
    summary: 'Parts catalog for MTU 595 series engines — heavy-duty marine and industrial power units.',
    description: 'Browse MTU 595 series parts: cylinder liners, pistons, connecting rods, gaskets, fuel lines, solenoid valves, cooling pumps, and turbocharger components.',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('595')),
    longDescription: `The MTU 595 series is a heavy-duty, high-output diesel engine platform designed for the most demanding marine and industrial applications. With bore sizes exceeding 200mm and power outputs per cylinder that place it firmly in the medium-speed engine category, the 595 series is found in naval combatants, large offshore supply vessels, and base-load power stations where reliability is non-negotiable.

    Parts for the 595 series reflect its heavy engineering heritage: cylinder liners weighing over 50 kg, pistons with separate crowns and skirts (5840371625 crown, 5840300615 skirt), connecting rods built for extreme cylinder pressures, and fuel systems operating at high injection pressures with HP fuel lines (5840700632-87) and solenoid valves (5840900595, 5840980257). Every component is size-graded and serial-number-specific.

    Because 595 series engines often serve in continuous-duty applications, parts traceability and documentation requirements can be stringent. We support part-number verification with engine serial numbers, provide HS codes and approximate weights for freight planning, and can quote with material certificates where required.`,
  },
  {
    slug: 'mtu-956-series',
    title: 'MTU 956 Series Parts Catalog',
    h1Title: 'MTU 956 Series Engine Parts',
    summary: 'Parts catalog for MTU 956 series engines — marine and heavy industrial applications.',
    description: 'Browse MTU 956 series parts: cylinder heads, gaskets, bearings, valves, injectors, cooling pumps, impellers, oil nozzles, and fuel system components.',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('956')),
    longDescription: `The MTU 956 series is a proven workhorse in the medium-speed diesel segment, powering naval vessels, commercial ships, and heavy industrial installations. It shares many design characteristics with the 1163 series, and parts frequently cross-reference between the two families. Cylinder heads (5550105141), gaskets (5550161420), bearings (5550302160, 5550307540), and cooling system components (5552010005) are among the most commonly requested parts.

    For 956 series engines still in active duty, parts availability can vary by region and engine variant. We verify each part number against your engine serial number, check for supersessions, and quote both OEM and OEM-alternative options. Marine-specific components like seawater pump impellers (5592010007) and oil spray nozzles (5550101251) are high-demand items where we typically maintain stock references.`,
  },
  {
    slug: 'mtu-1163-series',
    title: 'MTU 1163 Series Parts Catalog',
    h1Title: 'MTU 1163 Series Engine Parts',
    summary: 'Parts catalog for MTU 1163 series engines — high-output marine propulsion.',
    description: 'Browse MTU 1163 series parts: cylinder heads, bearings, valves, cooling system, fuel system, gaskets, and seals.',
    type: 'series',
    partFilter: (p) => p.series.some((s) => s.includes('1163')),
    longDescription: `MTU 1163 parts requests need the full engine designation, serial number and installation position. Catalog references include cylinder-head components, main bearings (5550330130), connecting rod bearings (5550302160) and cooling pump shafts (5562010105). Treat each reference as a separate identification task rather than a universally compatible 1163 part.

    Some public records list references under both 1163 and 956. That does not prove fitment across both families. Provide the engine serial number, installed component marking and drawing revision for an application-specific check. Access to a current manufacturer catalog and current stock is not established by this public listing.`,
  },

  // ── Category Hubs ──
  {
    slug: 'mtu-filters',
    title: 'MTU Oil, Fuel & Air Filters | Parts Catalog',
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

    Send part numbers, quantities, and destination to start an inquiry. Add label photos or a datasheet request when dimensions are unclear. Service intervals follow the engine's maintenance documentation and operating conditions.`,
    type: 'category',
    partFilter: (p) => p.category === 'Filters',
  },
  {
    slug: 'mtu-injectors',
    title: 'MTU Injectors & Nozzle Parts | Parts Catalog',
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

    If the fault relates to supply pressure rather than injection quality, use the dedicated MTU fuel-pump catalog. Pump quotations require the pump label, drive arrangement, installation position, engine model, and serial number.`,
    type: 'category',
    partFilter: (p) => p.category === 'Fuel system' && /(injector|nozzle)/i.test(p.name),
  },
  {
    slug: 'mtu-fuel-pumps',
    title: 'MTU Fuel Pumps | High & Low Pressure Parts Catalog',
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

    For an RFQ, send the complete pump number, engine model and serial number, pump nameplate photo, inlet and outlet orientation, quantity, destination, and required delivery date. For a remanufactured route, also confirm whether a serviceable core is available.`,
    type: 'category',
    partFilter: (p) => /fuel/i.test(`${p.name} ${p.category}`) && /pump/i.test(p.name),
  },
  {
    slug: 'mtu-turbocharger-parts',
    title: 'MTU Turbocharger Parts — Turbine Wheels, Housings, Seals | Parts Catalog',
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
    ],
    type: 'category',
    partFilter: (p) => p.category === 'Turbocharging',
    longDescription: `Separate a complete turbocharger from a rotating assembly, wheel, housing or sealing component. Request the turbocharger nameplate and complete assembly reference; an engine family alone does not identify the installed turbocharger build.

    Our turbocharger parts catalog covers the complete rotating assembly: turbine wheels (5110804420, 5110800220, 5110800420), compressor wheels (5090251301), bearing housings (5110803201), piston ring seals (5110850060, 5120850560), heat shields (5110812603, 5110820226), and diffusers (5361420025). We verify each part number against your turbocharger nameplate — not just the engine serial — because turbocharger variants within the same engine series can differ by application, power rating, and emissions certification.

    Common failure modes include foreign-object damage to turbine blades from intake debris or exhaust manifold fragments, bearing housing bore wear causing radial play and oil leakage into the exhaust stream, and heat shield cracking from thermal cycling on engines with frequent start-stop duty cycles. We quote new OEM, OEM-alternative, and remanufactured options with transparent lead times.`,
  },
  {
    slug: 'mtu-sensors',
    title: 'MTU Sensors & Electrical Components | Parts Catalog',
    h1Title: 'MTU Sensors & Electrical Parts',
    summary: 'MTU sensors and electrical components — speed sensors, pressure sensors, temperature sensors, level monitors, and solenoid valves.',
    description: 'Electrical and sensor parts require precise matching — connector type, thread size, and signal range vary by engine installation. We cross-check part numbers against engine serial numbers for MTU 2000, 4000, 396, and 595 series.',
    type: 'category',
    partFilter: (p) => p.category === 'Sensors and electrical',
    longDescription: `This catalog includes speed sensors such as 0005357633, pressure sensors such as 0035352231 and X00E50214075, temperature sensor 0005356430, and level monitor X00E50203659. Choose by the complete component marking and measuring position, not by connector appearance alone.

    Catalog history lists X00E50214075 as a later number for 0035352231 and X00E50203659 as a later number for 0005355103. These records need an engine-specific check. Similar numbers, including 0005356633 and 0005357633, must not be assumed interchangeable.

    Include the pressure range or temperature characteristic where marked, connector pin arrangement, mounting thread, and cable or probe length. An alarm alone does not identify a failed sensor; wiring and system diagnosis should accompany the parts request when available.

    Send a number and quantity to start. Photos, engine serial number, and any required drawing help resolve missing specifications before a replacement is quoted.`,
  },
  {
    slug: 'mtu-starter-motors-alternators',
    title: 'MTU Starter Motors & Alternators | Parts Catalog',
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

    For quotation, send the complete label number, engine model and serial number, system voltage, mounting and terminal photos, quantity, destination, and required delivery date. For alternators, include output rating and pulley details; for starters, include rotation and pinion information when available.`,
    type: 'category',
    partFilter: (p) => p.category === 'Starting and charging' || /(starter|alternator|three phase generator)/i.test(p.name),
  },
  {
    slug: 'mtu-gasket-kits',
    title: 'MTU Gaskets & Seal Kits | Parts Catalog',
    h1Title: 'MTU Gaskets, Seals & O-Rings',
    summary: 'MTU gaskets and seals — cylinder head gaskets, O-rings, sealing rings, shaft seals, and complete gasket kits.',
    description: 'Request individual MTU gaskets or an itemized overhaul sealing list. Confirm material, thickness, shape and installation position; stock and kit contents are checked for each quotation.',
    type: 'category',
    partFilter: (p) => p.category === 'Gaskets and seals',
    longDescription: `Gaskets, seals, and O-rings may be the smallest parts on an MTU engine by weight, but they are among the most consequential. A failed cylinder head gasket can pressurize the cooling system and cause overheating within minutes. A leaking turbocharger oil seal can empty the oil sump into the exhaust. A deteriorated O-ring on a fuel injector sleeve can allow combustion gas into the fuel return circuit. Every gasket and seal in this catalog has been selected because it serves a critical containment function.

    Catalog references include cylinder head gaskets (5240161580, 5410160920, 5550161420), O-rings (700429260000, 700429050003), shaft seals (8699970499, XP51529700004), sealing rings (007603016105) and valve stem seals (0000530361). Current stock and material grades remain subject to supplier confirmation. A gasket-set quote must identify its contents and quantities; a kit label alone does not establish complete coverage or a lower price.`,
  },
  {
    slug: 'mtu-pistons-liners',
    title: 'MTU Pistons, Liners & Rings | Parts Catalog',
    h1Title: 'MTU Pistons, Cylinder Liners & Ring Sets',
    summary: 'MTU piston assemblies, cylinder liners, piston rings, piston pins, and connecting rod components.',
    description: 'MTU piston, liner and ring references need component markings, size-grade documentation and engine serial-number checks. Supply condition and available grades are confirmed for the offered number.',
    type: 'category',
    partFilter: (p) => p.category === 'Pistons and liners',
    longDescription: `The piston-and-liner assembly is the heart of every MTU engine's combustion system. These are size-graded, precision-machined components where clearance between the piston skirt and cylinder liner is measured in hundredths of a millimeter. An incorrect size grade — even one step off — leads to scuffing, excessive oil consumption, or in severe cases, piston seizure. This is not a commodity part; it is an engineered assembly where the price of a mistake is measured in engine hours lost.

    Catalog references include cylinder liners (5240113410, 5320110110, 5840111810), pistons (5240303917, 5840300917), ring components (0120370618, 0090375019, 0080375819) and piston pins (5410370220). Request the included components and mating grades explicitly. Do not assume every grade code means a universal oversize increment; confirm it against the applicable drawing and offered unit.`,
  },
  {
    slug: 'mtu-valve-train',
    title: 'MTU Valve Train Parts — Valves, Springs, Guides, Tappets | Parts Catalog',
    h1Title: 'MTU Valve Train Components',
    summary: 'MTU valve train parts — inlet and exhaust valves, valve springs, spring retainers, collets, guides, tappets, and push rods.',
    description: 'Valve train wear directly affects compression, fuel efficiency, and exhaust emissions. We supply individual components and complete cylinder-head overhaul kits for MTU 2000, 4000, 396, and 595 series. Kit pricing available for overhaul quantities.',
    type: 'category',
    partFilter: (p) => p.category === 'Valve train',
  },
  {
    slug: 'mtu-bearings',
    title: 'MTU Engine Bearings — Crankshaft, Conrod, Camshaft, Thrust | Parts Catalog',
    h1Title: 'MTU Engine Bearings',
    summary: 'MTU bearings — crankshaft main bearings, connecting rod bearings, camshaft bearings, thrust bearings, and bushings.',
    description: 'Compare MTU main, connecting-rod, camshaft and thrust-bearing references. Specify shell position, grade markings, measured journal size and shaft repair history; available grades are checked per inquiry.',
    type: 'category',
    partFilter: (p) => p.category === 'Bearings',
    longDescription: `MTU engine bearings — crankshaft main bearings, connecting rod bearings, camshaft bearings, and thrust washers — are precision-graded components manufactured to tolerances that determine oil film thickness, load distribution, and ultimately engine life. A bearing set that is one size grade off will not "almost work"; it will wipe within the first hours of operation and take the crankshaft journal with it.

    Catalog references include main-bearing shells (5240334901, 5240335602, 5410330605), connecting-rod bearing components (5240383710, 5240382711, 5550302160), camshaft bearings (5240510110) and thrust components (5090200512, 5110200412, 5360330262). Confirm shell position and grade using applicable documentation and workshop measurements. No universal undersize increments or current stock grades are established by this catalog.`,
  },
  {
    slug: 'mtu-cylinder-heads',
    title: 'MTU Cylinder Heads & Covers | Parts Catalog',
    h1Title: 'MTU Cylinder Heads and Covers',
    summary: 'MTU cylinder heads, head assemblies, head covers and valve heads — referenced by engine series and build, checked by part number and serial number.',
    description: 'Browse MTU cylinder-head references for marine, generator, rail and industrial engines. Head assemblies, bare heads and covers are quoted against the exact part number, engine serial number, and installation position.',
    type: 'category',
    partFilter: (p) => p.category === 'Cylinder heads',
    longDescription: `The cylinder head is the most consequential single assembly on an MTU engine: it carries the valves, injector sleeves, and the fire deck seal, and it sets the compression that everything downstream depends on. A head that has been overheated even once may hold pressure today and crack under load next season — so head enquiries are quoted against the exact part number, engine serial number, and service history, not against a series name alone.

    Catalog references include complete head assemblies, bare heads, head covers, and valve-head components across Series 2000, 4000, 396, 956 and 1163 applications. When requesting a quotation, state whether the unit is required bare, assembled with valves, or with the injector sleeves fitted, and include the build code from the nameplate so the correct variant is identified before order confirmation.

    For overhaul programs, send the full parts list together with the engine model and serial number; heads are usually quoted alongside the gasket set, valve-train components, and injector sleeves that the same job consumes.`,
  },
  {
    slug: 'mtu-fasteners-retaining-rings',
    title: 'MTU Fasteners & Retaining Rings | Parts Catalog',
    h1Title: 'MTU Fasteners and Retaining Rings',
    summary: 'MTU bolts, screws, shims, snap rings, retaining rings and locking hardware — torque-to-yield stretch bolts quoted as single-use items.',
    description: 'MTU fasteners and retaining hardware by part number. Stretch bolts are single-use torque-to-yield items; grade markings and installation position are confirmed before quotation.',
    type: 'category',
    partFilter: (p) => p.category === 'Fasteners and retaining rings',
    longDescription: `Fasteners on a high-speed diesel are not commodity hardware. Cylinder-head bolts, connecting-rod bolts and main-bearing bolts on MTU engines are torque-to-yield (stretch) items: they are tightened to a specified elongation, they deform permanently on first installation, and they are single-use by design. Re-installing a used stretch bolt is one of the most common causes of head-gasket failure and joint relaxation, so overhaul quotations treat them as consumables rather than reusable stock.

    Catalog references include hex screws, grub and adjusting screws, banjo and hollow screws, shims, snap rings, retaining rings, circlip kits, locking plates, and threaded plugs across Series 2000, 4000, 396, 956, 1163 and 183 applications. Grade markings, thread form, length, and installation position are confirmed per inquiry, because visually similar bolts from adjacent builds differ in both specification and torque figure.

    Send the part number, engine model and serial number, and the joint the fastener belongs to — head, rod, main-bearing cap, or cover — so the correct single-use specification is quoted rather than a generic equivalent.`,
  },
  {
    slug: 'mtu-tools-service-supplies',
    title: 'MTU Special Tools & Service Supplies | Parts Catalog',
    h1Title: 'MTU Special Tools and Service Supplies',
    summary: 'MTU service tools and assembly supplies — pullers, barring tools, setting mandrels, removal devices, gauges, and assembly compounds.',
    description: 'MTU workshop tools and service supplies referenced by tool number. Barring devices, setting mandrels and pullers are checked by tool number and engine application before quotation.',
    type: 'category',
    partFilter: (p) => p.category === 'Tools and supplies',
    longDescription: `Several MTU operations cannot be done correctly without the factory tool: turning the engine to top dead centre with the barring device, setting injector height with the mandrel, pulling a sleeve or a pulley without loading the housing, or recording compression with the press recorder. These tools are identified by tool number (the F-prefix series) rather than by engine part number, and a substitute improvised in a workshop usually damages the very component it is meant to service.

    Catalog references include barring tools and devices, pullers, fitting-removal devices, setting mandrels, milling cutters, feeler gauges, compression recorders, tool kits, assembly pastes and sealants across Series 2000, 4000, 396, 956, 1163 and legacy 183 applications. When requesting a quotation, send the tool number stamped on the unit together with the engine model it is used on — tool numbers are reused across builds, and the engine application is what pins down the correct variant.

    For a planned overhaul, ask for the tool list alongside the parts list: the same job usually needs the barring device, the setting mandrel, and at least one puller, and ordering them together avoids a workshop stoppage mid-job.`,
  },
  {
    slug: 'mtu-cooling-system',
    title: 'MTU Cooling System Parts — Pumps, Impellers, Thermostats | Parts Catalog',
    h1Title: 'MTU Cooling System Components',
    summary: 'MTU cooling system parts — coolant pumps, seawater pumps, impellers, thermostats, flanges, hoses, and heat exchangers.',
    description: 'Cooling system parts vary by engine application — marine (raw-water or keel-cooled), industrial (radiator), or rail. We confirm the correct variant by engine model and serial number for MTU 2000, 4000, 396, 595, and 956 series.',
    searchTopics: [
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
    ],
    type: 'category',
    partFilter: (p) => p.category === 'Cooling system',
    longDescription: `MTU engine cooling systems are application-specific — a marine engine running on raw-water cooling through a keel cooler requires different pump and thermostat configurations than an industrial engine on a closed-loop radiator or a rail engine with split-circuit cooling. Ordering the wrong cooling-system variant is one of the most common parts-matching errors because the same engine series can have multiple cooling configurations.

    Our cooling system catalog covers coolant pumps (5062000601, 5592001001/31), seawater pumps (5502003201), impellers (X00022524, 5582040406, 5592010007, 5592010307), thermostats (5841800175), coolant pump shafts (5552010005, 5842040714), flanges (8490740063), and sight glasses (5502030060). For each inquiry, we confirm the correct variant by engine model, serial number, and application type. Common replacement triggers include impeller wear from abrasive cooling water, pump shaft seal leakage, and thermostat sticking in the open or closed position.`,
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
        title: `${series} ${categoryTitle} Parts Catalog`,
        h1Title: `${series} ${categoryTitle} Parts`,
        summary: `${count} ${series} ${categoryTitle.toLowerCase()} part numbers for RFQ, availability checks, and serial-number verification.`,
        description: `Browse ${series} ${categoryTitle.toLowerCase()} part numbers. This catalog page groups exact part-number pages by engine series and category so buyers can prepare cleaner RFQs for ${cleanSeries} service, overhaul, and maintenance work.`,
        longDescription: `${series} ${categoryTitle.toLowerCase()} parts are checked by exact part number, engine serial number, replacement status, and shipping destination before quotation.\n\nUse this page when your inquiry is narrower than the full ${series} catalog but broader than one single part number. The representative list below helps procurement teams compare available references, weight and HS code data, and related part pages before sending a consolidated request.`,
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
