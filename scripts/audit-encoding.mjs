/**
 * Detect common mojibake sequences in source files and built text assets.
 * Run after `npm run build` to include dist/.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const scanDirs = ['src', 'functions', 'scripts', 'public', 'docs', 'dist'];
const textExtensions = new Set([
  '.astro',
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.txt',
  '.xml',
]);

const cp = String.fromCodePoint;
const mojibakePatterns = [
  cp(0x9225),
  cp(0x951b),
  cp(0x6d93),
  cp(0x934b),
  cp(0x7ed4),
  cp(0x7487),
  cp(0x95be),
  cp(0x9286),
  cp(0x5364),
  cp(0x8133),
  cp(0x9983),
  cp(0xfffd),
];

const allowlist = new Set([
  path.normalize('docs/transcripts/94-6-6-inquiry-lesson-whisper.txt'),
]);

const findings = [];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err?.code === 'ENOENT') return;
    throw err;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await walk(fullPath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    if (allowlist.has(path.normalize(relPath))) continue;

    const text = await readFile(fullPath, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      const matched = mojibakePatterns.filter((pattern) => line.includes(pattern));
      if (matched.length === 0) return;
      findings.push({
        file: relPath,
        line: index + 1,
        pattern: matched.join(', '),
        text: line.trim().slice(0, 180),
      });
    });
  }
}

for (const dir of scanDirs) {
  await walk(path.join(rootDir, dir));
}

if (findings.length > 0) {
  console.error(`Found ${findings.length} possible encoding issue(s):`);
  for (const item of findings.slice(0, 200)) {
    console.error(`  - ${item.file}:${item.line} [${item.pattern}] ${item.text}`);
  }
  if (findings.length > 200) {
    console.error(`  ...and ${findings.length - 200} more.`);
  }
  process.exit(1);
}

console.log('Encoding audit passed - no common mojibake sequences found.');
