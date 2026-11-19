export function initProductStories() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll<HTMLElement>('[data-proof-story]').forEach(root => {
    if (root.dataset.proofReady) return;
    root.dataset.proofReady = 'true';
    const stage = root.querySelector<HTMLElement>('.proof-stage');
    const controls = root.querySelector<HTMLElement>('.proof-playback');
    const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-proof-step]')];
    if (!stage || !controls) return;
    let visible = false;
    let phase = 0;
    let engaged = false;
    let started = false;
    let chosen = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      clearTimeout(timer);
      timer = undefined;
    };
    const render = () => {
      root.dataset.phase = String(phase);
      root.dataset.proofMotion = preference.matches ? 'reduced' : 'enabled';
      steps.forEach((step, index) => step.setAttribute('aria-pressed', String(index === phase)));
    };
    const schedule = () => {
      clear();
      if (!visible || engaged || chosen || preference.matches || document.hidden) return;
      timer = setTimeout(() => {
        phase = (phase + 1) % 3;
        render();
        schedule();
      }, phase === 2 ? 9000 : 5000);
    };
    steps.forEach((step, index) => step.addEventListener('click', () => {
      phase = index;
      started = true;
      chosen = true;
      render();
      schedule();
    }));
    stage.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse') return;
      engaged = true;
      schedule();
    });
    stage.addEventListener('pointerleave', () => {
      engaged = stage.contains(document.activeElement);
      schedule();
    });
    root.addEventListener('focusin', event => {
      engaged = stage.contains(event.target as Node);
      schedule();
    });
    root.addEventListener('focusout', event => {
      engaged = stage.contains(event.relatedTarget as Node) || stage.matches(':hover');
      schedule();
    });
    const observer = new IntersectionObserver(entries => {
      const nextVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
      if (visible === nextVisible) return;
      visible = nextVisible;
      if (visible && !started && !preference.matches) {
        started = true;
        phase = 0;
        render();
      }
      schedule();
    }, {threshold: [0, .25], rootMargin: '-10% 0px -10% 0px'});
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
