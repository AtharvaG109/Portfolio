"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function TiltCard({ children, className, maxTilt = 7 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const onPointerMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
    ref.current.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className ?? ""}`}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </motion.div>
  );
}
