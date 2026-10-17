import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:4327';
const output = new URL('../tmp/keyword-expansion-2026-10-10/ui/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
});
const targets = [
  ['products/mtu-spare-parts/', 'supplier'],
  ['products/', 'products'],
  ['series/mtu-2000/', 'model-guide'],
  ['part-products/catalog/mtu-filters/', 'catalog'],
  ['part-products/x52420300037-thermal-actuator/', 'assembly'],
  ['part-products/0031845201-oil-filter-spin-on/', 'part'],
  ['part-products/x57508300091-fuel-filter-spin-on/', 'part-case'],
  ['part-products/x00e50203659-level-monitor/', 'level-monitor'],
  ['part-products/x52808100004-fuel-delivery-pump/', 'delivery-pump'],
  ['part-products/x00e50214075-pressure-sensor/', 'pressure-sensor'],
  ['part-products/5410180233-diaphragm-for-oil-separator/', 'diaphragm'],
  ['part-products/catalog/mtu-injectors/', 'injectors'],
  ['part-products/catalog/mtu-fuel-pumps/', 'pumps'],
  ['part-products/catalog/mtu-gasket-kits/', 'gaskets'],
  ['part-products/catalog/mtu-1163-series/', '1163'],
  ['guides/mtu-2000-overhaul-parts/', '2000-guide'],
  ['guides/mtu-4000-overhaul-parts/', '4000-guide'],
  ['applications/marine-propulsion-engines/', 'marine'],
  ['products/mtu-2000-series-parts/16v-2000-engine-parts/', '16v'],
  ['cross-reference/', 'xref'],
  ['case-studies/', 'cases'],
];

try {
  for (const [size, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route(/googletagmanager|google-analytics|doubleclick/, (route) => route.abort());
    for (const [path, label] of targets) {
      const response = await page.goto(`${baseUrl}/${path}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      const layout = await page.evaluate(() => ({
        heading: document.querySelector('h1')?.textContent.trim(),
        overflow: document.documentElement.scrollWidth - innerWidth,
        broken: [...document.images].filter((image) => image.complete && image.currentSrc && !image.naturalWidth).map((image) => image.currentSrc),
      }));
      assert.ok(layout.heading, path);
      assert.ok(layout.overflow <= 1, `${size} ${path}: ${layout.overflow}px overflow`);
      assert.deepEqual(layout.broken, [], path);
      await page.screenshot({ path: fileURLToPath(new URL(`${size}-${label}.png`, output)) });
      if (await page.locator('[data-buyer-evidence]').count()) {
        const evidence = page.locator('[data-buyer-evidence]');
        await evidence.scrollIntoViewIfNeeded();
        await evidence.locator('summary').click();
        await page.screenshot({ path: fileURLToPath(new URL(`${size}-${label}-evidence.png`, output)) });
        await page.locator('.detail-rfq-strip [data-rfq-modal]').first().click();
        assert.equal(await page.locator('#rfq-modal-form [name="part_number"]').inputValue(), await evidence.getAttribute('data-buyer-evidence'));
        assert.ok((await page.locator('#rfq-modal-form [name="rfq_context"]').inputValue()).length > 60);
        await page.keyboard.press('Escape');
      }
      if (label === 'assembly') {
        await page.locator('h2').filter({ hasText: 'Parts in the Same Catalog Drawing' }).scrollIntoViewIfNeeded();
        await page.screenshot({ path: fileURLToPath(new URL(`${size}-assembly-table.png`, output)) });
      }
      if (label === 'catalog' || label === 'marine') {
        await page.locator('.procurement-brief').scrollIntoViewIfNeeded();
        await page.screenshot({ path: fileURLToPath(new URL(`${size}-${label}-procurement.png`, output)) });
        await page.locator('.quotation-examples').scrollIntoViewIfNeeded();
        await page.screenshot({ path: fileURLToPath(new URL(`${size}-${label}-orders.png`, output)) });
      }
      console.log(JSON.stringify({ size, path, ...layout }));
    }
    await page.goto(`${baseUrl}/part-products/0031845201-oil-filter-spin-on/`, { waitUntil: 'networkidle' });
    const analyticsEvents = [];
    await page.exposeFunction('captureTestAnalytics', (args) => analyticsEvents.push(args));
    await page.evaluate(() => {
      window.dataLayer = [];
      window.gtag = (...args) => {
        window.dataLayer.push(args);
        window.captureTestAnalytics(args);
      };
    });
    let attempts = 0;
    await page.route('**/api/rfq/', async (route) => {
      attempts += 1;
      await route.fulfill({
        status: attempts === 1 ? 500 : 200,
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(attempts === 1 ? { ok: false } : { ok: true, inquiryId: '73a1bc87-134d-4bc9-a1c2-cc8467fa0db2' }),
      });
    });
    await page.locator('[data-rfq-source="part-0031845201-oil-filter-spin-on"]').first().click();
    const form = page.locator('#rfq-modal-form');
    assert.equal(await form.locator('[name="name"]').getAttribute('required'), null);
    assert.equal(await form.locator('[name="part_number"]').inputValue(), '0031845201');
    assert.match(await form.locator('[name="message"]').inputValue(), /0031845201/);
    await form.locator('[name="email"]').fill('buyer@example.com');
    await form.locator('[name="quantity"]').fill('2');
    await form.locator('button[type="submit"]').click();
    await form.locator('.is-error').waitFor();
    assert.match(await form.locator('[name="message"]').inputValue(), /0031845201/);
    assert.equal(analyticsEvents.filter((event) => event[1] === 'generate_lead').length, 0);
    await page.screenshot({ path: fileURLToPath(new URL(`${size}-rfq.png`, output)) });
    await form.locator('button[type="submit"]').click();
    await page.waitForURL('**/thank-you/?source=rfq-modal');
    assert.equal(analyticsEvents.filter((event) => event[1] === 'generate_lead').length, 1);
    assert.equal(attempts, 2);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ size, modal: 'optional name, correct part number, failed retry and successful redirect verified' }));
    await context.close();
  }
} finally {
  await browser.close();
}
