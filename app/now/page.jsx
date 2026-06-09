import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  formatPublishedDate,
  nowSnapshot,
  siteConfig
} from "@/lib/site-data";

const nowDescription =
  "What Atharva Gham is building, studying, and reading right now: a maintained snapshot of current focus across security and systems work.";

export const metadata = {
  title: "Now",
  description: nowDescription,
  alternates: {
    canonical: "/now/"
  }
};

const nowSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Now", path: "/now/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${siteConfig.name}: Now`,
    url: buildAbsoluteUrl("/now/"),
    description: nowDescription
  }
];

const columns = [
  { key: "building", eyebrow: "Building", title: "What I am shipping" },
  { key: "studying", eyebrow: "Studying", title: "What I am learning" },
  { key: "reading", eyebrow: "Reading", title: "What I am following" }
];

export default function NowPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={nowSchema} />
      <PageHero
        eyebrow="Now"
        title="What I am focused on right now."
        copy={nowSnapshot.intro}
        actions={[
          { label: "See the projects", href: "/projects/", variant: "primary" },
          { label: "Read the writing", href: "/blog/", variant: "secondary" }
        ]}
      />

      <section className="section-block">
        <p className="now-updated muted">
          Last updated{" "}
          <time dateTime={nowSnapshot.updated}>{formatPublishedDate(nowSnapshot.updated)}</time>. Inspired by the{" "}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-link">
            /now page
          </a>{" "}
          movement.
        </p>

        <div className="now-columns">
          {columns.map((column, index) => (
            <AnimateIn key={column.key} className="surface panel-card now-column" delay={0.06 + index * 0.05}>
              <p className="eyebrow">{column.eyebrow}</p>
              <h2>{column.title}</h2>
              <ul className="bullet-list">
                {nowSnapshot[column.key].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="surface panel-card now-cta" delay={0.2}>
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h2>This page changes as the work does.</h2>
            <p className="muted">
              Want the deeper version? The projects and writing carry the full evidence behind each
              line above.
            </p>
          </div>
          <div className="cta-row">
            <Link href="/projects/" className="button button-primary">
              Browse case studies
            </Link>
            <Link href="/about/" className="button button-secondary">
              How I work
            </Link>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
