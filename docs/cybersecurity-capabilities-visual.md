# Cybersecurity capabilities: Design 06 implementation

Reuses the existing Capabilities component; replaces its previously unmounted accordion with the requested split composition. Mounted immediately after CompanyStatistics. Exact approved heading, description and CTA preserved. CTA uses the existing /what-we-do route. Five actual HTML capability boxes remain separate from the image.

## Asset provenance

Both projects were inspected, including the old section artwork and current cybersecurity service images. Existing assets showed developers, servers, or GRC diagrams rather than the requested realistic hand touching a central shield. Two free stock candidates were downloaded and inspected but rejected: one centered a generic lock, and the other contained unwanted audit/currency text. Neither is referenced by production code.

The selected text-free background is an AI-generated visual, created with the built-in image_gen tool, not stock photography or the low-resolution reference screenshot. It is stored permanently at public/images/cybersecurity-capabilities/hand-shield.webp (1536 x 1024, quality 90, approximately 109 KB). No external runtime image URL or temporary file path is used. The transparent card backgrounds, icons, labels, orbit and glow layers are native React/CSS/SVG elements, not flattened into the image.

## Final generation prompt

Create a high-resolution photorealistic commercial cybersecurity website background asset, landscape 3:2 composition. NOT a website mockup, no text, no typography, no labels, no cards, no separate UI icons. Scene: a realistic businessman in a dark navy suit mostly out of focus in background, close-up realistic human right hand entering from bottom center with index fingertip pointing upward and touching the center of an elegant luminous blue holographic SHIELD outline. The shield is the main focal point at x53%, y48%, height36% of frame; inside it a subtle smaller shield/check-shaped protective core, NO PADLOCK, NO keyhole, NO document or currency. Clear realistic hand with natural anatomy below and behind shield, wrist and dark suit cuff at lower right. Glowing thin electric-blue concentric arcs and subtle network nodes around shield, deep navy environment with blue rim lighting and sophisticated photographic depth of field. Shield should remain elegant transparent blue, not huge solid shape. Keep upper-left, upper-right, lower-left and lower-right of the frame visually quiet for HTML capability cards to be added later. Center shield region must be unobstructed. Left edge blends softly into pale ice-blue atmospheric haze, right edge remains deep navy. Premium enterprise visual closely resembling a businessperson touching a virtual security shield interface. Sharp high resolution, restrained glow, no watermark.

## Verification

Development and production browser checks passed at 375, 430, 768, 1024, 1440 and 1920px: exact copy, current homepage placement, successful local image load, five distinct non-overlapping HTML boxes, no horizontal overflow, floating animation, reduced motion, /what-we-do navigation, and no console/hydration errors. Desktop and mobile screenshots were visually reviewed against Design 06. Lint, TypeScript and production build passed. Proposed Company Statistics remain subject to their existing production approval gate; this change does not alter those flags.
