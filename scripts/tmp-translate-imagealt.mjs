// Localize catalog-part-details.ts imageAlt trailing name segment via zhPartName.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const esbuild = require('E:/mtu-cn/node_modules/.pnpm/esbuild@0.25.12/node_modules/esbuild/lib/main.js');

const out = join(mkdtempSync(join(tmpdir(), 'zh-')), 'part-names-zh.mjs');
await esbuild.build({
  entryPoints: ['E:/mtu-cn/src/data/part-names-zh.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'silent',
});
const { zhPartName } = await import(pathToFileURL(out).href);

const file = new URL('../src/data/catalog-part-details.ts', import.meta.url);
let text = readFileSync(file, 'utf8');

// Match: imageAlt: "MTU ... PARTS | PN | NAME"
const re = /(imageAlt:\s*")(MTU[^"]*?\|\s*)([A-Za-z0-9X]+\/?(?:[A-Za-z0-9X.]+)?)\s*\|\s*([^"]*)(")/g;
let count = 0, unchanged = 0;
const partial = [];
text = text.replace(re, (m, pre, prefix, pn, name, end) => {
  const zh = zhPartName(name);
  count++;
  if (zh === name) unchanged++;
  else if (/[A-Za-z]{3,}/.test(zh)) partial.push(`${pn}: ${name} -> ${zh}`);
  return `${pre}${pn} ${zh}${end}`;
});

writeFileSync(file, text);
console.log(`transformed=${count} unchanged=${unchanged} partialEnglish=${partial.length}`);
if (partial.length) console.log('PARTIAL/ENGLISH LEFT:\n' + partial.slice(0, 60).join('\n'));
