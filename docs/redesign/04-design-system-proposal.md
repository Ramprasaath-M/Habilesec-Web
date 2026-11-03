# Independent design system proposal

Status: proposed, unimplemented. Fort is the primary quality reference; exact visual comparison is provisional pending document 03. Nothing here derives from target CSS, typography, components or past design documents. Brand cues come from the inspected EX logo, not EX styling.

## Creative direction

Present HabileSec as a composed security and technology partner: clear executive language, technical substance, authentic operational photography and disciplined editorial layouts. Light mineral surfaces carry most of the site. Navy creates authority; a restrained warm accent recalls the logo glyph. Avoid neon security theatre, excessive gradients, glowing icons, glass panels and repetitive card grids.

## Proposed semantic tokens

Hex values are proposed approximations inspired by the source artwork, not claimed official brand standards. Keep the existing multicolor logo artwork unchanged.

| Token | Value | Role |
| --- | --- | --- |
| surface-base | #EEEFEA | Main mineral background |
| surface-raised | #F6F5F0 | Reading areas and form surfaces |
| surface-alt | #E1E7E6 | Alternating editorial sections |
| ink | #10384C | Headings and primary text; navy derived from logo impression |
| ink-muted | #465B63 | Secondary prose |
| accent | #A84031 | Primary CTA fill; warm logo-inspired color |
| accent-hover | #873025 | Hover/pressed accent |
| line | #B5C3C4 | Decorative separators only; stronger borders needed for controls |
| control-border | #60757D | Input outlines and meaningful boundaries |
| focus | #174E78 | Visible focus ring, 3px with offset |
| inverse | #F6F5F0 | Text on navy and accent surfaces |
| success / error | #246044 / #9B2F2C | Status text with labels; never color-only |

No dominant #FFFFFF background. Use light surfaces for at least roughly 80% of page area; a compact navy closing section is optional. These are design goals, not measured output. Validate every actual foreground/background/state pair before acceptance: normal text 4.5:1, large text and meaningful UI boundaries 3:1. Recompute focus contrast on each surface; change token pairs if they fail.

## Typography and spacing

Propose Source Sans 3 variable for headings and body, locally hosted with license review; use system sans until the font is approved and available. This choice is independent of target fonts. Weights: body 400, labels 600, headings 600–700. No forced all-caps display headlines. A technical identifier may use system monospace sparingly.

| Role | Desktop / mobile size | Line height |
| --- | --- | --- |
| Display | 72 / 42px, fluid between | 1.02–1.08 |
| H1 internal | 56 / 36px | 1.1 |
| H2 | 44 / 30px | 1.15 |
| H3 | 28 / 24px | 1.25 |
| Lead | 22 / 20px | 1.45 |
| Body | 18 / 17px | 1.6 |
| Label / small | 14 / 14px | 1.4 |

Body measure 60–72 characters; display line breaks follow meaning and adapt to width. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 104px. Typical section padding 80–104px desktop, 48–64px mobile. Use smaller spacing for tightly related information; do not create empty full-screen sections. Border radius 4px controls, 8px media panels; avoid pill-shaped containers everywhere. Shadows limited to overlay elevation.

## Responsive grid

Maximum content width 1280px, centered. Desktop ≥1200px: 12 columns, 24px gutters, minimum 40px outer margin. Tablet 768–1199px: 8 columns, 24px gutters and margin. Mobile <768px: 4 columns, 16px gutters, 20px outer margin; reduce to 16px margin at 360px if needed. Mobile reading content stacks in DOM order, images never obscure copy, and tables scroll inside labeled regions. At 320px and 200% zoom no page-level horizontal overflow. Navigation may collapse below 1100px if labels cannot fit; test real content rather than hiding items.

## New navbar and mega-menu

An opaque mineral header with original logo, concise top-level labels and one consultation action; proposed height 88px desktop / 72px mobile. Services opens an anchored menu with practice labels, explanatory text and selected subservice links. Products has a compact two-entry menu; company/resources can be grouped for fit. Use native buttons with aria-expanded/controls, keyboard-operable links, Escape dismissal and focus return. Hover may enhance opening but never be the only mechanism. Mobile uses explicit disclosure groups and a scrollable navigation panel; no hover dependency. Sticky behavior is a provisional recommendation, not an observation about Fort.

## Hero and section language

Home hero: an asymmetric 7/5 composition on mineral, left-aligned statement and short explanation, one primary CTA and one service link; right side a substantial editorial photograph of real security work. A lower ruled index links the three practices. No rotating hero, fake terminal, stock shield or unverified statistics. Proposed draft heading: “Security, governance and engineering. Working together.” Supporting draft: “HabileSec helps organizations strengthen cybersecurity, manage compliance and build secure digital products.” These paraphrase EX scope and require editorial approval.

Subsequent compositions must differ by purpose: numbered service rows beside changing editorial media; a two-product comparison spread; an industry selector paired with a practical challenge; one case-study feature with narrow evidence column; a single attributed testimonial; an editorial insight list. Do not repeat equal-size card arrays for all sections. Product interaction uses tabs or links with real approved captures; never invented dashboard imagery. All essential service/product text remains available without animation or hover.

Internal service pages use outcome-led introduction, deliverables, engagement approach, relevant standards and related evidence. Product pages use purpose, supported capabilities, approved capture and destination. Industry pages use challenge → relevant work → evidence → contact, with source-supported examples only.

## Motion, imagery and conversion

New motion system: 140–180ms feedback; 220–280ms menu transitions; optional 400–500ms section entry with at most 16px displacement and easing cubic-bezier(0.22,1,0.36,1). Animate opacity/transform only where practical. No scroll hijacking, pinned long sequences, continuous decorative canvas, cursor replacement or automatic marquee. Reduced-motion users receive immediate state changes; all text is visible by default if scripts fail. Performance and accessibility outrank spectacle. These timings are independent recommendations and provisional for final art direction.

Use licensed documentary photography or approved commissioned assets. Crop to show actual work and people without exposing customer data. Product captures need product-owner approval; photographic assets need provenance. Alt text describes meaningful context; decorative media has empty alt. Art-directed mobile crops preserve subject and copy legibility.

Closing CTA: a concise consultation invitation with a visible contact alternative; no implied emergency-response promise until confirmed. Footer: original logo, short verified scope, grouped practice/product/resources links, company contact details and legal links, all aligned on the same grid. No decorative globe or network animation. Forms require explicit labels, autocomplete, useful validation, pending/success/error states and a trustworthy persisted-result contract.
