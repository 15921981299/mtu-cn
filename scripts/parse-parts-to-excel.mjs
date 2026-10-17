import { readFileSync, writeFileSync } from 'node:fs';
import ExcelJS from 'exceljs';

const html = readFileSync('e:/claude/parts.txt', 'utf8');

// Split into individual product blocks by finding <a href="...part-product/...">
const blocks = html.split(/<a href="https:\/\/diesel-part-source\.com\/part-product\//);
const rows = [];

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];

  // href slug
  const hrefSlug = block.match(/^([^"']+)/)?.[1] || '';
  const href = hrefSlug ? `https://diesel-part-source.com/part-product/${hrefSlug}` : '';

  // img src
  const imgMatch = block.match(/<img\s+src="([^"]+)"/);
  const imgSrc = imgMatch ? imgMatch[1] : '';

  // img alt
  const altMatch = block.match(/alt="([^"]*)"/);
  const imgAlt = altMatch ? altMatch[1].trim().replace(/\s+/g, ' ') : '';

  // h5 content (part number + name)
  const h5Match = block.match(/<h5[^>]*>([^<]*)<\/h5>/);
  const h5Text = h5Match ? h5Match[1].trim().replace(/\s+/g, ' ') : '';

  // Extract part number from h5 (first token)
  const partNumber = h5Text.match(/^(\S+)/)?.[1] || '';

  // Extract part name from h5 (everything after part number)
  const partName = h5Text.replace(/^\S+\s*/, '').trim();

  // Extract engine series from alt (e.g. "MTU 4000 ENGINE PARTS" -> "MTU 4000")
  const seriesMatch = imgAlt.match(/(MTU\s+\d+\/?\d*)/i);
  const engineSeries = seriesMatch ? seriesMatch[1] : (imgAlt.match(/^(MTU[^|]*)/i)?.[1]?.trim() || '');

  if (href) {
    rows.push({
      partNumber,
      partName,
      engineSeries: engineSeries.replace(/\s+/g, ' ').trim(),
      href,
      imgSrc,
      imgAlt,
    });
  }
}

console.log(`Parsed ${rows.length} product blocks`);

// Create Excel workbook
const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet('diesel-part-source-parts', {
  views: [{ state: 'frozen', ySplit: 1 }],
});

ws.columns = [
  { header: 'Part Number', key: 'partNumber', width: 22 },
  { header: 'Part Name', key: 'partName', width: 45 },
  { header: 'Engine Series', key: 'engineSeries', width: 28 },
  { header: 'Href', key: 'href', width: 75 },
  { header: 'Img Src', key: 'imgSrc', width: 75 },
  { header: 'Img Alt', key: 'imgAlt', width: 60 },
];

// Style header row
const headerRow = ws.getRow(1);
headerRow.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
headerRow.height = 22;

// Add rows
rows.forEach((row) => ws.addRow(row));

// Auto-filter
ws.autoFilter = {
  from: 'A1',
  to: `F${rows.length + 1}`,
};

// Alternating row colors
for (let i = 2; i <= rows.length + 1; i++) {
  const row = ws.getRow(i);
  if (i % 2 === 0) {
    row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F7FB' } };
  }
}

const outPath = 'e:/claude/diesel-part-source-parts.xlsx';
await wb.xlsx.writeFile(outPath);
console.log(`Written ${rows.length} rows to ${outPath}`);

// Also print series distribution
const seriesCount = {};
rows.forEach((r) => {
  const s = r.engineSeries || '(unknown)';
  seriesCount[s] = (seriesCount[s] || 0) + 1;
});
console.log('\nEngine Series Distribution:');
Object.entries(seriesCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([s, c]) => console.log(`  ${s}: ${c}`));
