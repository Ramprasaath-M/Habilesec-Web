# Homepage navbar boundary timing

## Cause

The existing IntersectionObserver already watched the one-pixel sentinel at the beginning of the content after the hero. Its condition, `entry.boundingClientRect.top <= 0`, waited until that sentinel reached the top of the viewport. The recognition section could therefore be visible for nearly an entire viewport before navigation was disabled.

## Correction

The same observer and sentinel are reused. The homepage header hides when the sentinel is one pixel inside the viewport's bottom edge. Once hidden, it stays hidden while the boundary is inside or above the viewport. It shows again when the boundary returns to the bottom edge. A small entry/exit tolerance and observer thresholds `[0, 0.01, 1]` cover fractional intersections and the exact top-of-page edge without repeated state resets.

The state is position-based, not scroll-direction-based. IntersectionObserver handles viewport and responsive-boundary changes; no additional scroll or resize handler was introduced. Initial deep scroll and large jumps use the same geometry check. The observer remains guarded by `home`, so internal pages retain their existing behavior.

The accepted upward slide remains 300ms. Opacity transitions over 250ms; visibility switches off after the slide. Existing inert and aria-hidden handling immediately disable pointer/keyboard access, close menus, release the mobile scroll lock, and clear focus from the hidden header. Reduced-motion preferences are respected. Header/hero dimensions, typography, logo, colors, images, content, globe, grid, section positions, and menu design are unchanged.

## Files

- `components/layout/header.tsx`: boundary condition, small hysteresis, and observer exit threshold.
- `components/layout/header.module.css`: homepage-only opacity/visibility transitions alongside the existing slide.
- `scripts/navbar-check.mjs`: updated regression for the requested boundary behavior and current accepted layout.
- `docs/navbar-boundary-timing.md`: this cause/change/verification record.

Browser evidence is saved under `.artifacts/navbar-boundary/`. The production build output was copied into an isolated validation directory and served on port 3800, so other builds could not replace files during the scroll checks.

## Actual validation results

- Production build passed, including TypeScript and 48 generated framework/static entries.
- ESLint passed for the changed component and regression script.
- Five homepage viewport configurations passed: 375x844, 375x500, 768x900, 1280x900, and 1440x900.
- Initial visibility, hero-only scrolling where available, first-pixel entry, partial entry, lower-page downward/upward scrolling, exact return-to-top, repeated boundary scrolling, open-menu/focus cleanup, pointer exclusion, keyboard exclusion, deep-scroll reload, responsive resize, and reduced motion passed.
- Header size, hero height, and the next section's document position were unchanged when hiding.
- Eighteen internal-page viewport checks passed: About, Services, Products, Insights, Industries, and Contact at 375, 768, and 1440px. Their sticky headers remained visible and interactive.
- No page exceptions or failed stylesheet, script, or font responses occurred.
- Captured initial and entry screenshots were reviewed on mobile and desktop. At entry, the recognition section is visible at the bottom and the navbar is already hidden.
