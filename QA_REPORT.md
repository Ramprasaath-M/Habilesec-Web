# HabileSec frontend rebuild — QA report

Reviewed on 15 October 2026 against a local production build, `http://localhost:3300`.

## Project boundaries and recovery

- Working project: `C:\Users\Habilesec\OneDrive\Desktop\Habilesec`.
- Read-only reference: `C:\Users\Habilesec\OneDrive\Desktop\Habilesec Ex\habilesec-site-new`.
- Pre-rebuild source and asset checkpoint: `artifacts/rebuild/pre-redesign-2026-10-15.zip`.
- **356 reference files verified unchanged**, with no missing or changed hashes. Generated caches, dependencies, and Git internals are excluded from that comparison. No write commands were executed against the reference project.
- No runtime dependency on the reference folder. Reused logo and photography are copied into the new project's own `public` directory.

Evidence: [reference integrity](artifacts/rebuild/reference-integrity.json), [asset manifest](artifacts/rebuild/asset-manifest.json), [changed-file inventory](artifacts/rebuild/changed-files.json).

## Executed checks

| Check | Actual result |
| --- | --- |
| `npm.cmd run build` | Passed; production routes generated |
| `npm.cmd run lint` | Passed; no application errors or warnings |
| `npm.cmd run typecheck` | Passed |
| Public route checks | 33 passed, including the `/services` redirect destination |
| Headings and metadata | Each checked route renders one H1, a description, canonical URL, and Open Graph title |
| Internal links and anchors | 31 distinct destinations checked; no broken targets |
| Legacy redirects | Six checked; all return 308 to their intended destinations |
| Responsive/reflow checks | 82 passed at 320, 375, 430, 768, 1024, 1280, 1440, and 1920px, including two zoom-equivalent reflow checks |
| Landscape checks | 14 passed at 844×390 and 667×375; mobile navigation remains reachable |
| Horizontal overflow / clipped content | None detected in tested layouts |
| axe-core 4.14.0 | 37 WCAG A/AA scans; zero detected violations |
| Production browser errors | None detected during the public-page audit |
| Image loading | Primary-page screenshot capture waited for local image decoding; no image loading errors detected |
| Automatic external requests | None detected during the public-page audit |
| Robots, sitemap, favicon | All return HTTP 200 |
| Missing page | Custom 404 returns HTTP 404 |

The public-page census excludes Next.js internal error routes and parameter-pattern paths. The root error fallback is separately implemented with `lang="en"`, a main landmark, a readable H1, retry control, and hard-navigation recovery.

Evidence: [route/layout/accessibility report](artifacts/rebuild/qa-chromium.json), [landscape and redirects](artifacts/rebuild/qa-landscape-redirects.json), [security and SEO responses](artifacts/rebuild/security-seo.json).

## Browser coverage

| Browser / engine | Version | Result |
| --- | --- | --- |
| Installed Chrome | 155.0.8059.40 | 27 page/width checks passed |
| Installed Microsoft Edge | 155.0.4283.45 | 27 passed |
| Playwright Firefox | 155.0 | 27 passed |
| Playwright WebKit | 26.6 | 27 passed |

Each browser covered nine representative pages at 320, 768, and 1440px, plus navigation disclosure, Escape, challenge disclosure, and product selection. Firefox required execution outside the restricted process sandbox. WebKit tests wait for native focus scrolling to settle before pointer selection.

WebKit is the Safari rendering engine, **not a claim that native Safari or an iOS device was tested**. Native Safari, real mobile hardware, screen-reader combinations, and native browser zoom UI were not available in this Windows environment. The 640px and 320px reflow tests represent 200% and 400% zoom from a 1280px layout; they are not measurements of a browser's zoom control.

Evidence: [cross-browser report](artifacts/rebuild/qa-cross-browser.json).

## Interaction and form behavior

Verified desktop dropdown open/close and Escape recovery; mobile menu and dropdown taps; challenge and capability disclosure with Enter/Space; product selection; industry selection; perspective filtering; reduced-motion behavior; empty-form native validation; and generation of a correctly encoded email draft. No enquiry was sent.

The contact form preserves the existing `mailto:` workflow. It does not submit to a server or claim successful message delivery. Input lengths are bounded. No database, credentials, authentication, SMTP, CRM, or reference-project backend was modified.

## Lighthouse — final local production build

| Category / metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 96 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 2.7s | 0.6s |
| Total Blocking Time | 70ms | 0ms |
| Cumulative Layout Shift | 0 | 0 |

These are local Lighthouse lab results, not verified real-user Core Web Vitals. Mobile simulated LCP remains above the aspirational 2.5s threshold. Production hosting, CDN behavior, real-user INP, and 75th-percentile field performance require measurement after deployment. No claim of meeting field targets is made.

[Mobile Lighthouse report](artifacts/rebuild/lighthouse-mobile.report.html) · [Desktop Lighthouse report](artifacts/rebuild/lighthouse-desktop.report.html).

## Security and privacy checks

Verified the production CSP, `nosniff`, frame denial, strict-origin referrer policy, and permissions restrictions. Scripts, images, fonts, and connections are restricted to local origins; the CSP permits inline Next.js scripts and styles. This is baseline hardening, not a nonce-based CSP or a penetration-test certification.

The clean browser session had no cookies and no local-storage entries. There are no analytics or advertising scripts. Static organization JSON-LD contains only company and contact facts; there are no fabricated ratings, testimonials, or credentials.

## Implementation summary

- Replaced homepage composition with the requested eight sections and light design system.
- Rebuilt all primary pages, service categories, practice pages, platform pages, industry detail pages, and practice-note routes.
- Added local legal pages, custom missing-page and global-error recovery, canonical/OG metadata, sitemap, favicon, redirects, and security headers.
- Added shared frontend components in `components/enterprise/` and content in `data/enterprise.ts`.
- Reused and improved the existing contact form.
- Centralized tokens in `app/globals.css` and aligned Tailwind colors with them.
- Retired 64 obsolete UI component files after creating the checkpoint. Removed the unused Framer Motion dependency and its two transitive packages. Production dependencies are Next.js, React, React DOM, and Lucide React.
- Preserved TypeScript, PostCSS, framework architecture, original business data, and original local assets. Existing unused media and legacy data are retained for owner review; they are not loaded or presented by the new frontend.
- QA browser binaries, Lighthouse, and formatting tools are isolated under ignored `artifacts/rebuild/` directories and are not production dependencies.

## Review items and practical limits

No unresolved functional defect was identified in the completed frontend checks. Business review is still required for portfolio wording, practice-note publication, company details, legal language, and inherited asset rights. See [CONTENT_REVIEW.md](CONTENT_REVIEW.md) and [ASSET_SOURCES.md](ASSET_SOURCES.md).

All three inherited product destinations returned HTTP 200; availability does not verify portfolio classification or terms. The original separate Certanika Lite application path must remain served by the existing hosting arrangement if deployed on the same domain.

No deployment, DNS change, message sending, database migration, or server-side contact-delivery integration was performed.

## Visual previews

[Desktop homepage](artifacts/rebuild/1440-home.png) · [Mobile homepage](artifacts/rebuild/375-home.png) · [Products](artifacts/rebuild/1440-products.png) · [Contact](artifacts/rebuild/1440-contact.png).
