import type { MtuPart } from './mtu-parts';

export const normalizePartNumber = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');

// Prefer explicit catalog history over undirected imported reference lists.
// Conflicting directions stay undirected until independently resolved.
export function getPartReferences(part: Pick<MtuPart, 'partNumber' | 'replacementFor' | 'crossReferences'>) {
  const groups = new Map<string, { number: string; directions: Set<string> }>();
  for (const number of part.replacementFor ?? []) {
    const key = normalizePartNumber(number);
    if (key && key !== normalizePartNumber(part.partNumber)) groups.set(key, { number: number.trim(), directions: new Set() });
  }
  for (const ref of part.crossReferences ?? []) {
    const key = normalizePartNumber(ref.partNumber);
    if (!key || key === normalizePartNumber(part.partNumber)) continue;
    const entry = groups.get(key) ?? { number: ref.partNumber.trim(), directions: new Set() };
    if (ref.relationship !== 'reference') entry.directions.add(ref.relationship);
    groups.set(key, entry);
  }
  return [...groups.entries()].map(([key, entry]) => ({
    key,
    number: entry.number,
    relationship: entry.directions.size === 1 ? [...entry.directions][0] : 'reference',
    label: entry.directions.size > 1 ? 'Conflicting catalog history; verify direction'
      : entry.directions.has('replaces') ? 'Listed earlier number'
      : entry.directions.has('replaced-by') ? 'Listed later number'
      : 'Reference only; direction unconfirmed',
  }));
}
