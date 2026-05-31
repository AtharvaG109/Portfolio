import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { ContactPanel } from "@/components/contact-panel";
import { ProjectPreviewDiagram } from "@/components/project-preview-diagram";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { getSortedContent } from "@/lib/content";
import {
  buildAbsoluteUrl,
  formatPublishedDate,
  getFeaturedProject,
  getNewestProject,
  hero,
  principles,
  roleFitCards,
  siteConfig,
  stats
} from "@/lib/site-data";

const featuredProject = getFeaturedProject();
const newestProject = getNewestProject();
const latestPost = getSortedContent("blog")[0] ?? null;
const heroProofChips = [
  "Offensive security",
  "Detection engineering",
  "AI security",
  "Secure systems"
];
const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortName,
    alternateName: "Portfolio Page",
    url: buildAbsoluteUrl("/")
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: buildAbsoluteUrl("/"),
    image: buildAbsoluteUrl("/social-preview.svg"),
    jobTitle: "Security Engineer",
    knowsAbout: [
      "Software security",
      "Offensive security",
      "Application security",
      "Detection engineering",
      "AI security",
      "Secure CI/CD",
      "Reverse engineering",
      "Incident response"
    ],
    sameAs: siteConfig.sameAs
  }
];

export default function HomePage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={homepageSchema} />
      <section className="hero-shell">
        <AnimateIn className="hero-copy-block" delay={0.04}>
          <div className="hero-topline">
            <p className="eyebrow">{hero.eyebrow}</p>
          </div>

          <h1>{hero.headline}</h1>
          <p className="hero-copy muted">{hero.summary}</p>

          <div className="hero-proof-chips" aria-label="Core technical signals">
            {heroProofChips.map((chip) => (
              <span key={chip} className="hero-proof-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="cta-row">
            {hero.actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`button ${action.variant === "primary" ? "button-primary" : "button-secondary"
                  }`}
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="hero-utility-grid" aria-label="Contact links">
            {hero.utilityLinks.map((link) => (
              link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="hero-utility-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="micro-label">{link.label}</span>
                  <span>{link.value}</span>
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="hero-utility-link">
                  <span className="micro-label">{link.label}</span>
                  <span>{link.value}</span>
                </Link>
              )
            ))}
          </div>
        </AnimateIn>

        <AnimateIn className="surface hero-aside" delay={0.12}>
          <div className="hero-aside-grid">
            <article className="hero-glance-card hero-glance-featured">
              <p className="micro-label">What drives me</p>
              <h2>{hero.mission}</h2>
              <p className="muted">
                I care about work that can be explained from evidence, operated under pressure, and improved after it ships.
              </p>
            </article>

            <article className="hero-glance-card">
              <p className="micro-label">Current focus</p>
              <ul className="bullet-list compact-list">
                {hero.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="hero-glance-card">
              <p className="micro-label">How I work</p>
              <div className="mini-principles">
                {principles.map((principle) => (
                  <div key={principle.title} className="mini-principle">
                    <strong>{principle.title}</strong>
                    <span>{principle.signal}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </AnimateIn>
      </section>

      {latestPost || newestProject ? (
        <section className="section-block now-strip" aria-label="Recent activity">
          <div className="now-grid">
            {latestPost ? (
              <article className="surface panel-card now-card">
                <p className="micro-label">Latest writing</p>
                <h3>
                  <Link href={`/blog/${latestPost.slug}/`} className="text-link">
                    {latestPost.title}
                  </Link>
                </h3>
                <p className="muted">{latestPost.excerpt}</p>
                <p className="micro-label">
                  {latestPost.category}
                  {latestPost.publishedAt ? ` • ${formatPublishedDate(latestPost.publishedAt)}` : ""}
                </p>
              </article>
            ) : null}
            {newestProject ? (
              <article className="surface panel-card now-card">
                <p className="micro-label">Newest project</p>
                <h3>
                  <Link href={`/projects/${newestProject.slug}/`} className="text-link">
                    {newestProject.title}
                  </Link>
                </h3>
                <p className="muted">{newestProject.proofLine ?? newestProject.summary}</p>
                <p className="micro-label">
                  {newestProject.category}
                  {newestProject.year ? ` • ${newestProject.year}` : ""}
                </p>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <div className="signal-grid" aria-label="Key portfolio metrics">
          {stats.map((item, index) => (
            <AnimateIn key={item.label} className="surface signal-card" delay={0.08 + index * 0.04}>
              <p className="signal-value">{item.value}</p>
              <p className="muted">{item.label}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="What I do"
            title="Break it, catch it, build it."
            copy="Software security across the full lifecycle — offensive testing, detection and response, and secure system design — backed by deep software engineering."
          />
        </AnimateIn>

        <div className="capability-grid">
          {roleFitCards.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Technical area</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
              <p className="route-card-signal">{item.signal}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="detail-grid">
          {featuredProject ? (
            <AnimateIn className="surface panel-card" delay={0.08}>
              <div className="project-label-row">
                <p className="eyebrow">Featured project</p>
                {featuredProject.slug === newestProject?.slug ? (
                  <span className="project-badge">Newest project</span>
                ) : null}
              </div>
              <h2>{featuredProject.title}</h2>
              <p className="muted panel-copy">{featuredProject.summary}</p>
              <div className="media-frame project-preview-frame">
                <ProjectPreviewDiagram project={featuredProject} variant="feature" />
              </div>
              <p className="project-impact">{featuredProject.challenge}</p>
              <div className="tag-row">
                {featuredProject.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              <div className="cta-row compact-actions">
                <Link href="/projects/" className="button button-secondary">
                  Browse all projects
                </Link>
                <Link href={`/projects/${featuredProject.slug}/`} className="button button-primary">
                  Open case study
                </Link>
              </div>
            </AnimateIn>
          ) : null}

          {latestPost ? (
            <AnimateIn className="surface panel-card" delay={0.14}>
              <p className="eyebrow">Latest writing</p>
              <h2>{latestPost.title}</h2>
              <p className="muted panel-copy">{latestPost.excerpt}</p>
              <div className="preview-item standalone-preview">
                <div className="preview-head">
                  <h3>{latestPost.category}</h3>
                  <span>{latestPost.readTime}</span>
                  <time dateTime={latestPost.publishedAt}>
                    {formatPublishedDate(latestPost.publishedAt)}
                  </time>
                </div>
                <p className="muted">{latestPost.excerpt}</p>
              </div>
              <div className="cta-row compact-actions">
                <Link href="/blog/" className="button button-secondary">
                  Browse writing
                </Link>
                <Link href={`/blog/${latestPost.slug}/`} className="button button-primary">
                  Read note
                </Link>
              </div>
            </AnimateIn>
          ) : null}
        </div>
      </section>

      <section className="section-block" id="contact">
        <AnimateIn delay={0.08}>
          <ContactPanel />
        </AnimateIn>
      </section>
    </main>
  );
}
