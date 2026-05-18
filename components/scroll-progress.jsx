"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const springScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  return <motion.div className="scroll-progress" style={{ scaleX: shouldReduceMotion ? scrollYProgress : springScale }} />;
}
