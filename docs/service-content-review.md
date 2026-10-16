# Service Content Review

Reviewed against HabileSec's public practice pages on 2026-10-08. These are company-published capabilities, not an independent validation of delivery outcomes. No new client, metric, certification, SLA or outcome claims have been introduced.

## Sources and Mapping

- [GRCLoop](https://www.habilesec.com/grcloop): Cybersecurity, Governance & Compliance, and Data Privacy.
- [ForgeLoop](https://www.habilesec.com/forgeloop): Digital Engineering.
- [HexN6](https://www.habilesec.com/hexn6): Incident Response & Forensics.

`data/service-categories.ts` records a source URL for each category and a published capability label in the `evidence` field for every service. This is the maintained verification record; navbar and page content use the same definitions.

## Findings

All 33 proposed service labels have support at the capability level. No unsupported offering was identified for withholding. Some labels are editorial groupings rather than exact names of independently packaged services:

| Proposed Label | Published Support / Qualification |
| --- | --- |
| Vulnerability Assessment & Penetration Testing (VAPT) | Security Assessments, full-spectrum testing, vulnerability reporting and internal/external penetration testing. The acronym is an umbrella label, not a claim of a new package. |
| Security Assessments & Audits | Security Assessments plus Risk Assessment & Audits, including internal security audit support. |
| ISO Readiness | ISO 27001 and framework readiness, with ISO 42001 readiness explicitly published. This is advisory/readiness support, not independent ISO certification or accreditation. |
| Data Mapping & Classification | vDPO explicitly includes data inventory, mapping and personal-data classification. |
| Consent Management & Privacy Operations | vDPO/GDPR content includes consent management, processing records, DPIAs, data subject requests and breach advisory. |
| Secure SDLC & DevSecOps | ForgeLoop publishes secure-by-design patterns, code review, automated security gates, release checks and DevSecOps. |
| AI/ML & IoT Solutions | Supported by two distinct ForgeLoop capabilities; the category label does not imply one combined product. |
| Recovery Support | HexN6 publishes ransomware recovery, restoration, integrity validation and monitoring for re-compromise. |
| Breach Notification & Regulatory Coordination | HexN6 publishes notification support, authority liaison and stakeholder coordination. No legal deadlines or legal-advice guarantees are added. |

The remaining service names correspond directly to published practice capabilities, with evidence recorded in the central data file.

## Business Confirmation

No unsupported service is awaiting confirmation. If these editorial groupings are to become separately contracted packages, business owners should confirm packaging and scope first. No pricing, universal delivery promise, independent accreditation, or guaranteed response time is represented here.

The four-stage Understand / Assess / Act / Evolve framework is explicitly presented as a proposed conversation framework. Existing insights are linked as editorial perspectives, not as independently verified case studies or client outcomes.

## Routing and Scope

- `/services` remains the canonical landing route.
- `/what-we-do` permanently redirects to `/services` to avoid duplicate landing pages.
- Five `/what-we-do/[slug]` category pages are added with individual canonical metadata.
- Existing `/services/grcloop`, `/services/forgeloop` and `/services/hexn6` pages remain unchanged and accessible from the new architecture.
- Products, homepage sections, homepage hero, footer, authentication and backend code are unchanged.

## Implementation and Validation

Updated `app/services/page.tsx`, `app/sitemap.ts`, and the two navbar files. Added `data/service-categories.ts`, the `/what-we-do` redirect and dynamic category route, and the service landing, category, explorer, shared sections and scoped stylesheet under `components/editorial/`.

Category routes:

- `/what-we-do/cybersecurity`
- `/what-we-do/governance-compliance`
- `/what-we-do/data-privacy`
- `/what-we-do/digital-engineering`
- `/what-we-do/incident-response`

Lint and production build passed. Browser checks covered 1280px, 1440px and 1920px desktop layouts; tablet and 320px/390px mobile layouts; short viewport menu scrolling; all 33 service anchors; category routes and canonical metadata; unknown-category 404; the landing redirect; original practice routes; related insight and contact links; search; hover, keyboard, touch, Escape and focus return; and reduced-motion controls. Hash comparison confirmed only the intended existing navbar, services landing and sitemap files changed under app/components/data/public.

Known existing limitation: a full page load with reduced motion enabled emits a hydration warning from the shared `app/template.tsx` and `components/motion/reveal.tsx`. These existing components are outside this task's scope and remain unchanged. Normal-motion browser checks have no console errors; the new menu and explorer controls respect reduced motion.
