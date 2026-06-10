"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "atharva-site-accent";

const ACCENTS = [
  { id: "mint", label: "Mint", accent: "#2CE6A8", strong: "#7CF4C9", warm: "#F5B85D" },
  { id: "ember", label: "Ember", accent: "#E56A54", strong: "#FF947B", warm: "#F5B85D" },
  { id: "azure", label: "Azure", accent: "#3B9EFF", strong: "#74C0FF", warm: "#5AD1C4" },
  { id: "violet", label: "Violet", accent: "#9A7BFF", strong: "#B9A2FF", warm: "#F49AD1" }
];

function applyAccent(entry) {
  if (!entry) {
    return;
  }

  const root = document.documentElement;
  root.style.setProperty("--accent", entry.accent);
  root.style.setProperty("--accent-strong", entry.strong);
  root.style.setProperty("--warm", entry.warm);
}

export function AccentPicker() {
  const [activeId, setActiveId] = useState("mint");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const match = ACCENTS.find((entry) => entry.id === stored);

      if (match) {
        setActiveId(match.id);
        applyAccent(match);
      }
    } catch (error) {
      // Ignore storage access issues and keep the default accent.
    }
  }, []);

  const choose = (entry) => {
    setActiveId(entry.id);
    applyAccent(entry);

    try {
      window.localStorage.setItem(STORAGE_KEY, entry.id);
    } catch (error) {
      // Ignore storage write failures.
    }
  };

  return (
    <div className="accent-picker" role="group" aria-label="Accent color">
      <span className="micro-label">Make it yours</span>
      <div className="accent-swatches">
        {ACCENTS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`accent-swatch ${entry.id === activeId ? "accent-swatch-active" : ""}`}
            style={{ background: `linear-gradient(135deg, ${entry.accent}, ${entry.warm})` }}
            onClick={() => choose(entry)}
            aria-pressed={entry.id === activeId}
            aria-label={`${entry.label} accent`}
            title={entry.label}
          />
        ))}
      </div>
    </div>
  );
}
