import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { ResumePrintButton } from "@/components/resume-print-button";
import { certifications, education, experience, siteConfig, toolGroups, withBasePath } from "@/lib/site-data";

export const metadata = {
  title: "Resume",
  description: "Resume and credentials for Atharva Gham."
};

export default function ResumePage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main resume-main">
      <AnimateIn className="resume-toolbar" delay={0.05}>
        <div>
          <p className="eyebrow">Resume</p>
          <h1>{siteConfig.name}</h1>
          <p className="muted">{siteConfig.location} • Backend, platform, security, and systems engineering • Private technical contact flow</p>
        </div>

        <div className="cta-row">
          <a href={withBasePath("/resume/Atharva_Gham_Resume.txt")} download className="button button-primary">
            Download text resume
          </a>
          <Link href="/contact/" className="button button-secondary">
            Start conversation
          </Link>
          <ResumePrintButton />
        </div>
      </AnimateIn>

      <AnimateIn className="surface resume-sheet" delay={0.08}>
        <section className="resume-section">
          <h2>Profile</h2>
          <p>
            Software engineer with hands-on depth in backend systems, platform reliability,
            observability, security automation, low-level systems analysis, and secure delivery
            workflows. Strongest in environments that need technical ownership from design through
            rollout, debugging, and post-release hardening.
          </p>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {experience.map((item) => (
            <article key={item.role} className="resume-entry">
              <div className="resume-entry-head">
                <h3>
                  {item.role} • {item.company}
                </h3>
                <p>{item.period}</p>
              </div>
              <p className="muted">{item.location}</p>
              <p>{item.summary}</p>
              <ul className="bullet-list">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-section resume-grid">
          <div>
            <h2>Education</h2>
            {education.map((item) => (
              <article key={item.degree} className="resume-entry">
                <div className="resume-entry-head">
                  <h3>{item.degree}</h3>
                  <p>{item.period}</p>
                </div>
                <p>{item.school}</p>
                <p className="muted">{item.details}</p>
              </article>
            ))}
          </div>

          <div>
            <h2>Certifications</h2>
            {certifications.map((item) => (
              <article key={item.name} className="resume-entry">
                <h3>{item.name}</h3>
                <p>{item.issuer}</p>
                <p className="muted">{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
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
        </section>
      </AnimateIn>
    </main>
  );
}
