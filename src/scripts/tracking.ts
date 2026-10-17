type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  return typeof window.gtag === 'function' ? window.gtag : null;
}

function track(event: string, params: Record<string, unknown>): void {
  const fn = gtag();
  if (fn) fn('event', event, params);
}

/**
 * Site-wide outbound / contact-intent click tracking.
 * Captures email and phone clicks plus WhatsApp links that appear inside page
 * content (the floating WhatsApp button tracks itself separately).
 */
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') ?? '';
  const path = window.location.pathname;

  if (href.startsWith('mailto:')) {
    track('click_email', {
      event_category: 'RFQ',
      event_label: path,
      destination: href.replace('mailto:', '').split('?')[0],
    });
    return;
  }

  if (href.startsWith('tel:')) {
    track('click_phone', {
      event_category: 'RFQ',
      event_label: path,
      destination: href.replace('tel:', ''),
    });
    return;
  }

  if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
    if (link.id === 'whatsapp-button') return;
    track('click_whatsapp', {
      event_category: 'RFQ',
      event_label: path,
      whatsapp_source: 'content_link',
    });
  }
});
