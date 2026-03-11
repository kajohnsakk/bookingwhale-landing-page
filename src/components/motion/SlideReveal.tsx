import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export default function SlideReveal({
  children,
  direction = "left",
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-60px" });
  const controls = useAnimation();
  const hasAnimated = useRef(false);
  const xOffset = direction === "left" ? -40 : 40;

  useEffect(() => {
    if (isInView) {
      if (hasAnimated.current) {
        controls.set({ opacity: 0, x: xOffset });
      }
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.45, delay, ease: "easeOut" } });
      hasAnimated.current = true;
    }
  }, [isInView, controls, delay, xOffset]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
