import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { PreviewLink } from "@/components/preview-link";
import { ProjectShowcase } from "@/components/project-showcase";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  getProjectsByTrack,
  projectTracks,
  projects
} from "@/lib/site-data";

export const metadata = {
  title: "Projects",
  description: "Interactive project browsing and case studies for Atharva Gham.",
  alternates: {
    canonical: "/projects/"
  }
};

const projectIndexSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Atharva Gham Projects",
    url: buildAbsoluteUrl("/projects/"),
    description: "Interactive project browsing and case studies for Atharva Gham."
  }
];

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={projectIndexSchema} />
      <PageHero
        eyebrow="Projects"
        title="Proof-driven case studies in software security."
        copy="Browse by technical area, stack, maturity, and evidence. Each project highlights the problem, what I built, and the proof that makes the work reviewable."
        actions={[
          { label: "Open workbench", href: "/workbench/", variant: "secondary" },
          { label: "Start technical conversation", href: "/contact/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <div className="projects-intro-grid">
          <AnimateIn className="surface panel-card projects-intro-panel" delay={0.04}>
            <p className="eyebrow">How To Read This Page</p>
            <h2>Start with proof, then open the deeper case study.</h2>
            <p className="muted">
              The top row shows the clearest technical depth. The full browser lets you filter by
              technical area and stack, then compare maturity, proof, and public references quickly.
            </p>
          </AnimateIn>

          <AnimateIn className="surface panel-card projects-note-panel" delay={0.1}>
            <p className="eyebrow">What To Expect</p>
            <ul className="bullet-list">
              <li>Concise cards built around problem, implementation, and proof.</li>
              <li>Honest maturity labels for technical previews, prototypes, releases, and production work.</li>
              <li>Case studies that explain design choices, validation paths, and tradeoffs.</li>
            </ul>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="The arc"
            title="Break it, catch it, build it."
            copy="The same work read as a security lifecycle: find the flaws, catch them in production, and engineer software that holds up, backed by the systems depth underneath."
          />
        </AnimateIn>

        <div className="capability-grid">
          {projectTracks.map((track, index) => {
            const trackProjects = getProjectsByTrack(track.track);

            return (
              <AnimateIn
                key={track.track}
                className="surface capability-card depth-card"
                delay={0.08 + index * 0.05}
              >
                <p className="micro-label">{track.eyebrow}</p>
                <h3>{track.track}</h3>
                <p className="muted">{track.blurb}</p>
                <ul className="bullet-list compact-list">
                  {trackProjects.map((project) => (
                    <li key={project.slug}>
                      <PreviewLink
                        href={`/projects/${project.slug}/`}
                        className="text-link"
                        preview={{
                          kind: project.maturity,
                          title: project.title,
                          summary: project.outcomeLine ?? project.summary,
                          metric: project.metrics?.[0]?.value ?? project.proofLine
                        }}
                      >
                        {project.title}
                      </PreviewLink>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      <section className="section-block projects-showcase-section">
        <ProjectShowcase projects={projects} />
      </section>
    </main>
  );
}
