import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let scroller = null;

export const scrollToPosition = ({top, behavior = 'instant'}) => {
  if (scroller) {
    scroller.scrollTo(top, {immediate: behavior !== 'smooth', force: true});
  } else {
    window.scrollTo({top, behavior});
  }
};

export const setupSmoothScrolling = (gsap, ScrollTrigger) => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('contact-dialog');
  const tick = time => scroller?.raf(time * 1000);
  const resize = () => scroller?.resize();
  const reset = () => scroller?.scrollTo(window.scrollY, {immediate: true, force: true});
  const pause = () => scroller?.stop();
  const resume = () => {
    scroller?.start();
    resize();
  };
  const dispose = () => {
    gsap.ticker.remove(tick);
    scroller?.destroy();
    scroller = null;
  };
  const configure = () => {
    dispose();
    if (reduced.matches) return;
    scroller = new Lenis({
      lerp: .1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      prevent: node => node.matches('dialog,.bw-main-menu,.bw-language-options,[data-lenis-prevent]')
    });
    scroller.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    if (dialog?.open) pause();
  };
  const onKey = event => {
    if (event.defaultPrevented) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key) && !event.target.closest('input,textarea,select,[contenteditable="true"]')) reset();
  };
  const onPageShow = () => {
    resize();
    reset();
  };
  reduced.addEventListener('change', configure);
  dialog?.addEventListener('bw:contact-open', pause);
  dialog?.addEventListener('close', resume);
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', reset, {passive: true});
  window.addEventListener('pageshow', onPageShow);
  ScrollTrigger.addEventListener('refresh', resize);
  configure();
  return () => {
    dispose();
    reduced.removeEventListener('change', configure);
    dialog?.removeEventListener('bw:contact-open', pause);
    dialog?.removeEventListener('close', resume);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', reset);
    window.removeEventListener('pageshow', onPageShow);
    ScrollTrigger.removeEventListener('refresh', resize);
  };
};
