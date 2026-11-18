export function initMobileBookingDemo() {
  const root = document.querySelector<HTMLElement>('[data-booking-demo]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const stage = root.querySelector<HTMLElement>('.bw-mobile-story-stage')!;
  const spacers = [...root.querySelectorAll<HTMLElement>('[data-story-spacer]')];
  const visuals = [...root.querySelectorAll<HTMLElement>('[data-story-visual]')];
  const steps = [...root.querySelectorAll<HTMLElement>('[data-story-step]')];
  const slots = [...root.querySelectorAll<HTMLButtonElement>('[data-demo-slot]')];
  const review = root.querySelector<HTMLButtonElement>('[data-demo-review]')!;
  const confirm = root.querySelector<HTMLButtonElement>('[data-demo-confirm]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const language = document.documentElement.lang;
  const labels = language.startsWith('zh') ? ['确认预订', '商家已收到预订'] : language.startsWith('en') ? ['Confirm booking', 'Booking received by the business'] : ['ยืนยันการจอง', 'ร้านเห็นการจองแล้ว'];
  const stateLabels = language.startsWith('zh') ? ['查看预订详情', '已确认', '预订成功'] : language.startsWith('en') ? ['Review booking details', 'Confirmed', 'Booking confirmed'] : ['ตรวจสอบรายละเอียด', 'ยืนยันแล้ว', 'จองเรียบร้อย'];
  const actionLabel = confirm.firstChild;
  const status = root.querySelector<HTMLElement>('.bw-mobile-story-confirmed')!;
  const statusLabel = status.querySelector('strong')!;
  const statusIcon = status.querySelector<SVGElement>('svg');
  const heading = steps[1].querySelector('h3')!;
  const arrival = visuals[2]?.querySelector<HTMLElement>('.bw-mobile-story-customer');
  let active = -1;
  let timers: number[] = [];
  let userPicked = false;

  const later = (run: () => void, delay: number) => { timers.push(window.setTimeout(run, delay)); };
  const clearTimers = () => { timers.forEach(timer => window.clearTimeout(timer)); timers = []; };
  const setSlot = (slot: HTMLButtonElement | null) => {
    slots.forEach(button => button.setAttribute('aria-pressed', String(button === slot)));
    if (slot) root.querySelectorAll('[data-demo-time]').forEach(value => { value.textContent = slot.dataset.demoSlot!; });
  };
  const selected = () => slots.some(slot => slot.getAttribute('aria-pressed') === 'true');
  const showReview = () => {
    confirm.disabled = !selected();
    heading.textContent = labels[0];
    statusLabel.textContent = stateLabels[0];
    status.style.color = 'var(--bw-muted)';
    if (statusIcon) statusIcon.style.display = 'none';
    if (actionLabel) actionLabel.textContent = labels[0] + ' ';
  };
  const applyConfirm = () => {
    confirm.disabled = true;
    heading.textContent = stateLabels[2];
    statusLabel.textContent = stateLabels[1];
    status.style.color = '';
    if (statusIcon) statusIcon.style.display = '';
    if (actionLabel) actionLabel.textContent = labels[1] + ' ';
  };

  const play = (index: number) => {
    const motion = !reduced.matches;
    if (index === 0 && motion && !userPicked) {
      setSlot(null);
      later(() => setSlot(slots[0]), 650);
    }
    if (index === 1) {
      if (!selected()) setSlot(slots[0]);
      showReview();
      if (motion) later(applyConfirm, 1000);
      else applyConfirm();
    }
    if (index === 2) {
      if (!selected()) setSlot(slots[0]);
      applyConfirm();
      if (motion && arrival) arrival.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, delay: 200, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'backwards' });
    }
  };

  const activate = (index: number) => {
    if (index === active) return;
    clearTimers();
    active = index;
    visuals.forEach((visual, i) => {
      visual.classList.toggle('is-active', i === index);
      visual.toggleAttribute('inert', i !== index);
      visual.setAttribute('aria-hidden', String(i !== index));
    });
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.setAttribute('aria-hidden', String(i !== index));
    });
    play(index);
  };

  const goTo = (index: number) => {
    const travel = root.offsetHeight - stage.offsetHeight;
    const top = root.getBoundingClientRect().top + window.scrollY - stage.offsetTop;
    const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
    window.scrollTo({ top: top - stickTop + travel * (index + .15) / steps.length, behavior: reduced.matches ? 'instant' : 'smooth' });
  };

  slots.forEach(slot => slot.addEventListener('click', () => {
    userPicked = true;
    clearTimers();
    setSlot(slot);
    showReview();
  }));
  review.addEventListener('click', () => goTo(1));
  confirm.addEventListener('click', () => { applyConfirm(); goTo(2); });

  review.hidden = false;
  confirm.hidden = false;
  showReview();

  let frame = 0;
  const sync = () => {
    frame = 0;
    if (!root.offsetParent || !spacers.length) return;
    const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = Math.max(1, root.offsetHeight - stage.offsetHeight);
    const progress = Math.min(1, Math.max(0, (stickTop - root.getBoundingClientRect().top) / travel));
    const position = progress * steps.length;
    const index = Math.min(steps.length - 1, Math.floor(position));
    activate(index);
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(sync); };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  sync();
}
