/** Headless local acceptance. API requests are mocked; this never sends inquiries. */
import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

// playwright 不在依赖里：缺了就明确跳过，而不是抛 ERR_MODULE_NOT_FOUND。
// 需要跑这套 UI 验收时：npm i -D playwright && npx playwright install chromium
let chromium;
try {
  ({ chromium } = await import(
    process.env.PLAYWRIGHT_MODULE
      ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
      : "playwright"
  ));
} catch {
  console.log(
    "SKIP  test-service-content-ui：未安装 playwright。\n" +
      "      需要可视化验收时执行：npm i -D playwright && npx playwright install chromium",
  );
  process.exit(0);
}
const articles = ["p0", "p1", "p2"].flatMap((batch) =>
  JSON.parse(
    readFileSync(
      new URL(`../src/data/service-content/${batch}.json`, import.meta.url),
      "utf8",
    ),
  ),
);
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4327";
const output = new URL("../tmp/content-plan/ui/", import.meta.url);
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
});
const results = [];
try {
  for (const [size, viewport] of [
    ["desktop", { width: 1440, height: 1000 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({ viewport });
    await context.addInitScript(() => {
      window.__contentEvents = [];
      window.gtag = (...args) => window.__contentEvents.push(args);
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("**/api/rfq", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, message: "本地模拟失败" }),
      }),
    );
    for (const article of [null, ...articles]) {
      const response = await page.goto(
        `${base}/insights/${article ? article.slug + "/" : ""}`,
        { waitUntil: "networkidle" },
      );
      assert.equal(response.status(), 200);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      );
      assert.ok(
        overflow <= 1,
        `${size} ${article?.id ?? "index"} overflow ${overflow}`,
      );
      if (article) {
        assert.equal(await page.locator("article > section").count(), 5);
        assert.equal(await page.locator(".service-part-card").count(), 3);
      }
      if (!article || [1, 4, 9, 16, 17].includes(article.id)) {
        await page.screenshot({
          path: fileURLToPath(
            new URL(`${size}-${article?.id ?? "index"}-top.png`, output),
          ),
        });
        if (article) {
          await page.locator(".decision-figure").scrollIntoViewIfNeeded();
          await page.screenshot({
            path: fileURLToPath(
              new URL(`${size}-${article.id}-diagram.png`, output),
            ),
          });
          await page.locator(".service-part-photo").scrollIntoViewIfNeeded();
          await page
            .locator(".service-part-photo img")
            .evaluate((image) => image.decode());
          await page.screenshot({
            path: fileURLToPath(
              new URL(`${size}-${article.id}-parts.png`, output),
            ),
          });
        }
      }
      results.push({
        size,
        id: article?.id ?? "index",
        status: response.status(),
        overflow,
      });
    }
    const article = articles[3];
    await page.goto(`${base}/insights/${article.slug}/`, {
      waitUntil: "networkidle",
    });
    await page.locator(".service-part-photo a").click();
    await page.waitForURL("**/part-products/**");
    await page.locator(".detail-rfq-strip [data-rfq-modal]").first().click();
    assert.equal(
      await page
        .locator('#rfq-modal-form [name="content_article"]')
        .inputValue(),
      article.slug,
    );
    assert.ok(
      (await page.locator('#rfq-modal-form [name="content_part"]').inputValue())
        .length > 0,
    );
    await page.keyboard.press("Escape");
    await page.goto(`${base}/insights/${article.slug}/`, {
      waitUntil: "networkidle",
    });
    await page.locator("article .detail-rfq-strip [data-rfq-modal]").click();
    assert.ok(
      (
        await page.locator('#rfq-modal-form [name="rfq_context"]').inputValue()
      ).includes(article.title),
    );
    await page.locator('#rfq-modal-form [name="phone"]').fill("13800138000");
    await page
      .locator('#rfq-modal-form [name="message"]')
      .fill("本地 UI 验证，网络请求已被模拟拦截");
    await page.locator('#rfq-modal-form button[type="submit"]').click();
    await page.waitForFunction(() =>
      document
        .querySelector("#rfq-modal-form .form-result")
        ?.textContent.includes("提交失败"),
    );
    assert.ok(
      (
        await page.locator("#rfq-modal-form .form-result").textContent()
      ).includes("15921981299"),
    );
    await page.keyboard.press("Escape");
    await page.goto(`${base}/insights/${articles[16].slug}/`, {
      waitUntil: "networkidle",
    });
    await page.locator("[data-daily-loss]").fill("0");
    assert.ok(
      (await page.locator("[data-cost-result]").textContent()).includes(
        "计划备货后海运",
      ),
    );
    await page.locator("[data-daily-loss]").fill("-1");
    assert.ok(
      (await page.locator("[data-cost-result]").textContent()).includes(
        "有效的非负数字",
      ),
    );
    assert.deepEqual(errors, [], `${size} JavaScript errors`);
    await context.close();
  }
  writeFileSync(
    new URL("results.json", output),
    JSON.stringify({ pages: results, errors: [] }, null, 2),
  );
  console.log(
    `Passed ${results.length} page/viewport checks, article-to-part attribution, mocked RFQ failure and calculator scenarios.`,
  );
} finally {
  await browser.close();
}
