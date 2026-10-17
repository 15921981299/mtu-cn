/**
 * Display names for catalog parts. Source names arrive in mixed transcription
 * styles ("Coolant PUMP", "ANGL CONT BALL BRG"); this normalises them to one
 * Title Case convention with catalog abbreviations written out.
 * Slugs are derived from the raw names elsewhere and must not use this.
 */

/** Whole-name corrections for transcription errors and catalog word order. */
const NAME_OVERRIDES: Record<string, string> = {
  'compression press re corder': 'Compression Pressure Recorder',
  'ratchet with extensi on': 'Ratchet with Extension',
  'pressure reducing va lve assy': 'Pressure Reducing Valve Assembly',
  'washer a cop': 'Copper Washer Form A',
  'ring exh manif': 'Exhaust Manifold Ring',
  'seal rear crankshaft': 'Crankshaft Rear Seal',
  'seal ring crankshaft front': 'Crankshaft Front Seal Ring',
  'seal ring crankshaft rear': 'Crankshaft Rear Seal Ring',
  'seal rotary pump': 'Rotary Pump Seal',
  'seal shaft': 'Shaft Seal',
  'ring sealing': 'Sealing Ring',
  'valve head inlet': 'Inlet Valve Head',
  'cleaner air w/adap ftg': 'Air Cleaner with Adapter Fitting',
  'bearing camshaft std': 'Camshaft Bearing, Standard',
  'bellows with test cert. 3.1': 'Bellows with 3.1 Test Certificate',
  'gasket f.exhaust manifold': 'Gasket for Exhaust Manifold',
  'paste molykote g-n-plus': 'Molykote G-N Plus Paste',
  'piston ring, comp': 'Piston Compression Ring',
  'water pump high-temp': 'High-Temperature Water Pump',
  'hyd lash adjuster': 'Hydraulic Lash Adjuster',
  'fuel filter spin-on': 'Spin-On Fuel Filter',
  'filter spin on': 'Spin-On Filter',
  'oil filter spin on': 'Spin-On Oil Filter',
  'bolt hex soc hd': 'Hex Socket Head Bolt',
  'bolt hex flg': 'Hex Flange Bolt',
  'nut hex': 'Hex Nut',
  'oil filter spin-on': 'Spin-On Oil Filter',
  'fuel pump low pressure': 'Low-Pressure Fuel Pump',
  'hose turbo oil suppl': 'Turbocharger Oil Supply Hose',
  'housing+rotating asm': 'Housing and Rotating Assembly',
  'indicator air filter restrister': 'Air Filter Restriction Indicator',
  'oil fiter wrench': 'Oil Filter Wrench',
  'profile gasket f cylind': 'Profile Gasket for Cylinder',
  'ring thrust': 'Thrust Ring',
  'bolt banjo a12': 'Banjo Bolt A12',
  'cyl roller bearing': 'Cylindrical Roller Bearing',
  'grooved ball bearing': 'Deep-Groove Ball Bearing',
  'water pump high temp circuit': 'High-Temperature Circuit Water Pump',
  'flow restrict valve': 'Flow Restrictor Valve',
  'adaptateur p. conduite hp': 'HP Line Adapter',
  'cyl. roller bearing': 'Cylindrical Roller Bearing',
  'fitting/removal dev.': 'Fitting/Removal Device',
  'press limiting valve': 'Pressure Limiting Valve',
  'press relief valve': 'Pressure Relief Valve',
  'suction restr. valve': 'Suction Restrictor Valve',
  'silcone rubber locti': 'Silicone Rubber (Loctite)',
  'illum pushbutton': 'Illuminated Pushbutton',
  'bearing thrust/0-1/lo/spt': 'Thrust Bearing, Size 0-1, LO/SPT',
  'bearing thrust/0-1/up/ril': 'Thrust Bearing, Size 0-1, UP/RIL',
  'diffuser exhaust': 'Exhaust Diffuser',
  'starter electric': 'Electric Starter',
  'sleeve rubber': 'Rubber Sleeve',
  'shaft water pump': 'Water Pump Shaft',
  'gauge vacuum': 'Vacuum Gauge',
  'tachometer engine speed': 'Engine Speed Tachometer',
  'valve drain': 'Drain Valve',
  'rocker arm exhaust': 'Exhaust Rocker Arm',
  'rocker arm inlet': 'Inlet Rocker Arm',
  'valve seat insert exhaust': 'Exhaust Valve Seat Insert',
  'valve seat insert inlet': 'Inlet Valve Seat Insert',
  'valve spring inner': 'Inner Valve Spring',
  'valve spring outer': 'Outer Valve Spring',
  'valve guide inlet size 0': 'Inlet Valve Guide, Size 0',
  'valve guide inlet, size 1': 'Inlet Valve Guide, Size 1',
  'sleeve wear front crankshaft': 'Crankshaft Front Wear Sleeve',
  'bushing conrod size 0': 'Conrod Bushing Size 0',
  'washer valve spring': 'Valve Spring Washer',
  'washer spring b10': 'Spring Washer B10',
  'washer spring b12': 'Spring Washer B12',
  'valve block electric': 'Electric Valve Block',
  'gasket plate outer': 'Outer Gasket Plate',
  'sealing plate inner': 'Inner Sealing Plate',
  'adapter jacketed': 'Jacketed Adapter',
  'bolt hex cap': 'Hex Cap Bolt',
  'leak off line': 'Leak-Off Line',
  'high pressure pump': 'High-Pressure Pump',
  'low pressure fuel pump': 'Low-Pressure Fuel Pump',
  'lube oil full flow filter': 'Lube Oil Full-Flow Filter',
  'rectangular section ring': 'Rectangular-Section Ring',
  'piston composite': 'Composite Piston',
  'rotor complete': 'Complete Rotor',
  'crankshaft bearing lower': 'Crankshaft Bearing, Lower',
  'crankshaft bearing upper': 'Crankshaft Bearing, Upper',
  'connector, fuel rail rear': 'Fuel Rail Rear Connector',
};

/** Abbreviation → written-out word, applied per token (lowercase keys). */
const ABBREVIATIONS: Record<string, string> = {
  brg: 'Bearing',
  shft: 'Shaft',
  shf: 'Shaft',
  exh: 'Exhaust',
  manif: 'Manifold',
  assy: 'Assembly',
  asm: 'Assembly',
  anglr: 'Angular',
  angl: 'Angular',
  compr: 'Compression',
  rectanglr: 'Rectangular',
  sect: 'Section',
  adap: 'Adapter',
  ftg: 'Fitting',
  vlv: 'Valve',
  cyl: 'Cylinder',
  sprng: 'Spring',
  senso: 'Sensor',
  wat: 'Water',
  sol: 'Solenoid',
  hyd: 'Hydraulic',
  std: 'Standard',
  temp: 'Temperature',
  bajo: 'Banjo',
};

/** Tokens kept upper case (technical acronyms and catalog codes). */
const UPPER = new Set([
  'HP', 'LP', 'PTO', 'ECU', 'ADEC', 'MDEC', 'EMU', 'CR', 'NTC', 'PT', 'ATL', 'AC', 'DC', 'LED', 'ID', 'OD',
  'NATO', 'DIN', 'ISO', 'SAE', 'MTU', 'HT', 'LT', 'EGR', 'SCR', 'LO', 'UP', 'SPT', 'RIL', 'KS', 'TC', 'CAN',
]);

/** Short words kept lower case inside a name. */
const LOWER = new Set(['for', 'with', 'and', 'of', 'to', 'in', 'on', 'or', 'a', 'the']);

const fixToken = (token: string, index: number, afterHyphen: boolean): string => {
  if (!/[a-z]/i.test(token)) return token;
  const lower = token.toLowerCase();
  if (lower === 'o') return 'O';
  if (lower === 'w') return 'with';
  if (lower === 'f') return 'for';
  if (ABBREVIATIONS[lower]) return ABBREVIATIONS[lower];
  if (UPPER.has(token.toUpperCase())) return token.toUpperCase();
  if (/\d/.test(token)) return token.toUpperCase();
  if (index > 0 && !afterHyphen && LOWER.has(lower)) return lower;
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const standardPartName = (raw: string): string => {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  const override = NAME_OVERRIDES[trimmed.toLowerCase()];
  if (override) return override;

  let words = 0;
  let previous = '';
  const name = trimmed
    .replace(/\bangl(?:r)?[- ]cont\b/gi, 'Angular-Contact')
    .replace(/\bw\//gi, 'with ')
    .replace(/\bf\//gi, 'for ')
    .replace(/\bsol\./gi, 'Solenoid')
    .split(/([\s/-]+|,)/)
    .map((part) => {
      if (/^[\s/-]+$|^,$/.test(part)) {
        previous = part;
        return part;
      }
      return fixToken(part, words++, previous.includes('-'));
    })
    .join('')
    .replace(/\bO-Ring\b/g, 'O-Ring')
    .replace(/\s+/g, ' ')
    .trim();
  return name;
};

/** Lower-case form for use inside a sentence ("a spin-on fuel filter"). */
export const sentencePartName = (raw: string): string =>
  standardPartName(raw)
    .split(/(\s+|-|\/)/)
    .map((token) => (UPPER.has(token.toUpperCase()) || /\d/.test(token) || token === 'O' ? token : token.toLowerCase()))
    .join('')
    .replace(/\bo-ring\b/gi, 'O-ring');
