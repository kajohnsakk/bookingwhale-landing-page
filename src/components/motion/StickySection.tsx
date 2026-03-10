import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  index?: number;
  isLast?: boolean;
}

export default function StickySection({
  children,
  className,
  index = 0,
  isLast = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.3, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.9], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.3, 1], [0, 20]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0 0 0 rgba(0,0,0,0)", "0 -8px 30px rgba(0,0,0,0.08)"]
  );

  return (
    <div ref={containerRef} className="sticky-container">
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          zIndex: index + 10,
          transformOrigin: "center top",
          willChange: "transform, opacity",
          overflow: "hidden",
          boxShadow,
          ...(isLast ? {} : { scale, opacity, borderRadius }),
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
