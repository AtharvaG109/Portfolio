import { ContactInterestForm } from "@/components/contact-interest-form";
import { contactConfig, contactProcess, siteConfig } from "@/lib/site-data";

export function ContactPanel() {
  return (
    <div className="contact-panel">
      <div className="surface contact-story">
        <div className="contact-story-copy">
          <p className="eyebrow">Contact</p>
          <h2>Useful conversations start with context.</h2>
          <p className="muted">{contactConfig.intro}</p>
        </div>

        <div className="contact-signal-grid">
          {contactProcess.map((item) => (
            <article key={item.title} className="contact-signal-card">
              <p className="micro-label">Process</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="contact-direct-links">
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
            Open LinkedIn
          </a>
        </div>

        <p className="contact-privacy-note">{contactConfig.privacyNote}</p>
      </div>

      <ContactInterestForm />
    </div>
  );
}
