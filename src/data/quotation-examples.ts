export type QuotationExample = {
  id: string;
  title: string;
  date: string;
  context: string;
  lines: { number: string; name: string; quantity: number; model?: string; weightKg?: number; hsCode?: string }[];
  lesson: string;
};

// Owner confirms customer permission and completed delivery for these orders.
// Item details remain quotation-derived; selected options and delivery dates
// are not provided. Never expose prices, buyer contacts or original PDFs.
export const quotationExamples: QuotationExample[] = [
  {
    id: 'generator-service-filters',
    title: 'Generator Service: Filters and Alternator Belt',
    date: '2026-10-08',
    context: 'A real quotation separated 10V1600G20F and 16V4000G14F generating-set requirements. The model association below is specific to that RFQ, not a universal fitment rule.',
    lines: [
      { number: 'X57508300028', name: 'Fuel filter cartridge', quantity: 4, model: '10V1600G20F', weightKg: 0.832, hsCode: '8421.99.90' },
      { number: 'X57518300024', name: 'Oil filter element', quantity: 4, model: '10V1600G20F', weightKg: 0.131, hsCode: '8421.99.90' },
      { number: 'XP52718300060', name: 'Centrifugal oil-filter paper element', quantity: 8, model: '16V4000G14F', weightKg: 0.021, hsCode: '8421.91.00' },
      { number: 'X59408300151', name: 'EasyChange fuel filter; requested earlier number X57508300091', quantity: 10, model: '16V4000G14F', weightKg: 1.208, hsCode: '8421.23.00' },
      { number: 'X00042954', name: 'Poly-vee belt 8PK, alternator drive', quantity: 6, model: '16V4000G14F', weightKg: 0.143, hsCode: '4010.31.00' },
    ],
    lesson: 'The quotation distinguished OEM-specification filter options from genuine MTU options, with the belt offered only in the genuine version. Quoted dispatch and sourcing schedules were different; neither is a current stock or delivery guarantee.',
  },
  {
    id: 'mixed-parts-list',
    title: 'Mixed Parts List: Kit, Filters and Cylinder-Head Components',
    date: '2026-10-08',
    context: 'A 13-line RFQ retained quantities and offered-version differences per line. The document did not identify a complete engine model or define a universal overhaul kit.',
    lines: [
      { number: 'XP56900600002', name: 'Spare parts kit', quantity: 3, weightKg: 0.153, hsCode: '8481.90.00' },
      { number: 'X57508300028', name: 'Fuel filter cartridge', quantity: 4 },
      { number: 'X57518300024', name: 'Oil filter element', quantity: 4 },
      { number: 'XP52718300060', name: 'Centrifugal oil-filter paper element', quantity: 8 },
      { number: 'X59408300151', name: 'Fuel filter; earlier reference X57508300091', quantity: 10 },
      { number: 'X00042954', name: 'Alternator-drive poly-vee belt 8PK', quantity: 6 },
      { number: 'X52404200052', name: 'Seal ring', quantity: 2 },
      { number: 'X52404200043', name: 'Cylinder-head gasket', quantity: 2 },
      { number: '5249900701', name: 'Cylinder-head bolt', quantity: 12 },
      { number: '5240110062', name: 'Thrust washer, original RFQ line 10', quantity: 12 },
      { number: '5240160069', name: 'Cylinder-head hexagon bolt', quantity: 2 },
      { number: '5240110062', name: 'Thrust washer, original RFQ line 12', quantity: 2 },
      { number: 'X52405400013', name: 'Pushrod', quantity: 4 },
    ],
    lesson: 'Two thrust-washer lines used the same number but different quantities. They remain separate because the quote did not establish that their installation positions were identical. A mixed-list quotation does not prove interchangeability between its bolt numbers.',
  },
  {
    id: 'cylinder-head-components',
    title: 'Cylinder-Head Components: Separate Supply Options',
    date: '2026-10-08',
    context: 'Seven quoted lines covered sealing and cylinder-head components for an order confirmed delivered by Diesel Part Source. The source quotation does not provide the full engine designation or a customer performance result.',
    lines: [
      { number: 'X52404200052', name: 'Seal ring', quantity: 2, weightKg: 0.163, hsCode: '7318.22.00' },
      { number: 'X52404200043', name: 'Cylinder-head gasket', quantity: 2, weightKg: 0.120, hsCode: '8484.10.00' },
      { number: '5249900701', name: 'Cylinder-head bolt', quantity: 12, weightKg: 0.758, hsCode: '7318.15.88' },
      { number: '5240110062', name: 'Thrust washer, original RFQ line 4', quantity: 12, weightKg: 0.021, hsCode: '7318.22.00' },
      { number: '5240160069', name: 'Cylinder-head hexagon bolt', quantity: 2, weightKg: 1.097, hsCode: '7318.15.88' },
      { number: '5240110062', name: 'Thrust washer, original RFQ line 6', quantity: 2, weightKg: 0.021, hsCode: '7318.22.00' },
      { number: 'X52405400013', name: 'Pushrod', quantity: 4, weightKg: 0.610, hsCode: '8409.99.00' },
    ],
    lesson: 'Only the first two lines had a separate OEM-specification option in this quotation. The other lines were offered in the genuine MTU version. This historical offer is not blanket proof of manufacturer origin for future supplies.',
  },
  {
    id: 'spare-parts-kit',
    title: 'XP56900600002: Exact Kit Reference',
    date: '2026-10-08',
    context: 'A real three-kit request was quoted as new genuine MTU supply. The quotation names the kit number, but does not itemize the kit contents or confirm a specific engine model.',
    lines: [{ number: 'XP56900600002', name: 'Spare parts kit', quantity: 3, weightKg: 0.153, hsCode: '8481.90.00' }],
    lesson: 'The quotation used EXW Shanghai and a conditional 6-8 week sourcing schedule. A new request still needs kit-content verification and a fresh lead-time check. A kit must not be described as a complete engine overhaul set without its bill of materials.',
  },
  {
    id: 'molded-tubing',
    title: '5062030282: Molded Tubing Bulk Request',
    date: '2026-10-10',
    context: 'A real quotation covered 50 pieces of molded tubing for a buyer in Bulgaria. The quoted unit weight gives 37.2 kg net for that quantity; carton dimensions and gross weight were not yet confirmed.',
    lines: [{ number: '5062030282', name: 'Molded tubing', quantity: 50, weightKg: 0.744, hsCode: '4009.31.00' }],
    lesson: 'The quotation distinguished sourcing time from transit time and required original packaging with part-number labels. Weight and HS code are quotation references, not verified current-stock measurements or a customs classification ruling.',
  },
];

export const getQuotationExamplesForPart = (number: string) => quotationExamples.filter((example) =>
  example.lines.some((line) => line.number === number) || (number === 'X57508300091' && example.id === 'generator-service-filters'),
);
