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
  const days = [...root.querySelectorAll<HTMLButtonElement>('[data-demo-day]')];
  const arrival = visuals[3]?.querySelector<HTMLElement>('.bw-mobile-story-arrival');
  const profileRows = [...(visuals[4]?.querySelectorAll<HTMLElement>('.bw-mobile-story-row, .bw-mobile-story-history') ?? [])];
  let active = -1;
  let timers: number[] = [];
  let userPicked = false;

  const later = (run: () => void, delay: number) => { timers.push(window.setTimeout(run, delay)); };
  const clearTimers = () => { timers.forEach(timer => window.clearTimeout(timer)); timers = []; };
  const setSlot = (slot: HTMLButtonElement | null) => {
    slots.forEach(button => button.setAttribute('aria-pressed', String(button === slot)));
    if (slot) root.querySelectorAll('[data-demo-time]').forEach(value => { value.textContent = slot.dataset.demoSlot!; });
  };
  const setDay = (day: HTMLButtonElement | null) => { days.forEach(button => button.setAttribute('aria-pressed', String(button === day))); };
  const selected = () => slots.some(slot => slot.getAttribute('aria-pressed') === 'true');
  const showReview = () => {
    confirm.disabled = !selected();
    statusLabel.textContent = stateLabels[0];
    status.style.color = 'var(--bw-muted)';
    if (statusIcon) statusIcon.style.display = 'none';
    if (actionLabel) actionLabel.textContent = labels[0] + ' ';
  };
  const applyConfirm = () => {
    confirm.disabled = true;
    statusLabel.textContent = stateLabels[1];
    status.style.color = '';
    if (statusIcon) statusIcon.style.display = '';
    if (actionLabel) actionLabel.textContent = labels[1] + ' ';
  };

  const play = (index: number) => {
    const motion = !reduced.matches;
    if (index === 0 && motion) {
      setDay(null);
      later(() => setDay(days[3] ?? null), 650);
    }
    if (index === 1 && motion && !userPicked) {
      setSlot(null);
      later(() => setSlot(slots[0]), 650);
    }
    if (index === 2) {
      if (!selected()) setSlot(slots[0]);
      showReview();
      if (motion) later(applyConfirm, 1000);
      else applyConfirm();
    }
    if (index >= 3) {
      if (!selected()) setSlot(slots[0]);
      applyConfirm();
    }
    if (index === 4 && motion) profileRows.forEach((row, i) => row.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, delay: 150 + i * 120, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'backwards' }));
    if (index === 3) {
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
  review.addEventListener('click', () => goTo(2));
  confirm.addEventListener('click', () => { applyConfirm(); goTo(3); });
  days.forEach(day => day.addEventListener('click', () => { setDay(day); goTo(1); }));

  review.hidden = false;
  confirm.hidden = false;
  showReview();

  const fade = .2;
  const ease = (value: number) => value * value * (3 - 2 * value);
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const scrub = (position: number) => {
    const last = steps.length - 1;
    const pinned = Math.min(position, last + .5);
    visuals.forEach((visual, i) => {
      const local = pinned - i;
      const enter = i === 0 ? 1 : ease(clamp(local / fade));
      const leave = i === last ? 1 : ease(clamp((1 - local) / fade));
      const amount = reduced.matches ? Number(i === Math.min(last, Math.floor(position))) : Math.min(enter, leave);
      const shift = reduced.matches ? 0 : (local < .5 ? (1 - enter) * 24 : -(1 - leave) * 24);
      const scale = reduced.matches ? 1 : .985 + amount * .015;
      visual.style.opacity = amount.toFixed(3);
      visual.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      visual.style.visibility = amount < .01 ? 'hidden' : 'visible';
      const step = steps[i];
      if (step) {
        step.style.opacity = amount.toFixed(3);
        step.style.transform = `translate3d(0, ${(shift * .6).toFixed(1)}px, 0)`;
        step.style.visibility = amount < .01 ? 'hidden' : 'visible';
      }
    });
  };

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
    scrub(position);
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(sync); };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  sync();
}
