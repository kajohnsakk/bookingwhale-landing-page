import { scrollToPosition } from './smooth-scroll';

const backToTop = document.getElementById('bw-back-to-top');
if (backToTop) {
  let frame = 0;
  const update = () => {
    frame = 0;
    backToTop.toggleAttribute('data-visible', window.scrollY >= window.innerHeight);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('pageshow', schedule);
  backToTop.addEventListener('click', () => {
    document.querySelector('.bw-nav .bw-brand')?.focus({preventScroll: true});
    scrollToPosition({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  update();
}
