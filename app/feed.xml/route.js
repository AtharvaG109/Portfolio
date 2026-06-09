import { getSortedContent } from "@/lib/content";
import { buildAbsoluteUrl, siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateString) {
  const parsed = dateString ? Date.parse(`${dateString}T00:00:00Z`) : Number.NaN;
  return new Date(Number.isNaN(parsed) ? Date.now() : parsed).toUTCString();
}

export function GET() {
  const posts = getSortedContent("blog");
  const lastBuildDate = toRfc822(posts[0]?.publishedAt || posts[0]?.updatedAt || posts[0]?.date);

  const items = posts
    .map((post) => {
      const url = buildAbsoluteUrl(`/blog/${post.slug}/`);
      const pubDate = toRfc822(post.publishedAt || post.updatedAt || post.date);
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title ?? "")}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.excerpt ?? "")}</description>`,
        categories,
        "    </item>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Writing</title>
    <link>${buildAbsoluteUrl("/blog/")}</link>
    <atom:link href="${buildAbsoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
