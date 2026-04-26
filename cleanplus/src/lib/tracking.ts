const CAPI_ENDPOINT = '/api/meta-capi';

export function trackWhatsAppClick(page: string, message: string) {
  if (typeof window === 'undefined') return;

  // Facebook Pixel (browser-side)
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'Contact', {
        content_name: page,
        content_category: 'whatsapp_cta',
        content: message.slice(0, 80),
      });
    }
  } catch {}

  // Google Analytics 4
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: page,
        page_source: page,
      });
    }
  } catch {}

  // Server-side Meta CAPI (fire and forget)
  fetch(CAPI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'Contact',
      page,
      eventSource: 'whatsapp_click',
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
