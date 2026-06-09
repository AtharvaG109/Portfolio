import { credentials } from "@/lib/site-data";

export function CredentialsRow() {
  return (
    <div className="credentials-row" aria-label="Credentials and proof">
      {credentials.map((item) => {
        const inner = (
          <>
            <span className="credentials-kind micro-label">{item.kind}</span>
            <strong>{item.label}</strong>
            <span className="credentials-detail">{item.detail}</span>
          </>
        );

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="surface credentials-card credentials-card-link"
          >
            {inner}
          </a>
        ) : (
          <article key={item.label} className="surface credentials-card">
            {inner}
          </article>
        );
      })}
    </div>
  );
}
