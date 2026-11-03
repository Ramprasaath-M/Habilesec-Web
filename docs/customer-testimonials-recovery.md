# Our Work With Customers: recovered testimonials

## 2026-10-27 (later): visual refinement — subtle grid background

Visual-only refinement on top of the wall below; layout, columns, speeds,
pause/resume and accessibility structure are unchanged (re-verified by the
same `scripts/customer-testimonials-check.mjs`, all passing). Changes:

- **Grid background** on `.section`: CSS-generated (two `linear-gradient`
  layers, no raster asset), `32px` squares, `rgba(65,130,220,.075)` lines —
  visible behind the heading, the cards, and the top/bottom fade zones
  (column/track/wall have no opaque background, so the grid shows through).
- **Card**: border `#e1eaf6`, shadow `0 4px 16px rgba(20,45,90,.045)`,
  hover border `#a9c3f0` — matches the approved reference values.
- **Blue quotation icon** (`lucide-react` `Quote`, 26px, brand blue) added
  top-left of every card, decorative (`aria-hidden`).
- **Company logo repositioned**: previously shown in a top-right slot (or a
  text fallback naming the org); now rendered below the reviewer identity
  row, matching the reference layout, and only when a real logo asset
  exists — no text placeholder, since the org name is already in the
  identity line. No logos were changed, added, or invented.
- Files touched: `components/home/customer-testimonials.tsx` (quote icon,
  logo position), `components/home/customer-testimonials.module.css`
  (background, card/avatar/text sizing). No other homepage section,
  the shared data source, or `Habilesec EX` were touched.

---

## 2026-10-27 update: vertical testimonial wall

The 3D carousel described below (CSS perspective/rotateY, arrows, pagination
dots) has been **replaced** with a three-column vertical marquee wall,
inspired by https://www.tomosteady.com/ and the user-supplied reference
screenshot, adapted to HabileSec's light theme. Data source, recovered
identities and recovered assets are unchanged — see the sections below,
which still describe the verified content accurately.

- **Columns**: 3 desktop (>=1024px), 2 tablet (768–1023px), static stacked
  list below 768px and under `prefers-reduced-motion`. Breakpoints are keyed
  to `window.innerWidth` to match the viewport-width language of the spec.
- **Motion**: columns 1 and 3 scroll up, column 2 scrolls down (45s/55s/50s
  per cycle), via one shared CSS `@keyframes` with `animation-direction:
  reverse` on the middle column — no JS-driven per-frame animation.
- **Seamless loop**: each column repeats its unique items 3× then duplicates
  that whole sequence once more; animating `translateY(0 → -50%)` lines the
  clone up exactly with the start, so the loop has no visible jump or gap.
- **Pause/resume**: `animation-play-state` toggles on `:hover`/`:focus-within`
  of the whole wall (pauses all three columns together); this is native CSS
  state, so resuming continues from the exact paused position rather than
  restarting — verified by comparing the computed `transform` before and
  after a pause window.
- **Accessibility**: the animated/repeated tracks are `aria-hidden="true"`
  and `inert` (removed from the accessibility tree and tab order entirely,
  so duplicated marquee copies are never announced or focused); a single
  `sr-only` list enumerates each of the six real testimonials exactly once,
  with a link to the original LinkedIn profile where one exists.
- **Fade**: a `mask-image` gradient on each column's clipping box fades cards
  in/out at the top and bottom edges.
- Scope: changed only `components/home/customer-testimonials.tsx`, its CSS
  module, and `scripts/customer-testimonials-check.mjs` (rewritten for the
  new structure — the old carousel-specific checks no longer apply). The
  shared data source, other homepage sections, and `Habilesec EX` are
  untouched. The section's `id="customer-testimonials"` was kept (another
  section's own check asserts it as a DOM anchor).

---


## Data source and exact statements

The active project already contains all six full published customer quotations in `data/home-sections.ts:testimonials.items`, copied from the old `Habilesec EX/habilesec-site-new/src/data/testimonials.json`. The new section reuses that source directly through `data/customer-testimonials.ts`; statements are not duplicated into JSX or rewritten. There is no active testimonial database/API in the new site, so its established shared-data architecture is retained.

The old PostgreSQL export (`backend/data/postgres-export.json`, testimonials table) was inspected and contains the same six identities with shorter quote variants, plus a test record for PVS. The original full JSON quotations already in the new shared data are preserved exactly; the admin test record is excluded. No ratings or additional customer claims are added.

Recovered identities: Sivakumar Gingee / CEO / Krushnakkumar; Nagarajan Anandaraman / CEO / GoSwift; Srinivasan Mahalingam / Group CISO & DPO / Wibmo; Ajay Bhat / President / Nirvaana; Deepak Shankar / Founder Director / Techsnurf; Melwyn Rebeiro / Director & CISO / InfoCom IT.

## Recovered assets

- Srinivasan Mahalingam: old JSON explicitly maps the record to `public/blog/uploads/screenshot-2026-06-16-145605-mqgftoaf.png`. Inspected and saved as `public/images/testimonials/srinivasan-mahalingam.webp`.
- InfoCom IT company logo: recovered from old `public/partners/infocom.jpg` (artwork reads Infocom IT HK Ltd), saved as `public/images/testimonials/infocom.webp`. The testimonial company label remains the original InfoCom IT.
- Techsnurf company logo: recovered from old `public/partners/techsnurf.png`, saved as `public/images/testimonials/techsnurf.webp`.
- No customer portraits are supplied for the other five records: simple initials avatars are used. No logos were found for the other four company records. No fake portraits or company logos were generated.

## Composition and behavior

The section follows Latest Insights without changing other sections. Centered exact heading and eyebrow, dominant white center card, smaller angled immediate neighbors, and subdued outer layers. CSS perspective, translateX/translateZ/rotateY/scale provide actual 3D transitions at 680ms. Six distinct source records appear once in the DOM; finite arrow/dot/keyboard/swipe navigation has no duplicate or wraparound cards and no autoplay. Initial position three allows both immediate and outer neighboring layers to be visible. Inactive quotes are inert and aria-hidden. Reduced motion removes transitions. The component accepts a smaller dataset and adapts without fake cards.

## Files

Created: data/customer-testimonials.ts; components/home/customer-testimonials.tsx; components/home/customer-testimonials.module.css; public/images/testimonials/srinivasan-mahalingam.webp; public/images/testimonials/infocom.webp; public/images/testimonials/techsnurf.webp; scripts/customer-testimonials-check.mjs; this source note. Modified: components/home/home.tsx (placement only). The existing full quote data and old project remain unchanged.

## Verification

Development and production browser checks passed at 375, 430, 768, 1024 and 1440px. All six full quotations match the original published JSON; roles and company labels match; center cards are larger and unobscured; CSS matrices show 3D depth; every active quote fits without clipping; arrows, dots, Home/End and arrow keys work; real touch-event swipes work; all recovered images load; no autoplay, horizontal overflow, console errors or hydration errors were detected. Reduced-motion checks, lint, TypeScript and production build passed. Desktop and mobile screenshots were visually reviewed.
