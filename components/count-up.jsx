"use client";

import { useEffect, useRef, useState } from "react";

const NUMERIC_PATTERN = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/s;

function parseValue(value) {
  const match = String(value).match(NUMERIC_PATTERN);

  if (!match) {
    return null;
  }

  const [, prefix, rawNumber, suffix] = match;
  const decimals = rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0;
  const target = Number(rawNumber.replace(/,/g, ""));

  if (Number.isNaN(target)) {
    return null;
  }

  return { prefix, suffix, target, decimals };
}

export function CountUp({ value, className, duration = 1200 }) {
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    if (!parsed) {
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals
    });

    const render = (current) => {
      setDisplay(`${parsed.prefix}${formatter.format(current)}${parsed.suffix}`);
    };

    let frame = 0;
    let startTime = 0;

    const tick = (now) => {
      if (!startTime) {
        startTime = now;
      }

      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      render(parsed.target * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          render(0);
          frame = window.requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [duration, parsed]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
