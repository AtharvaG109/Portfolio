import Link from "next/link";

import { slugify } from "@/lib/slug";

function renderInline(text) {
  const parts = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const value = match[0];

    if (value.startsWith("`")) {
      parts.push(<code key={`${value}-${match.index}`}>{value.slice(1, -1)}</code>);
    } else if (value.startsWith("**")) {
      parts.push(<strong key={`${value}-${match.index}`}>{value.slice(2, -2)}</strong>);
    } else {
      const linkMatch = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = linkMatch?.[2] ?? "#";
      const label = linkMatch?.[1] ?? value;
      const isExternal = href.startsWith("http");

      parts.push(
        isExternal ? (
          <a key={`${href}-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ) : (
          <Link key={`${href}-${match.index}`} href={href}>
            {label}
          </Link>
        )
      );
    }

    lastIndex = match.index + value.length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function RichBlock({ block }) {
  if (block.type === "heading") {
    const Heading = block.level === 3 ? "h3" : "h2";
    return <Heading id={slugify(block.text)}>{block.text}</Heading>;
  }

  if (block.type === "paragraph") {
    return <p>{renderInline(block.text)}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="bullet-list article-bullets">
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "code") {
    return (
      <div className="code-artifact">
        <div className="code-artifact-head">
          <span>{block.language}</span>
          <span>sanitized artifact</span>
        </div>
        <pre>
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }

  if (block.type === "artifact") {
    return (
      <aside className="artifact-card">
        <div>
          <p className="micro-label">{block.attrs.kind || "Artifact"}</p>
          <h3>{block.attrs.title || "Public artifact"}</h3>
        </div>
        <div className="rich-content compact-rich-content">
          <RichContent blocks={block.children} />
        </div>
        {block.attrs.href ? (
          <a href={block.attrs.href} className="text-link" target="_blank" rel="noopener noreferrer">
            Open artifact
          </a>
        ) : null}
      </aside>
    );
  }

  if (block.type === "metric") {
    return (
      <aside className="metric-callout">
        <strong>{block.attrs.value || "Measured signal"}</strong>
        <span>{block.attrs.label || "Portfolio evidence"}</span>
      </aside>
    );
  }

  return (
    <aside className="content-callout">
      <p className="micro-label">{block.attrs?.label || block.type}</p>
      {block.attrs?.title ? <h3>{block.attrs.title}</h3> : null}
      <RichContent blocks={block.children ?? []} />
    </aside>
  );
}

export function RichContent({ blocks }) {
  return (
    <>
      {blocks.map((block, index) => (
        <RichBlock key={`${block.type}-${index}`} block={block} />
      ))}
    </>
  );
}
