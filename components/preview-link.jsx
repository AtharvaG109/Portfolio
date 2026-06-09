"use client";

import Link from "next/link";
import { useState } from "react";

export function PreviewLink({ href, children, className, preview }) {
  const [open, setOpen] = useState(false);

  if (!preview) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <span
      className="preview-link-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
      <span className={`preview-card ${open ? "preview-card-open" : ""}`} role="presentation" aria-hidden={!open}>
        {preview.kind ? <span className="preview-card-kind micro-label">{preview.kind}</span> : null}
        <strong>{preview.title}</strong>
        {preview.summary ? <span className="preview-card-summary">{preview.summary}</span> : null}
        {preview.metric ? <span className="preview-card-metric">{preview.metric}</span> : null}
      </span>
    </span>
  );
}
