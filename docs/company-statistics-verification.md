# Company statistics: management review before production

The proposed 7+ / 100+ / 50+ / 6 values and their exact labels occur in the old project's `habilesec-site-new/src/lib/content.js` STATS array (lines 164-169), and its backend content seed. They are inherited marketing copy, not independently verified business records.

- **7+ years of excellence:** requires confirmation. Both projects state a 2020 founding year, which does not support seven elapsed years as of 2026-10-26. Do not silently alter the requested proposal or publish it as verified.
- **100+ global clients:** no supporting current client register or count methodology found; management must confirm.
- **50+ security experts:** no supporting current staffing/contractor count or definition found; management must confirm.
- **6 industry sectors:** consistent with the old STATS figure and six sector entries, but management should confirm what qualifies as a served sector before publication.

All four records in `data/company-statistics.ts` have `approved: false`. The actual local development homepage displays the exact proposed design and rolling animation. Production excludes unapproved entries. Approve a complete, substantiated set before publication to preserve the four-column composition.

The reusable CompanyStatistics component is inserted directly after RecognitionStrip and before the unchanged TrustStrip. It reserves digit widths, uses a one-shot IntersectionObserver at 30% exposure, and animates independent vertical reels with CSS transforms for 1.65-1.85 seconds plus a 120ms cell stagger. The plus signs are stationary. Final values exist in server-rendered markup and screen-reader text; rolling digits are aria-hidden. Reduced motion shows static final digits, including without JavaScript.
