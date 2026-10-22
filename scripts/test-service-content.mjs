import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const articles = ["p0", "p1", "p2"].flatMap((batch) =>
  JSON.parse(
    readFileSync(
      new URL(`src/data/service-content/${batch}.json`, root),
      "utf8",
    ),
  ),
);
const html = (path) =>
  readFileSync(new URL(`dist/${path}/index.html`, root), "utf8");
const foundations = [
  "mtu-engine-smoke-diagnosis-parts",
  "mtu-low-oil-pressure-parts",
  "mtu-high-coolant-temperature-parts",
  "mtu-maintenance-interval-parts-list",
  "mtu-4000-series-model-identification",
  "mtu-filter-cross-reference",
  "mtu-part-number-structure",
  "mtu-overhaul-interval",
];

test("all 24 planned articles have distinct subjects, IDs and complete editorial bodies", () => {
  assert.deepEqual(
    articles.map((article) => article.id),
    Array.from({ length: 24 }, (_, i) => i + 1),
  );
  assert.equal(new Set(articles.map((article) => article.slug)).size, 24);
  assert.deepEqual(
    ["P0", "P1", "P2"].map(
      (batch) => articles.filter((article) => article.batch === batch).length,
    ),
    [5, 8, 11],
  );
  for (const article of articles) {
    const {
      intro,
      table,
      steps,
      mistake,
      evidence,
      redlines,
      checklist,
      faqs,
      sourcing,
    } = article;
    const count = (
      JSON.stringify({
        intro,
        table,
        steps,
        mistake,
        evidence,
        redlines,
        checklist,
        faqs,
        sourcing: { text: sourcing.text, label: sourcing.label },
      }).match(/\p{Script=Han}/gu) ?? []
    ).length;
    assert.ok(
      count >= 1200 && count <= 2000,
      `${article.id}: ${count} Chinese characters`,
    );
    const opening = (intro.match(/\p{Script=Han}/gu) ?? []).length;
    assert.ok(
      opening >= 150 && opening <= 250,
      `${article.id}: opening ${opening}`,
    );
    assert.ok(
      article.title.includes("MTU"),
      `${article.id}: brand missing from H1`,
    );
    assert.ok(
      intro.includes(sourcing.keyword),
      `${article.id}: primary keyword missing from opening`,
    );
    assert.ok(
      article.description.includes(sourcing.keyword),
      `${article.id}: primary keyword missing from description`,
    );
    assert.ok(
      sourcing.text.includes(sourcing.topic),
      `${article.id}: component context missing`,
    );
    assert.ok(
      sourcing.text.includes(sourcing.keyword),
      `${article.id}: primary keyword missing from sourcing context`,
    );
    assert.ok(steps.length >= 3 && steps.length <= 5);
    assert.ok(
      faqs.length >= 3 && redlines.length >= 3 && checklist.length >= 5,
    );
    assert.ok(
      table.rows.length >= 3 &&
        table.rows.every((row) => row.length === table.headers.length),
    );
    assert.equal(article.diagram.nodes.length, 5);
    assert.ok(
      article.related.every(
        (id) => id !== article.id && articles.some((item) => item.id === id),
      ),
    );
    assert.doesNotMatch(
      JSON.stringify(article),
      /综上所述|希望对您有帮助|在当今.{0,8}时代/,
    );
  }
});

test("every rendered article includes real parts, source evidence, diagrams, FAQs and the eight foundations", () => {
  for (const article of articles) {
    const page = html(`insights/${article.slug}`);
    assert.equal((page.match(/<h1[\s>]/g) ?? []).length, 1, article.slug);
    const body = /<article\b[\s\S]*?<\/article>/.exec(page)?.[0] ?? "";
    assert.ok(
      (/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(page)?.[1] ?? "").includes("MTU"),
    );
    assert.ok(body.includes(article.sourcing.text));
    assert.ok(
      body.includes(`href="${article.sourcing.href}" data-content-commercial`),
    );
    assert.equal((body.match(/<h2[\s>]/g) ?? []).length, 5, article.slug);
    assert.match(page, /data-content-comparison/);
    assert.match(page, /data-content-redlines/);
    assert.match(page, /data-content-evidence/);
    assert.match(page, /<svg[^>]+aria-labelledby=/);
    assert.equal((page.match(/class="service-faq"/g) ?? []).length, 3);
    const parts = new Set(
      [...page.matchAll(/data-content-part="([^"]+)"/g)].map(
        (match) => match[1],
      ),
    );
    assert.ok(parts.size >= 3, `${article.slug}: ${parts.size} real parts`);
    for (const match of page.matchAll(/<img[^>]+src="(\/images\/[^\"]+)"/g))
      assert.ok(existsSync(new URL(`public${match[1]}`, root)), match[1]);
    for (const slug of foundations)
      assert.ok(page.includes(`/guides/${slug}/`));
    assert.ok(
      page.includes(`https://mtupeijian.com/insights/${article.slug}/`),
    );
    const schemas = [
      ...page.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap((match) => {
      const data = JSON.parse(match[1]);
      return Array.isArray(data) ? data : [data];
    });
    const schema = schemas.find((item) => item["@type"] === "Article");
    assert.equal(schema?.dateModified, "2026-10-22");
    assert.equal(schema?.author["@type"], "Organization");
    assert.ok(
      !schemas.some(
        (item) => item["@type"] === "FAQPage" || item["@type"] === "HowTo",
      ),
    );
    assert.match(page, /核对原始出处/);
  }
});

test("new content is discoverable in both sitemaps and the existing content cluster", () => {
  const contentSitemap = readFileSync(
    new URL("dist/sitemap-content-0.xml", root),
    "utf8",
  );
  const index = html("insights");
  const map = html("sitemap");
  for (const article of articles)
    for (const content of [contentSitemap, index, map])
      assert.ok(content.includes(`/insights/${article.slug}/`), article.slug);
  assert.ok(contentSitemap.includes("/insights/"));
  for (const slug of foundations)
    assert.ok(html(`guides/${slug}`).includes("/insights/"));
  assert.ok(html("guides").includes("/insights/"));
  assert.ok(html("news").includes("/insights/"));
});

test("reusable diagrams and the downtime comparison are shipped with explicit scenario labels", () => {
  for (const system of ["fuel", "cooling", "lubrication", "boost"]) {
    const svg = readFileSync(
      new URL(`public/images/service-diagrams/${system}.svg`, root),
      "utf8",
    );
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    assert.match(svg, /width="960" height="410"/);
  }
  const page = html("insights/mtu-urgent-parts-lead-time-downtime-cost");
  assert.match(page, /data-downtime-calculator/);
  assert.match(page, /66,000/);
  assert.match(page, /152,000/);
  assert.match(page, /563,000/);
  assert.match(page, /不是实际价格|纯演算|全是假设/);
});
