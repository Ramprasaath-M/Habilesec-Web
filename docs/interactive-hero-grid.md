# Interactive hero grid

`InteractiveHeroGrid` adds an independent, decorative Canvas 2D mesh to the existing hero. No packages or runtime assets were added, and the globe renderer, source, dimensions, position, rotation and arcs are unchanged.

## Rendering

- Desktop: 52px grid, 1px steel-blue lines (`#35527B` at 0.28 opacity).
- Mobile: 44px grid, opacity 0.20.
- Each line has cached vertices no more than 8px apart. A radial displacement field bends those vertices within a 170px influence radius, peaking at approximately 18px displacement.
- Pointer interpolation is 0.12 per 60Hz frame, adjusted for elapsed time. Strength uses exponential damping. A stationary pointer starts settling after 150ms; mouse leave recovers in approximately 600ms.
- The original straight mesh is cached in Path2D and restored exactly. There is no perpetual grid animation. Frames run only during pointer movement and recovery; offscreen/hidden heroes stop immediately. The pinned-hero cover marker plus a passive scroll check handle large scroll jumps.
- Device pixel ratio is capped at 2. ResizeObserver rebuilds geometry and drawing dimensions only on resize. High-frequency values stay outside React state. Event listeners, observers and pending frames are cleaned up on unmount.

## Layering and accessibility

The navy veil is below the grid, followed by the globe artwork, then the original foreground content. The previous globe fade is reproduced as a responsive mask on its artwork wrapper so the left grid remains visible without putting lines over the Earth. No globe renderer code changes are required. Header clearance clips the grid below 68px/84px to avoid tinting the navigation. The grid remains clipped to the hero and cannot cover later sections.

The canvas and wrapper are aria-hidden, have no tab stop, and use pointer-events:none. Pointer events are captured on the hero; links and buttons retain their interactions. Touch/coarse-pointer and reduced-motion devices receive a static mesh. CSS gradients provide a static grid before hydration and when Canvas 2D is unavailable.

## Verification

`scripts/hero-grid-check.mjs` supports development and `GRID_TEST_URL` production targets. It measures real canvas pixel changes, verifies distant lines remain unchanged, confirms pixel-identical recovery, counts canvas strokes to verify rendering stops at rest and offscreen, exercises stationary/leave settling, and checks reduced motion, touch, capped high DPI, no-Canvas fallback, globe rotation, unchanged title/globe bounds, CTA navigation and browser errors. Responsive checks cover 375/768/1024/1440/1920px. Screenshots are stored in `.artifacts/hero-grid/`.

No Docker configuration exists in this project; production mode is tested locally rather than claiming a container deployment. The grid needs only standard bundled client code and CSS.

Validation completed: lint, TypeScript and production build passed. The full browser script passed in development and production at all five widths, including pixel comparisons (over 8,000 locally changed pixels with zero changes in the distant comparison region), exact recovery, idle/offscreen render counts, touch, reduced motion, fallback and CTA navigation. No console or hydration errors were observed. Desktop active/static and mobile screenshots were inspected visually.
