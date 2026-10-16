# Redesign asset inventory

All production images are local to this project (`public/`). Nothing is fetched from the reference project or a third-party host at runtime. Art direction (which image represents which concept, plus alt text) is centralised in [`data/visuals.ts`](data/visuals.ts).

**Rights status.** No image rights were independently verified. Where a source is recorded in the repository it is noted; where it is not, the table says so. Confirm usage rights before publication (see also `CONTENT_REVIEW.md`, item 4).

## Selected images

| Concept (where used) | File | Size | Source / provenance |
| --- | --- | --- | --- |
| Home hero | `public/images/habilesec-difference/ascending-staircase.webp` | 1816×866 | Company asset kept from the earlier build. Origin not recorded in the repo. Chosen for its pale composition (light theme, space for the headline). |
| Challenge 1 · Strengthen security | `public/images/challenges/cybersecurity.webp` | 2000×1500 | Recorded in the earlier `data/home-sections.ts` as Pexels (Zayed Hossain). Licence receipt not retained. |
| Challenge 2 · Prepare for compliance | `public/images/challenges/governance-compliance.webp` | 2000×1125 | Recorded as Pexels (Vitaly Gariev). |
| Challenge 3 · Build a digital product | `public/images/engineering.webp` | 1400×934 | Earlier-build asset; origin not recorded. |
| Challenge 4 · Respond to an incident | `public/images/services/incident-response-forensics.webp` | 1600×1067 | Earlier-build asset; origin not recorded. |
| Service · Cybersecurity | `public/images/case-studies/cybersecurity-assessment.webp` | 1600×1200 | Earlier-build asset; origin not recorded. |
| Service · Governance & Compliance | `public/images/services/governance-risk-compliance.webp` | 1600×1067 | Earlier-build asset; origin not recorded. |
| Service · Data Privacy | `public/images/services/data-privacy.webp` | 1600×1068 | Earlier-build asset; origin not recorded. |
| Service · Digital Engineering | `public/images/services/digital-engineering.webp` | 1600×1067 | Earlier-build asset; origin not recorded. |
| Service · Incident Response, practice HexN6 | `public/images/services/managed-security.webp` | 1600×1067 | Earlier-build asset; origin not recorded. |
| Product · Certanika Lite | `public/images/challenges/business-resilience.webp` | 2000×1333 | Recorded as Pexels (Tima Miroshnichenko). |
| Product · Tanikkai (photo; article "Privacy") | `public/images/challenges/data-privacy.webp` | 2000×1333 | Recorded as Pexels (olia danilevich). |
| Product · Tanikkai identity | `public/images/reference/tanikkai-logo.jpeg` | ≈660×210 | Copied from `Habilesec Ex` `public/partners/tanikkai logo.jpeg`. Product logo; confirm permission to display. |
| Industry · Government | `public/images/case-studies/compliance-readiness.webp` | 1200×1800 | Earlier-build asset; origin not recorded. A neutral institutional façade replaces the former London Parliament photograph. |
| Industry · BFSI | `public/images/industries/fintech-digital-assets.webp` | 1600×2400 | Earlier-build asset; origin not recorded. |
| Industry · Technology | `public/images/industries/technology-saas.webp` | 1600×1065 | Earlier-build asset; origin not recorded. |
| Industry · Manufacturing | `public/media/manufacturing.webp` | 1200×627 | Converted from `Habilesec Ex` `sections/manufacturing.jpg` (reference scripts identify section photography as Pexels; per-photo receipts not retained). |
| Industry · Healthcare | `public/images/industries/healthcare-life-sciences.webp` | 1600×1068 | Earlier-build asset; origin not recorded. |
| Industry · Retail | `public/images/retail.webp` | 1200×801 | Earlier-build asset; origin not recorded. |
| Insights · Compliance; practice GRCLoop | `public/images/governance.webp` | 1400×935 | Earlier-build asset; origin not recorded. |
| Insights · Secure engineering; practice ForgeLoop | `public/images/reference/product-development.jpg` | 1200×627 | Copied from `Habilesec Ex` `sections/forge-product-development.jpg` (Pexels per reference scripts; receipt not retained). |
| Insights · Incident response | `public/images/case-studies/incident-preparedness.webp` | 1600×1067 | Earlier-build asset; origin not recorded. |
| Insights · AI governance | `public/images/services/data-privacy.webp` | 1600×1068 | As above. |
| About hero | `public/images/challenges-glass.webp` | 1400×2100 | Earlier-build asset; origin not recorded. |
| Founders | `public/media/kalaivani-srinivasan.webp`, `public/media/srinivasan-mahalingam.webp` | 1600×2400 | Company founder photographs from the reference repository. |
| Logo | `public/brand/habilesec-logo.png` | 473×131 | Unchanged company logo. |

## Replaced or retired

- **Government sector photograph** (Houses of Parliament, London) removed from every page.
- **Manufacturing** previously pointed to a hand-and-tablet photograph that did not show manufacturing; it now uses the factory-automation photograph.
- `public/media/business-advisory.webp` (previously the hero and ~10 other slots), `secure-engineering.webp`, `government.webp`, `healthcare.webp`, `retail.webp` are **no longer referenced** by the pages. They are left in place (not deleted) except where noted in the report; `business-advisory.webp` is still named by older metadata only.
- A photograph captioned "Tax Prep Checklist" was trialled for Certanika Lite and discarded as misleading.

## Not used, deliberately

- `public/images/home/hero/habilesec-hero-*.webp` and other dark/night imagery: strong photography, but too dark for a light-only direction.
- Reference-repository credential, certification, partner and client logos: excluded because `CONTENT_REVIEW.md` records that those claims are unconfirmed.
- No product screenshots exist in either repository. The product section therefore shows a **capability overview** (photograph plus a list of the capabilities named in the product data), not a dashboard or UI mock-up. Replace it with real screenshots when the product team supplies them.
