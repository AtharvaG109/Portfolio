import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimateIn } from "@/components/animate-in";
import { ArticleToc } from "@/components/article-toc";
import { RichContent } from "@/components/rich-content";
import { StructuredData } from "@/components/structured-data";
import { getContentBySlug, getSortedContent } from "@/lib/content";
import { slugify } from "@/lib/slug";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  formatPublishedDate,
  siteConfig
} from "@/lib/site-data";

export async function generateStaticParams() {
  return getSortedContent("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    return {
      title: "Post not found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: buildAbsoluteUrl(`/blog/${post.slug}/`),
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      authors: [siteConfig.name],
      images: [buildAbsoluteUrl(`/blog/${post.slug}/opengraph-image`)]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const headings = post.blocks
    .filter((block) => block.type === "heading" && block.level === 2)
    .map((block) => ({ id: slugify(block.text), text: block.text, level: block.level }));

  const articleSchema = [
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Writing", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: `${post.publishedAt}T00:00:00Z`,
      dateModified: `${post.publishedAt}T00:00:00Z`,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        sameAs: siteConfig.sameAs
      },
      publisher: {
        "@type": "Person",
        name: siteConfig.name
      },
      image: [buildAbsoluteUrl(`/blog/${post.slug}/opengraph-image`)],
      mainEntityOfPage: buildAbsoluteUrl(`/blog/${post.slug}/`)
    }
  ];

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main article-main">
      <StructuredData data={articleSchema} />
      <AnimateIn className="article-header" delay={0.05}>
        <Link href="/blog/" className="back-link">
          Back to writing
        </Link>
        <p className="eyebrow">
          {post.category} • {post.readTime} •{" "}
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
        </p>
        <h1>{post.title}</h1>
        <p className="muted hero-copy">{post.excerpt}</p>
        <div className="tag-row">
          {(post.tags ?? []).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </AnimateIn>

      <div className="article-layout">
        <article className="surface article-shell">
          <AnimateIn className="article-section rich-content" delay={0.08}>
            <RichContent blocks={post.blocks} />
          </AnimateIn>
        </article>
        <ArticleToc headings={headings} />
      </div>
    </main>
  );
}
