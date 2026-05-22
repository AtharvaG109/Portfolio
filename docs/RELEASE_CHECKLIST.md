# Release Checklist

Use this checklist before pushing Portfolio changes that affect public pages, content, metadata, or deployment.

## Local Gates

```bash
npm run check
```

`npm run check` runs content validation, Next.js build, search-index generation, static-export verification, and smoke-export checks.

## Content Review

- Confirm project pages use proof-first language and do not overstate production readiness.
- Check external links for public GitHub routes and live artifacts.
- Keep contact and personal information intentional and current.
- Verify new images use stable public paths under `public/media/`.

## GitHub Pages Readiness

- CI passes.
- Deploy GitHub Pages completes successfully.
- The changed public route loads after deployment.
