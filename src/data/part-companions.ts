import { mtuParts, type MtuPart } from './mtu-parts';

/**
 * Parts that are normally checked or replaced in the same job, matched by
 * part name within the same engine series. Each rule states why.
 */
type CompanionRule = { match: RegExp; companions: RegExp; reason: string };

const RULES: CompanionRule[] = [
  { match: /cylinder liner/i, companions: /liner.*(seal|ring)|o-ring|sealing ring|piston ring|compression ring|oil control ring|^piston$/i, reason: '缸套配装新密封环，且活塞环与缸套内径匹配。' },
  { match: /\bpiston\b(?! ring| pin)/i, companions: /piston ring|compression ring|oil control ring|piston pin|cylinder liner|circlip/i, reason: '活塞配装新活塞环组，并对照缸套与活塞销检查。' },
  { match: /piston ring|compression ring|oil control ring|rectangular.*ring|keystone/i, companions: /piston ring|compression ring|oil control ring|rectangular.*ring|keystone|cylinder liner/i, reason: '活塞环组整套更换，并对照缸套磨损检查。' },
  { match: /cylinder head gasket|gasket for cylinder head|profile gasket/i, companions: /cylinder head bolt|valve stem seal|o-ring|sealing ring|injector sleeve/i, reason: '拆下气缸盖时，缸盖螺栓及随其拆动的密封件通常一并换新。' },
  { match: /cylinder head(?! gasket| bolt| cover)/i, companions: /cylinder head gasket|cylinder head bolt|valve stem seal|injector sleeve/i, reason: '气缸盖重装时配新垫片、新螺栓与新气门杆密封件。' },
  { match: /injector|nozzle/i, companions: /injector sleeve|sealing ring|copper|o-ring|hp fuel line|fuel line|damper ring/i, reason: '喷油器重装时配新密封环，高压连接同时检查。' },
  { match: /hp fuel line|fuel line|high pressure pump|high-pressure pump/i, companions: /sealing cone|sealing ring|o-ring|injector|hp fuel line/i, reason: '高压连接一经打开即重新密封。' },
  { match: /coolant pump|water pump|seawater pump/i, companions: /mechanical seal|rotary seal|shaft seal|impeller|gasket|o-ring|sealing ring/i, reason: '油泵大修通常将轴密封、叶轮与壳体密封一并换新。' },
  { match: /thermostat|thermal actuator|actuating element/i, companions: /thermostat|o-ring|gasket|sealing ring/i, reason: '节温器元件与其壳体密封件一同更换。' },
  { match: /turbine wheel|compressor wheel|turbocharger|bearing housing|rotor/i, companions: /turbocharger|turbine|compressor|bearing housing|piston ring for turbocharger|gasket|o-ring/i, reason: '涡轮增压器维修换新机油侧与燃气侧的密封环与垫片。' },
  { match: /conrod bearing|connecting rod|conrod/i, companions: /conrod bearing|conrod bolt|conrod bushing|crankshaft bearing/i, reason: '连杆轴承成对更换，需要时配新连杆螺栓。' },
  { match: /crankshaft bearing|main bearing|thrust bearing|thrust washer/i, companions: /crankshaft bearing|main bearing|thrust bearing|thrust washer|conrod bearing/i, reason: '主轴承与推力轴承按每个轴颈类型成组检查与更换。' },
  { match: /\b(inlet|exhaust) valve\b|valve head/i, companions: /valve guide|valve seat|valve stem seal|valve spring|valve collet|valve keeper|rotocap|valve rotator/i, reason: '气门作业通常包括导管、座圈、杆密封件与弹簧。' },
  { match: /valve spring|valve guide|valve seat|valve stem seal/i, companions: /inlet valve|exhaust valve|valve spring|valve guide|valve seat|valve stem seal|valve collet/i, reason: '配气机构件按每个气缸盖一同保养。' },
  { match: /filter|cartridge|strainer|prefilter/i, companions: /filter|cartridge|sealing ring|o-ring|gasket/i, reason: '滤清器与其壳体密封件一同更换，常为整套滤清器。' },
  { match: /sensor|monitor|transmitter|thermocouple/i, companions: /sensor|sealing ring|copper|o-ring|wiring harness/i, reason: '传感器重装时配新密封环，线路同时检查。' },
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
