import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const variants = (delay: number, duration: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: "easeOut" },
  },
});

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants(delay, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
