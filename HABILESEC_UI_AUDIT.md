# HABILESEC — CURRENT WEBSITE VISUAL & UX AUDIT

Audit date: 16 Oct 2026. Project audited: `C:\Users\Habilesec\OneDrive\Desktop\Habilesec` (new build). `Habilesec Ex` was only listed (read-only) to inventory reusable assets/components. **No source file was modified; this document is the only file written.**

## Evidence legend and limitations

- **[V] Visually verified** — seen in a real Chromium render (Playwright 1.63, Chromium, against the already-running dev server on `localhost:3000`, which serves this project in development mode) or measured in the live DOM.
- **[C] Code-only** — read from source/CSS; not independently observed in the browser.
- **Reference websites (Grant Thornton, DXC, UBS, Deloitte, PwC, KPMG) were NOT browsed in this audit.** Section 7/Section G inspiration is based on established enterprise-design principles and general familiarity, not on live inspection of those sites today. Treat every "inspired by" note as a principle to verify, not an observation.
- Screenshots were saved **outside** the project (the brief allows only this file as a change). Location in Section I. They are session-scratch files and may be cleared; re-run capture if needed.
- The dev server shows a Next.js dev indicator and a fixed "Skip to content" link can appear inside element screenshots (it appears over the Insights image in `390-home-section-5.png`). That is a capture artefact of a fixed element, not a site bug. The dev indicator was hidden via injected CSS in the capture only.
- Not tested: real devices, Safari, scroll-linked behaviour on touch hardware, Lighthouse. Existing QA claims in `QA_REPORT.md` were not re-run; I did not verify them.

---

## A. Project Architecture

### Stack [C, partly V]
| Item | Actual |
|---|---|
| Framework | Next.js `^16.4.0` App Router (`AGENTS.md` warns of breaking changes and points to `node_modules/next/dist/docs/`; I did not read those docs because no code was written, so version-specific APIs are not assessed here) |
| UI | React `^19.2`, TypeScript `^5.9`, Tailwind CSS **3.4** (only `@tailwind` directives + a few token colours; virtually all styling is hand-written global CSS) |
| Icons | `lucide-react ^0.545` |
| Font | Manrope (variable TTF) via `next/font/local`, weight 200–800. **Verified loaded** in browser. |
| Animation libs | **None installed.** No Framer Motion, GSAP, Lenis, Swiper, Embla, IntersectionObserver or scroll-timeline use anywhere. (`BUILD_NOTES.md`: "Framer Motion … retired") |
| Test tooling | `@playwright/test` (dev) |
| Styling files | One global stylesheet `app/globals.css` (~1,670 lines, 31 KB). **No CSS modules remain.** |
| Rendering | All pages are server components except `header.tsx` and `interactive.tsx` (client). `app/template.tsx` is an empty pass-through (no page transition). |

### Routes [C; all rendered 200 with zero console errors and no horizontal overflow at 390/768/1440 — V]
```
/                              home                    EnterpriseHome
/what-we-do                    ServicesLanding
/what-we-do/[slug]             ServiceDetail  (5 slugs: cybersecurity, governance-compliance, data-privacy, digital-engineering, incident-response)
/services/grcloop|forgeloop|hexn6   PracticeDetail (3)
/services                      permanent redirect → /what-we-do
/products                      ProductsLanding
/products/certanika-lite, /products/tanikkai   PlatformDetail
/products/certanika            CertanikaDetail
/industries                    IndustriesLanding
/industries/[slug]             IndustryDetail (6: government, bfsi, technology, manufacturing, healthcare, retail)
/insights                      InsightsLanding (?category= filter)
/insights/[slug]               PerspectiveDetail (5 slugs)
/about, /contact, /our-work    AboutPage / ContactPage / OurWorkPage
/privacy-policy, /terms-conditions   static legal
/not-found, global-error, robots, sitemap
```
`next.config.ts` also redirects `/grcloop`, `/forgeloop`, `/hexn6`, `/resources/*`.

### Components
Only **7 component files** carry the entire visual layer:
- `components/enterprise/header.tsx` — nav, `<details>` mega-ish dropdowns, mobile toggle
- `components/enterprise/footer.tsx`
- `components/enterprise/shared.tsx` — `ArrowLink`, `ButtonLink`, `SectionHeading`, `PageHero`, `Talk` (CTA band)
- `components/enterprise/home.tsx` — the whole homepage (415 lines)
- `components/enterprise/interactive.tsx` — `ChallengeExplorer`, `CapabilityList`, `ProductShowcase`, `IndustryShowcase`, `PerspectiveBrowser`
- `components/enterprise/pages.tsx` — **every inner page** (688 lines, 17 exported page components)
- `components/sections/contact-form.tsx` — mailto draft form

Data: `data/enterprise.ts` (products, challenges, differentiators, image maps), `data/site.ts`, `data/service-categories.ts`, `data/editorial.ts`. **Dead data from the previous build is still present and unused:** `data/home-sections.ts`, `data/home-hero.ts`, `data/business-agenda.ts` (e.g. "85+ organizations globally" trust figure, challenge slides, hero data) — grep found no importer.

### Assets [V/C]
- **Rendered images: only 8 files** — `public/media/{business-advisory, secure-engineering, government, manufacturing, healthcare, retail}.webp` (all 1200×627, ~28–160 KB), 2 founder portraits (1600×2400), plus the logo.
- **No video, no SVG illustration, no icons-as-graphics, no maps, no logos of clients/partners/certifications are rendered.**
- **~45 higher-quality, purpose-made images in `public/images/**` are not referenced anywhere** (e.g. `images/services/*.webp` 1600×1067 for each service category, `images/industries/*`, `images/challenges/*`, `home/hero/habilesec-hero-desktop.webp` 1672×941 + mobile crop, `habilesec-difference/ascending-staircase.webp`, `what-guides-us/*`). Also unused: `public/data/world.geojson`, `public/fonts/dm-serif-display.ttf` (never loaded), legacy `.svg` illustrations.
- `Habilesec Ex/public` holds a much richer library: `sections/*.jpg` (≈60 section photos: forensics, SOC, cloud, forge-*, grc, bfsi, mission, mandate…), `certs/*` (ISO 27001/27701/42001, SOC2, GDPR, DPDPA), `credentials/*` (CISA, CISM, CISSP, OSCP, PCI-DSS…), `partners/*` (16 logos), `founder/*`. Ex `src/components` also contains `Aurora`, `Counter`, `Marquee`, `PartnerMarquee`, `CredentialMarquee`, `IndiaMap`, `WorldMap`, `SectorShowcase`, `HeroLoop`, `ScrollProgress`, `Reveal`, `cinematic/`, `editorial/`. None of this is used. Note: some of those claims (credentials, partners, counts) were deliberately excluded by the rebuild (`CONTENT_REVIEW.md`: "excludes unconfirmed statistics, testimonials and certifications") — any reuse needs the business to confirm.
- Older builds (hero video loop, cinematic sections, business-agenda etc.) are preserved in `.artifacts/backup/{theme,typo}` and `artifacts/*` (git-ignored scratch). **The previous, richer build was replaced by the current minimal one.**

### Root causes visible in the project docs
`DESIGN_SYSTEM.md` states the intent: *"favors clear business language, editorial photography, thin rules, and useful disclosure over decorative cards and animation… There is no autoplay video, parallax, animated background, flip animation, or scroll-dependent content reveal."* The site was built to an accessibility/QA checklist first, which is exactly why it feels bare. The brief for the redesign is the opposite emphasis.

---

## B. Homepage Structure (rendered order) [V + C]

`components/enterprise/home.tsx`. Eight blocks. Heights at 1440 / 390 measured from the live DOM. Total page height **6,691px @1440, 8,725px @390**.

| # | Section | Heading | Bg | Height 1440 / 390 | Padding (T/B) |
|---|---|---|---|---|---|
| 0 | Hero (`.home-hero`) | "Confidence for what comes next." | white | 755 / 1078 | 86 / 0 |
| 1 | Where do you begin (`ChallengeExplorer`) | "Start with the challenge in front of you." | `#f7f8fa` | 536 / 644 | 104 / 104 |
| 2 | What we do (`CapabilityList`) | "The right expertise. A connected approach." | white | 849 / 878 | 104 / 104 |
| 3 | Products (`ProductShowcase`) | "Turn complex requirements into practical work." | `#f7f8fa` | 961 / 1145 | 104 / 104 |
| 4 | Industries (`IndustryShowcase`) | "Your sector. Its own perspective." | white | 1007 / 973 | 104 / 104 |
| 5 | Insights (3 cards) | "Ideas to inform your next decision." | `#f7f8fa` | 861 / 1662 | 104 / 104 |
| 6 | Why HabileSec | "Advice that connects to action." | white | 864 / 1082 | 104 / 104 |
| 7 | CTA band (`Talk`) | "A clearer path starts with a conversation." | `#f0f4f7` | 352 / 348 | 80 / 80 |

Then footer. **Backgrounds strictly alternate white / #f7f8fa** (sections 1–6). The page is essentially white-on-white with a 3% grey flip — the "differentiation" between sections is a 1-shade background change that is barely perceptible. [V]

---

## C. Inner Pages

All use `PageHero` (grey `#f7f8fa` band, breadcrumb, H1, lead, optional button, optional 4:3 image on the right) → 1–3 content sections → the same `Talk` CTA band → footer. [C+V]

| Page | Structure (in order) | Hero image |
|---|---|---|
| `/what-we-do` | Hero → "Our capabilities" split (heading left, same `CapabilityList` accordion as home) → "Our practices" 3 text columns → Talk | `business-advisory` |
| `/what-we-do/[slug]` | Hero → 2-col (sticky "On this page" index + overview, bullet list, "How we can help" list, "Our approach" numbered list) → Talk | `secure-engineering` or `business-advisory` (2 photos across 5 categories) |
| `/services/{grcloop,forgeloop,hexn6}` | Hero → 2-col grid of rule-topped text groups → "How we work" process strip → Talk | `business-advisory` / `secure-engineering` |
| `/products` | Hero (no image) → **same `ProductShowcase` as home** → "Find the right fit" split + callout → Talk | none |
| `/products/{tanikkai,certanika-lite}` | Hero (no image) → split with numbered feature list → split text block → Talk | none |
| `/products/certanika` | Hero → one split text block → Talk | none |
| `/industries` | Hero (no image) → 3×2 photo-card grid → Talk | none |
| `/industries/[slug]` | Hero w/ image → split (risk / how we help lists) → "Connected capabilities" 3 text columns (**same block as /what-we-do**) → Talk | sector photo |
| `/insights` | Hero (no image) → filter chips + 3-col card grid (alternating 2 photos) → Talk | none |
| `/insights/[slug]` | Hero → sticky index + prose → compact Talk | none |
| `/about` | Hero w/ image → "Our purpose" split → "Why HabileSec" 3-col → founders 2-up → Talk | `business-advisory` |
| `/contact` | Hero (no image) → split info + form panel → "Our presence" city list (text only) | none; **no Talk band** |
| `/our-work` | Hero → "Our approach" **same 3 practice cards** → Talk. Contains no work, case studies or outcomes. | none |

---

## D. Global Design System (actual values) [C, measured in browser where noted]

**Fonts** — one family: Manrope (`--font-site`, fallbacks Segoe UI/Arial). Loaded [V]. `DM Serif Display` file exists but is unused. No serif/display pairing, no numerals face, no mono.

**Type scale** [V computed @1440]
| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 home | 72px (`clamp(40,5vw,72)`) | 500 | 1.1 (79.2px) | −0.045em (−3.24px) |
| H1 inner | `clamp(36,4.6vw,64)` | 500 | 1.1 | −0.045em |
| H2 | 44px (`clamp(28,3.2vw,44)`) | 500 | 1.2 (52.8px) | −0.035em |
| H3 | 23px (`clamp(20,1.8vw,25)`) | 500 | 1.35 | −0.025em |
| Body/intro | 17.28px | 400 | 1.65 | normal |
| Eyebrow | 12px (10–11px in cards/footer) | 600 | 1.5 | 0.1em uppercase |
| Buttons/nav/links | 14px | 500–600 | 1.65 | normal |
| Small labels | 10–13px (`.workspace-foot` 11px, `.footer-bottom` 11px, `.editorial-card .eyebrow` 10px) | — | — | — |

Observation: **one weight (500) is used for every heading from H1 to H3**; hierarchy comes only from size. Weight 600 only for eyebrows/buttons. No bold/light contrast, no accent word styling beyond a blue full stop. Tight negative tracking on H1/H2 is applied uniformly. Many labels (10–12px) are below comfortable size.

**Colour** (`:root`, `app/globals.css:5-14`; Tailwind aliases map to the same vars)
| Token | Value | Use |
|---|---|---|
| `--background` | #fff | page |
| `--surface` | #f7f8fa | `.alternate` sections, page-hero, cards |
| `--text` | #17212b | headings/body |
| `--secondary` | #52606d | all body copy |
| `--border` | #e3e7eb | every divider |
| `--navy` | #123b63 | buttons, selected states |
| `--accent` | #2874a6 | eyebrows, numbers, plus icons, links hover |
| hard-coded | #f0f4f7 (CTA band), #edf3f8 (chip selected, tailwind `mist`), #20527e (button hover), #aab7c3 (form border), #dcebf5 (selection) | scattered, not tokenised |

There is **no dark/brand-saturated surface, no gradient, no secondary accent, no tint scale**. The whole site uses ~2 blues and greys. Navy is used only for buttons. The logo's red/orange (visible in the HabileSec head mark) is never echoed anywhere in the UI. [V]

**Spacing** — tokens `--space-1…16` (4–64px) are **defined but never referenced** in CSS (grep: spacing values are hard-coded px). Section spacing `--section-space: clamp(56px, 7.2vw, 104px)` → 103.68px top/bottom on desktop. Typical stack: eyebrow 20px margin → H2 → intro 20px → `.section-head` margin-bottom 48px → content.

**Containers** — single `.container` 1360px max incl. gutter (`clamp(20px,4vw,48px)`) → ~1264px content. Text measures: `.section-head > div` 780px, `.section-intro` 640px, `.section-copy` 480px, `.page-lead` 720px, `.hero-copy p` 480px, `.page-hero h1` 1000px. No full-bleed layouts anywhere.

**Radii/shadows** — images 4px; buttons/inputs 2px; **no shadows** except the nav dropdown (`0 12px 28px rgb(23 33 43 / 6%)`). Borders 1px `--border` used for everything.

**Buttons** — `.e-button` navy fill, 48px high, 2px radius, 14px/600, space-between with an arrow icon; `-secondary` variant defined but never visibly used; `.text-link` (14px/600 navy with arrow); `.site-button` duplicate of `.e-button` for the form. Hover: background `#123b63 → #20527e` (180ms) [V]; arrow icon nudges 2px.

**Cards** — there are effectively **no boxed cards**; "cards" are rule-topped text columns (`.practice-card`, `.principle-grid article`, `.detail-grid article`: `border-top:1px`), photo+text cards (`.editorial-card`, `.sector-card`), and one white bordered panel (`.product-workspace`, `.enquiry-panel`).

**Motion tokens** — one easing `--ease: cubic-bezier(.22,1,.36,1)`; durations 180ms (button bg), 200ms (icon), 240ms (`content-in` keyframe on `<details>` content), 400ms (editorial image scale 1.025).

**Breakpoints** — `max-width: 1099px`, `799px`, `479px` only (3 media queries + reduced-motion). Desktop navigation switches to hamburger below 1100px, so a 1024px laptop/landscape tablet gets the mobile menu.

**Inconsistencies / gaps in the system**
1. Spacing tokens unused; many magic numbers (28/32/40/48/64/96/104/112).
2. Colours repeated as literals; no tint scale for sections.
3. `.e-button-secondary`, `.site-button`, `.arrow-link` styling overlap or are unused.
4. Mixed card heading elements (h2 on `/industries` & `/insights`, h3 elsewhere) to satisfy outline rules — OK for a11y but visually identical.
5. Tailwind installed but unused for layout → two systems of record (CSS + token aliases).
6. Eyebrow sizes 10/11/12px inconsistent.

**Verdict:** a *tidy* token set and a *consistent* component set, but it is a **minimal** system — not a premium one. It has no depth: no surface hierarchy, no accent colour range, no typographic contrast, no motion language, no imagery system.

---

## E. Visual Problems (detailed)

### E1. Repeated composition — exactly where
The page-level formula `eyebrow → H2 → grey intro → [content] → text-link` repeats in every homepage section:

| Section | Composition |
|---|---|
| 1 Begin | eyebrow / H2 / intro (left) + accordion list (right) |
| 2 What we do | `SectionHeading` (eyebrow/H2/intro) → *second* 2-col: intro + link (left) + accordion list (right) |
| 3 Products | `SectionHeading` → tabs + copy left, white panel with numbered list right |
| 4 Industries | `SectionHeading` + link → numbered list left, image right |
| 5 Insights | `SectionHeading` + link → 3 image cards |
| 6 Why | image left, eyebrow/H2/intro/numbered list/link right |

- **Sections 1 and 2 are the same component twice** — a `<details>` accordion with `01 / Title / +` rows (`ChallengeExplorer` vs `CapabilityList`, both with 24px padding, number + plus icon, same borders, one white one grey). Back-to-back, with the same left-heading/right-list split, at `1fr/1fr`-ish proportions. [V]
- **Sections 3, 4 and 6** all contain a **numbered list with `01 02 03` accent numbers and hairline dividers** (`.product-workspace li`, `.industry-selector button`, `.differentiators`). Together with sections 1–2 this is **five of six sections using the same "number + hairline row" idiom**. [V]
- Every section ends with the same blue text-link-with-arrow.
- Every section opens with the same blue-uppercase eyebrow, the same 44px medium-weight H2, and the same grey intro.
- Inner pages reuse the identical blocks: `CapabilityList` (home §2 and `/what-we-do`), `ProductShowcase` (home §3 and `/products`), the three practice columns (`/what-we-do`, `/industries/[slug]`, `/our-work`), the numbered `differentiators` (home §6 and `/about`), `Talk` (every page).

### E2. Weak hierarchy
- Every heading is weight 500, same dark colour; sizes step 72 → 44 → 23 with nothing between and no emphasis device. Body is mid-grey (#52606d) at 15–17px everywhere, so no sentence ever "pops".
- No data/figures, no large numerals, no pull-quotes, no scale contrast.
- Hero H1 is the only display moment; the rest of the page reads at a single volume.

### E3. Hero
- Hero is a **two-column "text left / 5:4 stock photo right"** (`home.tsx:216-280`). The same pattern is repeated by `PageHero` on 8 inner pages. [V]
- Photo = `business-advisory.webp` (two men and a woman at a conference table, generic stock). It also appears in: BFSI industry, insight card 1 and 3 (same page), `/what-we-do`, `/about`, GRCLoop, two service categories. [V]
- Delivered image is 662×346 (next/image w=750 from a 1200×627 source) shown in a **581×465 5:4 box with `object-fit: cover`**. The 1.91:1 image is cropped to ~65% of its width and upscaled ~1.3× vertically (~2.7× on a 2× display) → soft. [V measured]
- Caption below photo ("Business priorities. Connected expertise.") is 12px grey and adds nothing.
- The "One connected approach" strip (GRCLoop / ForgeLoop / HexN6) under the hero is the most useful content on the page but is styled as a thin footnote (13px grey label, 16px names, 12px descriptors).
- No motion, no layering, no depth, no brand mark; the hero would be identical on any consultancy.

### E4. Whitespace (see also Section 4 detail) 
- 104px top and bottom on all six content sections = **208px of empty band between content blocks**; combined with `.section-head` margin 48px, headings float far above content.
- Heading-to-content gaps and half-empty columns (see §E5).

### E5. Section-specific composition defects [V]
- **Products (home §3)**: `.product-showcase` uses `align-items:center` so the left tab/copy column is vertically centred against the taller white panel. Result: a ~230px empty block under the heading on the left, the right half of the heading row empty, and a tab strip that looks orphaned. Section is 961px tall for ~510px of real content. File: `globals.css:546-551`.
- **What we do (home §2)**: the sub-intro + link sit in a 360px column beside a five-row accordion; the lower-left ~300px of the section is empty; the heading wraps awkwardly: "The right expertise. A / connected approach." (orphaned "A") because `text-wrap: balance` is overridden by the width. 
- **Industries (home §4)**: the selector list ends at ~y=675 while the photo column runs to ~900 → left column has ~230px dead space under the list. The photo is a **16:9 Houses of Parliament (London) image for "Government"** for an Indian firm — a content mismatch. "Explore industries" link is floating top-right and separated from its heading by ~100px.
- **Insights (home §5)**: card titles wrap to different line counts so "Read perspective" links sit at different heights (y=735 vs 702). Cards 1 & 3 use the identical photo. Photos are stock and unrelated to the article titles.
- **Why HabileSec (home §6)**: portrait 4:5 crop of the same `secure-engineering` photo as insight card 2 — visibly low-res/blurry at 523×654 [V]; vertical centring leaves excess blank above/below the text column.
- **Why/Begin**: the copy block is heading + intro only, with nothing under it to balance the long right column (left column 60% empty).
- **CTA band (`Talk`)**: a grey-blue bar with left text and a lone button far right (1132–1352px) — identical on all ~12 pages. Strong CTAs normally earn a unique visual moment; this one is a repeated strip.

### E6. Imagery
- Only 6 distinct stock photos for the entire site; two of them (business-advisory, secure-engineering) carry ~75% of all image slots (≈15 uses across routes). Photos are light-toned corporate stock with no consistent grade/crop/art direction.
- No brand imagery, no product UI, no diagrams, no iconography, no illustration, no photographic detail of India/Kumbakonam team, no certification/partner logos, no maps (despite a `world.geojson` and a 5-city presence list that is plain text).
- Higher-quality purpose-built assets exist in `public/images/**` (service/industry/challenge photos at 1600–2000px) but are not used.

### E7. Navigation & footer
- Header is `position: relative` — **not sticky** [V: header top = −1500px after scroll]. On long pages there is no persistent nav or CTA. White header, 96px high, 14px links, "Let's talk" text link with left border (not a button).
- Dropdowns use native `<details>`: they open on click only (no hover/intent), no featured image/panel, no per-item icon; two columns of text rows. Simple, accessible, but not enterprise-mega-menu quality. The "Products" dropdown has just two items.
- Footer: white, 4 columns of 13px text, no brand-colour moment, no large wordmark, no newsletter/offices/credentials. Visually indistinguishable from the page body above (page → grey CTA → white footer).
- Active nav state = blue text only.

### E8. Mobile [V at 390px]
- Homepage = 8,725px (≈10 screens). Hero alone is 1,078px: copy → button → text link → photo → practice list; the image first appears at y≈534, below the fold.
- All 3 insight cards stack as full-width 3:2 photos (section 5 = 1,662px, two identical photos).
- Sections keep the same stack (eyebrow, H2, intro, content, link) with 56px vertical padding — fine individually, but with no variety it scrolls like a long single document.
- Industry selector collapses to a 2-column chip grid (`.industry-selector`), image below. OK functionally.
- No bottom/sticky CTA; header contact link hidden `<480px`.
- Mobile menu works (screenshot `390-menu-open.png`).

### E9. Section transitions
- Hard horizontal cut between bands; a 1px border only on CTA band. No overlap, no angled/curved/stepped edges, no colour fade, no image bleed across sections. Transition difference white↔`#f7f8fa` is ~3% luminance. [V]

### E10. Content/visual mismatch
- `/our-work` has no work content (just the 3 practice columns again).
- `/products` hero has no image and the product "workspace" is a fake list in a bordered box, not an actual product visual.
- `/contact` has no map/image and no Talk band; "Our presence" is five underlined words.

---

## F. Animation Audit

### Inventory [C, confirmed by live `document.getAnimations()`]
| Element | Effect | Trigger | Implementation |
|---|---|---|---|
| `.e-button` | bg colour #123b63→#20527e | hover | CSS transition 180ms. **Verified** [V] |
| `.text-link svg` | arrow translates (2px,−2px) | hover | 200ms transform |
| `.text-link` | underline | hover | no transition |
| `<details>` summary icons (+) | rotate 45° | open | 200ms transform |
| `.challenge-answer`, `.capability-body` | opacity .2→1 + 4px rise | open | `@keyframes content-in` 240ms [V: animation present after click] |
| `.editorial-card img` | scale 1.025 | hover | 400ms (home §5 and /insights) |
| `.nav-disclosure` chevron | rotate 180° | open | transform (no transition declared) |
| Product tabs / Industry selector | **instant swap** (no cross-fade; industry `<Image key=…>` simply remounts) [V: 0 running animations after click on industry] | click | React state |
| `.practice-card:hover h3`, `.sector-card:hover h2`, nav links | colour swap | hover | no transition |

**Page load: 0 running animations on all 14 sampled routes × 3 viewports.** No element is hidden-then-revealed (8 elements with opacity ≠ 1 only from the transition states). **No scroll-triggered animation, no parallax, no sticky storytelling, no counters, no reveals, no image transitions, no page transitions** (`app/template.tsx` is empty). Dropdowns appear/disappear instantly.

### Library
None installed. Everything is CSS.

### Does motion support purpose?
The only motion is microfeedback. It is competent but **imperceptible at the narrative level**: nothing guides the eye, nothing explains the connected model, nothing differentiates sections. "Animations missing" rather than "ineffective".

### Hover/touch
- Hover effects work on desktop [V for buttons]. Cards have almost no hover state except the editorial image zoom and title colour.
- All content-bearing interactions are click/tap (native `<details>`/buttons), so touch works. No hover-only content exists (good). No swipe/carousel interactions.

### Reduced motion
Present: global `@media (prefers-reduced-motion: reduce)` (animation/transition durations → 0.01ms, scroll-behavior auto) [C; media query matched in the reduced-motion test context — V]. Good foundation for adding richer motion safely.

### Where motion would genuinely help (not decoration)
1. **Hero / "connected approach"**: three practices as one loop — a slow, non-looping draw-in of the connection (GRC ↔ Forge ↔ Hex) explains the proposition.
2. **Challenge explorer → outcome**: selecting a challenge should morph a visual panel (image/diagram + next steps) instead of expanding a row; cross-fade 250–350ms.
3. **Capabilities**: sticky left panel with scroll-linked active service (number + image change) — scroll-driven storytelling for 5 capabilities.
4. **Industries**: image cross-fade/clip-reveal with a caption transition; hover/focus previews on the index list.
5. **Products**: UI-preview tab transitions (feature list animating into a product mock).
6. **Why/approach**: step-by-step timeline (progress line drawing on scroll) for "assess → prioritise → strengthen".
7. **Stats / presence** (only if business confirms figures): counters and a map pin reveal for the 5 offices.
8. **Section transitions**: short staggered reveal (≤4 items, 60–80ms stagger, 400–500ms, once) on headings/lead copy only.
9. **Header**: sticky with compressed height on scroll; dropdown panel fade/slide 160ms with intent delay.
All must be gated by `prefers-reduced-motion` and keep content readable without JS.

---

## G. Section-by-Section Redesign Directions (Homepage)

> Direction only; no implementation. "Inspiration" = design principles, not copied layouts (reference sites were not browsed — see limitations).

### G0. Global header
1. Layout: sticky, 72px→60px on scroll; mega-panel for What We Do with a left list + right featured visual/related practice; Products panel with product visuals. 2. Why: 5 capabilities + 3 practices + 2 products need orientation, not just a link list. 3. Imagery: small product/service thumbnails. 4. Motion: panel fade-slide 160–200ms, hover-intent. 5. Interaction: hover + click/keyboard parity. 6. Desktop: full panel. 7. Mobile: full-screen drawer with accordion groups + fixed "Let's talk". 8. Differs: sets a persistent anchor so sections can vary. 9. Inspiration: enterprise consultancy mega-navs (clear grouping + featured content).

### G1. Hero (current: text + stock photo + practice strip)
1. **Layout**: taller, immersive composition: oversized headline on a deep-tint or imagery-led canvas with a layered visual (cropped photo + brand-coloured geometric/“loop” motif) and the three practices as a prominent, interactive "connected loop" row (not a footnote). 2. Reason: the company's differentiator is *connected* GRC + engineering + response; the hero should show it. 3. Imagery: use the unused 1672×941 hero asset or a bespoke illustration/photo with art direction; avoid the reused conference-table image. 4. Motion: headline line reveal, practice loop draws once, subtle image parallax ≤20px. 5. Interaction: hover/focus on a practice highlights its segment and previews a one-line outcome + link. 6. Desktop: ≈85–90vh, sticky header overlays. 7. Mobile: image top as a 4:5 crop, headline overlaid or directly beneath, practices as horizontally snapped chips (keep ≤ 1 viewport + 20%). 8. Differs: only dark/rich or full-bleed moment at the top → sets rhythm. 9. Inspiration: editorial hero with typographic scale contrast (UBS/Deloitte-style restraint), image-led (PwC/KPMG).

### G2. "Where do you begin?" (accordion #1)
1. **Layout**: *challenge selector → outcome panel*. Left: four large challenge options; right: sticky visual panel that changes (image/diagram + 2–3 bullets + CTA to the right capability). 2. Why: this is a decision aid, not an FAQ; it should resolve to a path. 3. Imagery: use the unused `images/challenges/*` (cybersecurity, governance-compliance, data-privacy, business-resilience). 4. Motion: 300ms cross-fade + 8px translate on selection; active underline slide. 5. Interaction: click/tap/arrow-keys; deep-link to the chosen service. 6. Desktop: 5/7 split. 7. Mobile: selector as horizontally scrollable pills, panel below. 8. Differs from §3 (capabilities): it is intent-based, image-bearing, and *not* an accordion — **remove the identical accordion idiom here**. 9. Inspiration: guided-path/“what are you looking for?” components on consultancy sites.

### G3. What we do (accordion #2)
1. **Layout**: *sticky-scroll storytelling*: left column pins the heading + a large 01–05 index; right column scrolls five capability "chapters" (large number, image, 3–4 services, link). 2. Why: five service lines with substantial content merit full-height chapters, not 24px rows. 3. Imagery: `images/services/*.webp` per category. 4. Motion: index highlight and image swap tied to scroll position (IntersectionObserver / scroll timeline), number transition; static stack on reduced motion. 5. Interaction: click the index to jump; keyboard-focusable. 6. Desktop: sticky left 40% / scroll right 60%, each chapter ≈70vh. 7. Mobile: normal vertical stack of chapters with a sticky small progress indicator or a tab strip. 8. Differs: the only long, scrolling, image-led section; contrast with the tight selector above and the tabbed product block below. 9. Inspiration: sticky chapter navigation used by editorial/consulting storytelling pages.

### G4. Products
1. **Layout**: *product stage* on a deeper tinted or navy-tinted band: large product name, tab pills, and a **product-style UI mock** (built from real feature names) with 5 features highlighted sequentially. 2. Why: the products are software; show them as software. 3. Imagery: product screenshots if available (none in repo) or a clean UI illustration; Tanikkai/Certanika logos only if provided. 4. Motion: tab transition = panel slides/cross-fades; feature rows highlight in turn (≤6s once, user-controlled afterwards). 5. Interaction: tab/keys; hover feature → mock highlights its module. 6. Desktop: full-width stage, mock 60%. 7. Mobile: tabs as segmented control, mock simplified into stacked feature cards. 8. Differs: the only "tinted, tech-forward" band; remove the empty heading-left/void-right pattern (fix `align-items:center`). 9. Inspiration: SaaS-in-enterprise product showcases.

### G5. Industries
1. **Layout**: *full-bleed image tile strip / expanding panels*: six vertical tiles that expand on hover/focus to reveal name, risk statement and link; one is open by default. 2. Why: six peers, visual by nature, scannable at once. 3. Imagery: **replace the London Parliament image with India-relevant imagery**; use `images/industries/*` (banking-financial, healthcare-life-sciences, technology-saas, retail-ecommerce, fintech, professional-services) plus manufacturing/government that fit. Consistent colour grading + duotone overlay. 4. Motion: width/flex transition 350–450ms with text reveal; image slight scale. 5. Interaction: hover (desktop), tap-to-expand (touch), keyboard focus parity. 6. Desktop: full-width row ~520px tall. 7. Mobile: stacked horizontally-snapped cards or tap-to-expand accordion with image header. 8. Differs: it is the only full-bleed, horizontal, image-dominant section. 9. Inspiration: sector explorers on global firm sites (expanding tiles).

### G6. Insights
1. **Layout**: *editorial magazine*: one large feature (2/3 width) + two stacked smaller entries with category, read-time (if real), date (if real), a title-only list below. 2. Why: hierarchy signals editorial curation; equal three-card grid reads as filler. 3. Imagery: distinct per-article imagery or typographic cover tiles (large category numerals on brand tints) rather than reused stock. 4. Motion: image mask/scale on hover; headline underline wipe. 5. Interaction: hover pushes arrow; filter chips on `/insights`. 6. Desktop: asymmetric 8/4 grid. 7. Mobile: feature on top, others as compact list rows with thumbnails (cuts the 1,662px stack by ~40%). 8. Differs: the only asymmetric grid; contrast to the uniform lists above. 9. Inspiration: publication/“latest thinking” modules.

### G7. Why HabileSec
1. **Layout**: *credibility/proof block*: large statements with oversized numerals, brand-colour panel, short timeline since 2020 and the five office locations as an India map. 2. Why: "why us" needs proof (only add figures the business confirms — `CONTENT_REVIEW.md` excludes unconfirmed stats). 3. Imagery: India map (`world.geojson` exists), real team/office photography, certifications only after approval, founders strip. 4. Motion: numerals count/fade in once; map pins reveal in sequence; vertical timeline draws. 5. Interaction: hover pin → city detail. 6. Desktop: 2-col with map/large type. 7. Mobile: stacked statements; map simplified to chips. 8. Differs: the darkest/most typographic block on the page; breaks the "image left / list right" pattern used by §4 and the hero. 9. Inspiration: "by the numbers" and presence modules on professional-services sites.

### G8. Closing CTA
1. **Layout**: full-bleed, brand-colour (navy) panel with an oversized sentence, 2 actions (talk / email), and a small office/phone strip; overlap onto the footer by 40–80px. 2. Why: the final conversion deserves a distinct moment; also makes footer feel intentional. 3. Imagery: subtle pattern/graphic derived from the logo shield; optional faint image. 4. Motion: headline reveal once; button arrow. 5. Interaction: primary + mailto. 6. Desktop: ~360–420px. 7. Mobile: stacked, buttons full width. 8. Differs: **the only saturated dark band** — currently the CTA is the same pale band on 12 pages; vary tone/copy per page type. 9. Inspiration: bold closing CTAs on enterprise sites.

### G9. Footer
Dark navy (or deep neutral) with large HabileSec mark, grouped links with headings, contact column, LinkedIn, legal; optional back-to-top. Mobile: collapsible link groups.

### Rhythm summary (suggested)
hero (rich/dark-tint, full-bleed) → selector (light, interactive split) → sticky chapters (white, tall) → product stage (tinted/dark) → expanding tiles (full-bleed images) → editorial grid (light) → proof/map (brand colour) → CTA (navy) → footer (dark). Adjacent sections then differ in background, layout, imagery treatment and interaction.

---

## H. Inner-Page Redesign Directions

**Keep for consistency** (useful repetition): header/footer, breadcrumb style, eyebrow/H2/body type scale, CTA button style, thin-rule list idiom, `Talk`-style closing (but vary variants), accessible native controls, focus styles, reduced-motion handling.

**Make distinctive** (currently generic template): hero treatments, page-opening composition, the middle sections, and the CTA.

| Page | Direction |
|---|---|
| `/what-we-do` | Hero: typographic with a five-service index (anchored, with large numerals and a visual strip), not stock photo. Body: the sticky-chapter section (as home §3), then practices as a three-column "loop" diagram. Avoid reusing the home accordion. |
| `/what-we-do/[slug]` | Hero image per category (`images/services/*`) with category colour tint; "On this page" becomes a sticky pill nav; "How we can help" as a service grid with tag/icon; "Our approach" as a horizontal/vertical stepper with progress; related-product and related-industry strip (cross-links). |
| `/services/{grcloop,forgeloop,hexn6}` | Each practice gets its own accent treatment (colour tint, signature graphic) and a dedicated hero; lifecycle shown as an interactive loop diagram (the names imply loops); group lists become tabbed or accordion-by-discipline. |
| `/products` | Product comparison: two large product "stages" side by side with a "which fits you" selector; real UI visuals; avoid repeating the home showcase verbatim. |
| `/products/*` | Hero with product mock/visual, feature grid with icons, workflow steps, FAQ, request-demo form block. Currently these pages are text only with no imagery — the weakest pages. |
| `/industries` | Mosaic/expanding tiles with risk-themed captions; unique hero (e.g., sector index strip). |
| `/industries/[slug]` | Image-led hero with sector tint; "risks → how we help" as a two-column contrast panel; relevant practice recommendation (not the generic 3-card block); sector-specific insight links. |
| `/insights` | Featured article hero + filter bar + masonry/asymmetric grid with per-article visuals; article page: reading progress bar, pull-quotes, author/date only if real, related reading. |
| `/about` | Story-led: purpose statement as large type, timeline from 2020, mission/vision as two contrasting panels with the existing `what-guides-us/*` imagery, founders as larger editorial portraits with quote; presence map. |
| `/contact` | Split layout with a stronger visual side (office photo/map), expectation-setting steps ("what happens next"), direct contact cards, form retained; add the closing CTA only where non-redundant. |
| `/our-work` | Needs real content (case studies, outcomes) or should be merged/removed; currently the same practice cards. |

**CTA variants**: (1) navy conversation band (default), (2) product demo CTA (products pages), (3) inline contextual CTA (industry/services: "Talk to a {practice} specialist"), (4) compact CTA (articles).

**Transitions**: short page-enter fade (≤250ms) and anchored smooth scroll; optional shared-element feel for tile → detail (only if reliable on Next 16 view transitions).

---

## I. Screenshot Inventory

Directory (outside the project; session scratch):
`C:\Users\HABILE~1\AppData\Local\Temp\claude\c--Users-Habilesec-OneDrive-Desktop-Habilesec\5af611f9-6dae-4a73-967c-003c84b4ee3f\scratchpad\shots\`
(= `C:\Users\Habilesec\AppData\Local\Temp\claude\…\scratchpad\shots\`). Capture script: `…\scratchpad\capture.cjs`; probe: `probe.cjs`; metrics: `report.json`.

**Full-page, Chromium via Playwright, DPR 1, after scroll-through to load lazy images.** Naming: `{viewport}-{page}.png`.

| Viewports | Pages (14 each) |
|---|---|
| 1440×900, 768×1024, 390×844 (390/768 with touch) | `home`, `what-we-do`, `service-cybersecurity` (/what-we-do/cybersecurity), `products`, `product-tanikkai`, `product-certanika`, `insights`, `insight-detail` (/insights/continuous-assurance), `industries`, `industry-government`, `contact`, `about`, `our-work`, `practice-grcloop` (/services/grcloop) |

= 42 full-page screenshots.

**Homepage per-section** (element screenshots): `1440-home-section-0…7.png`, `390-home-section-0…7.png` (0 hero … 6 why, 7 CTA). Also `1440-header.png`, `1440-footer.png`, `390-header.png`, `390-footer.png`, `390-menu-open.png` (mobile nav tapped), `probe-industry.png` (selected industry tab).
**Not separately captured**: per-section shots at 768 (full-page 768 captured instead); full-page screenshots for `/privacy-policy`, `/terms-conditions`, `/services/forgeloop|hexn6`, `/products/certanika-lite`, other industry/service slugs, hover states other than the button check.

**Visually inspected by me** (viewed, not just captured): 1440 home sections 0–7; 1440 products, what-we-do, about, contact, industries, service-cybersecurity; 390 home sections 0 and 5. The remaining captures were measured (heights, overflow, errors, animation count) but not individually viewed.

**Measured (all 42 pages)**: no console/page errors, no horizontal overflow, 0 running animations after load. Heights (1440/768/390): home 6691/8264/8725; what-we-do 2664/3583/3686; service detail 3597/4081/4519; products 2473/2990/3134; industries 2318/2805/4160; insights 2634/3147/4225; about 3629/4045/4711; contact 2206/2705/3090; grcloop 3695/4086/5417.

Previously captured QA images from the original builder exist in `artifacts/` and `.artifacts/` (not mine; not relied on).

---

## J. Top 15 Issues (ranked by visual importance)

| # | Problem | Where | Code evidence | Visual impact | Recommended direction | Priority |
|---|---|---|---|---|---|---|
| 1 | **No signature hero**: generic text-left/stock-photo-right, nothing communicates the "connected" proposition | Home hero; 8 inner heroes | `home.tsx:216-280`, `shared.tsx PageHero`, `globals.css:362-437, 790-831` | First impression reads "template"; same hero on most pages | Immersive, image-led/brand hero; interactive practice loop; unique hero per page family | High |
| 2 | **Same section formula and idiom repeated** (eyebrow/H2/grey intro/numbered-hairline list/text-link), incl. two identical accordions back-to-back | Home §1–§6 | `ChallengeExplorer` & `CapabilityList` (`interactive.tsx:778-827`), `.differentiators`, `.product-workspace li`, `.industry-selector` | Page feels like one repeated block | Give each section its own composition (selector panel, sticky chapters, product stage, tiles, editorial grid, proof) | High |
| 3 | **Almost no motion / no storytelling**; zero animations on load/scroll, instant tab swaps | Site-wide | `globals.css` only 1 keyframe; no animation library; empty `template.tsx` | Static, "unfinished" | Purposeful motion system (reveal, scroll-driven chapters, cross-fades, counters) with reduced-motion | High |
| 4 | **Imagery**: 6 stock photos re-used ~15×; same photo in adjacent cards; low-res crop; mismatched (London Parliament) | Home §5, §4, §6; most inner pages | `data/enterprise.ts` `industryMedia`/`serviceMedia`; `home.tsx:355-359`; `pages.tsx:570-574` | Looks cheap and repetitive; credibility hit | Art-directed set; use unused `public/images/**`; commission/choose India-relevant photos; consistent grade | High |
| 5 | **Flat, low-contrast palette**: white / #f7f8fa / navy buttons only; no dark or brand bands; logo's accent colours unused | Site-wide | `:root` tokens `globals.css:5-14`; `.alternate` | Sections blend together; no hierarchy of surfaces | Tint scale + a deep navy surface + accent range; use full-bleed colour bands | High |
| 6 | **Single-weight, single-voice typography** (500 for every heading; grey body); 10–12px labels | Site-wide | `h1/h2/h3` rules `globals.css:63-80`; `.eyebrow` | Weak hierarchy; no editorial feel | Display/serif or weight contrast, large numerals, pull-quotes, size/weight system | High |
| 7 | **Excessive/purposeless whitespace**: 104px×2 section padding, 48px head margin, half-empty columns | Home §2–§6 | `--section-space` (`:17`), `.section` (`:120`), `.section-head` (`:135`), `.product-showcase{align-items:center}` (`:546`) | ~30–40% of every section is empty; long scroll | Tighten rhythm (64–88px), vary density, fill columns with purposeful content | High |
| 8 | **Header not sticky; basic dropdowns; hamburger below 1100px** | All pages | `.site-header{position:relative}` (`:237`), `header.tsx`, media `1099px` | No persistent nav/CTA; dated feel | Sticky compact header; mega panel with visuals; revisit breakpoint (~1024) | High |
| 9 | **Products shown as bordered list, no product visuals; product pages text-only** | Home §3, /products, /products/* | `ProductShowcase` (`interactive.tsx:828-888`), `PlatformDetail` (`pages.tsx:250-305`) | Product offering is unconvincing | UI mock/screens, feature grid, flow, demo CTA | High |
| 10 | **Closing CTA band identical on ~12 pages; footer same tone as page** | Everywhere | `Talk` (`shared.tsx:524-540`), `.talk-section` (`:771`) | No conversion moment; no site "ending" | Navy/dark CTA variants; dark footer with brand presence | Medium |
| 11 | **Industries section: unbalanced two columns, long list vs tall image, mismatched image** | Home §4 | `.industry-showcase` (`:637`), `industryMedia` | Dead space under list; weak sector feel | Expanding tiles/mosaic with proper imagery | Medium |
| 12 | **Insights cards: reused photos, ragged CTA alignment, uniform grid** | Home §5, /insights | `home.tsx:346-374`, `PerspectiveBrowser` | Looks like a placeholder blog | Feature + list hierarchy; per-article visuals | Medium |
| 13 | **Inner pages are the same template with text blocks**; `/our-work` has no work; contact/about visually flat | /what-we-do, /our-work, /industries/[slug], /about, /contact | `pages.tsx` (practice-cards reused 3×; Talk on all) | Pages indistinguishable; low engagement | Page-specific layouts (Section H) | Medium |
| 14 | **Hero practice strip (key differentiator) is visually demoted** | Home hero | `.hero-practices` (`:408-437`) small 12–16px grey text | Core message underplayed | Elevate as a primary interactive element | Medium |
| 15 | **Unused/dead assets & data; design tokens unused; one-file CSS** (spacing tokens, `home-sections.ts`, `public/images/**`, DM Serif font, `.e-button-secondary`) | Repo-wide | `globals.css:18-25`; `data/home-sections.ts` | Slows redesign; risk of using outdated copy | Audit, decide reuse vs delete; modularise CSS into tokens/components/sections | Low |

Additional lower-priority observations: eyebrow/footer text at 10–11px; mobile hero image below fold at 390px; no visible focus/hover choreography on cards; email-draft contact flow (not a defect; documented as intentional).

---

## K. Files That Would Need Changes (for a future redesign)

| File | Why |
|---|---|
| `app/globals.css` | Replace/extend tokens (palette tints, dark surfaces, type scale, spacing, motion); split into modules or partials; fix `.section`, `.section-head`, `.product-showcase`, `.industry-showcase`, `.talk-section`, `.page-hero*`, footer; add dark/colour bands and motion classes; revisit 1099px nav breakpoint |
| `tailwind.config.ts` | Align theme with new tokens (or retire Tailwind in favour of the CSS system) |
| `app/layout.tsx` | Add display font(s); sticky header wrapper; possible page transition mount |
| `app/template.tsx` | Currently empty; place for page-enter transitions if desired |
| `components/enterprise/home.tsx` | Re-compose all 8 homepage sections (unique layouts) |
| `components/enterprise/interactive.tsx` | Replace accordions with selector/outcome panel, sticky chapters, expanding tiles, product stage; add cross-fade state transitions |
| `components/enterprise/shared.tsx` | `PageHero` variants, `SectionHeading` variants, `Talk` variants, button variants |
| `components/enterprise/pages.tsx` | Split into per-page files and create distinctive inner layouts (service, practice, product, industry, insights, about, contact, our-work) |
| `components/enterprise/header.tsx` | Sticky behaviour, mega-panel, scroll state, mobile drawer |
| `components/enterprise/footer.tsx` | Dark brand footer, richer structure |
| `components/sections/contact-form.tsx` | Visual restyle only (keep mailto behaviour) |
| `data/enterprise.ts` | Image maps (`industryMedia`, `serviceMedia`), per-section media/captions, challenge/product visual data |
| `data/site.ts`, `data/service-categories.ts`, `data/editorial.ts` | Add imagery references, icons, accent per practice, article imagery/metadata (only real facts) |
| `data/home-sections.ts`, `home-hero.ts`, `business-agenda.ts` | Decide: reuse or delete (currently dead); note unverified claims (e.g., "85+ organizations") |
| `public/media/*`, `public/images/**` | Choose/re-export an art-directed image set; confirm licensing (`ASSET_SOURCES.md`) |
| `package.json` | Only if a motion library is chosen (e.g., none vs Framer Motion/GSAP) — decision for later, not now |
| New: `components/motion/*` (Reveal, ScrollChapter, CountUp), `components/ui/*` | Motion primitives respecting `prefers-reduced-motion` |

---

## L. Overall Assessment

The site is **clean, accessible and consistent — and generic**. It was engineered to pass QA/accessibility checks and to avoid "decorative" effects (`DESIGN_SYSTEM.md`), so what remains is a restrained wireframe polished with one font and two blues. Concretely, it looks like a template because:

1. **One recipe is applied to everything** — the same eyebrow/H2/grey-copy/hairline-list/link block, the same accordion twice in a row, the same CTA on every page.
2. **There is no visual depth**: no dark or saturated surfaces, no layered imagery, no typographic extremes, no shadows/overlaps; alternating white and 3%-grey.
3. **Imagery is thin and repetitive** — six stock photos reused, with better, purpose-made assets sitting unused.
4. **Nothing moves with intent**, so nothing is explained: the "connected expertise" story is told in a sentence instead of shown.
5. **Whitespace isn't doing work** — it is a uniform 104px+ band around content with half-empty columns, not composition.
6. **Inner pages reuse home blocks**, so the site feels like one page copied 14 times.

To reach a premium enterprise-consulting aesthetic: (a) establish a richer system — display typography with weight contrast, tint scale, a deep navy surface, accent from the logo; (b) design each homepage section as a different *kind* of experience (decision selector, sticky chapters, product stage, expanding sector tiles, editorial feature grid, proof/presence, bold CTA); (c) invest in art-directed imagery and product visuals; (d) add a disciplined motion language (reveal, scroll-driven chapters, cross-fades, timeline/counters) with reduced-motion and touch parity; (e) tighten spacing to purposeful rhythm; (f) differentiate inner-page families while preserving the shared header/footer/type/CTA system; (g) keep the accessibility gains (native controls, focus, reduced motion) — they are a strength.

Existing strengths to retain: accessible semantics, local font, skip link, reduced-motion CSS, working mobile nav, fast pages (no layout shift or overflow observed), clear copy, consistent tokens, no console errors.

---

## M. Executive Summary for ChatGPT

**Project**: HabileSec new site (Next.js 16 App Router, React 19, TS, Tailwind 3 used only for token aliases; one 1,670-line `app/globals.css`; Manrope local font; lucide icons; **no animation library**). Light theme only. Rendered & inspected with Playwright/Chromium at 1440/768/390 against the running dev server (`localhost:3000`). Reference sites were **not browsed** (principles only).

**Routes**: `/`, `/what-we-do` (+5 category slugs), `/services/{grcloop,forgeloop,hexn6}`, `/products` (+certanika-lite, tanikkai, certanika), `/industries` (+6), `/insights` (+5), `/about`, `/contact`, `/our-work`, legal pages. All render, no console errors/overflow. All UI lives in 7 files: `components/enterprise/{header,footer,shared,home,interactive,pages}.tsx` and `sections/contact-form.tsx`.

**Homepage order**: Hero (text + one stock photo + tiny practice strip, 755px) → "Where do you begin" accordion (grey, 536) → "What we do" accordion (white, 849) → Products tabs + bordered list panel (grey, 961) → Industries selector list + 16:9 photo (white, 1007) → Insights 3 cards (grey, 861) → Why HabileSec photo + numbered list (white, 864) → pale CTA band (352) → white footer. Page height 6,691px desktop / 8,725px mobile. Sections alternate `#fff`/`#f7f8fa` only.

**Design system**: Manrope only, all headings weight 500 (H1 72, H2 44, H3 23, body 17, eyebrows 12px caps blue). Colors: `#17212b` text, `#52606d` secondary, `#e3e7eb` border, navy `#123b63`, accent `#2874a6`, surface `#f7f8fa`, CTA band `#f0f4f7`. Container 1360 (1264 content); section padding 104px top/bottom (clamp 56–104). 4px radii, 2px buttons, thin 1px rules, no shadows. Breakpoints 1099/799/479. Spacing tokens defined but unused.

**Main visual problems**: (1) generic hero repeated on inner pages; (2) same section recipe (eyebrow/H2/grey intro/numbered hairline rows/blue text link) in every section, plus the identical accordion twice in a row; (3) palette is white/very light grey/navy buttons — no dark/brand bands, logo colours unused; (4) single-weight typography, 10–12px labels, no editorial contrast; (5) only 6 stock photos (all 1200×627, heavily cropped; two photos carry most slots; same image twice in the insights row; London Parliament for "Government"); better assets in `public/images/**` (~45 files) and `Habilesec Ex/public` unused; (6) excessive/purposeless whitespace: 208px of padding between blocks, half-empty columns in Products/What-we-do/Industries/Why; (7) header not sticky, basic click dropdowns, hamburger under 1100px; (8) identical CTA band on ~12 pages; footer same tone as page; (9) products have no visuals; `/our-work` has no work; contact/about flat; (10) dead data from the earlier richer build (`home-sections.ts`, etc.).

**Animation findings**: Zero animations on load or scroll on every page; no scroll triggers, parallax, sticky storytelling, counters, page transitions, cross-fades (tab/industry swaps are instant). Only CSS microinteractions: button bg 180ms, arrow nudge 200ms, +/× rotation 200ms, `content-in` 240ms on `<details>`, editorial image scale 400ms. `prefers-reduced-motion` support exists (global override). Touch works because content uses click/`<details>`; no hover-only content.

**Recommended directions**: Sticky mega-nav; immersive hero with interactive "connected practices" loop; challenge → outcome selector panel (not accordion); sticky-scroll chapters for the 5 capabilities with image swap; product "stage" with UI mock on a tinted/dark band; expanding full-bleed sector tiles with India-relevant imagery; editorial feature + list for insights; proof/presence section (timeline, India map with 5 offices, only verified figures) on a brand-colour band; bold navy CTA and dark footer. Inner pages: per-family heroes, stepper/loop diagrams for approach/lifecycle, product pages with visuals, industry pages with sector tint, story-led About, richer Contact, real content for `/our-work`. Keep consistency in header/footer/type/button/rules/focus/reduced-motion; vary background, composition, imagery and interaction between adjacent sections. Motion only where it explains: crossfades, scroll-linked chapter index, timeline draw, one-time staggered reveals, counters only for confirmed numbers; always reduced-motion/touch alternatives.

**Constraints for the implementation prompt**: light theme only; do not invent statistics, testimonials or certifications (`CONTENT_REVIEW.md`); contact form is a `mailto:` draft; confirm image licences (`ASSET_SOURCES.md`); preserve accessibility (native controls, focus, skip link); logo must keep proportions.
