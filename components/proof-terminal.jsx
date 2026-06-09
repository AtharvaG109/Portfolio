"use client";

import { useEffect, useRef, useState } from "react";

export function ProofTerminal({ lines, title = "evidence", prompt = "$" }) {
  const [rendered, setRendered] = useState([]);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setRendered(lines);
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [lines]);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    let index = 0;
    const timers = [];

    const pushNext = () => {
      if (index >= lines.length) {
        return;
      }

      const current = index;
      index += 1;
      setRendered((prev) => [...prev, lines[current]]);
      timers.push(window.setTimeout(pushNext, 420));
    };

    pushNext();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [started, lines]);

  return (
    <div className="proof-terminal" ref={ref} aria-label={`${title} output`}>
      <div className="proof-terminal-bar">
        <span className="proof-terminal-dot" />
        <span className="proof-terminal-dot" />
        <span className="proof-terminal-dot" />
        <span className="proof-terminal-title">{title}</span>
      </div>
      <div className="proof-terminal-body">
        {rendered.map((line, lineIndex) => (
          <code key={`${line}-${lineIndex}`} className="proof-terminal-line">
            <span className="proof-terminal-prompt">{prompt}</span>
            {line}
          </code>
        ))}
        {started && rendered.length < lines.length ? (
          <code className="proof-terminal-line proof-terminal-line-typing">
            <span className="proof-terminal-prompt">{prompt}</span>
            <span className="proof-terminal-cursor" aria-hidden="true" />
          </code>
        ) : null}
      </div>
    </div>
  );
}
