/** Export editorial copy after a build. Generates reviewable local drafts, never publishes. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const output = new URL("../tmp/content-plan/wechat/", import.meta.url);
mkdirSync(output, { recursive: true });
const articles = ["p0", "p1", "p2"].flatMap((batch) =>
  JSON.parse(
    readFileSync(
      new URL(`src/data/service-content/${batch}.json`, root),
      "utf8",
    ),
  ),
);
const unescape = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
const table = ({ headers, rows }) =>
  [headers, headers.map(() => "---"), ...rows]
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
const index = [
  "# 微信内容草稿索引",
  "",
  "由站内正文导出供编辑审阅；图片网址需在站点部署后使用。无自动发布或阅读／转发数据。",
  "",
];
for (const article of articles) {
  const page = readFileSync(
    new URL(`dist/insights/${article.slug}/index.html`, root),
    "utf8",
  );
  const evidence =
    /<aside[^>]+data-content-evidence[\s\S]*?<\/aside>/.exec(page)?.[0] ?? "";
  const source = /href="([^"]+)"/.exec(evidence)?.[1];
  const photo = /class="service-part-photo"[\s\S]*?<img[^>]+src="([^"]+)"/.exec(
    page,
  )?.[1];
  const links = [
    ...page.matchAll(
      /href="(\/part-products\/[^\"]+)"[^>]*data-content-part="([^"]+)"/g,
    ),
  ];
  const parts = [...new Map(links.map((link) => [link[2], link[1]])).entries()];
  const markdown = [
    `# ${article.title}`,
    "",
    `国晁动力 · 2026-10-22 · ${article.audience}`,
    "",
    article.intro,
    "",
    "## 先分类",
    "",
    article.table.caption,
    "",
    table(article.table),
    "",
    "判断依据：" + article.evidence.text,
    "",
    source ? `[核对原始出处](${unescape(source)})` : "",
    "",
    "## 按顺序做什么",
    "",
    `流程：${article.diagram.nodes.join(" → ")}`,
    "",
    ...article.steps.flatMap((step, i) => [
      `### ${i + 1}. ${step.title}`,
      "",
      step.text,
      "",
    ]),
    "先别做错这一步：" + article.mistake,
    "",
    "## 红线",
    "",
    table({ headers: ["情况", "下一步"], rows: article.redlines }),
    "",
    "## 需要换件时，请准备",
    "",
    article.sourcing.text,
    "",
    `[${article.sourcing.label}](https://mtupeijian.com${article.sourcing.href})`,
    "",
    ...article.checklist.map((line) => `- ${line}`),
    "",
    ...(photo
      ? [
          `![目录图片：仅用于识别候选，不代表已确认适配](https://mtupeijian.com${photo})`,
          "",
        ]
      : []),
    ...parts.map(
      ([pn, href]) => `- [${pn} 零件记录](https://mtupeijian.com${href})`,
    ),
    "",
    "## 常见问题",
    "",
    ...article.faqs.flatMap((faq) => [
      `**${faq.question}**`,
      "",
      faq.answer,
      "",
    ]),
    `[回到原文与配图](https://mtupeijian.com/insights/${article.slug}/?utm_source=wechat&utm_medium=content&utm_campaign=mtu-content-20261022)`,
    "",
    "电话／微信：15921981299。提供型号、出厂编号与旧件号后再核验供货。",
    "",
    "具体停机、重启、维修与文件要求按本机资料和现场责任人确认。文中数字为演算输入，非报价或交期承诺。",
    "",
  ].join("\n");
  const file = `${String(article.id).padStart(2, "0")}-${article.slug}.md`;
  writeFileSync(new URL(file, output), markdown);
  index.push(
    `- [${String(article.id).padStart(2, "0")} ${article.title}](${file})`,
  );
}
writeFileSync(new URL("index.md", output), index.join("\n") + "\n");
console.log(
  `Exported ${articles.length} WeChat review drafts to ${fileURLToPath(output)}`,
);
