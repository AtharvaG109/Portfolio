import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { ContactPanel } from "@/components/contact-panel";
import { ProjectPreviewDiagram } from "@/components/project-preview-diagram";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { getSortedContent } from "@/lib/content";
import {
  buildAbsoluteUrl,
  buildThemes,
  engineeringSignals,
  formatPublishedDate,
  getFeaturedProject,
  getNewestProject,
  hero,
  pathwayCards,
  principles,
  roleFitCards,
  selectedWins,
  siteConfig,
  stats
} from "@/lib/site-data";

const featuredProject = getFeaturedProject();
const newestProject = getNewestProject();
const latestPost = getSortedContent("blog")[0] ?? null;
const currentThreads = [
  "Publishing tinyc as a production-ready self-hosting C compiler with repeatable ABI, integration, sanitizer, and bootstrap checks.",
  "Making public project pages easier to audit by showing maturity, proof, and tradeoffs upfront.",
  "Looking for backend, platform, and security roles where reliability, runtime evidence, and ownership matter.",
  "Studying low-level systems and threat-modeling patterns that translate into better delivery habits."
];
const collaborationSignals = [
  {
    title: "I stay close to runtime behavior",
    body:
      "I like working where telemetry, packet flow, release safety, and production debugging are part of the day-to-day job instead of cleanup after the fact."
  },
  {
    title: "I care about systems that are explainable",
    body:
      "A backend service or security workflow is only half-finished if nobody can reason about it once it is running under pressure."
  },
  {
    title: "I am comfortable with technical depth",
    body:
      "When the fast answer is wrong, I am happy to go lower: traces, logs, packet captures, binaries, kernel behavior, and the actual mechanism behind the problem."
  }
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
    jobTitle: "Software Engineer",
    knowsAbout: [
      "Backend engineering",
      "Platform engineering",
      "Observability",
      "Security automation",
      "AI security",
      "Secure CI/CD",
      "Reverse engineering",
      "Application security"
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
            <span className="availability-pill">Open to backend, platform, software, and security roles</span>
          </div>

          <h1>{hero.headline}</h1>
          <p className="hero-copy muted">{hero.summary}</p>

          <div className="cta-row">
            {hero.actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`button ${
                  action.variant === "primary" ? "button-primary" : "button-secondary"
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

      <section className="section-block">
        <div className="home-editorial-grid">
          <AnimateIn className="surface panel-card identity-feature-panel" delay={0.05}>
            <p className="eyebrow">Who I Am</p>
            <h2>A systems-minded engineer who likes being close to the real behavior of software.</h2>
            <p className="identity-lead">
              I am most comfortable in backend and platform work where the real details matter:
              service behavior, instrumentation, packet flow, debugging, release safety, and the
              security controls around all of that.
            </p>
            <div className="identity-split">
              <article className="identity-note">
                <p>
                  I like understanding why systems behave the way they do, especially when the
                  answer sits below the surface symptom. That is why a lot of my work naturally
                  pulls me toward observability, runtime evidence, security tooling, and low-level
                  debugging.
                </p>
              </article>
              <article className="identity-note identity-note-quote">
                <p className="micro-label">What matters to me</p>
                <p>
                  Clean architecture matters, but I care just as much about whether the system is
                  legible, debuggable, and trustworthy when it is under real load.
                </p>
              </article>
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card identity-side-panel" delay={0.11}>
            <p className="eyebrow">What I Am Focused On</p>
            <h2>What is shaping the work I want to do next.</h2>
            <div className="identity-stack">
              {currentThreads.map((item) => (
                <article key={item} className="identity-thread">
                  <span className="identity-thread-mark" aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="signal-grid" aria-label="Key portfolio metrics">
        {stats.map((item, index) => (
          <AnimateIn key={item.label} className="surface signal-card" delay={0.08 + index * 0.04}>
            <p className="signal-value">{item.value}</p>
            <p className="muted">{item.label}</p>
          </AnimateIn>
        ))}
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Hiring Snapshot"
            title="Where I am most relevant for modern engineering teams."
            copy="The through-line is practical systems ownership: services that run reliably, security controls that fit delivery, and debugging habits grounded in evidence."
          />
        </AnimateIn>

        <div className="capability-grid">
          {roleFitCards.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Role fit</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
              <p className="route-card-signal">{item.signal}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="What I Build"
            title="The kind of work I want to keep doing."
            copy="I am at my best when the work spans implementation, runtime behavior, operations, and security instead of ending at the first shipped version."
          />
        </AnimateIn>

        <div className="capability-grid">
          {buildThemes.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Scope</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="How I Work"
            title="How I usually add value."
            copy="I tend to help most when a team needs someone who can design carefully, debug from evidence, and stay with the operational details after launch."
          />
        </AnimateIn>

        <div className="capability-grid">
          {engineeringSignals.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Strength</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn className="surface home-collaboration-shell" delay={0.06}>
          <div className="home-collaboration-head">
            <div>
              <p className="eyebrow">Why Teams Pull Me In</p>
              <h2>The situations where I usually become most useful.</h2>
            </div>
            <p className="muted home-collaboration-copy">
              This is the kind of work I want more of: systems that need real reasoning, clear
              communication, and someone willing to stay with the problem until it makes sense.
            </p>
          </div>

          <div className="home-collaboration-grid">
            {collaborationSignals.map((item) => (
              <article key={item.title} className="home-collaboration-card">
                <p className="micro-label">Signal</p>
                <h3>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </article>
            ))}
          </div>
        </AnimateIn>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Selected Outcomes"
            title="A few concrete results."
            copy="These numbers are the shorthand version of how I usually contribute: less guesswork, less toil, and fewer fragile releases."
          />
        </AnimateIn>

        <div className="proof-grid impact-grid">
          {selectedWins.map((item, index) => (
            <AnimateIn key={item.label} className="library-group impact-card" delay={0.08 + index * 0.05}>
              <p className="impact-value">{item.value}</p>
              <p className="muted">{item.label}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Explore"
            title="The rest of the site."
            copy="The About page explains who I am, Projects shows the strongest work, Workbench covers how I study systems and security, and the resume is the quick summary."
          />
        </AnimateIn>

        <div className="route-grid">
          {pathwayCards.map((card, index) => (
            <AnimateIn key={card.title} className="surface route-card" delay={0.08 + index * 0.04}>
              <p className="micro-label">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p className="muted">{card.body}</p>
              <p className="route-card-signal">{card.signal}</p>
              <Link href={card.href} className="text-link">
                Open {card.title.toLowerCase()}
              </Link>
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
