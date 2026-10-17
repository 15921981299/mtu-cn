// Generate the normalized part-name list that the pages actually render,
// so the zh dictionary can be keyed on exactly those strings.
import { readFileSync, writeFileSync } from 'node:fs';
import { standardPartName } from '../src/data/part-names.ts';

const raw = readFileSync('tmp/unique-part-names.txt', 'utf-8').split('\n').filter(Boolean);
const normalized = [...new Set(raw.map((n) => standardPartName(n)))].sort();
writeFileSync('tmp/normalized-part-names.txt', normalized.join('\n') + '\n', 'utf-8');
console.log('normalized unique names:', normalized.length);
