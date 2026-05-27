import { ContactPanel } from "@/components/contact-panel";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Contact",
  description: "Private technical conversation flow for Atharva Gham.",
  alternates: {
    canonical: "/contact/"
  }
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <PageHero
        eyebrow="Contact"
        title="Start with the technical context."
        copy="Use this page for engineering context, security research, collaboration, writing, or a focused technical discussion."
        actions={[
          { label: "View case studies", href: "/projects/", variant: "secondary" },
          { label: "Read technical notes", href: "/blog/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <ContactPanel />
      </section>
    </main>
  );
}
