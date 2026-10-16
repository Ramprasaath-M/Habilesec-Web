# Asset and content provenance

## Project boundaries

- Implementation: `C:\Users\Habilesec\OneDrive\Desktop\Habilesec`
- Read-only reference: `C:\Users\Habilesec\OneDrive\Desktop\Habilesec Ex\habilesec-site-new`

All runtime assets are local to the implementation project. The application does not import, read, or fetch files from the reference project.

## Reused reference assets

| Reference `public` asset | New local asset |
| --- | --- |
| `habilesec-logo.png` | `/brand/habilesec-logo.png` |
| `sections/advisory.jpg` | `/media/business-advisory.webp` |
| `sections/engineering.jpg` | `/media/secure-engineering.webp` |
| `sections/manufacturing.jpg` | `/media/manufacturing.webp` |
| `sections/healthcare.jpg` | `/media/healthcare.webp` |
| `sections/retail.jpg` | `/media/retail.webp` |
| `sections/government.jpg` | `/media/government.webp` |
| `founder/DSC00445.jpg` | `/media/kalaivani-srinivasan.webp` |
| `founder/DSC00458.jpg` | `/media/srinivasan-mahalingam.webp` |

The logo is an unchanged file copy. Photographs are converted to WebP, limited to 1600px wide without enlargement, and retain their original content. The favicon is a small, proportion-preserving rendering of the original logo. No third-party image URLs are used at runtime.

Detailed source hashes and output sizes are in `artifacts/rebuild/asset-manifest.json`. Founder photographs and the logo were provided through the company's reference repository; they were not independently obtained from an external image service.

The reference repository's `scripts/fetch-section-images.mjs` identifies section stock photography as Pexels-sourced. It does not retain per-photo IDs, photographers, or individual license receipts. This is source provenance, not independent rights clearance. The owner should confirm its retained usage rights before publication. No competitors' assets were reused.

## Font

The new project already contained `public/fonts/manrope.ttf` and its SIL Open Font License, `public/fonts/manrope-OFL.txt`. These are retained. The font is served locally; the rebuild adds no external font dependency. Original unused font and image assets remain available rather than being deleted without a full content-owner review.

## Business information

The reference's `src/lib/content.js`, practice pages, founder records, and live [HabileSec website](https://www.habilesec.com/) were used to verify practices, services, six sectors, founding year, leadership, contact details, Certanika Lite, and Tanikkai.

Existing working-project `data/service-categories.ts`, `data/site.ts`, and `data/editorial.ts` supply the detailed capability and sector descriptions and the practice-note copy. Unused legacy data is retained for reference but is not rendered as testimonials, client achievements, certifications, or statistics.

The reference blog seed includes empty article bodies and an administrative test body. These were excluded. The rebuilt Insights area explicitly presents practice notes, without invented authors, publication dates, or research credentials.

The existing reference terms are carried forward in the local Terms page. The Privacy page describes this implementation's actual email-draft flow and local assets; it does not claim GDPR or DPDP compliance.
