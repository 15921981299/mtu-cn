// Coverage test: every normalised catalog name must get a curated Chinese name.
import { readFileSync } from 'node:fs';
import { zhPartName, zhPartNameBilingual, zhCategoryName } from '../src/data/part-names-zh.ts';

const names = readFileSync('tmp/normalized-part-names.txt', 'utf-8').split('\n').filter(Boolean);
const missing = [];
for (const n of names) {
  const zh = zhPartName(n);
  if (zh === n) missing.push(n);
}
console.log('total:', names.length, '| untranslated:', missing.length);
if (missing.length) console.log(missing.join('\n'));
// spot checks
console.log('---');
console.log(zhPartNameBilingual('Gasket Right SIDE'));
console.log(zhPartNameBilingual('Coolant Pump'));
console.log(zhPartName('Crankshaft Bearing Aux PTO End'));
console.log(zhPartName('Piston Ring F Turbocharger'));
console.log(zhCategoryName('Gaskets and seals'));
