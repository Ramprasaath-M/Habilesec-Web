# HabileSec redesign — staged progress

Living checklist for the full public-site redesign. Keep build green at every step
(`npx tsc --noEmit`, `npx eslint .`, `npx next build`). Do **not** upgrade Next.js
as a side task — security findings are tracked separately (see bottom).

## Stage 2 — Design foundation
- [x] **Typography → DM Sans** site-wide. Variable font added at
      `public/fonts/dm-sans.woff2`, loaded in `app/layout.tsx`; `--font-ui` and
      `--font-display` repointed in `globals.css`. Manrope + DM Serif removed from
      loading. Heading weights/tracking retuned for sans (h1/h2/.display/.serif-3 → 600).
- [x] **Section header scale tokens** (`--sec-eyebrow/-title/-intro`) shared across
      homepage sections (prevents the earlier drift).
- [ ] Review color tokens vs brief palette (navy/blue already close; audit on inner pages).
- [ ] Button system audit (primary/secondary/ghost) for consistency across pages.

## Stage 3 — Homepage redesign
Current order: Hero → Trust → Business Challenges → **Capabilities (new)** → Approach → Our Commitment → Final CTA.
- [x] **Hero rebuilt** to the approved dark-navy + digital-Earth reference
      (`components/home/hero.{tsx,module.css}`). Copy: "Expertise Beyond Compliance" /
      "Understand Risks. Take the Right Action." CTAs → `/what-we-do` and `/contact`.
      Globe asset `public/images/hero/earth-globe.webp` is baked from NASA Black Marble
      night-lights (public domain) mapped to a sphere + blue atmosphere + network arcs.
      Scroll indicator, staggered entrance, reduced-motion safe. Verified 390/768/1024/1440.
- [x] **Header → floating glassmorphism pill** (Design 8): lavender-white translucent
      glass (`rgba(232,235,255,.88)`, blur 18px), 16px radius, blue-tinted shadow, max-width
      1320, floating 14px from top. Dark logo (`habilesec-logo.png`) on the glass, navy nav
      text `#101B3C` → blue `#1769F4` hover/underline, blue "Contact Us →" CTA (9px radius).
      Dropdowns re-anchored as a floating rounded card aligned to the pill. Hero bleeds up
      behind the pill via negative margin; mobile drawer offset below the pill.
- [x] **"Recognized. Connected. Trusted." recognition strip — built, NOT published.**
      Full component/CSS scaffold exists (`components/home/recognition-strip.{tsx,module.css}`,
      `data/recognitions.ts`) — heading, layout, floating-logo animation, and all 6
      breakpoints tested and working (temporarily, with mock data — reverted after
      testing). **Not mounted on the homepage**: verification against `Habilesec EX`
      found DPIIT, Startup India, and an IIT affiliation all unconfirmed (EX's only
      "Educational Partner" is K. Ramakrishnan College of Engineering, not an IIT);
      everything else in EX's partner/cert folders is personal staff certs or
      client logos, already excluded by this project's own `CONTENT_REVIEW.md`
      policy. Full tracked list: `docs/recognition-strip-pending-verification.md`.
      To publish: populate `data/recognitions.ts` with confirmed entries, copy
      assets into `public/images/recognitions/`, and mount `<RecognitionStrip />`
      in `home.tsx` right after `<Hero />` (comment left in place marking the spot).
- [x] **Navbar widened to full enterprise glass bar** (replacing the earlier
      compact pill): desktop `calc(100% - 48px)`, max-width 1600px, 84px tall, 12px
      top offset, `rgba(225,233,255,.90)` glass. Mobile/tablet stays a compact bar
      (`calc(100% - 24px)`, 68px, 10px offset) below 1024px. Logo bumped to
      175–200px desktop / 125–145px mobile (higher-res source requested via Image
      width/height props for sharpness). True 3-column layout: logo left, nav list
      centered independent of logo/CTA width (`flex:1` + `justify-content:center`
      on the link list), Contact Us CTA right (`#1769F4`, 46px, 9px radius). Removed
      the duplicate "Contact" nav link — Contact Us button is the single contact
      action on desktop and in the mobile drawer. Hero's sticky-overlay bleed offset
      recalibrated to match the new bar height at each breakpoint (78px mobile/tablet,
      96px desktop) so there's no gap between bar and hero. Verified
      375/430/768/1024/1440/1920: no overflow, no overlap, dropdown/mobile drawer
      functional, scroll transition unaffected.
- [x] **Scroll-driven hero overlay** (NCC Group pattern): `Hero` is `position: sticky;
      top: 0` and pins at the top of the viewport; everything below it (`TrustStrip` →
      `FinalCta`) is wrapped in one opaque, higher-stacked layer (`home.module.css`
      `.belowHero`, z-index 1 vs hero's 0) that slides up over the pinned hero as the
      user scrolls — pure CSS, native scroll, fully reversible, no JS/ScrollTrigger.
      Soft shadow lip at the seam. Verified 375/430/768/1024/1440/1920: no overflow, no
      gaps, dropdown + mobile menu stay usable and above the overlay while scrolled.
- [x] **Hero typography pass**: heading `clamp(44px,4vw,64px)`, line-height 1.1,
      `-0.035em`, forced **two lines** on desktop (`Understand Risks.` / `Take the Right
      Action.`) via per-line nowrap, natural wrap < 768px (clamp 30–40px). Description
      `#CBD5E1`, max-width 520px, 1.65. Secondary CTA now a message icon (not video-play).
      Verified 375/430/768/1024/1440/1920 — no overflow, two lines hold through 1920.
- [x] **Capabilities / "What We Do" section (new)** — interactive editorial split
      (`components/home/capabilities.tsx`), sticky intro + numbered accordion of all
      seven capabilities with sub-service chips and per-capability explore links.
      Links verified against `/what-we-do/<slug>`.
- [ ] **Industries** section (data exists in `data/site.ts`; needs distinctive, non-grid composition).
- [ ] **Success Stories** section (real material in `caseStudies`, `data/site.ts`).
- [ ] **Insights** teaser section (data in `data/site.ts` + `/insights`).
- [ ] "Where do you begin?" compact service-finder (optional; brief concept).
- [ ] Retire the 8 orphaned home components (hero-glass, business-reality, company-story,
      challenge-explorer, industry-tiles, insights-editorial, product-stage, service-showcase).

## Stage 4 — Core pages (verify each renders well with DM Sans; recompose weak ones)
- [ ] What We Do index (`/what-we-do`)
- [ ] 7 capability pages (`/what-we-do/[slug]` → CapabilityPage)
- [ ] Products: Certanika Lite, Tanikkai (Certanika page was deleted — confirm intent)
- [ ] Industries index + `[slug]`
- [ ] Insights index + `[slug]`
- [ ] Success Stories / Our Work
- [ ] About
- [ ] Contact (reuse existing mailto-based enquiry flow; confirm backend expectation vs EX)

## Stage 5 — Content migration from `Habilesec Ex` (READ-ONLY)
- [ ] Audit EX `src/data` + `src/app` for About, services, products, testimonials, contact.
- [ ] Reconcile product set (EX may define Certanika separately).
- [ ] Real logos/assets from EX `public/` (brand, partners, certs) where approved.

## Stage 6 — QA
- [ ] Responsive sweep at 390 / 768 / 1024 / 1440 (overflow, alignment, imagery).
- [ ] Keyboard + reduced-motion + touch alternatives on all interactions.
- [ ] Final lint / typecheck / production build.

## Known items / decisions
- **Next.js security advisory**: `next build` surfaces an upgrade nudge for 16.4.0.
  Per instruction, not upgrading as a side task — propose controlled remediation separately.
- `data/service-categories.ts` (5 practice-based categories) coexists with
  `data/capabilities.ts` (7 customer-facing). Customer-facing nav/footer/menu use the 7.
  GRCLoop/ForgeLoop/HexN6 removed from footer.
