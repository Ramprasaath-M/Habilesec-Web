# HabileSec — Phase 1 project audit

Date: 28 October 2026. Status: planning complete; implementation not authorized.

## Scope and evidence boundaries

Target: `C:/Users/Habilesec/OneDrive/Desktop/Habilesec` (T). Business source: `C:/Users/Habilesec/OneDrive/Desktop/Habilesec Ex/habilesec-site-new` (EX), inspected read-only. Paths below are relative to those roots. Existing findings from the interrupted audit were retained and selectively extended.

T was inspected only for infrastructure, route contracts and functional behavior. Its page composition, CSS, fonts, imagery, animations and historical design documentation were excluded from creative decisions. EX supplies business records, assets and functional requirements, never a visual template. “Source-verified” means present in the inspected repository, not independently confirmed as a current company fact or live production state.

Fort Light was retrieved successfully through supported web extraction during this resumed audit. This supplies text and link structure, not rendered visual evidence. Visual analysis remains PENDING VISUAL VERIFICATION; see document 03.

## Technical infrastructure worth preserving

| Evidence | Finding | Preservation decision |
| --- | --- | --- |
| T `package.json`, installed `node_modules/next/package.json` | Next.js 16.4.0 installed; manifest requests ^16.4.0; React/React DOM ^19.2.0; TypeScript ^5.9.3 | Retain framework, strict typing and lockfile unless a later justified change is approved |
| T `package.json` | dev/build/start/lint/typecheck scripts; Playwright available; Tailwind 3, CSS tooling, lucide-react and Three.js dependencies | Retain build tooling; dependency availability does not require using it in the new UI |
| T `tsconfig.json` | strict mode, bundler resolution, `@/*` root alias | Preserve |
| T `app/`, `next.config.ts` | App Router, dynamic content routes, legacy redirects | Preserve URL contracts while replacing view implementations; reconcile omissions in document 05 |
| T `lib/metadata.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` | Canonicals, title templates, social metadata, Organization JSON-LD, sitemap and crawl rules | Preserve mechanisms; rewrite editorial payloads using EX; replace experimental social image; hold unverified founding date |
| T `next.config.ts` | AVIF/WebP support; nosniff, DENY framing, referrer and permissions headers; production CSP | Preserve intent and validate against approved integrations |
| T `components/sections/contact-form.tsx` | Browser validation followed by mailto draft creation; no network submission | Record as actual current target behavior; do not describe it as a saved enquiry |

Local Next documentation read: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `15-route-handlers.md`. Future code must consult the relevant installed guides again as needed. Prefer server-rendered content and small interactive client boundaries. No application code was written in Phase 1.

## Rejected Existing UI — Do Not Reuse

All target UI is experimental and disposable. The following file families identify the exclusion boundary, not reusable foundations:

| Experimental material | Excluded influence |
| --- | --- |
| `components/home/*` including hero, hero-glass, interactive-hero-grid, global-connection-globe, capabilities, business-challenges, product-stage, recognition-strip, statistics and testimonials | Hero ideas, page sequence, visual storytelling, decorative scenes and section patterns |
| `components/layout/*` including header, mega-menu, footer, world-map and network paths | Navigation appearance, menu geometry, footer composition and animation |
| `components/pages/*`, `components/ui/*`, route-specific presentation | Card systems, page templates, UI primitives, spacing and visual hierarchy |
| `components/motion/*`, home distortion hooks and scene modules | Motion language, reveal patterns, Three.js scenes and effects |
| `app/globals.css`, all target module CSS, `lib/fonts.ts`, target design docs including `DESIGN_SYSTEM.md` | Color, type, tokens, layout rules and prior design rationale |
| Target `data/*`, `public/images/*`, videos and visual assets | Dummy copy, claims, placeholder imagery and asset selection; any business material must be independently traced to EX |

Do not import, rename, reskin or automatically migrate these components into the new design. Existing routing files may retain their URLs, but their visual implementations will be written anew after approval.

## Functional architecture and gaps

EX contains an Express backend with SQLite (`better-sqlite3` in `backend/package.json`), Nodemailer, upload handling, sanitization, rate limiting and admin/content routes. A PostgreSQL export filename and SQL-style placeholders do not establish PostgreSQL as the active runtime. No database, mail provider or production endpoint was contacted.

EX `src/lib/backend.js` uses server-side `BACKEND_ORIGIN`, defaulting locally to port 4000. `src/lib/siteContentStore.js` requests published backend content, supports authenticated draft preview, and uses `content.js` as a fallback. The source itself states that this fallback is not the runtime source of truth. Current published CMS values were not retrieved.

Backend route families in `backend/src/server.js`: admin, team, testimonials, success-stories, blog, upload, contact, subscription, QA, chatbot, site-content, announcements and audit. Preserve their intended capabilities through explicit contracts rather than copying EX presentation or blindly porting every endpoint. Target file inventory did not reveal equivalent `app/api` routes or a backend directory; their presence in EX is not proof they already work in T.

EX contact flow: `src/components/ContactForm.jsx` POSTs to `/api/contact`, whose route proxies `/api/contact/create`. Backend `routes/contact.js` validates and saves to `contact_us`, optionally saves service/course relationships, then attempts mail notification and returns 201 with `emailSent`. The client subsequently calls EmailJS before showing success. This creates duplicate-notification potential and a false failure/retry risk after successful storage. EX client validation also restricts optional phone numbers to ten digits. Proposed replacement: one authoritative saved-enquiry result, separate notification status, international phone support and accessible error handling. Delivery behavior requires owner confirmation, not a silent migration.

## SEO, security and deployment observations

T CSP permits self connections and images only (plus data/blob images), inline scripts/styles, and self/mailto form actions. Direct EmailJS calls, remote portraits or YouTube frames would require a reviewed policy change or a same-origin design. Do not weaken CSP broadly to accommodate copied widgets. EX middleware uses nonce-based scripts and report-only CSP unless configured to enforce; it is evidence of different runtime requirements, not drop-in Next 16 infrastructure. Follow the installed Next proxy guidance before porting middleware behavior.

T robots allows all paths. If admin/preview functionality is later integrated, exclude those from discovery and retain real authentication; robots is not access control. Canonical domain and social metadata payloads need final owner review. EX has standalone/Docker deployment configuration; T deployment destination remains unverified.

No build, dev server, dependency installation, migration, runtime API mutation or production probe was run. A working build is a future acceptance gate, not a Phase 1 claim. Existing modified, deleted and untracked files predate this documentation work and must remain intact.

## Audit confirmation

1. Existing Habilesec dummy UI was excluded from design decisions.
2. Habilesec EX was used only for source-verified business content, assets and functionality; unresolved facts are flagged.
3. The proposed design system was created independently; it is not implemented or approved.
4. Fort is the primary visual reference, with rendered visuals explicitly pending verification.
5. No application code was modified. Only the eight new Phase 1 Markdown documents are authorized outputs.
