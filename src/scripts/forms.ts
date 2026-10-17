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
  const message = form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value.trim();

  if (!name || !email || !message) {
    showResult(form, '请填写<strong>所有字段</strong>后再提交询价。', 'error');
    return;
  }

  const endpoint = form.dataset.endpoint ?? '/api/rfq';
  const fallbackEmail = form.dataset.fallbackEmail ?? 'sales@dieselpartsource.com';

  setLoading(form, true);

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
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
      `<strong>提交失败。</strong>请发送邮件至 <a href="mailto:${fallbackEmail}">${fallbackEmail}</a>，或使用<a href="/contact/">完整询价表单</a>上传图纸。`,
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

