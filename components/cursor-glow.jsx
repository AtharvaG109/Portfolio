"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ left: springX, top: springY }}
    />
  );
}
