export {};

const navigation = document.querySelector<HTMLElement>('.bw-nav');

if (navigation) {
  let anchor = window.scrollY;
  let frame = 0;
  const show = () => {
    navigation.classList.remove('bw-nav-hidden');
    anchor = Math.max(0, window.scrollY);
  };
  const sync = () => {
    frame = 0;
    const position = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    const locked = navigation.classList.contains('bw-menu-open') || navigation.querySelector('details[open], :focus-visible');
    if (position < 96 || locked) {
      show();
      return;
    }
    const delta = position - anchor;
    if (Math.abs(delta) < 12) return;
    navigation.classList.toggle('bw-nav-hidden', delta > 0);
    anchor = position;
  };
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(sync);
  }, { passive: true });
  window.addEventListener('resize', show, { passive: true });
  window.addEventListener('pageshow', show);
  navigation.addEventListener('focusin', show);
  navigation.querySelectorAll('details').forEach(details => details.addEventListener('toggle', show));
  navigation.querySelector('#bw-menu-toggle')?.addEventListener('click', show);
  show();
}
