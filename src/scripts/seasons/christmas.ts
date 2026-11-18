import { snow } from './snow';

export function start() {
  const main = document.querySelector<HTMLElement>('#main-content');
  const hero = document.querySelector<HTMLElement>('#top');
  if (main && hero) snow(main, { color: '#9fb4d6', density: 9000, className: 'bwx-snow-top', height: () => hero.getBoundingClientRect().bottom - main.getBoundingClientRect().top });
  const contact = document.querySelector<HTMLElement>('#contact');
  if (contact) snow(contact, { color: '#ffffff', density: 5000, className: 'bwx-snow-contact' });
}
