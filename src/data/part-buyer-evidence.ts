export type PartBuyerEvidence = {
  title: string;
  metaDescription: string;
  imageAlt: string;
  imageCaption: string;
  rfqContext: string;
  facts: { label: string; value: string; source: string }[];
  sources: { id: string; title: string; url: string }[];
};

const mann = 'https://www.mann-filter.com/en/catalog/search-results/product.html/wd1374/5_mann-filter.html';
const oemCatalog = 'https://resources.kohler.com/power/kohler/industrial/pdf/tp6549.pdf';
const reviewed = '2026-10-10';
export const buyerEvidenceReviewed = reviewed;

// These references establish only the stated product/document context, not
// present stock, a measured offered unit or universal interchangeability.
export const partBuyerEvidence: Record<string, PartBuyerEvidence> = {
  '0031845201': {
    title: '0031845201 MTU Oil Filter | Thread Reference & Quote',
    metaDescription: '0031845201 MTU oil filter. Compare the MANN WD 1374/5 thread and size reference, check the installed filter head, and request price and availability.',
    imageAlt: '0031845201 oil filter and part-number packaging in a catalog reference photo',
    imageCaption: 'Reference photo: filter and packaging marked 0031845201. This is not a current-stock or batch-origin photograph.',
    rfqContext: '0031845201 oil filter: quote the offered brand, thread/seal compatibility, quantity and lead time',
    facts: [
      { label: 'Manufacturer cross-reference', value: 'MANN-FILTER lists MTU 003 184 52 01 under WD 1374/5. This identifies a manufacturer-listed alternative, not a claim that the item offered is genuine MTU.', source: 'mann' },
      { label: 'Thread reference', value: 'WD 1374/5: 1 1/2-16 UN-2B. Confirm this against the installed head and the exact filter brand being quoted.', source: 'mann' },
      { label: 'Size reference', value: 'WD 1374/5: body diameter 136 mm, height 177 mm, gasket inside/outside diameters 100/111 mm. These are alternative-product dimensions, not measurements of MTU stock.', source: 'mann' },
      { label: 'Manufacturer application list', value: 'WD 1374/5 lists 10V 2000 M72, 10V 2000 M92/M93 and 8V 2000 M92/M93. Other models require a separate check.', source: 'mann' },
      { label: 'Photo identification', value: 'The filter body and box show the requested MTU number. Ask for fresh label and mounting-base photos of the offered batch before accepting supply.', source: 'photo' },
    ],
    sources: [
      { id: 'mann', title: 'MANN-FILTER WD 1374/5: dimensions, applications and MTU OE reference', url: mann },
      { id: 'photo', title: '0031845201 catalog reference photograph', url: '/images/mtu-catalog-parts/0031845201-oil-filter-spin-on.jpg' },
    ],
  },
  X00E50203659: {
    title: 'X00E50203659 MTU Level Monitor | Identification & Quote',
    metaDescription: 'X00E50203659 MTU level monitor. Check the probe, connector and earlier 0005355103 reference. Request unit photos, specification confirmation and a quote.',
    imageAlt: 'X00E50203659 level-monitor box with probe and electrical connector in a reference photo',
    imageCaption: 'Reference photo: box marked X00E50203659 with a probe and connector. Probe length and pinout are not established by this photograph.',
    rfqContext: 'X00E50203659 level monitor: check the old marking, probe installation, connector and electrical specification',
    facts: [
      { label: 'Component identification', value: 'The pictured box identifies a level monitor (NIVEAUWAECHTER); a threaded probe and electrical connector are visible. It is not an oil-pressure sensor.', source: 'photo' },
      { label: 'Public procurement reference', value: 'A published patrol-boat spares request for MTU 16V4000M90 includes X00031104 or X00E50203659 for a water-quantity measurement sensor at line 13. This is purchasing context, not manufacturer approval for every substitution.', source: 'request' },
      { label: 'Dimensions and signal', value: 'No controlled probe-length drawing, pinout or electrical output is supplied by these references. Request those for the offered unit rather than infer them from appearance.', source: 'photo' },
    ],
    sources: [
      { id: 'photo', title: 'X00E50203659 catalog reference photograph', url: '/images/mtu-catalog-parts/x00e50203659-level-monitor.webp' },
      { id: 'request', title: 'Published patrol-boat spare-parts request: PDF page 2, line 13', url: 'https://www.phdcci.in/wp-content/uploads/2021/12/Spare-Parts-for-Turkmenistan.pdf#page=2' },
    ],
  },
  X57508300091: {
    title: 'X57508300091 MTU Fuel Filter | X59408300151 Reference',
    metaDescription: 'Request X57508300091 fuel-filter pricing with the X59408300151 later reference checked. Review a delivered-order example and confirm the offered number.',
    imageAlt: 'Fuel filter marked X59408300151, the catalog later reference for X57508300091',
    imageCaption: 'The canister in this reference photo is marked X59408300151, not X57508300091. Request confirmation of the exact number offered for your filter head.',
    rfqContext: 'X57508300091 fuel filter: state whether X59408300151 is acceptable after a filter-head and engine check',
    facts: [
      { label: 'Number visible in the photo', value: 'X59408300151 is printed on the canister. The image illustrates the later-reference product, not the old number physically in stock.', source: 'photo' },
      { label: 'Delivered-order context', value: 'A customer-authorized order confirmed delivered by Diesel Part Source included an RFQ for 10 filters using X57508300091, quoted under X59408300151 for 16V4000G14F. The application is specific to that request.', source: 'order' },
      { label: 'Weight distinction', value: 'The historical quote gives 1.208 kg for X59408300151. The old-number catalog lists 1.288 kg. Do not use either as packed shipment weight or assume both references weigh the same.', source: 'order' },
      { label: 'Customs reference', value: 'The quote uses HS reference 8421.23.00 for the later-number fuel filter. Confirm the destination classification and gross/net shipment weights for a new order.', source: 'order' },
    ],
    sources: [
      { id: 'photo', title: 'Later-number filter shown in the catalog reference photograph', url: '/images/mtu-catalog-parts/x57508300091-fuel-filter-spin-on.webp' },
      { id: 'order', title: 'Anonymized completed generator-service order; quotation dated 2026-10-08', url: '/case-studies/#generator-service-filters' },
    ],
  },
  X52808100004: {
    title: 'X52808100004 MTU Low-Pressure Fuel Delivery Pump',
    metaDescription: 'X52808100004 MTU low-pressure fuel delivery pump. Review the 20V4000G83 catalog position, coupling and seal references, then request a fitment-checked quote.',
    imageAlt: 'Fuel delivery pump body and mounting flange in an X52808100004 catalog reference photo',
    imageCaption: 'Reference photo of a delivery-pump body and flange. Request a readable identification plate and fresh drive/port views of the offered pump.',
    rfqContext: 'X52808100004 low-pressure fuel delivery pump: confirm complete pump, drive/link, seals, offered successor and condition',
    facts: [
      { label: 'Fuel-system function', value: 'The MTU parts catalog places X52808100004 in the low-pressure fuel-pump group, not the high-pressure injection-pump group.', source: 'oem' },
      { label: 'Documented installation', value: '20V4000G83, example engine serial 528100707; BOM X00040005, drawing 08100172d, item 50. This is one documented engine build, not universal 4000-series fitment.', source: 'oem' },
      { label: 'Separate drawing items', value: 'The link X52408100002 (item 150) and O-ring 700429083000 (item 250) have separate catalog numbers. They are not automatically included with a pump quotation.', source: 'oem' },
      { label: 'Mounting hardware', value: 'Retainer X52607700008 and screw 000933010116 are separately listed in this drawing. Specify a bare pump or itemized assembly in the RFQ.', source: 'oem' },
    ],
    sources: [{ id: 'oem', title: 'MTU parts catalog on KOHLER: PDF page 115, printed page 87/1', url: `${oemCatalog}#page=115` }],
  },
  X00E50214075: {
    title: 'X00E50214075 MTU Pressure Sensor | Reference & Quote',
    metaDescription: 'X00E50214075 MTU pressure sensor. Review the 0035352231 purchasing reference; confirm pressure range, thread, connector and signal before requesting a quote.',
    imageAlt: 'Box marked X00E50214075 beside a pressure sensor bearing an earlier reference in a catalog photo',
    imageCaption: 'The box is marked X00E50214075; the pictured sensor carries an earlier reference. Packaging alone does not confirm the marking or specification of an offered unit.',
    rfqContext: 'X00E50214075 pressure sensor: confirm range/units, electrical output, connector, thread and old 0035352231 marking',
    facts: [
      { label: 'Independent purchasing record', value: 'A BSP bid bulletin dated 27 August 2025 changes its pressure-sensor line from 0035352231 to X00E50214075. This corroborates a real procurement reference change, not compatibility with every engine.', source: 'bulletin' },
      { label: 'Photo versus supplied number', value: 'Check both the box and sensor-body marking. An earlier number on the body needs explicit approval even when a later number appears on the packaging.', source: 'photo' },
      { label: 'Electrical compatibility', value: 'The bulletin does not establish a pinout, voltage, pressure range or output signal. Obtain an offered-unit datasheet and confirm the measuring position before approving substitution.', source: 'bulletin' },
    ],
    sources: [
      { id: 'bulletin', title: 'BSP Bid Bulletin No. 1, 2025-0481: PDF page 1, pressure-sensor revision', url: 'https://www.bsp.gov.ph/Lists/Procurement09/Attachments/26965/BB1-2025-0481-Replacement%20of%20Genset%20Parts-DGS.pdf#page=1' },
      { id: 'photo', title: 'X00E50214075 packaging and sensor catalog photograph', url: '/images/mtu-catalog-parts/x00e50214075-pressure-sensor.webp' },
    ],
  },
  '5410180233': {
    title: '5410180233 MTU Oil Separator Diaphragm | Quote',
    metaDescription: '5410180233 MTU oil-separator diaphragm, not a complete separator. Review the 20V4000G83 drawing and request a quote with housing and quantity checks.',
    imageAlt: 'Packaged 5410180233 oil-separator diaphragm with a visible part-number label',
    imageCaption: 'Reference photo: a packaged diaphragm labelled 5410180233. The complete oil-separator housing and filter insert are not shown as included items.',
    rfqContext: '5410180233 oil-separator diaphragm: confirm membrane-only supply, housing reference and any separately required insert/gasket',
    facts: [
      { label: 'Component scope', value: 'The MTU drawing lists 5410180233 as the oil-separator membrane at item 5. It is a service component, not a complete oil separator.', source: 'oem' },
      { label: 'Documented installation', value: '20V4000G83, example engine serial 528100707; oil-separator BOM 0000187135, item 5. Confirm a different engine build independently.', source: 'oem' },
      { label: 'Separate service items', value: 'The same drawing lists insert 5410100080 at item 10 and gasket 0000180680 at item 15. Request these separately if needed; the diaphragm number does not define a service kit.', source: 'oem' },
      { label: 'Dimensions', value: 'The cited drawing does not publish diaphragm dimensions or material. Confirm housing, seating profile and the offered membrane rather than copy unverified retail dimensions.', source: 'oem' },
    ],
    sources: [{ id: 'oem', title: 'MTU parts catalog on KOHLER: PDF page 36, printed page 20/1', url: `${oemCatalog}#page=36` }],
  },
};
