import { snow } from './snow';

type Copy = { summary: (days: number) => string; christmas: string; newYear: string };

const copy: Record<'th' | 'en' | 'zh', Copy> = {
  th: { summary: days => `อีก ${days} วันถึงคริสต์มาส`, christmas: 'สุขสันต์วันคริสต์มาส', newYear: 'สวัสดีปีใหม่' },
  en: { summary: days => (days === 1 ? '1 day until Christmas' : `${days} days until Christmas`), christmas: 'Merry Christmas', newYear: 'Happy New Year' },
  zh: { summary: days => `距离圣诞节还有 ${days} 天`, christmas: '圣诞快乐', newYear: '新年快乐' },
};

const pad = (value: number) => String(value).padStart(2, '0');

const reduced = matchMedia('(prefers-reduced-motion: reduce)');

const language = () => {
  const lang = document.documentElement.lang;
  return lang.startsWith('zh') ? 'zh' : lang.startsWith('en') ? 'en' : 'th';
};

const christmasAt = () => new Date(new Date().getFullYear(), 11, 25).getTime();

const remaining = () => {
  const total = Math.max(0, Math.floor((christmasAt() - Date.now()) / 1000));
  return { total, days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
};

const roll = (digit: HTMLElement, value: string, animate: boolean) => {
  const current = digit.lastElementChild as HTMLElement | null;
  if (current?.textContent === value) return false;
  const next = document.createElement('span');
  next.textContent = value;
  if (!current || !animate || reduced.matches) {
    digit.replaceChildren(next);
    return true;
  }
  next.className = 'is-entering';
  digit.append(next);
  const timing = { duration: 380, easing: 'cubic-bezier(.65,0,.35,1)' };
  current.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(100%)', opacity: .3 }], timing).finished.then(() => current.remove());
  next.animate([{ transform: 'translateY(-100%)', opacity: .3 }, { transform: 'translateY(0)', opacity: 1 }], timing).finished.then(() => next.classList.remove('is-entering'));
  return true;
};

const sparkle = (host: HTMLElement, from: HTMLElement) => {
  if (reduced.matches) return;
  const hostBox = host.getBoundingClientRect();
  const box = from.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const star = document.createElement('i');
    star.className = 'bwx-cd-spark';
    star.style.left = `${box.left - hostBox.left + box.width / 2}px`;
    star.style.top = `${box.top - hostBox.top + box.height / 2}px`;
    host.append(star);
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * .5;
    const distance = 18 + Math.random() * 16;
    star.animate([
      { transform: 'translate(-50%, -50%) scale(.5) rotate(0deg)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(90deg)`, opacity: 0 },
    ], { duration: 800, easing: 'cubic-bezier(.2,.7,.3,1)' }).finished.then(() => star.remove());
  }
};


const countUp = (element: HTMLElement, total: number) => {
  if (reduced.matches) {
    element.textContent = String(total);
    return;
  }
  element.textContent = '0';
  const run = () => {
    const begin = performance.now();
    const step = (time: number) => {
      const progress = Math.min(1, (time - begin) / 1600);
      element.textContent = String(Math.round(total * (1 - (1 - progress) ** 3)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    window.setTimeout(run, 300);
  }, { threshold: .5 });
  observer.observe(element);
};

const setupGreeting = () => {
  const root = document.documentElement;
  const greeting = document.querySelector<HTMLElement>('.bwx-season-greeting[data-season-greeting=christmas]');
  const label = greeting?.querySelector<HTMLElement>('.bwx-season-text');
  if (!greeting || !label) return;
  const text = copy[language()];
  if (new Date().getMonth() === 0) label.textContent = text.newYear;
  const board = greeting.querySelector<HTMLElement>('.bwx-cd');
  const row = board?.querySelector<HTMLElement>('.bwx-cd-row');
  const days = board?.querySelector<HTMLElement>('[data-cd=days]');
  const minutes = board?.querySelector<HTMLElement>('[data-cd=minutes]');
  const summary = greeting.querySelector<HTMLElement>('.bwx-cd-summary');
  if (root.dataset.seasonPhase !== 'countdown' || !board || !row || !days || !minutes) return;
  const digits = (['hours', 'minutes', 'seconds'] as const).flatMap(part => [...board.querySelectorAll<HTMLElement>(`[data-cd=${part}] [data-digit]`)]);
  const finish = () => {
    delete root.dataset.seasonPhase;
    label.textContent = text.christmas;
  };
  const left = remaining();
  if (left.total === 0) {
    finish();
    return;
  }
  if (summary) summary.textContent = text.summary(Math.ceil(left.total / 86400));
  days.style.minWidth = `${String(left.days).length}ch`;
  let first = true;
  const render = () => {
    const now = remaining();
    if (now.total === 0) {
      finish();
      return false;
    }
    const changed = [...`${pad(now.hours)}${pad(now.minutes)}${pad(now.seconds)}`].map((value, index) => roll(digits[index], value, !first));
    if (!first && changed[3]) sparkle(row, minutes);
    first = false;
    return true;
  };
  render();
  countUp(days, left.days);
  board.classList.add('is-live');
  window.setTimeout(() => burstAt(row), 900);
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(() => { if (render()) schedule(); }, 1000 - (Date.now() % 1000) + 5);
  };
  schedule();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    window.clearTimeout(timer);
    if (render()) schedule();
  });
};

const pageSnow = () => {
  if (!matchMedia('(min-width: 901px) and (hover: hover)').matches) return;
  const hero = document.querySelector<HTMLElement>('#top');
  const busy = [...document.querySelectorAll<HTMLElement>('#clients .bwx-map-frame, #contact')];
  const covered = () => busy.some(element => {
    const box = element.getBoundingClientRect();
    return box.top < window.innerHeight * .75 && box.bottom > window.innerHeight * .25;
  });
  const layer = document.createElement('div');
  layer.className = 'bwx-page-snow';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  snow(layer, { color: '#93acdc', density: 24000, className: 'bwx-snow-page', strength: .6 });
  let queued = 0;
  const sync = () => {
    queued = 0;
    layer.classList.toggle('is-visible', (hero?.getBoundingClientRect().bottom ?? 0) < window.innerHeight * .35 && !covered());
  };
  window.addEventListener('scroll', () => { if (!queued) queued = requestAnimationFrame(sync); }, { passive: true });
  sync();
};

const bandStars = () => {
  const band = document.querySelector<HTMLElement>('#contact');
  if (!band) return;
  [[52, 12], [64, 6], [79, 11], [94, 20], [96, 56], [90, 88], [70, 94], [47, 89]].forEach(([x, y], index) => {
    const star = document.createElement('span');
    star.className = 'bwx-band-star';
    star.setAttribute('aria-hidden', 'true');
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--i', String(index));
    star.style.setProperty('--size', `${6 + (index % 3) * 2}px`);
    band.append(star);
  });
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    band.classList.add('bwx-stars-on');
  }, { threshold: .3 });
  observer.observe(band);
};

const shakeButtons = () => {
  if (reduced.matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('#bookingwhale .bw-start-button').forEach(button => {
    let resting = 0;
    button.addEventListener('pointerenter', () => {
      const now = performance.now();
      if (now - resting < 1200) return;
      resting = now;
      const width = button.offsetWidth;
      for (let i = 0; i < 6; i++) {
        const flake = document.createElement('span');
        flake.className = 'bwx-button-flake';
        flake.setAttribute('aria-hidden', 'true');
        flake.style.left = `${16 + Math.random() * (width - 32)}px`;
        button.append(flake);
        flake.animate([
          { transform: 'translate(0, 0)', opacity: 1 },
          { transform: `translate(${(Math.random() - .5) * 18}px, ${36 + Math.random() * 22}px)`, opacity: 0 },
        ], { duration: 750 + Math.random() * 350, delay: i * 45, easing: 'cubic-bezier(.4,0,.8,.6)', fill: 'backwards' }).finished.then(() => flake.remove());
      }
    });
  });
};

type CapStyle = { from: number; to: number; peak: number; height: number; drips: Array<[number, number]> };

const capStyles: CapStyle[] = [
  { from: 0, to: 1, peak: .5, height: 4, drips: [[.3, 2.5], [.7, 3.5]] },
  { from: 0, to: .74, peak: .3, height: 6, drips: [[.2, 4], [.6, 2.5]] },
  { from: .28, to: 1, peak: .7, height: 5, drips: [[.5, 2.5], [.82, 4.5]] },
];

const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const capPath = (width: number, height: number, style: CapStyle, seed: number) => {
  const next = random(seed);
  const phases = [next() * 6.28, next() * 6.28, next() * 6.28];
  const radius = height / 2;
  const edge = (x: number) => {
    const inset = Math.min(x, width - x);
    return inset >= radius ? 0 : radius - Math.sqrt(Math.max(0, radius * radius - (radius - inset) ** 2));
  };
  const usable = [radius * .5, width - radius * .5];
  const start = usable[0] + (usable[1] - usable[0]) * style.from;
  const end = usable[0] + (usable[1] - usable[0]) * style.to;
  const count = Math.max(12, Math.round((end - start) / 3));
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = start + (end - start) * t;
    const taper = Math.sin(Math.PI * t) ** .55;
    const mound = .55 + .45 * Math.exp(-(((t - style.peak) / .3) ** 2));
    const lumps = 1 + .16 * Math.sin(t * 9 + phases[0]) + .1 * Math.sin(t * 17 + phases[1]);
    const drip = style.drips.reduce((sum, [at, length]) => sum + length * 1.5 * Math.max(0, 1 - Math.abs((t - at) * (end - start)) / 3.2) ** 1.6, 0);
    const hang = taper * (2.6 + 1.1 * Math.sin(t * 13 + phases[2])) + drip;
    top.push(`${x.toFixed(1)} ${(edge(x) - taper * mound * lumps * style.height).toFixed(1)}`);
    bottom.push(`${x.toFixed(1)} ${(edge(x) + hang).toFixed(1)}`);
  }
  return `M${top.join(' L')} L${bottom.reverse().join(' L')} Z`;
};

const roundCapPath = (size: number) => {
  const r = size / 2;
  const span = .95;
  const steps = 48;
  const drips: Array<[number, number]> = [[-.38, 2.6], [.42, 3.4]];
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = -span + 2 * span * t;
    const taper = Math.sin(Math.PI * t) ** .6;
    const lumps = 1 + .1 * Math.sin(t * 7 + .8);
    const crest = taper * (2.2 + 1.2 * Math.exp(-(((angle + .2) / .5) ** 2))) * lumps;
    const drip = drips.reduce((sum, [at, length]) => sum + length * Math.max(0, 1 - ((angle - at) / .17) ** 2) ** 1.4, 0);
    const hang = taper * (1.8 + .3 * Math.sin(t * 6 + 1.3)) + drip;
    const point = (radius: number) => `${(r + radius * Math.sin(angle)).toFixed(2)} ${(r - radius * Math.cos(angle)).toFixed(2)}`;
    outer.push(point(r + crest));
    inner.push(point(r - hang));
  }
  return `M${outer.join(' L')} L${inner.reverse().join(' L')} Z`;
};

const snowCaps = () => {
  const round = document.getElementById('bw-back-to-top');
  if (round) {
    const cap = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    cap.classList.add('bwx-button-snow');
    cap.setAttribute('aria-hidden', 'true');
    round.append(cap);
    const draw = () => {
      const size = round.offsetWidth;
      if (!size) return;
      const d = roundCapPath(size);
      cap.setAttribute('viewBox', `-6 -8 ${size + 12} ${size + 16}`);
      cap.style.cssText = `top:-8px;left:-6px;width:${size + 12}px;height:${size + 16}px`;
      cap.innerHTML = `<path d="${d}" transform="translate(0 1.4)" fill="rgba(3, 32, 140, .35)"/><path d="${d}" fill="#fff" stroke="#dbe6f5" stroke-width=".8" stroke-linejoin="round"/>`;
    };
    draw();
    new ResizeObserver(draw).observe(round);
  }
  [...document.querySelectorAll<HTMLElement>('#bookingwhale .bw-start-button')].forEach((button, index) => {
    const style = capStyles[index % capStyles.length];
    const cap = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    cap.classList.add('bwx-button-snow');
    cap.setAttribute('aria-hidden', 'true');
    button.append(cap);
    const draw = () => {
      const width = button.offsetWidth;
      const height = button.offsetHeight;
      if (!width || !height) return;
      const lift = style.height * 1.3 + 8;
      const d = capPath(width, height, style, 97 + index * 31);
      cap.setAttribute('viewBox', `0 ${-lift} ${width} ${lift + 18}`);
      cap.style.top = `${-lift}px`;
      cap.style.width = `${width}px`;
      cap.style.height = `${lift + 18}px`;
      const sx = width * (.18 + style.peak * .64);
      const sy = -style.height - 1;
      const light = /^rgba?\(2[2-5]\d, 2[2-5]\d, 2[2-5]\d/.test(getComputedStyle(button).backgroundColor);
      cap.style.display = light ? 'none' : '';
      const shade = 'rgba(3, 32, 140, .38)';
      cap.innerHTML = `<path d="${d}" transform="translate(0 1.6)" fill="${shade}"/><path d="${d}" fill="#fff" stroke="#dbe6f5" stroke-width=".8" stroke-linejoin="round"/><path class="bwx-button-spark" d="M${sx} ${sy - 4}l1.1 2.9 2.9 1.1-2.9 1.1-1.1 2.9-1.1-2.9-2.9-1.1 2.9-1.1z" fill="#9cc8f2"/>`;
    };
    draw();
    new ResizeObserver(draw).observe(button);
  });
};

const burstTimes = new WeakMap<Element, number>();

const burstAt = (element: Element) => {
  if (reduced.matches) return;
  const stamp = performance.now();
  if (stamp - (burstTimes.get(element) ?? -1e9) < 4000) return;
  burstTimes.set(element, stamp);
  const box = element.getBoundingClientRect();
  if (!box.width || box.bottom < 0 || box.top > window.innerHeight) return;
  for (let i = 0; i < 10; i++) {
    const star = document.createElement('i');
    star.className = 'bwx-burst';
    star.setAttribute('aria-hidden', 'true');
    star.style.left = `${box.left + box.width / 2}px`;
    star.style.top = `${box.top + box.height / 2}px`;
    document.body.append(star);
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * .4;
    const distance = Math.max(box.width, box.height) / 2 + 14 + Math.random() * 22;
    star.animate([
      { transform: 'translate(-50%, -50%) scale(.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(90deg)`, opacity: 0 },
    ], { duration: 900, easing: 'cubic-bezier(.2,.7,.3,1)' }).finished.then(() => star.remove());
  }
};

const storySparkle = () => {
  const watch = (element: Element | null | undefined, attribute: string, active: () => boolean, target: () => Element | null) => {
    if (!element) return;
    let was = active();
    new MutationObserver(() => {
      const now = active();
      const hit = target();
      if (now && !was && hit) burstAt(hit);
      was = now;
    }).observe(element, { attributes: true, attributeFilter: [attribute] });
  };
  const step = document.querySelectorAll('.bw-flow-steps button')[2];
  watch(step, 'aria-pressed', () => step?.getAttribute('aria-pressed') === 'true', () => document.querySelector('.bw-flow-ticket'));
  const arrive = document.querySelectorAll('.bw-flow-steps button')[3];
  watch(arrive, 'aria-pressed', () => arrive?.getAttribute('aria-pressed') === 'true', () => document.querySelector('.bw-flow-merchant .bw-ui-arriving-group .bw-ui-arriving-row'));
  const drift = (heading: HTMLElement | null | undefined) => {
    if (!heading || reduced.matches || heading.offsetWidth < 40) return;
    const now = performance.now();
    if (now - Number(heading.dataset.drifted ?? 0) < 4000) return;
    heading.dataset.drifted = String(now);
    heading.classList.add('bwx-sweep-host');
    [0, 1, 2].forEach(index => {
      const flake = document.createElement('span');
      flake.className = 'bwx-sweep';
      flake.setAttribute('aria-hidden', 'true');
      flake.textContent = '❄';
      flake.style.top = `${8 + index * 30}%`;
      flake.style.fontSize = `${11 + index * 4}px`;
      heading.append(flake);
      flake.animate([
        { transform: 'translate(-16px, 0) rotate(0deg)', opacity: 0 },
        { opacity: .9, offset: .3 },
        { transform: `translate(${Math.min(heading.offsetWidth, 320)}px, ${index * 6 - 6}px) rotate(200deg)`, opacity: 0 },
      ], { duration: 1100 + index * 180, delay: 200 + index * 100, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'both' }).finished.then(() => flake.remove());
    });
  };
  const chapters = [...document.querySelectorAll<HTMLElement>('#features .bw-flow-chapter h3')];
  document.querySelectorAll('.bw-flow-steps button').forEach((button, index) => {
    watch(button, 'aria-pressed', () => button.getAttribute('aria-pressed') === 'true', () => { drift(chapters[index]); return null; });
  });
  document.querySelectorAll<HTMLElement>('.bw-mobile-story-step').forEach(item => {
    watch(item, 'class', () => item.classList.contains('is-active'), () => { drift(item.querySelector<HTMLElement>('h3')); return null; });
  });
  const mobile = document.querySelector('.bw-mobile-story-visual[data-story-visual="2"]');
  watch(mobile, 'class', () => Boolean(mobile?.classList.contains('is-active')), () => document.querySelector('.bw-mobile-story-confirmed'));
};

const fairyLights = () => {
  const nav = document.querySelector<HTMLElement>('#bookingwhale .bw-nav');
  if (!nav || !matchMedia('(min-width: 901px)').matches) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('bwx-lights');
  svg.setAttribute('aria-hidden', 'true');
  nav.append(svg);
  const colors = ['#d62839', '#e0b04a', '#2f8f5b', '#5aa9e6'];
  const draw = () => {
    const width = nav.offsetWidth - 56;
    if (width <= 0) return;
    const swags = Math.max(4, Math.round(width / 110));
    const span = width / swags;
    let wire = 'M0 2';
    let bulbs = '';
    for (let i = 0; i < swags; i++) {
      const x = i * span;
      wire += ` Q${(x + span / 2).toFixed(1)} 13 ${(x + span).toFixed(1)} 2`;
      [.25, .5, .75].forEach((t, index) => {
        const bx = x + span * t;
        const by = 2 + 11 * 2 * t * (1 - t);
        const n = i * 3 + index;
        bulbs += `<rect x="${(bx - 1.2).toFixed(1)}" y="${(by - .5).toFixed(1)}" width="2.4" height="2.4" rx=".6" fill="#8a94a6"/><ellipse class="bwx-light bwx-light-${n % 4}" cx="${bx.toFixed(1)}" cy="${(by + 5).toFixed(1)}" rx="2.6" ry="3.6" fill="${colors[n % colors.length]}"/>`;
      });
    }
    svg.setAttribute('viewBox', `0 0 ${width} 24`);
    svg.style.width = `${width}px`;
    svg.innerHTML = `<path d="${wire}" fill="none" stroke="#8a94a6" stroke-width="1"/>${bulbs}`;
  };
  draw();
  new ResizeObserver(draw).observe(nav);
  if (reduced.matches) return;
  let phase = 0;
  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    phase = (phase + 1) % 4;
    svg.dataset.phase = String(phase);
  }, 650);
};

const restOffscreen = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('bwx-resting', !entry.isIntersecting));
  }, { rootMargin: '80px 0px' });
  document.querySelectorAll('#main-content > *, #main-content .bw-business, #main-content #top, footer.bw-footer').forEach(section => observer.observe(section));
};

const headingSweep = () => {
  if (reduced.matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const heading = entry.target as HTMLElement;
      const width = heading.offsetWidth;
      if (width < 40) continue;
      heading.classList.add('bwx-sweep-host');
      [0, 1, 2].forEach(index => {
        const flake = document.createElement('span');
        flake.className = 'bwx-sweep';
        flake.setAttribute('aria-hidden', 'true');
        flake.textContent = '❄';
        flake.style.top = `${10 + index * 28}%`;
        flake.style.fontSize = `${12 + index * 4}px`;
        heading.append(flake);
        const reach = Math.min(width, 420);
        flake.animate([
          { transform: 'translate(-20px, 0) rotate(0deg)', opacity: 0 },
          { opacity: .9, offset: .25 },
          { transform: `translate(${reach}px, ${index * 6 - 6}px) rotate(220deg)`, opacity: 0 },
        ], { duration: 1300 + index * 200, delay: 250 + index * 120, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'both' }).finished.then(() => flake.remove());
      });
    }
  }, { threshold: .6 });
  document.querySelectorAll<HTMLElement>('#main-content :is(#business, #clients, #how, #faq, #contact) h2').forEach(heading => observer.observe(heading));
};

export function start() {
  fairyLights();
  shakeButtons();
  snowCaps();
  if (!document.querySelector('.bw-hero-live')) return;
  setupGreeting();
  restOffscreen();
  headingSweep();
  storySparkle();
  const map = document.querySelector<HTMLElement>('#clients .bwx-map');
  if (map) snow(map, { color: '#8fb0e4', density: 8000, className: 'bwx-snow-map', avoid: () => [...map.querySelectorAll('.bwx-pin-name, .bwx-pin-logo')] });
  pageSnow();
  bandStars();
  const main = document.querySelector<HTMLElement>('#main-content');
  const hero = document.querySelector<HTMLElement>('.bw-hero-live');
  if (main && hero) snow(main, { color: '#8ea8dc', density: 7000, className: 'bwx-snow-top', watch: [hero], height: () => hero.getBoundingClientRect().bottom - main.getBoundingClientRect().top, avoid: () => [...document.querySelectorAll('.bwx-intro-title, .bwx-season-greeting, #top .bw-hero-copy :is(h1, .bw-lead, .bw-hero-description, .bw-actions)')] });
  const contact = document.querySelector<HTMLElement>('#contact');
  if (contact) snow(contact, { color: '#ffffff', density: 4500, className: 'bwx-snow-contact', avoid: () => [...contact.querySelectorAll('.bw-contact-copy > *')] });
}
