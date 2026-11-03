# Website typography and color consistency audit

Verified 27 October 2026. Changes apply only to the new Habilesec project.

## Findings and corrections

DM Sans was already the site's locally loaded variable font. Inconsistencies came from component overrides: 10px success-story labels, 12px story summaries and links, 11px eyebrows, 14px capability paragraphs, page titles up to 112px, paragraph-style summaries up to 34px, and metadata using several faint blue-grays. Static-background samples included 3.03:1 testimonial company names and 4.46:1 statistics labels. Multiple unrelated bright blues and legacy orange markers competed with the established theme. The independent global-error fallback also used a system font.

The existing typography/color foundation is now shared across all active public page families. No new component library or competing theme was introduced. The approved layout, business data, image sources, routes, forms, and animation logic were preserved. Typography can change line wrapping and section height naturally.

## Shared system

- Single local variable DM Sans loader in lib/fonts.ts, reused by app/layout.tsx and app/global-error.tsx. Weights 100�1000 are available; headings use 700, card/navigation/action text normally 600, and body text 400. No additional typeface or font download was added.
- Responsive sizes: hero 36�64px; page H1 34�52px; section H2 28�40px; subsection 24�28px; card title 18�20px; main copy 16�17px; card description 15px; labels 12�13px; metadata 13px; actions/navigation 15px. Supporting labels and metadata intentionally remain smaller than paragraphs.
- The existing theme blue #14558C is retained for primary interactions and ordinary accents; hover #0D426F. Heading navy #0F2033, body #484C54, metadata #626873, existing light surfaces and borders. Legacy ember aliases now resolve to the same blue. Original logo artwork, decorative globe/image colors, and dark hero are preserved.
- Reusable spacing roles: eyebrow-to-heading 16px; heading-to-copy 20px; copy-to-action 24px; card copy 8px. Existing spacing scales and CSS-module architecture remain intact.

Latest Insights now has readable 15px summaries and actions. Its minimum card height is 340px with natural growth for longer text, and image slots are 140px so the cards remain compact. Controls, clipping, one-card movement, keyboard navigation, touch swipe, inert offscreen cards, and reduced motion remain unchanged.

Capability labels failed sampled contrast on some bright parts of the image. Their existing glass-panel background is now a deeper navy/blue tint. The photograph, layout, icon positions, hover, and distortion animation are unchanged; no section overlay was added. Faint testimonial metadata was changed to the shared readable gray.

## Executed validation

- npm.cmd run build: passed, including TypeScript and 48 generated framework/static entries. The same source also passed an isolated production build.
- npm.cmd run typecheck: passed.
- npm.cmd run lint: passed with zero errors and zero warnings after the final script cleanup.
- 44 actual public routes at 375, 768, 1280, and 1440px: 176 route/viewport checks, all HTTP 200, one main H1 per page, no horizontal overflow, no page exceptions, and no failed CSS/script/font responses in the final isolated scan.
- 11,724 rendered text samples use DM Sans; none are below 12px. Main paragraphs use the body scale and card descriptions use 15px. Smaller text is reserved for labels and metadata.
- 7,000 computed solid-background contrast samples pass applicable AA text thresholds. 156 screenshot-based samples over the hero, glass labels, footer gradient, and Industries photograph pass; the lowest sampled ratio is 6.02:1. Text was temporarily made transparent for pixel measurements, with two paint frames before capture, then restored.
- Menus at all four widths, testimonial desktop/tablet/static modes, hover pause, reduced-motion fallback, Insights filtering, and contact email-draft preparation passed. No email draft was opened or sent.
- Latest Insights passed seven widths (320, 375, 430, 768, 1024, 1440, 1920px): whole-card counts, compact readable sizing, image loading/fallback, arrows and boundaries, exact single-card steps, keyboard controls, mobile swipe, no autoplay, all five original story detail links/summaries, reduced motion, and unknown-slug 404.
- Desktop, laptop, tablet, and mobile screenshots were inspected for the About, capability, Insights, testimonial, navigation, and contact treatments. Full-page screenshots of representative public page families are saved with the audit.

## Evidence and practical limits

Evidence is under .artifacts/typography-audit/: verified.json, summary.json, pixel-contrast.json, layout-invariants.json, and review/ screenshots. The reproducible scripts live in scripts/typography-*.mjs. AUDIT_URL selects the server; AUDIT_BUILD_DIR identifies its Next build manifest.

A background build replaced shared .next assets during early browser runs. Those captures were superseded by an isolated copy under .artifacts/typography-audit/validation-site, built and served on port 3700. Five initial network-idle timeouts were retried after switching the harness to the load event with font readiness; verified.json contains the completed results. Application source was compared with the isolated copy and matched exactly.

Contrast testing samples fully visible text, not intentional reveal frames or fading edges of moving testimonial columns. Chromium viewport emulation and sampled contrast checks are not a formal WCAG certification or a cross-browser/device certification. Global-error typography was checked in source/build rather than by forcing a production crash.

The sitemap omits eight existing public routes (/services and seven newer capability pages). The audit included them using the build manifest. The sitemap was left unchanged because this task is presentation-only.

The working tree already contained extensive changes. A concurrent testimonial-markup update and statistics label alignment were preserved; they are not claimed as typography-audit implementation. This audit changes no business copy, data, images, route, form behavior, or backend. Existing grids, positioning, object fitting, and motion declarations were checked against the start-of-task source snapshot; see layout-invariants.json for any independently arriving differences.

## Modified files for this audit

- app/global-error.tsx
- app/globals.css
- app/layout.tsx
- app/our-work/[slug]/story.module.css
- components/home/about-habilesec.module.css
- components/home/capabilities.module.css
- components/home/company-statistics.module.css
- components/home/customer-testimonials.module.css
- components/home/hero.module.css
- components/home/latest-insights.module.css
- components/home/partner-network.module.css
- components/home/recognition-strip.module.css
- components/layout/footer.module.css
- components/layout/header.module.css
- components/layout/mega-menu.module.css
- components/pages/capability-page.module.css
- components/pages/company-pages.module.css
- components/pages/industries-hero.module.css
- components/pages/industry-pages.module.css
- components/pages/insights-pages.module.css
- components/pages/product-pages.module.css
- components/pages/service-index.module.css
- components/pages/service-pages.module.css
- components/sections/contact-form.module.css
- components/ui/article-link.module.css
- components/ui/closing.module.css
- components/ui/marquee.module.css
- components/ui/page-intro.module.css
- components/ui/presence.module.css
- components/ui/product-plate.module.css
- lib/fonts.ts
- DESIGN_SYSTEM.md
- scripts/typography-audit.mjs
- scripts/typography-contrast.mjs
- scripts/typography-interactions.mjs
- scripts/typography-verify.mjs
- scripts/latest-insights-check.mjs
- docs/typography-consistency-audit.md

Final fallback review: native error-page buttons explicitly inherit DM Sans and use the same blue as the public site. This final fallback-only style refinement passed a fresh production build and clean lint run; the fallback was not forced into a live route during browser testing.
