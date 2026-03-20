import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView) {
      if (hasAnimated.current) {
        controls.set({ opacity: 0, y: 40 });
      }
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: smoothEase } });
      hasAnimated.current = true;
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
