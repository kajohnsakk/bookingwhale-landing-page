export function initProductStories() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll<HTMLElement>('[data-proof-story]').forEach(root => {
    if (root.dataset.proofReady) return;
    root.dataset.proofReady = 'true';
    const stage = root.querySelector<HTMLElement>('.proof-stage');
    const controls = root.querySelector<HTMLElement>('.proof-playback');
    const toggle = root.querySelector<HTMLButtonElement>('.proof-play-toggle');
    const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-proof-step]')];
    if (!stage || !controls || !toggle) return;
    let visible = false;
    let paused = false;
    let phase = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      clearTimeout(timer);
      timer = undefined;
    };
    const render = () => {
      root.dataset.phase = String(phase);
      root.dataset.proofMotion = preference.matches ? 'reduced' : 'enabled';
      toggle.dataset.paused = String(paused || preference.matches);
      toggle.setAttribute('aria-label', (paused || preference.matches ? toggle.dataset.playLabel : toggle.dataset.pauseLabel) || '');
      toggle.hidden = preference.matches;
      steps.forEach((step, index) => step.setAttribute('aria-pressed', String(index === phase)));
    };
    const schedule = () => {
      clear();
      if (!visible || paused || preference.matches || document.hidden) return;
      timer = setTimeout(() => {
        phase = (phase + 1) % 3;
        render();
        schedule();
      }, phase === 2 ? 4600 : 2600);
    };
    steps.forEach((step, index) => step.addEventListener('click', () => {
      phase = index;
      paused = true;
      render();
      schedule();
    }));
    toggle.addEventListener('click', () => {
      paused = !paused;
      render();
      schedule();
    });
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      schedule();
    }, {threshold: 0, rootMargin: '-15% 0px -15% 0px'});
    observer.observe(stage);
    preference.addEventListener('change', () => {
      if (preference.matches) phase = 2;
      render();
      schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('pagehide', clear);
    window.addEventListener('pageshow', schedule);
    if (preference.matches) phase = 2;
    controls.hidden = false;
    render();
  });
}
