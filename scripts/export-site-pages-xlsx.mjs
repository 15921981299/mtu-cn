import ExcelJS from 'exceljs';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = 'dist';
const outputDir = 'exports';
const outputPath = path.join(outputDir, 'site-pages-current.xlsx');
const siteUrl = 'https://dieselpartsource.com';

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const getFirstMatch = (html, pattern) => {
  const match = html.match(pattern);
  return match ? decodeHtml(match[1] ?? '') : '';
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
};

const routeFromHtml = (filePath) => {
  const relative = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (relative === '404.html') return '/404.html';
  const withoutIndex = relative.replace(/\/?index\.html$/, '');
  return withoutIndex ? `/${withoutIndex}/` : '/';
};

const groupForRoute = (route) => {
  if (route === '/') return 'home';
  if (route === '/404.html') return 'error';
  const [, first, second] = route.split('/');
  if (first === 'part-products' && second === 'catalog') return 'part-products/catalog';
  if (first === 'part-products') return 'part-products/detail';
  return first || 'other';
};

const main = async () => {
  const files = (await walk(distDir)).sort((a, b) => routeFromHtml(a).localeCompare(routeFromHtml(b)));
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Codex';
  workbook.created = new Date();

  const pagesSheet = workbook.addWorksheet('Pages');
  pagesSheet.columns = [
    { header: 'No.', key: 'no', width: 8 },
    { header: 'Group', key: 'group', width: 24 },
    { header: 'Path', key: 'route', width: 64 },
    { header: 'URL', key: 'url', width: 88 },
    { header: 'Title', key: 'title', width: 70 },
    { header: 'Description', key: 'description', width: 100 },
    { header: 'Robots', key: 'robots', width: 32 },
    { header: 'Indexable', key: 'indexable', width: 14 },
  ];

  const summary = new Map();
  let noindexCount = 0;

  let normalPageCount = 0;
  let utilityPageCount = 0;

  for (const [index, file] of files.entries()) {
    const html = await readFile(file, 'utf8');
    const route = routeFromHtml(file);
    const group = groupForRoute(route);
    const isUtility = route === '/404.html';
    if (isUtility) utilityPageCount += 1;
    else normalPageCount += 1;
    const title = getFirstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = getFirstMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const robots = getFirstMatch(html, /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    const indexable = !/\bnoindex\b/i.test(robots);
    if (!indexable) noindexCount += 1;
    summary.set(group, (summary.get(group) ?? 0) + 1);

    pagesSheet.addRow({
      no: index + 1,
      group,
      route,
      url: `${siteUrl}${route === '/' ? '' : route}`,
      title,
      description,
      robots,
      indexable: indexable ? 'Yes' : 'No',
    });
  }

  pagesSheet.getRow(1).font = { bold: true };
  pagesSheet.views = [{ state: 'frozen', ySplit: 1 }];
  pagesSheet.autoFilter = 'A1:H1';

  const summarySheet = workbook.addWorksheet('Summary');
  summarySheet.columns = [
    { header: 'Group', key: 'group', width: 30 },
    { header: 'Pages', key: 'pages', width: 12 },
  ];
  summarySheet.addRow({ group: 'TOTAL', pages: files.length });
  summarySheet.addRow({ group: 'Normal pages', pages: normalPageCount });
  summarySheet.addRow({ group: 'Utility pages', pages: utilityPageCount });
  summarySheet.addRow({ group: 'Indexable', pages: files.length - noindexCount });
  summarySheet.addRow({ group: 'Noindex', pages: noindexCount });
  summarySheet.addRow({});
  [...summary.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([group, pages]) => summarySheet.addRow({ group, pages }));
  summarySheet.getRow(1).font = { bold: true };
  summarySheet.getRow(5).font = { bold: true };

  await mkdir(outputDir, { recursive: true });
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Exported ${files.length} pages to ${outputPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
