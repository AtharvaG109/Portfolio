# Portfolio

Portfolio site for Atharva Gham, built with Next.js static export and configured for GitHub Pages and other free static hosts.

Proof-first Next.js portfolio for product, systems, and security engineering.

## Features

- Editorial release-desk homepage with product, systems, and security focus
- Current case studies for ProsthPlan, Global Market Terminal, BreachOps, FocusForge, and SpectreFS
- Blog index plus article pages
- MDX-style content files for writing and project case-study expansions
- Interactive Labs playground for JWTs, logs, detection rules, risk scoring, packet flows, and CI security gates
- Local portfolio search across projects, writing, labs, workbench, resume, and technologies
- Interactive project demos for flagship security and systems projects
- Resume page with print/save support
- Private contact form that opens a direct email draft
- Downloadable text resume in `public/resume`
- Motion-based reveal and filter animations with reduced-motion support
- Google Analytics hook via `NEXT_PUBLIC_GA_ID`
- Static export configuration for free hosting
- Web manifest plus public `security.txt`, `llms.txt`, `humans.txt`, and `portfolio-summary.json` metadata
- GitHub issue templates, PR template, and CI build workflow

## Project Structure

- `app/`: Next.js routes and pages
- `components/`: shared UI and client components
- `lib/site-data.js`: portfolio content, resume data, blog content
- `content/`: MDX-style blog posts and project case-study expansions
- `public/`: downloadable resume and static assets
- `.github/`: deploy workflow plus contribution templates

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Update Content

Edit `lib/site-data.js` to update:

- hero copy
- experience
- projects
- education
- certifications
- skills and tooling
- blog posts
- contact links

Edit `content/blog/*.mdx` and `content/projects/*.mdx` to update long-form writing
and detailed case-study narratives. Frontmatter is intentionally small:

```text
---
slug: example-slug
title: Example Title
category: Systems
publishedAt: 2026-03-01
readTime: 5 min read
excerpt: Short summary for cards and metadata.
tags: [Python, OpenTelemetry]
---
```

The renderer supports headings, paragraphs, bullet lists, fenced code blocks,
links, inline code, bold text, and simple callout/artifact blocks.

## Contact Form

The site now uses a private contact request flow instead of publishing a direct phone number.

The contact form submits through a public-safe Web3Forms access key configured with
`NEXT_PUBLIC_WEB3FORMS_KEY`. The destination inbox and direct phone details are not
published in the client bundle.

## Analytics

Set a Google Analytics property ID before build or deploy:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

If the variable is missing, analytics stays disabled.

## Release And Validation

Before publishing public site changes, run `npm run check` and follow [`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md). The checklist covers static export validation, project content review, public link checks, and GitHub Pages deployment verification.

## Search Console

To enable Google Search Console site verification without another code change later, set:

```bash
GOOGLE_SITE_VERIFICATION=your-verification-token
```

The GitHub Pages workflow now forwards this value from either a repository variable or a repository secret during build, so the verification meta tag is included in production. After that, submit the generated sitemap from:

```text
https://your-site-url/sitemap.xml
```

## Free Hosting

### Recommended: Vercel

Recommended for a Next.js portfolio.

- free hobby tier
- zero-config deploys from GitHub
- strong support for analytics and previews

### Also Supported: GitHub Pages

This repo is configured with static export in `next.config.mjs`, so it can be deployed as a static site too.

Typical flow:

```bash
npm install
npm run check
```

Then deploy the generated `out/` directory with GitHub Pages or any static host.

`npm run check` now builds the static export and verifies that the files needed
for search, social previews, security metadata, and GitHub Pages are present.
It also validates content frontmatter, writes `out/search-index.json`, and smoke
checks key static routes.

## Artifact Policy

Project pages can include public artifacts such as PDFs, public repository links,
sanitized logs, config snippets, and generated diagrams. Do not publish private
logs, credentials, unpublished proprietary details, or personal data. When a real
artifact is unavailable, use clearly sanitized sample data that demonstrates the
workflow without pretending to be production evidence.

## Repository Hygiene

The repo includes a lightweight GitHub Actions CI workflow that runs `npm ci` and `npm run build` on pushes and pull requests.

Additional public metadata files live under `public/`:

- `site.webmanifest`
- `security.txt`
- `llms.txt`
- `humans.txt`
