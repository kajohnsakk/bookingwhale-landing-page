(() => {
  if (!['bookingwhale.co', 'www.bookingwhale.co'].includes(location.hostname)) return;
  if (/^\/(?:previews|hero-preview|hero-live)(?:\/|$)/.test(location.pathname)) return;
  if (document.getElementById('bw-google-tag')) return;

  const measurementId = 'G-N2554HPN72';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const placement = element => {
    if (element.closest('#contact-dialog')) return 'modal';
    if (element.closest('.bw-main-menu')) return 'mobile_menu';
    if (element.closest('header')) return 'navigation';
    if (element.closest('footer')) return 'footer';
    return element.closest('section[id]')?.id || 'page';
  };
  const track = (name, element, details = {}) => {
    window.gtag('event', name, {
      send_to: measurementId,
      placement: placement(element),
      page_language: document.documentElement.lang,
      ...details,
    });
  };

  document.addEventListener('bw:contact-open', event => {
    if (event.detail?.trigger instanceof Element) track('contact_modal_open', event.detail.trigger);
  });
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || event.defaultPrevented) return;
    const url = new URL(link.href);
    if (url.hostname === 'line.me' && url.pathname === '/R/ti/p/%40337esngk') {
      track('contact_line_click', link);
    } else if (url.protocol === 'tel:' && ['0970166045', '0805956458'].includes(url.pathname)) {
      track('contact_phone_click', link, { contact_target: url.pathname === '0970166045' ? 'primary' : 'secondary' });
    } else if (url.protocol === 'mailto:' && url.pathname === 'info@bookingwhale.co') {
      track('contact_email_click', link);
    }
  });

  const script = document.createElement('script');
  script.id = 'bw-google-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
})();
