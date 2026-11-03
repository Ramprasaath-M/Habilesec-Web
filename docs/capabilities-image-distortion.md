# Capabilities image distortion

The existing Next Image is retained unchanged. A transparent-to-interaction WebGL canvas in the same clipped image layer samples that image, matching its cover crop and computed object position. Cards, copy, CTA, rings and existing animations remain separate DOM layers.

- Radius: 150 CSS pixels; peak displacement approximately 9 pixels.
- Pointer interpolation: 0.11 at 60 Hz, adjusted for frame duration.
- Entrance: approximately 250 ms; recovery approximately 530 ms, including stationary-pointer settling.
- Rendering stops after recovery, outside the viewport, or while the document is hidden.
- Fine pointers with no reduced-motion preference only. The original image remains visible on touch-only devices, reduced motion, failed shader setup, unavailable WebGL and context loss.
- Drawing resolution is capped at 2x DPR and 2048 pixels per dimension. ResizeObserver updates the drawing buffer and crop. GPU objects, frames, observers and event listeners are cleaned up.
- The shader smoothly removes displacement near image edges and adds no decorative overlays.

Verification: `node scripts/image-distortion-check.mjs` exercised actual changing WebGL pixels, pointer tracking, mouse-leave recovery, stable section bounds, five preserved cards, reduced motion, touch and unavailable-WebGL fallback. Recovered and original section screenshots were pixel-identical. `scripts/capabilities-check.mjs` passed at 375, 430, 768, 1024, 1440 and 1920 pixels, including existing floating animations, content and CTA. Lint, TypeScript and production build passed.
