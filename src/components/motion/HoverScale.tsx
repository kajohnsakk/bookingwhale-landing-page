import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export default function HoverScale({
  children,
  scale = 1.01,
  className,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
