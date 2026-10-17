import { SALES_EMAIL, isZohoSmtpConfigured, sendZohoEmail } from './zoho-smtp.js';
import { RETIRED_PATHS } from './retired-paths.js';

const DOWNLOAD_TTL_SECONDS = 7 * 24 * 60 * 60;
const textEncoder = new TextEncoder();

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', textEncoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function createDownloadUrl(request, key, secret, now = Date.now()) {
  const expires = String(Math.floor(now / 1000) + DOWNLOAD_TTL_SECONDS);
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(secret), textEncoder.encode(`${key}\n${expires}`));
  const hex = Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
  const url = new URL('/api/rfq/download', request.url);
  url.search = new URLSearchParams({ key, expires, signature: hex }).toString();
  return url.toString();
}

async function downloadDrawing(request, env, now = Date.now()) {
  const headers = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  };
  const fail = (message, status) => new Response(message, { status, headers });
  if (!['GET', 'HEAD'].includes(request.method)) return fail('Method not allowed', 405);
  if (!env.RFQ_DOWNLOAD_SECRET || !env.R2_BUCKET) return fail('Download temporarily unavailable.', 503);

  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const expires = url.searchParams.get('expires') || '';
  const signature = url.searchParams.get('signature') || '';
  const nowSeconds = Math.floor(now / 1000);
  if (!key.startsWith('rfq/') || /[\r\n]/.test(key) || !/^\d{10}$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature)) {
    return fail('Invalid download link.', 403);
  }
  const valid = await crypto.subtle.verify(
    'HMAC',
    await hmacKey(env.RFQ_DOWNLOAD_SECRET),
    Uint8Array.from(signature.match(/../g), (byte) => parseInt(byte, 16)),
    textEncoder.encode(`${key}\n${expires}`),
  );
  if (!valid) return fail('Invalid download link.', 403);
  if (Number(expires) <= nowSeconds || Number(expires) > nowSeconds + DOWNLOAD_TTL_SECONDS + 60) {
    return fail('This download link has expired. Contact sales@dieselpartsource.com for assistance.', 410);
  }

  const object = request.method === 'HEAD' ? await env.R2_BUCKET.head(key) : await env.R2_BUCKET.get(key);
  if (!object) return fail('File not found.', 404);
  const filename = (object.customMetadata?.originalFilename || key.split('/').pop() || 'attachment').replace(/[\r\n\u0000-\u001f\u007f/\\]/g, '_');
  const encoded = encodeURIComponent(filename).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
  return new Response(request.method === 'HEAD' ? null : object.body, {
    headers: {
      ...headers,
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Length': String(object.size),
      'Content-Disposition': `attachment; filename="attachment"; filename*=UTF-8''${encoded}`,
    },
  });
}

/**
 * Retired URLs answer 410 Gone.
 *
 * Cloudflare's `_redirects` file only supports 301/302/303/307/308 and 200
 * rewrites, so a `410` rule written there is silently dropped and the path
 * falls back to a plain 404. The retired list is therefore compiled into
 * ./retired-paths.js by scripts/create-worker-entry.mjs (source of truth:
 * src/data/retired-urls.txt) and answered here.
 *
 * This handler only runs when no stored asset matched the request, so a path
 * listed as retired is guaranteed to have nothing served behind it.
 */
const GONE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Page removed | Diesel Part Source</title>
</head>
<body style="margin:0;font:16px/1.6 system-ui,-apple-system,'Segoe UI',sans-serif;color:#1f2933;background:#f7f9fb">
<main style="max-width:640px;margin:0 auto;padding:64px 24px">
<h1 style="font-size:24px;margin:0 0 12px">This page has been removed</h1>
<p style="margin:0 0 20px">The model-page group it belonged to was retired, and there is no equivalent page to forward you to.</p>
<p style="margin:0 0 8px"><strong>Looking for a part?</strong></p>
<ul style="margin:0 0 20px;padding-left:20px">
<li><a href="/products/">Engine parts by series</a> &mdash; MTU main series and overhaul coverage</li>
<li><a href="/part-products/">Part numbers</a> &mdash; look up a specific part number</li>
<li><a href="/contact/">Send an inquiry</a> &mdash; part number, engine model, serial number, quantity, destination</li>
</ul>
<p style="margin:0;color:#52606d;font-size:14px">If you followed a link you trust, email <a href="mailto:sales@dieselpartsource.com">sales@dieselpartsource.com</a> and we will point you to the right page.</p>
</main>
</body>
</html>`;

const GONE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  // Permanent by design; a day at the edge keeps Worker invocations down.
  'Cache-Control': 'public, max-age=86400',
  'X-Content-Type-Options': 'nosniff',
};

/** `/foo/` and `/foo` must resolve to the same key. */
function normalizePathKey(pathname) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function isRetiredPath(pathname) {
  return RETIRED_PATHS.size > 0 && RETIRED_PATHS.has(normalizePathKey(pathname));
}

/**
 * Serve the static build, falling back to the custom 404 page.
 * `not_found_handling = "404-page"` already covers the plain miss; the explicit
 * retry keeps the branded page in place if that asset setting is ever dropped.
 */
async function serveAssets(request, env) {
  const response = await env.ASSETS.fetch(request);
  if (response.status !== 404) return response;
  if ((response.headers.get('content-type') || '').includes('text/html')) return response;

  const fallback = await env.ASSETS.fetch(new Request(new URL('/404.html', request.url), { method: 'GET' }));
  if (!fallback.ok) return response;

  return new Response(fallback.body, { status: 404, headers: fallback.headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRfqRoute = url.pathname === '/api/rfq' || url.pathname === '/api/rfq/';
    const isDownloadRoute = url.pathname === '/api/rfq/download' || url.pathname === '/api/rfq/download/';

    if (isDownloadRoute) return downloadDrawing(request, env);

    // Everything that is not the RFQ endpoint is a static asset, and this
    // branch only runs when no stored asset matched the path (assets are
    // served directly otherwise). 301/302 rules are owned entirely by
    // dist/_redirects; 410 belongs here because _redirects cannot express it.
    if (!isRfqRoute) {
      if (isRetiredPath(url.pathname)) {
        return new Response(request.method === 'HEAD' ? null : GONE_HTML, {
          status: 410,
          headers: GONE_HEADERS,
        });
      }

      if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        return serveAssets(request, env);
      }

      return new Response('Not found', { status: 404 });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: true, ready: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    try {
      const fd = await request.formData();
      const submittedEmail = fd.get('email')?.toString().trim() || '';
      const submittedMessage = fd.get('message')?.toString().trim() || '';
      if (fd.get('website') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submittedEmail) || !submittedMessage) {
        return new Response(JSON.stringify({ ok: false, message: 'Please provide a valid email and part details.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        });
      }
      const name = fd.get('name')?.toString() || '(not provided)';
      const email = submittedEmail;
      const company = fd.get('company')?.toString() || '-';
      const phone = fd.get('phone')?.toString() || '-';
      const material = fd.get('material')?.toString() || '-';
      const quantity = fd.get('quantity')?.toString() || '-';
      const engineModel = fd.get('engine_model')?.toString() || '-';
      const engineSerial = fd.get('engine_serial')?.toString() || '-';
      const country = fd.get('country')?.toString() || '-';
      const message = submittedMessage;
      const source = fd.get('source')?.toString() || '-';
      const role = fd.get('role')?.toString() || '-';
      const nda = fd.get('nda') ? 'Yes' : 'No';
      const attributionField = (key, limit = 500) => String(fd.get(key) || '').replace(/[\r\n\u0000-\u001f]/g, ' ').slice(0, limit) || '-';
      const inquiryId = crypto.randomUUID();

      // Store file to R2
      let drawingInfo = 'No file';
      const drawing = fd.get('drawing');

      if (drawing && drawing instanceof File && drawing.size > 0) {
        const fileSizeKB = (drawing.size / 1024).toFixed(0);
        const key = `rfq/${Date.now()}_${drawing.name}`;

        if (env.R2_BUCKET) {
          await env.R2_BUCKET.put(key, drawing.stream(), {
            httpMetadata: { contentType: drawing.type || 'application/octet-stream' },
            customMetadata: { originalFilename: drawing.name, retentionClass: 'rfq-private' },
          });
          if (env.RFQ_DOWNLOAD_SECRET) {
            const downloadUrl = await createDownloadUrl(request, key, env.RFQ_DOWNLOAD_SECRET);
            drawingInfo = `${drawing.name} (${fileSizeKB} KB)\nPrivate download (valid for 7 days): ${downloadUrl}`;
          } else {
            drawingInfo = `${drawing.name} (${fileSizeKB} KB) [private download not configured]`;
          }
          console.log(`File stored: ${key} (${fileSizeKB} KB)`);
        } else {
          drawingInfo = `${drawing.name} (${fileSizeKB} KB) [R2 not configured]`;
          console.log('R2 not bound - file not stored');
        }
      }

      const emailBody = [
        `Inquiry ID: ${inquiryId}`,
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company}`,
        `Phone:    ${phone}`,
        `Role:     ${role}`,
        `Material: ${material}`,
        `Quantity: ${quantity}`,
        `Engine model:  ${engineModel}`,
        `Engine serial: ${engineSerial}`,
        `Destination:   ${country}`,
        `Drawing:  ${drawingInfo}`,
        `NDA:      ${nda}`,
        `Source:   ${source}`,
        `Inquiry page: ${attributionField('page_url')}`,
        `Part number: ${attributionField('part_number', 100)}`,
        `Inquiry context: ${attributionField('rfq_context', 300)}`,
        `First landing page: ${attributionField('first_touch_page')}`,
        `Entry source (browser-reported): ${attributionField('entry_source', 100)}`,
        `Entry medium: ${attributionField('entry_medium', 100)}`,
        `Referrer host: ${attributionField('referrer_host', 200)}`,
        `Campaign: ${attributionField('entry_campaign', 100)}`,
        `Page path: ${attributionField('touch_path', 1500)}`,
        '',
        `Message:`,
        message,
      ].join('\n');

      console.log(emailBody);

      const deliverEmail = typeof env.__sendEmail === 'function' ? env.__sendEmail : sendZohoEmail;

      if (!env.__sendEmail && !isZohoSmtpConfigured(env)) {
        console.error('ZOHO_SMTP_PASS not configured');
        return new Response(JSON.stringify({ ok: false, message: 'Email service not configured. Please email us at sales@dieselpartsource.com' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      const subjectPart = attributionField('part_number', 60);
      const subjectParts = [
        subjectPart !== '-' ? subjectPart : '',
        quantity !== '-' ? `Qty ${quantity}` : '',
        country !== '-' ? country : '',
        name !== '(not provided)' ? name : email,
      ].filter(Boolean).map((part) => part.replace(/[\r\n]+/g, ' ').trim()).join(' | ');

      await deliverEmail(env, {
        to: env.RFQ_NOTIFICATION_EMAIL || 'admin@machiningsupplier.com',
        subject: `New RFQ: ${subjectParts}`.slice(0, 180),
        text: emailBody,
        replyTo: email.includes('@') && email !== '(not provided)' ? email : undefined,
      });
      console.log('Zoho SMTP: sales notification sent');

      if (email.includes('@') && email !== '(not provided)') {
        const autoReplyBody = [
          name === '(not provided)' ? 'Hello,' : `Hi ${name},`,
          '',
          'Thank you for submitting your engine parts inquiry to Diesel Part Source.',
          '',
          'We have received your inquiry. Our parts team will review your part number, engine details, photos, quantity, and destination before quotation.',
          '',
          'What happens next:',
          '1. Part-number, engine model, and serial-number review',
          '2. Availability, lead time, unit price, and shipping route check',
          '3. Follow-up if replacement or compatibility details need confirmation',
          '',
          'Helpful resources:',
          '- MTU part numbers: https://dieselpartsource.com/part-products/',
          '- Engine parts catalog: https://dieselpartsource.com/products/',
          '',
          'Questions before we reply? Email sales@dieselpartsource.com - we respond within one business day.',
          '',
          'Best regards,',
          'Diesel Part Source Parts Team',
        ].join('\n');

        try {
          await deliverEmail(env, {
            to: email,
            subject: 'We received your engine parts inquiry - Diesel Part Source',
            text: autoReplyBody,
            replyTo: SALES_EMAIL,
          });
          console.log('Zoho SMTP: customer auto-reply sent');
        } catch (autoReplyErr) {
          console.error('Customer auto-reply failed:', autoReplyErr.message);
        }
      }

      return new Response(JSON.stringify({ ok: true, inquiryId, message: `Thanks${name === '(not provided)' ? '' : ` ${name}`}! We'll reply to ${email} within one business day.` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

    } catch (err) {
      console.error('RFQ Error:', err.message);
      return new Response(JSON.stringify({ ok: false, message: 'Something went wrong. Please email us at sales@dieselpartsource.com' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
