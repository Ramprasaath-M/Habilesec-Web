# Latest Insights: content provenance and compact redesign

## Approved content

Five published records come from the read-only `Habilesec Ex/habilesec-site-new/backend/data/postgres-export.json` success_stories collection, matched against its `src/data/success-stories.json`. The admin record titled "test" is excluded. The existing `data/success-stories.json`, accessor, ordering, and `/our-work/[slug]` detail routes remain unchanged.

| Title | Company | Approved summary |
|---|---|---|
| Hassle-Free Cognitive Protection | Techsnurf | Equipping Techsnurf to achieve unparalleled data-privacy excellence. |
| Seamless Compliance & Uncompromising Security | GoSwift | Managed VAPT services propel GoSwift to new heights in cybersecurity. |
| Securing the Future | Techsnurf | Supporting Techsnurf to stand up a next-generation SOC. |
| Elevating Security Standards | Nirvaana Client Solutions | HabileSec empowers Nirvaana with vCISO leadership and security milestones. |
| Compliance Without Complexity | Infocom IT HK Ltd | How HabileSec guided Infocom IT HK Ltd to achieve regulatory excellence. |

The old records contain no extended story bodies. Detail pages retain their available summaries and metadata; no publication dates, outcomes, quotations, or longer narratives were invented.

## Imagery

All five database image fields are empty. The old JSON references four absent `/success-stories/*.jpg` files and one unrelated localhost-themed graphic. Original paths remain in `originalImage` for provenance.

The compact homepage cards use existing local project assets as decorative illustrations: `cybersecurity-capabilities/hand-shield.webp`, `case-studies/compliance-readiness.webp`, and `infrastructure.webp`. These are not presented as client photographs. Existing Next.js Image optimization, lazy loading, responsive sizes, and fixed 148px image slots prevent image layout shifts. An image-load failure displays a quiet light panel with the genuine company name.

## Design and interaction

The section follows the supplied Minimal Card Style reference: white cards, 9px corners, a thin light border, subtle shadows, a blue SUCCESS STORY label below the image, 18px titles, approved summaries, and aligned Read more links. Cards are 330px tall with 16-18px content padding and 22px desktop gaps. The 1160px outer container keeps desktop cards approximately 356px wide. The heading uses the existing DM Sans font and includes the requested subtitle.

Small circular previous/next controls sit at the top-right. There are no pagination dots, edge previews, or autoplay. Arrows move exactly one card with a 280ms transition and disable at boundaries. The clipped viewport shows three complete cards at 960px available content width, two at 600px, and one below that. ResizeObserver uses the same thresholds as the CSS container queries.

Keyboard controls support Left, Right, Home, and End. Pointer events support touch swipe while retaining vertical scrolling. Offscreen cards are inert and hidden from assistive technology; a polite live region announces the current range. Hover lifts cards 4px, zooms imagery to 1.03, and shifts the link arrow 3px. Reduced-motion preferences remove transforms and transitions (the site's global reduced-motion override uses a negligible 0.01ms duration).

## Scope and verification

This redesign changes only `components/home/latest-insights.tsx`, its CSS module, `scripts/latest-insights-check.mjs`, and this note. Other homepage sections, shared typography, dependencies, story data, detail routes, and the old project are untouched.

Production build and component ESLint pass. The production browser script checks 320, 375, 430, 768, 1024, 1440, and 1920px layouts, full-card counts with no edge preview, 330px heights, loaded images, one-card movement, disabled boundaries, keyboard navigation, mobile touch swipe, no autoplay, no horizontal page overflow, reduced motion, all five source-matched detail links and summaries, missing-image fallback, unknown-slug 404, and page/hydration errors. Screenshots are saved under `.artifacts/latest-insights/` for visual review.
