"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="page-transition-shell"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.99, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
