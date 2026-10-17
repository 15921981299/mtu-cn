type ProductItem = {
  slug: string;
  brand?: 'MTU' | 'Cummins' | 'DEUTZ' | 'Detroit Diesel';
  generatedModel?: boolean;
  title: string;
  image: string;
  mainImage: string;
  secondImage: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  tolerance: string;
  leadTime: string;
  content: {
    partOne: string;
    partTwo: string;
  };

};


const confirmedModelBrands: Record<string, NonNullable<ProductItem['brand']>> = {
  'b125-33': 'Cummins',
  'eqb125-20': 'Cummins',
  'eqb140-20': 'Cummins',
};

function normalizeImportedModel(product: ProductItem): ProductItem {
  const brand = product.slug.startsWith('mtu-') ? 'MTU'
    : product.slug.startsWith('deutz-') ? 'DEUTZ'
      : confirmedModelBrands[product.slug];
  const model = confirmedModelBrands[product.slug] ? product.slug.toUpperCase() : product.title;
  const identity = brand ? `${brand} ${model.replace(/^(MTU|DEUTZ)\s+/i, '')}` : model;
  const support = brand ? `${brand} parts` : 'diesel engine parts';
  return {
    ...product,
    brand,
    generatedModel: true,
    title: model,
    h1Title: `${identity} Parts Identification`,
    seoTitle: `${identity} Parts Identification | Diesel Part Source`,
    summary: `${identity} parts inquiry: identify the installed component by its full marking, engine serial number, and required quantity. Availability is checked per request.`,
    capabilitySlugs: brand === 'MTU' ? product.capabilitySlugs : ['industrial-engine-service'],
    content: {
      partOne: product.content.partOne.replaceAll(`MTU ${product.title}`, identity),
      partTwo: product.content.partTwo.replace('MTU Spare Parts inquiry support', `${support} inquiry support`),
    },
  };
}

export function isProductPageNoindex(product: ProductItem): boolean {
  // Kept in the build for URL stability, but 301'd at the edge by
  // public/_redirects: each of these is thinner than the page that replaces it.
  const redirected = [
    'mtu-series-2000-gensets',
    'mtu-series-4000-engines',
    'mtu-series-4000-gensets',
    // 2026-10-10: the 396 TE74L shell had the cylinder count wrong (the
    // catalogue links 12V 396 TE74/TE74L, not 16V), and the 1163 series has a
    // family page listing every 1163 model present in the data.
    'mtu-16v-396-te74l',
    'mtu-series-1163-engines',
  ];
  return redirected.includes(product.slug) || Boolean(product.generatedModel && product.brand !== 'MTU');
}

// BEGIN IMPORTED SITEMAP PRODUCTS
const importedModelProducts: ProductItem[] = [
  {
    slug: 'mtu-16v-396-te74l',
    title: 'MTU 16V 396 Te74l',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 16V 396 Te74l Parts | Diesel Part Source',
    h1Title: 'MTU 16V 396 Te74l Engine Parts',
    summary: 'MTU MTU 16V 396 Te74l engine parts inquiry support for service, overhaul, and replacement planning.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by engine model, serial number, and part reference',
    leadTime: 'Availability and shipping route confirmed after inquiry',
    content: {
      partOne: `
        <h2>MTU 16V 396 Te74l Parts Support</h2>
        <p>Diesel Part Source supports MTU MTU 16V 396 Te74l engine parts inquiries for maintenance teams, distributors, service companies, and fleet operators.</p>
        <h3>Typical Requests</h3>
        <ul>
          <li>Filters, gaskets, seals, belts, sensors, and service items</li>
          <li>Fuel, cooling, lubrication, turbocharging, and control components</li>
          <li>Overhaul parts and replacement assemblies checked by engine reference</li>
        </ul>
      `,
      partTwo: `
        <h2>What to Send</h2>
        <p>Send the engine model, serial number, part numbers, quantity, destination, and required delivery date. Photos of the nameplate or old part help us confirm the right option.</p>
        <p><a href="/contact/">Request MTU 16V 396 Te74l parts</a></p>
        <p><a href="/products/mtu-16v-396-te74l/">MTU 16V 396 Te74l</a> is listed under MTU Spare Parts inquiry support.</p>
      `,
    },
  },
  {
    slug: 'mtu-series-1163-engines',
    title: 'MTU Series 1163 Engines',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU Series 1163 Engines Parts | Diesel Part Source',
    h1Title: 'MTU Series 1163 Engines Engine Parts',
    summary: 'MTU MTU Series 1163 Engines engine parts inquiry support for service, overhaul, and replacement planning.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by engine model, serial number, and part reference',
    leadTime: 'Availability and shipping route confirmed after inquiry',
    content: {
      partOne: `
        <h2>MTU Series 1163 Engines Parts Support</h2>
        <p>Diesel Part Source supports MTU MTU Series 1163 Engines engine parts inquiries for maintenance teams, distributors, service companies, and fleet operators.</p>
        <h3>Typical Requests</h3>
        <ul>
          <li>Filters, gaskets, seals, belts, sensors, and service items</li>
          <li>Fuel, cooling, lubrication, turbocharging, and control components</li>
          <li>Overhaul parts and replacement assemblies checked by engine reference</li>
        </ul>
      `,
      partTwo: `
        <h2>What to Send</h2>
        <p>Send the engine model, serial number, part numbers, quantity, destination, and required delivery date. Photos of the nameplate or old part help us confirm the right option.</p>
        <p><a href="/contact/">Request MTU Series 1163 Engines parts</a></p>
        <p><a href="/products/mtu-series-1163-engines/">MTU Series 1163 Engines</a> is listed under MTU Spare Parts inquiry support.</p>
      `,
    },
  },
  {
    slug: 'mtu-series-8000-engines',
    title: 'MTU 8000 Series Parts',
    image: '/images/marine-diesel-engine-parts.webp',
    mainImage: '/images/marine-diesel-engine-parts.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 8000 Engine Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 8000 Engine Parts',
    summary: 'MTU 8000 series engine parts support for high-output marine propulsion, including service, cooling, fuel, turbocharger, control, and overhaul inquiries.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service', 'genuine-oem-parts'],
    tolerance: 'Verified by engine model, serial number, and part reference',
    leadTime: 'Availability and shipping route confirmed after inquiry',
    content: {
      partOne: `
        <h2>MTU 8000 Series Engine Parts</h2>
        <p>MTU 8000 series engines serve large, high-output marine propulsion applications where part traceability and maintenance-window planning are critical. Diesel Part Source supports vessel operators, shipyards, engine service companies, and procurement teams with model-specific parts checks and international delivery planning.</p>
        <h3>MTU 8000 Parts Categories</h3>
        <ul>
          <li>Fuel pumps, injection components, valves, lines, and controls</li>
          <li>Cooling pumps, impellers, thermostats, heat-exchange, and seawater-system parts</li>
          <li>Turbocharger, lubrication, intake, exhaust, sensor, and electrical components</li>
          <li>Filters, gaskets, seals, O-rings, and planned-service items</li>
          <li>Cylinder-head, valve-train, piston, liner, bearing, and overhaul components</li>
        </ul>
        <p>Because 8000 series configurations vary by vessel, engine rating, and production revision, we do not treat a general series match as final fitment confirmation.</p>
        <p><a href="/applications/marine-propulsion-engines/">View MTU marine engine parts support</a></p>
      `,
      partTwo: `
        <h2>MTU 8000 Parts Verification</h2>
        <p>Send the complete engine designation, serial number, part numbers, quantities, vessel or shipyard location, and required delivery date. Include component nameplates for turbochargers, pumps, injectors, sensors, and control equipment.</p>
        <h3>For Planned Overhauls</h3>
        <p>Send the parts list in Excel format so replacement references, quantities, approximate shipment weights, availability, and lead times can be reviewed line by line. Graded internal components require the applicable size or measurement record before quotation.</p>
        <p><a href="/contact/">Request MTU 8000 engine parts</a></p>
      `,
    },
  },
];
// END IMPORTED SITEMAP PRODUCTS

const productCatalog: ProductItem[] = [
  {
    slug: 'mtu-spare-parts',
    title: 'MTU Spare Parts',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU Engine Parts & Spare Parts Supplier | Diesel Part Source',
    h1Title: 'MTU Engine Parts & Spare Parts',
    summary:
      'Independent MTU engine parts supplier for 183, 396, 595, 956, 1163, 2000, 4000, and 8000 series engines, with part-number verification and worldwide delivery.',
    materialSlugs: ['stainless-steel', 'carbon-steel', 'brass-copper'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service', 'genuine-oem-parts'],
    tolerance: 'Verified by part number, engine model, and serial number',
    leadTime: 'Availability and dispatch time confirmed per quotation',
    content: {
      partOne: `
        <h2>MTU Engine Parts Supply</h2>
        <p>Diesel Part Source is an independent MTU engine parts and spare-parts supplier for marine, industrial, rail, and power generation users. We support routine service orders, overhaul lists, and urgent downtime requests with part-number verification, stock checking, and global delivery from Shanghai.</p>
        <h3>Browse by Part Category</h3>
        <ul>
          <li><a href="/part-products/catalog/mtu-filters/">MTU Filters — oil, fuel, air, coolant</a></li>
          <li><a href="/part-products/catalog/mtu-injectors/">MTU Injectors & nozzle parts</a></li>
          <li><a href="/part-products/catalog/mtu-fuel-pumps/">MTU Fuel pumps — high and low pressure</a></li>
          <li><a href="/part-products/catalog/mtu-turbocharger-parts/">MTU Turbocharger parts</a></li>
          <li><a href="/part-products/catalog/mtu-sensors/">MTU Sensors & electrical components</a></li>
          <li><a href="/part-products/catalog/mtu-starter-motors-alternators/">MTU Starter motors & alternators</a></li>
          <li><a href="/part-products/catalog/mtu-gasket-kits/">MTU Gaskets, seals & O-rings</a></li>
          <li><a href="/part-products/catalog/mtu-pistons-liners/">MTU Pistons, liners & rings</a></li>
          <li><a href="/part-products/catalog/mtu-valve-train/">MTU Valve train components</a></li>
          <li><a href="/part-products/catalog/mtu-bearings/">MTU Engine bearings</a></li>
          <li><a href="/part-products/catalog/mtu-cooling-system/">MTU Cooling system parts</a></li>
        </ul>
        <h3>Browse by Engine Series</h3>
        <ul>
          <li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000 Series parts</a></li>
          <li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000 Series parts</a></li>
          <li><a href="/part-products/catalog/mtu-396-series/">MTU 396 Series parts</a></li>
          <li><a href="/part-products/catalog/mtu-595-series/">MTU 595 Series parts</a></li>
          <li><a href="/part-products/catalog/mtu-956-series/">MTU 956 Series parts</a></li>
          <li><a href="/part-products/catalog/mtu-1163-series/">MTU 1163 Series parts</a></li>
          <li><a href="/products/mtu-series-8000-engines/">MTU 8000 Series engine parts</a></li>
        </ul>
        <h3>High-Demand MTU Engine Models</h3>
        <ul>
          <li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 engine parts</a></li>
          <li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 engine parts</a></li>
          <li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 engine parts</a></li>
        </ul>
        <h3>Frequently Requested Part Numbers</h3>
        <ul>
          <li><a href="/part-products/5240113410-cylinder-liner-size-0/">5240113410 — Cylinder Liner Size 0</a></li>
          <li><a href="/part-products/x53507500012-injector/">X53507500012 — Injector</a></li>
          <li><a href="/part-products/ex52407500064-injector/">EX52407500064 — Injector</a></li>
          <li><a href="/part-products/5110804420-turbine-wheel/">5110804420 — Turbine Wheel</a></li>
          <li><a href="/part-products/5410160920-cylinder-head-gasket/">5410160920 — Cylinder Head Gasket</a></li>
          <li><a href="/part-products/0020940204-filter-cartridge/">0020940204 — Filter Cartridge</a></li>
          <li><a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 — Oil Filter Spin-On</a></li>
          <li><a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091 — Fuel Filter Spin-On</a></li>
          <li><a href="/part-products/0005358233-speed-sensor/">0005358233 — Speed Sensor</a></li>
          <li><a href="/part-products/5240530301-inlet-valve/">5240530301 — Inlet Valve</a></li>
          <li><a href="/part-products/5240380471-conrod-bolt/">5240380471 — Conrod Bolt</a></li>
          <li><a href="/part-products/5502003201-seawater-pump/">5502003201 — Seawater Pump</a></li>
        </ul>
        <p><a href="/part-products/">MTU part-number catalog</a></p>
      `,
      partTwo: `
        <h2>How We Verify MTU Parts</h2>
        <p>Send the part number, engine series, engine serial number, and photos when available. We confirm the correct item — including superseded part numbers and size grades — before quotation and shipment.</p>
        <p>The quotation identifies the exact number, offered condition, supply route, included items, and shipping terms. Catalog images and historical references are not proof of current warehouse stock.</p>
        <p><a href="/certifications/">Quality documentation</a> · <a href="/about/">Company information</a> · <a href="/series/mtu-2000/">MTU 2000 model identification</a></p>
        <p><a href="/contact/?source=mtu-spare-parts" data-rfq-modal data-rfq-context="MTU spare parts inquiry" data-rfq-source="mtu-spare-parts">Request MTU spare parts</a></p>
      `,
    },
  },
  {
    slug: 'mtu-2000-series-parts',
    title: 'MTU 2000 Series Parts',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/precision-micrometer-measurement.jpg',
    seoTitle: 'MTU 2000 Series Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 2000 Series Parts Supplier',
    summary:
      'Parts support for MTU 2000 series engines used in marine propulsion, generator sets, and industrial power units.',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service'],
    tolerance: 'Model and serial-number verification',
    leadTime: 'Stock and urgent delivery options available',
    content: {
      partOne: `
        <h2>MTU 2000 Series Parts</h2>
        <p>The MTU 2000 series is widely used in marine, power generation, and industrial applications. We help maintenance teams review OEM, OEM-alternative, reman, and replacement routes for planned service and breakdown repair.</p>
        <h3>MTU 2000 Model Coverage</h3>
        <ul>
          <li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 engine parts</a></li>
          <li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L engine parts</a></li>
          <li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000 parts catalog by part number</a></li>
          <li><a href="/products/mtu-2000-series-parts/marine-generator-service-parts/">MTU 2000 marine and generator service parts</a></li>
        </ul>
        <h3>Part Categories</h3>
        <ul>
          <li>Fuel injection and engine control components</li>
          <li>Cooling, lubrication, sealing, and filtration parts</li>
          <li>Overhaul components and wear parts</li>
        </ul>
      `,
      partTwo: `
        <h2>Fast Identification</h2>
        <p>Share the engine model, serial number, and required part numbers. If you only have the old part, send clear photos and markings.</p>
        <p><a href="/series/mtu-2000/">MTU 2000 model and variant identification</a> · <a href="/series/16v2000m96/">16V2000M96 identification</a> · <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 part-number catalog</a></p>
        <p>For an overhaul list, identify the scope by cylinder and assembly. The quote specifies the included references and supply condition; shared series names do not confirm every installation.</p>
        <p><a href="/contact/?source=mtu-2000-supply" data-rfq-modal data-rfq-context="MTU 2000 parts supply inquiry" data-rfq-source="mtu-2000-supply">Check MTU 2000 series availability</a></p>
      `,
    },
  },
  {
    slug: 'mtu-4000-series-parts',
    title: 'MTU 4000 Series Parts',
    image: '/images/engine-parts-hero.webp',
    mainImage: '/images/engine-parts-verification-desk.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 4000 Series Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 4000 Series Parts Supplier',
    summary:
      'MTU 4000 series parts sourcing for marine, generator, rail and industrial engines. Confirm the exact offered number, origin and supply condition with your quotation.',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    tolerance: 'Part-number and application verification',
    leadTime: 'Quoted by stock, urgency, and shipping destination',
    content: {
      partOne: `
        <h2>MTU 4000 Series Parts</h2>
        <p>We supply MTU 4000 series spare parts for demanding fleets and engine rooms where downtime is expensive. Our team helps confirm correct replacements and coordinate export logistics.</p>
        <h3>MTU 4000 Model Coverage</h3>
        <ul>
          <li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 engine parts</a></li>
          <li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 engine parts</a></li>
          <li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000 parts catalog by part number</a></li>
        </ul>
        <h3>Common Parts</h3>
        <ul>
          <li>Fuel system components, pumps, sensors, and control parts</li>
          <li>Cylinder-head, valve-train, piston, liner, and bearing parts</li>
          <li>Turbocharging, cooling, lubrication, and filtration components</li>
        </ul>
        <h3>Diesel and Gas Builds</h3>
        <p>MTU builds the 4000 series as both a diesel engine and a gas engine (the GS variants). Fuel delivery, ignition, and control parts differ between the two builds, so the engine type code on the nameplate matters as much as the part number. If your engine is a gas variant, say so when you inquire and we verify the reference against the gas build rather than assuming the diesel counterpart carries over.</p>
      `,
      partTwo: `
        <h2>For Fleet Maintenance</h2>
        <p>We support repeat orders and consolidated spare-parts lists for vessel, power plant, and industrial maintenance programs.</p>
        <p><a href="/series/mtu-4000-variants/">MTU 4000 model variants</a> · <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 part-number catalog</a> · <a href="/guides/mtu-4000-overhaul-parts/">Overhaul scope and ordering checks</a></p>
        <p>Keep the complete X/EX reference and suffix in your parts list. Confirm the offered condition, included accessories, and any exchange or core-return terms before accepting a replacement route.</p>
        <p><a href="/contact/?source=mtu-4000-supply" data-rfq-modal data-rfq-context="MTU 4000 parts supply inquiry" data-rfq-source="mtu-4000-supply">Request MTU 4000 parts</a></p>
      `,
    },
  },
  {
    slug: 'detroit-diesel-parts',
    title: 'Detroit Diesel Parts',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/industrial-diesel-engine-parts.webp',
    seoTitle: 'Detroit Diesel Parts Supplier | Diesel Part Source',
    h1Title: 'Detroit Diesel Engine Parts',
    summary:
      'Detroit Diesel engine parts support for legacy and related MTU engine applications, maintenance, and overhaul programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by engine and part reference',
    leadTime: 'Availability confirmed after inquiry',
    content: {
      partOne: `
        <h2>Detroit Diesel Parts</h2>
        <p>Diesel Part Source supports Detroit Diesel parts requests for maintenance teams handling older engine platforms and MTU-related applications.</p>
        <h3>Inquiry Details</h3>
        <ul>
          <li>Engine model and serial number</li>
          <li>Part number or old part photos</li>
          <li>Quantity, destination, and target delivery date</li>
        </ul>
      `,
      partTwo: `
        <h2>Replacement Confirmation</h2>
        <p>Where superseded or replacement part numbers exist, we help confirm practical options before order placement.</p>
        <p><a href="/contact/">Request Detroit Diesel parts</a></p>
      `,
    },
  },
  {
    slug: 'cummins-parts',
    title: 'Cummins Parts',
    image: '/images/engine-parts-hero.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'Cummins Parts Supplier | Diesel Part Source',
    h1Title: 'Cummins Diesel Engine Parts',
    summary:
      'Cummins service parts, overhaul components, and replacement assemblies for generator, marine, and industrial engines.',
    materialSlugs: ['carbon-steel', 'stainless-steel', 'brass-copper'],
    capabilitySlugs: ['cummins-engine-parts', 'industrial-engine-service'],
    tolerance: 'CPL, model, and serial number verification',
    leadTime: 'Stock and sourcing options quoted per item',
    content: {
      partOne: `
        <h2>Cummins Parts</h2>
        <p>We source Cummins engine parts for service companies, fleet owners, generator operators, and industrial maintenance teams.</p>
        <h3>Typical Categories</h3>
        <ul>
          <li>Filters, belts, gaskets, seals, and maintenance kits</li>
          <li>Fuel injection, turbocharging, cooling, and lubrication parts</li>
          <li>Electrical sensors, control components, and overhaul items</li>
        </ul>
      `,
      partTwo: `
        <h2>What to Send</h2>
        <p>For faster quotation, include engine model, CPL, serial number, part number, quantity, and delivery country.</p>
        <h3>Cummins Engine Series Pages</h3>
        <ul>
          <li><a href="/products/cummins-parts/cummins-ism-engine-parts/">Cummins ISM / QSM11 10.8 L engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-isl-engine-parts/">Cummins ISL / ISLe / QSL 8.9 L engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk19-engine-parts/">Cummins QSK19 / KTA19 19 L engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk38-v12-engine-parts/">Cummins QSK38 / KTA38 V12 engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk50-v16-engine-parts/">Cummins QSK50 / KTA50 V16 engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-6bt-engine-parts/">Cummins 6BT / 4BT B-series engine parts</a></li>
          <li><a href="/products/cummins-parts/cummins-n14-engine-parts/">Cummins N14 / NT855 engine parts</a></li>
        </ul>
        <p><a href="/contact/">Check Cummins parts</a></p>
      `,
    },
  },
  {
    slug: 'deutz-parts',
    title: 'DEUTZ Parts',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/precision-grinding-service-capability.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'DEUTZ Parts Supplier | Diesel Part Source',
    h1Title: 'DEUTZ Diesel Engine Parts',
    summary:
      'DEUTZ replacement parts and maintenance support for construction equipment, industrial units, pumps, and compressors.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['deutz-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by model and part number',
    leadTime: 'Quoted by availability and destination',
    content: {
      partOne: `
        <h2>DEUTZ Parts</h2>
        <p>We help buyers source DEUTZ parts for scheduled maintenance, emergency repair, and overhaul planning across industrial equipment fleets.</p>
        <h3>Part Categories</h3>
        <ul>
          <li>Maintenance kits, filters, belts, seals, and gaskets</li>
          <li>Fuel, cooling, lubrication, and electrical system components</li>
          <li>Engine overhaul components and replacement assemblies</li>
        </ul>
      `,
      partTwo: `
        <h2>Support from Shanghai</h2>
        <p>Send your DEUTZ engine model, serial number, and required part list. We will check availability and shipping options.</p>
        <h3>DEUTZ Engine Series Pages</h3>
        <ul>
          <li><a href="/products/deutz-parts/deutz-2012-series-parts/">DEUTZ 2012 series engine parts</a></li>
          <li><a href="/products/deutz-parts/deutz-2013-series-parts/">DEUTZ TCD 2013 series engine parts</a></li>
          <li><a href="/products/deutz-parts/deutz-1011-series-parts/">DEUTZ 1011 series engine parts</a></li>
          <li><a href="/products/deutz-parts/deutz-2011-series-parts/">DEUTZ 2011 series engine parts</a></li>
        </ul>
        <p><a href="/contact/">Request DEUTZ parts</a></p>
      `,
    },
  },
  ...importedModelProducts.map(normalizeImportedModel),
];

function resolveProductImages(product: ProductItem): Pick<ProductItem, 'image' | 'mainImage' | 'secondImage'> {
  const searchText = `${product.slug} ${product.title} ${product.h1Title} ${product.summary}`.toLowerCase();
  let image = '/images/mtu-engine-parts-hero.webp';

  if (/\b(marine|vessel|yacht|ship|seawater|propulsion)\b/.test(searchText)) {
    image = '/images/marine-diesel-engine-parts.webp';
  } else if (/\b(generator|g-drive|genset|power|standby)\b/.test(searchText)) {
    image = '/images/generator-engine-parts.webp';
  } else if (/\b(cummins|deutz|detroit|industrial|compressor|construction|pump)\b/.test(searchText)) {
    image = '/images/industrial-diesel-engine-parts.webp';
  } else if (/\b(4000|8000|overhaul|cylinder|piston|liner|bearing|valve|crankshaft|turbo)\b/.test(searchText)) {
    image = '/images/mtu-4000-series-overhaul-parts.webp';
  } else if (/\b(2000|183|331|396|493|538|595|956|1163|injector|sensor|filter|gasket|seal)\b/.test(searchText)) {
    image = '/images/mtu-2000-series-parts.webp';
  }

  return {
    image,
    mainImage: image,
    secondImage:
      image === '/images/global-engine-parts-delivery.webp'
        ? '/images/mtu-part-number-verification.webp'
        : '/images/global-engine-parts-delivery.webp',
  };
}

export const products: ProductItem[] = productCatalog.map((product) => ({
  ...product,
  ...resolveProductImages(product),
}));

export function getProductCards() {
  return products.map((p) => ({ slug: p.slug, title: p.title, image: p.image, summary: p.summary }));
}
