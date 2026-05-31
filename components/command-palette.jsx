"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_RESULTS = 8;

function buildHaystack(entry) {
  return `${entry.title ?? ""} ${entry.summary ?? ""} ${entry.type ?? ""} ${(entry.tags ?? []).join(" ")}`.toLowerCase();
}

export function CommandPalette({ entries }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const indexed = useMemo(
    () => entries.map((entry) => ({ entry, haystack: buildHaystack(entry) })),
    [entries]
  );

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    const matched = terms.length
      ? indexed.filter(({ haystack }) => terms.every((term) => haystack.includes(term)))
      : indexed;

    return matched.slice(0, MAX_RESULTS).map(({ entry }) => entry);
  }, [indexed, query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isShortcut) {
        event.preventDefault();
        setIsOpen((open) => !open);
        return;
      }

      if (event.key === "/" && !isTyping && !isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(frame);
    }

    return undefined;
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (entry) => {
      if (!entry) {
        return;
      }

      close();
      router.push(entry.href);
    },
    [close, router]
  );

  const onFieldKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      navigate(results[activeIndex]);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="command-palette-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div className="command-palette" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div className="command-palette-field">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onFieldKeyDown}
            placeholder="Jump to a project, post, or page..."
            aria-label="Search the portfolio"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="command-palette-hint">Esc</span>
        </div>

        {results.length ? (
          <ul className="command-palette-results" role="listbox" aria-label="Results">
            {results.map((entry, index) => (
              <li key={entry.href} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className="command-palette-option"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => navigate(entry)}
                >
                  <span className="command-palette-type">{entry.type}</span>
                  <strong>{entry.title}</strong>
                  {entry.summary ? <span className="command-palette-summary">{entry.summary}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="command-palette-empty">No matches. Try another term.</p>
        )}
      </div>
    </div>
  );
}
