(() => {
  if (!['bookingwhale.co', 'www.bookingwhale.co'].includes(location.hostname)) return;
  if (/^\/(?:previews|hero-preview|hero-live)(?:\/|$)/.test(location.pathname)) return;
  if (window.bwAnalyticsInitialized) return;
  window.bwAnalyticsInitialized = true;

  const measurementId = 'G-N2554HPN72';
  let started = false;
  const allowed = () => window.bwCookieConsent?.allowsAnalytics() === true;
  const clearCookies = () => {
    const domains = ['', location.hostname, '.' + location.hostname, 'bookingwhale.co', '.bookingwhale.co'];
    const parts = location.pathname.split('/').filter(Boolean);
    const paths = ['/', ...parts.map((_, index) => '/' + parts.slice(0, index + 1).join('/'))];
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
      for (const domain of domains) for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? '; domain=' + domain : ''}`;
      }
    }
  };
  const sync = () => {
    if (!allowed()) {
      window['ga-disable-' + measurementId] = true;
      clearCookies();
      if (started) {
        window.dataLayer.length = 0;
        window.gtag = () => {};
        document.getElementById('bw-google-tag')?.remove();
        location.reload();
      }
      return;
    }
    if (started) return;
    started = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = [];
    window.gtag = function () { if (allowed()) window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { cookie_expires: 15552000, allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.id = 'bw-google-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  };
  document.addEventListener('bw:cookie-consent', sync);
  sync();

  const placement = element => {
    if (element.closest('#contact-dialog')) return 'modal';
    if (element.closest('.bw-main-menu')) return 'mobile_menu';
    if (element.closest('header')) return 'navigation';
    if (element.closest('footer')) return 'footer';
    return element.closest('section[id]')?.id || 'page';
  };
  const track = (name, element, details = {}) => {
    if (!allowed() || !started) return;
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

})();
