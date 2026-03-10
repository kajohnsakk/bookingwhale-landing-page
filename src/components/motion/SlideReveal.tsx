import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
