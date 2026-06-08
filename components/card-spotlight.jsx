"use client";

import { useEffect } from "react";

export function CardSpotlight() {
  useEffect(() => {
    let frame = 0;

    const onMove = (event) => {
      const card = event.target instanceof Element ? event.target.closest(".surface") : null;

      if (!card || frame) {
        return;
      }

      const { clientX, clientY } = event;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}
