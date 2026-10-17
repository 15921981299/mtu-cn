export type ProcurementBrief = {
  heading: string;
  intro: string;
  lines: { item: string; scope: string; check: string; numbers?: string[] }[];
  links?: { href: string; label: string }[];
};

export const catalogProcurement: Record<string, ProcurementBrief> = {
  'mtu-filters': {
    heading: 'MTU Filter Purchasing Checks',
    intro: 'A spin-on filter, replaceable element, and complete housing are different order lines. Catalog references are not measurements of the item offered.',
    lines: [
      { item: 'Spin-on fuel filter', scope: 'One filter; service quantity specified separately', check: 'Label, mounting thread, sealing-ring dimensions and filter-head number. X59408300151 is a listed later reference, not an automatic two-way interchange.', numbers: ['X57508300091', '0020922801'] },
      { item: 'Replaceable filter element', scope: 'Element only; housing and seals listed separately', check: 'Housing number, end caps, height and inside/outside diameters. The 30 MY marking needs filtration-rating confirmation.', numbers: ['0000925105'] },
      { item: 'Oil filtration', scope: 'Spin-on unit versus centrifugal assembly', check: '0031845201 thread size remains unpublished. For 23540455, specify assembly, rotor or service components.', numbers: ['0031845201', '23540455'] },
    ],
  },
  'mtu-injectors': {
    heading: 'Injector Condition and Supply Scope',
    intro: 'Request the complete stamped reference, including X/EX prefixes. A nozzle component, complete injector and fitting tool must not be quoted as the same item.',
    lines: [
      { item: 'Complete injector', scope: 'Offered number and included seals identified per line', check: 'Body marking, connector, nozzle end and engine serial number; no confirmed dimensions are published for EX52407500064.', numbers: ['EX52407500064', 'X53507500012'] },
      { item: 'New supply request', scope: 'Manufacturer and new condition stated in the quote', check: 'Ask for unit/packaging labels and available origin documents. A part-number prefix alone does not prove condition.' },
      { item: 'Remanufactured request', scope: 'Separate option, subject to sourcing confirmation', check: 'Request unit-linked test records, warranty terms, core eligibility, deposit and return deadline; do not assume these documents are available.' },
      { item: 'Service tooling', scope: 'Tool and adapters, not an injector', check: 'BR4000-00/01/02 catalog reference; match the tool interface to the installed injector and applicable service procedure.', numbers: ['F6794703'] },
    ],
    links: [{ href: '/part-products/catalog/mtu-fuel-pumps/', label: 'Fuel pump identification and RFQ' }],
  },
  'mtu-fuel-pumps': {
    heading: 'Separate Fuel Pump Order Lines',
    intro: 'Do not order a pump solely from low fuel-pressure symptoms. Keep diagnostic observations separate from the component identity and requested shipment scope.',
    lines: [
      { item: 'Feed / low-pressure pump', scope: 'Complete pump or separately identified service component', check: 'Pump label, drive, ports, mounting and engine serial number; do not infer pressure rating from the series.', numbers: ['X53508200001', 'X53608200005'] },
      { item: 'High-pressure pump', scope: 'Assembly, metering components and fittings itemized', check: 'Complete reference, engine configuration, electrical interface and available test documentation.', numbers: ['E0060704101'] },
      { item: 'Delivery / priming circuit', scope: 'Identify driven or hand-operated pump from its label', check: 'Installation position and inlet/outlet arrangement. Related fuel-line parts are not included unless listed.', numbers: ['X52808100014'] },
      { item: 'Exchange option', scope: 'Only when confirmed for the offered pump', check: 'Core condition, core freight, deposit, test record and return deadline quoted separately.' },
    ],
    links: [{ href: '/part-products/catalog/mtu-injectors/', label: 'Injector and nozzle parts' }],
  },
  'mtu-cooling-system': {
    heading: 'Cooling Circuit and Assembly Boundaries',
    intro: 'Engine coolant and seawater circuits require separate identification. Pump, actuator, housing and seal references do not imply a complete repair kit.',
    lines: [
      { item: 'Coolant pump', scope: 'Complete pump versus repair components', check: '0002000001 is listed under MTU 183. Preserve /87 on X54920200040/87 and confirm the high-temperature circuit.', numbers: ['0002000001', 'X54920200040/87'] },
      { item: 'Thermal actuator', scope: 'Actuator only; housing and seals requested separately', check: 'Housing drawing position, operating marking and mating seal; no complete temperature curve is established here.', numbers: ['X52420300037', '05132155'] },
      { item: 'Pump seal', scope: 'Specified ring and material', check: 'Dimension convention, material, fluid and sealing position; a nominally equal ring is not automatically equivalent.', numbers: ['700429100000'] },
    ],
  },
  'mtu-gasket-kits': {
    heading: 'Individual Seals or Itemized Gasket List',
    intro: 'A gasket-set RFQ needs a defined bill of materials. The catalog does not establish a universal kit or current stock for an engine family.',
    lines: [
      { item: 'Cylinder-head gasket', scope: 'Per cylinder or explicitly itemized set', check: 'Full model, serial number, material and applicable thickness/marking.', numbers: ['5240161580', '5410160920', '5550161420'] },
      { item: 'O-ring', scope: 'Individual ring, not a complete sealing set', check: 'Inside diameter, cross-section and material. Do not derive a 260 mm diameter from the number.', numbers: ['700429260000', '700429100000'] },
      { item: 'Sealing / tombak ring', scope: 'Ring for a confirmed drawing position', check: 'Units, dimensional endpoints and material; older numbers are catalog history, not unconditional substitutes.', numbers: ['5244920181', '4420110059', '05132155'] },
    ],
    links: [{ href: '/guides/mtu-4000-overhaul-parts/', label: '4000 overhaul parts RFQ scope' }],
  },
  'mtu-pistons-liners': {
    heading: 'Size Grade and Cylinder-Kit Contents',
    intro: 'Size-grade codes must come from the component marking and applicable engine documentation. Do not equate grade 1 or 2 with a universal oversize measurement.',
    lines: [
      { item: 'Cylinder liner', scope: 'One liner; seals and grade identified separately', check: 'Liner marking, bore/grade documentation and engine serial number.', numbers: ['5240113410', '5320110110', '5840111810'] },
      { item: 'Piston', scope: 'Complete piston versus crown/skirt assembly', check: 'Offered contents, mating liner grade, pin and ring references.', numbers: ['5240303917', '5840300917'] },
      { item: 'Ring / pin request', scope: 'One component or defined cylinder set', check: 'Per-cylinder quantities, ring positions and applicable drawing; no universal clearance or installation value is published.', numbers: ['0120370618', '5410370220'] },
    ],
  },
  'mtu-bearings': {
    heading: 'Bearing Position and Measured Shaft Grade',
    intro: 'An engine serial number alone cannot describe a previously reground shaft. Include workshop measurements and the existing bearing markings when relevant.',
    lines: [
      { item: 'Main bearing', scope: 'Upper/lower shell or itemized full set', check: 'Journal position, grade marking, shaft repair history and measured journal size.', numbers: ['5240334901', '5240335602', '5410330605'] },
      { item: 'Connecting-rod bearing', scope: 'Shells distinguished from complete pair', check: 'Rod position, upper/lower references and applicable dimensional grade.', numbers: ['5240383710', '5240382711', '5550302160'] },
      { item: 'Thrust ring / bushing', scope: 'Exact location and individual component', check: 'Mating shaft/housing, thickness or bore, lubrication details and applicable tolerance document.', numbers: ['8692040010', '5240550550'] },
    ],
  },
  'mtu-396-series': {
    heading: 'MTU 396 Legacy Parts Identification',
    intro: 'Retain the complete TE/TB/TC designation and serial number. A shared 396 family name or old invoice does not confirm the current installed build.',
    lines: [
      { item: 'Service filter element', scope: 'Element separate from housing and sealing parts', check: 'Housing reference and drawing position; catalog 30 MY marking is not a dimension.', numbers: ['0000925105', '5501800016'] },
      { item: 'Internal overhaul components', scope: 'Liner, valve and thrust parts listed separately', check: 'Size grade, current markings and mating assembly; do not select by catalog shipping weight.', numbers: ['5320110110', '8692040010'] },
      { item: 'Legacy replacement request', scope: 'Old and offered numbers both retained', check: 'Ask for the serial-range reference and whether associated components must change.' },
    ],
    links: [{ href: '/guides/mtu-396-series-parts/', label: '396 procurement checklist' }, { href: '/series/mtu-396/', label: '396 full-model identification' }],
  },
  'mtu-1163-series': {
    heading: 'MTU 1163 Assembly and Mating-Part Checks',
    intro: 'Listings shared with MTU 956 are identification references, not proof of compatibility. Record the drawing revision and installation position for each requested line.',
    lines: [
      { item: 'High-pressure line connection', scope: 'Thrust member, line and seals are separate items', check: '5840780024 is position 25 in the catalog drawing group, not the complete line.', numbers: ['5840780024', '5840700632/87'] },
      { item: 'Cooling-pump sealing', scope: 'One specified seal versus pump assembly', check: '700429100000 marking A 100 x 5 needs units, material and pump-position confirmation.', numbers: ['700429100000'] },
      { item: 'Bearing and shaft request', scope: 'Correct shell/shaft reference and grade', check: 'Full engine model, measured grade and drawing revision before accepting a 956-related number.', numbers: ['5550302160', '5562010105'] },
    ],
    links: [{ href: '/series/mtu-1163/', label: '1163 model identification' }, { href: '/cross-reference/', label: 'Catalog reference-number history' }],
  },
};

export const supplyProcurement: ProcurementBrief = {
  heading: 'Compare MTU Parts Quotations Line by Line',
  intro: 'Diesel Part Source is an independent supplier. A catalog listing is an invitation to check a reference, not a claim of MTU authorization, current stock or guaranteed fitment.',
  lines: [
    { item: 'Service order', scope: 'Filters, seals and sensors by exact reference', check: 'Request number, quantity, mounting/connector identification and destination.', numbers: ['X57508300091', '0000925105', '0031845201'] },
    { item: 'Repair or overhaul', scope: 'Separate assembly and component lines', check: 'Included items, grade, full engine designation and serial number; replacement direction supported before order.' },
    { item: 'Offered condition', scope: 'New, aftermarket or reman options only if confirmed', check: 'Exact manufacturer, condition, origin evidence and available test documents; alternatives require buyer approval.' },
    { item: 'Commercial release', scope: 'Per-line price, availability and freight', check: 'Quoted lead time, warranty terms, packing, shipment dimensions and any core-return conditions.' },
  ],
  links: [{ href: '/guides/mtu-2000-overhaul-parts/', label: '2000 overhaul checklist' }, { href: '/guides/mtu-4000-overhaul-parts/', label: '4000 overhaul checklist' }, { href: '/cross-reference/', label: 'Old and related part numbers' }, { href: '/case-studies/', label: 'Completed parts orders' }],
};

export const modelProcurement = (series: '2000' | '4000'): ProcurementBrief => ({
  heading: `MTU 16V ${series}: Identify the Build Before Selecting Parts`,
  intro: `16V ${series} is an engine-family description, not a single spare-parts specification. Retain the suffix, application and serial number from the nameplate. This page covers parts procurement, not complete-engine sales or workshop procedures.`,
  lines: [
    { item: 'Full model', scope: 'Complete nameplate designation', check: 'Do not shorten the model to 16V alone; application/rating suffixes distinguish builds.' },
    { item: 'Installed component', scope: 'Current label or drawing position', check: 'Keep prefixes, suffixes and size-grade markings; an engine brochure does not prove component fitment.' },
    { item: 'Maintenance list', scope: 'One item, cylinder set or consolidated RFQ', check: 'Specify quantities per position and whether an assembly or individual service parts are required.' },
  ],
  links: [{ href: `/part-products/catalog/mtu-${series}-series/`, label: `${series} part-number catalog` }, { href: `/guides/mtu-${series}-overhaul-parts/`, label: `${series} overhaul procurement guide` }],
});

export const marineProcurement: ProcurementBrief = {
  heading: 'Marine Spare Parts: Quote to Dispatch',
  intro: 'For planned docking or urgent vessel maintenance, separate component verification from the delivery deadline. The workflow below is an order checklist, not a completed customer case or a class-approval claim.',
  lines: [
    { item: 'Engine and circuit', scope: 'Propulsion versus auxiliary generator', check: 'Full engine model, serial number, cooling arrangement and installed component number.' },
    { item: 'Port delivery', scope: 'Consignee and delivery point', check: 'Country, port, agent contact and latest required arrival; a dispatch date is not an arrival guarantee.' },
    { item: 'Pre-dispatch evidence', scope: 'Agreed evidence for the offered items', check: 'Request actual labels, item/packing photos and any available inspection/test records before order release.' },
    { item: 'Packing and freight', scope: 'Protective packing and shipment dimensions', check: 'Confirm corrosion protection, port covers, gross weight, carton/crate size and agreed freight terms per shipment.' },
  ],
  links: [{ href: '/part-products/catalog/mtu-cooling-system/', label: 'Marine cooling references' }, { href: '/guides/mtu-2000-overhaul-parts/', label: '2000 docking RFQ checklist' }, { href: '/guides/mtu-4000-overhaul-parts/', label: '4000 overhaul RFQ checklist' }, { href: '/case-studies/', label: 'Completed spare-parts orders' }],
};

export const priorityPartScopes: Record<string, { scope: string; evidence: string }> = {
  '0031845201': { scope: 'Spin-on oil filter; filter head not included unless quoted.', evidence: 'Filter label, base/thread and sealing-ring measurements.' },
  X57508300091: { scope: 'Spin-on fuel filter; exact offered old/later number stated.', evidence: 'Label and base photos, filter-head reference and replacement approval.' },
  EX52407500064: { scope: 'Injector with complete EX prefix; seals and core terms itemized.', evidence: 'Body/connector/nozzle photos and any unit-linked test report for a reman option.' },
  X00E50203659: { scope: 'Level monitor; probe and connector configuration identified.', evidence: 'Label, probe length, pin layout and applicable electrical specification.' },
  '5244920181': { scope: 'Individual turbocharger-system sealing ring, not a seal kit.', evidence: 'Assembly position, section dimensions and material confirmation.' },
  '0020922801': { scope: 'Spin-on fuel filter; X00012879 only after application check.', evidence: 'Installed label, base/thread and offered replacement marking.' },
  '0035352231': { scope: 'Pressure sensor; catalog +/-70 mbar specification checked on offered unit.', evidence: 'Pressure label, connector/pins and sealing method.' },
  '0000925105': { scope: 'Replaceable element; housing and sealing parts separate.', evidence: 'Housing number, element/end-cap photos and confirmed filtration rating.' },
  '0005356430': { scope: 'Temperature sensor; connector reference is not signal equivalence.', evidence: 'Probe depth, label, connector and characteristic datasheet when available.' },
  '0005357633': { scope: 'Speed sensor; catalog 700 mm cable checked against offered unit.', evidence: 'Body marking, cable/connector photos and electrical specification.' },
  X00E50214075: { scope: 'Pressure sensor; exact earlier/later reference on the quote.', evidence: 'Old and offered pressure ranges, labels and connector details.' },
  '8692040010': { scope: 'Thrust ring for the identified shaft position.', evidence: 'Assembly position, ring thickness and mating-component numbers.' },
  '700429260000': { scope: 'One O-ring; no diameter inferred from the part number.', evidence: 'Inside diameter, cross-section, material and fluid application.' },
  '5840780024': { scope: 'Thrust member only; high-pressure line and fittings separate.', evidence: 'Line drawing/position 25 and connection photo.' },
  '4221880001': { scope: 'Oil cooler; core versus assembly and included seals itemized.', evidence: 'Ports, mounting pattern and available unit-linked leak-test record.' },
  X52420300037: { scope: 'Thermal actuator only; housing and mating seals separate.', evidence: 'Position 200, housing interface and meaning of catalog operating marking.' },
  '23540455': { scope: 'Centrifugal oil-filter assembly versus identified service components.', evidence: 'Assembly marking, ports and included rotor/seal/component list.' },
  '5240530122': { scope: 'Inner valve spring; outer spring and retainer separate.', evidence: 'Spring position and applicable dimensions/load specification.' },
  '5240550550': { scope: 'Individual bushing; mating shaft/housing identified.', evidence: 'Bore, outside diameter, length and lubrication features.' },
  '0005358233': { scope: 'Speed sensor; catalog 1150 mm cable checked against offered unit.', evidence: 'Body label, sensing end, cable and connector/pin arrangement.' },
  '5240530830': { scope: 'Valve guide; machining/finishing requirement stated.', evidence: 'Applicable head/valve and drawing explaining 19.00 R6 H7 marking.' },
  '0002000001': { scope: 'Coolant pump listed for MTU 183; other fitments not established.', evidence: 'Pump label, drive, flange/ports and full engine serial.' },
  F6794703: { scope: 'Injector fitting/removal device, not an injector.', evidence: 'Installed injector interface and tool/adapters included in the set.' },
  '4420110059': { scope: 'Tombak ring for the identified sealing position.', evidence: '147.4 x 153.5 x 0.15 catalog convention, units and material.' },
  '0000943268': { scope: 'Air-filter restriction indicator; element not included.', evidence: 'Scale/threshold, reset arrangement and mounting connection.' },
  '700429100000': { scope: 'Coolant-pump O-ring; A 100 x 5 does not establish material.', evidence: 'Drawing position, dimensional convention, units and seal material.' },
  'X54920200040/87': { scope: 'High-temperature-circuit pump; retain /87 suffix.', evidence: 'Label, drive/ports and offered new/reman condition with any core terms.' },
  '50773': { scope: 'Sealing compound; exact manufacturer product and pack size.', evidence: 'LOCTITE/product label, batch, expiry, TDS and SDS when available.' },
  '5610105420': { scope: 'MTU 538 cylinder head; bare versus assembled contents itemized.', evidence: 'Casting/assembly label and available inspection/test records.' },
  '05132155': { scope: 'Individual sealing ring; preserve leading zero and check successor.', evidence: 'Position 250, dimensional convention, units and material.' },
};
