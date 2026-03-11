import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView) {
      if (hasAnimated.current) {
        controls.set({ opacity: 0 });
      }
      controls.start({ opacity: 1, transition: { duration, delay, ease: "easeOut" } });
      hasAnimated.current = true;
    }
  }, [isInView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
