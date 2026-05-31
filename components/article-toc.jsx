"use client";

import { useEffect, useState } from "react";

export function ArticleToc({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) {
      return undefined;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: [0, 1] }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  const handleClick = (event, id) => {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    setActiveId(id);

    if (window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="article-toc" aria-label="On this page">
      <p className="micro-label">On this page</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={heading.id === activeId ? "true" : undefined}
              onClick={(event) => handleClick(event, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
