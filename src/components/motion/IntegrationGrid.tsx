import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimate, useAnimation, useInView } from "framer-motion";

interface Integration {
  name: string;
  color: string;
  icon: string;
}

interface Props {
  visible: Integration[];
  reserve: Integration[];
}

const iconSvgs: Record<string, string> = {
  'line': `<svg viewBox="0 0 24 24" fill="white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>`,
  'line-login': `<svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
  'bell': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  'cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  'globe': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  'mail': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  'qr': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><path d="M14 14h2v2h-2z"/><path d="M20 14h2v2h-2z"/><path d="M14 20h2v2h-2z"/><path d="M20 20h2v2h-2z"/><path d="M17 17h2v2h-2z"/></svg>`,
  'zap': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  'file': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  'chart': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'database': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  'server': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  'credit-card': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  'calendar': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  'code': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'map-pin': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  'webhook': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"/><path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8H12"/></svg>`,
  'sms': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/></svg>`,
  'shield': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  'docker': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="10" width="4" height="4"/><rect x="7" y="10" width="4" height="4"/><rect x="12" y="10" width="4" height="4"/><rect x="7" y="5" width="4" height="4"/><rect x="12" y="5" width="4" height="4"/><path d="M17 10h3c1 0 2 .5 2.5 1.5s0 2.5-1 3c.5 1 0 2.5-1 3s-2.5.5-3 0H2"/></svg>`,
  'activity': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'search': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  'sparkle': `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>`,
};

function Tile({
  initialItem,
  index,
  poolRef,
  tilesRef,
  animatingRef,
  onRegister,
}: {
  initialItem: Integration;
  index: number;
  poolRef: React.MutableRefObject<Integration[]>;
  tilesRef: React.MutableRefObject<Integration[]>;
  animatingRef: React.MutableRefObject<Set<number>>;
  onRegister: (index: number, flip: () => Promise<void>) => void;
}) {
  const [scope, animate] = useAnimate();
  const [current, setCurrent] = useState(initialItem);

  const flip = useCallback(async () => {
    if (animatingRef.current.has(index) || poolRef.current.length === 0) return;
    animatingRef.current.add(index);

    const randIdx = Math.floor(Math.random() * poolRef.current.length);
    const newItem = poolRef.current[randIdx];
    const oldItem = tilesRef.current[index];

    poolRef.current.splice(randIdx, 1);
    poolRef.current.push(oldItem);
    tilesRef.current[index] = newItem;

    await animate(
      scope.current,
      { rotateY: 90, scale: 0.92 },
      { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
    );

    setCurrent(newItem);

    await animate(
      scope.current,
      { rotateY: 0, scale: 1 },
      { type: "spring", stiffness: 180, damping: 20, mass: 0.8 }
    );

    animatingRef.current.delete(index);
  }, [index, scope, animate, poolRef, tilesRef, animatingRef]);

  useEffect(() => {
    onRegister(index, flip);
  }, [index, flip, onRegister]);

  const tileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tileRef, { margin: "-60px" });
  const tileControls = useAnimation();
  const hasAppeared = useRef(false);

  useEffect(() => {
    if (isInView) {
      if (hasAppeared.current) {
        tileControls.set({ opacity: 0, scale: 0.95 });
      }
      tileControls.start({ opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut", delay: index * 0.04 } });
      hasAppeared.current = true;
    }
  }, [isInView, tileControls, index]);

  return (
    <div style={{ perspective: 800 }} ref={tileRef}>
      <motion.div
        ref={scope}
        onClick={flip}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={tileControls}
        whileHover={{ scale: 1.08 }}
        style={{
          background: current.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: "1",
          borderRadius: "22%",
          cursor: "pointer",
          transformStyle: "preserve-3d" as const,
        }}
        title={current.name}
      >
        <div
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="sm:!w-12 sm:!h-12"
          dangerouslySetInnerHTML={{ __html: iconSvgs[current.icon] || "" }}
        />
      </motion.div>
    </div>
  );
}

export default function IntegrationGrid({ visible, reserve }: Props) {
  const poolRef = useRef<Integration[]>([...reserve]);
  const tilesRef = useRef<Integration[]>([...visible]);
  const animatingRef = useRef<Set<number>>(new Set());
  const flipFnsRef = useRef<Map<number, () => Promise<void>>>(new Map());

  const handleRegister = useCallback((index: number, flipFn: () => Promise<void>) => {
    flipFnsRef.current.set(index, flipFn);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const cols = window.innerWidth >= 640 ? 5 : 3;
      for (let i = 0; i < visible.length; i++) {
        const col = i % cols;
        const fn = flipFnsRef.current.get(i);
        if (fn) {
          setTimeout(() => fn(), col * 120);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [visible.length]);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 flex-1">
      {visible.map((item, i) => (
        <Tile
          key={i}
          initialItem={item}
          index={i}
          poolRef={poolRef}
          tilesRef={tilesRef}
          animatingRef={animatingRef}
          onRegister={handleRegister}
        />
      ))}
    </div>
  );
}
