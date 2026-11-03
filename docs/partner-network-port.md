# Our Partner & Client Network: original implementation port

## Read-only old project sources

Root: `Habilesec EX/habilesec-site-new/`.

- Section structure and exact copy: `src/app/(site)/partners/page.js` (network block) and `src/components/editorial/EditorialPrimitives.jsx:EditorialHeading`.
- Two-row component, order and split: `src/components/PartnerMarquee.jsx`.
- Animation and scroll-velocity response: `src/components/Marquee.jsx`.
- Mask, keyframes and hover-pause opt-in: `src/app/globals.css`.
- Full-motion breakpoint: `src/lib/motion/useMotionPrefs.js:TIERS.full`.
- Original colors, shadows, shell width: `tailwind.config.js` and `src/app/globals.css`.
- Logo list: `src/lib/content.js:PARTNERS`, corroborated by `backend/src/contentSeed.js:partners`.
- Original images: `public/partners/`.

## All 11 recovered logos, in original order

Row 1: Kirshi (`kirshi.png`), Peaq Labs (`peaq_labs.png`), ReacGRC (`partners-reacgrc.png`), AspireLens (`aspirelens.png`), BuSoft (`busoft.png`), Infocom (`infocom.jpg`).

Row 2: TechMaple (`techmaple.png`), PFT (`pft_logo.png`), Chakrax (`chakrax.png`), Aexpro (`aexpro.png`), TechSnurf (`techsnurf.png`).

All original files are copied byte-for-byte into `public/images/partner-network/`; none is missing. Original case/spelling, image colors and proportions are preserved. `data/partner-network.json` retains original source paths and intrinsic dimensions. Other logos in the old assets folder belong to separate group-company/education sections or are unused; they are not invented additions to this network list.

## Preserved behavior and compatible adaptations

The original `speed` prop is duration in **seconds**, not pixels/second. Row 1 has a 42-second leftward cycle. Row 2 has a 48-second reverse/rightward cycle. Groups retain the same 20px gap plus 20px trailing seam spacing. Desktop boxes remain 160 x 80px, 24px horizontal padding, 12px radius, #EDF2FE backgrounds, #DCE3EF borders and original shadows. Hover lifts each box 4px, changes its border and shadow, and does not pause the row (the original PartnerMarquee did not opt into pauseOnHover).

The port uses three identical groups and a one-group translation instead of the old two-group -50% translation. This preserves each original cycle width and duration while preventing the shorter second row from exposing an empty gap on wide screens. Both decorative repeated groups are inert and aria-hidden. Keyboard focus pauses the row and arrow/Home/End keys browse the sequence without visible controls. Reduced motion provides two static, wrapping original lists.

The original desktop velocity/skew behavior is retained using native Web Animations playbackRate and a short requestAnimationFrame easing burst rather than adding GSAP. It uses the original clamp of +/-2400px/s, rate 1 + abs(velocity)/900, skew velocity/-800, 250ms acceleration and 900ms return to base. It runs only when visible, with a fine pointer, at least 1024px width, and no reduced-motion preference; listeners/observers/frames are cleaned up. Row transforms and velocity skew use separate layers so they do not overwrite each other.

Intentional typography update: DM Sans for eyebrow, heading and description, using the new site's navy/blue text hierarchy. Mobile retains both animated rows with proportionally reduced 144 x 72px boxes and 16px gaps, as requested. The homepage placement is immediately after CustomerTestimonials; other sections and the shared marquee component are unchanged.
