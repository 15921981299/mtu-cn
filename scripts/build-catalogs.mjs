/**
 * Generates the downloadable part-number catalogs (PDF) into public/downloads/.
 *
 * Why a generator instead of hand-made PDFs: the catalog has to stay in step
 * with src/data/mtu-parts.ts. A hand-made file would be stale within a week and
 * nothing would notice. Run `npm run catalogs` after changing part data.
 *
 * Why a hand-written PDF writer instead of Chrome/puppeteer: no runtime
 * dependency, no browser download, reproducible in CI, and full control over
 * the two things that matter for this file — a real text layer (so the numbers
 * are searchable and indexable) and an exact /Title entry (Google uses it as
 * the result title). The output is plain Helvetica text on A4, nothing fancy.
 *
 * Content rules (hard):
 *  - Only fields already published on the site: part number, name, category,
 *    engine series, HS code, unit weight. No prices, no supplier names, no
 *    purchase costs, no lead times.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

/**
 * Load Vite through Astro's own dependency tree instead of by bare specifier.
 *
 * `vite` is NOT a declared dependency of this project — Astro brings it in. A
 * flat (npm) install leaves a copy at node_modules/vite, so a bare
 * `import { createServer } from 'vite'` works on any machine that has ever run
 * `npm install`. Under pnpm's isolated linker it lives only in the .pnpm
 * virtual store and is never public-hoisted, so the bare specifier throws
 * ERR_MODULE_NOT_FOUND and this step exits 1 — taking the whole build with it,
 * because scripts/build.mjs surfaces the first non-zero step as a hard failure.
 *
 * That is exactly what happened in the Cloudflare build: green locally (mixed
 * node_modules still had the hoisted copy), red in CI (clean pnpm install).
 *
 * Resolving from Astro's own directory lands on the .pnpm virtual store entry
 * and works under both layouts, with no lockfile change and no new dependency.
 */
const require = createRequire(import.meta.url);
const viteEntry = require.resolve('vite', {
  paths: [dirname(require.resolve('astro/package.json'))],
});
const { createServer } = await import(pathToFileURL(viteEntry).href);

const OUT_DIR = resolve('public/downloads');
const SITE = 'https://dieselpartsource.com';
const PRODUCT_NAME = 'Diesel Part Source';

/**
 * Catalogs to produce. `series` empty = the complete catalog.
 * `title`/`heading`/`subtitle` stay English — they are written into the PDF
 * (Latin-1 only). `zhHeading`/`zhSubtitle` are the zh-CN card copy shown on the
 * HTML catalog page only.
 */
const CATALOGS = [
  {
    slug: 'MTU-Engine-Parts-Catalog-Complete',
    title: 'MTU Engine Parts Catalog — Complete Reference List (PDF)',
    heading: 'MTU Engine Parts — Complete Reference List',
    subtitle: 'All catalogued part numbers across every engine series we supply.',
    zhHeading: 'MTU 发动机零件 — 完整参考清单',
    zhSubtitle: '涵盖我们所供全部发动机系列的目录零件号。',
    series: [],
  },
  { slug: 'MTU-2000-Series-Parts-Catalog', title: 'MTU 2000 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 2000 Series Parts Catalog', subtitle: '12V, 16V and 18V 2000 series part numbers.', zhHeading: 'MTU 2000 系列零件目录', zhSubtitle: '12V、16V 与 18V 2000 系列零件号。', series: ['MTU 2000'] },
  { slug: 'MTU-4000-Series-Parts-Catalog', title: 'MTU 4000 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 4000 Series Parts Catalog', subtitle: '12V, 16V and 20V 4000 series part numbers.', zhHeading: 'MTU 4000 系列零件目录', zhSubtitle: '12V、16V 与 20V 4000 系列零件号。', series: ['MTU 4000'] },
  { slug: 'MTU-396-Series-Parts-Catalog', title: 'MTU 396 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 396 Series Parts Catalog', subtitle: '8V, 12V and 16V 396 series part numbers.', zhHeading: 'MTU 396 系列零件目录', zhSubtitle: '8V、12V 与 16V 396 系列零件号。', series: ['MTU 396'] },
  { slug: 'MTU-1163-Series-Parts-Catalog', title: 'MTU 1163 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 1163 Series Parts Catalog', subtitle: '12V, 16V and 20V 1163 series part numbers.', zhHeading: 'MTU 1163 系列零件目录', zhSubtitle: '12V、16V 与 20V 1163 系列零件号。', series: ['MTU 1163'] },
  { slug: 'MTU-956-Series-Parts-Catalog', title: 'MTU 956 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 956 Series Parts Catalog', subtitle: 'Medium-speed 956 series part numbers.', zhHeading: 'MTU 956 系列零件目录', zhSubtitle: '中速 956 系列零件号。', series: ['MTU 956'] },
  { slug: 'MTU-538-Series-Parts-Catalog', title: 'MTU 538 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 538 Series Parts Catalog', subtitle: 'High-speed marine 538 series part numbers.', zhHeading: 'MTU 538 系列零件目录', zhSubtitle: '高速船用 538 系列零件号。', series: ['MTU 538'] },
  { slug: 'MTU-595-Series-Parts-Catalog', title: 'MTU 595 Series Parts Catalog (PDF) — Part Numbers by System', heading: 'MTU 595 Series Parts Catalog', subtitle: 'Heavy-duty 595 series part numbers.', zhHeading: 'MTU 595 系列零件目录', zhSubtitle: '重载 595 系列零件号。', series: ['MTU 595'] },
];

// ---------------------------------------------------------------------------
// PDF primitives
// ---------------------------------------------------------------------------

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 34;
const MARGIN_TOP = 54;
const MARGIN_BOTTOM = 40;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const columns = [
  { key: 'partNumber', label: 'Part number', width: 88, bold: true },
  { key: 'name', label: 'Part name', width: 150 },
  { key: 'category', label: 'System', width: 84 },
  { key: 'seriesText', label: 'Engine series', width: 106 },
  { key: 'hsCode', label: 'HS code', width: 40 },
  { key: 'weightKg', label: 'Unit weight', width: 59.28 },
];

const ROW_H = 13.2;
// 7.8pt is the size at which the longest real values in each column — an 18
// character part number, a 35 character part name, a 25 character multi-series
// string — all fit without truncation. A part number must never be cut: it is
// the only reason the reader opened this file.
const BODY_SIZE = 7.8;
const HEAD_SIZE = 8.5;

/**
 * Helvetica AFM advance widths (units per 1000 em) for ASCII 32..126.
 * Using the real table matters: a rough average over-estimates lowercase text
 * badly enough to truncate column values that would actually have fitted.
 */
const HELVETICA_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556,
  278, 278, 584, 584, 584, 556, 1015,
  667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667,
  778, 722, 667, 611, 722, 667, 944, 667, 667, 611,
  278, 278, 278, 469, 556, 333,
  556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556,
  556, 333, 500, 278, 556, 500, 722, 500, 500, 500,
  334, 260, 334, 584,
];

/** Latin-1 only: everything the PDF body carries must be one byte per char. */
function toLatin1(value) {
  return String(value ?? '')
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ')
    .replace(/\u2264/g, '<=')
    .replace(/\u2265/g, '>=')
    .replace(/\u00AD/g, '')
    // Keep 0xA0-0xFF as well: WinAnsiEncoding covers the whole Latin-1 block, so
    // characters like the middle dot and accented supplier-free part names survive.
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?');
}

/** PDF string escaping for the literal-string form. */
function pdfString(value) {
  return `(${toLatin1(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')})`;
}

/** Real Helvetica advance width, with a small allowance for the bold face. */
function textWidth(text, size, bold = false) {
  let units = 0;
  for (const char of text) {
    const code = char.charCodeAt(0);
    units += code >= 32 && code <= 126 ? HELVETICA_WIDTHS[code - 32] : 556;
  }
  return (units / 1000) * size * (bold ? 1.06 : 1);
}

/** 1pt of breathing room at the end of every cell. */
const CELL_PADDING = 3;

/**
 * Series cells hold a list, so a long list reads better condensed than cut in
 * the middle of a series name ("MTU 956 + 2 more" beats "MTU 956 MTU 1163 MTU").
 * A single entry is never condensed — "+0 more" is not a sentence.
 */
function formatSeriesList(list, width, size) {
  const joined = list.join(', ');
  if (textWidth(joined, size) <= width - CELL_PADDING) return { text: joined, condensed: false };
  if (list.length > 1) return { text: `${list[0]} +${list.length - 1} more`, condensed: true };
  return { text: fit(joined, width, size), condensed: true };
}

/** Trim to the column box, marking the cut so the reader knows it continues. */
function fit(text, width, size, bold = false) {
  const value = toLatin1(text);
  if (textWidth(value, size, bold) <= width - CELL_PADDING) return value;
  let cut = value;
  while (cut.length > 1 && textWidth(`${cut}...`, size, bold) > width - CELL_PADDING) {
    cut = cut.slice(0, -1);
  }
  return `${cut.trimEnd()}...`;
}

class PdfPage {
  constructor() {
    this.ops = [];
  }

  text(x, y, value, { size = BODY_SIZE, bold = false, color = [0, 0, 0] } = {}) {
    const font = bold ? '/F2' : '/F1';
    const [r, g, b] = color;
    this.ops.push(
      `BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm ${pdfString(value)} Tj ET`
    );
  }

  rule(x, y, width, { color = [0.85, 0.87, 0.9], height = 0.6 } = {}) {
    const [r, g, b] = color;
    this.ops.push(`${r} ${g} ${b} rg ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height} re f`);
  }

  fill(x, y, width, height, [r, g, b]) {
    this.ops.push(`${r} ${g} ${b} rg ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f`);
  }

  toStream() {
    return this.ops.join('\n');
  }
}

/** Assemble objects into a valid PDF with a correct xref table. */
function buildPdf({ title, subject, author, pages }) {
  const objects = [];
  const setObject = (num, body) => {
    objects[num] = body;
  };

  // 1 catalog, 2 pages, 3/4 fonts, 5 info, then page/content pairs from 6.
  const pageRefs = [];
  const contentStreams = [];
  pages.forEach((page, index) => {
    const contentNum = 6 + index * 2;
    const pageNum = contentNum + 1;
    const stream = page.toStream();
    contentStreams.push({ num: contentNum, stream });
    pageRefs.push(pageNum);
    setObject(
      pageNum,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentNum} 0 R >>`
    );
  });

  setObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  setObject(2, `<< /Type /Pages /Kids [${pageRefs.map((n) => `${n} 0 R`).join(' ')}] /Count ${pageRefs.length} >>`);
  setObject(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  setObject(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

  const now = new Date();
  const stamp =
    `D:${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}` +
    `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}+08'00'`;
  setObject(
    5,
    `<< /Title ${pdfString(title)} /Author ${pdfString(author)} /Subject ${pdfString(subject)} ` +
      `/Creator ${pdfString('Diesel Part Source catalog generator')} /Producer ${pdfString('Diesel Part Source')} ` +
      `/CreationDate (${stamp}) /ModDate (${stamp}) >>`
  );

  for (const { num, stream } of contentStreams) {
    setObject(num, `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);
  }

  const chunks = [];
  const offsets = [];
  let cursor = 0;

  const push = (text) => {
    const bytes = Buffer.from(text, 'latin1');
    chunks.push(bytes);
    cursor += bytes.length;
  };

  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // Object numbers run 1..maxNum; index 0 is never used, so the highest object
  // number is length - 1. Writing `objects.length` emits one `undefined` object.
  const maxNum = objects.length - 1;
  for (let num = 1; num <= maxNum; num += 1) {
    if (!objects[num]) throw new Error(`PDF object ${num} was never defined`);
    offsets[num] = cursor;
    push(`${num} 0 obj\n${objects[num]}\nendobj\n`);
  }

  const xrefStart = cursor;
  let xref = `xref\n0 ${maxNum + 1}\n0000000000 65535 f \n`;
  for (let num = 1; num <= maxNum; num += 1) {
    xref += `${String(offsets[num]).padStart(10, '0')} 00000 n \n`;
  }
  push(xref);
  push(`trailer\n<< /Size ${maxNum + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  return Buffer.concat(chunks);
}

// ---------------------------------------------------------------------------
// Catalog layout
// ---------------------------------------------------------------------------

function buildPages(catalog, rows, generatedOn) {
  // PDF coordinates start at the bottom-left, so every "distance from the top of
  // the page" value is converted once, here, and the cursor then counts upward.
  const fromTop = (value) => PAGE_H - value;
  const titleBlockHeight = 92;
  const repeatedHeaderHeight = 24;
  const firstRowGap = 18;

  const pages = [];

  const drawColumnHeader = (page, offsetFromTop) => {
    const labelY = fromTop(offsetFromTop);
    let x = MARGIN_X;
    for (const column of columns) {
      page.text(x, labelY, column.label, { size: HEAD_SIZE, bold: true, color: [0.2, 0.27, 0.33] });
      x += column.width;
    }
    page.rule(MARGIN_X, labelY - 6, CONTENT_W, { color: [0.66, 0.71, 0.78] });
    return labelY - firstRowGap;
  };

  const drawFooter = (page, index, total) => {
    page.rule(MARGIN_X, MARGIN_BOTTOM + 12, CONTENT_W, { color: [0.85, 0.87, 0.9] });
    page.text(MARGIN_X, MARGIN_BOTTOM, `${PRODUCT_NAME}  ·  dieselpartsource.com`, {
      size: 7.5,
      color: [0.42, 0.47, 0.53],
    });
    const label = `Page ${index + 1} of ${total}`;
    page.text(PAGE_W - MARGIN_X - textWidth(label, 7.5), MARGIN_BOTTOM, label, {
      size: 7.5,
      color: [0.42, 0.47, 0.53],
    });
  };

  const newBodyPage = () => {
    const page = new PdfPage();
    return { page, y: drawColumnHeader(page, MARGIN_TOP + repeatedHeaderHeight) };
  };

  // ---- page 1 with the title block ----
  let page = new PdfPage();
  page.fill(MARGIN_X, fromTop(MARGIN_TOP) - 4, CONTENT_W, 2, [0.08, 0.43, 0.96]);
  page.text(MARGIN_X, fromTop(MARGIN_TOP) + 10, `${PRODUCT_NAME}  ·  dieselpartsource.com`, {
    size: 10,
    bold: true,
    color: [0.08, 0.43, 0.96],
  });
  page.text(MARGIN_X, fromTop(MARGIN_TOP + 30), catalog.heading, { size: 15, bold: true });
  page.text(MARGIN_X, fromTop(MARGIN_TOP + 46), catalog.subtitle, { size: 9, color: [0.29, 0.33, 0.41] });
  page.text(
    MARGIN_X,
    fromTop(MARGIN_TOP + 62),
    `${rows.length} part numbers  ·  generated ${generatedOn}  ·  sorted by part number`,
    { size: 8.5, color: [0.29, 0.33, 0.41] }
  );
  page.text(
    MARGIN_X,
    fromTop(MARGIN_TOP + 76),
    'Fitment is confirmed against the engine model and serial number before any part is quoted.',
    { size: 8.5, color: [0.29, 0.33, 0.41] }
  );
  let y = drawColumnHeader(page, MARGIN_TOP + titleBlockHeight);

  const truncations = {};

  for (const row of rows) {
    if (y < MARGIN_BOTTOM + 24) {
      pages.push(page);
      ({ page, y } = newBodyPage());
    }

    let x = MARGIN_X;
    for (const column of columns) {
      const raw = row[column.key] ?? '';
      let value;
      if (column.key === 'seriesText') {
        const series = formatSeriesList(row.seriesList, column.width, BODY_SIZE);
        value = series.text;
        if (series.condensed) truncations.seriesCondensed = (truncations.seriesCondensed ?? 0) + 1;
      } else {
        value = fit(raw, column.width, BODY_SIZE, Boolean(column.bold));
        if (value !== toLatin1(raw)) {
          truncations[column.key] = (truncations[column.key] ?? 0) + 1;
        }
      }
      page.text(x + 1, y, value, { size: BODY_SIZE, bold: Boolean(column.bold) });
      x += column.width;
    }
    page.rule(MARGIN_X, y - 4, CONTENT_W, { color: [0.92, 0.93, 0.95], height: 0.5 });
    y -= ROW_H;
  }

  pages.push(page);
  const total = pages.length;
  pages.forEach((item, index) => drawFooter(item, index, total));
  return { pages, truncations };
}

// ---------------------------------------------------------------------------

async function main() {
  const server = await createServer({
    // `watch: null` disables the chokidar watcher. We load one module and close
    // immediately, so watching buys nothing — and in a build container the
    // inotify watch budget is scarce, where hitting it throws ENOSPC.
    server: { middlewareMode: true, watch: null },
    // `noDiscovery` skips the entry scan. We only ever load one local .ts file,
    // so there is nothing to pre-bundle — and the scan globs `**/*.html` from
    // the project root, which drags in outputs/, tmp/ and any dist.prev-* left
    // over from a previous build. When that glob gets big enough Vite prints a
    // "Failed to scan for dependencies" error into the build log, which looks
    // like a failure in a step that actually succeeded.
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
    logLevel: 'error',
  });
  const { mtuParts } = await server.ssrLoadModule('/src/data/mtu-parts.ts');
  await server.close();

  if (!Array.isArray(mtuParts) || mtuParts.length === 0) {
    console.error(
      '! /src/data/mtu-parts.ts did not yield a non-empty array of parts.\n' +
        '  Refusing to write catalogs that would silently cover zero part numbers.'
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const generatedOn = new Date().toISOString().slice(0, 10);
  const manifest = [];
  const failures = [];

  for (const catalog of CATALOGS) {
    const parts = catalog.series.length
      ? mtuParts.filter((part) => part.series.some((series) => catalog.series.includes(series)))
      : mtuParts;

    if (parts.length === 0) {
      failures.push(`${catalog.slug}: 0 matching parts — refusing to write an empty catalog.`);
      continue;
    }

    const rows = [...parts]
      .sort((a, b) =>
        String(a.partNumber).localeCompare(String(b.partNumber), 'en', { numeric: true })
      )
      .map((part) => {
        // Two records carry a redundant " Parts" suffix in their series label
        // ("MTU BR 4000 GAS L64 Parts") where every other label is bare. Strip
        // it for display so the column stays consistent; nothing is re-mapped.
        const series = part.series.map((label) => label.replace(/\s+Parts$/, ''));
        return {
          partNumber: part.partNumber,
          name: part.name,
          category: part.category,
          seriesList: series,
          seriesText: series.join(', '),
          hsCode: part.hsCode ?? '',
        // The web pages say "Confirmed with quotation" / "Varies by model". A
        // printed column has no room for that sentence and does not need it.
          weightKg: /confirm|quotation|varies|request|pending/i.test(part.weightKg ?? '')
            ? 'On request'
            : (part.weightKg ?? ''),
        };
      });

    const { pages, truncations } = buildPages(catalog, rows, generatedOn);
    const pdf = buildPdf({
      title: catalog.title,
      subject: `${catalog.heading} — part-number reference list published by ${PRODUCT_NAME}.`,
      author: PRODUCT_NAME,
      pages,
    });

    const pdfPath = resolve(OUT_DIR, `${catalog.slug}.pdf`);
    await writeFile(pdfPath, pdf);

    if (pdf.length < 2000) {
      failures.push(`${catalog.slug}: PDF is only ${pdf.length} bytes — almost certainly malformed.`);
      continue;
    }

    manifest.push({
      slug: catalog.slug,
      file: `/downloads/${catalog.slug}.pdf`,
      title: catalog.title,
      heading: catalog.heading,
      subtitle: catalog.subtitle,
      zhHeading: catalog.zhHeading,
      zhSubtitle: catalog.zhSubtitle,
      series: catalog.series.join(', ') || 'All engine series',
      parts: rows.length,
      pages: pages.length,
      bytes: pdf.length,
      generated: generatedOn,
      truncatedCells: truncations,
    });

    const truncated = Object.values(truncations).reduce((a, b) => a + b, 0);
    console.log(
      `  ${catalog.slug}.pdf  ${String(rows.length).padStart(3)} parts  ${String(pages.length).padStart(2)} pages  ` +
        `${(pdf.length / 1024).toFixed(0)} KB  truncated cells: ${truncated}`
    );
  }

  await writeFile(
    resolve('src/data/download-catalogs.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8'
  );
  console.log(`\nWrote manifest: src/data/download-catalogs.json (${manifest.length} catalogs)`);

  if (failures.length > 0) {
    console.error('\nCATALOG GENERATION FAILED');
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }
}

await main();
