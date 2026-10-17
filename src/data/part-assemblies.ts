export type CatalogAssembly = {
  name: string;
  /** curated = hand-verified catalog drawing; derived = grouped from catalog text */
  kind?: 'curated' | 'derived';
  /** Provenance note shown on pages that render the group. */
  provenance?: string;
  parts: { partNumber: string; position?: string; description: string }[];
};

// Drawing relationships are catalog references, not confirmed installation kits.
export const catalogAssemblies: CatalogAssembly[] = [
  {
    name: 'MTU 20V4000G83 example build 528100707, low-pressure fuel pump BOM X00040005, drawing 08100172d',
    parts: [
      { partNumber: 'X52808100004', position: '50', description: 'Fuel delivery pump' },
      { partNumber: 'X52408100002', position: '150', description: 'Link' },
      { partNumber: '700429083000', position: '250', description: 'O-ring' },
      { partNumber: '735151010100', position: '300 / 550', description: 'Washer' },
      { partNumber: 'X52607700008', position: '500', description: 'Retainer' },
      { partNumber: '000933010116', position: '600', description: 'Hexagon screw' },
    ],
  },
  {
    name: 'MTU 20V4000G83 example build 528100707, oil separator BOM 0000187135',
    parts: [
      { partNumber: '5410180233', position: '5', description: 'Oil-separator membrane' },
      { partNumber: '5410100080', position: '10', description: 'Oil-separator insert' },
      { partNumber: '0000180680', position: '15', description: 'Gasket' },
    ],
  },
  {
    name: 'MTU 396 oil-filter housing reference',
    parts: [
      { partNumber: '5501800016', position: '11Z', description: 'Oil filter element' },
      { partNumber: '700429126000', position: '02 / 09', description: 'O-ring' },
      { partNumber: '5501840061', position: '07', description: 'Gasket' },
      { partNumber: '5561800811', position: '06', description: 'Filter bowl' },
      { partNumber: '0011847225', position: '08', description: 'Oil filter element reference' },
    ],
  },
  {
    name: 'MTU 956/1163 high-pressure fuel-line reference',
    parts: [
      { partNumber: '5840780024', position: '25', description: 'Thrust member' },
      { partNumber: '5840700632/87', position: '20', description: 'High-pressure fuel line' },
      { partNumber: '5840782802', position: '140', description: 'Supply pipe' },
      { partNumber: '700429020003', position: '50', description: 'O-ring' },
      { partNumber: '700429017002', position: '90', description: 'O-ring' },
    ],
  },
  {
    name: 'MTU 4000 thermostat-housing reference',
    parts: [
      { partNumber: 'X52420300037', position: '200', description: 'Thermal actuator' },
      { partNumber: '05132155', position: '250', description: 'Sealing ring' },
      { partNumber: '700429072000', position: '550', description: 'O-ring' },
      { partNumber: '5272030080', position: '1350', description: 'Gasket' },
      { partNumber: '700429070000', position: '1550', description: 'O-ring' },
    ],
  },
];


// ---------------------------------------------------------------------------
// Derived assembly groups (generated, do not hand-edit).
// Source: parent-assembly names stated in the catalog descriptions of
// catalog-part-details.ts ("... engine original COOLANT PUMP parts IMPELLER").
// Parts sharing the same series string and parent name are grouped here.
// Drawing positions are not published in that text, so no position is claimed.
// ---------------------------------------------------------------------------
export const derivedCatalogAssemblies: CatalogAssembly[] = [
  {
    name: "MTU 956/1163 coolant pump assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 956/1163 engines list these part numbers under the coolant pump. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "007603016105", description: "Copper Sealing RING" },
      { partNumber: "000910016002", description: "Plug" },
      { partNumber: "000931012156", description: "HEX Screw" },
      { partNumber: "5802040290", description: "Retainer" },
      { partNumber: "000934012008", description: "Nut hex" },
      { partNumber: "000137012202", description: "Washer Spring B12" },
      { partNumber: "000137010202", description: "Washer Spring B10" },
      { partNumber: "000933010093", description: "HEX Screw" },
      { partNumber: "700429045000", description: "O-ring" },
      { partNumber: "0002041116", description: "Rotary SEAL" },
      { partNumber: "700429178000", description: "O-ring" },
      { partNumber: "5842040219", description: "Bearing Housing" },
    ],
  },
  {
    name: "MTU 956 coolant pump assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 956 engines list these part numbers under the coolant pump. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "5802040801", description: "Spiral Housing" },
      { partNumber: "5802040072", description: "Nut" },
      { partNumber: "5802040806", description: "Impeller" },
      { partNumber: "700429100000", description: "O-ring" },
      { partNumber: "5842040257", description: "SEAL Carrier" },
      { partNumber: "5849900851", description: "Nut" },
    ],
  },
  {
    name: "MTU 396 coolant pump assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 396 engines list these part numbers under the coolant pump. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "5502010276", description: "Thrust Washer" },
      { partNumber: "5592010307", description: "Impeller" },
      { partNumber: "700386032000", description: "Shaft SEAL" },
    ],
  },
  {
    name: "MTU 956/1163 bleed valve assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 956/1163 engines list these part numbers under the bleed valve. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "X59699100286", description: "Pressure Spring" },
      { partNumber: "X59699100285", description: "Pressure Spring" },
      { partNumber: "X54514100028", description: "Diaphragm" },
    ],
  },
  {
    name: "MTU 4000 injector assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 4000 engines list these part numbers under the injector. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "XP52799101135", description: "Seal ring" },
      { partNumber: "0000160119", description: "Sealing RING" },
    ],
  },
  {
    name: "MTU 956/1163 hp fuel line assembly",
    kind: 'derived',
    provenance: "Catalog descriptions for MTU 956/1163 engines list these part numbers under the hp fuel line. The grouping follows the catalog text; it is not a confirmed kit list or a drawing revision.",
    parts: [
      { partNumber: "5840780024", description: "Thrust Member" },
      { partNumber: "5840782802", description: "Supply PIPE" },
    ],
  },
];

export const getCatalogAssemblies = (partNumber: string) =>
  [...catalogAssemblies, ...derivedCatalogAssemblies].filter(
    (assembly) => assembly.parts.some((part) => part.partNumber.toUpperCase() === partNumber.toUpperCase()),
  );

/** Curated drawings plus derived groups, for hub pages that list several groups. */
export const allCatalogAssemblies: CatalogAssembly[] = [...catalogAssemblies, ...derivedCatalogAssemblies];
