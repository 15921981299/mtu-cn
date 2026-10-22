function getResultEl(form: HTMLFormElement) {
  return form.querySelector<HTMLElement>('.form-result');
}

function showResult(form: HTMLFormElement, html: string, type: 'success' | 'error' | 'info' = 'success') {
  const result = getResultEl(form);
  if (!result) return;
  result.className = `form-result is-visible is-${type}`;
  result.innerHTML = html;
}

function setLoading(form: HTMLFormElement, loading: boolean) {
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"], .service-form-button');
  if (!submit) return;
  submit.disabled = loading;
  submit.dataset.originalText ??= submit.textContent ?? '';
  submit.textContent = loading ? '提交中...' : submit.dataset.originalText;
}

async function handleQuote(form: HTMLFormElement) {
  const name = form.querySelector<HTMLInputElement>('[name="name"]')?.value.trim();
  const email = form.querySelector<HTMLInputElement>('[name="email"]')?.value.trim();
  const phone = form.querySelector<HTMLInputElement>('[name="phone"]')?.value.trim();
  const message = form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value.trim();

  // 国内买家可以只留手机/微信，不留邮箱。
  if (!name || !message || (!email && !phone)) {
    showResult(form, '请填写<strong>姓名、联系方式和询价内容</strong>后再提交。', 'error');
    return;
  }

  const endpoint = form.dataset.endpoint ?? '/api/rfq';

  setLoading(form, true);

  const formData = new FormData();
  formData.append('name', name);
  if (email) formData.append('email', email);
  if (phone) formData.append('phone', phone);
  formData.append('message', message);
  formData.append('source', `sidebar:${window.location.pathname}`);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      window.location.href = '/thank-you/?source=sidebar';
      return;
    }

    throw new Error('Server error');
  } catch {
    showResult(
      form,
      `<strong>提交失败。</strong>请致电 15921981299 或添加微信（同号），也可使用<a href="/contact/">完整询价表单</a>上传图纸。`,
      'error'
    );
    setLoading(form, false);
  }
}

function trackFormStart(form: HTMLFormElement) {
  let started = false;
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener(
      'focus',
      () => {
        if (started || typeof window.gtag !== 'function') return;
        started = true;
        window.gtag('event', 'form_start', {
          event_category: 'RFQ',
          event_label: `sidebar:${window.location.pathname}`,
        });
      },
      { once: true }
    );
  });
}

document.querySelectorAll<HTMLFormElement>('[data-form="quote"]').forEach((form) => {
  trackFormStart(form);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleQuote(form);
  });
});

