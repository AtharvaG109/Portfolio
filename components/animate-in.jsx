"use client";

import { motion, useReducedMotion } from "motion/react";

export function AnimateIn({ children, className, delay = 0, y = 24 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y, scale: 0.975, rotateX: 6, filter: "blur(10px)" }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.16 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.72,
              delay,
              ease: [0.16, 1, 0.3, 1]
            }
      }
    >
      {children}
    </motion.div>
  );
}
