/**
 * Original page copy for the imported pages that stay indexable. Keys are the
 * page slugs in `imported-pages.ts`; any field set here overrides the
 * generated template text.
 */
export type ImportedPageContent = {
  title?: string;
  seoTitle?: string;
  summary: string;
  body: string;
};

const cta = (label: string, source: string) =>
  `<p><a href="/contact/?source=${source}">${label} →</a></p>`;

export const importedPageContent: Record<string, ImportedPageContent> = {
  stock: {
    title: 'MTU Parts Stock & Availability',
    seoTitle: 'MTU Parts Stock & Availability Check | Diesel Part Source',
    summary:
      'How Diesel Part Source checks MTU parts availability: what "in stock" means on our quotations, which items move fastest, and how lead times are stated for sourced parts.',
    body: `
      <h2>What "In Stock" Means on Our Quotes</h2>
      <p>Every quotation line carries an availability note. <strong>Ready stock</strong> means the part is on the shelf in Shanghai and can be packed once the order is confirmed. <strong>Partner stock</strong> means the item is held by a supply partner we buy from regularly and has to reach our warehouse first. <strong>Sourced to order</strong> means we have to locate the part, so the quote gives an estimated lead time instead of a dispatch date. We only label a line as ready stock after checking it at the time of quotation, and the quote states the expected dispatch time for each line.</p>
      <h2>Items That Usually Move Fastest</h2>
      <p>Maintenance parts for the MTU 2000, 4000, and 396 series make up most daily orders, so they are the items most often available from ready stock:</p>
      <ul>
        <li>Spin-on oil and fuel filters, such as the <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 oil filter</a> and <a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091 fuel filter</a></li>
        <li>O-rings, sealing rings, and gaskets used in routine service</li>
        <li>Pressure, temperature, and speed sensors that cause alarms or shutdowns</li>
        <li>Injectors and fuel-system items for common ratings</li>
      </ul>
      <p>Overhaul parts in size grades, cylinder heads, crankshaft components, and parts for legacy engines such as the 538 and 956 series are more often sourced to order.</p>
      <h2>Getting an Accurate Availability Answer</h2>
      <p>Stock answers are only as good as the part reference. Send the exact part number, quantity, and engine serial number, and tell us if a later or earlier number is acceptable. An Excel list is fastest for more than ten lines. You can also check individual numbers in the <a href="/part-products/">MTU parts catalog</a> before sending the inquiry.</p>
      ${cta('Check stock for your part numbers', 'stock')}
    `,
  },
  'support-services': {
    title: 'Parts Sourcing Support Services',
    seoTitle: 'Engine Parts Sourcing Support Services | Diesel Part Source',
    summary:
      'The non-product work behind an engine parts order: part identification from photos, parts-list cleanup, pre-shipment photos, export documents, and packing to your marking instructions.',
    body: `
      <h2>Support Included With Every Order</h2>
      <p>Buying engine parts across borders involves more than a price per line. These are the support steps behind a typical inquiry and order.</p>
      <h3>Part Identification</h3>
      <p>When a part number is missing, worn off, or superseded, we work from the engine data plate, photos of the old part, its installation position, and any casting or label marks. We confirm the reference with you before quoting, so the order is based on an agreed number rather than a guess.</p>
      <h3>Parts-List Cleanup</h3>
      <p>Maintenance lists often combine numbers from different manuals and years. We return your list with duplicates merged, superseded numbers flagged, and lines that need inspection first, such as graded liners and bearings, clearly marked.</p>
      <h3>Pre-Shipment Photos</h3>
      <p>On request, we photograph the parts, labels, and packaging before dispatch, so your team can compare them with the old parts before the shipment leaves Shanghai.</p>
      <h3>Export Documents and Packing</h3>
      <ul>
        <li>Commercial invoice and packing list matched to your purchase-order lines</li>
        <li>HS codes per line and certificate of origin where required</li>
        <li>Case marking with your PO number, vessel or project name, and consignee</li>
        <li>Wooden cases for heavy or fragile items; moisture protection for sea freight</li>
      </ul>
      <h2>What We Do Not Do</h2>
      <p>We are a parts supplier, not a field service company. We do not send technicians to carry out repairs, but we can quote the parts and special tools your own technicians or local service partner need. See <a href="/part/mtu-specialized-tools/">MTU specialized tools</a>.</p>
      ${cta('Ask about support for your order', 'support-services')}
    `,
  },
  'genuine-oem-parts': {
    title: 'How to Check Genuine MTU Parts',
    seoTitle: 'How to Check Genuine MTU Parts | Buyer Checklist',
    summary:
      'A practical checklist for buyers who want to confirm genuine MTU parts on arrival: part-number marking, labels and packaging, documents, and what to compare against the old part.',
    body: `
      <h2>Why Buyers Check on Arrival</h2>
      <p>Counterfeit and relabelled engine parts are a real risk in the spare-parts market, especially for filters, injectors, and sensors. A few minutes of checking when the parts arrive is far cheaper than an engine problem later. These are the checks we recommend, and the same ones we apply before parts leave our warehouse.</p>
      <h2>Buyer Checklist</h2>
      <ol>
        <li><strong>Part number marking.</strong> The number on the part or its label should match the quotation exactly, including any suffix after a slash.</li>
        <li><strong>Label and packaging.</strong> Look for clean, consistent printing and a label that is part of the original packaging rather than stuck over another one.</li>
        <li><strong>Comparison with the old part.</strong> Check dimensions, connector type, thread, and mounting points against the part you removed.</li>
        <li><strong>Supersession.</strong> If the number differs from your old part, the quote should state that it is a later or replacement reference.</li>
        <li><strong>Documents.</strong> The commercial invoice should list the same part numbers and quantities as the packing list and the boxes.</li>
      </ol>
      <h2>How We Label Supply Routes</h2>
      <p>Not every buyer needs, or can wait for, an original MTU part. Our quotes state the route for each line, whether original, OEM-alternative, or remanufactured exchange, so you know exactly what you are paying for. The routes are explained on our <a href="/capabilities/genuine-oem-parts/">verified OEM sourcing</a> page.</p>
      <p>If anything on arrival does not match, do not install the part. Send photos of the part, label, and packaging as soon as possible so we can review it with you.</p>
      ${cta('Request genuine MTU parts', 'genuine-oem-parts')}
    `,
  },
  'mtu-oils': {
    title: 'MTU Engine Oils',
    seoTitle: 'MTU Engine Oil Approvals & Supply | Diesel Part Source',
    summary:
      'Choosing engine oil for MTU diesel engines: MTU oil categories, why the fluids specification matters for warranty and service intervals, and how we supply approved oils with parts orders.',
    body: `
      <h2>Oil Approval Matters on MTU Engines</h2>
      <p>MTU does not approve engine oils by viscosity grade alone. Oils are listed in the MTU Fluids and Lubricants Specifications (publication A001061) under oil categories, commonly referred to as Category 1, 2, 2.1, 3, and 3.1. The category allowed for an engine depends on the series, the fuel quality, and the oil-change interval you want to run. Higher categories generally allow longer intervals where the engine and fuel permit it.</p>
      <h2>How to Choose</h2>
      <ul>
        <li>Check the engine's operating instructions for the permitted oil categories</li>
        <li>Consider fuel sulfur content; high-sulfur fuel can limit the choice of oil and interval</li>
        <li>Use only oils listed in the current fluids specification for that category</li>
        <li>Avoid mixing different oils between changes, and record the oil used in the maintenance log</li>
      </ul>
      <h2>Supplying Oil With a Parts Order</h2>
      <p>We quote MTU-approved oils mainly for buyers who want to consolidate oil with a filter and parts shipment, for example a vessel or remote generator site. Oil is heavy, so it is usually economical only by sea or consolidated freight, and drums or pails need proper palletizing. Tell us the engine series, required category, viscosity, and quantity in liters, and we will quote it together with the matching <a href="/part-products/catalog/mtu-filters/">MTU filters</a>.</p>
      <p>Coolant follows a separate approval list; see <a href="/mtu-coolants/">MTU coolants</a>.</p>
      ${cta('Quote oil with your parts order', 'mtu-oils')}
    `,
  },
  'mtu-coolants': {
    title: 'MTU Engine Coolants',
    seoTitle: 'MTU Engine Coolant Approvals & Supply | Diesel Part Source',
    summary:
      'Coolant for MTU diesel engines: approved antifreeze and corrosion-inhibitor types, why mixing products causes problems, and how we supply coolant alongside cooling-system parts.',
    body: `
      <h2>Coolant Is a Specified Fluid, Not a Commodity</h2>
      <p>MTU engines use coolant made from treated water mixed with either an approved antifreeze concentrate or an approved corrosion inhibitor where freezing is not a risk. Approved products are listed in the MTU Fluids and Lubricants Specifications (publication A001061). Using an unapproved product, or the wrong concentration, can lead to cavitation on cylinder liners, corrosion in heat exchangers, and deposits that reduce cooling performance.</p>
      <h2>Common Coolant Mistakes</h2>
      <ul>
        <li>Mixing different coolant chemistries when topping up</li>
        <li>Using untreated hard water instead of water that meets the specified quality</li>
        <li>Running too little concentrate, which reduces corrosion protection</li>
        <li>Skipping regular coolant checks on standby generators that run few hours</li>
      </ul>
      <h2>Coolant and Cooling-System Parts Together</h2>
      <p>Coolant problems usually show up as failed water-pump seals, thermostats, or heat-exchanger leaks. If you are replacing cooling-system parts, it is a good time to flush and refill with an approved product. We can quote coolant together with parts from the <a href="/part-products/catalog/mtu-cooling-system/">MTU cooling system catalog</a>, including pumps, impellers, thermostats, and seals.</p>
      <p>Send the engine series, the product you currently use, the system volume, and the destination. Like oil, coolant is best shipped by sea or consolidated with a larger order. For engine oil, see <a href="/mtu-oils/">MTU oils</a>.</p>
      ${cta('Quote coolant and cooling parts', 'mtu-coolants')}
    `,
  },
  'rail-drive-solutions': {
    title: 'MTU Rail Engine Parts',
    seoTitle: 'MTU Rail Engine Parts for Locomotives & Railcars | Diesel Part Source',
    summary:
      'Parts supply for MTU rail engines in locomotives, railcars, and on-track machines, with model-code checks for Series 2000, 4000, and legacy rail installations.',
    body: `
      <h2>MTU Engines in Rail Service</h2>
      <p>MTU engines power diesel locomotives, diesel multiple units, power cars, and track-maintenance machines in many countries. Rail engines carry an "R" in the model code, for example 12V 4000 R43 or 16V 4000 R84, and are often supplied as part of a complete power pack built to the vehicle maker's layout. That combination of engine rating, emission stage, and installation decides which parts fit.</p>
      <h2>Rail Parts We Quote Most Often</h2>
      <ul>
        <li>Filters and service items for mileage- or hour-based exams</li>
        <li>Injectors, high-pressure pumps, and fuel-system seals</li>
        <li>Pressure, temperature, and speed sensors</li>
        <li>Cooling-system pumps, thermostats, and hoses</li>
        <li>Cylinder heads, pistons, liners, bearings, and gasket kits for depot overhauls</li>
      </ul>
      <h2>Series 4000 Rail Generations</h2>
      <p>The Series 4000 rail engine has been built in several generations. Parts are not always interchangeable between them, so we keep separate notes for the <a href="/series-4000-r03/">Series 4000 R03</a> and <a href="/series-4000-r04/">Series 4000 R04</a> build families.</p>
      <h2>Information to Send</h2>
      <p>For each engine, send the model code and serial number from the data plate, the vehicle builder and class, and the part numbers from the current parts documentation. If you are ordering for several vehicles, a fleet list with one line per engine lets us spot where engines in the same fleet have different build standards, which is common after earlier overhauls or modifications.</p>
      <p>Rail buyers usually order in fleet batches; the <a href="/industries/rail/">rail industry page</a> explains how we quote exam kits per engine and repeat them across a fleet.</p>
      ${cta('Request MTU rail engine parts', 'rail-drive-solutions')}
    `,
  },
  'series-4000-r03': {
    title: 'MTU Series 4000 R03 Rail Engine Parts',
    seoTitle: 'MTU Series 4000 R03 Rail Engine Parts | Diesel Part Source',
    summary:
      'Parts for MTU Series 4000 R03-generation rail engines in freight and passenger locomotives, with serial-number checks before quotation.',
    body: `
      <h2>About the R03 Build Generation</h2>
      <p>MTU identifies engine generations with the last digit of the application code. Rail engines of the third build generation, such as the 12V 4000 R43 and 16V 4000 R43, are widely used in freight and passenger locomotives and have been in service for many years. Many fleets are now in their second or third major overhaul cycle on these engines, which makes overhaul parts and supersessions a frequent topic.</p>
      <h2>Typical R03-Generation Requests</h2>
      <ul>
        <li>Complete exam kits: filters, seals, and gaskets per engine</li>
        <li>Common-rail injectors and high-pressure fuel components</li>
        <li>Turbocharger parts and charge-air components</li>
        <li>Pistons, liners, bearings, and cylinder-head parts for overhaul</li>
        <li>Sensors and wiring items that trigger derates</li>
      </ul>
      <h2>Supersession Checks</h2>
      <p>Over a long production run, many part numbers have been updated. When you send numbers from an older parts list, we check each one against its current reference and tell you if the later part is a direct replacement or needs related parts to be changed at the same time.</p>
      <h2>Overhaul Planning</h2>
      <p>A major overhaul on an R03-generation engine normally replaces gasket sets, seals, piston rings, and bearings as standard, while liners, pistons, valves, and turbocharger parts depend on inspection results. We quote the standard items as firm lines and the inspection-dependent items as provisional lines, so the depot can order the first group immediately.</p>
      <p>Search individual numbers in the <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 parts catalog</a>, or compare with the newer <a href="/series-4000-r04/">Series 4000 R04</a> generation.</p>
      ${cta('Request Series 4000 R03 parts', 'series-4000-r03')}
    `,
  },
  'series-4000-r04': {
    title: 'MTU Series 4000 R04 Rail Engine Parts',
    seoTitle: 'MTU Series 4000 R04 Rail Engine Parts | Diesel Part Source',
    summary:
      'Parts for MTU Series 4000 R04-generation rail engines built for stricter EU emission stages, including fuel-system, sensor, and exhaust-aftertreatment related items.',
    body: `
      <h2>About the R04 Build Generation</h2>
      <p>The fourth build generation of the Series 4000 rail engine, with model codes such as 12V 4000 R54, 16V 4000 R64, and 16V 4000 R84, was developed for stricter European emission stages and was the first locomotive engine in its class certified to EU Stage IIIB. Compared with earlier generations, it relies more on electronic engine management and exhaust aftertreatment, so sensors, control components, and aftertreatment-related parts appear more often on parts lists.</p>
      <h2>What Changes for Parts Buyers</h2>
      <ul>
        <li>More sensors and electronic components per engine, each with its own reference</li>
        <li>Fuel-system parts matched to the emission configuration, not only to the cylinder count</li>
        <li>Aftertreatment-related parts that do not exist on earlier generations</li>
        <li>Software and calibration dependencies for some control items, which should be confirmed with the vehicle operator</li>
      </ul>
      <h2>Information to Send</h2>
      <p>Send the full engine model and serial number, the vehicle type, and the part numbers from the current parts documentation. For electronic items, include photos of the label and connector. We will confirm the reference and availability before quoting.</p>
      <h2>Sensors and Electronic Items</h2>
      <p>Electronic parts on newer engines can look identical while carrying different references for different calibrations or connector types. We never substitute an electronic item on appearance alone. If the label is damaged, we ask for the engine serial number and the position in the wiring diagram before we confirm a replacement.</p>
      <p>For earlier engines, see <a href="/series-4000-r03/">Series 4000 R03</a>; for an overview of rail engines, see <a href="/rail-drive-solutions/">MTU rail engine parts</a>.</p>
      ${cta('Request Series 4000 R04 parts', 'series-4000-r04')}
    `,
  },
  'part/mtu-183-parts': {
    title: 'MTU 183 Series Parts',
    seoTitle: 'MTU 183 Series Engine Parts | Diesel Part Source',
    summary:
      'Spare parts for MTU 183 series engines in workboats, yachts, and generator sets, including cooling pumps, gaskets, sensors, and fuel-injection parts.',
    body: `
      <h2>Parts for an Established Engine Range</h2>
      <p>The MTU 183 series was built in V-engine versions for marine propulsion, auxiliary power, and generator sets, and many of these engines are still running in workboats, patrol craft, yachts, and standby generators. Because production ended some time ago, buyers usually need help with two things: finding parts that are no longer easy to source, and confirming which number replaced an older one.</p>
      <h2>Parts in Our 183 Series Catalog</h2>
      <ul>
        <li>Cooling: <a href="/part-products/0002000001-coolant-pump/">0002000001 coolant pump</a>, <a href="/part-products/0012040100-seawater-pump/">0012040100 seawater pump</a>, and oil coolers</li>
        <li>Sensors such as the <a href="/part-products/0005354330-temperature-sensor/">0005354330 temperature sensor</a></li>
        <li>Fuel-injection parts, including nozzle holders</li>
        <li>Gaskets, sealing rings, and repair kits for top-end work</li>
      </ul>
      <p>The 183 parts pages list the catalog reference, dimensions, and weight where known. Fitment still depends on the full engine model and serial number, because marine and generator versions use different cooling arrangements.</p>
      <h2>When the Part Number Is Unknown</h2>
      <p>Send the engine data plate, photos of the old part, and where it sits on the engine. For pumps, include the flange and impeller photos; for sensors, the connector and thread.</p>
      <h2>Planning Ahead for an Older Engine</h2>
      <p>For engines that are expected to stay in service for years, it often makes sense to hold a small stock of the parts that are hardest to replace quickly, such as coolant and seawater pumps, oil coolers, and the gasket sets needed for top-end work. Send the engine count and running hours, and we can suggest which items to keep on the shelf and which can be ordered when needed.</p>
      ${cta('Request MTU 183 parts', 'part-mtu-183-parts')}
    `,
  },
  'part/mtu-538-parts': {
    title: 'MTU 538 Series Parts',
    seoTitle: 'MTU 538 Series Engine Parts | Diesel Part Source',
    summary:
      'Spare parts for MTU 538 series high-speed marine engines in fast naval and patrol vessels, with old-reference tracing and part identification from photos.',
    body: `
      <h2>Supporting a Legacy High-Speed Marine Engine</h2>
      <p>The MTU 538 series is a large high-speed diesel used mainly in fast naval craft and patrol vessels. Many of these vessels remain in service long after the engine left production, so operators depend on suppliers who can trace old part references and locate parts that are no longer common.</p>
      <h2>Parts in Our 538 Series Catalog</h2>
      <p>Our 538 catalog currently lists close to 80 part numbers, weighted toward the parts consumed during overhaul:</p>
      <ul>
        <li>Gaskets for cylinder heads, covers, and pipe joints, such as <a href="/part-products/5602030680-gasket/">5602030680</a></li>
        <li>Shaft seal rings, such as <a href="/part-products/700217040001-shaft-seal-ring/">700217040001</a>, and O-rings</li>
        <li>Bushings and bearings, such as <a href="/part-products/135l35003-1-bushing/">135L35003/1</a></li>
        <li>Slotted nuts, tab washers, and other fastening parts</li>
      </ul>
      <h2>Old Reference Formats</h2>
      <p>Some 538 parts use older reference formats that include letters and a slash suffix, such as 135L45018/1. Keep the suffix when you send the number, since it identifies a specific version. If only a drawing position or an old parts-list page is available, send a photo of it together with the engine serial number.</p>
      <p>Fleet buyers can ask for part numbers, HS codes, and packing data on the quotation where they are known.</p>
      <h2>Overhaul Lists for 538 Engines</h2>
      <p>Because many 538 parts are now hard to find, we recommend sending the complete overhaul list early, before the engine is removed. We return each line marked as available, sourced to order with an estimated lead time, or not currently available, so your team can plan around the difficult items instead of discovering them in the middle of the job.</p>
      ${cta('Request MTU 538 parts', 'part-mtu-538-parts')}
    `,
  },
  'part/mtu-1800-parts': {
    title: 'MTU 1800 Series Parts',
    seoTitle: 'MTU 1800 Series Engine Parts | Diesel Part Source',
    summary:
      'Parts sourcing for MTU Series 1800 six-cylinder engines in rail and industrial applications, quoted on request against the engine serial number.',
    body: `
      <h2>Series 1800 Parts on Request</h2>
      <p>The MTU Series 1800 is a six-cylinder engine range used mainly in rail vehicles and industrial equipment. Unlike our larger MTU 2000, 4000, and 396 catalogs, the 1800 section of our online catalog is small, for example the <a href="/part-products/x50441600048-air-hose/">X50441600048 air hose</a>. Most 1800 parts are quoted on request after we check the engine data.</p>
      <h2>What Buyers Usually Need</h2>
      <ul>
        <li>Oil, fuel, and air filters for scheduled service</li>
        <li>Belts, hoses, thermostats, and water-pump parts</li>
        <li>Sensors and electrical items</li>
        <li>Gasket sets and seals for top-end repairs</li>
      </ul>
      <h2>How to Get a Fast Answer</h2>
      <p>Because Series 1800 engines are installed by many vehicle and equipment builders, the engine data plate is essential. Send the full model code and serial number, the part numbers from your parts book, and the equipment make. For filters and belts, a photo of the existing part with its label often shortens the check.</p>
      <h2>Rail Power Packs</h2>
      <p>In rail vehicles, a Series 1800 engine is often part of a complete power pack that also contains the cooling system, exhaust, and transmission interface supplied by the pack builder. Parts on the engine itself follow MTU references, while radiators, hoses, and mounting items may follow the pack or vehicle builder's numbers. Tell us the vehicle type and pack designation where known, and we will split the list accordingly.</p>
      <p>If you operate mixed fleets, you can combine Series 1800 lines with <a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a> or <a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a> parts on one inquiry.</p>
      ${cta('Request MTU 1800 parts', 'part-mtu-1800-parts')}
    `,
  },
  'part/mtu-specialized-tools': {
    title: 'MTU Special Tools',
    seoTitle: 'MTU Special Tools for Engine Service | Diesel Part Source',
    summary:
      'MTU special tools for engine maintenance and overhaul: barring devices, pullers, fitting and removal devices, gauges, and tool kits, sourced by tool number.',
    body: `
      <h2>Why Special Tools Matter</h2>
      <p>Many MTU maintenance tasks, such as turning the crankshaft, removing liners, or setting injector protrusion, require tools designed for the specific engine. Using improvised tools risks damaging expensive components or getting incorrect settings. MTU special tool numbers usually start with "F", for example F6792918.</p>
      <h2>Tools in Our Catalog</h2>
      <ul>
        <li>Barring devices and tools for turning the engine, such as the <a href="/part-products/f6792918-barring-tool/">F6792918 barring tool</a></li>
        <li>Pullers and fitting/removal devices, such as <a href="/part-products/f6780562-puller/">F6780562</a></li>
        <li>Measuring tools, such as the <a href="/part-products/y20098771-feeler-gauge/">Y20098771 feeler gauge</a></li>
        <li>Oil-filter wrenches and service tool kits, such as <a href="/part-products/f30453006-tool-kit/">F30453006</a></li>
      </ul>
      <h2>Ordering Tools With an Overhaul</h2>
      <p>The best time to check tools is when planning a major job. Look at the tool list in the maintenance task for your engine, compare it with the tools in your workshop, and add the missing numbers to the parts inquiry. Tools are often slower to source than consumable parts, so ordering them early avoids delays once the engine is opened.</p>
      <p>Send the tool number, the engine series it is used on, and the quantity. If the number is unknown, describe the task and send a photo of the tool page in your manual.</p>
      <h2>Shipping Tools</h2>
      <p>Some special tools are heavy or have precision measuring surfaces. We pack them in fitted cases or wooden crates with moisture protection, and state the gross weight and dimensions on the quotation so you can compare express and freight costs before ordering.</p>
      ${cta('Request MTU special tools', 'part-mtu-specialized-tools')}
    `,
  },
};
