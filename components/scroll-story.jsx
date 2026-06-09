"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollStory({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const index = Number(visible[0].target.dataset.index);

          if (!Number.isNaN(index)) {
            setActiveStep(index);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 1] }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [steps]);

  if (!steps?.length) {
    return null;
  }

  const current = steps[activeStep] ?? steps[0];

  return (
    <div className="scroll-story">
      <div className="scroll-story-rail">
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            data-index={index}
            className={`scroll-story-step ${index === activeStep ? "scroll-story-step-active" : ""}`}
          >
            <span className="scroll-story-marker" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="micro-label">{step.eyebrow}</p>
              <h3>{step.title}</h3>
              <p className="muted">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <aside className="scroll-story-stage" aria-hidden="true">
        <div className="scroll-story-card">
          <div className="scroll-story-progress">
            {steps.map((step, index) => (
              <span
                key={step.title}
                className={`scroll-story-dot ${index <= activeStep ? "scroll-story-dot-on" : ""}`}
              />
            ))}
          </div>
          <p className="micro-label">{current.eyebrow}</p>
          <strong className="scroll-story-headline">{current.title}</strong>
          {current.highlight ? <p className="scroll-story-highlight">{current.highlight}</p> : null}
        </div>
      </aside>
    </div>
  );
}
