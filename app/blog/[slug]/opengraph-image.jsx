import { ImageResponse } from "next/og";

import { blogPosts, getPostBySlug, siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug) ?? blogPosts[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px",
          background: "linear-gradient(135deg, #04080a 0%, #13232e 52%, #31220f 100%)",
          color: "#f5fafd",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, color: "#7cf4c9", fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 28, color: "#98abb9" }}>{`${post.category} / ${post.readTime}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ maxWidth: 960, margin: 0, fontSize: 80, lineHeight: 1.04, letterSpacing: 0 }}>
            {post.title}
          </h1>
          <p style={{ maxWidth: 900, margin: "36px 0 0", fontSize: 32, lineHeight: 1.35, color: "#d5e1ea" }}>
            {post.excerpt}
          </p>
        </div>
        <div style={{ fontSize: 26, color: "#f5b85d" }}>Systems, security, and engineering judgment</div>
      </div>
    ),
    size
  );
}
