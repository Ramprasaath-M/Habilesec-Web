# Global connection globe

## Integration and dependencies

The existing server-rendered hero copy, links, navbar and section dimensions are preserved. Only the globe visual and its artwork position change. `GlobalConnectionGlobe` asynchronously imports the scene after hydration; the hero content does not wait for Three.js or textures. Design 06 places the desktop artwork center at 80% width and 64% height, with the globe clipped naturally at the right and lower edges. Tablet and mobile retain their responsive artwork rules.

Installed: `three@0.180.0` and development-only `@types/three@0.180.0`. No Fiber, Drei, controls, physics, postprocessing or other animation runtime was added. The existing npm lockfile is preserved with these additions; installed Next.js 16.4.0 and React 19.3.0 are unchanged. Three.js is used directly and does not depend on React renderer compatibility.

## Local assets and credits

Both downloaded maps were resized to 2048 x 1024 and encoded as WebP. Runtime requests are entirely same-origin.

- `public/images/hero/globe/earth-day.webp` (244,038 bytes): NASA Blue Marble Next Generation, January 2004. Source: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/january/world.200401.3x5400x2700.jpg . Collection and credits: https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/ . Credit NASA Earth Observatory / Reto Stöckli.
- `public/images/hero/globe/earth-night.webp` (145,130 bytes): NASA Earth at Night 2012 / Black Marble. Source: https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg . Credit NASA Earth Observatory / NOAA NGDC, Suomi NPP VIIRS.
- Design 06 fallback: `public/images/hero/globe/earth-connected-blue.webp` (1296 x 1296, 154,494 bytes, transparent WebP). Captured directly from a successful render of this same scene in Chromium, so its continents, cyan lighting, arcs and glowing nodes match the live globe. The previous dark globe is no longer used as this component's fallback.

The initial Three.js example texture downloads were replaced with the NASA originals above; no example textures remain in public assets.

## Scene and resilience

The spherical Earth uses the local NASA maps as inputs to an electric-blue digital shader, without photographic green/brown coloring or warm city lights. Coastline highlights, cyan directional rim illumination and a thin atmosphere create depth. Five geographic routes and four differently inclined decorative elliptical orbits wrap around the globe. Tube cores have a restrained additive outer halo, correct depth testing, and one subtle traveling pulse per route. Seven geographic nodes use shared small procedural radial halo sprites. No bloom, full-screen postprocessing, grids or external assets are needed. All geography is decorative; it does not assert business presence. There are no labels or office/customer claims.

Rotation takes 120 seconds. Endpoint pulse takes about 2.6 seconds; particles take 5–8 seconds. Fine-pointer orientation is limited to a few degrees with exponential easing. Touch retains automatic rotation without pointer response. Initial mobile scenes use six paths, lower tube segmentation, and a maximum 30fps rendering cadence.

The priority fallback image renders in initial HTML and remains visible until the first successful scene render; the transition lasts 850 ms. Reduced motion, Save-Data, two or fewer logical processors, unavailable WebGL2, texture errors and context loss retain/restore the static image. Context restoration restarts the scene. Preference changes dispose/recreate it without accumulating canvases. Renderer size follows ResizeObserver; DPR is capped at 1.5. Geometry/materials are reused each frame. Rendering pauses when the document is hidden or the incoming homepage content covers the pinned hero, including instantaneous scroll jumps. Unmount cleans up frames, listeners, observers, geometry, textures, materials and the renderer.

## Validation

`scripts/global-globe-check.mjs` runs against development or `GLOBE_TEST_URL` for a production server. It checks real rendered rotation at 375/768/1024/1440/1920px, unchanged heading bounds, exact heading/CTA routes, actual CTA navigation, no horizontal overflow, local assets, decorative/noninteractive canvas, pause/resume, real WebGL context loss/restoration, reduced-motion changes, touch behavior, and failed WebGL/texture fallbacks. Screenshots are stored under `.artifacts/globe/` for visual review.

There is no Dockerfile, compose configuration or Docker deployment workflow in this project. The assets are under standard `public/` paths and Three.js is a production dependency. A future custom Dockerfile must copy `public/` and install the lockfile dependencies; no container deployment is claimed.

Browser automation uses Chromium software WebGL. Physical-device GPU profiling and deployment are outside the completed local checks.
