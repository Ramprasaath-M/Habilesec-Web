# Business content and asset inventory

Date: 28 October 2026. EX means `Habilesec Ex/habilesec-site-new`; all source paths here are EX-relative unless explicitly marked T. This inventory verifies repository evidence, not current production CMS values. Preserve facts and attribution while rewriting explanatory prose; do not turn draft recommendations into company claims.

## Company and contact evidence

`src/lib/content.js` exports SITE: HabileSec; legal name HabileSec India Pvt Ltd; cybersecurity, governance and secure digital engineering; `enquiry@habilesec.com`; `+91 435-357-5243`; WhatsApp `+919361574711`; HQ `46/10 Sankar Iyer Garden, Doctor Moorthy Road, Kumbakonam, India 612001`. Other listed locations: Ahmedabad, Bhilwara, Hyderabad and Bangalore. Hours: Monday–Friday 9 AM–6 PM, weekends closed; timezone is not specified in that source. LinkedIn, Twitter, Facebook and YouTube links are provided in SITE. These are source-verified candidates; confirm current contact details before launch. Do not label international map points as offices without verification.

FOUNDERS records Kalaivani Srinivasan (Founder & MD) and Srinivasan Mahalingam (CEO & CISO), with portrait paths and biographies. TEAM_SEED names Shanthini Vishnu and Divya Saravanan. Preserve source names; confirm current titles and publication consent rather than expanding biographies.

## Services and subservices

| Offering | Source | Verified scope in source |
| --- | --- | --- |
| GRCLoop | `src/lib/content.js`: GRC_SERVICES and GRC_SERVICE_DETAILS | vCISO; vDPO; vAdvisory/governance; compliance frameworks; security program design; third-party risk; security assessments; hardening; risk assessment/audits; Next-Gen SOC; training; AI compliance |
| Additional GRC index terms | Same file, GRC_SERVICES | Incident response/forensics, vulnerability assessment, managed operations and MDR; these overlap HexN6 and require cross-links, not invented separate offerings |
| ForgeLoop | Same file: FORGE_SERVICES and FORGE_SERVICE_DETAILS | Product development; web/mobile; digital engineering; IoT; AI/ML; cloud/DevOps; secure SDLC/DevSecOps; cloud modernization; accreditation/certification support |
| HexN6 | `src/app/(site)/hexn6/page.js`: CAPABILITIES | Compromise assessment; incident response; cloud/log forensics; digital forensics; malware analysis; threat hunting; ransomware recovery; litigation/e-discovery |

Detailed GRC IDs: `vciso`, `vdpo`, `vadvisory`, `compliance`, `security-program`, `tprm`, `security-assessments`, `security-hardening`, `risk-audit`, `next-gen-soc`, `training`, `ai-compliance`. Forge IDs: `product-development`, `mobile-app`, `iot`, `digital-engineering`, `ai-ml`, `cloud-devops`. These are content identifiers; this does not imply all corresponding EX detail routes exist. Broad index services without detailed records should remain scoped sections until detail copy is approved.

Framework references describe supported advisory/readiness work, not HabileSec accreditation or guaranteed certification. No legal guidance or current regulatory interpretation was validated in Phase 1.

## Products and solutions

| Product | Evidence | Content eligible for draft |
| --- | --- | --- |
| Tanikkai | `content.js` PRACTICE_LINES | GRC platform with AI insights and automation; outbound destination `https://www.tanikkai.com` |
| Certanika Lite | `src/components/home/PortfolioShowcase.jsx` TRACKS; Header/Footer link constants | AI-powered ISO 27001 readiness; gap assessment/SoA; policies, controls and risk treatment; evidence collection/audit readiness; source destination `https://habilesec.com/Certanika-Lite` |

Only business strings and destinations were extracted from the EX components; their styling/layout was excluded. Product capabilities are source-supported copy, not a tested product specification. No real product screenshots or demo availability were verified. Do not invent interface screens, integrations, pricing or performance claims.

## Industries, stories and testimonials

INDUSTRIES in `content.js`: Government, BFSI, Technology, Manufacturing, Healthcare, Retail. Reorganizing BFSI as Banking, Financial Services & Insurance is a proposed editorial expansion of the acronym. Other target-only sectors are not approved evidence of business scope.

`src/data/success-stories.json` contains five published records corroborating SUCCESS_STORIES: Infocom IT HK Ltd (compliance), Nirvaana Client Solutions (vCISO/security), Techsnurf (SOC), GoSwift (VAPT) and Techsnurf (privacy). Local records primarily provide titles/excerpts, not fully evidenced long-form outcomes. `src/lib/successStore.js` reads backend records and falls back to constants; it does not establish the local JSON as current CMS truth. Publish short source-supported summaries first; do not manufacture full case studies or metrics.

`src/data/testimonials.json` and TESTIMONIALS identify Sivakumar Gingee / Krushnakkumar, Nagarajan Anandaraman / GoSwift, Srinivasan Mahalingam / Wibmo, Ajay Bhat / Nirvaana, Deepak Shankar / Techsnurf and Melwyn Rebeiro / InfoCom IT. Some portrait fields are empty; use text attribution rather than synthetic people. Preserve exact quotations or request approval for edits. Founder/testimonial identity overlap is flagged below.

BLOG_POSTS defines six 2025 articles about ISO 27001 resilience, Zero Trust, awareness, AI security, phishing and social engineering. Inventory titles/authors/dates separately from confirming complete article bodies. Only published, reviewed bodies qualify for detail pages and sitemap entries. FAQS contains ten entries about needs assessment, support, setup, pricing models and compliance scope; use as draft material, not automatic contractual promises.

## Brand and asset register

| Asset | Verification and use policy |
| --- | --- |
| `public/habilesec-logo.png` | Visually inspected source lockup: navy lettering, multicolor profile glyph, Governance Excellence tagline; preserve original artwork and proportions |
| `public/habilesec Logo.png` | Original-named alternative exists; compare resolution/provenance before final master selection |
| `public/habilesec-logo-white.png` | EX Brand.jsx describes a derived recolor, not an official reverse master; approval pending |
| `public/founder/DSC00445.jpg`, `DSC00458.jpg` | Founder portraits referenced in content; verify rights and current suitability |
| `public/partners/`, `technology-partners/` | Business logo candidates; verify relationship category and permission individually; never imply customer status from folder membership |
| `public/certs/`, `credentials/`, `certifications/` | Existing badge assets; verify corporate versus individual credential ownership and validity before display |
| `public/sections/`, `blog/` | Existing photography and editorial candidates; provenance, license and authenticity unresolved; do not import as a default design library |
| Story image paths | Some `/success-stories/...` references lack a corresponding top-level public folder in the inspected listing; resolve file existence before use; one local story references `/blog/uploads/...` |

New imagery brief: real analysts, evidence review, secure engineering and operational infrastructure; commissioned or licensed photography with documented source and usage rights. Real product captures must be approved and scrubbed of customer data. No hooded-hacker stock trope, decorative fake dashboards or generated testimonials.

## Claims and conflicts requiring action

| Claim | Source file | Conflicting information / evidence gap | Recommended verification action | Publication status |
| --- | --- | --- | --- | --- |
| 7+ years of excellence | `src/lib/content.js` STATS | MILESTONES starts with foundation in 2020; 7+ completed years is not supported by 28 Oct 2026 | Obtain incorporation/start date and definition of experience | HOLD number and founding-date schema |
| 100+ global clients, 50+ experts | `content.js` STATS | WHY says hundreds of engagements; HexN6 METRICS separately says 50+ forensic experts; scope/date/source not supplied | Obtain dated, scoped counts from business owner | HOLD numerical proof |
| Six industry sectors | `content.js` STATS/INDUSTRIES | Six source sectors; detailed services mention further segments; T has broader route families | Approve primary taxonomy; describe relevance without claiming sector totals | Six source categories eligible; HOLD total-as-proof |
| International offices | `content.js` OFFICES | Includes Canada, USA, Hong Kong, Dubai; SITE otherLocations lists Indian cities only and no international street addresses | Classify each as office, delivery coverage or partner presence | HOLD international office/map claims |
| HabileSec certifications | `content.js` MILESTONES, CERTS/CERT_IMAGES/CREDENTIALS | Mix of standards, laws, personal credentials and corporate attestation; GDPR/DPDPA labels are not proof of a company certificate | Obtain issuer, certificate holder, scope, issue/expiry and verification record | HOLD corporate badges/claims |
| Wibmo testimonial attributed to Srinivasan Mahalingam | `content.js` FOUNDERS/TESTIMONIALS; `src/data/testimonials.json` | Same name and LinkedIn identity as company CEO/CISO | Confirm relationship, timing, consent and disclosure or choose another quote | HOLD this testimonial |
| <1 hour triage; 100+ investigations; guaranteed SLA | `src/app/(site)/hexn6/page.js` METRICS/DIFFERENTIATORS | No contract, operating evidence or scoped reporting attached | Obtain current signed service terms and delivery owner validation | HOLD numeric/guaranteed promises |
| Court-admissible evidence | Same file DIFFERENTIATORS | Absolute assurance unsupported by jurisdiction/process evidence | Review approved scope with service/legal owner | HOLD absolute wording |
| Certanika Lite destination | EX Header/Footer/PortfolioShowcase; T route inventory | EX uses case-sensitive `/Certanika-Lite`; T uses `/products/certanika-lite`; related T certanika page is already deleted in working tree | Confirm live product owner/destination and explicit redirect contract | HOLD final link/redirect decision |
| Product AI/automation features | `content.js` PRACTICE_LINES; PortfolioShowcase TRACKS | No tested feature specification/screenshots supplied | Product owner approves current capabilities and captures | Draft only; HOLD unverified expansion |
| Current published content | `src/lib/siteContentStore.js` | Backend publication overrides content.js; local constants/JSON may be stale | Export approved public CMS records, without credentials or personal enquiry records | Source inventory complete; production parity unverified |

Do not silently choose the most flattering value. Hold only the affected claim; the underlying service can still be described using verified scope.
