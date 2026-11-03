# Floating recognition strip: recovered assets and verification

Implemented on 2026-10-26. The existing RecognitionStrip is mounted as the first section inside the opaque incoming homepage layer, immediately after the pinned globe hero and before TrustStrip. Hero and navbar behavior is unchanged.

## Published state

No logo claims are currently approved. `recognitions` is empty. In production, the integrated section displays only the approved three-line heading; its empty logo region is hidden and has no keyboard stop. In local development (`npm run dev`), all twelve pending logos are visible on the actual homepage with a local-preview label and individual Pending verification labels. This preview is selected server-side by NODE_ENV and is disabled in production builds. The previously displayed Tanikkai, KS Trust, TechSnurf and college logos have been removed from the displayed configuration because they are outside the updated 11-logo credential scope. Their recovered files remain unused.

The component accepts explicitly approved entries with their original names and accurate relationship labels. Its Sera UI-style continuous marquee moves left at 35px/s using two equal repeated groups and measured CSS-transform timing. Hover/focus pause it, arrow keys browse while focused, and Pause/Resume provides persistent control. Reduced motion presents the original list as a static wrapping layout. The repeated group is inert and hidden from screen readers. Pending configuration is separate and includes a `status: "pending"`, classification, reason and original source for every entry. No public preview route or approval toggle is exposed on the production website.

## Credentials recovered, pending confirmation (not rendered)

All eleven original `public/credentials/*` files were copied byte-for-byte from the read-only old project into `public/images/recognitions/`. Original labels come from `CREDENTIALS` in `src/lib/content.js` and the equivalent backend content seed.

| Original label | Recovered file | Required confirmation |
|---|---|---|
| CIPP/E | cipp-e.png | Current individual holder and validity |
| CISA | cisa.png | Current individual holder and validity |
| CISM | cism.png | Current individual holder and validity |
| CISSP | cissp.png | Current individual holder and validity |
| CRISC | crisc.png | Current individual holder and validity |
| OSCP | oscp.png | Current individual holder and validity |
| ISO | iso.jpg | Exact standard, certified entity, scope and validity |
| CMMI | cmmi.png | Appraised entity, appraisal level, scope and validity |
| PCI DSS | pci-dss.png | Exact assessed entity, scope and current evidence |
| HIPAA | hipaa.png | Healthcare privacy/security law, not a certification; approve the supported compliance-reference context |
| CCPA | ccpa.jpg | Privacy law, not a certification; approve the supported compliance-reference context |

The old partners page describes its credential carousel as credentials carried across the team and partner network. That does not prove organizational accreditation or establish current individual ownership. These entries live in `pendingRecognitions` and are not imported into the rendered list. The updated management instruction explicitly keeps unverified claims unpublished; no additional assets are needed.

## DPIIT / Startup India: official original branding recovered, pending

Neither workspace project contains a DPIIT/Startup India recognition record, certificate number, approval date, or existing logo. No recognition claim has been invented.

- Local asset: `/images/recognitions/dpiit-startup-india.png` (222 x 82), original combined DPIIT / #startupindia branding, without modification.
- Official asset source: https://www.startupindia.gov.in/content/dam/invest-india/newhomepage/DPIIT-header.png
- Source page: https://www.startupindia.gov.in/
- Official logo-use request/guidance: https://www.startupindia.gov.in/content/sih/en/logo-form.html
- Configuration: `pendingRecognitions`, excluded from rendering until company recognition and applicable branding permission are confirmed.

## Presentation and accessibility

The completed layout keeps the fixed three-line blue heading on the left (approximately 27%) and the animated logo strip on the right (approximately 73%). Mobile stacks the heading above the marquee. Original colors, proportions, names and classifications are preserved. Logos have stable 180 x 64px contain frames, 56px inter-logo padding, light-blue separators and gentle floating motion. The marquee uses subtle edge masks, with no scrollbar or navigation arrows. There are no extra packages or page-scroll listeners.

Implementation adapted after inspecting Sera UI's actual repeated/measured content-block source:
https://github.com/seraui/seraui/blob/main/src/app/docs/marquee/marquee.tsx
Documentation: https://seraui.com/docs/marquee
The source's per-frame transform updates are replaced by CSS linear translation; ResizeObserver measures a group once and on size changes, setting duration to width / 35 seconds. Exactly two equal contiguous groups make translateX(-50%) seamless, including the last-to-first separator.

## Verification

`node scripts/recognition-check.mjs` checks all eleven recovered original hashes and the actual local-development marquee at 375, 430, 768, 1024, 1440 and 1920px. It checks measured speed, fixed heading, equal contiguous repeats, loop-boundary alignment, hover/focus/persistent pause, keyboard browsing, reduced motion, image loading, no page overflow and console errors. Screenshots are saved under `.artifacts/recognitions/marquee-*.png`.

Against a production server, set NAVBAR_TEST_URL and add `--production` to verify that pending claims remain unpublished and the section remains first after the pinned hero. Existing `scripts/navbar-check.mjs` verifies navbar occlusion, reverse scrolling, focus cleanup, menus and internal-page navigation.
