const projectPaletteByCategory = {
  "Clinical Product": {
    accent: "#7c8cff",
    accentSoft: "rgba(124, 140, 255, 0.2)",
    accentGlow: "rgba(124, 140, 255, 0.26)",
    warm: "#ff786a",
    warmSoft: "rgba(255, 120, 106, 0.18)"
  },
  "Market Intelligence": {
    accent: "#5ee1c2",
    accentSoft: "rgba(94, 225, 194, 0.18)",
    accentGlow: "rgba(94, 225, 194, 0.24)",
    warm: "#ffd166",
    warmSoft: "rgba(255, 209, 102, 0.18)"
  },
  "macOS Utility": {
    accent: "#9b8cff",
    accentSoft: "rgba(155, 140, 255, 0.2)",
    accentGlow: "rgba(155, 140, 255, 0.25)",
    warm: "#ff8f70",
    warmSoft: "rgba(255, 143, 112, 0.18)"
  },
  "Security Product": {
    accent: "#59e6c3",
    accentSoft: "rgba(89, 230, 195, 0.18)",
    accentGlow: "rgba(89, 230, 195, 0.22)",
    warm: "#ffb15f",
    warmSoft: "rgba(255, 177, 95, 0.18)"
  },
  Systems: {
    accent: "#74b8ff",
    accentSoft: "rgba(116, 184, 255, 0.18)",
    accentGlow: "rgba(116, 184, 255, 0.24)",
    warm: "#9dd6ff",
    warmSoft: "rgba(157, 214, 255, 0.16)"
  },
  Detection: {
    accent: "#7fe0ff",
    accentSoft: "rgba(127, 224, 255, 0.18)",
    accentGlow: "rgba(127, 224, 255, 0.22)",
    warm: "#ffcf70",
    warmSoft: "rgba(255, 207, 112, 0.16)"
  },
  "Application Security": {
    accent: "#ffc266",
    accentSoft: "rgba(255, 194, 102, 0.18)",
    accentGlow: "rgba(255, 194, 102, 0.22)",
    warm: "#5ce3b4",
    warmSoft: "rgba(92, 227, 180, 0.16)"
  },
  Research: {
    accent: "#c8a4ff",
    accentSoft: "rgba(200, 164, 255, 0.18)",
    accentGlow: "rgba(200, 164, 255, 0.22)",
    warm: "#ffcf93",
    warmSoft: "rgba(255, 207, 147, 0.16)"
  },
  Publication: {
    accent: "#f6c96a",
    accentSoft: "rgba(246, 201, 106, 0.18)",
    accentGlow: "rgba(246, 201, 106, 0.22)",
    warm: "#ffe5a8",
    warmSoft: "rgba(255, 229, 168, 0.16)"
  },
  "AI Security": {
    accent: "#8ab4ff",
    accentSoft: "rgba(138, 180, 255, 0.18)",
    accentGlow: "rgba(138, 180, 255, 0.24)",
    warm: "#ffb36d",
    warmSoft: "rgba(255, 179, 109, 0.18)"
  }
};

function trimWords(text, maxWords) {
  if (!text) {
    return "";
  }

  const clean = text.replace(/\s+/g, " ").replace(/[.,;:!?]+$/g, "").trim();
  const words = clean.split(" ");

  if (words.length <= maxWords) {
    return clean;
  }

  return `${words.slice(0, maxWords).join(" ")}…`;
}

function compactProjectName(title, maxWords) {
  const primary = title?.split(":")[0] ?? title;
  return trimWords(primary, maxWords);
}

function buildPreviewSteps(project, variant) {
  const short = variant === "compact";

  return [
    {
      label: "Challenge",
      text: trimWords(project.challenge, short ? 5 : 11)
    },
    {
      label: "Approach",
      text: trimWords(project.approach?.[0] ?? project.summary, short ? 6 : 12)
    },
    {
      label: "Result",
      text: trimWords(project.result ?? project.impact, short ? 5 : 10)
    }
  ];
}

function buildSignalItems(project) {
  if (project.metrics?.length) {
    return project.metrics.slice(0, 3).map((metric) => ({
      value: metric.value,
      label: trimWords(metric.label, 4)
    }));
  }

  return project.stack.slice(0, 3).map((item) => ({
    value: item,
    label: "Stack"
  }));
}

export function ProjectPreviewDiagram({ project, variant = "feature", className = "" }) {
  const palette = projectPaletteByCategory[project.category] ?? projectPaletteByCategory["Security Product"];
  const steps = buildPreviewSteps(project, variant);
  const signals = buildSignalItems(project);
  const rootClassName = ["project-preview", `project-preview-${variant}`, className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClassName}
      role="img"
      aria-label={project.media.alt}
      style={{
        "--project-preview-accent": palette.accent,
        "--project-preview-accent-soft": palette.accentSoft,
        "--project-preview-accent-glow": palette.accentGlow,
        "--project-preview-warm": palette.warm,
        "--project-preview-warm-soft": palette.warmSoft
      }}
    >
      <div className="project-preview-orb project-preview-orb-left" />
      <div className="project-preview-orb project-preview-orb-right" />

      <div className="project-preview-top">
        <div className="project-preview-brand">
          <span className="project-preview-name">
            {compactProjectName(project.title, variant === "compact" ? 4 : 6)}
          </span>
          <span className="project-preview-category">{project.category}</span>
        </div>
        <span className="project-preview-year">{project.year}</span>
      </div>

      <div className="project-preview-flow">
        {steps.map((step) => (
          <article key={step.label} className="project-preview-node">
            <span className="project-preview-node-label">{step.label}</span>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="project-preview-signals">
        {signals.map((signal) => (
          <div key={`${signal.value}-${signal.label}`} className="project-preview-signal">
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
