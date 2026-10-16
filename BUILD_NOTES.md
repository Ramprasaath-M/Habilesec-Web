# HabileSec enterprise frontend

This working project is independent of the read-only HabileSec Ex reference repository.

## Run

- Development: `npm.cmd run dev`
- Production: `npm.cmd run build`, then `npm.cmd run start -- --port 3300`
- Checks: `npm.cmd run lint` and `npm.cmd run typecheck`

The runtime stack is Next.js App Router, TypeScript, React, Tailwind (token aliases only), locally hosted Manrope and DM Serif Display, and Lucide React. Motion is CSS plus two small client primitives (`components/motion/reveal.tsx`, scroll/tab handlers); no animation library is installed.

## Implementation and review

- [Design system](DESIGN_SYSTEM.md)
- [Executed QA and limitations](QA_REPORT.md)
- [Content requiring business review](CONTENT_REVIEW.md)
- [Asset and business-content provenance](ASSET_SOURCES.md)

Components: `components/layout/` (header, footer), `components/home/` (homepage sections), `components/pages/` (page families), `components/ui/` and `components/motion/` (primitives). The preserved email-draft form is `components/sections/contact-form.tsx`. Tokens are in `app/globals.css`; compositions are CSS modules beside each component. Image art direction is in `data/visuals.ts`; see `DESIGN_SYSTEM.md` and `ASSET_INVENTORY.md`.

The frontend prepares enquiries as email drafts. It does not claim server-side message delivery, and no credentials or backend integrations were invented.

## Recovery

The pre-rebuild source and original local assets are backed up in `artifacts/rebuild/pre-redesign-2026-10-15.zip`. Older notes are preserved in `artifacts/rebuild/previous-build-notes.md`. Detailed screenshots, browser checks, Lighthouse reports, source hashes and changed-file inventories are in `artifacts/rebuild/`.

QA browser downloads and temporary tooling are ignored and are not application dependencies. Legacy unused media and data were retained for owner review; the rebuilt pages do not render the old experimental sections or unsupported business claims.
