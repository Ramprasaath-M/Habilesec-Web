# Controlled implementation roadmap

Status: future plan; every implementation step below waits for explicit Phase 2 approval. Phase 1 only creates these eight documents. No reset, clean, stash, deletion, dependency installation or application overwrite is authorized now.

## Gate 1 — Approve direction and publication scope

Review the proposed tokens, typography, page structures and component boundaries. Obtain Fort visual evidence or explicitly accept a provisional independent direction while Fort comparison remains pending. Resolve contact delivery ownership, CMS scope and product destinations. Omit held proof claims from early designs; facts do not become approved because a layout needs a number.

Deliverable: an agreed creative brief, source-backed copy set and decisions recorded against document 08. This does not require every optional testimonial/statistic to be approved; those can remain excluded.

## Gate 2 — Establish a safe implementation baseline

Preserve all existing uncommitted files, including deletions and untracked assets. Capture a read-only status/diff and agree an explicit snapshot strategy before changing tracked application files. Do not reset, stash or clean to obtain a convenient baseline. Any branch/worktree or archival approach must preserve the actual dirty working state, not just HEAD. Avoid committing unrelated experimental work automatically.

Read relevant installed Next guides. With implementation authorization, run the existing build/type checks and document pre-existing failures before introducing UI changes; Next commands can generate files, so they were intentionally deferred in Phase 1. Map every active URL and verified integration, including legacy article IDs and any product path served outside Next.

Deliverable: reproducible baseline with known limitations and a rollback plan that restores pre-implementation bytes without losing user work.

## Gate 3 — Build independently in isolation

Create new design tokens, original primitives and new frontend components in an isolated namespace. Do not import old presentation or migrate dummy components. Build shell, hero, one service composition and one product composition using approved content first. Compare desktop/mobile renders against the approved brief and available Fort evidence before expanding all pages.

Deliverable: reviewable design foundation and representative routes with working navigation and reduced-motion behavior. No deploy or production switch is implied.

## Gate 4 — Replace pages and restore verified functions

Implement new home, practice/capability, product, industry, company, evidence/editorial, contact and legal presentations. Integrate only confirmed backend/CMS contracts through the new adapters. Preserve draft isolation, sanitization, upload controls and authorization. Resolve contact saved-versus-notified semantics and avoid duplicate outbound notifications. Add explicit legacy redirects and accurate metadata; no blanket redirects that discard article identity.

Switch route entry points in small coherent batches only after each replacement passes checks. Keep old files intact until the new frontend is accepted; any later removal is a separately reviewable cleanup decision. Existing experimental CSS must not bleed into the replacement.

## Gate 5 — Validate and review

| Area | Acceptance evidence |
| --- | --- |
| Build | Existing `npm run typecheck` and `npm run build` pass; account for baseline failures; run necessary relevant lint checks |
| Routes | Existing approved URLs, redirects, unknown-slug handling, canonical URLs, sitemap and legacy article mapping behave correctly |
| Forms/API | Contract tests with mocks; invalid input, pending, success, failed persistence, notification failure and duplicate-click cases; controlled real delivery only when approved |
| CMS | Only published content public; authenticated preview isolated; backend-down behavior does not expose stale/held facts |
| Accessibility | Keyboard menus, focus restoration, labels/errors, contrast, reduced motion, screen-reader landmarks and 200% zoom reviewed |
| Responsive | 320, 390, 768, 1024 and 1440px representative renders; long labels, touch menus and content overflow checked |
| Visual | Tokens/alignment/imagery consistent; compositions distinctive; no rejected target UI; no false claim of Fort matching while visuals remain unverified |
| Performance | Aim at LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; lab evidence before launch, field validation after release; do not claim these results in advance |
| Security | Header/CSP compatibility; no broad remote allowlists; secrets server-side; admin/upload controls retained; no unintended draft indexing |
| Content/assets | Provenance, quotation attribution, product destinations, contacts and usage rights checked; held claims absent |

Tests should exercise meaningful behavior and integrations, not mirror component implementation. No new tests are needed for the Phase 1 Markdown-only change.

## Gate 6 — Acceptance and release decision

Provide a concrete preview, validation results, known limitations and rollback instructions. Obtain the owner's implementation/release decision before any production deployment. Hosting choice remains unverified; do not migrate the project to another runtime or service by default. Keep EX read-only throughout unless separately authorized.

No calendar estimate is asserted: scope depends on approved content depth, backend integration decisions and visual evidence. Implementation order prioritizes working build and verified behavior, then broad page coverage, then polish.
