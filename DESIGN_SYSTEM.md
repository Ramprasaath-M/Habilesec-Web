# HabileSec design system

The approved page compositions remain in their existing CSS modules. Typography and semantic colors are shared through `app/globals.css`; Tailwind aliases reference the same tokens.

## Typography

DM Sans is the single public typeface. `lib/fonts.ts` loads the existing local variable WOFF2 once, with weights 100–1000 and swap behavior. The root layout and independent global error fallback reuse it. No external font request or additional typeface is required.

| Purpose | Size token | Weight | Line height |
| --- | --- | --- | --- |
| Home hero | `--text-hero`: 36–64px | 700 | 1.12 |
| Page H1 | `--text-page`: 34–52px | 700 | 1.15 |
| Section H2 | `--text-section`: 28–40px | 700 | 1.2 |
| Subsection H3 | `--text-subsection`: 24–28px | 600 | 1.3 |
| Card title | `--text-card`: 18–20px | 600 | 1.35 |
| Main paragraph | `--text-body`: 16–17px | 400 | 1.7 |
| Card description | `--text-card-copy`: 15px | 400 | 1.6 |
| Eyebrow | `--text-label`: 12–13px | 600 | 1.4 |
| Supporting metadata | `--text-meta`: 13px | 400 | 1.5 |
| Button/link | `--text-action`: 15px | 600 | 1.4 |
| Navigation | `--text-nav`: 15px | 600 | 1.4 |

Person names, statistics, and decorative numerals retain purpose-specific emphasis. H3 cards use the card scale rather than inheriting the subsection size. Main copy has comfortable line lengths; supporting metadata is not treated as a paragraph. Existing `--sec-title`, `--sec-intro`, `--sec-eyebrow`, `--font-display`, and legacy utility names remain compatibility aliases.

## Colors

| Purpose | Existing token | Value |
| --- | --- | --- |
| Primary interaction / eyebrow | `--brand-blue`, `--blue`, `--accent-blue` | #14558C |
| Primary hover | `--blue-hover` | #0D426F |
| Headings | `--ink` | #0F2033 |
| Paragraphs | `--body` | #484C54 |
| Metadata | `--muted` | #626873 |
| White | `--paper` | #FFFFFF |
| Light surfaces | `--mist`, `--tint`, `--light-blue` | existing light neutrals/blues |
| Border | `--line` | #DDE2E8 |
| Dark hero text | `--on-dark`, `--on-dark-muted`, `--on-dark-accent` | white / #DCE6F2 / #8DC4F0 |

The existing theme blue is retained; the logo's navy lettering and original multicolor artwork are unchanged. Former ember accent aliases resolve to brand blue for ordinary markers and interactions. Decorative image/globe colors and meaningful status colors are preserved. The approved dark homepage hero stays dark; light sections and footer remain light. Capability glass panels use a deeper blue tint to support white labels against the underlying image.

## Spacing

The existing four-pixel spacing scale remains authoritative. `--space-eyebrow` is 16px, `--space-copy` 20px, `--space-action` 24px, and `--space-card-copy` 8px. Component compositions retain their existing grids, alignment, images, routes, and motion. Small container adjustments are permitted where readable text would otherwise be clipped.

## Verification

See `docs/typography-consistency-audit.md` for the executed route audit, contrast sampling, interaction checks, changed-file inventory, and practical limitations. This document describes the current DM Sans implementation and supersedes earlier Manrope/serif and orange-accent guidance.
