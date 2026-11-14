export function initMobileBookingDemo() {
  const root = document.querySelector<HTMLElement>('[data-booking-demo]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const slots = [...root.querySelectorAll<HTMLButtonElement>('[data-demo-slot]')];
  const review = root.querySelector<HTMLButtonElement>('[data-demo-review]')!;
  const confirm = root.querySelector<HTMLButtonElement>('[data-demo-confirm]')!;
  const panels = [...root.querySelectorAll<HTMLElement>(':scope > li')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const language = document.documentElement.lang;
  const labels = language.startsWith('zh') ? ['确认预订', '商家已收到预订'] : language.startsWith('en') ? ['Confirm booking', 'Booking received by the business'] : ['ยืนยันการจอง', 'ร้านเห็นการจองแล้ว'];
  const actionLabel = confirm.firstChild;
  const status = root.querySelector<HTMLElement>('.bw-mobile-story-confirmed')!;
  const statusLabel = status.querySelector('strong')!;
  const heading = panels[1].querySelector('h3')!;
  const stateLabels = language.startsWith('zh') ? ['查看预订详情', '已确认', '预订成功'] : language.startsWith('en') ? ['Review booking details', 'Confirmed', 'Booking confirmed'] : ['ตรวจสอบรายละเอียด', 'ยืนยันแล้ว', 'จองเรียบร้อย'];
  const showReview = () => {
    heading.textContent = labels[0];
    statusLabel.textContent = stateLabels[0];
    status.style.color = 'var(--bw-muted)';
    status.querySelector('svg')!.style.visibility = 'hidden';
  };
  showReview();
  review.hidden = false;
  confirm.hidden = false;
  const focusPanel = (index: number) => {
    const heading = panels[index].querySelector<HTMLElement>('h3')!;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    panels[index].scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'center' });
    if (!reduced.matches) panels[index].querySelector('.bw-mobile-story-visual')?.animate([{ opacity: .65, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  slots.forEach(slot => slot.addEventListener('click', () => {
    slots.forEach(button => button.setAttribute('aria-pressed', String(button === slot)));
    root.querySelectorAll('[data-demo-time]').forEach(value => { value.textContent = slot.dataset.demoSlot!; });
    confirm.disabled = false;
    showReview();
    if (actionLabel) actionLabel.textContent = labels[0] + ' ';
  }));
  review.addEventListener('click', () => focusPanel(1));
  confirm.addEventListener('click', () => {
    confirm.disabled = true;
    heading.textContent = stateLabels[2];
    statusLabel.textContent = stateLabels[1];
    status.style.color = '';
    status.querySelector('svg')!.style.visibility = '';
    if (actionLabel) actionLabel.textContent = labels[1] + ' ';
    focusPanel(2);
  });
}
