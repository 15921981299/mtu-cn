const cta = (label: string) =>
  `<p style="margin-top:20px;"><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">${label}</a></p>`;

export const productSubpages = [
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-part-number-lookup',
    title: 'MTU Part Number Lookup & Identification Support',
    seoTitle: 'MTU Part Number Lookup | Diesel Part Source',
    h1Title: 'MTU Part Number Lookup',
    summary:
      'Send your MTU part number, engine model, serial number, or nameplate photo. Diesel Part Source helps verify the correct genuine or OEM manufacturer replacement before quotation.',
    content: {
      partOne: `<h2>How to Identify MTU Parts</h2><p>The fastest way to quote MTU parts is with the exact part number and engine serial number. If the part number is missing or superseded, send photos of the old part, nameplate, installation position, and any casting or label markings.</p><h3>Start with the Available Information</h3><ul><li>Exact number: search the <a href="/part-products/">MTU engine parts online catalog</a></li><li>Engine series: browse <a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a>, <a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a>, or <a href="/part-products/catalog/mtu-396-series/">MTU 396 parts</a></li><li>Component type: browse <a href="/part-products/catalog/mtu-injectors/">injectors</a>, <a href="/part-products/catalog/mtu-fuel-pumps/">fuel pumps</a>, <a href="/part-products/catalog/mtu-filters/">filters</a>, or <a href="/part-products/catalog/mtu-turbocharger-parts/">turbocharger parts</a></li><li>Unclear marking: send the engine nameplate and old-part photos for identification</li><li>By power rating: <a href="/products/mtu-spare-parts/mtu-genset-parts-by-power/">MTU genset parts by power rating</a></li><li>Overhaul scope: <a href="/products/mtu-spare-parts/mtu-overhaul-kits/">MTU overhaul kits</a></li><li>Newer builds: <a href="/products/mtu-spare-parts/mtu-1600-series-parts/">Series 1600 &amp; F-build models</a></li><li>Legacy &amp; gas engines: <a href="/products/mtu-spare-parts/mtu-legacy-gas-engine-parts/">legacy &amp; gas coverage</a></li></ul><h3>Helpful Inquiry Details</h3><ul><li>Part number and quantity</li><li>Engine series, model, and serial number</li><li>Nameplate photo and old part photo</li><li>Vessel, generator, rail, or industrial application</li><li>Destination country and required delivery date</li></ul>`,
      partTwo: `<h2>Replacement and Supersession Checks</h2><p>Many MTU spare parts have updated or replacement references. We compare the original number, replacement history, engine application, and installation details before quotation so buyers avoid receiving an incorrect spare during urgent maintenance.</p><h3>Using an Existing Catalog or Parts List</h3><p>You can send an Excel list, PDF service list, catalog screenshot, or marked drawing. Include the engine serial number whenever possible; a PDF reference alone does not confirm fitment across production revisions.</p>${cta('Check an MTU part number')}`,
    },
  },
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-engine-series-guide',
    title: 'MTU Diesel Engines Series & Parts Guide',
    seoTitle: 'MTU Diesel Engines | Series & Parts Guide',
    h1Title: 'MTU Diesel Engines Series & Parts Guide',
    summary:
      'Guide to MTU diesel engine families and parts support for 183, 396, 595, 956, 1163, 2000, 4000, and 8000 series marine, power, rail, and industrial applications.',
    content: {
      partOne: `<h2>MTU Diesel Engine Families</h2><p>MTU diesel engines are used in marine propulsion, generator sets, rail traction, industrial power, and heavy-duty vehicle applications. A series name identifies the engine range, but the complete model, rating, application, and serial number determine the correct spare part.</p><h3>Current High-Demand Series</h3><ul><li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a> — compact high-speed engines used in marine, generator, rail, and industrial applications</li><li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a> — high-output engines used in marine propulsion, power generation, locomotives, and heavy industry</li><li><a href="/products/mtu-series-8000-engines/">MTU 8000</a> — large high-output marine engines requiring model-specific parts verification</li></ul><h3>Legacy MTU Engine Series</h3><ul><li><a href="/part-products/catalog/mtu-396-series/">MTU 396</a> — established marine and power-generation platform with continuing demand for legacy references</li><li><a href="/part-products/catalog/mtu-595-series/">MTU 595</a> — heavy-duty marine and industrial engine parts</li><li><a href="/part-products/catalog/mtu-956-series/">MTU 956</a> and <a href="/part-products/catalog/mtu-1163-series/">MTU 1163</a> — marine and heavy-duty applications with serial-specific parts histories</li><li>MTU 183, 331, 493, and 538 — legacy engine families supported through exact part-number and replacement checks</li></ul><h3>Common MTU Engine Parts</h3><ul><li>Maintenance filters, seals, gaskets, belts, and service kits</li><li>Fuel pumps, injectors, pressure valves, sensors, and control components</li><li>Cooling pumps, impellers, thermostats, turbochargers, and lubrication parts</li><li>Valves, cylinder-head parts, pistons, liners, rings, and bearings</li></ul>`,
      partTwo: `<h2>How to Read an MTU Engine Model Code</h2><p>The model code on the engine data plate tells you much more than the series. MTU uses two naming systems, one for the older large-bore series and one for the current series, and both can be read from left to right.</p><h3>Current Series: 2000, 4000, 1800, and 8000</h3><p>Take <strong>12V 4000 M93L</strong> as an example:</p><ul><li><strong>12</strong> is the number of cylinders</li><li><strong>V</strong> is the cylinder arrangement; R stands for an in-line engine</li><li><strong>4000</strong> is the series</li><li><strong>M</strong> is the application: M marine, G diesel generator set, L gas generator set, R rail, S industrial with variable speed, P oil and gas, and C mining</li><li><strong>9</strong> is the application subgroup, which for marine engines reflects the load profile</li><li><strong>3</strong> is the build generation, so M93 is a later build than M90</li><li><strong>L</strong> marks an additional option, typically an increased rating</li></ul><h3>Older Series: 396, 595, 956, and 1163</h3><p>Take <strong>16V 396 TE74L</strong>. After the cylinder count and series, the letters describe charging and charge-air cooling: <strong>TB</strong> and <strong>TE</strong> are turbocharged versions with different charge-air cooling arrangements. The first digit is the application group, for example 3 for constant-speed generator sets and 5, 6, 7, or 9 for marine use, and the second digit is the build. A trailing L again marks an increased rating.</p><h3>Why It Matters for Parts</h3><p>The application letter and build digit are where parts usually change. A G-rated and an M-rated engine of the same series can share filters and seals but differ in injectors, turbochargers, cooling parts, and engine control. A later build can use different pistons or fuel-system parts from an earlier one. That is why we ask for the complete model code and serial number, not just "MTU 4000".</p><h2>How to Identify the Correct MTU Engine Part</h2><p>Two engines in the same series can use different injectors, pumps, sensors, turbochargers, cooling components, and overhaul grades depending on application, power rating, production revision, and emissions configuration.</p><h3>Send These Details</h3><ul><li>Complete engine model and serial number</li><li>Exact part number, old-part marking, or catalog position</li><li>Engine nameplate and component label photos</li><li>Quantity, destination, and required delivery date</li></ul><p>Use the <a href="/part-products/">MTU engine parts catalog</a> when you already have a part number. For marine applications, see the <a href="/applications/marine-propulsion-engines/">MTU marine engine parts guide</a>.</p>${cta('Request MTU diesel engine parts')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: '16v-2000-engine-parts',
    title: 'MTU 16V 2000 Engine Parts',
    seoTitle: 'MTU 16V 2000 Engine Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 16V 2000 Engine Parts',
    summary:
      'MTU 16V 2000 engine parts for marine propulsion, generator, rail, and industrial applications, with serial-number verification and worldwide delivery.',
    content: {
      partOne: `<h2>Parts Support for MTU 16V 2000 Engines</h2><p>The MTU 16V 2000 family includes several ratings and application variants used in fast vessels, generator sets, rail equipment, and industrial installations. The cylinder configuration alone is not enough to confirm fitment, so every inquiry is checked against the complete model designation, engine serial number, application, and existing part reference.</p><h3>Common MTU 16V 2000 Parts Requests</h3><ul><li>Fuel injectors, pumps, pressure valves, and fuel lines</li><li>Oil, fuel, and air filters for scheduled maintenance</li><li>Cooling pumps, impellers, thermostats, and sealing components</li><li>Cylinder-head gaskets, valves, bearings, pistons, and liners</li><li>Speed, pressure, temperature, and level sensors</li></ul><p>For the marine M96L variant, see <a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L engine parts</a>. Use the <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 parts catalog</a>, browse <a href="/part-products/catalog/mtu-injectors/">MTU injectors</a>, or check <a href="/part-products/catalog/mtu-fuel-pumps/">MTU fuel pumps</a> by component label and engine serial.</p>`,
      partTwo: `<h2>How We Verify 16V 2000 Fitment</h2><p>Send the full engine model, serial number, part number, quantity, and destination. For unclear or superseded references, include the nameplate, old-part label, connector, mounting position, or catalog drawing. We return the available OEM, OEM-alternative, reman, or replacement route with lead time and shipping options clearly identified.</p><h3>Typical Service Situations</h3><ul><li>Planned marine or generator maintenance lists</li><li>Injector imbalance, sensor faults, cooling leaks, or filter replenishment</li><li>Cylinder-head or top-end repair</li><li>Major overhaul parts consolidated into one RFQ</li></ul>${cta('Request MTU 16V 2000 parts')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: 'mtu-m96l-engine-parts',
    title: 'MTU 16V 2000 M96L Engine Parts',
    seoTitle: 'MTU M96L Engine Parts | 16V 2000 M96L',
    h1Title: 'MTU 16V 2000 M96L Engine Parts',
    summary:
      'MTU M96L engine parts for 16V 2000 marine propulsion applications, with complete model, serial-number, and component-reference verification.',
    content: {
      partOne: `<h2>Parts for MTU 16V 2000 M96L</h2><p>The MTU 16V 2000 M96L is associated with high-performance marine propulsion and yacht applications. Its fuel, turbocharging, cooling, control, and service components must be checked against the complete engine serial number and installation because nearby Series 2000 variants can use different references.</p><h3>Common M96L Parts Inquiries</h3><ul><li>Fuel injectors, pumps, pressure-control valves, and high-pressure lines</li><li>Oil, fuel, and air filters for scheduled yacht and vessel maintenance</li><li>Seawater pumps, coolant pumps, impellers, thermostats, and seals</li><li>Turbocharger components, sensors, wiring, and engine-control parts</li><li>Gaskets, valves, pistons, liners, bearings, and overhaul components</li></ul><p>Browse the <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 part-number catalog</a>, <a href="/part-products/catalog/mtu-injectors/">MTU injector references</a>, <a href="/part-products/catalog/mtu-fuel-pumps/">MTU fuel pumps</a>, and <a href="/part-products/catalog/mtu-2000-cooling-system-parts/">Series 2000 cooling-system parts</a>.</p>`,
      partTwo: `<h2>M96L Fitment and RFQ Checks</h2><p>Send the engine nameplate, complete model and serial number, exact part references, quantities, vessel or shipyard location, and maintenance deadline. Component labels are especially important for injectors, turbochargers, pumps, sensors, and control modules.</p><h3>Typical M96L Service Situations</h3><ul><li>Planned yacht or vessel service-kit replenishment</li><li>Fuel-pressure, injector-balance, sensor, or control faults</li><li>Cooling leakage, seawater-pump wear, or overheating investigation</li><li>Turbocharger service and major-overhaul parts planning</li></ul><p>We identify the available supply route and shipping option after the model and part reference have been checked.</p>${cta('Request MTU M96L engine parts')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: 'marine-generator-service-parts',
    title: 'MTU 2000 Series Marine & Generator Service Parts',
    seoTitle: 'MTU 2000 Series Marine Generator Parts | Diesel Part Source',
    h1Title: 'MTU 2000 Marine & Generator Parts',
    summary:
      'Service and overhaul parts for MTU 2000 series marine propulsion, auxiliary generator, and industrial power applications.',
    content: {
      partOne: `<h2>MTU 2000 Series Applications</h2><p>The MTU 2000 series is widely used in marine propulsion, auxiliary power, generator sets, and industrial power units. Planned maintenance normally includes filters, belts, seals, cooling components, fuel-system parts, and electrical sensors.</p><h3>Marine and Generator Versions Are Not Interchangeable</h3><p>The application letter in the model code tells you how the engine was built. An M-rated engine such as 12V 2000 M72 or 16V 2000 M84 is set up for propulsion, usually with a seawater pump, heat exchanger, and marine-specific turbocharging. A G-rated engine such as 12V 2000 G65 drives a generator at constant speed and is often radiator-cooled. Many maintenance items are shared across both, but cooling, exhaust, fuel-injection, and control parts frequently differ, so we confirm the full designation before quoting.</p><h3>Typical Request Lists</h3><ul><li>Routine service kits for fleet maintenance, built around spin-on parts such as the <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 oil filter</a> and <a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091 fuel filter</a></li><li>Fuel injection, turbocharging, cooling, and lubrication parts</li><li>Sensors, wiring, control components, and replacement assemblies</li><li>Seawater pump impellers and seals for marine engines</li><li>Overhaul parts for scheduled engine-room work</li></ul><p>Browse by system in the <a href="/part-products/catalog/mtu-2000-filters-parts/">Series 2000 filters</a>, <a href="/part-products/catalog/mtu-2000-cooling-system-parts/">cooling system</a>, <a href="/part-products/catalog/mtu-2000-fuel-system-parts/">fuel system</a>, and <a href="/part-products/catalog/mtu-2000-sensors-and-electrical-parts/">sensors and electrical</a> catalogs.</p>`,
      partTwo: `<h2>Urgent Downtime Support</h2><p>For vessel or generator downtime, include the target delivery date and destination port or city. We will check stock and practical shipping routes before confirming the order.</p><h3>Building an Onboard or On-Site Spares Kit</h3><p>Vessels on long passages and generators at remote sites benefit from a small spares kit kept next to the engine. A typical starting point for a Series 2000 engine is one full set of oil, fuel, and air filters, a seawater pump impeller and seal kit on marine units, drive belts, a thermostat, and the pressure and temperature sensors that most often cause alarms. Send the engine model, serial number, and running hours and we will propose a kit you can adjust.</p><h3>Related Pages</h3><ul><li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 engine parts</a></li><li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L parts</a></li><li><a href="/applications/auxiliary-generator-engines/">Auxiliary generator engine parts</a></li><li><a href="/products/mtu-spare-parts/mtu-genset-parts-by-power/">MTU genset parts by power rating</a></li><li><a href="/part-number-index/">Part number index (EN · DE)</a></li></ul>${cta('Check MTU 2000 parts')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: 'overhaul-parts',
    title: 'MTU 4000 Series Overhaul Parts',
    seoTitle: 'MTU 4000 Series Overhaul Parts | Diesel Part Source',
    h1Title: 'MTU 4000 Series Overhaul Parts',
    summary:
      'Verified OEM, OEM-alternative, reman, and replacement overhaul routes for MTU 4000 series engines in marine, generator, rail, and industrial service.',
    content: {
      partOne: `<h2>Overhaul Parts for MTU 4000</h2><p>MTU 4000 series engines are used where reliability and uptime matter. Diesel Part Source supports maintenance teams with parts for cylinder-head work, piston and liner replacement, valve-train service, bearings, gaskets, seals, cooling, and fuel systems.</p><h3>Common Overhaul Categories</h3><ul><li>Pistons, liners, rings, bearings, and gaskets</li><li>Valves, guides, seats, and cylinder-head parts</li><li>Fuel pumps, injectors, sensors, and control items</li><li>Cooling, lubrication, turbocharging, and filtration components</li></ul>`,
      partTwo: `<h2>Build a Consolidated Parts List</h2><p>Send your planned overhaul list in Excel or email format. We can check part-number availability line by line and help consolidate export packing for international shipment.</p><h3>Top-End Work or Major Overhaul</h3><p>A top-end overhaul focuses on cylinder heads, valves, injectors, and turbochargers, and the parts list is fairly predictable. A major overhaul goes further into pistons, liners, bearings, and crankshaft work, where the final list depends on measurements taken after the engine is opened. For major work we suggest quoting in two stages: firm lines for items that are always replaced, such as gasket kits, seals, and rings, and provisional lines for size-graded parts that are confirmed once the inspection results are available.</p><h3>Information That Speeds Up the Quote</h3><ul><li>Complete engine model, for example 16V 4000 M93L or 20V 4000 G63, and the serial number</li><li>Overhaul scope and the running hours at the time of overhaul</li><li>Size codes or measurement records for liners, pistons, and bearings</li><li>Target date for parts to arrive at the workshop</li></ul><p>Browse references in the <a href="/part-products/catalog/mtu-4000-pistons-and-liners-parts/">Series 4000 pistons and liners</a>, <a href="/part-products/catalog/mtu-4000-bearings-parts/">bearings</a>, <a href="/part-products/catalog/mtu-4000-gaskets-and-seals-parts/">gaskets and seals</a>, and <a href="/part-products/catalog/mtu-4000-valve-train-parts/">valve-train</a> catalogs.</p>${cta('Request MTU 4000 overhaul parts')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: '12v-4000-engine-parts',
    title: 'MTU 12V 4000 Engine Parts',
    seoTitle: 'MTU 12V 4000 Engine Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 12V 4000 Engine Parts',
    summary:
      'MTU 12V 4000 engine parts for marine, generator, rail, and industrial service, including fuel, cooling, filtration, sensor, and overhaul components.',
    content: {
      partOne: `<h2>MTU 12V 4000 Parts Supply</h2><p>MTU 12V 4000 engines are used in high-output generator, marine, rail, and industrial installations. Model suffix, power rating, emissions configuration, and serial number can change the correct injector, sensor, cooling, and overhaul references, so we verify the complete engine identity before quotation.</p><h3>Parts Commonly Requested</h3><ul><li>Common-rail injectors, high-pressure pumps, valves, and fuel lines</li><li>Oil filters, fuel filters, air filters, and scheduled service items</li><li>Coolant pumps, impellers, thermostats, and heat-exchange components</li><li>Cylinder liners, pistons, ring sets, bearings, and gasket kits</li><li>Turbocharger, starter, alternator, sensor, and control components</li></ul><p>Browse the <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 parts catalog</a>, <a href="/part-products/catalog/mtu-fuel-pumps/">MTU fuel pumps</a>, <a href="/part-products/catalog/mtu-4000-filters-parts/">4000 filter part numbers</a>, or <a href="/part-products/catalog/mtu-starter-motors-alternators/">MTU starter motors and alternators</a>.</p>`,
      partTwo: `<h2>12V 4000 RFQ Checklist</h2><p>Include the complete 12V 4000 model and serial number, exact part numbers, quantities, destination, and maintenance deadline. For graded liners, pistons, and bearings, provide the size code or measurement record. For injectors and turbochargers, include the component nameplate or stamped reference.</p><h3>Common Failure and Maintenance Scenarios</h3><ul><li>Fuel-pressure faults or injector return-flow imbalance</li><li>Cooling leakage, pump wear, or thermostat malfunction</li><li>Oil consumption, liner wear, or scheduled major overhaul</li><li>Sensor-related derate and shutdown events</li></ul>${cta('Request MTU 12V 4000 parts')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: '16v-4000-engine-parts',
    title: 'MTU 16V 4000 Engine Parts',
    seoTitle: 'MTU 16V 4000 Engine Parts Supplier | Diesel Part Source',
    h1Title: 'MTU 16V 4000 Engine Parts',
    summary:
      'MTU 16V 4000 engine parts for marine propulsion, power generation, locomotive, and heavy industrial applications, verified by model and serial number.',
    content: {
      partOne: `<h2>Parts for MTU 16V 4000 Engines</h2><p>The MTU 16V 4000 platform serves applications where downtime has a high operational cost, including fast vessels, mission-critical generators, locomotives, and heavy industrial equipment. Parts vary across model suffixes, ratings, production revisions, and emissions configurations, making complete serial-number verification essential.</p><h3>16V 4000 Parts Categories</h3><ul><li>Injectors, high-pressure fuel pumps, rail valves, and fuel pipes</li><li>Turbocharger turbine wheels, housings, heat shields, and seals</li><li>Cylinder liners, pistons, bearings, valves, and cylinder-head gaskets</li><li>Cooling pumps, impellers, thermostats, filters, and lubrication parts</li><li>Starter motors, alternators, pressure, speed, and temperature sensors</li></ul><p>See the <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 part-number catalog</a>, <a href="/part-products/catalog/mtu-fuel-pumps/">MTU fuel pumps</a>, <a href="/part-products/catalog/mtu-4000-turbocharging-parts/">4000 turbocharger components</a>, <a href="/part-products/catalog/mtu-starter-motors-alternators/">starter motors and alternators</a>, and the <a href="/products/mtu-4000-series-parts/overhaul-parts/">MTU 4000 overhaul parts guide</a>.</p>`,
      partTwo: `<h2>Verification for 16V 4000 Orders</h2><p>Send the complete engine designation, serial number, current part reference, quantity, and destination. For major overhauls, an Excel list helps us check supersessions, size grades, availability, approximate shipment weight, and lead time line by line.</p><h3>Typical Inquiry Scenarios</h3><ul><li>Urgent vessel, locomotive, or generator downtime</li><li>Injector, turbocharger, sensor, or cooling-system faults</li><li>Top-end service and cylinder-head work</li><li>Planned major overhaul with graded internal components</li></ul>${cta('Request MTU 16V 4000 parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'service-kits-and-overhaul-parts',
    title: 'Cummins Service Kits & Overhaul Parts',
    seoTitle: 'Cummins Service Kits and Overhaul Parts | Diesel Part Source',
    h1Title: 'Cummins Service Kits & Overhaul Parts',
    summary:
      'Cummins service parts, maintenance kits, and overhaul components for generator, marine, and industrial diesel engines.',
    content: {
      partOne: `<h2>Cummins Parts Inquiry Checklist</h2><p>For Cummins parts, the model, CPL, and engine serial number help confirm the correct option. Include the part number, quantity, and whether the order is for routine maintenance, urgent repair, or overhaul planning.</p><h3>Parts We Commonly Quote</h3><ul><li>Filters, belts, seals, gaskets, and maintenance kits</li><li>Fuel injection, cooling, lubrication, and turbocharger parts</li><li>Sensors, control components, and replacement assemblies</li><li>Overhaul components for engines in generator and industrial service</li></ul>`,
      partTwo: `<h2>Send CPL and Serial Number</h2><p>Cummins CPL and serial data reduce the risk of wrong replacements, especially when several versions exist for the same engine model.</p><h3>Where to Find the Numbers</h3><p>The engine dataplate is usually on the gear housing or the rocker cover. It shows the engine serial number (ESN), the model, and the Control Parts List (CPL) number. The CPL defines the specific build of that engine, so two engines with the same model name, for example two QSK19 or two KTA38 units, can need different injectors, turbochargers, or fuel-pump references if their CPLs differ. A clear photo of the dataplate is the quickest way to avoid an incorrect part.</p><h3>Service Kits Versus Overhaul Kits</h3><ul><li><strong>Service kits</strong> cover scheduled items: oil, fuel, and coolant filters, belts, and the gaskets disturbed during routine work</li><li><strong>Top-end kits</strong> add head gaskets, valve-stem seals, and the seals needed for cylinder-head removal</li><li><strong>In-frame overhaul kits</strong> include pistons, liners, rings, rod and main bearings, and a full gasket set</li><li><strong>Out-of-frame overhaul</strong> may also need crankshaft, camshaft, and oil-pump components depending on inspection results</li></ul><p>Tell us which level of work is planned and we will quote the matching kit per engine, or list the parts individually if you prefer to build the kit yourself. More Cummins coverage is on the <a href="/products/cummins-parts/">Cummins parts</a> and <a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a> pages.</p>${cta('Check Cummins parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'industrial-equipment-parts',
    title: 'DEUTZ Industrial Equipment Parts',
    seoTitle: 'DEUTZ Industrial Equipment Parts | Diesel Part Source',
    h1Title: 'DEUTZ Industrial Equipment Parts',
    summary:
      'DEUTZ engine parts for construction machinery, pumps, compressors, power units, and industrial equipment maintenance.',
    content: {
      partOne: `<h2>DEUTZ Parts for Equipment Fleets</h2><p>DEUTZ engines are common in industrial equipment, construction machines, compressors, pumps, and power units. Diesel Part Source helps buyers source maintenance and repair parts with compatibility checks before shipment.</p><h3>Typical Categories</h3><ul><li>Filters, belts, seals, gaskets, and service kits</li><li>Fuel, cooling, lubrication, and electrical components</li><li>Overhaul parts and replacement assemblies</li><li>Parts for scheduled maintenance lists and urgent breakdown repair</li></ul>`,
      partTwo: `<h2>What to Include</h2><p>Send the DEUTZ engine model, serial number, old part number, quantity, and destination. Photos are useful for worn or unmarked parts.</p><h3>Air-Cooled and Liquid-Cooled Engines</h3><p>DEUTZ builds both air-cooled engines, such as the FL912 and BFL913 families, and liquid-cooled engines such as the BF4M1013 and TCD 2013 ranges. Air-cooled engines rely on a cooling fan, fan belt, and clean cylinder fins, so fan drives, belts, and oil-cooler parts are common replacement items. Liquid-cooled engines add water pumps, thermostats, and radiator hoses. Knowing which type you have narrows the parts list straight away.</p><h3>Engine Number and Equipment Builder</h3><p>The DEUTZ engine number is stamped on the crankcase and printed on the type plate, together with the engine model. Because DEUTZ engines are fitted by many machine builders, some parts such as radiators, air-intake pipes, and exhaust components are specific to the machine rather than the engine. Include the machine make and model as well as the engine data, so we can tell which parts come from the DEUTZ parts list and which follow the equipment builder.</p><h3>Common Breakdown Items</h3><ul><li>Fuel injection pumps, injectors, and fuel lift pumps</li><li>Cylinder-head gaskets and valve-cover gaskets</li><li>Oil coolers and oil-cooler seals</li><li>Starter motors, alternators, and stop solenoids</li></ul><p>See the <a href="/products/deutz-parts/">DEUTZ parts</a> overview and <a href="/capabilities/deutz-engine-parts/">DEUTZ engine parts sourcing</a> for more detail.</p>${cta('Request DEUTZ parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-ism-engine-parts',
    title: 'Cummins ISM Engine Parts',
    seoTitle: 'Cummins ISM 11L Engine Parts | ISM / QSM11 Spares',
    h1Title: 'Cummins ISM Engine Parts',
    summary:
      'Parts for the Cummins ISM / QSM11 inline-six 10.8 L engine used in heavy trucks, buses, marine propulsion, and generator sets, with ESN and CPL verification before quotation.',
    content: {
      partOne: `<h2>What the ISM Covers</h2><p>The ISM is the electronic version of the Cummins 11-litre inline-six. The same platform is sold as the QSM11 for off-highway duty: IS marks the on-highway specification and QS the off-highway one, so an ISM truck engine and a QSM11 marine or generator engine share the platform but are built to different duty specifications. When requesting parts, quote the full model and serial number rather than "ISM" alone.</p><h3>Common Applications</h3><ul><li>Class 8 highway trucks and buses</li><li>Motorhomes and vocational chassis</li><li>Marine propulsion and auxiliary generator sets (QSM11)</li><li>Fire pumps, cranes, and industrial power units</li></ul><h3>Commonly Requested Parts</h3><ul><li>Injectors, high-pressure fuel lines, and fuel-pump components</li><li>Turbocharger assemblies and mounting kits</li><li>EGR and aftertreatment components, which differ by model year and emissions configuration</li><li>Water pump, oil cooler, and coolant hoses</li><li>Cylinder-head gaskets, valve-cover gaskets, and vibration damper</li><li>Rail-pressure, camshaft-speed, and temperature sensors</li></ul>`,
      partTwo: `<h2>How We Verify ISM Fitment</h2><p>Cummins engines are built to a Control Parts List (CPL) that defines the exact build of an individual engine. Two ISM units with the same model name can differ in injectors, turbocharger, fuel-system, and aftertreatment references when their CPLs differ. The engine dataplate on the gear housing or rocker cover shows the engine serial number (ESN), model, and CPL; a clear photo of that plate is the fastest way to avoid an incorrect part.</p><h3>Mechanical and Electronic Generations</h3><p>The earlier M11 is a mechanical engine and the ISM is electronic. They share the same displacement and platform but their fuel systems, sensors, and control parts are not interchangeable. If your engine is described only as "Cummins 11", confirm which generation it is before ordering.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins service kits and overhaul parts</a></li><li><a href="/products/cummins-parts/">Cummins parts overview</a></li></ul>${cta('Request Cummins ISM parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-isl-engine-parts',
    title: 'Cummins ISL Engine Parts',
    seoTitle: 'Cummins ISL 8.9L Engine Parts | ISL / ISLe / QSL Spares',
    h1Title: 'Cummins ISL Engine Parts',
    summary:
      'Parts for the Cummins ISL, ISLe, and QSL 8.9-litre inline-six engine in buses, trucks, fire apparatus, marine, and industrial service, verified by CPL and serial number.',
    content: {
      partOne: `<h2>What the ISL Covers</h2><p>The ISL is the electronic 8.9-litre inline-six of the Cummins L family, in production since the late 1990s. ISLe denotes the electronic specification, QSL the off-highway and industrial version, and the later L9 continues the same family. The engines are widely used in buses and medium-heavy trucks, which means a large service population and steady parts demand.</p><h3>Common Applications</h3><ul><li>City and coach buses</li><li>Medium and heavy trucks, fire apparatus, and RVs</li><li>Excavators, cranes, and other construction equipment</li><li>Marine propulsion and generator sets (QSL)</li></ul><h3>Commonly Requested Parts</h3><ul><li>Injectors, fuel pumps, and fuel-line components</li><li>Water pump, fan drive, and thermostats</li><li>Air compressor and air-system components</li><li>Turbocharger and charge-air piping parts</li><li>Cylinder-head and valve-cover gaskets, seals, and mounting hardware</li><li>Speed, pressure, and temperature sensors</li></ul>`,
      partTwo: `<h2>How We Verify ISL Fitment</h2><p>Send the engine serial number and CPL from the dataplate, plus the part number and quantity. ISL-family engines span several emissions and control configurations, so injector, sensor, and aftertreatment references can differ between engines with the same model name. Where a part number is superseded, we trace the catalog history and confirm the direction before quoting.</p><h3>Building a Service List</h3><p>For fleet operators we can check a parts list line by line and flag numbers that need a serial-number confirmation before order release. That is usually quicker than quoting part by part and it surfaces supersessions early, before the parts are packed for shipment.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins service kits and overhaul parts</a></li></ul>${cta('Request Cummins ISL parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk19-engine-parts',
    title: 'Cummins QSK19 / KTA19 Engine Parts',
    seoTitle: 'Cummins QSK19 KTA19 19L Engine Parts | Spares',
    h1Title: 'Cummins QSK19 / KTA19 Engine Parts',
    summary:
      'Parts for the Cummins QSK19 and KTA19 19-litre inline-six engine in marine, mining, generator, and oilfield service, including injectors, liner kits, bearings, and turbochargers.',
    content: {
      partOne: `<h2>What the QSK19 Covers</h2><p>The QSK19 and its mechanical predecessor the KTA19 are 19-litre inline-six engines. They are workhorses of marine propulsion, mining equipment, generator sets, and oilfield pumps — applications where an engine can run thousands of hours between major services and parts are ordered against an overhaul plan rather than a single failure.</p><h3>Common Applications</h3><ul><li>Marine propulsion and auxiliary power</li><li>Mining trucks, loaders, and drills</li><li>Prime and standby generator sets</li><li>Oilfield pumps and industrial power units</li></ul><h3>Commonly Requested Parts</h3><ul><li>Injectors, injection pumps, and fuel-line components</li><li>Liner, piston, and ring kits, including oversize grades</li><li>Connecting-rod and main bearings</li><li>Turbocharger assemblies and aftercooler cores</li><li>Heat exchangers and seawater-side components for marine units</li><li>Starter motors, alternators, and mounting hardware</li></ul>`,
      partTwo: `<h2>Overhaul Planning for K-Series Engines</h2><p>For a planned overhaul, send the engine serial number, running hours, and the measurement records for liners, pistons, and bearings. Size-graded parts are confirmed after the engine is opened, so we usually quote firm lines for the items always replaced and provisional lines for the graded items. This avoids both shortages and parts that arrive in the wrong size.</p><h3>Verification</h3><p>KTA19 and QSK19 engines exist in mechanical and electronic generations with different fuel systems. The dataplate ESN and CPL decide the correct injector, pump, and sensor references. For marine units, include the gearbox and installation details when the part affects the driveline.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li><li><a href="/products/cummins-parts/">Cummins parts overview</a></li></ul>${cta('Request Cummins QSK19 parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk38-v12-engine-parts',
    title: 'Cummins QSK38 / KTA38 V12 Engine Parts',
    seoTitle: 'Cummins QSK38 KTA38 V12 38L Engine Parts | Spares',
    h1Title: 'Cummins QSK38 / KTA38 V12 Engine Parts',
    summary:
      'Parts for the Cummins QSK38 and KTA38 V12 38-litre engines in mining trucks, locomotives, marine propulsion, and large generator sets.',
    content: {
      partOne: `<h2>What the QSK38 Covers</h2><p>The QSK38 and KTA38 are 38-litre V12 engines at the top of the Cummins large-bore range. They power mining trucks, locomotives, vessels, and large generator sets, where a single unit can represent a seven-figure asset and unplanned downtime is measured in lost production per hour.</p><h3>Common Applications</h3><ul><li>Mining haul trucks and drilling equipment</li><li>Locomotive and rail power packs</li><li>Marine propulsion for workboats and ferries</li><li>Large prime-power and standby generator sets</li></ul><h3>Commonly Requested Parts</h3><ul><li>Injectors and fuel-system components</li><li>Liner, piston, and ring kits</li><li>Main and connecting-rod bearings</li><li>Turbochargers, charge-air coolers, and piping</li><li>Heat exchangers and cooling-system components</li><li>Electronic-build sensors, wiring, and control parts</li></ul>`,
      partTwo: `<h2>Sourcing for High-Value Installs</h2><p>For V12 installations we quote against the engine serial number and CPL, and we ask for the installation and duty details when the part affects cooling or the driveline. Marine and mining applications often combine OEM, OEM-alternative, and reman routes in one order; we label each line with its supply route so you can decide per item rather than per order.</p><h3>Consolidated Overhaul Lists</h3><p>Send an Excel list where possible. We check each line for availability, supersession, size grades, approximate shipment weight, and lead time, then return a single consolidated quotation with export packing arranged for the destination.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li></ul>${cta('Request Cummins QSK38 parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk50-v16-engine-parts',
    title: 'Cummins QSK50 / KTA50 V16 Engine Parts',
    seoTitle: 'Cummins QSK50 KTA50 V16 50L Engine Parts | Spares',
    h1Title: 'Cummins QSK50 / KTA50 V16 Engine Parts',
    summary:
      'Parts for the Cummins QSK50 and KTA50 V16 50-litre engines used in mining, marine, rail, and power generation, with consolidated overhaul-list support.',
    content: {
      partOne: `<h2>What the QSK50 Covers</h2><p>The QSK50 and KTA50 are 50-litre V16 engines — the largest members of the Cummins K and QS families. They are found in the largest mining trucks, locomotives, big vessels, and multi-megawatt generator sets. Engines at this scale are usually supported by a planned maintenance program, and parts orders arrive as consolidated lists rather than single line items.</p><h3>Common Applications</h3><ul><li>Ultra-class mining haul trucks</li><li>Locomotives and rail power</li><li>Large marine propulsion installations</li><li>Prime power and grid-support generator plants</li></ul><h3>Commonly Requested Parts</h3><ul><li>Injectors, pumps, and high-pressure fuel components</li><li>Liner, piston, and ring kits with size grades</li><li>Crankshaft, connecting-rod, and main bearings</li><li>Turbochargers and charge-air components</li><li>Oil pumps, coolers, and filtration components</li><li>Sensors, wiring, and electronic-control parts</li></ul>`,
      partTwo: `<h2>Working From an Overhaul List</h2><p>Send the engine model, serial number, running hours, and your planned list in Excel or PDF. We confirm each line against the catalog history, identify superseded numbers, separate firm from measurement-dependent items, and quote with lead time and shipment weight per line. For parts still installed, a photo of the component label usually settles the reference faster than a description.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li><li><a href="/products/cummins-parts/">Cummins parts overview</a></li></ul>${cta('Request Cummins QSK50 parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-6bt-engine-parts',
    title: 'Cummins 6BT / 4BT B-Series Engine Parts',
    seoTitle: 'Cummins 6BT 5.9L Engine Parts | B-Series Spares',
    h1Title: 'Cummins 6BT / 4BT B-Series Engine Parts',
    summary:
      'Parts for the mechanical Cummins 6BT5.9 and 4BT3.9 B-series engines: injection pumps, injectors, turbos, water pumps, and overhaul components, with generation checks before quoting.',
    content: {
      partOne: `<h2>What the B Series Covers</h2><p>The 6BT5.9 is a mechanical inline-six of 5.9 litres, in production since the mid-1980s and still rebuilt in large numbers today. The 4BT3.9 is its four-cylinder sibling. The naming reads left to right: <strong>6</strong> cylinders, <strong>B</strong> family, <strong>T</strong> turbocharged, <strong>5.9</strong> litres displacement. These engines are found in pickup trucks, generators, boats, tractors, and industrial machines worldwide, which makes B-series parts a permanent line rather than a passing demand.</p><h3>Common Applications</h3><ul><li>Light and medium trucks, including Dodge Ram applications</li><li>Generators, pumps, and industrial power units</li><li>Marine repowers and small workboats</li><li>Agricultural and construction equipment</li></ul><h3>Commonly Requested Parts</h3><ul><li>Rotary injection pumps, injectors, and fuel-supply components</li><li>Turbochargers and charge-air piping</li><li>Water pumps, thermostats, and hoses</li><li>Glow plugs, starters, and alternators</li><li>Cylinder-head gaskets, valve-cover gaskets, and front gear-train parts</li><li>Overhaul components: liners, pistons, rings, and bearings</li></ul>`,
      partTwo: `<h2>Mechanical or Electronic? Confirm Before Ordering</h2><p>A 6BT5.9 and an ISB5.9 are both "Cummins 5.9", but the first is mechanical and the second electronic. Injection systems, sensors, and much of what hangs off them are not interchangeable. When a customer asks for "5.9 parts", the first question is always which generation, then the CPL and serial number for the exact build.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins service kits and overhaul parts</a></li></ul>${cta('Request Cummins B-series parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-n14-engine-parts',
    title: 'Cummins N14 / NT855 Engine Parts',
    seoTitle: 'Cummins N14 NT855 14L Engine Parts | Spares',
    h1Title: 'Cummins N14 / NT855 Engine Parts',
    summary:
      'Parts for the Cummins N14 and NT855 14-litre inline-six engines in heavy trucks, generators, and industrial service, including PT fuel system and overhaul components.',
    content: {
      partOne: `<h2>What the N14 Covers</h2><p>The N14 is a 14-litre inline-six (855 cubic inches) that succeeded the NTC and NTA-855 in Cummins' big-cam line. It served heavy trucks, buses, generator sets, and industrial installations for many years and remains common in older fleets and stationary power worldwide.</p><h3>Common Applications</h3><ul><li>Heavy highway trucks and buses</li><li>Prime and standby generator sets</li><li>Industrial and marine installations</li><li>Older fleets kept running on rebuilt units</li></ul><h3>Commonly Requested Parts</h3><ul><li>PT fuel-system components: pumps, injectors, and lines</li><li>Liner, piston, and ring kits</li><li>Main and connecting-rod bearings</li><li>Turbochargers and air-system components</li><li>Air compressors and accessories</li><li>Gaskets, seals, and mounting hardware</li></ul>`,
      partTwo: `<h2>Verification for Older Fleets</h2><p>N14 engines were built in several configurations, and long service lives mean many units have been rebuilt with mixed parts. Send the engine serial number and a photo of the dataplate and fuel-pump tag where possible. For PT fuel systems we confirm the pump and injector references together, because a mismatched pair causes running problems that are often blamed on the wrong component.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins engine parts sourcing</a></li></ul>${cta('Request Cummins N14 parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2012-series-parts',
    title: 'DEUTZ 2012 Series Engine Parts',
    seoTitle: 'DEUTZ BF4M2012 BF6M2012 Engine Parts | Spares',
    h1Title: 'DEUTZ 2012 Series Engine Parts',
    summary:
      'Parts for the DEUTZ BF4M2012 and BF6M2012 liquid-cooled in-line engines in excavators, loaders, cranes, tractors, and generator sets, with engine-number verification.',
    content: {
      partOne: `<h2>What the 2012 Series Covers</h2><p>The DEUTZ 2012 series is a liquid-cooled, turbocharged in-line family in four- and six-cylinder versions: the BF4M2012 with 4.04 litres displacement and 101 × 126 mm bore and stroke, and the BF6M2012 with 6.06 litres. Ratings span roughly 75 kW to 155 kW depending on version and application, and the engines are built both by DEUTZ and under licence by other manufacturers.</p><h3>Common Applications</h3><ul><li>Excavators, wheel loaders, and cranes</li><li>Tractors and agricultural machinery</li><li>Generator sets and stationary power</li><li>Compressors, pumps, and other industrial units</li></ul><h3>Commonly Requested Parts</h3><ul><li>Piston, liner, and ring kits</li><li>Cylinder-head and valve-cover gaskets</li><li>Injection pumps and injectors</li><li>Water pumps, thermostats, and cooling-system parts</li><li>Starters, alternators, and stop solenoids</li><li>Oil coolers, filters, and belts</li></ul>`,
      partTwo: `<h2>Verification for 2012 Engines</h2><p>Send the DEUTZ engine number stamped on the crankcase and printed on the type plate, together with the machine make and model. Because 2012-series engines are fitted by many equipment builders and also produced under licence, the engine number — not the badge on the machine — decides which parts list applies. Radiators, air-intake pipes, and exhaust components often follow the equipment builder rather than the engine.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ engine parts sourcing</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ industrial equipment parts</a></li><li><a href="/products/deutz-parts/">DEUTZ parts overview</a></li></ul>${cta('Request DEUTZ 2012 parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2013-series-parts',
    title: 'DEUTZ TCD 2013 Series Engine Parts',
    seoTitle: 'DEUTZ TCD 2013 L6 Engine Parts | Common-Rail Spares',
    h1Title: 'DEUTZ TCD 2013 Series Engine Parts',
    summary:
      'Parts for the DEUTZ TCD 2013 common-rail engine family, including L6, L4, and V8 variants in marine, construction, and generator service, with EMR control-system components.',
    content: {
      partOne: `<h2>What the TCD 2013 Covers</h2><p>The TCD 2013 is DEUTZ's common-rail family in the mid power range. The six-cylinder TCD 2013 L6 2V has 108 × 130 mm bore and stroke and uses the DEUTZ common-rail (DCR) injection system with electronic engine control (EMR). L4 and V8 variants extend the family across four-, six-, and eight-cylinder installations. The engines serve marine, construction, and generator applications.</p><h3>Common Applications</h3><ul><li>Marine propulsion and auxiliary power</li><li>Construction and agricultural machinery</li><li>Generator sets and stationary power</li><li>Municipal and special vehicles</li></ul><h3>Commonly Requested Parts</h3><ul><li>Common-rail injectors and high-pressure pumps</li><li>Rail-pressure sensors and fuel-line components</li><li>Water pumps, thermostats, and cooling parts</li><li>Turbochargers and charge-air components</li><li>EMR control units, wiring, and sensor sets</li><li>Gaskets, seals, pistons, liners, and bearings for overhaul work</li></ul>`,
      partTwo: `<h2>Verification for Common-Rail Engines</h2><p>Common-rail fuel components are calibration-specific: an injector or pump reference that suits one build can be wrong for another. Send the engine number, the machine details, and where possible the part number printed on the component itself. For EMR-controlled engines, include any stored fault codes — they usually point straight at the sensor or actuator that failed.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ engine parts sourcing</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ industrial equipment parts</a></li></ul>${cta('Request DEUTZ TCD 2013 parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-1011-series-parts',
    title: 'DEUTZ 1011 Series Engine Parts',
    seoTitle: 'DEUTZ FL1011 BF1011 Engine Parts | Air/Liquid-Cooled Spares',
    h1Title: 'DEUTZ 1011 Series Engine Parts',
    summary:
      'Parts for the DEUTZ 1011 series air-cooled and liquid-cooled in-line engines in construction, agricultural, and generator service, including cooling, injection, and overhaul components.',
    content: {
      partOne: `<h2>What the 1011 Series Covers</h2><p>The 1011 series is a long-running compact DEUTZ family in air-cooled and liquid-cooled versions, in in-line three- to six-cylinder layouts. Air-cooled engines rely on a cooling fan and clean cylinder fins, while liquid-cooled versions add water pumps, thermostats, and radiators. Knowing which type you have narrows the parts list immediately.</p><h3>Common Applications</h3><ul><li>Construction and agricultural machinery</li><li>Generator sets and compressors</li><li>Municipal and special equipment</li><li>Older machines kept in daily service</li></ul><h3>Commonly Requested Parts</h3><ul><li>Cooling fans, fan drives, and belts for air-cooled versions</li><li>Oil coolers and oil-cooler seals</li><li>Injection pumps and injectors</li><li>Water pumps and thermostats on liquid-cooled versions</li><li>Cylinder-head and valve-cover gaskets</li><li>Starters, alternators, and stop solenoids</li></ul>`,
      partTwo: `<h2>Verification for 1011 Engines</h2><p>The DEUTZ engine number is stamped on the crankcase and printed on the type plate with the engine model. Send that number together with the machine make and model: on air-cooled engines in dusty service, fan and belt condition is usually the first thing to check, and on liquid-cooled engines the cooling circuit decides most of the routine parts.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ engine parts sourcing</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ industrial equipment parts</a></li></ul>${cta('Request DEUTZ 1011 parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2011-series-parts',
    title: 'DEUTZ 2011 Series Engine Parts',
    seoTitle: 'DEUTZ BF4M2011 BF6M2011 Engine Parts | Spares',
    h1Title: 'DEUTZ 2011 Series Engine Parts',
    summary:
      'Parts for the DEUTZ BF4M2011 and BF6M2011 liquid-cooled in-line engines in construction, agricultural, and generator service, with engine-number verification.',
    content: {
      partOne: `<h2>What the 2011 Series Covers</h2><p>The DEUTZ 2011 series covers liquid-cooled, turbocharged in-line four- and six-cylinder engines used in construction machinery, agricultural equipment, generators, and industrial power units. The family sits below the 2012 and 2013 series in size and is common in compact and mid-size machines.</p><h3>Common Applications</h3><ul><li>Excavators, loaders, and compact construction machines</li><li>Tractors and agricultural equipment</li><li>Generator sets and stationary power</li><li>Pumps, compressors, and industrial drives</li></ul><h3>Commonly Requested Parts</h3><ul><li>Piston, liner, and ring kits</li><li>Cylinder-head and valve-cover gaskets</li><li>Injection pumps and injectors</li><li>Water pumps, thermostats, and cooling components</li><li>Oil coolers, filters, and belts</li><li>Starters, alternators, and sensors</li></ul>`,
      partTwo: `<h2>Verification for 2011 Engines</h2><p>Send the engine number from the crankcase stamp and type plate, plus the machine make and model. Where the machine is a licensed or locally built variant, the engine number is the reliable key: it identifies the build that the parts list follows, independent of the badge on the machine.</p><h3>Related Pages</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ engine parts sourcing</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ industrial equipment parts</a></li></ul>${cta('Request DEUTZ 2011 parts')}`,
    },
  },
  {
    productSlug: 'mtu-spare-parts',
    slug: 'regularly-sourced-parts',
    title: 'Regularly Sourced MTU Parts — Categories & Series',
    seoTitle: 'Regularly Sourced MTU Parts | Categories & Series Coverage',
    h1Title: 'Regularly Sourced MTU Parts',
    summary:
      'The MTU part categories and engine series we source most often, with the verification framework: availability is confirmed per inquiry, not presented as a warehouse listing.',
    content: {
      partOne: `<h2>What We Source Most Often</h2><p>Our catalog covers 791 MTU part numbers across 14 categories and the main engine series. The lists below show where the depth is, so you can judge quickly whether a request fits the categories we handle every week. This is a sourcing-coverage view, not a stock report: availability is confirmed for each inquiry after the part number and engine serial number are checked.</p><h3>Categories by Catalog Depth</h3><ul><li>Gaskets and seals — 227 numbers</li><li>Engine components — 182 numbers</li><li>Drive components — 89 numbers</li><li>Bearings — 49 numbers</li><li>Sensors and electrical — 47 numbers</li><li>Pistons and liners — 44 numbers</li><li>Filters — 33 numbers</li><li>Valve train — 32 numbers</li><li>Fuel system — 27 numbers</li><li>Cooling system — 23 numbers</li><li>Lubrication, air and intake, turbocharging, and repair kits complete the catalog</li></ul>`,
      partTwo: `<h2>Series Coverage</h2><ul><li>MTU 4000 — 173 catalogued numbers</li><li>MTU 396 — 159 numbers</li><li>MTU 2000 — 157 numbers</li><li>MTU 538 — 80 numbers</li><li>MTU 956/1163 — 61 numbers</li><li>MTU 595 — 48 numbers</li><li>MTU 183 — 38 numbers</li><li>MTU 1163 and MTU 956 — listed separately where the catalog keeps them apart</li></ul><h3>How Availability Is Confirmed</h3><p>Every quotation states the supply route per line: genuine new, genuine exchange, OEM-quality alternative, or remanufactured. Lead time and supplied condition are confirmed before order release. Where a number is not in the catalog, we trace supersession history and quote the available route against your engine serial number.</p><h3>Start From a Number or a List</h3><ul><li><a href="/part-number-index/">Search all part numbers (EN · DE)</a></li><li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000 parts catalog</a></li><li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000 parts catalog</a></li><li><a href="/part-products/catalog/mtu-396-series/">MTU 396 parts catalog</a></li><li><a href="/part-products/catalog/mtu-956-series/">MTU 956 parts catalog</a></li><li><a href="/part-products/catalog/mtu-1163-series/">MTU 1163 parts catalog</a></li><li><a href="/part-products/catalog/mtu-595-series/">MTU 595 parts catalog</a></li><li><a href="/engine-models/">MTU engine model parts lists</a></li></ul>${cta('Request parts for your engine')}`,
    },
  },
] as const;
