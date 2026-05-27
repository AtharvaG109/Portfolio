import { AnimateIn } from "@/components/animate-in";
import { SiteSearch } from "@/components/site-search";
import { StructuredData } from "@/components/structured-data";
import { buildSearchEntries } from "@/lib/search-data";
import { buildAbsoluteUrl, createBreadcrumbSchema } from "@/lib/site-data";

export const metadata = {
  title: "Search",
  description: "Search projects, writing, labs, workbench notes, technologies, and portfolio evidence.",
  alternates: {
    canonical: "/search/"
  }
};

const searchSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Search", path: "/search/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Atharva Gham Portfolio Search",
    url: buildAbsoluteUrl("/search/")
  }
];

export default function SearchPage() {
  const entries = buildSearchEntries();

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={searchSchema} />
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Search</p>
        <h1>Find projects, writing, tools, and technical signals.</h1>
        <p className="muted hero-copy">
          This local search index covers the static portfolio content without relying on a backend
          service or sending queries off the page.
        </p>
      </AnimateIn>
      <SiteSearch entries={entries} />
    </main>
  );
}
