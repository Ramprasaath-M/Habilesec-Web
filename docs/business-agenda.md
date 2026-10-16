# Homepage Business Agenda

Inserted immediately after `HomeHero`. The only existing application file changed is `app/page.tsx` (one import and one component insertion).

The text attachment describes the BCG interaction, but its two referenced screenshots were not included. The live reference was readable through web search; direct browser inspection was blocked by network access. The implementation follows the specified photographic default state and full editorial expanded state, without copying BCG assets.

## Interaction

- Mouse hover reveals the editorial panel; leaving restores the photograph. Mouse clicks do not pin the hover state.
- Enter/Space on the card's reveal button and touch activation open the panel. The close control or Escape restores the photograph and returns focus.
- Moving keyboard focus outside the card closes an explicitly opened panel.
- Hidden panel controls are inert and excluded from keyboard navigation.
- The Explore links are separate anchors, so navigation never toggles the card state.
- Two coordinated layers use opacity and small content translations over approximately 500ms. Card dimensions remain fixed. Reduced motion removes transitions.
- Four columns at 1280px and above, two from 768px to 1279px, one below 768px.

## Photography

Uses existing local photographs whose Unsplash provenance is documented in `BUILD_NOTES.md`; no BCG imagery or externally hotlinked assets are used.

| Card | Local Asset | Unsplash Source ID |
| --- | --- | --- |
| Digital Dependence | `/images/infrastructure.webp` | photo-1558494949-ef010cbdcc31 |
| Evolving Expectations | `/images/governance.webp` | photo-1497366754035-f200968a6e72 |
| Technology Transformation | `/images/manufacturing.webp` | photo-1581092921461-eab62e97a780 |
| Business Resilience | `/images/engineering.webp` | photo-1522071820081-009f0129c71c |

The resilience image depicts a team coordinating work, not a claimed HabileSec command center or client operation. No fabricated labels, metrics or client claims are added.

## Destinations

Challenge CTAs link to existing related insights: secure product engineering, continuous assurance, AI governance and incident response evidence. No new routes are created.

## Verification

Lint and the final production build passed. Playwright checks passed at 1280px, 1440px, 1920px, 1024px, 768px, 390px and 320px. Checks covered immediate placement after the hero, loaded images, exact headings, all four hover transformations and resets, unchanged card geometry, expanded text/CTA containment, keyboard focus and Enter/Space activation, Escape and close focus return, reduced-motion transitions, actual touch activation, and every CTA destination. Standard browser checks reported no console errors.

File hashes confirmed no changes to the hero, navbar, existing assets or other existing components. Screenshots and the focused browser-check script are stored in the ignored `.artifacts` directory.
