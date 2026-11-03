# Greenfield component architecture

Status: architecture proposal only. Names below are new conceptual boundaries, not instructions to reuse identically named existing components. No migration or implementation has begun.

## Separation of concerns

Retain Next App Router, strict TypeScript, route contracts, supported image tooling and security/metadata mechanisms. Create a clean frontend namespace after approval, such as `components/redesign/`, plus isolated new design tokens and approved content modules. Do not import experimental target components, CSS, animation utilities, fonts or content objects. An isolated namespace is a controlled staging technique, not a second permanently duplicated website.

Build a reviewed content layer from EX evidence with entity types for Company, Practice, Capability, Product, Industry, Story, Testimonial, Article and Asset. Each published entity should retain source provenance, review status and relevant asset rights. Keep legacy route aliases separate from display names. Existing target data schemas can be studied for route dependencies but their values are not business truth.

## Proposed boundaries

| Layer | New responsibilities | Rendering and behavior |
| --- | --- | --- |
| Tokens/primitives | Surface, Container, Grid, Heading, TextLink, Action, Media, Rule, Field, Status | Server-first markup; accessible semantics; no old global class dependency |
| Shell | NavigationBar, ServicesMenu, ProductsMenu, MobileNavigation, SiteClosing, LegalFooter | Small client boundary for disclosures/focus; server-rendered link content |
| Home editorial | IntroComposition, PracticeIndex, ProductSpread, IndustryContext, EvidenceFeature, PeopleIntroduction, QuoteFeature, InsightList | Distinct compositions; no universal repeated card grid |
| Internal templates | PracticeOverview, CapabilityArticle, ProductOverview, IndustryOverview, StoryArticle, EditorialArticle, CompanyOverview | Server-rendered content; semantic headings, breadcrumbs and related links |
| Interactive islands | MenuDisclosure, IndustrySelector, ProductTabs, ContactEnquiry, OptionalEntryMotion | Local state only; progressively enhanced; reduced motion and keyboard support |
| Content access | Reviewed static records or published CMS adapter | Never leak preview/draft/admin data to public pages |
| Infrastructure adapters | Contact submission, content publication, asset resolution, metadata and route alias map | Contract-driven; independently testable without changing backend data |

## Backend/CMS compatibility

EX's page-builder appearance blocks mix content and legacy presentation. Preserve meaningful published fields, publish/draft semantics and editor workflows, not cinematic block renderers or arbitrary legacy CSS. Determine which CMS pages remain editor-managed before choosing static versus API content. Use an adapter with schema validation and reviewed fallbacks; a fallback must not silently reintroduce obsolete claims when the backend is unavailable.

API inventory to classify before implementation: contact and notifications; subscriptions; blog; stories; testimonials; team; announcements; uploads; site content; admin/auth/preview; audit; QA and chatbot. Preserve active business behavior by contract. Do not bring admin authentication, uploads or AI endpoints into the marketing frontend merely because EX contains them. Identify live consumers and owners first.

For contact, map the new form to the selected backend contract (`requestType`, `website`, `name`, `email`, optional `phone`, `company`, `services`, `comments`). Distinguish “saved” from “notification delivered”; disable duplicate clicks and handle ambiguous retries deliberately. Never display success for a mailto draft as though a server received it. Production verification needs controlled test data and owner-approved delivery destinations later.

## Accessibility and quality contracts

Menus expose expanded state, close on Escape, restore focus, and work by keyboard/touch. Product tabs follow tab semantics only when implemented as tabs; otherwise use ordinary links. Accordion content is reachable without hover. Every field has an associated label and descriptive error; status announcements avoid duplicate alerts. Images reserve intrinsic dimensions. Content remains readable if entry animations never run. No essential information lives inside canvas, hover overlays or decorative motion.

Use Next server components by default; client components only for state/events/browser APIs. Installed Next documentation governs request APIs, route handlers, params, caching and proxy conventions; do not transplant EX Next code without checking compatibility.

## Dependency policy

No dependency changes in Phase 1. Prefer CSS transitions and native browser primitives for the proposed experience. Existing Three.js does not justify new WebGL. Any later new library requires a concrete functional need, bundle/performance review and compatibility check. Font acquisition, image conversion and screenshot generation occur only after implementation approval.
