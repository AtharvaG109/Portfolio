import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { ContactPanel } from "@/components/contact-panel";
import { CountUp } from "@/components/count-up";
import { CredentialsRow } from "@/components/credentials-row";
import { CuriosityTrail } from "@/components/curiosity-trail";
import { HeroHeadline } from "@/components/hero-headline";
import { HeroParallax } from "@/components/hero-parallax";
import { Magnetic } from "@/components/magnetic";
import { ProjectStoryboard } from "@/components/project-storyboard";
import { ScrambleText } from "@/components/scramble-text";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { TiltCard } from "@/components/tilt-card";
import { getSortedContent } from "@/lib/content";
import {
  buildAbsoluteUrl,
  curiosityTrails,
  formatPublishedDate,
  getFeaturedProject,
  getNewestProject,
  getRecentProjects,
  hero,
  roleFitCards,
  siteConfig,
  stats
} from "@/lib/site-data";

const featuredProject = getFeaturedProject();
const newestProject = getNewestProject();
const recentProjects = getRecentProjects(4);
const latestPost = getSortedContent("blog")[0] ?? null;
const heroProofChips = [
  "Local-first products",
  "Security engineering",
  "Deterministic decision support",
  "Proof before claims"
];
const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: [`${siteConfig.name} Portfolio`, "Portfolio Page"],
    url: buildAbsoluteUrl("/")
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    givenName: "Atharva",
    familyName: "Gham",
    url: buildAbsoluteUrl("/"),
    image: buildAbsoluteUrl("/og.png"),
    jobTitle: "Software Security Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "California",
      addressCountry: "US"
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Maryland, College Park"
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Vishwakarma University, Pune"
      }
    ],
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
        <AnimateIn className="hero-copy-block" delay={0.04} blur={false}>
          <div className="hero-topline">
            <ScrambleText as="p" className="eyebrow" text={hero.eyebrow} delay={0.3} />
          </div>

          <HeroHeadline
            text={hero.headline}
            highlights={["ambitious", "claim", "prove"]}
          />
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
              <Magnetic key={action.label}>
                <Link
                  href={action.href}
                  className={`button ${action.variant === "primary" ? "button-primary" : "button-secondary"
                    }`}
                >
                  {action.label}
                </Link>
              </Magnetic>
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

        <HeroParallax className="hero-aside-wrap">
          <TiltCard>
            <AnimateIn className="surface hero-aside hero-release-card" delay={0.12}>
              <div className="release-card-head">
                <p className="micro-label">Current release window</p>
                <span>JUL / 2026</span>
              </div>

              <div className="hero-release-lead">
                <span className="release-pulse" aria-hidden="true" />
                <div>
                  <p className="micro-label">Portfolio signal</p>
                  <h2>{hero.mission}</h2>
                </div>
              </div>

              <div className="hero-release-metrics" aria-label="Current portfolio proof">
                <div>
                  <strong>18</strong>
                  <span>documented builds</span>
                </div>
                <div>
                  <strong>430+</strong>
                  <span>automated tests</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>new case studies</span>
                </div>
              </div>

              <div className="hero-release-list">
                {recentProjects.slice(0, 3).map((project, index) => (
                  <Link key={project.slug} href={`/projects/${project.slug}/`} className="hero-release-row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{project.title}</strong>
                      <small>{project.metrics?.[0]?.value ?? project.category}</small>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>

              <div className="hero-release-footer">
                <span>Local evidence reviewed</span>
                <span>Updated Jul 24</span>
              </div>
            </AnimateIn>
          </TiltCard>
        </HeroParallax>
      </section>

      <section className="section-block release-ledger-section" aria-label="Recent project releases">
        <AnimateIn delay={0.04}>
          <SectionHeading
            index="00"
            eyebrow="New since the last portfolio release"
            title="Three new builds. Three different proof paths."
            copy="Clinical workflow, defensive training, and native macOS product engineering—each shown with current maturity, safety boundaries, and validation evidence."
          />
        </AnimateIn>

        <div className="release-ledger-grid">
          {recentProjects.map((project, index) => (
            <AnimateIn
              key={project.slug}
              className="surface release-ledger-card"
              delay={0.06 + index * 0.04}
            >
              <div className="release-ledger-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.category}</span>
              </div>
              <div>
                <p className="micro-label">{project.maturity}</p>
                <h3>
                  <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
                </h3>
              </div>
              <p className="muted">{project.proofLine}</p>
              <div className="release-ledger-proof">
                <strong>{project.metrics?.[0]?.value}</strong>
                <span>{project.metrics?.[0]?.label}</span>
              </div>
              <div className="release-ledger-stack">
                {project.focusTags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}/`} className="text-link">
                Read case study
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="signal-grid" aria-label="Key portfolio metrics">
          {stats.map((item, index) => (
            <AnimateIn key={item.label} className="surface signal-card" delay={0.08 + index * 0.04}>
              <CountUp className="signal-value" value={item.value} />
              <p className="muted">{item.label}</p>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={0.12}>
          <CredentialsRow />
        </AnimateIn>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            index="01"
            eyebrow="What I do"
            title="Break it, catch it, build it."
            copy="Software security across the full lifecycle: offensive testing, detection and response, and secure system design, grounded in deep software engineering."
          />
        </AnimateIn>

        <div className="capability-bento">
          {roleFitCards.map((item, index) => (
            <AnimateIn
              key={item.title}
              className={`surface capability-card depth-card bento-card ${index === 0 ? "bento-card-feature" : ""}`}
              delay={0.08 + index * 0.05}
            >
              <p className="micro-label">Technical area</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
              <p className="route-card-signal">{item.signal}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <CuriosityTrail trails={curiosityTrails} />
        </AnimateIn>
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
              <ProjectStoryboard project={featuredProject} variant="compact" />
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
                  Read the note
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
