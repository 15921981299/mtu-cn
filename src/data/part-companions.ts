import { mtuParts, type MtuPart } from './mtu-parts';

/**
 * Parts that are normally checked or replaced in the same job, matched by
 * part name within the same engine series. Each rule states why.
 */
type CompanionRule = { match: RegExp; companions: RegExp; reason: string };

const RULES: CompanionRule[] = [
  { match: /cylinder liner/i, companions: /liner.*(seal|ring)|o-ring|sealing ring|piston ring|compression ring|oil control ring|^piston$/i, reason: 'A liner is fitted with new sealing rings, and the piston rings are matched to the liner bore.' },
  { match: /\bpiston\b(?! ring| pin)/i, companions: /piston ring|compression ring|oil control ring|piston pin|cylinder liner|circlip/i, reason: 'Pistons are fitted with new ring sets and checked against the liner and piston pin.' },
  { match: /piston ring|compression ring|oil control ring|rectangular.*ring|keystone/i, companions: /piston ring|compression ring|oil control ring|rectangular.*ring|keystone|cylinder liner/i, reason: 'Ring sets are replaced complete and checked against liner wear.' },
  { match: /cylinder head gasket|gasket for cylinder head|profile gasket/i, companions: /cylinder head bolt|valve stem seal|o-ring|sealing ring|injector sleeve/i, reason: 'When the cylinder head comes off, head bolts and the seals disturbed with it are normally renewed.' },
  { match: /cylinder head(?! gasket| bolt| cover)/i, companions: /cylinder head gasket|cylinder head bolt|valve stem seal|injector sleeve/i, reason: 'A cylinder head is refitted with a new gasket, bolts, and valve stem seals.' },
  { match: /injector|nozzle/i, companions: /injector sleeve|sealing ring|copper|o-ring|hp fuel line|fuel line|damper ring/i, reason: 'Injectors are refitted with new sealing rings, and the high-pressure connection is checked at the same time.' },
  { match: /hp fuel line|fuel line|high pressure pump|high-pressure pump/i, companions: /sealing cone|sealing ring|o-ring|injector|hp fuel line/i, reason: 'High-pressure connections are re-sealed whenever they are opened.' },
  { match: /coolant pump|water pump|seawater pump/i, companions: /mechanical seal|rotary seal|shaft seal|impeller|gasket|o-ring|sealing ring/i, reason: 'Pump overhauls usually renew the shaft seal, impeller, and housing seals together.' },
  { match: /thermostat|thermal actuator|actuating element/i, companions: /thermostat|o-ring|gasket|sealing ring/i, reason: 'Thermostat elements are replaced with their housing seals.' },
  { match: /turbine wheel|compressor wheel|turbocharger|bearing housing|rotor/i, companions: /turbocharger|turbine|compressor|bearing housing|piston ring for turbocharger|gasket|o-ring/i, reason: 'Turbocharger repairs renew the sealing rings and gaskets on the oil and gas sides.' },
  { match: /conrod bearing|connecting rod|conrod/i, companions: /conrod bearing|conrod bolt|conrod bushing|crankshaft bearing/i, reason: 'Connecting-rod bearings are replaced in pairs with new rod bolts where required.' },
  { match: /crankshaft bearing|main bearing|thrust bearing|thrust washer/i, companions: /crankshaft bearing|main bearing|thrust bearing|thrust washer|conrod bearing/i, reason: 'Main and thrust bearings are checked and replaced as a set per journal type.' },
  { match: /\b(inlet|exhaust) valve\b|valve head/i, companions: /valve guide|valve seat|valve stem seal|valve spring|valve collet|valve keeper|rotocap|valve rotator/i, reason: 'Valve work usually includes guides, seats, stem seals, and springs.' },
  { match: /valve spring|valve guide|valve seat|valve stem seal/i, companions: /inlet valve|exhaust valve|valve spring|valve guide|valve seat|valve stem seal|valve collet/i, reason: 'Valve-train parts are serviced together per cylinder head.' },
  { match: /filter|cartridge|strainer|prefilter/i, companions: /filter|cartridge|sealing ring|o-ring|gasket/i, reason: 'Filters are changed with their housing seals, often as a full filter set.' },
  { match: /sensor|monitor|transmitter|thermocouple/i, companions: /sensor|sealing ring|copper|o-ring|wiring harness/i, reason: 'Sensors are refitted with new sealing rings, and the wiring is checked at the same time.' },
];

const seriesOverlap = (a: MtuPart, b: MtuPart) => a.series.length === 0 || b.series.length === 0 ? false : a.series.some((s) => b.series.includes(s));

export const getCompanionParts = (part: MtuPart, limit = 6) => {
  const rule = RULES.find((candidate) => candidate.match.test(part.name));
  if (!rule) return undefined;
  const picked = new Map<string, MtuPart>();
  for (const candidate of mtuParts) {
    if (candidate.slug === part.slug || candidate.partNumber === part.partNumber) continue;
    if (!seriesOverlap(part, candidate) || !rule.companions.test(candidate.name)) continue;
    const key = candidate.name.toLowerCase();
    if (!picked.has(key)) picked.set(key, candidate);
    if (picked.size >= limit) break;
  }
  if (picked.size === 0) return undefined;
  return { reason: rule.reason, parts: [...picked.values()] };
};
