import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScaleReveal({
  children,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView) {
      if (hasAnimated.current) {
        controls.set({ opacity: 0, scale: 0.92 });
      }
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20, delay },
      });
      hasAnimated.current = true;
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
