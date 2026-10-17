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
