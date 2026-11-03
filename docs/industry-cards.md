# Industries cinematic image cards

## Scope and implementation

Only the Industries We Serve landing grid is redesigned. `IndustryCards` renders the existing twelve names and existing `/industries/[slug]` links from `data/industries.ts`. A separate presentation map supplies the exact requested short descriptions and card-only image choices. Industry detail copy, detail image choices, the shared detail stylesheet, Industries CTA, navbar, footer, homepage, and global design system are unchanged by this implementation.

The grid has four columns from 1100px, two from 600px, and one below 600px. All cards are 300px tall, with 18px gaps, 14px corners, full-cover local photographs, a navy bottom gradient, white titles, and 32px circular arrows. The heading reads “Industries We Serve”, with the requested blue accent and exact section description.

Descriptions have a reserved three-line area so hover never changes a card's size or moves adjacent cards. Titles move upward 18px; descriptions fade and rise over 280ms. Images zoom to 1.04 over 550ms; arrows move 3px diagonally and gain the existing brand blue. A low-opacity blurred reflection crosses once in 750ms per hover/focus entry; it does not loop. Text stays above the reflection.

Keyboard focus reveals the same state, with an explicit focus outline. Each complete card is one link, labelled by its H3 and described by its paragraph. Photos are decorative within these explicitly named links, so empty alt text avoids repeating the industry name. Touch/coarse-pointer devices show descriptions by default. Reduced motion shows descriptions and removes zoom, shine, and transforms. No dependency, font, or animation library was added.

## Images used

| Industry | Local card image | Provenance |
| --- | --- | --- |
| Banking & Financial Services | `/images/industries/banking-financial.webp` | Existing project photograph of a financial district |
| Healthcare & Life Sciences | `/images/industries/healthcare-life-sciences.webp` | Existing project laboratory photograph |
| Information Technology & SaaS | `/images/industries/technology-saas.webp` | Existing project server-rack photograph |
| Manufacturing & Industrial | `/media/manufacturing.webp` | Existing factory image converted previously from the old project's `sections/manufacturing.jpg`; see ASSET_INVENTORY.md |
| Retail & E-Commerce | `/images/industries/retail-ecommerce.webp` | Existing warehouse/e-commerce operations photograph |
| Education & EdTech | `/images/industries/card-education.webp` | New: Yan Krukau, Pexels photo 8197511 |
| Government & Public Sector | `/images/case-studies/compliance-readiness.webp` | Existing institutional-building facade photograph |
| Telecommunications | `/images/industries/card-telecommunications.webp` | New: Roger Zhou, Pexels photo 14470502 |
| Energy & Utilities | `/images/industries/card-energy.webp` | New: Ricky Esquivel, Pexels photo 3877662 |
| Logistics & Transportation | `/videos/industries/logistics-poster.jpg` | Existing local port/container-terminal photograph |
| Professional & Business Services | `/images/industries/professional-services.webp` | Existing project consulting-meeting photograph |
| Media & Digital Platforms | `/images/industries/card-media.webp` | New: Caleb Oquendo, Pexels photo 15689003 |

Existing images were inspected in both projects before selection. No file in the old project was modified. The eight retained images use the project's existing assets and approvals; original external receipts are not recorded for every legacy asset, so no independent licensing claim is made for those files. Photography is illustrative and does not identify the subjects, banks, buildings, or facilities as HabileSec clients or imply endorsement.

## New photograph sources and license

Verified on 27 October 2026:

- Education: https://www.pexels.com/photo/students-studying-in-classroom-8197511/
- Telecommunications: https://www.pexels.com/photo/silhouetted-telecommunications-tower-at-sunset-14470502/
- Energy: https://www.pexels.com/photo/wind-turbines-on-sand-under-white-cloudy-sky-3877662/
- Media: https://www.pexels.com/photo/broadcasting-movie-camera-15689003/
- License: https://www.pexels.com/license/ — permits free website/commercial use and modification, with attribution optional; endorsement must not be implied.

Original download pattern: `https://images.pexels.com/photos/PHOTO_ID/pexels-photo-PHOTO_ID.jpeg?auto=compress&cs=tinysrgb&w=WIDTH`, using 1600px sources for education/energy/media and 1200px for the portrait telecom photograph. The actual JPEG files were downloaded, inspected, and converted with the existing Sharp tool to WebP quality 86. Final widths are 1400px, except telecom at 1100px. No generated people, watermark, synthetic interface, external runtime URL, or new image dependency is used.

Next.js Image handles responsive delivery and lazy loading. The stable 300px frames reserve image space and prevent image-driven layout shifts.

## Modified files

- `components/pages/industry-pages.tsx` — replaces only the landing grid with the isolated component.
- `components/pages/industry-cards.tsx` — new grid markup.
- `components/pages/industry-cards.module.css` — grid/card styling and interactions.
- `data/industry-cards.ts` — card-only descriptions, image paths, and crops.
- Four new `public/images/industries/card-*.webp` files listed above.
- `scripts/industry-cards-check.mjs` and `scripts/industry-cards-contrast.mjs` — regression and photographed-background contrast checks.
- `docs/industry-cards.md` — this record.

## Concurrent work

Independent changes to `industries-hero.tsx` and its stylesheet arrived during this task. They were preserved, not implemented or reverted as part of this grid work. A source comparison confirms the industry detail component and protected non-hero files match the start-of-task snapshot. The regression records the independent hero changes in `.artifacts/industry-cards/concurrent-changes.json`.

The first isolated copy contained an older hero build referencing a removed retail poster. Validation was refreshed by building a consistent copy of the current source and assets. Final checks use that isolated production server on port 3900, keeping concurrent root builds from replacing its CSS or image references.

## Actual verification results

- Production build passed in the main project, including TypeScript and all 55 generated framework/static entries. The refreshed isolated build passed as well.
- npm.cmd run typecheck passed. ESLint passed for the changed components, presentation data, and both verification scripts.
- Layout checks passed at 375, 600, 768, 1099, 1100, 1280, and 1440px: all twelve cards present, correct 1/2/4 columns, equal 300px heights and row widths, descriptions fitting their reserved three-line area, loaded local images, correct approved names/descriptions/links, and no horizontal page overflow.
- Interactive checks passed: 18px title lift, image scale 1.04, description fade, arrow movement of 3px diagonally, 750ms single-iteration shine ending transparently, and no card/neighbor movement. Geometry comparisons use coordinates relative to the grid/card, avoiding browser auto-scroll and subpixel entrance-transition rounding artifacts.
- Keyboard focus revealed the description and Enter opened the correct detail route. Every one of the twelve cards was clicked and its existing detail page returned HTTP 200.
- Touch checks at 375 and 768px passed with visible descriptions and immediate tap navigation. Reduced-motion checks passed with descriptions visible and zoom/shine disabled.
- No page exceptions or image/script/stylesheet/font failures occurred in the final isolated checks.
- 36 photographed-text contrast samples passed at least 4.5:1 across all twelve cards in default/hover states; lowest sampled ratio was 8.88:1. These are sampled Chromium checks, not a formal accessibility certification.
- Desktop/tablet/mobile and hover screenshots are under .artifacts/industry-cards/. The complete desktop grid and a touch card were visually reviewed. No independent screenshot attachment was present in this turn; visual implementation follows the detailed Design 03 specifications in the pasted brief.
- The shared detail stylesheet, detail component body, original industry data, navbar/footer, homepage entry point, and global CSS match their start-of-task snapshots. Independently arriving hero edits were preserved and recorded separately.
