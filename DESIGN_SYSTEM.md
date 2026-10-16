# HabileSec design system

The rebuilt frontend is an original, light enterprise design. It favors clear business language, editorial photography, thin rules, and useful disclosure over decorative cards and animation.

## Foundations

Tokens live in `app/globals.css`. Tailwind's named colors resolve to the same variables.

| Role | Token / value |
| --- | --- |
| Background | `--background`: #FFFFFF |
| Alternate surface | `--surface`: #F7F8FA |
| Primary text | `--text`: #17212B |
| Secondary text | `--secondary`: #52606D |
| Border | `--border`: #E3E7EB |
| Brand navy | `--navy`: #123B63 |
| Accent | `--accent`: #2874A6 |

Navy is used for brand emphasis and controls, not large dark surfaces. Photography sits inside light layouts. The original HabileSec logo is copied without changing its proportions or identity.

## Typography

Manrope is hosted locally through `next/font/local`, with Segoe UI and Arial fallbacks. Its existing SIL Open Font License remains in `public/fonts/manrope-OFL.txt`. No font requests go to Google.

| Role | Scale |
| --- | --- |
| Homepage H1 | 40–72px, weight 500, line height 1.1 |
| Inner-page H1 | 36–64px, weight 500 |
| Section H2 | 28–44px, weight 500, line height 1.2 |
| Card H3 | 20–25px, weight 500, line height 1.35 |
| Body | 16–18px, line height 1.65–1.85 |
| Navigation and links | 14–15px, weight 500–600 |
| Eyebrows | 11–12px, weight 600, restrained uppercase tracking |

Every public content page has one H1. Paragraphs have readable maximum widths. Optional desktop line breaks disappear on small screens.

## Layout and spacing

Use `.container`, `.section`, `.section-head`, and `.split-section`. The outer container is capped at 1360px including gutters; its content width is about 1264px. Gutters scale from 20 to 48px. Section spacing scales from 56 to 104px. Spacing follows 4px and 8px increments.

Layouts reflow at 1100, 800, and 480px where their content requires it. Reflow is also checked at the equivalent 640px and 320px layouts for 200% and 400% zoom on a 1280px desktop. Images use aspect ratios; text-bearing containers have natural heights.

## Components

- `components/enterprise/header.tsx`: approved six-item navigation, native disclosure menus, mobile toggle, Escape and outside-click dismissal.
- `shared.tsx`: section headings, page heroes, buttons, text links, and contact CTA.
- `interactive.tsx`: challenge and service disclosures, product selector, industry selector, perspective filters.
- `home.tsx`: the eight homepage sections in the requested order.
- `pages.tsx`: consistent service, practice, product, sector, editorial, company, and contact templates.
- `footer.tsx`: light footer with local legal destinations and verified contact information.
- `components/sections/contact-form.tsx`: preserved email-draft workflow, native validation, and bounded input lengths.

Small 4px image corners, 2px control corners, and thin borders are the default. Shadows are limited to the navigation dropdown. Plus icons indicate disclosure; arrows indicate navigation. Icons are not used as decoration.

## Interaction and accessibility

Native `<details>` elements provide progressive disclosure without hover dependence. Buttons use `aria-pressed` for product, sector, and filter selection; results have live announcements. Links and form controls retain visible focus indicators. Controls generally provide 44–48px targets; compact footer links exceed the WCAG 2.2 minimum target height.

Motion is limited to short content entrances, icon states, and subtle image emphasis. Reduced-motion preferences disable transitions and animated scrolling. There is no autoplay video, parallax, animated background, flip animation, or scroll-dependent content reveal.

## Reference principles

The information structures of [Grant Thornton](https://www.grantthornton.global/en/), [UBS](https://www.ubs.com/), [Deloitte](https://www.deloitte.com/), [PwC](https://www.pwc.com/), [KPMG](https://kpmg.com/xx/en.html), and [DXC](https://dxc.com/) were reviewed for clear capability navigation, sector context, editorial content, and contact paths. The resulting visual system and implementation are original; no reference-site code, illustrations, or branding were copied.
