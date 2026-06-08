"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    setDisplay(value);

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
    let hasRun = false;

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

    const start = () => {
      if (hasRun) {
        return;
      }

      hasRun = true;
      render(0);
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    // Safety net: if the observer never fires (layout quirks, tab restore),
    // animate anyway so the value is never left at zero.
    const fallback = window.setTimeout(() => {
      if (!hasRun) {
        start();
        observer.disconnect();
      }
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [duration, parsed, value]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
