import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
