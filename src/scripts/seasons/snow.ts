type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; alpha: number; near: boolean; crystal: boolean; spin: number; turn: number };

type SnowOptions = {
  color: string;
  density: number;
  className: string;
  height?: () => number;
  watch?: HTMLElement[];
  avoid?: () => Element[];
  strength?: number;
};

const reduced = matchMedia('(prefers-reduced-motion: reduce)');

export function snow(host: HTMLElement, options: SnowOptions) {
  const canvas = document.createElement('canvas');
  canvas.className = `bwx-snow ${options.className}`;
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const context = canvas.getContext('2d');
  if (!context) return;
  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];
  let quiet: DOMRect[] = [];
  let frame = 0;
  let visible = false;
  let last = 0;
  let scrolled = window.scrollY;
  let drift = 0;

  const make = (anywhere: boolean): Flake => {
    const near = Math.random() < .3;
    const crystal = near && Math.random() < .25;
    return {
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -10,
      r: crystal ? 4 + Math.random() * 2 : near ? 2 + Math.random() * 1.4 : .8 + Math.random(),
      vy: near ? 30 + Math.random() * 20 : 12 + Math.random() * 12,
      drift: near ? 14 + Math.random() * 12 : 6 + Math.random() * 8,
      phase: Math.random() * Math.PI * 2,
      alpha: near ? .55 + Math.random() * .3 : .25 + Math.random() * .25,
      near,
      crystal,
      spin: Math.random() * Math.PI,
      turn: (Math.random() - .5) * 1.2,
    };
  };

  const measureQuiet = () => {
    const origin = canvas.getBoundingClientRect();
    quiet = (options.avoid?.() ?? []).map(element => {
      const box = element.getBoundingClientRect();
      return new DOMRect(box.left - origin.left - 10, box.top - origin.top - 10, box.width + 20, box.height + 20);
    });
  };

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = host.clientWidth;
    height = options.height ? options.height() : host.clientHeight;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(140, (width * height) / options.density));
    flakes = Array.from({ length: count }, () => make(true));
    measureQuiet();
    draw(0);
  };

  const crystal = (flake: Flake) => {
    context.save();
    context.translate(flake.x, flake.y);
    context.rotate(flake.spin);
    context.beginPath();
    for (let arm = 0; arm < 6; arm++) {
      context.moveTo(0, 0);
      context.lineTo(0, -flake.r);
      context.moveTo(0, -flake.r * .55);
      context.lineTo(flake.r * .28, -flake.r * .8);
      context.moveTo(0, -flake.r * .55);
      context.lineTo(-flake.r * .28, -flake.r * .8);
      context.rotate(Math.PI / 3);
    }
    context.stroke();
    context.restore();
  };

  const draw = (delta: number) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = options.color;
    context.strokeStyle = options.color;
    context.lineWidth = 1;
    context.lineCap = 'round';
    const moved = Math.max(-40, Math.min(40, window.scrollY - scrolled));
    scrolled = window.scrollY;
    drift = drift * .6 + moved * .4;
    for (const flake of flakes) {
      flake.phase += delta * .8;
      flake.spin += flake.turn * delta;
      flake.y += flake.vy * delta + (delta ? drift * (flake.near ? .3 : .12) : 0);
      flake.x += Math.sin(flake.phase) * flake.drift * delta;
      if (flake.y > height + 10) Object.assign(flake, make(false));
      if (flake.x < -10) flake.x = width + 10;
      if (flake.x > width + 10) flake.x = -10;
      const hushed = quiet.some(box => flake.x > box.left && flake.x < box.right && flake.y > box.top && flake.y < box.bottom);
      context.globalAlpha = flake.alpha * (hushed ? .15 : 1) * (options.strength ?? 1);
      if (flake.crystal) crystal(flake);
      else {
        context.beginPath();
        context.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        context.fill();
      }
    }
    context.globalAlpha = 1;
  };

  const tick = (time: number) => {
    frame = requestAnimationFrame(tick);
    if (last && time - last < 30) return;
    const delta = last ? Math.min(.08, (time - last) / 1000) : 0;
    last = time;
    draw(delta);
  };

  const update = () => {
    const run = visible && !reduced.matches && document.visibilityState === 'visible';
    if (run && !frame) { last = 0; frame = requestAnimationFrame(tick); }
    if (!run && frame) { cancelAnimationFrame(frame); frame = 0; draw(0); }
  };

  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(canvas);
  const observer = new ResizeObserver(resize);
  [host, ...(options.watch ?? [])].forEach(element => observer.observe(element));
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  window.addEventListener('load', measureQuiet, { once: true });
  resize();
}
