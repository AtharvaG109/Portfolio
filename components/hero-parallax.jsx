"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function HeroParallax({ children, className }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 700], [0, -52]);
  const y = useSpring(rawY, { stiffness: 120, damping: 30, restDelta: 0.01 });

  return (
    <motion.div className={className} style={shouldReduceMotion ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
