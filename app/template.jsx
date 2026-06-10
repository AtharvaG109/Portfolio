"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="page-transition-shell"
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              y: 36,
              scale: 0.982,
              filter: "blur(14px)",
              clipPath: "inset(3% 2% 5% 2% round 28px)"
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0% round 0px)"
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
