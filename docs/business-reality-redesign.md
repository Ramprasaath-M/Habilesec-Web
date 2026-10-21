# Business Reality redesign

Implemented 21 October 2026. Scope: Business Reality component, its CSS module, local photograph, and this report. Existing homepage order and unrelated sections are unchanged.

## Photograph

- Photographer: Petr, via Unsplash.
- Source: https://unsplash.com/photos/white-hallway-with-glass-windows-5shl-NRhPyc
- Description: Corridor and transparent walls in the office center.
- License: https://unsplash.com/license (verified 21 October 2026). Allows downloading, modifying, distributing and using images for commercial and noncommercial purposes; attribution is appreciated but not required. No endorsement is implied.
- Local asset: `public/images/home/business-reality/business-reality-architecture.webp`
- Public URL: `/images/home/business-reality/business-reality-architecture.webp`
- Downloaded from the source page's image URL, then encoded as WebP using Sharp: 2000 x 1333 pixels, quality 82, 287,722 bytes. Served with Next.js Image; no runtime third-party image requests.
- Reviewed existing glass-building, staircase and professional-services assets before sourcing. The new photograph provides an authentic office corridor with a verified source and license.

## Implementation

White editorial composition, existing DM Serif Display and Manrope fonts, existing brand tokens and container. Left introduction with blue heading phrase; right photograph with angled white blending. Three connected numbered white panels overlap the image area by 48px. Below 768px the text, photograph and rounded panels stack without overlap. No icons, mountain background, glass cards, road positioning or closing copy remain in the component.

One-time viewport entrance: 600ms transitions, 120ms stagger. Hover: 4px upward movement and restrained border, shadow and number emphasis. Reduced-motion preferences disable movement, including changes made while the page is open. Content remains visible without JavaScript.

## Validation

- Production build: passed (43 pages generated).
- TypeScript: passed (`npm.cmd run typecheck`).
- Component ESLint: passed (`npx.cmd eslint components/home/business-reality.tsx`).
- Full-project lint: two existing errors in `components/home/service-showcase.tsx`: synchronous `setPlaying(false)` in an effect (line 105), and the purity rule flags `Date.now()` (line 120). Unrelated component left unchanged.
- Production Chromium browser checks: 1920, 1440, 1024, 768, 767, 390 and 320px. Image decoded successfully at every width; no horizontal overflow; equal-height aligned panel rows on desktop/tablet and aligned single-column panels on mobile. No browser page errors.
- Approved heading and all paragraphs verified in rendered DOM.
- Entrance pending/shown states, all panel opacity values, 4px hover transform, reduced-motion rendering and no-JavaScript visibility verified.
- Desktop, tablet and mobile screenshots visually reviewed. Local QA output is in ignored `.artifacts/business-reality/`.
- Concept 11 screenshot was absent from the supplied attachments (both attachments contained the same text brief). Composition follows that brief; exact screenshot comparison remains unavailable.
