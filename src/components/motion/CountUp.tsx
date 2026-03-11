import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  motion,
} from "framer-motion";

interface Props {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  from = 0,
  to,
  duration = 1.5,
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(from);
      animate(motionValue, to, { duration, ease: "easeOut" });
    }
  }, [isInView, motionValue, from, to, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      {from}{suffix}
    </motion.span>
  );
}
