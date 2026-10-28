const nav = document.querySelector('.bw-editorial-page .bw-nav');
if (nav) {
  const toggle = nav.querySelector('#bw-menu-toggle');
  const menu = nav.querySelector('.bw-main-menu');
  const language = nav.querySelector('.bw-language');
  const mobile = matchMedia('(max-width: 900px)');
  const setOpen = open => {
    const expanded = mobile.matches && open;
    nav.classList.toggle('bw-menu-open', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    menu.inert = mobile.matches && !expanded;
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  mobile.addEventListener('change', () => setOpen(false));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('pointerdown', event => {
    if (!nav.contains(event.target)) setOpen(false);
    if (!language.contains(event.target)) language.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (language.open) {
      language.open = false;
      language.querySelector('summary').focus({preventScroll:true});
    } else if (toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus({preventScroll:true});
    }
  });
}
