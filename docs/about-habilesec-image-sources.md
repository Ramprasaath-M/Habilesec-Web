# About HabileSec — Design 11 photography and validation

## Final image

- Runtime file: `public/images/about/about-consulting.webp` (2000 x 1333, 149,886 bytes, WebP quality 88).
- Photographer: Andrea Piacquadio.
- Verified original: https://www.pexels.com/photo/focused-business-team-with-laptop-discussing-project-3932229/
- Download: https://images.pexels.com/photos/3932229/pexels-photo-3932229.jpeg?auto=compress&cs=tinysrgb&w=2400
- Downloaded and source/license reviewed: 2026-10-27.
- License: https://www.pexels.com/license/ permits free website/commercial use and modification; attribution is optional. Do not imply endorsement by the people photographed.

Pexels documents a 5760 x 3840 source, Canon EOS 5D Mark III, and a March 2020 capture date. The photograph depicts three colleagues reviewing a laptop in a modern office. It was visually inspected for natural faces, hands, workplace details, clarity, and absence of watermarks. It is illustrative photography, not a claim that the subjects are HabileSec staff or cybersecurity consultants. No AI-generated people, screen replacements, overlays, or generated artwork are used.

The old project's `public/sections/advisory.jpg` was inspected read-only: it is a general boardroom meeting without the requested technology collaboration setting. Other inspected candidates included dark hacker-style imagery, four-person groups, and images whose faces were poorly positioned for a landscape crop. The selected photo is also the source of the previous collage's business-discussion image; the full high-resolution composition is now used as the sole photograph, freshly downloaded and optimized with existing Sharp tooling. No new dependency was added.

## Implementation

Only the About section component and scoped CSS change the application. The exact eyebrow, heading, description, and `/about` CTA remain unchanged. The collage markup is removed. Desktop and tablet use a text-left/image-right grid (approximately 52%/48% of available column space); mobile below 768px stacks the image after the CTA. The frame uses a stable 5:4 desktop and 4:3 mobile aspect ratio, 12px rounded corners, cover cropping, and no shadow or decoration.

The existing Reveal primitive provides two 600ms gentle upward fades, with a 100ms image delay. Scoped CSS reduces the movement to 14px. Hover zoom is 1.025 over 450ms; the CTA arrow moves 4px. Reduced-motion preferences suppress movement. Next.js Image uses a local path, descriptive alt text, lazy loading, and responsive sizes.

## Deployment boundaries

The image is part of the new project's `public` directory and is served locally by Next.js in both development and production. Image optimization runs locally through `/_next/image`; the browser does not contact Pexels. Standard `next start` deployment requires both `.next` and `public`.

This new project contains no Dockerfile, Docker build configuration, or deployment connection, and Docker is unavailable in the environment. Therefore an actual deployed Docker image cannot be verified here. Any external Docker packaging must copy `public` into the runtime image; no unrelated deployment configuration was added.

## Validation

`scripts/about-habilesec-check.mjs` checks valid WebP decoding and dimensions, exact unchanged copy and CTA, one image only, local optimized image loading, stable dimensions, responsive column/stack order at 320/375/430/768/1024/1440/1920px, reveals, hover zoom, reduced motion, no page overflow, and working `/about` navigation. Screenshots are written to `.artifacts/about-habilesec/`.

Actual results: production build passed (48 generated pages, including TypeScript); component ESLint passed. Development browser checks passed at all seven listed widths. The built homepage HTML references the local image, and the 149,886-byte deployment asset exists under public. Production browser checks are recorded by the same script.

Production responsive checks passed at all seven widths. The separate production hover inspection confirmed the expected 1.025 image scale. The browser regression waits for the entrance animation to settle before testing hover, preventing pointer placement during frame movement.
