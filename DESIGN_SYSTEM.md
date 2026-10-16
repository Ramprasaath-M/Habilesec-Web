# HabileSec design system (redesign)

Light theme only. Tokens live in `app/globals.css`; section and page compositions live in CSS modules beside their components. The previous version of this document described the earlier minimal build; this one replaces it.

## Principles

- Premium, editorial, light: white, warm ivory, cool mist and a pale blue tint. Navy is used for buttons and text, never as a section background. No dark footer.
- One restrained accent (ember, taken from the logo) for markers, active states and the final full stop of the hero headline.
- Every major section has its own composition and interaction; consistency comes from type, tokens, rules and motion, not from repeating a layout.
- Motion explains something (selection, progress, depth) and respects `prefers-reduced-motion`.

## Tokens

| Role | Token | Value |
| --- | --- | --- |
| Surfaces | `--paper` `--ivory` `--mist` `--tint` `--sand` | #fff · #faf8f4 · #f3f6f9 · #e9f1f8 · #f3ede2 |
| Text | `--ink` `--body` `--muted` | #0f2033 · #394859 · #566475 |
| Rules | `--line` `--line-strong` | #dde2e8 · #c3ccd6 |
| Brand | `--navy` `--blue` `--ember` | #123b63 · #1b5a8c · #b8482a |
| Decorative numerals | `--ghost` | #5f8fb9 (≥3.2:1 on every surface) |
| Container | `--container` / `--gutter` | 1320px · clamp(20px, 4vw, 56px) |
| Section rhythm | `--sec-compact` / `--sec` / `--sec-spacious` | clamp 40–64 / 56–88 / 72–120px |
| Motion | `--t-micro` `--t-content` `--t-image` · `--ease` | 180 / 380 / 640ms · cubic-bezier(.22,1,.36,1) |

## Typography

- Display and headings: **DM Serif Display** (400, local file). Interface and body: **Manrope** (local).
- `.display` clamp(46–100px)/1.0 · `h1` clamp(40–76px)/1.04 · `h2` clamp(32–54px)/1.08 · `.serif-3` clamp(26–36px) · `h3` Manrope 700 19–22px · `.lead` 18–21px/1.6 · body 17px/1.7 · eyebrow 13px/700 caps +0.14em with an ember rule · caption 14px.
- No text below 12px (verified by an automated check across routes and widths).

## Components and primitives

- `components/layout/` header (sticky, mega panels with preview, mobile drawer) and a single light footer.
- `components/ui/` `ButtonLink`/`TextLink`, `Closing` (contextual closing section), `PageIntro`, `Crumbs`, `ProductPlate`, `ArticleLink`, `Presence`, `use-tabs` (roving tabindex).
- `components/motion/reveal.tsx`: scroll reveal (`rise`, `fade`, `mask`, `line`, `grow`). Content stays visible without JS and on first paint; only below-the-fold elements are hidden, and never under reduced motion.
- Homepage sections in `components/home/`; page families in `components/pages/`.

## Page families

Service (editorial split hero, index, stepper) · Practice (wordmark, method line, groups, lifecycle) · Product (mist hero with capability plate) · Industry (banner with overlapping caption, contrast columns) · Insights (masthead, filter, featured + staggered grid; article with sticky index) · About (statement, mission/vision, principles, founders, presence) · Contact (details + form, minimal).

## Interaction and accessibility

Native buttons, links and tab roles; arrow-key navigation on tablists; visible focus; skip link; hover is never the only way to reach content (tiles also open on focus and tap; below 960px all tile content is visible). The contact form remains a `mailto:` draft.
