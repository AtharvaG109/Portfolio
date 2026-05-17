import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AnimateIn } from "@/components/animate-in";
import { ProjectDemo } from "@/components/project-demo";
import { RichContent } from "@/components/rich-content";
import { StructuredData } from "@/components/structured-data";
import { getContentBySlug } from "@/lib/content";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  formatPublishedDate,
  getProjectBySlug,
  projects,
  siteConfig,
  withBasePath
} from "@/lib/site-data";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}/`
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: buildAbsoluteUrl(`/projects/${project.slug}/`),
      type: "article",
      images: [buildAbsoluteUrl(`/projects/${project.slug}/opengraph-image`)]
    }
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const projectContent = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  const projectSchema = [
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
      { name: project.title, path: `/projects/${project.slug}/` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        sameAs: siteConfig.sameAs
      },
      ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
      about: project.stack,
      image: buildAbsoluteUrl(withBasePath(project.media.src)),
      url: buildAbsoluteUrl(`/projects/${project.slug}/`)
    }
  ];

  const overviewItems = [
    { label: "Maturity", value: project.maturity },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    ...(project.updatedAt ? [{ label: "Updated", value: formatPublishedDate(project.updatedAt) }] : []),
    { label: "Stack", value: `${project.stack.length} technologies` }
  ];

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main article-main">
      <StructuredData data={projectSchema} />
      <AnimateIn className="project-detail-hero" delay={0.05}>
        <div className="project-detail-hero-copy">
          <Link href="/projects/" className="back-link">
            Back to projects
          </Link>
          <div className="project-detail-topline">
            <p className="eyebrow">
              {project.category} • {project.year}
            </p>
            {project.featured ? <span className="project-badge">Featured project</span> : null}
            <span className="project-badge project-badge-muted">{project.maturity}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="muted hero-copy">{project.summary}</p>
          <p className="project-detail-lead">{project.impact}</p>
        </div>

        <aside className="project-detail-hero-aside">
          <div className="project-overview-card">
            <p className="eyebrow">At a glance</p>
            <div className="project-overview-grid">
              {overviewItems.map((item) => (
                <div key={item.label} className="project-overview-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="project-overview-card">
            <p className="eyebrow">Proof</p>
            <p className="muted">{project.proofLine}</p>
            <div className="proof-badge-row">
              {project.proofBadges.map((badge) => (
                <span key={badge} className="proof-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {project.links?.length ? (
            <div className="project-overview-card">
              <p className="eyebrow">References</p>
              <div className="project-overview-links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </AnimateIn>

      <article className="surface article-shell project-article-shell">
        <AnimateIn className="article-section project-media-section" delay={0.06}>
          <div className="project-diagram-shell">
            <div className="project-diagram-head">
              <div className="project-diagram-copy">
                <p className="eyebrow">Architecture Diagram</p>
                <h2>How the system fits together</h2>
                <p className="muted">
                  This visual is meant to show the operating shape of the project at a glance:
                  where input begins, where decisions happen, and what the useful output surface
                  actually is.
                </p>
              </div>

              <div className="project-diagram-meta">
                <div className="project-diagram-stat">
                  <span>Scope</span>
                  <strong>{project.category}</strong>
                </div>
                <div className="project-diagram-stat">
                  <span>Signals</span>
                  <strong>{project.metrics?.[0]?.value ?? `${project.stack.length} tools`}</strong>
                </div>
              </div>
            </div>

            <div className="media-frame media-frame-wide project-hero-diagram-frame">
              <Image
                src={withBasePath(project.media.src)}
                alt={project.media.alt}
                width={1200}
                height={675}
                className="project-media project-media-diagram"
                priority={project.featured}
              />
            </div>

            <p className="project-diagram-caption">{project.media.alt}</p>
          </div>
        </AnimateIn>

        {project.metrics?.length ? (
          <AnimateIn className="article-section" delay={0.08}>
            <div className="section-heading project-section-heading">
              <p className="eyebrow">Snapshot</p>
              <h2>What matters most in this project</h2>
            </div>
            <div className="metric-grid project-metric-grid">
              {project.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        ) : null}

        <AnimateIn className="article-section project-story-grid" delay={0.1}>
          <section className="article-panel">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>
          <section className="article-panel article-panel-accent">
            <h2>Result</h2>
            <p>{project.result}</p>
          </section>
        </AnimateIn>

        {projectContent ? (
          <AnimateIn className="article-section rich-content" delay={0.11}>
            <div className="section-heading project-section-heading">
              <p className="eyebrow">Case Study</p>
              <h2>Problem, architecture, artifacts, and operating signals</h2>
            </div>
            <RichContent blocks={projectContent.blocks} />
          </AnimateIn>
        ) : null}

        <ProjectDemo slug={project.slug} />

        <AnimateIn className="article-section project-story-grid" delay={0.12}>
          <section className="article-panel">
            <h2>Approach</h2>
            <ul className="bullet-list article-bullets">
              {project.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>

          {project.architecture?.length ? (
            <section className="article-panel">
              <h2>Architecture</h2>
              <ul className="bullet-list article-bullets">
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </AnimateIn>

        <AnimateIn className="article-section project-story-grid" delay={0.16}>
          <section className="article-panel">
            <h2>Impact</h2>
            <p>{project.impact}</p>
            <ul className="bullet-list article-bullets">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>

          {project.tradeoffs?.length ? (
            <section className="article-panel">
              <h2>Tradeoffs and Decisions</h2>
              <ul className="bullet-list article-bullets">
                {project.tradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="article-panel">
              <h2>Project focus</h2>
              <p>This case study emphasizes system decisions, implementation shape, and the operational choices that made the work publishable and useful.</p>
            </section>
          )}
        </AnimateIn>

        <AnimateIn className="article-section project-stack-section" delay={0.2}>
          <div className="project-stack-shell">
            <div className="project-stack-copy">
              <p className="eyebrow">Stack</p>
              <h2>Tools and technologies behind the work</h2>
            </div>
            <div className="tag-row">
              {project.stack.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </article>
    </main>
  );
}
