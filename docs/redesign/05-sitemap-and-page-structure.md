# Sitemap and page structure

Status: proposed information architecture; route preservation is technical, not visual reuse. EX routes are source evidence; T routes are existing URL contracts. No route was changed.

## Existing routes and disposition

| T route family | EX business correspondence | Proposed disposition |
| --- | --- | --- |
| `/` | `/` | Entirely new home |
| `/what-we-do`, `/what-we-do/[slug]` | GRCLoop/ForgeLoop service records | Services index and approved capability details; map each existing slug before replacement |
| `/services` | Service discovery | Existing page permanently redirects to `/what-we-do`; preserve |
| `/services/grcloop`, `/services/forgeloop`, `/services/hexn6` | `/grcloop`, `/forgeloop`, `/hexn6` | Practice hubs with all-new presentation |
| `/products`, `/products/tanikkai`, `/products/certanika-lite` | Tanikkai and Certanika Lite external destinations | Approved product summaries; explicit external CTA; do not imply product app hosted here |
| `/industries`, `/industries/[slug]` | Six source industries | Keep index; publish only source-supported detail content; review existing non-source slugs individually |
| `/our-work`, `/our-work/[slug]` | `/resources/success-stories` | Verified story index; publish details only when full bodies are approved |
| `/insights`, `/insights/[slug]` | `/resources/blog`, `/resources/blog/[id]` | Editorial index/details with actual reviewed articles |
| `/about`, `/contact` | Same routes | New layouts, verified company content and approved contact contract |
| `/privacy-policy`, `/terms-conditions` | Same routes | Preserve legal destinations; owner-reviewed text, not invented policy |

EX also has `/partners`, `/resources/faq`, `/resources/testimonials`, `/anti-slavery` and an admin console under `/Yajaman`. They are missing from the current T public route inventory. Recommend retaining partner/FAQ/testimonial content as appropriate dedicated pages or clearly linked sections after editorial review; preserve anti-slavery as a legal route if the policy remains approved. Treat admin as a separate functional workstream; do not expose it through public redesign navigation.

T already redirects `/grcloop`, `/forgeloop`, `/hexn6`, `/resources/blog` and `/resources/success-stories` to the newer corresponding destinations in `next.config.ts`. Missing contract: legacy `/resources/blog/[id]` requires an explicit ID-to-slug mapping, not a broad redirect to the index. Case-sensitive `/Certanika-Lite` needs product-owner review because it may be a live external product path. The already-deleted T `/products/certanika` file must not be restored or repurposed without a route decision.

## Proposed top-level navigation

Services (practice hubs + capability discovery), Products (Tanikkai, Certanika Lite), Industries, Resources (Insights, Our Work, FAQs), Company (About, Partners if approved), and Contact via the primary CTA. Avoid exposing every detail URL as a top-level item. Actual menu density is tested with approved labels.

## Home content sequence and purpose

1. Header and editorial hero: explain scope and give consultation/service paths.
2. Three-practice service index: orient visitors across governance, engineering and response using numbered rows and substantial explanatory content.
3. Product spread: distinguish advisory/services from platforms; two unequal editorial panels with real capability copy and approved product captures if available.
4. Industry context: six source sectors with selectable challenges and relevant service links; accessible static fallback.
5. Evidence feature: one approved story, with source-supported scope; no fabricated outcomes. If full proof is unavailable, use a factual engagement summary.
6. Company/people introduction with authentic approved imagery; omit unverified counters and certification strips.
7. One approved testimonial plus two or three reviewed insight links; omit unavailable material rather than fill with demo content.
8. Consultation invitation and structured footer.

The sequence is an independent proposal, not an extraction of the current target or a claim about Fort's rendered composition.

## Page contracts

| Template | Required substantive content | Primary action |
| --- | --- | --- |
| Practice hub | Scope, grouped subservices, approach, relevant evidence | Discuss requirements |
| Capability detail | Problem, deliverables, scope boundaries, framework relevance, related practice | Enquire with service context |
| Product summary | Purpose, source-supported capabilities, approved visuals, accurate outbound destination | Visit platform / request information |
| Industry | Source-supported challenges, relevant services, approved proof | Discuss sector needs |
| Case study | Client approval, challenge, actual work, evidenced result and attribution | Discuss a similar need |
| Article | Approved title, author/date, full body, related resources | Continue reading / contact when relevant |
| About | Verified company narrative, leadership, approach and locations | Meet the team / contact |
| Contact | Verified contacts, hours if approved, form and clear submission states | Send enquiry |

Do not create shallow pages to fill the sitemap. Retain old URLs through explicit redirects or approved factual replacement content; do not remove them automatically. Canonicals, breadcrumbs and sitemap entries follow final publication eligibility and redirect mappings.
