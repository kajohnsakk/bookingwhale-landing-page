import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: ContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const variantMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
};

interface ItemProps {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fade-up",
  className,
}: ItemProps) {
  return (
    <motion.div variants={variantMap[variant]} className={className}>
      {children}
    </motion.div>
  );
}
