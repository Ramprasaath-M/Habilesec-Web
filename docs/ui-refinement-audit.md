# UI refinement audit — 16 October 2026

## Checkpoint and boundaries

Git checkpoint `6754893` preserves the previously approved homepage hero strip removal and frosted blue footer before this refinement. Work was confined to the current HabileSec project. HabileSec Ex was not accessed.

The photographic homepage hero, its text and buttons, holographic glass panels, footer component and gradient, and navigation source files have no changes relative to that checkpoint. Business descriptions, product names, service categories, routes, and backend behavior are preserved. No imagery, sections, or company claims were added.

## Findings and focused changes

| Finding | Refinement |
| --- | --- |
| Repeated orange dash before What We Do, Industries, Products, About and other labels | Removed the shared `.eyebrow::before` definition and its obsolete plain variant in `app/globals.css`. Label text stays aligned with its heading. Label tracking is reduced from 0.14em to 0.1em. Functional SVGs, breadcrumb separators and layout borders remain. |
| Default rise animations repeated throughout the page | Default Reveal now uses a shorter 380ms fade without vertical movement. Explicit image masks and meaningful tab, navigation, hover and hero motion remain. Reduced-motion support is retained. |
| Oversized closing CTA and stair-step illustration on many pages | Removed decorative SVG markup and its styles. Kept each page's contextual text, primary action, email and phone. Closing sections now use a smaller display heading and compact two-column desktop layout, stacking below 900px. Repeated closing entrance animations are removed. |
| Decorative counts occupying intro side columns | Removed the hidden five-discipline and two-platform counters and dedicated CSS. PageIntro only reserves an aside column when an actual aside is supplied; paragraph widths remain constrained. Intro margins and bottom padding are reduced. |
| About principles dominated by oversized numerals | Removed decorative 01/02/03 spans and stagger delays, retaining the principles and their ordered-list structure. Founder imagery and company content remain. |
| Practice overview decorated as an artificial timeline | Removed empty dot spans and the connecting line; kept the practice columns, cycle text and links. Simple column rules provide structure. Actual sequential lifecycle diagrams on detail pages remain. |
| Product capability sheet presented with shadow, accent border and animated numbered rows | Removed shadow, ornamental accent and row numbers. Capability lists are semantic unordered lists. Removed per-row entrance animations while retaining the parent transition used for product switching. Existing photographs remain; these are capability summaries, not invented product screenshots. |
| Insight cards artificially staggered vertically | Removed alternating top offsets so article rows share a clear baseline. Featured-article, secondary-article and compact-row layouts remain differentiated. |
| Unnecessary accent on contact form container | Removed its ornamental top stripe while preserving the form, grouping border, inputs and focus states. |
| Mobile service index row extended four pixels due to arrow translation | Stopped the active/hover arrow translation below 720px; desktop motion and the functional arrow remain. |

The service index, industry gallery, editorial insights, product tabs and company sections already have distinct compositions. These were retained rather than replaced with a common card layout. There were no additional generic floating objects or glow layers outside the approved hero requiring blanket removal.

## Verification

- Before and after browser audits cover **40 public page routes × five widths = 200 checks per audit**: 1440, 1024, 768, 390 and 320px. Includes Home, What We Do, Products, Insights, Industries, About, Contact, services, all capability pages, all product/industry/practice/article detail pages, work and legal pages.
- Final production audit: all 200 page loads return 200; zero horizontal overflow, clipped-text findings, or page errors. Every rendered shared eyebrow has no generated before-content.
- Keyboard checks cover desktop menu opening/Escape, challenge tabs and product tabs. Mobile navigation reaches Industries correctly.
- Hero glass panels expand/collapse using keyboard controls, and their approved ambient animation remains active under normal motion preferences.
- Product selection, industry selection, Insights filtering, and contact email-draft preparation pass. The contact check prepares a local mailto link; no message is sent.
- All 38 unique internal link destinations collected across the pages return 200. Existing external destinations are preserved; external availability is not certified by this local audit.
- A separate production pass checks console errors and local anchor targets on all 40 routes: passed. Product-page headings and actions remain visible with JavaScript disabled.
- TypeScript, ESLint and production build pass. No dependency changes.
- Browser evidence: `.artifacts/refinement/before/`, `.artifacts/refinement/after/`, `after/audit.json`, and `interactions.json`. Desktop and mobile full-page screenshots cover all primary pages and representative details.

The production preview runs at http://localhost:3300 . Tests use Chromium viewport emulation, not physical mobile devices. No claim is made of pixel-level parity with any external inspiration website.
