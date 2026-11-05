export function setupHeroCustomerCount(root, gsap) {
  const element = root.querySelector('[data-customer-count]');
  if (!element) return () => {};
  const total = Number(element.dataset.customerCount);
  const formatter = new Intl.NumberFormat('en-US');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let completed = false;
  let tween;
  let observer;
  const finish = () => {
    completed = true;
    tween?.kill();
    element.textContent = formatter.format(total);
    observer?.disconnect();
    document.removeEventListener('visibilitychange', sync);
    reduce.removeEventListener('change', sync);
  };
  const sync = () => {
    if (completed) return;
    if (reduce.matches) {
      finish();
      return;
    }
    if (!visible || document.hidden) {
      tween?.pause();
      return;
    }
    if (tween) {
      tween.play();
      return;
    }
    const counter = { value: 0 };
    element.textContent = '0';
    tween = gsap.to(counter, {
      value: total,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => { element.textContent = formatter.format(Math.round(counter.value)); },
      onComplete: finish,
    });
  };
  if (reduce.matches) {
    finish();
    return () => {};
  }
  observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0.5 });
  observer.observe(element);
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener('change', sync);
  return finish;
}
