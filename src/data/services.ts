type ServiceItem = {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  image: string;
  mainImage: string;
  secondImage: string;
};

export const services: ServiceItem[] = [
  {
    slug: 'mtu-engine-parts',
    title: 'MTU Engine Parts',
    seoTitle: 'MTU Engine Parts Supplier | Diesel Part Source',
    h1Title: 'Verified MTU Engine Parts Supply',
    summary:
      'Full-range MTU spare parts for series 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 engines with verified sourcing routes and global delivery.',
    image: '/images/mtu-engine-parts-hero.webp',
    mainImage: '/images/mtu-2000-series-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'cummins-engine-parts',
    title: 'Cummins Engine Parts',
    seoTitle: 'Cummins Engine Parts Supplier | Diesel Part Source',
    h1Title: 'Cummins Diesel Engine Parts',
    summary:
      'Supply support for Cummins diesel engines and verified replacement routes for industrial, marine, generator, and equipment maintenance programs.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'deutz-engine-parts',
    title: 'DEUTZ Engine Parts',
    seoTitle: 'DEUTZ Engine Parts Supplier | Diesel Part Source',
    h1Title: 'DEUTZ Diesel Engine Parts',
    summary:
      'DEUTZ replacement parts and engine support for construction machinery, power units, pumps, compressors, and industrial fleets.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/mtu-part-number-verification.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'industrial-engine-service',
    title: 'Industrial Engine Service',
    seoTitle: 'Industrial Diesel Engine Service & Parts | Diesel Part Source',
    h1Title: 'Industrial Engine Service & Support',
    summary:
      'Parts sourcing and technical support for engines used in pumps, compressors, heavy equipment, oilfield units, and industrial power systems.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'marine-engine-service',
    title: 'Marine Engine Service',
    seoTitle: 'Marine Diesel Engine Parts & Service | Diesel Part Source',
    h1Title: 'Marine Engine Parts & Service',
    summary:
      'Verified MTU spare-parts sourcing for ferry, workboat, yacht, shipyard, and offshore engine operators, with urgent global shipment support.',
    image: '/images/marine-diesel-engine-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'genuine-oem-parts',
    title: 'Verified OEM Sourcing',
    seoTitle: 'Verified OEM Diesel Engine Parts Sourcing | Diesel Part Source',
    h1Title: 'Verified OEM Parts Sourcing',
    summary:
      'OEM, OEM-alternative, reman, and replacement sourcing routes from O-rings to crankshafts, clearly labelled for maintenance, overhaul, and fleet operation.',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
];

export function getServiceDetailHtml(title: string) {
  const details: Record<string, { partOne: string; partTwo: string }> = {
    'MTU Engine Parts': {
      partOne: `
        <h2>MTU Full-Series Spare Parts</h2>
        <p>Diesel Part Source specializes in supplying MTU engine parts for classic and current engine families, including 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines. We support maintenance teams that need clear identification, labelled sourcing routes, and fast shipment.</p>
        <h3>Typical MTU Parts</h3>
        <ul>
          <li>Filters, seals, O-rings, gaskets, and overhaul kits</li>
          <li>Fuel pumps, injectors, pressure sensors, and control components</li>
          <li>Valve guides, pistons, liners, bearings, crankshafts, and cylinder heads</li>
          <li>Cooling, turbocharging, exhaust, and electrical components</li>
        </ul>
      `,
      partTwo: `
        <h2>Identification Support</h2>
        <p>Send your engine model, serial number, part number, nameplate photo, or old part photo. Our team helps confirm the correct MTU part before shipment so you avoid downtime caused by mismatched spares.</p>
        <h3>Reading MTU Part Number Formats</h3>
        <p>MTU uses several part-number formats, and recognizing them speeds up identification:</p>
        <ul>
          <li><strong>Ten-digit numbers</strong>, such as <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201</a> or 5240530830, are the most common format across older and current series.</li>
          <li><strong>X-prefixed numbers</strong>, such as <a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091</a>, appear on many newer parts.</li>
          <li><strong>EX-prefixed numbers</strong>, such as <a href="/part-products/ex52407500064-injector/">EX52407500064</a>, usually indicate exchange or remanufactured units.</li>
          <li><strong>700-series standard parts</strong>, such as 700429100000, cover standard O-rings and similar items.</li>
          <li><strong>F-prefixed numbers</strong> are generally special tools, see <a href="/part/mtu-specialized-tools/">MTU special tools</a>.</li>
        </ul>
        <p>A slash suffix, such as /29 or /00, identifies a specific version and should always be included in the inquiry.</p>
        <h3>Where to Start</h3>
        <p>Search the <a href="/part-products/">MTU parts catalog</a> by number, or browse by series in the <a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a>, <a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a>, and <a href="/part-products/catalog/mtu-396-series/">MTU 396</a> catalogs.</p>
        <h3>Global Delivery</h3>
        <p>We arrange express and freight shipment worldwide from Shanghai. Urgent vessel, generator, and industrial shutdown requirements are prioritized.</p>
        <p><a href="/contact/">Send your MTU parts inquiry</a></p>
      `,
    },
    'Cummins Engine Parts': {
      partOne: `
        <h2>Cummins Diesel Engine Parts</h2>
        <p>We supply Cummins diesel engine parts for industrial machines, generator sets, marine equipment, and field maintenance teams that need reliable parts sourcing and responsive quotation support.</p>
        <h3>What We Source</h3>
        <ul>
          <li>Routine service parts and maintenance kits</li>
          <li>Fuel, air, cooling, and lubrication system components</li>
          <li>Electrical sensors, control units, and replacement assemblies</li>
        </ul>
      `,
      partTwo: `
        <h2>Quote Requirements</h2>
        <p>Share the Cummins engine model, CPL number, serial number, and required quantity. We will confirm availability, lead time, and shipping options.</p>
        <h3>Engine Ranges We Are Asked About Most</h3>
        <ul>
          <li>B and C series engines in compact generators, pumps, and machinery</li>
          <li>L and M series engines in industrial and marine auxiliary use</li>
          <li>N14 and K series engines, including KTA19, KTA38, and KTA50, in large generator sets and mining equipment</li>
          <li>QSK series engines in high-output generators and heavy equipment</li>
        </ul>
        <h3>Filters and Cross-References</h3>
        <p>Many Cummins engines use Fleetguard filters, and maintenance lists often mix Cummins part numbers, Fleetguard numbers, and other filter brands. Send whichever numbers you have; we match them to the engine and quote one consistent reference per position, so the same filter is not ordered twice under different numbers.</p>
        <h3>Mixed-Brand Orders</h3>
        <p>Sites that run Cummins engines alongside MTU or DEUTZ units can send one combined list. Each line is checked against its own engine data, and the parts ship together. For kit levels and CPL guidance, see <a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins service kits and overhaul parts</a>.</p>
        <p><a href="/contact/">Request Cummins parts availability</a></p>
      `,
    },
    'DEUTZ Engine Parts': {
      partOne: `
        <h2>DEUTZ Engine Parts</h2>
        <p>Diesel Part Source supports DEUTZ diesel engines used in construction machinery, compressors, pumps, and industrial equipment. We help buyers identify parts and consolidate orders for scheduled maintenance or urgent repair.</p>
        <h3>Supply Scope</h3>
        <ul>
          <li>Filters, belts, seals, gaskets, and service kits</li>
          <li>Fuel injection, cooling, lubrication, and electrical parts</li>
          <li>Overhaul components for planned maintenance programs</li>
        </ul>
      `,
      partTwo: `
        <h2>Reliable Sourcing</h2>
        <p>Send your DEUTZ engine model and part numbers. We verify compatibility and provide practical shipment options for your destination.</p>
        <h3>Reading a DEUTZ Model Designation</h3>
        <p>DEUTZ model codes describe the engine build. In a code such as BF6M1013, "B" indicates turbocharging, "F" a four-stroke vehicle-type engine, "6" the number of cylinders, "M" liquid cooling, and "1013" the series. Air-cooled engines use "L" in the same position, as in F4L912. Newer engines use the TCD prefix, as in TCD 2013, for turbocharged engines with charge-air cooling. Knowing these letters helps us narrow the parts list before the serial number is checked.</p>
        <h3>Common DEUTZ Families</h3>
        <ul>
          <li>912, 913, and 914 air-cooled engines in older machinery and pumps</li>
          <li>1011 and 2011 engines in compact equipment</li>
          <li>1012, 1013, and 2012, 2013 engines in construction and industrial machines</li>
          <li>TCD 2012, 2013, and later TCD ranges in current equipment</li>
        </ul>
        <p>For machine-specific advice, including air-cooled versus liquid-cooled parts, see <a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ industrial equipment parts</a>.</p>
        <p><a href="/contact/">Request DEUTZ parts support</a></p>
      `,
    },
    'Industrial Engine Service': {
      partOne: `
        <h2>Industrial Engine Support</h2>
        <p>Industrial equipment cannot wait for unclear sourcing. We help maintenance teams find engine parts for pumps, compressors, drilling units, heavy machinery, and generator packages.</p>
        <h3>Support Areas</h3>
        <ul>
          <li>Parts identification from engine plates and old part markings</li>
          <li>Stock check, replacement recommendation, and order consolidation</li>
          <li>Export packing and international logistics coordination</li>
        </ul>
      `,
      partTwo: `
        <h2>Built Around Downtime</h2>
        <p>Tell us the engine model, failure part, and target delivery date. We will prioritize critical spares and help you choose the fastest practical logistics route.</p>
        <h3>What This Service Covers</h3>
        <p>Diesel Part Source is a parts supplier. Our service work happens before and after the order, not on site: identifying parts, cleaning up lists, and getting the right items to your workshop. Repairs are carried out by your own technicians or a local service partner, and we make sure they have the parts and special tools when the job starts.</p>
        <h3>A Typical Breakdown Inquiry</h3>
        <ol>
          <li>You send the engine data plate photo, the failed part or its number, and the site location.</li>
          <li>We confirm the reference and check whether the part is in ready stock, partner stock, or needs to be sourced.</li>
          <li>The quote shows each line with availability, the shipping method, and an estimated arrival.</li>
          <li>After payment, we pack, photograph on request, and dispatch with tracking.</li>
        </ol>
        <h3>Reducing the Next Breakdown</h3>
        <p>After an urgent order, many customers ask us to propose a small on-site spares kit for the same engine. That kit usually includes filters for one service, belts, the sensors most likely to fail, and water-pump seals. See also our <a href="/industries/industrial-engines/">industrial engine parts</a> page and <a href="/support-services/">support services</a>.</p>
        <p><a href="/contact/">Ask for industrial engine support</a></p>
      `,
    },
    'Marine Engine Service': {
      partOne: `
        <h2>Marine Engine Parts &amp; Service</h2>
        <p>We support verified MTU parts sourcing for ferries, workboats, yachts, shipyards, and offshore equipment. MTU 2000, 4000, 595, 956, 1163, and related series are common request areas.</p>
        <h3>Marine Buyers We Serve</h3>
        <ul>
          <li>Ferry, workboat, and commercial vessel operators</li>
          <li>Yacht maintenance teams and shipyards</li>
          <li>Offshore, harbor, and marine service providers</li>
        </ul>
      `,
      partTwo: `
        <h2>Urgent Shipment Support</h2>
        <p>Marine breakdowns are time-sensitive. We help confirm correct parts quickly and coordinate export documentation, express delivery, or freight shipment to the vessel or repair yard.</p>
        <h3>Documentation for Institutional and Fleet Buyers</h3>
        <p>Fleet and institutional procurement often needs more than a commercial quote. Where the information is available, we can include on the quotation:</p>
        <ul>
          <li>Part number, description, and engine application per line</li>
          <li>HS codes, net weight, and country of origin per line</li>
          <li>Supersession notes when the requested number has been replaced</li>
          <li>Packing and marking according to your purchasing instructions</li>
        </ul>
        <p>Our part pages carry HS codes and packing data where they are confirmed, for example the gaskets and seals in the <a href="/part-products/catalog/mtu-956-series/">MTU 956</a> and <a href="/part-products/catalog/mtu-1163-series/">MTU 1163</a> catalogues.</p>
        <h3>Tender and Framework Orders</h3>
        <p>For tenders, send the full item list with quantities and the required documents. We return a line-by-line quote that your team can paste into the tender format. For framework agreements, we can hold the same reference and packing format for repeat orders. Shipyard and vessel workflows are described on our <a href="/industries/marine/">marine industry page</a>.</p>
        <p><a href="/contact/">Send a marine parts inquiry</a></p>
      `,
    },
    'Verified OEM Sourcing': {
      partOne: `
        <h2>OEM and Replacement Route Review</h2>
        <p>From O-rings to crankshafts, Diesel Part Source helps buyers compare practical supply routes for MTU, Detroit Diesel, Cummins, and DEUTZ engines. Quotes identify OEM, OEM-alternative, reman, repaired, or replacement routes when they apply.</p>
        <h3>Why Route Clarity Matters</h3>
        <ul>
          <li>Correct fit and reliable service life</li>
          <li>Reduced risk during overhaul and fleet maintenance</li>
          <li>Clearer replacement decisions before payment or dispatch</li>
        </ul>
      `,
      partTwo: `
        <h2>The Supply Routes on Our Quotes</h2>
        <ul>
          <li><strong>Original (OEM).</strong> Parts supplied by or for the engine manufacturer under the manufacturer's part number. The first choice for warranty work and critical components.</li>
          <li><strong>OEM-alternative.</strong> Parts made by a component manufacturer to the same specification, often the same supplier that makes the original part for the engine maker. Common for filters, seals, gaskets, and bearings.</li>
          <li><strong>Remanufactured exchange.</strong> Used cores, such as injectors, pumps, and turbochargers, rebuilt and tested to specification. MTU exchange parts usually carry an EX prefix.</li>
          <li><strong>Repaired or replacement.</strong> Offered only when the other routes are not available, and always labelled as such.</li>
        </ul>
        <h3>Choosing a Route</h3>
        <p>For an engine still under a manufacturer warranty, only original parts may be acceptable. For a standby generator that runs a few hours a year, an OEM-alternative filter can be a sensible choice. For an injector set on an older engine, a remanufactured exchange may be the fastest option. We set out the options and the trade-offs; the decision is yours.</p>
        <h2>How to Request Parts</h2>
        <p>Provide the part number, engine model, nameplate photo, old part photo, and quantity. Tell us if a specific route is required by contract. We check stock, verify replacement options, and quote shipping with clear notes on the available route. For a buyer's arrival checklist, see <a href="/genuine-oem-parts/">how to check genuine MTU parts</a>.</p>
        <p><a href="/contact/">Request verified parts sourcing</a></p>
      `,
    },
  };

  return details[title] || {
    partOne: `<h2>${title}</h2><p>Diesel Part Source supplies diesel engine parts and service support for global marine and industrial users.</p>`,
    partTwo: `<h3>Get Support</h3><p><a href="/contact/">Contact us with your engine model and part number</a>.</p>`,
  };
}
