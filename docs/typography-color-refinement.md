# Typography color refinement

Verified 16 October 2026. Preview: http://localhost:3400 .

## Shared palette

- Primary content / `--ink`: `#17191D`.
- Body content / `--body`: `#484C54`.
- Secondary text / `--muted`: `#626873`.
- Brand interaction / `--brand-blue`, aliased by `--blue`: `#14558C`.
- Accent / `--accent-blue`: `#2675B4`.
- Reference light blue / `--light-blue`: `#E8F3FC`. Existing approved background values are preserved.

Existing primary CTA fill `#123B63` and white text remain unchanged. Existing CTA hover fills remain unchanged. `--rule-ink` and `--field-border-hover` retain the former structural colors so changing text tokens does not recolor section rules, list markers, secondary-button hover fills, or form borders.

## Focused changes

Shared tokens handle most headings and descriptions. Dedicated blue content overrides are corrected in the homepage hero, Industries headline, glass-panel tooltip text, footer, dropdown headings, and company role labels. Body and contextual text links begin neutral; hover, focus, active navigation and selected menu labels use brand blue. Eyebrows retain restrained blue. Footer statement and column headings use primary text; links and contact/address information use charcoal.

The footer legal row uses body charcoal rather than the lighter secondary token because `#626873` would fall below 4.5:1 over the darker blue portion of its gradient. This is a contrast exception, not a background change.

No font, size, weight, line height, tracking, layout, spacing, image, animation, content, or route changes were made as part of this typography pass. The global error fallback receives matching primary/body colors. Separate Certanika catalogue/route removals arrived concurrently in the working tree and were left untouched; they account for differences in route count and product content between the original capture and final build.

## Verification

- Production build, TypeScript compilation and ESLint pass.
- All **39 currently implemented routes** checked at **1440, 768 and 390px**: primary h1/h2/h3 colors are consistently `#17191D`, with no overflow or console/page errors.
- Visually reviewed Home, What We Do, Products, Industries, Insights, About and Contact at all three widths; footer also reviewed separately.
- Source declaration comparison against the start-of-task snapshot confirms non-color CSS declarations are preserved. Only text and permitted interaction color declarations change.
- **33 matched primary CTA samples** retain their original background and white text.
- **210 rendered text-region contrast samples** pass their applicable 4.5:1 normal / 3:1 large thresholds. Lowest sampled ratio: **4.69:1**. Samples include the homepage photographic hero, footer gradient and Industries poster at three widths, plus three representative film scenes at desktop and mobile widths. Background pixels were measured beneath temporarily transparent text in screenshots; production styles were not altered for the measurement.
- Default navigation is near-black; hover/focus is brand blue. Footer links start charcoal and turn brand blue. Keyboard focus remains visible.
- Desktop/mobile navigation, keyboard tabs, product/industry selection, Insights filtering, contact draft preparation, hero-panel expansion and approved hero motion pass interaction checks. No message was sent.

Evidence lives in `.artifacts/colors/`: `route-audit.json`, `source-scope.json`, `contrast-results.json`, `interactions.json`, and desktop/tablet/mobile screenshots under `after/`. Testing uses Chromium viewport emulation; sampled contrast checks are not an exhaustive formal WCAG certification.
