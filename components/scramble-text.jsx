"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|=+*#@$%&";

export function ScrambleText({ text, className, as: Tag = "p", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(text);
      return undefined;
    }

    let revealed = 0;
    const step = Math.max(1, Math.round(text.length / 42));
    let interval = 0;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        revealed = Math.min(text.length, revealed + step);
        frameRef.current += 1;

        setDisplay(
          text
            .split("")
            .map((char, index) => {
              if (index < revealed || char === " ") {
                return char;
              }
              return GLYPHS[(index * 31 + frameRef.current * 7) % GLYPHS.length];
            })
            .join("")
        );

        if (revealed >= text.length) {
          window.clearInterval(interval);
        }
      }, 26);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay, shouldReduceMotion]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
