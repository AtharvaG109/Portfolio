import Image from "next/image";

import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  siteConfig,
  toolGroups,
  withBasePath
} from "@/lib/site-data";

const aboutDescription =
  "About Atharva Gham, a software security engineer working across offensive testing, detection engineering, AI security, and secure system design, backed by deep software engineering.";

export const metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about/"
  }
};

const aboutSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: buildAbsoluteUrl("/about/"),
    jobTitle: "Security Engineer",
    description: aboutDescription,
    sameAs: siteConfig.sameAs
  }
];

const profileVisuals = [
  {
    title: "UMD campus before a storm - College Park, MD",
    src: "/media/about-umd-campus-building.jpg",
    alt: "Brick University of Maryland campus building with a white cupola under dark storm clouds.",
    note: "Graduate work in Cybersecurity Engineering made security feel like an engineering discipline, not a checklist."
  },
  {
    title: "McKeldin Mall at dusk",
    src: "/media/about-umd-mall-local.jpg",
    alt: "Wide view across McKeldin Mall at the University of Maryland under a blue evening sky.",
    note: "The place where secure systems, assumptions, evidence, and operational design became part of the same conversation."
  }
];

const aboutStrengths = [
  {
    title: "Backend and Platform Systems",
    body:
      "APIs, workers, queues, and service boundaries designed with failure modes in mind. I think about rollout, fallback, and support paths while the design is still being shaped."
  },
  {
    title: "Observability-Led Debugging",
    body:
      "I reach for traces, logs, metrics, and packet captures before forming a theory. Evidence first, then a fix."
  },
  {
    title: "Security That Ships",
    body:
      "CI checks, policy gates, IAM hygiene, and detection logic that engineering teams can actually maintain. Not security theater."
  },
  {
    title: "Low-Level Curiosity",
    body:
      "Comfortable enough with Linux, networking, and memory to keep digging when the bug lives below the application layer."
  }
];

const workingPrinciples = [
  {
    title: "Operate What You Build",
    body:
      "I try to leave systems easier to operate than I found them. That means useful logs, clear runbooks, and defaults that make the safe path the obvious one.",
    signal: "The work is not done if the next engineer cannot reason about it."
  },
  {
    title: "Be Precise Under Ambiguity",
    body:
      "In incidents, security reviews, and technical handoffs, I would rather be precise about what we know and what we do not than oversell a guess.",
    signal: "Good context saves more time than confident wrong answers."
  },
  {
    title: "Use Evidence First",
    body:
      "When behavior is unclear, I reach for traces, logs, packets, source, and tests instead of debating from memory.",
    signal: "It keeps fixes defensible."
  }
];

const aboutDepthCards = [
  {
    title: "Architecture to Operations",
    body:
      "I think about deployability, fallback behavior, telemetry, and support paths while the design is still being shaped.",
    signal: "The result is less cleanup after launch."
  },
  {
    title: "Security as Engineering Quality",
    body:
      "Threat models, defaults, and guardrails work best when they are built into the flow of delivery.",
    signal: "That makes risk easier to find, explain, and reduce."
  },
  {
    title: "Communication That Lowers Friction",
    body:
      "I write notes and summaries so another engineer can understand the decision, reproduce the issue, or continue the work.",
    signal: "Good context saves time when the work gets complicated."
  }
];

const interestNotes = [
  {
    title: "Systems and Linux",
    body: "Processes, networking, memory, and the OS behavior behind service failures."
  },
  {
    title: "Security Research",
    body:
      "Exploit mechanics, incident writeups, detection ideas, and defensive patterns that survive real constraints."
  },
  {
    title: "AI Security",
    body:
      "How tool-using agents fail, where trust boundaries move, and how to make automation auditable."
  },
  {
    title: "Distributed Systems",
    body:
      "Queues, concurrency, resilience, and observability in services that cannot rely on a single happy path."
  }
];

const howIThink = [
  "Start from observable behavior, not assumptions.",
  "Prefer systems that are testable, debuggable, and explainable after launch.",
  "Treat security as an engineering property, not a separate checklist.",
  "Use traces, logs, packets, tests, threat models, and failure cases as proof."
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={aboutSchema} />
      <PageHero
        eyebrow="About"
        title="I make software harder to attack - and easier to defend when something gets through."
        copy="My best work sits close to runtime behavior: finding flaws, catching them in production, and building security controls that hold up under real traffic and real adversaries."
        actions={[
          { label: "View experience", href: "/experience/", variant: "primary" },
          { label: "Start technical conversation", href: "/contact/", variant: "secondary" }
        ]}
      />

      <section className="section-block">
        <div className="detail-grid">
          <AnimateIn className="surface panel-card" delay={0.04}>
            <p className="eyebrow">The Through-Line</p>
            <h2>The work usually starts where the first explanation is not enough.</h2>
            <p className="muted panel-copy">
              I am drawn to systems where the easy answer is usually incomplete: a slow service, a
              noisy alert stream, a fragile release, an unsafe automation path, or a binary that
              behaves differently than expected.
            </p>
            <p className="muted panel-copy">
              That is why my work keeps crossing backend engineering, observability, security
              automation, low-level debugging, and AI security. I like building things, but I also
              like proving how they behave.
            </p>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.1}>
            <p className="eyebrow">How I Think</p>
            <h2>Evidence first, then the fix.</h2>
            <ul className="bullet-list">
              {howIThink.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="University of Maryland"
            title="The place that made security feel like engineering."
            copy="My graduate work at UMD in Cybersecurity Engineering made security feel less like a checklist and more like an engineering discipline: understand the system, test assumptions, look at the evidence, and leave the design easier to operate."
          />
        </AnimateIn>

        <div className="about-visual-grid">
          <AnimateIn className="surface about-photo-gallery" delay={0.08}>
            {profileVisuals.map((item) => (
              <figure key={item.src} className="about-photo-card">
                <Image
                  src={withBasePath(item.src)}
                  alt={item.alt}
                  width={1800}
                  height={1350}
                  className="about-profile-image"
                  sizes="(max-width: 860px) 100vw, 50vw"
                  priority={item.src.includes("campus-building")}
                />
                <figcaption>
                  <span>{item.title}</span>
                  <small>{item.note}</small>
                </figcaption>
              </figure>
            ))}
          </AnimateIn>

          <AnimateIn className="surface about-photo-panel" delay={0.14}>
            <p className="eyebrow">Background</p>
            <h2>College Park is where the work became more concrete.</h2>
            <p className="muted">
              That approach shows up directly in how I build now: clearer threat models, better
              observability, safer defaults, and fewer assumptions left untested.
            </p>
            <div className="about-photo-note-grid">
              <article>
                <p className="micro-label">Graduate focus</p>
                <p>M.Eng. work in Cybersecurity Engineering at the University of Maryland, College Park.</p>
              </article>
              <article>
                <p className="micro-label">How it shows up</p>
                <p>Clearer threat models, better observability, and safer defaults.</p>
              </article>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <div className="about-intro-grid">
          <AnimateIn className="surface panel-card about-story-panel" delay={0.06}>
            <p className="eyebrow">Who I Am</p>
            <h2>I like the parts of engineering where small decisions show up later.</h2>
            <p className="about-lead">
              I am drawn to the parts of engineering where small decisions show up later: in latency,
              failures, alerts, and security posture. I would rather get close enough to a system to
              explain what is happening than patch a symptom and move on.
            </p>
            <div className="about-story-grid">
              <article className="about-story-note">
                <p>
                  Security fits that same instinct. The best controls do not live in a separate doc
                  nobody trusts - they reduce uncertainty for the engineers who actually ship the
                  product.
                </p>
              </article>
              <article className="about-story-note about-story-note-accent">
                <p className="micro-label">How I build</p>
                <p>
                  I build with security in mind from the start, not as cleanup after the main design
                  has already hardened.
                </p>
              </article>
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card about-aim-panel" delay={0.12}>
            <p className="eyebrow">Next</p>
            <h2>Where that pattern shows up.</h2>
            <div className="about-aim-list">
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Backend and platform systems where latency, queues, rollouts, telemetry, and failure behavior have to be understood together.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Security automation that turns risk into guardrails, detection logic, audit trails, and clear remediation paths.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Runtime-heavy debugging work where traces, logs, packets, tests, and failure cases explain what is actually happening.</p>
              </article>
            </div>
            <div className="about-signal-strip" aria-label="Signals I optimize for">
              <span>Reliability</span>
              <span>Evidence</span>
              <span>Maintainability</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Capabilities"
            title="The technical habits behind the projects."
            copy="The useful part is connecting implementation details with runtime behavior, support paths, and security tradeoffs."
          />
        </AnimateIn>

        <div className="overview-grid">
          <div className="capability-grid">
            {aboutStrengths.map((card, index) => (
              <AnimateIn key={card.title} className="surface capability-card" delay={0.08 + index * 0.04}>
                <p className="micro-label">Capability</p>
                <h3>{card.title}</h3>
                <p className="muted">{card.body}</p>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="surface home-collaboration-shell about-values-shell" delay={0.16}>
            <div className="home-collaboration-head">
              <div>
                <p className="eyebrow">Working style</p>
                <h2>Leave the system easier to operate than I found it.</h2>
              </div>
              <p className="muted home-collaboration-copy">
                Useful logs, clear runbooks, and safe defaults matter because the hard part often
                starts after the first successful deploy.
              </p>
            </div>

            <div className="home-collaboration-grid">
              {workingPrinciples.map((principle) => (
                <article key={principle.title} className="home-collaboration-card">
                  <p className="micro-label">{principle.title}</p>
                  <p>{principle.body}</p>
                  <p className="muted">{principle.signal}</p>
                </article>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Depth"
            title="How I keep broad work from becoming vague."
            copy="I try to connect each layer to something visible: a metric, a failure mode, a security boundary, a deployment risk, or a clear handoff."
          />
        </AnimateIn>

        <div className="capability-grid">
          {aboutDepthCards.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Operating layer</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
              <p className="depth-signal">{item.signal}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="detail-grid">
          <AnimateIn className="surface panel-card" delay={0.08}>
            <p className="eyebrow">Interests</p>
            <h2>The areas I keep studying because they make me better on real projects.</h2>
            <div className="interest-stack">
              {interestNotes.map((item) => (
                <article key={item.title} className="interest-item">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.body}</p>
                </article>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.14}>
            <p className="eyebrow">Technical range</p>
            <h2>The tools I keep reaching for.</h2>
            <div className="preview-list compact-preview-list">
              {toolGroups.map((group) => (
                <article key={group.title} className="preview-item">
                  <div className="preview-head preview-head-column">
                    <h3>{group.title}</h3>
                    <span>{group.items.length} tools</span>
                  </div>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
