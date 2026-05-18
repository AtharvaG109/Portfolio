"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ProjectPreviewDiagram } from "@/components/project-preview-diagram";
import { ProjectSystemMap } from "@/components/project-system-map";
import { getSortedProjects } from "@/lib/site-data";

const cardTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1]
};

function getPrimaryLink(project) {
  return project.links?.[0] ?? null;
}

function getFilterOptions(projects, key) {
  return ["All", ...new Set(projects.flatMap((project) => project[key] ?? []))];
}

function EvidenceVisual({ project, compact = false }) {
  const visual = project.evidenceVisual;

  if (!visual) {
    return <ProjectPreviewDiagram project={project} variant={compact ? "compact" : "feature"} />;
  }

  return (
    <div className={`evidence-visual ${compact ? "evidence-visual-compact" : ""}`}>
      <div className="evidence-visual-top">
        <span>{visual.title}</span>
        <strong>{project.maturity}</strong>
      </div>
      <div className="evidence-terminal" aria-label={`${project.title} proof output`}>
        {visual.lines.map((line) => (
          <code key={line}>{line}</code>
        ))}
      </div>
      {!compact ? <p>{visual.caption}</p> : null}
    </div>
  );
}

function ProofBadges({ project, limit }) {
  const badges = limit ? project.proofBadges.slice(0, limit) : project.proofBadges;

  return (
    <div className="proof-badge-row" aria-label={`${project.title} proof badges`}>
      {badges.map((badge) => (
        <span key={badge} className="proof-badge">
          {badge}
        </span>
      ))}
    </div>
  );
}

function FilterGroup({ label, activeValue, options, onChange }) {
  return (
    <div className="project-filter-group">
      <p className="micro-label">{label}</p>
      <div className="chip-row" role="toolbar" aria-label={`Project ${label.toLowerCase()} filter`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip ${option === activeValue ? "chip-active" : ""}`}
            onClick={() => onChange(option)}
            aria-pressed={option === activeValue}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectComparisonTable({ projects }) {
  return (
    <section className="surface project-comparison-shell" aria-labelledby="project-comparison-heading">
      <div className="project-comparison-head">
        <div>
          <p className="eyebrow">Project comparison</p>
          <h3 id="project-comparison-heading">Fast technical scan</h3>
        </div>
        <p className="muted">Best fit, stack, proof, and public reference in one view.</p>
      </div>

      <div className="project-table-wrap">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Best fit</th>
              <th>Stack</th>
              <th>Proof</th>
              <th>Repo</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const link = getPrimaryLink(project);

              return (
                <tr key={project.slug}>
                  <td>
                    <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
                    <span>{project.maturity}</span>
                  </td>
                  <td>{project.roleFits.slice(0, 2).join(", ")}</td>
                  <td>{project.stack.slice(0, 3).join(", ")}</td>
                  <td>{project.proofLine}</td>
                  <td>
                    {link ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label.replace("View ", "")}
                      </a>
                    ) : (
                      <span>Case study</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ProjectShowcase({ projects }) {
  const shouldReduceMotion = useReducedMotion();
  const spotlightRef = useRef(null);
  const sortedProjects = useMemo(() => getSortedProjects(projects), [projects]);
  const flagshipProjects = useMemo(
    () => sortedProjects.filter((project) => (project.displayPriority ?? 99) <= 3),
    [sortedProjects]
  );
  const newestProjectSlug = useMemo(() => sortedProjects[0]?.slug ?? null, [sortedProjects]);
  const categories = useMemo(() => {
    return ["All", ...new Set(sortedProjects.map((project) => project.category))];
  }, [sortedProjects]);
  const roleFits = useMemo(() => getFilterOptions(sortedProjects, "roleFits"), [sortedProjects]);
  const focusTags = useMemo(() => getFilterOptions(sortedProjects, "focusTags"), [sortedProjects]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRole, setActiveRole] = useState("All");
  const [activeFocus, setActiveFocus] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState(sortedProjects[0]?.slug ?? null);

  const visibleProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesRole = activeRole === "All" || project.roleFits.includes(activeRole);
      const matchesFocus = activeFocus === "All" || project.focusTags.includes(activeFocus);

      return matchesCategory && matchesRole && matchesFocus;
    });
  }, [activeCategory, activeFocus, activeRole, sortedProjects]);

  useEffect(() => {
    if (!visibleProjects.length) {
      return;
    }

    const currentVisible = visibleProjects.some((project) => project.slug === selectedSlug);

    if (!currentVisible) {
      setSelectedSlug(visibleProjects[0].slug);
    }
  }, [selectedSlug, visibleProjects]);

  const selectedProject =
    visibleProjects.find((project) => project.slug === selectedSlug) ?? visibleProjects[0] ?? sortedProjects[0];

  const previewProject = (projectSlug) => {
    setSelectedSlug(projectSlug);

    window.requestAnimationFrame(() => {
      spotlightRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
      spotlightRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="project-showcase">
      <section className="flagship-projects" aria-labelledby="flagship-projects-heading">
        <div className="project-showcase-head">
          <div>
            <p className="micro-label">Featured build path</p>
            <h2 id="flagship-projects-heading">Three projects that show the clearest technical depth.</h2>
          </div>
          <p className="muted">CLI forensics, compiler self-hosting, and C++ networking.</p>
        </div>

        <div className="flagship-grid">
          {flagshipProjects.map((project) => {
            const link = getPrimaryLink(project);

            return (
              <article key={project.slug} className="surface flagship-card">
                <div className="project-label-row">
                  <p className="eyebrow">{project.maturity}</p>
                  {project.slug === newestProjectSlug ? <span className="project-badge">Newest project</span> : null}
                </div>
                <h3>{project.title}</h3>
                <p className="muted">{project.proofLine}</p>
                <ProofBadges project={project} limit={4} />
                <div className="project-card-actions">
                  <button
                    type="button"
                    className="text-link text-link-button"
                    onClick={() => previewProject(project.slug)}
                  >
                    Preview here
                  </button>
                  <Link href={`/projects/${project.slug}/`} className="text-link">
                    Open case study
                  </Link>
                  {link ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                      {link.label}
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selectedProject ? (
        <motion.article
          ref={spotlightRef}
          layout={!shouldReduceMotion}
          className="surface project-spotlight"
          transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
          tabIndex={-1}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedProject.slug}
              className="project-spotlight-content"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
            >
              <div className="project-spotlight-head">
                <div>
                  <div className="project-label-row">
                    <p className="eyebrow">Project spotlight</p>
                    {selectedProject.slug === newestProjectSlug ? (
                      <span className="project-badge">Newest project</span>
                    ) : null}
                    <span className="project-badge project-badge-muted">{selectedProject.maturity}</span>
                  </div>
                  <h3>{selectedProject.title}</h3>
                </div>
                <div className="project-meta">
                  <span>{selectedProject.category}</span>
                  <span>{selectedProject.year}</span>
                </div>
              </div>

              <p className="muted">{selectedProject.summary}</p>
              {selectedProject.metrics?.length ? (
                <div className="metric-grid project-metric-grid">
                  {selectedProject.metrics.map((metric) => (
                    <div key={`${metric.value}-${metric.label}`} className="metric-card">
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <ProjectSystemMap project={selectedProject} variant="compact" />
              <div className="media-frame project-preview-frame">
                <EvidenceVisual project={selectedProject} />
              </div>
              <ProofBadges project={selectedProject} />
              <p className="project-impact">{selectedProject.challenge}</p>

              <div className="spotlight-columns">
                <div>
                  <p className="micro-label">Approach</p>
                  <ul className="bullet-list compact-list">
                    {selectedProject.approach.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="micro-label">Result</p>
                  <p className="muted">{selectedProject.result}</p>
                  <div className="tag-row spotlight-tags">
                    {selectedProject.focusTags.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link href={`/projects/${selectedProject.slug}/`} className="text-link">
                Open full case study
              </Link>
              {selectedProject.links?.length ? (
                <div className="project-card-actions project-links">
                  {selectedProject.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </motion.article>
      ) : null}

      <div className="project-showcase-head">
        <div>
          <p className="micro-label">Browse by focus area</p>
          <h2>Find the project that matches the work.</h2>
        </div>
        <p className="muted">{visibleProjects.length} of {sortedProjects.length} projects shown</p>
      </div>

      <div className="project-filter-panel">
        <FilterGroup label="Category" activeValue={activeCategory} options={categories} onChange={setActiveCategory} />
        <FilterGroup label="Role fit" activeValue={activeRole} options={roleFits} onChange={setActiveRole} />
        <FilterGroup label="Stack or focus" activeValue={activeFocus} options={focusTags} onChange={setActiveFocus} />
      </div>

      <motion.div layout={!shouldReduceMotion} className="project-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => {
            const isActive = project.slug === selectedProject?.slug;

            return (
              <motion.article
                key={project.slug}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
                className={`surface project-card ${isActive ? "project-card-active" : ""}`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-project-card"
                    className="project-card-selection-glow"
                    transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
                  />
                ) : null}
                <button
                  type="button"
                  className="project-card-toggle"
                  onClick={() => previewProject(project.slug)}
                  aria-pressed={isActive}
                  aria-label={`Preview ${project.title}`}
                >
                  <div className="project-card-thumbnail project-preview-frame">
                    <EvidenceVisual project={project} compact />
                  </div>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>{project.maturity}</span>
                  </div>
                  {project.slug === newestProjectSlug ? <span className="project-badge">Newest project</span> : null}
                  <h3>{project.title}</h3>
                  <div className="project-card-scan">
                    <p>
                      <strong>Problem</strong>
                      <span>{project.challenge}</span>
                    </p>
                    <p>
                      <strong>Built</strong>
                      <span>{project.approach[0]}</span>
                    </p>
                    <p>
                      <strong>Proof</strong>
                      <span>{project.proofLine}</span>
                    </p>
                  </div>
                  <ProofBadges project={project} limit={4} />
                  {project.metrics?.[0] ? (
                    <p className="project-card-metric">
                      <strong>{project.metrics[0].value}</strong> {project.metrics[0].label}
                    </p>
                  ) : null}
                </button>

                <div className="project-card-actions">
                  <button
                    type="button"
                    className="text-link text-link-button"
                    onClick={() => previewProject(project.slug)}
                  >
                    Preview here
                  </button>
                  <Link href={`/projects/${project.slug}/`} className="text-link">
                    Open case study
                  </Link>
                  {project.links?.[0] ? (
                    <a
                      href={project.links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {project.links[0].label}
                    </a>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <ProjectComparisonTable projects={sortedProjects} />

      <section className="surface project-next-step">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Review the technical summary or start a direct conversation.</h2>
          <p className="muted">
            The strongest fit is backend, platform, systems, and security work where implementation,
            proof, and clear communication all matter.
          </p>
        </div>
        <div className="cta-row contact-actions">
          <Link href="/resume/" className="button button-secondary">
            Open resume
          </Link>
          <a href="https://github.com/AtharvaG109" target="_blank" rel="noopener noreferrer" className="button button-secondary">
            View GitHub
          </a>
          <Link href="/contact/" className="button button-primary">
            Contact me
          </Link>
        </div>
      </section>
    </div>
  );
}
