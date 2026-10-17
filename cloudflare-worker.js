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
  if (!['GET', 'HEAD'].includes(request.method)) return fail('请求方法不被允许', 405);
  if (!env.RFQ_DOWNLOAD_SECRET || !env.R2_BUCKET) return fail('下载功能暂时不可用。', 503);

  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const expires = url.searchParams.get('expires') || '';
  const signature = url.searchParams.get('signature') || '';
  const nowSeconds = Math.floor(now / 1000);
  if (!key.startsWith('rfq/') || /[\r\n]/.test(key) || !/^\d{10}$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature)) {
    return fail('下载链接无效。', 403);
  }
  const valid = await crypto.subtle.verify(
    'HMAC',
    await hmacKey(env.RFQ_DOWNLOAD_SECRET),
    Uint8Array.from(signature.match(/../g), (byte) => parseInt(byte, 16)),
    textEncoder.encode(`${key}\n${expires}`),
  );
  if (!valid) return fail('下载链接无效。', 403);
  if (Number(expires) <= nowSeconds || Number(expires) > nowSeconds + DOWNLOAD_TTL_SECONDS + 60) {
    return fail('该下载链接已过期。请联系 sales@dieselpartsource.com 获取帮助。', 410);
  }

  const object = request.method === 'HEAD' ? await env.R2_BUCKET.head(key) : await env.R2_BUCKET.get(key);
  if (!object) return fail('文件不存在。', 404);
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
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>页面已移除 | 柴油零件源</title>
</head>
<body style="margin:0;font:16px/1.6 system-ui,-apple-system,'Segoe UI',sans-serif;color:#1f2933;background:#f7f9fb">
<main style="max-width:640px;margin:0 auto;padding:64px 24px">
<h1 style="font-size:24px;margin:0 0 12px">该页面已移除</h1>
<p style="margin:0 0 20px">其所属的型号页组已下线，没有可跳转的等价页面。</p>
<p style="margin:0 0 8px"><strong>正在查找零件？</strong></p>
<ul style="margin:0 0 20px;padding-left:20px">
<li><a href="/products/">按系列浏览发动机零件</a> —— MTU 主要系列与大修覆盖范围</li>
<li><a href="/part-products/">零件号索引</a> —— 查询具体零件号</li>
<li><a href="/contact/">发送询价</a> —— 零件号、发动机型号、出厂编号、数量、目的地</li>
</ul>
<p style="margin:0;color:#52606d;font-size:14px">如果您通过可信链接到达本页，请发送邮件至 <a href="mailto:sales@dieselpartsource.com">sales@dieselpartsource.com</a>，我们会为您指引正确页面。</p>
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

      return new Response('页面不存在', { status: 404 });
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
        return new Response(JSON.stringify({ ok: false, message: '请提供有效的邮箱地址与零件详情。' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        });
      }
      const name = fd.get('name')?.toString() || '（未提供）';
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
      const nda = fd.get('nda') ? '是' : '否';
      const attributionField = (key, limit = 500) => String(fd.get(key) || '').replace(/[\r\n\u0000-\u001f]/g, ' ').slice(0, limit) || '-';
      const inquiryId = crypto.randomUUID();

      // Store file to R2
      let drawingInfo = '无附件';
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
            drawingInfo = `${drawing.name}（${fileSizeKB} KB）\n私密下载链接（7 天有效）：${downloadUrl}`;
          } else {
            drawingInfo = `${drawing.name}（${fileSizeKB} KB）[未配置私密下载]`;
          }
          console.log(`文件已存储：${key}（${fileSizeKB} KB）`);
        } else {
          drawingInfo = `${drawing.name}（${fileSizeKB} KB）[未配置 R2 存储]`;
          console.log('未绑定 R2 —— 文件未存储');
        }
      }

      const emailBody = [
        `询价编号：${inquiryId}`,
        `姓名：     ${name}`,
        `邮箱：     ${email}`,
        `公司：     ${company}`,
        `电话：     ${phone}`,
        `角色：     ${role}`,
        `材质：     ${material}`,
        `数量：     ${quantity}`,
        `发动机型号：${engineModel}`,
        `出厂编号： ${engineSerial}`,
        `目的国：   ${country}`,
        `附件：     ${drawingInfo}`,
        `保密协议： ${nda}`,
        `来源：     ${source}`,
        `询价页面： ${attributionField('page_url')}`,
        `零件号：   ${attributionField('part_number', 100)}`,
        `询价上下文：${attributionField('rfq_context', 300)}`,
        `首次落地页：${attributionField('first_touch_page')}`,
        `入口来源（浏览器上报）：${attributionField('entry_source', 100)}`,
        `入口媒介： ${attributionField('entry_medium', 100)}`,
        `引荐主机： ${attributionField('referrer_host', 200)}`,
        `广告系列： ${attributionField('entry_campaign', 100)}`,
        `页面路径： ${attributionField('touch_path', 1500)}`,
        '',
        '询价内容：',
        message,
      ].join('\n');

      console.log(emailBody);

      const deliverEmail = typeof env.__sendEmail === 'function' ? env.__sendEmail : sendZohoEmail;

      if (!env.__sendEmail && !isZohoSmtpConfigured(env)) {
        console.error('未配置 ZOHO_SMTP_PASS');
        return new Response(JSON.stringify({ ok: false, message: '邮件服务暂未配置。请直接发送邮件至 sales@dieselpartsource.com' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      const subjectPart = attributionField('part_number', 60);
      const subjectParts = [
        subjectPart !== '-' ? subjectPart : '',
        quantity !== '-' ? `数量 ${quantity}` : '',
        country !== '-' ? country : '',
        name !== '（未提供）' ? name : email,
      ].filter(Boolean).map((part) => part.replace(/[\r\n]+/g, ' ').trim()).join(' | ');

      await deliverEmail(env, {
        to: env.RFQ_NOTIFICATION_EMAIL || 'admin@machiningsupplier.com',
        subject: `新询盘：${subjectParts}`.slice(0, 180),
        text: emailBody,
        replyTo: email.includes('@') && email !== '（未提供）' ? email : undefined,
      });
      console.log('Zoho SMTP：销售通知已发送');

      if (email.includes('@') && email !== '（未提供）') {
        const autoReplyBody = [
          name === '（未提供）' ? '您好，' : `${name}，您好`,
          '',
          '感谢您向柴油零件源提交发动机零件询价。',
          '',
          '我们已收到您的询价。零件团队将在报价前核验您的零件号、发动机信息、照片、数量与目的地。',
          '',
          '后续流程：',
          '1. 零件号、发动机型号与出厂编号核验',
          '2. 供货情况、交货期、单价与运输路线确认',
          '3. 如需确认替换件或适配信息，我们会进一步与您联系',
          '',
          '实用资源：',
          '- MTU 零件号索引：https://dieselpartsource.com/part-products/',
          '- 发动机零件目录：https://dieselpartsource.com/products/',
          '',
          '在我们回复前如有疑问，请发送邮件至 sales@dieselpartsource.com —— 我们在一个工作日内答复。',
          '',
          '此致',
          '柴油零件源 零件团队',
        ].join('\n');

        try {
          await deliverEmail(env, {
            to: email,
            subject: '我们已收到您的发动机零件询价 —— 柴油零件源',
            text: autoReplyBody,
            replyTo: SALES_EMAIL,
          });
          console.log('Zoho SMTP：客户自动回复已发送');
        } catch (autoReplyErr) {
          console.error('客户自动回复发送失败：', autoReplyErr.message);
        }
      }

      return new Response(JSON.stringify({ ok: true, inquiryId, message: `感谢${name === '（未提供）' ? '' : ` ${name}`}！我们将在一个工作日内回复至 ${email}。` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

    } catch (err) {
      console.error('询价处理出错：', err.message);
      return new Response(JSON.stringify({ ok: false, message: '提交出现问题。请发送邮件至 sales@dieselpartsource.com' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
