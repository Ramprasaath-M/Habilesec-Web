# Fort reference recreation — implementation report
Updated 28 October 2026. Local Next.js implementation; not published. This implements the latest Fort recreation master task and supersedes the earlier light-only redesign proposals.

## Delivered scope
- Default Cyber Security Dark at /; independent Cyber Security Light and VPN & Hosting home variations.
- All 41 discovered reference content routes, including 8 article details, 4 category archives, 7 tag archives, both blog pagination variants and both author archive pages.
- About Us, Solutions, Case Studies, Our Team, Gallery, Testimonials, Pricing, FAQs, Service Plus, AI Features, Contact Us, Privacy Policy and the demonstration 404.
- Functional sidebar search with results/empty states, real unknown-route 404, legacy /about and /contact compatibility redirects.
- Native keyboard-accessible navigation, three-preview Home mega-menu, informational six-feature Services mega-menu, mobile submenus, fixed desktop header, pricing periods, accordions, testimonial pagination/swiping, scroll indicators, back-to-top, counters, local article likes/copy-link, newsletter/contact validation and error feedback.
- Image, text, chat, video and music interfaces support input/settings and truthful unavailable-provider feedback. Audio selection stays on the device.

The Services entries in Fort were verified as informational elements without individual anchors. No dedicated service-detail URLs were invented. Gallery images lead to /case-studies, matching the observed destination; no gallery lightbox or team detail pages were invented.

## Reference details verified directly
Public pages were opened in permitted headless Chromium using Playwright, independently of the failed native Computer Use workflow. Desktop page structure, typography, image placement, section order, backgrounds, navigation destinations, dropdowns, pricing toggle and gallery destinations were inspected. Full-page screenshots were collected at desktop, tablet and mobile widths.

Measured reference values include #06021d page backgrounds, white headings, #959cc0 secondary text, violet controls, Instrument Sans headings, Plus Jakarta Sans body text, approximately 70px desktop gutters, 57px main section headings, 20px rounded panels and the 157.536px default hero at 1440px.

The fixed desktop header was checked before/after scrolling. Computed reference motion showed 300ms link/menu transitions, 1000ms entrance effects and a 5000ms repeating title treatment. These observations informed the original implementation. See artifacts/fort-recreation-20261028/verified-motion-observations.json and verified-sticky-header.json.

The primary 39-route crawl is in route-inventory.json. The final cross-check found two author archive routes, recorded in author-inventory.json; the complete implementation inventory is lib/fort/inventory.json.

## Original alternatives and approximations
This is a close structural recreation, not a pixel-perfect theme clone.
- Fort's proprietary photos, 3D lock/shield imagery, videos, illustrations and logos were not copied into the website. Licensed stock photography, NASA imagery and original SVG/CSS artwork replace them. Their compositions, lighting and detail visibly differ.
- Circuit paths, lock movement, shield geometry, Earth treatment and logo-strip marks are original alternatives.
- Scroll-reveal trigger distances, counter easing, carousel movement, some responsive spacing and hover details are approximations. Only sampled motion could be measured; exhaustive frame-by-frame parity was not established.
- Editorial paragraphs and quotations are original demonstration content. Prices, profiles, testimonials, addresses, customer names, company marks and performance metrics are expressly labeled demo material. They are not verified HabileSec facts.
- WordPress, Elementor, ThemeRex commercial demo controls, theme purchase links, actual AI services and third-party live chat were not installed. Their appropriate local frontend states are implemented independently.
- The privacy page documents this demonstration rather than asserting an approved production privacy policy.

## Architecture and changed areas
- components/fort: original shell, primitives, distinct home variations, sections, interior pages, forms, client interactions and route dispatch.
- lib/fort: route inventory, archive membership, original demonstration data and matching licensed local fonts.
- app: replaced root shell/styles/home/error states; catch-all route for reference pages; preserved contact API; added newsletter proxy and explicit AI-unavailable response.
- public/fort: source HabileSec logos, optimized local images, original SVGs, public-domain map and licensed fonts.
- scripts/fort-functional.mjs, fort-visual.mjs, fort-compare.mjs and fort-backend-contract.mjs provide repeatable checks.

The framework, package manifest, lockfile, installed dependencies, environment files and existing contact backend contract were retained. The original security headers were retained. Two compatibility redirects were added. TypeScript excludes archived artifacts so preserved old code is not compiled into the replacement.

## Safety and rejected frontend
The experimental target UI did not influence the new layouts, palette, typography or components. The reference was the design authority.

Before replacement, the current app and relevant configuration were copied under artifacts/fort-recreation-20261028/before. The old components tree and old About/Contact pages were moved intact under disconnected-frontend. Remaining former page entry points redirect rather than render the rejected UI. Existing assets, unrelated source data and historical check scripts were retained. No Git reset, clean, stash, dependency installation or environment-file edit was performed.

Habilesec EX was read-only throughout. A SHA-256 comparison of 356 source files matched the initial baseline. The exact existing white and dark HabileSec logo assets were copied; no new logo was generated. Source integrity evidence is source-preservation.json.

## Backend configuration and truthful states
Contact retains POST /api/contact and the verified upstream /api/contact/create contract, including field mapping, origin checks, validation, honeypot, size limits, timeouts and existing rate limiting.

Newsletter uses POST /api/newsletter and the source project's /api/subscription/subscribe upstream endpoint. Set HABILESEC_BACKEND_ORIGIN or BACKEND_ORIGIN to the intended compatible backend. No credentials or environment values are included here. Without a configured backend, forms return explicit unavailable errors. A returned upstream success is required before displaying success.

AI, comment publishing and live support backends are not connected. No generated output or successful submission is fabricated. No payments or paid-provider requests are made. Demo article likes are browser state only.

## Validation
The production build, TypeScript and lint checks were run. Detailed final route, responsive, interaction and accessibility results are in artifacts/fort-recreation-20261028/validation-report.json. Local-only backend contract results are in integration-report.json.

The functional suite checks every inventoried page and internal link, 19 key pages at all eight requested widths (1920, 1440, 1280, 1024, 768, 430, 390, 360), menu interactions/Escape, mobile navigation, sidebar search and empty state, pricing toggles, FAQs, carousel, chat/disclosure, contact/newsletter validation/errors, AI unavailable state, API rejection behavior and unknown-route 404.

Automated axe checks cover eight representative pages at 1440px and 390px using WCAG 2 A/AA and WCAG 2.1 AA rules. Automated results are not a full manual accessibility certification.

The local mock backend validates successful contact/newsletter responses, preserved field mapping, upstream failures, rejection of invalid origin/honeypot/oversized/incorrect-content-type/malformed requests, production security headers and noindex. Traffic stays on loopback; no real message or subscription was sent.

Full-page side-by-side reference/local images are stored as comparison-* in the artifact directory. Matching screenshots cover 18 major pages at 1440, 768 and 390, plus author archives at desktop. Reference and local screenshots were visually reviewed and major section-order/layout discrepancies corrected. No unsupported visual-similarity percentage is asserted. Alternative assets, text lengths and some page heights remain different.

Historic scripts that assert the rejected business UI were retained but are not applicable to this replacement. They are not reported as passed.

## Run locally
After the successful build:
~~~powershell
npm.cmd run start -- --port 3100
~~~
Open http://localhost:3100. The test-owned server is stopped at handoff.

Repeat checks:
~~~powershell
npm.cmd run build
npm.cmd run typecheck
npm.cmd run lint
node scripts/fort-functional.mjs
node scripts/fort-backend-contract.mjs
node scripts/fort-visual.mjs
node scripts/fort-compare.mjs
~~~
Run browser checks while the local server is running. The contract test starts/stops its own isolated server and mock backend. The visual suite expects the retained reference screenshots.

## Remaining differences before real publication
Replace all demonstration business material with approved facts, connect/verify production backends, approve a real privacy policy and remove demo noindex only when appropriate. Exact proprietary-asset fidelity requires appropriately licensed source assets. Current differences are primarily photography/3D artwork, some motion paths, original editorial content and residual spacing/line breaks. No inaccessible content route is knowingly left blank.

Final results: production build, TypeScript and lint passed with no warnings; 41 routes, 44 links, 152 responsive combinations and 16 axe scans passed. No overflow, clipped headings, runtime errors, image failures or axe violations were recorded. Client navigation, browser Back, scroll-reveal lifecycle and reduced motion passed. 54 full-page side-by-side comparisons plus navigation comparisons were generated. See verification-results.json.
