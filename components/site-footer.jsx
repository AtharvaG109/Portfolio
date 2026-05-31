import Link from "next/link";

import { siteConfig, withBasePath } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-shell">
        <div className="footer-copy">
          <p className="footer-title">{siteConfig.shortName}</p>
          <p className="muted">
            Software security engineer in {siteConfig.location}, working across offensive testing,
            detection engineering, AI security, and secure system design.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/about/">About</Link>
          <Link href="/experience/">Experience</Link>
          <Link href="/projects/">Projects</Link>
          <Link href="/labs/">Labs</Link>
          <Link href="/workbench/">Workbench</Link>
          <Link href="/blog/">Writing</Link>
          <Link href="/resume/">Resume</Link>
          <Link href="/contact/">Contact</Link>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={withBasePath("/feed.xml")}>RSS</a>
        </div>
      </div>
    </footer>
  );
}
