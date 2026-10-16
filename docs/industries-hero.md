# Industries cinematic hero

Implemented and checked 16 October 2026. Only the Industries landing hero changes. The sector list gains an `id="sectors"` for the hero link; its content and presentation are preserved. Navbar, footer, homepage, industry detail pages, shared CSS, and the read-only HabileSec Ex project are untouched.

## Reference limitation

Opened https://vimeo.com/987157804 and https://www.turnerandtownsend.com/ through the web tool. Page content was accessible, but no connected browser was available for playing the reference. Its footage, movement, pacing, and transitions were **not** visually analyzed. This implementation is an independently composed industry film, not a verified reproduction of the reference editing.

## Footage and license

No existing video files were found in either project's public assets. All three downloaded clips are listed as free under the [Pexels License](https://www.pexels.com/license/), checked 16 October 2026. Pexels explicitly permits commercial website use: https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project . Footage is illustrative, not a claim that people or buildings shown are HabileSec clients or facilities.

| Source | Creator | Role |
| --- | --- | --- |
| https://www.pexels.com/video/drone-footage-of-a-glass-building-9701001/ | Kindel Media | Corporate business environment |
| https://www.pexels.com/video/healthcare-workers-talking-on-hospital-corridor-6130553/ | RDNE Stock project | Healthcare operations |
| https://www.pexels.com/video/advanced-robotics-in-automated-factory-32386590/ | Usman AbdulrasheedGambo | Connected manufacturing |

Industry selection is supported by `HabileSec Ex/habilesec-site-new/src/lib/content.js`, `INDUSTRIES`: Government, BFSI, Technology, Manufacturing, Healthcare, Retail. The film is a representative selection, not a separate shot for every sector. No Turner & Townsend footage was downloaded or reused.

## Local assets and edit

| File under `public/videos/industries/` | Encoding | Bytes |
| --- | --- | ---: |
| industries-hero.webm | VP9, 1600 x 900, 24 fps, silent | 3,355,870 |
| industries-hero.mp4 | H.264, yuv420p, 1600 x 900, 24 fps, faststart, silent | 4,271,630 |
| industries-poster.webp | WebP, first frame of the final edit | 139,044 |

Approximately 15.6 seconds. Three six-second selections, each starting one second into its original clip, normalized to the same dimensions and frame rate. Common treatment: brightness +0.035, saturation 0.82, contrast 1.02. Two 0.8-second cross-dissolves connect the scenes. A final 0.8-second dissolve into the opening shot, with a corresponding opening trim, blends the loop boundary. No synthetic zooms, black fades, audio, external runtime URLs, or layered video players.

## Implementation

- `components/pages/industries-hero.tsx`: isolated client component, poster image, one native video, reduced-motion/data-saver guard, and accessible pause/play control.
- `components/pages/industries-hero.module.css`: scoped full-bleed composition, light directional gradient, typography using existing font tokens, responsive crop and layout.
- `components/pages/industry-pages.tsx`: replaces only the landing PageIntro and adds the sector anchor.

Headline, lead, and CTA enter with an 800–900 ms fade and 14 px upward movement; their stagger is 80/160/240 ms. Content never waits for playback. Video fades in when decoded data is ready. Pausing retains its current frame. Autoplay rejection is caught and leaves a Play film control; load errors retain the poster and all textual content.

The video is muted, looping, and inline. VP9 is selected when supported, otherwise MP4. Only one format is requested. An eager, priority poster reserves the hero's presentation before video readiness. Reduced-motion and Save-Data preferences prevent a video source being attached; changes to reduced motion are handled live. No JavaScript leaves the server-rendered poster and copy usable. Film is decorative and excluded from the accessibility tree; the existing sector content supplies the information.

Desktop uses a tall full-width film with left-aligned text. Tablet strengthens the light gradient. Below 720 px, copy sits above a lower film composition with a vertical gradient rather than a scaled-down desktop arrangement. Controls retain a 44 px minimum touch height.

## Verification

- `npm.cmd run typecheck`, `npm.cmd run lint`, and `npm.cmd run build`: passed.
- Playwright Chromium against both development and production servers: 320, 390, 768, 1440, and 1920 px widths; no overflow, text clipping, or navbar overlap. Production checks also passed with the site's Content Security Policy active.
- Playback time advances, pause/resume works, mute/loop/inline properties are set, and playback wraps across the loop seam.
- Both WebM and MP4 decode at 1600 x 900.
- Reduced-motion context makes zero video requests; toggling the preference live removes/restores the source.
- Aborted media requests preserve the poster and heading.
- Sector anchor navigates correctly. Below-hero sector text, links, image sources, and structure match the pre-change baseline.
- No page errors or console errors in the successful playback runs.
- Desktop/mobile screenshots and test output: `.artifacts/industries/desktop-1440.png`, `desktop-390.png`, `desktop-768.png`, `reduced-motion-390.png`, `scene-healthcare.png`, `scene-manufacturing.png`, and `verification.json`.

Limitations: automated Chromium viewports are not physical iOS/Android device tests; field Core Web Vitals and a formal Lighthouse audit were not collected. Reference-film visual comparison remains unverified as described above.
