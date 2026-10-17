/**
 * In-place raster image optimizer.
 * - Keeps the same filename, extension, and format (no reference / OG changes).
 * - Downsizes images wider than MAX_WIDTH and re-encodes JPG/WebP at sensible quality.
 * - Only overwrites when the result is actually smaller. PNG and SVG are skipped.
 *
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = 'public/images';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

const files = await walk(ROOT);
let savedTotal = 0;
let changed = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.webp'].includes(ext)) continue;

  const original = await readFile(file);
  let pipeline = sharp(original, { failOn: 'none' });
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let out;
  if (ext === '.webp') {
    out = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  } else {
    out = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true }).toBuffer();
  }

  if (out.length < original.length) {
    await writeFile(file, out);
    const saved = original.length - out.length;
    savedTotal += saved;
    changed += 1;
    console.log(`${kb(original.length).padStart(6)}KB -> ${kb(out.length).padStart(6)}KB  ${file}`);
  }
}

console.log(`\nOptimized ${changed} images. Total saved: ${kb(savedTotal)} KB (${(savedTotal / 1024 / 1024).toFixed(2)} MB).`);
