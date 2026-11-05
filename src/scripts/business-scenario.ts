const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
for (const section of document.querySelectorAll<HTMLElement>('[data-business-scenario]')) {
  const choices = [...section.querySelectorAll<HTMLButtonElement>('[data-scenario-choice]')];
  const panels = [...section.querySelectorAll<HTMLElement>('[data-scenario-panel]')];
  const container = section.querySelector<HTMLElement>('.scenario-panels');
  if (!container || !panels.length) continue;
  let active = 0;
  let animation: Animation | undefined;
  let frame = 0;
  let width = 0;
  const sizePanels = () => {
    container.style.removeProperty('--scenario-panel-height');
    const panelWidth = container.clientWidth;
    let height = 0;
    panels.forEach(panel => {
      const hidden = panel.hidden;
      const previous = panel.style.cssText;
      panel.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${panelWidth}px;`;
      panel.hidden = false;
      height = Math.max(height, panel.getBoundingClientRect().height);
      panel.hidden = hidden;
      panel.style.cssText = previous;
    });
    container.style.setProperty('--scenario-panel-height', `${Math.ceil(height)}px`);
  };
  choices.forEach((button,i) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      if (i === active) return;
      animation?.cancel();
      active = i;
      choices.forEach((choice,j) => choice.setAttribute('aria-pressed', String(j === i)));
      panels.forEach((panel,j) => panel.hidden = j !== i);
      if (!reducedMotion.matches) animation = panels[i].animate([{opacity:.5,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});
    });
  });
  new ResizeObserver(entries => {
    const nextWidth = entries[0].contentRect.width;
    if (nextWidth === width) return;
    width = nextWidth;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sizePanels);
  }).observe(container);
  reducedMotion.addEventListener('change', () => animation?.cancel());
  document.addEventListener('visibilitychange', () => { if (document.hidden) animation?.cancel(); });
  document.fonts.ready.then(sizePanels);
  sizePanels();
}
export {};
