type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; alpha: number };

const reduced = matchMedia('(prefers-reduced-motion: reduce)');

export function snow(host: HTMLElement, options: { color: string; density: number; className: string; height?: () => number }) {
  const canvas = document.createElement('canvas');
  canvas.className = `bwx-snow ${options.className}`;
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const context = canvas.getContext('2d');
  if (!context) return;
  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];
  let frame = 0;
  let visible = false;
  let last = 0;

  const make = (anywhere: boolean): Flake => ({
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -8,
    r: 1 + Math.random() * 2.4,
    vy: 18 + Math.random() * 30,
    drift: 8 + Math.random() * 16,
    phase: Math.random() * Math.PI * 2,
    alpha: .35 + Math.random() * .55,
  });

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = host.clientWidth;
    height = options.height ? options.height() : host.clientHeight;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(140, (width * height) / options.density));
    flakes = Array.from({ length: count }, () => make(true));
    draw(0);
  };

  const draw = (delta: number) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = options.color;
    for (const flake of flakes) {
      flake.phase += delta * .8;
      flake.y += flake.vy * delta;
      flake.x += Math.sin(flake.phase) * flake.drift * delta;
      if (flake.y > height + 8) Object.assign(flake, make(false));
      if (flake.x < -8) flake.x = width + 8;
      if (flake.x > width + 8) flake.x = -8;
      context.globalAlpha = flake.alpha;
      context.beginPath();
      context.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };

  const tick = (time: number) => {
    const delta = last ? Math.min(.05, (time - last) / 1000) : 0;
    last = time;
    draw(delta);
    frame = requestAnimationFrame(tick);
  };

  const update = () => {
    const run = visible && !reduced.matches && document.visibilityState === 'visible';
    if (run && !frame) { last = 0; frame = requestAnimationFrame(tick); }
    if (!run && frame) { cancelAnimationFrame(frame); frame = 0; }
  };

  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(canvas);
  new ResizeObserver(resize).observe(host);
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  resize();
}
