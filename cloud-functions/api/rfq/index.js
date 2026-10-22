/**
 * POST /api/rfq — inquiry endpoint for the EdgeOne Makers deployment.
 * GET  /api/rfq — readiness probe (no side effects, safe to hit any time).
 *
 * Ported from cloudflare-worker.js. Differences, deliberate:
 *   - R2 is gone. The drawing is attached to the notification email instead of
 *     being stored and linked. Makers caps the request body at 6 MB, which is
 *     well inside Zoho's 25 MB message limit, so nothing is lost — and the
 *     signed 7-day download link (whose only purpose was guarding private R2
 *     objects) is no longer needed. There is no /api/rfq/download route now.
 *   - No `Access-Control-Allow-Origin: *`. The form is same-origin, so the
 *     wildcard only ever enabled third-party sites to post into the inbox.
 *   - The inquiry body is never logged: it contains the customer's name, email,
 *     phone and message.
 */

import {
  DEFAULT_SALES_EMAIL,
  MAX_ATTACHMENT_BYTES,
  isSmtpConfigured,
  sendMail,
} from '../../_lib/smtp.js';

const FALLBACK_NOTIFY = 'admin@machiningsupplier.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export function onRequestGet(context) {
  const env = context?.env ?? process.env ?? {};
  return json({ ok: true, ready: isSmtpConfigured(env), service: 'rfq' });
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
}

export async function onRequestPost(context) {
  const env = context?.env ?? process.env ?? {};

  let form;
  try {
    form = await context.request.formData();
  } catch {
    return json({ ok: false, message: '表单数据无法解析（附件可能超过 5 MB）。' }, 413);
  }

  const read = (key) => (form.get(key) ?? '').toString().trim();
  const email = read('email');
  const phone = read('phone');
  const message = read('message');

  // Honeypot: a filled `website` field means a bot. Answer 200 so it learns nothing.
  if (form.get('website')) {
    return json({ ok: true, inquiryId: 'ignored', message: '已收到。' });
  }
  // 国内买家习惯只留手机/微信：邮箱与手机至少一个有效，填了邮箱就必须合法。
  const emailOk = EMAIL_RE.test(email);
  const phoneOk = phone.replace(/\D/g, '').length >= 7;
  if ((!emailOk && !phoneOk) || !message) {
    return json(
      { ok: false, message: '请留下有效的手机号 / 微信号（或邮箱）与零件详情。' },
      400
    );
  }
  if (!isSmtpConfigured(env)) {
    return json(
      { ok: false, message: `表单暂不可用。请致电 15921981299 或添加微信（同号）提交询价。` },
      503,
    );
  }

  const name = read('name') || '（未提供）';
  const company = read('company') || '-';
  const role = read('role') || '-';
  const material = read('material') || '-';
  const quantity = read('quantity') || '-';
  const engineModel = read('engine_model') || '-';
  const engineSerial = read('engine_serial') || '-';
  const country = read('country') || '-';
  const source = read('source') || '-';
  const nda = form.get('nda') ? '是' : '否';
  const inquiryId = crypto.randomUUID();
  const attribution = (key, limit = 500) =>
    String(form.get(key) ?? '').replace(/[\r\n\u0000-\u001f]/g, ' ').trim().slice(0, limit) || '-';

  // ---- attachment -------------------------------------------------------
  let attachment;
  let attachmentInfo = '无附件';
  const drawing = form.get('drawing');
  const looksLikeFile =
    drawing && typeof drawing === 'object' && typeof drawing.arrayBuffer === 'function' && drawing.size > 0;

  if (looksLikeFile) {
    if (drawing.size > MAX_ATTACHMENT_BYTES) {
      return json({ ok: false, message: '附件超过 5 MB。请压缩后重试，或添加微信发送。' }, 413);
    }
    const bytes = Buffer.from(await drawing.arrayBuffer());
    attachment = {
      filename: drawing.name || 'attachment',
      contentType: drawing.type || 'application/octet-stream',
      content: bytes,
    };
    attachmentInfo = `${drawing.name}（${Math.round(drawing.size / 1024)} KB，见邮件附件）`;
  }

  // ---- notification -----------------------------------------------------
  const body = [
    `询价编号：${inquiryId}`,
    `姓名：     ${name}`,
    `邮箱：     ${email || '（未提供）'}`,
    `公司：     ${company}`,
    `电话/微信：${phone || '（未提供）'}`,
    `角色：     ${role}`,
    `材质：     ${material}`,
    `数量：     ${quantity}`,
    `发动机型号：${engineModel}`,
    `出厂编号： ${engineSerial}`,
    `地区：     ${country}`,
    `附件：     ${attachmentInfo}`,
    `保密协议： ${nda}`,
    `来源：     ${source}`,
    `询价页面： ${attribution('page_url')}`,
    `零件号：   ${attribution('part_number', 100)}`,
    `询价上下文：${attribution('rfq_context', 300)}`,
    `首次落地页：${attribution('first_touch_page')}`,
    `入口来源（浏览器上报）：${attribution('entry_source', 100)}`,
    `入口媒介： ${attribution('entry_medium', 100)}`,
    `引荐主机： ${attribution('referrer_host', 200)}`,
    `广告系列： ${attribution('entry_campaign', 100)}`,
    `内容文章： ${attribution('content_article', 150)}`,
    `内容批次： ${attribution('content_batch', 10)}`,
    `内容后查阅零件：${attribution('content_part', 100)}`,
    `页面路径： ${attribution('touch_path', 1500)}`,
    '',
    '询价内容：',
    message,
  ].join('\n');

  const subjectParts = [
    attribution('part_number', 60) !== '-' ? attribution('part_number', 60) : '',
    quantity !== '-' ? `数量 ${quantity}` : '',
    country !== '-' ? country : '',
    name !== '（未提供）' ? name : email || phone,
  ]
    .filter(Boolean)
    .map((part) => part.replace(/[\r\n]+/g, ' ').trim())
    .join(' | ');

  try {
    await sendMail(env, {
      to: env.RFQ_NOTIFICATION_EMAIL || FALLBACK_NOTIFY,
      subject: `新询盘：${subjectParts}`.slice(0, 180),
      text: body,
      // 无邮箱时不能把空 Reply-To 发给 SMTP，退回通知邮箱自身。
      replyTo: emailOk ? email : undefined,
      attachment,
    });
  } catch (error) {
    // Log the failure without the inquiry body.
    console.error(`[rfq ${inquiryId}] 通知邮件发送失败：${error?.message || error}`);
    return json(
      { ok: false, message: `提交出现问题。请致电 15921981299 或添加微信（同号）。` },
      502,
    );
  }

  // ---- auto-reply (best effort; never fail the request over it) ----------
  // 只留手机/微信的买家没有邮箱可回，自动回复跳过，由销售电话/微信联系。
  if (emailOk) {
    const siteUrl = (env.SITE_URL || 'https://mtupeijian.com').replace(/\/+$/, '');
    const autoReply = [
      name === '（未提供）' ? '您好，' : `${name}，您好`,
      '',
      '感谢您向国晁动力提交发动机零件询价。',
      '',
      '我们已收到您的询价。零件团队将在报价前核验您的零件号、发动机信息、照片、数量与目的地。',
      '',
      '后续流程：',
      '1. 零件号、发动机型号与出厂编号核验',
      '2. 供货情况、交货期、单价与运输路线确认',
      '3. 如需确认替换件或适配信息，我们会进一步与您联系',
      '',
      '实用资源：',
      `- MTU 零件号索引：${siteUrl}/part-products/`,
      `- 发动机零件目录：${siteUrl}/products/`,
      '',
      '在我们回复前如有疑问，请致电 15921981299 或添加微信（同号）—— 我们在一个工作日内答复。',
      '',
      '此致',
      '国晁动力零件团队',
    ].join('\n');

    try {
      await sendMail(env, {
        to: email,
        subject: '我们已收到您的发动机零件询价 —— 国晁动力',
        text: autoReply,
        replyTo: DEFAULT_SALES_EMAIL,
      });
    } catch (error) {
      console.warn(`[rfq ${inquiryId}] 自动回复失败：${error?.message || error}`);
    }
  }

  return json({
    ok: true,
    inquiryId,
    message: emailOk
      ? `感谢${name === '（未提供）' ? '' : ` ${name}`}！我们将在一个工作日内回复至 ${email}。`
      : `感谢${name === '（未提供）' ? '' : ` ${name}`}！我们已收到询价，将在一个工作日内通过电话或微信联系您。`,
  });
}
