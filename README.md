# Diesel Part Source

Diesel engine parts supplier website built with [Astro](https://astro.build). Live site: [dieselpartsource.com](https://dieselpartsource.com).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run check
npm run build
npm run preview
```

## 百度收录（sitemap 板块拆分 + 主动推送）

构建期 `@astrojs/sitemap` 按 `src/data/sitemap-chunks.ts` 的规则把 sitemap
拆成 6 个板块文件，索引 `dist/sitemap-index.xml` 自动汇总（`public/robots.txt`
已指向它）：

| 板块 | 内容 | 约 |
|------|------|----|
| `parts` | `/part-products/` 零件号详情页 | 812 |
| `catalog` | `/part-products/catalog/` 目录页 | 68 |
| `products` | `/products/` 产品线页 | 34 |
| `models` | `/engine-models/` + `/series/` 机型页 | 23 |
| `content` | guides / applications / capabilities / industries / news | 34 |
| `pages` | 首页、关于、联系、条款、imported pages 等 | 28 |

每块在百度站长平台是独立一行提交记录，收录进度按板块可查。新增顶层
目录时记得回 `sitemap-chunks.ts` 补规则（漏归类会安静落入 `pages`）。

主动推送（备案并拿到百度 token 后使用）：

```bash
# 百度搜索资源平台 → 数据提交 → 普通收录 → API 提交，生成 token 后：
export BAIDU_PUSH_TOKEN=xxxx        # Windows: setx BAIDU_PUSH_TOKEN xxxx

npm run push:baidu:dry              # 先看会推什么（不发请求）
npm run push:baidu                  # 增量推送（只推新 URL，历史在 scripts/data/）
node scripts/baidu-push.mjs --chunk parts   # 只推零件页板块
```

`site` 参数默认从 sitemap 推导；若站长平台验证的是 www 子域或不同协议，
用 `--site` 显式指定（必须完全一致，否则报 `site error`）。回归测试：
`npm run test:baidu-push`（离线 mock，37 项断言）。

## Site structure

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/capabilities/` | Engine parts support capabilities |
| `/materials/` | Engine parts reference materials |
| `/industries/` | Industry applications |
| `/case-studies/` | Project case studies |
| `/blog/` | Technical articles |
| `/about/` | About us |
| `/contact/` | Parts inquiry form (Cloudflare Worker `/api/rfq`) |
| `/thank-you/` | Post-submission confirmation |

## Configuration

Edit `src/data/site.ts`:

- `gaMeasurementId` — Google Analytics 4 (leave empty to disable)
- `googleSiteVerification` — GSC HTML verification content value (leave empty to skip)
- `social.linkedin` / `social.youtube` — footer social links (leave empty to hide)

## Stack

- Astro 5 (static site generation)
- TypeScript client scripts
- `@astrojs/sitemap` for SEO
- Cloudflare Worker (`cloudflare-worker.js`) for RFQ form submissions via Zoho SMTP + R2

### Worker secrets

RFQ API is implemented in `cloudflare-worker.js` (deployed as the Worker entry
by `scripts/create-worker-entry.mjs`) and sends inquiries through Zoho SMTP.

Set these secrets/bindings on Cloudflare Pages:

- `ZOHO_SMTP_PASS` — Zoho app password for `sales@dieselpartsource.com`
- `R2_BUCKET` — R2 bucket binding for drawing uploads
- `RFQ_DOWNLOAD_SECRET` — HMAC secret used for private drawing links that expire after 7 days
- `RFQ_NOTIFICATION_EMAIL` (optional Worker variable) - sales-notification recipient. If unset, the existing `admin@machiningsupplier.com` recipient is retained. Confirm the new mailbox can receive mail before changing it.

Email is sent via Zoho SMTP (`smtppro.zoho.com:465`), with the mailbox and host
declared in `wrangler.toml`.
