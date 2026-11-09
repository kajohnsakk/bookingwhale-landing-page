(() => {
  if (window.bwCookieConsent) return;
  const key = 'bw-cookie-consent';
  const version = 1;
  const lifetime = 180 * 86400000;
  const panel = document.getElementById('bw-cookie-consent');
  if (!panel) return;
  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value?.version === version && ['granted', 'denied'].includes(value.analytics) && Number.isFinite(value.updatedAt) && value.updatedAt <= Date.now() && Date.now() - value.updatedAt < lifetime ? value.analytics : null;
    } catch { return null; }
  };
  let choice = read();
  let trigger;
  let expiry;
  const close = panel.querySelector('[data-cookie-close]');
  const show = (focus = false) => {
    panel.hidden = false;
    close.hidden = !choice;
    if (focus) panel.querySelector('h2').focus({ preventScroll: true });
  };
  const hide = () => {
    panel.hidden = true;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  };
  const notify = () => document.dispatchEvent(new CustomEvent('bw:cookie-consent', { detail: { analytics: choice === 'granted' } }));
  const schedule = () => {
    clearTimeout(expiry);
    expiry = setTimeout(() => {
      if (choice && !read()) {
        choice = null;
        notify();
        show();
      }
      schedule();
    }, 60000);
  };
  window.bwCookieConsent = { allowsAnalytics: () => choice === 'granted' };
  panel.addEventListener('click', event => {
    const button = event.target.closest('[data-cookie-choice]');
    if (!button) return;
    choice = button.dataset.cookieChoice;
    try { localStorage.setItem(key, JSON.stringify({ version, analytics: choice, updatedAt: Date.now() })); } catch {}
    hide();
    notify();
  });
  close.addEventListener('click', hide);
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && choice) hide();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-cookie-settings]');
    if (!button) return;
    trigger = button;
    show(true);
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = read();
    notify();
    if (choice) hide(); else show();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    choice = read();
    notify();
    if (choice) hide(); else show();
  });
  if (!choice) show();
  schedule();
})();
