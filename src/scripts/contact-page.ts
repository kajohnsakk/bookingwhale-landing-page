const root = document.querySelector<HTMLElement>('[data-contact-page]');
if (root) {
  if ('IntersectionObserver' in window) {
    root.classList.add('cp-js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: .35 });
    root.querySelectorAll('.cp-photo, [data-reveal]').forEach(element => observer.observe(element));
  }
  const copy = root.querySelector<HTMLButtonElement>('[data-copy]');
  const status = root.querySelector<HTMLElement>('[data-copy-status]');
  const label = copy?.querySelector('span');
  let timer = 0;
  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.copy ?? '');
    } catch {
      location.href = `mailto:${copy.dataset.copy ?? ''}`;
      return;
    }
    copy.classList.add('is-copied');
    if (label) label.textContent = copy.dataset.closeLabel ?? '';
    if (status) status.textContent = copy.dataset.closeLabel ?? '';
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      copy.classList.remove('is-copied');
      if (label) label.textContent = copy.dataset.openLabel ?? '';
      if (status) status.textContent = '';
    }, 2000);
  });
}
