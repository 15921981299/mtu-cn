type IndustryItem = {
  slug: string;
  title: string;
  icon: string;
  image: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  content: {
    partOne: string;
    partTwo: string;
  };
};

export const industries: IndustryItem[] = [
  {
    slug: 'marine',
    title: 'Marine',
    icon: '/images/marine-diesel-engine-parts.webp',
    image: '/images/marine-diesel-engine-parts.webp',
    seoTitle: 'Marine Diesel Engine Parts Supplier for Shipyards & Fleets',
    h1Title: 'Marine Diesel Engine Parts for Shipyards & Fleets',
    summary:
      'Parts sourcing and consolidated RFQ support for shipyards, vessel operators, marine service companies, yachts, ferries, workboats, and offshore fleets.',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Marine Parts Supply for Maintenance Teams</h2>
        <p>Diesel Part Source supports shipyards, vessel operators, and marine service companies that need verified diesel engine parts, consolidated quotations, export packing, and delivery to a port, yard, or maintenance warehouse.</p>
        <h3>Who We Support</h3>
        <ul>
          <li>Ferry, workboat, and commercial vessel fleets</li>
          <li>Ferries, yachts, shipyards, and repair companies</li>
          <li>Offshore and harbor service vessels</li>
        </ul>
        <h3>Typical Procurement Work</h3>
        <ul>
          <li>Mixed maintenance lists covering filters, seals, sensors, pumps, and fuel parts</li>
          <li>Urgent breakdown inquiries with a fixed vessel or yard deadline</li>
          <li>Planned top-end repair and major-overhaul quotations</li>
          <li>Repeat fleet replenishment consolidated into export-ready shipments</li>
        </ul>
        <p>For MTU-specific model and component coverage, use our <a href="/applications/marine-propulsion-engines/">MTU marine engine parts guide</a>.</p>
        <h3>Reading the Marine Engine Designation</h3>
        <p>On MTU engines the application letter in the model code matters as much as the series number. An "M" designation such as 16V 2000 M72 or 12V 4000 M93L identifies a marine rating, and marine ratings often use different injectors, seawater pumps, heat exchangers, and turbocharger references from the same series built for generator or rail duty. We therefore ask for the complete model code and serial number from the engine data plate rather than the series alone.</p>
      `,
      partTwo: `
        <h2>From Parts List to Marine Delivery</h2>
        <p>We check part numbers against the engine model and serial number, identify replacement references, return line-by-line availability, and arrange export shipment to the repair yard, vessel operator, or maintenance warehouse.</p>
        <h3>Shipping to a Vessel or Yard</h3>
        <ul>
          <li>Air freight to the nearest international airport for breakdown orders, with the vessel name and agent details on the shipping documents</li>
          <li>Consolidated sea or air shipments for docking lists and annual maintenance stock</li>
          <li>Packing marked by line item so the engine-room crew can match each box to the purchase order</li>
          <li>Commercial invoice, packing list, and origin documents prepared for customs clearance at the destination port</li>
        </ul>
        <p>Delivery terms, payment options, and sample policy are explained on our <a href="/terms/shipping/">shipping terms</a> and <a href="/terms/payment/">payment terms</a> pages.</p>
        <p><a href="/contact/">Send a marine parts inquiry</a></p>
      `,
    },
  },
  {
    slug: 'industrial-engines',
    title: 'Industrial Engines',
    icon: '/images/industrial-diesel-engine-parts.webp',
    image: '/images/industrial-diesel-engine-parts.webp',
    seoTitle: 'Industrial Engine Parts | Diesel Part Source',
    h1Title: 'Industrial Engine Parts',
    summary:
      'Parts sourcing for diesel engines used in pumps, compressors, heavy machinery, oilfield units, and industrial power systems.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'cummins-engine-parts', 'deutz-engine-parts'],
    content: {
      partOne: `
        <h2>Parts Supply for Industrial Engine Fleets</h2>
        <p>Diesel engines in pumps, compressors, drilling rigs, mining equipment, and construction machinery usually run far from a dealer counter. When one of them stops, the maintenance team needs the correct part identified quickly and shipped to a site that may be hours from the nearest city. Diesel Part Source works with plant maintenance departments, equipment rental fleets, and engine service contractors that buy MTU, Cummins, DEUTZ, and Detroit Diesel parts for this kind of equipment.</p>
        <h3>Equipment We Regularly Quote For</h3>
        <ul>
          <li>Fire-water pumps, dewatering pumps, and irrigation pump sets</li>
          <li>Air and gas compressors, including skid-mounted packages</li>
          <li>Drilling, fracturing, and oilfield power units</li>
          <li>Mining haul trucks, loaders, crushers, and screening plant</li>
          <li>Construction machinery and mobile power packs</li>
        </ul>
        <h3>Why the Equipment Builder Matters</h3>
        <p>An industrial engine is often installed by a pump, compressor, or machine manufacturer that adds its own radiator, air intake, wiring harness, and control panel. The engine maker's part number covers the engine itself, but packager-supplied items such as hoses, brackets, and cooling-package parts follow the equipment builder's references. Tell us both the engine model and the equipment make and model, so we can separate engine parts from packager parts before quoting.</p>
      `,
      partTwo: `
        <h2>What We Need to Quote</h2>
        <p>Send engine model, serial number, part number, photos, quantity, and required delivery date for a fast response.</p>
        <h3>Typical Industrial Requests</h3>
        <ul>
          <li>Filter and service-kit replenishment for a fleet of identical units, quoted per engine set</li>
          <li>Breakdown parts such as injectors, sensors, water pumps, or starter motors</li>
          <li>In-frame or out-of-frame overhaul lists with pistons, liners, bearings, and gasket kits</li>
          <li>Hard-to-find references for older engines that are still in service</li>
        </ul>
        <p>For maintenance items, a spin-on part such as the <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 oil filter</a> can be checked directly in the <a href="/part-products/">parts catalog</a>. For brand-level coverage, see <a href="/products/cummins-parts/">Cummins parts</a>, <a href="/products/deutz-parts/">DEUTZ parts</a>, and the <a href="/applications/industrial-equipment-engines/">industrial equipment engine guide</a>.</p>
        <h3>Delivery to Remote Sites</h3>
        <p>We quote delivery to the address you specify, or to a forwarder or consolidation point if the site is not reachable by courier. Heavy items such as cylinder heads and crankshaft components are crated and quoted with gross weight and dimensions so freight costs are clear before the order is placed.</p>
        <p><a href="/contact/">Request industrial engine parts</a></p>
      `,
    },
  },
  {
    slug: 'power-generation',
    title: 'Power Generation',
    icon: '/images/generator-engine-parts.webp',
    image: '/images/generator-engine-parts.webp',
    seoTitle: 'Generator Engine Parts | Diesel Part Source',
    h1Title: 'Power Generation Engine Parts',
    summary:
      'Diesel engine spare parts for generator sets, standby power, prime power, and power plant maintenance programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'cummins-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Generator Engine Parts</h2>
        <p>We support generator operators with service parts and overhaul components for MTU, Cummins, DEUTZ, and related diesel engines. Our buyers include facility managers responsible for standby sets at hospitals and data centers, rental companies running prime-power fleets, and service contractors that maintain gensets under annual contracts.</p>
        <h3>Standby and Prime Power Have Different Parts Needs</h3>
        <p>A standby generator may run only during tests and outages, so its parts plan is driven by calendar intervals: filters, coolant, belts, hoses, and batteries age even when engine hours are low. A prime-power or continuous-duty set accumulates hours quickly, so injectors, turbochargers, water pumps, and top-end components reach their service limits sooner. Telling us the duty type and annual running hours helps us suggest a sensible spare-parts list instead of quoting single items one at a time.</p>
        <h3>Typical Requirements</h3>
        <ul>
          <li>Routine maintenance kits, oil and fuel filters, and air-filter elements</li>
          <li>Fuel, cooling, lubrication, and control parts</li>
          <li>Pressure, temperature, speed, and level sensors that trigger alarms or shutdowns</li>
          <li>Critical spares kept on site for standby and prime-power engines</li>
          <li>Overhaul parts for MTU 2000 and 4000 generator engines</li>
        </ul>
      `,
      partTwo: `
        <h2>Planned Maintenance or Breakdown</h2>
        <p>Whether you are stocking a maintenance warehouse or responding to an outage, we help quote the correct parts and shipping route.</p>
        <h3>Identifying a Generator Engine Correctly</h3>
        <p>On MTU generator engines, a "G" in the model code, as in 16V 4000 G63 or 12V 2000 G65, marks a generator rating. The generator-set nameplate shows the packager and kVA rating, while the engine data plate shows the engine model and serial number. Send photos of both plates: the engine plate decides injector, turbocharger, and sensor references, and the set plate helps with radiator and control items.</p>
        <h3>Common Fault-Driven Orders</h3>
        <ul>
          <li>Low oil pressure or high coolant temperature alarms traced to a failed sensor such as a <a href="/part-products/0035352231-pressure-sensor/">pressure sensor</a> or <a href="/part-products/0005356430-temperature-sensor/">temperature sensor</a></li>
          <li>Speed-signal faults that need a replacement <a href="/part-products/0005357633-speed-sensor/">speed sensor</a></li>
          <li>Coolant leaks from a water pump or heat exchanger seal</li>
          <li>Hard starting or smoke that leads to injector replacement</li>
        </ul>
        <p>See the <a href="/applications/auxiliary-generator-engines/">generator engine parts guide</a> and <a href="/applications/energy-power-plant-engines/">power plant engine guide</a> for engine-level detail.</p>
        <p><a href="/contact/">Ask for generator engine support</a></p>
      `,
    },
  },
  {
    slug: 'rail',
    title: 'Rail',
    icon: '/images/mtu-4000-series-overhaul-parts.webp',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    seoTitle: 'Rail Diesel Engine Parts | Diesel Part Source',
    h1Title: 'Rail Diesel Engine Parts',
    summary:
      'Engine parts support for rail traction, locomotive auxiliary systems, and fleet maintenance programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Rail Engine Parts</h2>
        <p>Diesel Part Source supports rail-related engine parts inquiries for operators and maintenance contractors handling scheduled fleet service and urgent repairs. Typical buyers are depot maintenance teams, rolling-stock overhaul workshops, and track-maintenance contractors that run diesel locomotives, diesel multiple units, shunters, and on-track machines.</p>
        <h3>Support Scope</h3>
        <ul>
          <li>MTU Series 2000 and 4000 rail engines, including PowerPack installations</li>
          <li>Legacy MTU 396 and Detroit Diesel engines still running in older fleets</li>
          <li>Maintenance items, sensors, and auxiliary-drive components</li>
          <li>Overhaul components for planned depot work</li>
          <li>Part-number confirmation for older engine platforms</li>
        </ul>
        <h3>Why Rail Parts Need Extra Checking</h3>
        <p>Rail engines carry an "R" application code, for example 12V 4000 R43 or 16V 4000 R84, and they are often installed in an underfloor or power-car arrangement specific to the vehicle builder. Two engines with the same series number can differ in turbocharger, cooling, and control references because of emission stage, rating, and installation. We match every line against the engine serial number and, where relevant, the vehicle type before quoting.</p>
      `,
      partTwo: `
        <h2>Fleet Maintenance and Overhaul Planning</h2>
        <p>Rail operators usually work to mileage or hour-based exam schedules, so parts are needed in predictable batches. We can quote a complete exam kit per engine, then repeat the same configuration for each unit in the fleet, which keeps purchasing simple and makes stock control at the depot easier.</p>
        <h3>Information to Send</h3>
        <ul>
          <li>Engine model and serial numbers for each unit, or a fleet list</li>
          <li>Vehicle builder and class, if the engine is installed in a power pack</li>
          <li>Part numbers from the parts manual or previous orders</li>
          <li>Exam type, quantity per engine, and the depot delivery address</li>
        </ul>
        <p>Engine-level coverage is described in our <a href="/applications/rail-engine-parts/">rail engine parts guide</a>, and individual references can be searched in the <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 parts catalog</a> and <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 parts catalog</a>.</p>
        <p><a href="/contact/">Request rail engine parts</a></p>
      `,
    },
  },
  {
    slug: 'shipyards-repair',
    title: 'Shipyards & Repair',
    icon: '/images/marine-diesel-engine-parts.webp',
    image: '/images/mtu-part-number-verification.webp',
    seoTitle: 'Shipyard Diesel Engine Parts | Diesel Part Source',
    h1Title: 'Shipyard & Repair Engine Parts',
    summary:
      'Consolidated spare-parts sourcing for shipyards, engine repair companies, and overhaul contractors.',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Shipyard Parts Support</h2>
        <p>Repair schedules move quickly. We help shipyards and engine service companies consolidate urgent spare-parts lists and confirm correct replacements. A dry-docking or refit window is fixed in advance, and every day a vessel stays in the yard costs the owner money, so the parts list has to be complete and correct before the engine is opened.</p>
        <h3>Useful for</h3>
        <ul>
          <li>Engine overhaul and repair projects</li>
          <li>Docking maintenance parts lists</li>
          <li>Multi-engine spare-parts consolidation for main and auxiliary engines</li>
          <li>Yards working on several vessels from different owners at the same time</li>
        </ul>
        <h3>How We Handle a Yard Parts List</h3>
        <p>Yards usually send a spreadsheet taken from the owner's work specification, sometimes mixing part numbers from different manuals and revisions. We review each line against the engine model and serial number, flag superseded or duplicated references, and mark items where the old part should be inspected first, such as liners and bearings that come in size grades. The quotation returns each line with availability, lead time, and the supply route, so the yard can decide quickly which items to order now and which to hold until the engine has been inspected.</p>
      `,
      partTwo: `
        <h2>One Inquiry, Many Parts</h2>
        <p>Send your complete parts list and quantities. We will quote availability, alternatives where relevant, and shipment timing.</p>
        <h3>Items That Often Surface Mid-Project</h3>
        <ul>
          <li>Gasket and seal kits once a cylinder head or cover is removed, see <a href="/part-products/catalog/mtu-gasket-kits/">MTU gasket kits</a></li>
          <li>Valve-train parts found worn during inspection, see <a href="/part-products/catalog/mtu-valve-train/">MTU valve-train parts</a></li>
          <li>Pistons, liners, and bearings in the size required after measurement, see <a href="/part-products/catalog/mtu-pistons-liners/">pistons and liners</a></li>
          <li>Seawater pump and heat exchanger parts after pressure testing</li>
        </ul>
        <p>Because these items appear after the engine is opened, we keep the original quotation open and add follow-up lines to the same order and shipment where possible. For engine-specific overhaul detail, see the <a href="/applications/shipyard-repair-overhaul/">shipyard repair and overhaul guide</a> and the <a href="/products/mtu-4000-series-parts/overhaul-parts/">MTU 4000 overhaul parts</a> page.</p>
        <p><a href="/contact/">Send a shipyard parts list</a></p>
      `,
    },
  },
  {
    slug: 'energy-suppliers',
    title: 'Energy Suppliers',
    icon: '/images/generator-engine-parts.webp',
    image: '/images/global-engine-parts-delivery.webp',
    seoTitle: 'Engine Parts for Energy Suppliers | Diesel Part Source',
    h1Title: 'Engine Parts for Energy Suppliers',
    summary:
      'Spare-parts sourcing for energy companies operating diesel engines in remote, standby, offshore, and industrial power environments.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'mtu-engine-parts', 'cummins-engine-parts'],
    content: {
      partOne: `
        <h2>Engine Parts for Energy Operations</h2>
        <p>Energy suppliers need dependable spare-parts channels for remote sites, standby systems, and industrial power units. We help source and ship the correct components worldwide. Our customers in this sector include independent power producers, mining and oil-and-gas operators with their own power stations, utility contractors supplying island or off-grid networks, and EPC companies that need commissioning and first-year spares for a new plant.</p>
        <h3>Common Requests</h3>
        <ul>
          <li>Critical spares for MTU, Cummins, and DEUTZ engines</li>
          <li>Generator maintenance and overhaul components</li>
          <li>Operational spares packages sized to the number of engines on site</li>
          <li>Replacement sensors, actuators, and control-system items</li>
          <li>Export packing for remote project destinations</li>
        </ul>
        <h3>Planning Spares for a Remote Site</h3>
        <p>When the nearest airport is days away, waiting for a single failed part is not an option. A practical approach is to keep a site stock of consumables for one full service interval, plus a small set of failure-prone items such as sensors, injectors, belts, and water-pump seals. We can work from the engine count, running hours, and service intervals to propose a starting list, which your engineers can then adjust to local experience.</p>
      `,
      partTwo: `
        <h2>Global Shipment Coordination</h2>
        <p>Tell us your site location, urgency, and required documentation. We will quote parts and logistics together.</p>
        <h3>Documentation for Project Shipments</h3>
        <ul>
          <li>Commercial invoice and packing list itemized to your purchase-order lines</li>
          <li>Certificate of origin where the destination requires it</li>
          <li>Case marking with project name, PO number, and consignee</li>
          <li>Gross weight and dimensions per case so freight can be booked in advance</li>
        </ul>
        <p>Larger orders are usually shipped by sea or consolidated air freight to a project forwarder, while urgent breakdown items go by express courier. Engine-level detail for power plants is covered in the <a href="/applications/energy-power-plant-engines/">power plant engine guide</a>, and our payment and delivery options are listed on the <a href="/terms/payment/">payment terms</a> and <a href="/terms/shipping/">shipping terms</a> pages.</p>
        <p><a href="/contact/">Request energy engine parts</a></p>
      `,
    },
  },
];
