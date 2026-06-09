"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

const panelTransition = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1]
};

export function CuriosityTrail({ trails }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTrailId, setActiveTrailId] = useState(trails[0]?.id ?? "");

  const activeTrail = useMemo(() => {
    return trails.find((trail) => trail.id === activeTrailId) ?? trails[0];
  }, [activeTrailId, trails]);

  if (!activeTrail) {
    return null;
  }

  return (
    <section className="surface curiosity-shell" aria-labelledby="curiosity-heading">
      <div className="curiosity-head">
        <div>
          <p className="eyebrow">Follow a thread</p>
          <h2 id="curiosity-heading">Start with the question that pulls you in.</h2>
        </div>
        <p className="muted">
          The fastest way to understand my work is to follow the question behind it — not just the
          stack listed beside it. Pick a thread and it will point you to the right corner of the site.
        </p>
      </div>

      <div className="curiosity-grid">
        <div className="curiosity-rail" role="tablist" aria-label="Curiosity trails">
          {trails.map((trail) => {
            const isActive = trail.id === activeTrail.id;

            return (
              <motion.button
                key={trail.id}
                type="button"
                layout={!shouldReduceMotion}
                className={`curiosity-tab ${isActive ? "curiosity-tab-active" : ""}`}
                onClick={() => setActiveTrailId(trail.id)}
                role="tab"
                aria-selected={isActive}
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              >
                {isActive ? (
                  <motion.span
                    layoutId="curiosity-active-pill"
                    className="curiosity-tab-glow"
                    transition={shouldReduceMotion ? { duration: 0 } : panelTransition}
                  />
                ) : null}
                <span>{trail.eyebrow}</span>
                <strong>{trail.title}</strong>
              </motion.button>
            );
          })}
        </div>

        <div className="curiosity-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeTrail.id}
              className="curiosity-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={shouldReduceMotion ? { duration: 0 } : panelTransition}
              role="tabpanel"
            >
              <p className="micro-label">{activeTrail.signal}</p>
              <h3>{activeTrail.hook}</h3>
              <p>{activeTrail.answer}</p>

              <div className="curiosity-clues" aria-label="Clues">
                {activeTrail.clues.map((clue, index) => (
                  <motion.span
                    key={clue}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { ...panelTransition, delay: 0.08 + index * 0.05 }
                    }
                  >
                    {clue}
                  </motion.span>
                ))}
              </div>

              <Link href={activeTrail.href} className="text-link">
                {activeTrail.linkLabel}
              </Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
