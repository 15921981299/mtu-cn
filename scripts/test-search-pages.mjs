import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const page = (slug) => readFileSync(new URL(`../dist/part-products/${slug}/index.html`, import.meta.url), 'utf8');
const targets = [
  '0031845201-oil-filter-spin-on', 'x57508300091-fuel-filter-spin-on',
  'ex52407500064-injector', 'x00e50203659-level-monitor', '5244920181-sealing-ring',
  '0020922801-fuel-filter-spin-on', '0035352231-pressure-sensor', '0000925105-filter-element',
  '0005356430-temperature-sensor', '0005357633-speed-sensor', 'x00e50214075-pressure-sensor',
];

test('existing search landing pages remain indexable with self canonicals and RFQ context', () => {
  for (const slug of targets) {
    const html = page(slug);
    assert.ok(html.includes(`rel="canonical" href="https://dieselpartsource.com/part-products/${slug}/"`), slug);
    assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*noindex/, slug);
    assert.ok(html.includes(`data-rfq-source="part-${slug}"`), slug);
    assert.match(html, /Technical Data Status/, slug);
    assert.match(html, /Request a datasheet or measurement check/, slug);
    assert.doesNotMatch(html, /Frequently Purchased Together|Procurement Snapshot|Order Release Standard/, slug);
  }
});

test('missing dimensions are not published as product measurements', () => {
  assert.match(page('0031845201-oil-filter-spin-on'), /What thread reference is available for 0031845201/);
  assert.match(page('0031845201-oil-filter-spin-on'), /not a measurement of current MTU stock/);
  assert.match(page('ex52407500064-injector'), /dimensions of EX52407500064 in inches/);
  assert.doesNotMatch(page('0020922801-fuel-filter-spin-on'), /EM 1 PAL = 160STK/);
  assert.doesNotMatch(page('0005356430-temperature-sensor'), /WIRING HARNESS/);
});

test('replacement directions and links are retained without claiming unknown stock', () => {
  const filter = page('x57508300091-fuel-filter-spin-on');
  assert.match(filter, /X59408300151<\/th>\s*<td[^>]*>Listed later number/);
  const pressure = page('0035352231-pressure-sensor');
  assert.match(pressure, /href="\/part-products\/x00e50214075-pressure-sensor\/"/);
  assert.doesNotMatch(filter, /schema.org\/LimitedAvailability|Listing reviewed: 2026-07-21/);
});

test('catalogs promote the relevant priority pages', () => {
  const filters = page('catalog/mtu-filters');
  const rows = [...filters.matchAll(/<a class="catalog-spec-row"[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(rows[0], '/part-products/0031845201-oil-filter-spin-on/');
  assert.ok(rows.includes('/part-products/0000925105-filter-element/'));
  assert.ok(page('catalog/mtu-injectors').includes('ex52407500064-injector'));
  assert.ok(page('catalog/mtu-sensors').includes('x00e50203659-level-monitor'));
});

test('priority search opportunity pages have distinct identification content and remain indexable', async () => {
  const code = ts.transpileModule(readFileSync(new URL('../src/data/part-search-content.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const { partSearchContent } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  assert.equal(Object.keys(partSearchContent).length, 32);
  const index = JSON.parse(readFileSync(new URL('../dist/search-index.json', import.meta.url), 'utf8'));
  const records = Array.isArray(index) ? index : index.parts;
  for (const [number, content] of Object.entries(partSearchContent)) {
    const record = records.find((record) => record.pn?.toUpperCase() === number);
    assert.ok(record, number);
    const html = page(record.slug);
    assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*noindex/, number);
    assert.match(html, /Technical Data Status/, number);
    assert.ok(html.includes(content.description), number);
    assert.ok(html.includes(`data-part-number="${number}"`), number);
  }
});

test('catalog imports do not publish contradictory series or old estimated measurements', () => {
  const filter = page('5501800016-oil-filter-element');
  assert.match(filter, /0\.658 KG/);
  assert.match(filter, /<title>5501800016 Oil Filter Element - MTU 396 Part<\/title>/);
  assert.doesNotMatch(filter, /0\.700 KG|0\.7 kg|Spin-on element/);
  const adhesive = page('8699890005-adhesive');
  assert.match(adhesive, /Listed in MTU 2000/);
  assert.doesNotMatch(adhesive, /Adhesive for MTU 956|Adhesive for MTU 1163/);
  assert.doesNotMatch(page('xp00a36400005-filter-element'), /2024\/02\/8<\/th>/);
  assert.doesNotMatch(page('5240530122-valve-spring-inner'), /35mm OD x 70mm L/);
});

test('retired non-MTU model pages are not generated or linked from the product overview', () => {
  const retired = readFileSync(new URL('../src/data/retired-urls.txt', import.meta.url), 'utf8');
  for (const slug of ['b125-33', 'eqb125-20', 'eqb140-20']) {
    assert.equal(existsSync(new URL(`../dist/products/${slug}/index.html`, import.meta.url)), false);
    assert.ok(retired.includes(`/products/${slug}/`));
    const overview = readFileSync(new URL('../dist/products/index.html', import.meta.url), 'utf8');
    assert.ok(!overview.includes(`/products/${slug}/`));
  }
});

test('drawing relationships link actual catalog components without calling them a confirmed kit', () => {
  const html = page('x52420300037-thermal-actuator');
  assert.match(html, /Parts in the Same Catalog Drawing/);
  assert.match(html, /href="\/part-products\/05132155-ring-sealing\/"/);
  assert.match(page('05132155-ring-sealing'), /href="\/part-products\/x52420300037-thermal-actuator\/"/);
  assert.match(html, /not a confirmed kit/);
});
