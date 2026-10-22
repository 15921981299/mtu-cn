import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const esbuild = require('E:/mtu-cn/node_modules/.pnpm/esbuild@0.25.12/node_modules/esbuild/lib/main.js');
const { writeFileSync } = require('fs');
const os = require('os');
const path = require('path');

const entry = `
import { mtuParts } from 'E:/mtu-cn/src/data/mtu-parts.ts';
import { zhPartName } from 'E:/mtu-cn/src/data/part-names-zh.ts';

const PAREN = /\\([^)]*\\)/g;
function englishRunsOutsideParens(s) {
  // remove parenthetical groups, then find consecutive english words
  const stripped = s.replace(PAREN, ' ');
  const toks = stripped.split(/\\s+/);
  let consec = 0, maxc = 0, run = [];
  for (const t of toks) {
    const wt = t.replace(/[^A-Za-z]/g, '');
    if (wt.length >= 2 && /^[A-Za-z]+$/.test(wt)) { consec++; run.push(wt); if (consec > maxc) maxc = consec; }
    else { consec = 0; run = []; }
  }
  return maxc;
}
// also detect any fully-english word that is NOT a code (has no digit and >=3 letters)
function strayEnglish(s) {
  const stripped = s.replace(PAREN, ' ');
  const words = stripped.split(/\\s+/).map(t => t.replace(/[^A-Za-z]/g, '')).filter(w => w.length >= 3 && /^[A-Za-z]+$/.test(w));
  return words;
}

const results = [];
const counts = {};
for (const p of mtuParts) {
  const zh = zhPartName(p.name);
  const runs = englishRunsOutsideParens(zh);
  const stray = strayEnglish(zh);
  if (runs >= 2 || stray.length > 0) {
    const key = p.name; // use raw name as the residue signature (normalized-ish)
    counts[key] = (counts[key] || 0) + 1;
    if (counts[key] === 1) results.push({ pn: p.partNumber, name: p.name, zh, stray });
  }
}
console.log('UNTRANSLATED / PARTIAL part names in mtuParts: ' + results.length);
// group by normalized name to show frequency
const byName = {};
for (const p of mtuParts) {
  const zh = zhPartName(p.name);
  if (englishRunsOutsideParens(zh) >= 2 || strayEnglish(zh).length > 0) {
    byName[p.name] = (byName[p.name] || 0) + 1;
  }
}
const sorted = Object.entries(byName).sort((a,b)=>b[1]-a[1]);
for (const [name, c] of sorted) {
  console.log(c + '\\t' + name + '\\t=>\\t' + zhPartName(name));
}
`;

const tmp = path.join(os.tmpdir(), 'tmp-zh-check-entry.mjs');
writeFileSync(tmp, entry);
const out = path.join(os.tmpdir(), 'tmp-zh-check-bundle.mjs');
esbuild.build({
  entryPoints: [tmp],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'silent',
}).then(async () => {
  await import('file://' + out);
}).catch((e) => { console.error(e); process.exit(1); });
