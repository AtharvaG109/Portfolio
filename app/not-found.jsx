import Link from "next/link";

const suggestions = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
  { label: "Writing", href: "/blog/" },
  { label: "Now", href: "/now/" },
  { label: "Contact", href: "/contact/" }
];

export default function NotFound() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main not-found-main">
      <section className="surface page-hero not-found-hero">
        <p className="eyebrow">404 — out of scope</p>
        <h1>This route failed scope validation.</h1>
        <p className="muted hero-copy">
          The page you requested is not in scope — it may have moved, been retired, or never shipped.
          No harm done; let&apos;s route you back to something real.
        </p>

        <div className="not-found-terminal" aria-hidden="true">
          <code>
            <span className="not-found-prompt">$</span> resolve {""}
            <span className="not-found-path">requested/path</span>
          </code>
          <code className="not-found-error">→ 404: target not in allowed scope</code>
          <code className="not-found-ok">→ suggestion: pick a verified destination below</code>
        </div>

        <div className="cta-row not-found-actions">
          {suggestions.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`button ${index === 0 ? "button-primary" : "button-secondary"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
