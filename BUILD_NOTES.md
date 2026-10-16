# HabileSec enterprise frontend

This working project is independent of the read-only HabileSec Ex reference repository.

## Run

- Development: `npm.cmd run dev`
- Production: `npm.cmd run build`, then `npm.cmd run start -- --port 3300`
- Checks: `npm.cmd run lint` and `npm.cmd run typecheck`

The runtime stack is Next.js App Router, TypeScript, React, Tailwind, locally hosted Manrope, and Lucide React. Framer Motion and the obsolete experimental UI have been retired.

## Implementation and review

- [Design system](DESIGN_SYSTEM.md)
- [Executed QA and limitations](QA_REPORT.md)
- [Content requiring business review](CONTENT_REVIEW.md)
- [Asset and business-content provenance](ASSET_SOURCES.md)

Application components live in `components/enterprise/`; the preserved email-draft form is in `components/sections/contact-form.tsx`. Shared tokens live in `app/globals.css`. New presentation content lives in `data/enterprise.ts`, alongside the retained company, practice and service data.

The frontend prepares enquiries as email drafts. It does not claim server-side message delivery, and no credentials or backend integrations were invented.

## Recovery

The pre-rebuild source and original local assets are backed up in `artifacts/rebuild/pre-redesign-2026-10-15.zip`. Older notes are preserved in `artifacts/rebuild/previous-build-notes.md`. Detailed screenshots, browser checks, Lighthouse reports, source hashes and changed-file inventories are in `artifacts/rebuild/`.

QA browser downloads and temporary tooling are ignored and are not application dependencies. Legacy unused media and data were retained for owner review; the rebuilt pages do not render the old experimental sections or unsupported business claims.
