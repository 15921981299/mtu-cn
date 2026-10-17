type ApplicationItem = {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  productSlugs: string[];
  content: {
    partOne: string;
    partTwo: string;
  };
};

const inquiryCta =
  '<p><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">Send parts inquiry</a></p>';

export const applications: ApplicationItem[] = [
  {
    slug: 'marine-propulsion-engines',
    title: 'MTU Marine Engine Parts',
    seoTitle: 'MTU Marine Engine Parts | Yacht & Boat Diesel Parts',
    h1Title: 'MTU Marine Engine Parts',
    summary:
      'MTU marine engine parts for yachts, boats, ferries, workboats, commercial vessels, and shipyards, with model and serial-number verification before quotation.',
    productSlugs: ['mtu-spare-parts', 'mtu-2000-series-parts', 'mtu-4000-series-parts', 'mtu-series-8000-engines', 'detroit-diesel-parts'],
    content: {
      partOne:
        '<h2>MTU Marine Diesel Engine Parts</h2><p>Marine propulsion downtime is time-sensitive. Diesel Part Source supplies MTU marine engine parts for yacht, boat, ferry, workboat, offshore, and shipyard maintenance. We support current and legacy engine families, including MTU 2000, 4000, 396, 595, 956, 1163, and related marine configurations.</p><h3>Marine Engine Series and Models</h3><ul><li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 marine engine parts</a></li><li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L yacht engine parts</a></li><li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 marine engine parts</a></li><li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 marine engine parts</a></li><li><a href="/part-products/catalog/mtu-396-series/">Legacy MTU 396 marine parts</a></li></ul><h3>Common Yacht and Boat Engine Parts</h3><ul><li>Fuel pumps, injectors, pressure valves, fuel lines, and control components</li><li>Oil filters, fuel filters, air filters, gaskets, seals, and maintenance kits</li><li>Seawater pumps, coolant pumps, impellers, thermostats, and heat-exchange parts</li><li>Turbocharger, lubrication, exhaust, sensor, and electrical components</li><li>Pistons, liners, bearings, valves, and overhaul parts for shipyard maintenance</li></ul><p>Browse the <a href="/part-products/">MTU part-number catalog</a> or send an Excel list for line-by-line checking.</p>',
      partTwo:
        `<h2>How We Verify Marine Fitment</h2><p>Include the complete engine model, serial number, part numbers, quantity, vessel or shipyard location, and required delivery date. For injectors, turbochargers, pumps, and electrical components, send the component nameplate or stamped reference as well as the engine data.</p><h3>Marine RFQ Information</h3><ul><li>Vessel type and engine application: propulsion, auxiliary, or generator</li><li>Engine model, rating, serial number, and nameplate photo</li><li>Exact part number, old-part photo, quantity, and maintenance deadline</li><li>Destination port or city and preferred courier, air, or sea shipment</li></ul><p>Quotes identify the available OEM, OEM-alternative, reman, or replacement route rather than treating unconfirmed options as interchangeable.</p>${inquiryCta}`,
    },
  },
  {
    slug: 'auxiliary-generator-engines',
    title: 'Auxiliary & Generator Engines',
    seoTitle: 'Generator Engine Parts | MTU, Cummins, DEUTZ',
    h1Title: 'Auxiliary & Generator Engine Parts',
    summary:
      'Service and repair parts for auxiliary engines and generator sets in marine, commercial, industrial, and standby power applications.',
    productSlugs: ['mtu-2000-series-parts', 'mtu-4000-series-parts', 'cummins-parts', 'deutz-parts'],
    content: {
      partOne:
        '<h2>Generator Engine Parts</h2><p>Generator engines need reliable service parts for planned maintenance and emergency power readiness. We support parts inquiries for MTU, Cummins, and DEUTZ generator engines used in vessels, facilities, power plants, and industrial sites.</p><h3>Typical Parts</h3><ul><li>Filters, belts, gaskets, seals, and service kits</li><li>Fuel injection, cooling, lubrication, and electrical sensors</li><li>Turbochargers, pumps, valves, and overhaul components</li></ul>',
      partTwo:
        `<h2>Fast Availability Checks</h2><p>Send part numbers, engine serial number, generator set model if available, quantity, and destination. We will check availability and shipping options.</p>${inquiryCta}`,
    },
  },
  {
    slug: 'industrial-equipment-engines',
    title: 'Industrial Equipment Engines',
    seoTitle: 'Industrial Equipment Diesel Engine Parts | Diesel Part Source',
    h1Title: 'Industrial Equipment Engine Parts',
    summary:
      'Diesel engine parts for pumps, compressors, heavy machinery, oilfield units, construction equipment, and industrial power systems.',
    productSlugs: ['cummins-parts', 'deutz-parts', 'mtu-spare-parts'],
    content: {
      partOne:
        '<h2>Industrial Engine Parts</h2><p>Industrial equipment owners need practical sourcing for engines in pumps, compressors, construction machines, oilfield units, and power packages. We help buyers identify parts from engine plates, old part photos, and part lists.</p><h3>Supported Needs</h3><ul><li>Breakdown repair and urgent replacement parts</li><li>Scheduled service kits and filters</li><li>Fuel, cooling, lubrication, and control components</li><li>Overhaul list checking and consolidated shipment</li></ul>',
      partTwo:
        `<h2>Reduce Downtime</h2><p>For urgent breakdowns, send the failure part photo, engine model, serial number, destination, and deadline in the first message.</p>${inquiryCta}`,
    },
  },
  {
    slug: 'rail-engine-parts',
    title: 'Rail Engine Parts',
    seoTitle: 'Rail Diesel Engine Parts | MTU Engine Parts Supplier',
    h1Title: 'Rail Diesel Engine Parts',
    summary:
      'MTU and diesel engine parts support for rail maintenance teams, locomotive service providers, and transit operators.',
    productSlugs: ['mtu-spare-parts', 'mtu-4000-series-parts', 'detroit-diesel-parts'],
    content: {
      partOne:
        '<h2>Rail Engine Parts Support</h2><p>Rail maintenance schedules require correct parts and dependable logistics. Diesel Part Source supports MTU and diesel engine parts inquiries for rail equipment, locomotive service, and transit maintenance programs.</p><h3>Common Rail Requests</h3><ul><li>Fuel-system, cooling, lubrication, and filtration parts</li><li>Sensors, control components, and electrical items</li><li>Maintenance kits and overhaul components</li></ul>',
      partTwo:
        `<h2>Planned Maintenance Lists</h2><p>Send parts lists early for line-by-line availability checks, replacement confirmation, and shipment planning.</p>${inquiryCta}`,
    },
  },
  {
    slug: 'shipyard-repair-overhaul',
    title: 'Shipyard Repair & Overhaul',
    seoTitle: 'Shipyard Engine Parts and Overhaul Support | Diesel Part Source',
    h1Title: 'Shipyard Repair & Overhaul Parts',
    summary:
      'Parts-list checking, consolidated shipment, and urgent sourcing support for shipyards and marine repair companies.',
    productSlugs: ['mtu-spare-parts', 'mtu-2000-series-parts', 'mtu-4000-series-parts'],
    content: {
      partOne:
        '<h2>Shipyard Parts Coordination</h2><p>Shipyard repair work often involves long parts lists, changing deadlines, and multiple engine configurations. We support line-by-line checks for MTU and related engine parts, including routine service items and major overhaul components.</p><h3>How We Help</h3><ul><li>Part-number and serial-number verification</li><li>Availability checks across complete overhaul lists</li><li>Export packing and shipment coordination</li><li>Urgent follow-up for missing or delayed items</li></ul>',
      partTwo:
        `<h2>Send Excel Lists</h2><p>For overhaul work, send your list in Excel or email format with part number, quantity, engine model, and deadline. Photos can be attached for unclear items.</p>${inquiryCta}`,
    },
  },
  {
    slug: 'energy-power-plant-engines',
    title: 'Energy & Power Plant Engines',
    seoTitle: 'Power Plant Diesel Engine Parts | Diesel Part Source',
    h1Title: 'Energy & Power Plant Engine Parts',
    summary:
      'Diesel engine parts for energy suppliers, standby power systems, independent power plants, and industrial generator operations.',
    productSlugs: ['mtu-4000-series-parts', 'cummins-parts', 'deutz-parts'],
    content: {
      partOne:
        '<h2>Power Plant Engine Parts</h2><p>Energy and power generation users need reliable spare-parts planning to keep standby and continuous-duty engines available. We support MTU, Cummins, and DEUTZ parts inquiries for generator and power plant applications.</p><h3>Common Needs</h3><ul><li>Maintenance kits, filters, belts, and consumables</li><li>Sensors, pumps, injectors, and fuel-system parts</li><li>Cooling, lubrication, turbocharging, and overhaul components</li></ul>',
      partTwo:
        `<h2>Maintenance Planning</h2><p>Share the service schedule and parts list in advance so availability and shipping can be planned before the maintenance window.</p>${inquiryCta}`,
    },
  },
] as const;
