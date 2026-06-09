export function SectionHeading({ eyebrow, title, copy, index }) {
  return (
    <div className={`section-heading ${index ? "section-heading-numbered" : ""}`}>
      {index ? (
        <span className="section-index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-copy muted">{copy}</p> : null}
    </div>
  );
}
