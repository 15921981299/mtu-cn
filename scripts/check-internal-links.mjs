/**
 * Scan built HTML in dist/ for broken internal links.
 * Run after `npm run build`.
 */
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const htmlFiles = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

function normalizeHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (href.startsWith('http://') || href.startsWith('https://')) return null;
  const pathOnly = href.split(/[?#]/)[0];
  if (!pathOnly.startsWith('/')) return null;
  if (/\.(png|jpe?g|gif|webp|svg|ico|pdf|mp4|webm|xml|txt|json|js|css)$/i.test(pathOnly)) return null;
  let normalized = pathOnly;
  if (!normalized.endsWith('/')) normalized += '/';
  return normalized;
}

async function pathExists(normalized) {
  if (normalized === '/') return exists(path.join(distDir, 'index.html'));
  const withoutLeading = normalized.slice(1);
  const asDirIndex = path.join(distDir, withoutLeading, 'index.html');
  const asFile = path.join(distDir, withoutLeading.replace(/\/$/, '') + '.html');
  const asPublic = path.join(distDir, withoutLeading.replace(/\/$/, ''));
  return (
    (await exists(asDirIndex)) ||
    (await exists(asFile)) ||
    (await exists(asPublic))
  );
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

await walk(distDir);

const hrefPattern = /href="(\/[^"]*)"/g;
const broken = new Set();

for (const file of htmlFiles) {
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch (err) {
    if (err?.code === 'ENOENT') {
      console.warn(`Skipped vanished file during link scan: ${path.relative(distDir, file)}`);
      continue;
    }
    throw err;
  }
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    const normalized = normalizeHref(match[1]);
    if (!normalized) continue;
    const ok = await pathExists(normalized);
    if (!ok) broken.add(`${match[1]} (from ${path.relative(distDir, file)})`);
  }
}

if (broken.size > 0) {
  console.error(`Found ${broken.size} broken internal link(s):`);
  for (const item of [...broken].sort()) console.error(`  - ${item}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files - no broken internal links.`);
