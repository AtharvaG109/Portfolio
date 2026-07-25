"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useMemo, useState } from "react";

function buildChapters(project) {
  return [
    {
      id: "purpose",
      index: "01",
      label: "Purpose",
      title: "Why this project exists",
      body: project.challenge,
      note: project.category
    },
    {
      id: "build",
      index: "02",
      label: "Build",
      title: "What I chose to build",
      body: project.approach?.[0] ?? project.summary,
      note: `${project.stack.length} named tools`
    },
    {
      id: "proof",
      index: "03",
      label: "Proof",
      title: "What the evidence supports",
      body: project.result,
      note: project.metrics?.[0]?.value ?? project.proofLine
    },
    {
      id: "limits",
      index: "04",
      label: "Limits",
      title: "What I am not claiming",
      body:
        project.tradeoffs?.[0] ??
        "Scope stays limited to the behavior, evidence, and outcomes documented in this case study.",
      note: project.maturity
    }
  ];
}

export function ProjectStoryboard({ project, variant = "full" }) {
  const chapters = useMemo(() => buildChapters(project), [project]);
  const [activeId, setActiveId] = useState(chapters[0].id);
  const shouldReduceMotion = useReducedMotion();
  const tabsId = useId();
  const activeIndex = Math.max(
    chapters.findIndex((chapter) => chapter.id === activeId),
    0
  );
  const activeChapter = chapters[activeIndex];
  const isCompact = variant === "compact";

  return (
    <section
      className={`project-storyboard ${isCompact ? "project-storyboard-compact" : ""}`}
      aria-label={`${project.title} project story`}
    >
      <div className="project-storyboard-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="project-storyboard-topline">
        <div>
          <p className="micro-label">Project field notes</p>
          <strong>{project.title}</strong>
        </div>
        <span className="project-storyboard-counter">
          {activeChapter.index} / {String(chapters.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className="project-storyboard-tabs"
        role="tablist"
        aria-label={`${project.title} story chapters`}
      >
        {chapters.map((chapter, index) => {
          const selected = chapter.id === activeId;

          return (
            <button
              key={chapter.id}
              type="button"
              role="tab"
              id={`${tabsId}-${chapter.id}-tab`}
              aria-controls={`${tabsId}-${chapter.id}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={selected ? "is-active" : ""}
              onClick={() => setActiveId(chapter.id)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                  return;
                }

                event.preventDefault();
                const nextIndex =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? chapters.length - 1
                      : (index + (event.key === "ArrowRight" ? 1 : -1) + chapters.length) %
                        chapters.length;

                setActiveId(chapters[nextIndex].id);
                event.currentTarget.parentElement?.children[nextIndex]?.focus();
              }}
            >
              <span>{chapter.index}</span>
              {chapter.label}
            </button>
          );
        })}
      </div>

      <div className="project-storyboard-stage">
        <div className="project-storyboard-rail" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <span
              key={chapter.id}
              className={index <= activeIndex ? "is-reached" : ""}
              style={{ "--story-delay": `${index * 55}ms` }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeChapter.id}
            id={`${tabsId}-${activeChapter.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-${activeChapter.id}-tab`}
            className="project-storyboard-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, rotate: -0.35 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, rotate: 0.25 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="project-storyboard-copy">
              <p className="eyebrow">{activeChapter.label}</p>
              <h3>{activeChapter.title}</h3>
              <p>{activeChapter.body}</p>
            </div>

            <div className="project-storyboard-note">
              <span>{activeChapter.note}</span>
              <small>Documented scope</small>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!isCompact ? (
        <div className="project-storyboard-footer">
          <div className="tag-row">
            {project.stack.slice(0, 5).map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
          <p>Claims stay bounded to documented evidence.</p>
        </div>
      ) : null}
    </section>
  );
}
