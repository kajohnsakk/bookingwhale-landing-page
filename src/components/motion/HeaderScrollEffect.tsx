import { useEffect } from "react";
import { useMotionValue, useScroll, useMotionValueEvent } from "framer-motion";

export default function HeaderScrollEffect() {
  const { scrollY } = useScroll();
  const lastY = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastY.get();
    const header = document.querySelector("[data-header]") as HTMLElement;
    if (!header) return;

    if (current > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    if (current > 200 && current > previous) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastY.set(current);
  });

  return null;
}
