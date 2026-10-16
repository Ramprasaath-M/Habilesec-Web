export type ServiceCategory = {
  slug: string;
  number: string;
  name: string;
  description: string;
  headline: string;
  overview: string;
  practice: "grcloop" | "forgeloop" | "hexn6";
  practiceName: string;
  practiceCopy: string;
  source: string;
  services: { id: string; name: string; description: string; evidence: string }[];
  challenges: string[];
  approach: { title: string; copy: string }[];
  insights: string[];
};

// Evidence labels identify the published practice capability behind each proposed service label.
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "cybersecurity", number: "01", name: "Cybersecurity",
    description: "Protect digital environments, identify security weaknesses, and strengthen organizational resilience.",
    headline: "Find the gaps. Strengthen your defenses.",
    overview: "Understand where your applications, infrastructure and cloud environments are exposed. Connect testing, secure configuration and security operations to the risks that matter to your business.",
    practice: "grcloop", practiceName: "GRCLoop",
    practiceCopy: "Security assurance and operations are part of GRCLoop's published portfolio, connecting technical controls with governance and risk oversight.",
    source: "https://www.habilesec.com/grcloop",
    services: [
      { id: "vapt", name: "Vulnerability Assessment & Penetration Testing (VAPT)", description: "Assess vulnerabilities and test applications and infrastructure for exploitable weaknesses, with findings to guide remediation.", evidence: "Security Assessments; Full-Spectrum Testing; Infrastructure testing" },
      { id: "cloud-security", name: "Cloud Security", description: "Review cloud configurations, access and exposure across AWS, Azure and GCP environments.", evidence: "Cloud security; Security Hardening" },
      { id: "security-assessments", name: "Security Assessments & Audits", description: "Evaluate security maturity, architecture and control effectiveness through posture assessments and internal audit support.", evidence: "Security Assessments; Risk Assessment & Audits" },
      { id: "security-monitoring", name: "Security Monitoring & SOC", description: "Connect monitoring, detection and investigation with security operations across cloud and hybrid environments.", evidence: "Next-Gen SOC; SOC and cloud security operations" },
      { id: "security-hardening", name: "Security Hardening", description: "Reduce exposure through configuration baselines, access controls and hardening of networks, endpoints and cloud resources.", evidence: "Security Hardening" },
      { id: "application-infrastructure-testing", name: "Application & Infrastructure Security Testing", description: "Test web, mobile, API, network and infrastructure attack surfaces to identify security weaknesses.", evidence: "Full-Spectrum Testing Across Applications, Infrastructure, and Cloud" },
    ],
    challenges: ["Limited visibility into technical weaknesses across a changing estate.", "Misconfigurations and inconsistent controls across cloud and infrastructure.", "Security findings that need to become prioritized remediation work."],
    approach: [
      { title: "Assess the environment", copy: "Review architecture, configurations and relevant attack surfaces to establish the assessment scope." },
      { title: "Test and prioritize", copy: "Use security assessments and testing to identify weaknesses and connect findings to risk and remediation." },
      { title: "Strengthen and monitor", copy: "Use hardening and security operations to improve controls and maintain visibility as environments change." },
    ],
    insights: ["secure-product-engineering", "incident-response-evidence"],
  },
  {
    slug: "governance-compliance", number: "02", name: "Governance & Compliance",
    description: "Build effective governance practices, manage risks, and prepare for compliance and assurance requirements.",
    headline: "Turn obligations into practical action.",
    overview: "Bring leadership, risk decisions, policies and evidence together. Prepare for assurance requirements with controls that reflect your organization's operating context.",
    practice: "grcloop", practiceName: "GRCLoop",
    practiceCopy: "GRCLoop brings governance, risk management, compliance readiness and security leadership into a continuous assurance model.",
    source: "https://www.habilesec.com/grcloop",
    services: [
      { id: "iso-readiness", name: "ISO Readiness", description: "Assess gaps, design controls and prepare evidence for applicable ISO management system requirements. Readiness support is not independent certification or accreditation.", evidence: "ISO 27001; Compliance Frameworks; AI Compliance & Regulations" },
      { id: "soc-2-readiness", name: "SOC 2 Readiness", description: "Prepare control design, audit evidence and readiness activities aligned with the Trust Services Criteria.", evidence: "SOC 2 Type II" },
      { id: "risk-management", name: "Risk Management & Audits", description: "Assess cyber and third-party risk, plan treatments and validate controls through structured internal audit support.", evidence: "Risk Assessment & Audits; TPRM" },
      { id: "vciso", name: "Virtual CISO (vCISO)", description: "Access security leadership for strategy, governance, risk oversight and executive reporting.", evidence: "vCISO" },
      { id: "regulatory-readiness", name: "PCI DSS & Regulatory Readiness", description: "Support scoping, gap assessments, policy design and evidence preparation for applicable regulatory and cardholder-data requirements.", evidence: "PCI-DSS; Compliance Frameworks" },
      { id: "ai-governance", name: "AI Governance & Compliance", description: "Establish AI policies, risk assessments and inventories, with readiness support for ISO 42001 and relevant AI frameworks.", evidence: "AI Compliance & Regulations" },
      { id: "security-awareness", name: "Security Awareness & Training", description: "Build workforce awareness through role-based learning, simulations and secure-development training.", evidence: "Training & Education; Awareness & Education" },
    ],
    challenges: ["Unclear ownership of security decisions and regulatory obligations.", "Disconnected risk registers, policies, controls and audit evidence.", "Readiness work that becomes a last-minute exercise before an audit."],
    approach: [
      { title: "Define", copy: "Establish obligations, risk appetite and the target security posture." },
      { title: "Align", copy: "Map policies, controls and improvement priorities to the gaps that matter." },
      { title: "Maintain and reassess", copy: "Operate controls, maintain evidence and review readiness as business needs and requirements evolve." },
    ],
    insights: ["continuous-assurance", "ai-governance"],
  },
  {
    slug: "data-privacy", number: "03", name: "Data Privacy",
    description: "Protect personal information, strengthen privacy governance, and prepare for evolving regulatory obligations.",
    headline: "Make privacy part of everyday decisions.",
    overview: "Understand how personal information moves through your organization. Connect data inventories, impact assessments and accountable privacy leadership with day-to-day operations.",
    practice: "grcloop", practiceName: "GRCLoop",
    practiceCopy: "GRCLoop's vDPO and privacy capabilities connect data protection leadership with assessment, governance and regulatory readiness.",
    source: "https://www.habilesec.com/grcloop",
    services: [
      { id: "privacy-assessments", name: "Privacy Assessments & DPIAs", description: "Assess privacy risks and evaluate the impact of processing activities through privacy and data protection impact assessments.", evidence: "vDPO; GDPR" },
      { id: "dpdp-gdpr-readiness", name: "DPDP & GDPR Readiness", description: "Review gaps, policies and operational responsibilities to prepare for applicable data protection obligations.", evidence: "GDPR; DPDP Act" },
      { id: "vdpo", name: "Virtual Data Protection Officer (vDPO)", description: "Bring privacy leadership to governance, impact assessments, data subject requests and regulatory engagement.", evidence: "vDPO; Triple-V advisory" },
      { id: "privacy-governance", name: "Privacy Governance", description: "Develop data protection frameworks, policies and accountabilities for ongoing privacy operations.", evidence: "vDPO: Privacy & data-protection frameworks" },
      { id: "data-mapping", name: "Data Mapping & Classification", description: "Build an inventory of personal information, map processing activities and classify data to inform controls and obligations.", evidence: "vDPO: Data inventory, mapping & personal-data classification" },
      { id: "consent-privacy-operations", name: "Consent Management & Privacy Operations", description: "Connect consent processes, processing records, data subject requests and breach advisory with privacy governance.", evidence: "vDPO: DPIA, PIA, ROPA and consent management; Triple-V advisory" },
    ],
    challenges: ["Incomplete knowledge of what personal data is held and where it moves.", "Privacy responsibilities spread across teams without clear ownership.", "New processing activities that need risk assessment and regulatory alignment."],
    approach: [
      { title: "Understand the data", copy: "Use inventories, mapping and classification to establish the context of personal-data processing." },
      { title: "Assess the impact", copy: "Connect privacy assessments and DPIAs with the risks and obligations relevant to those activities." },
      { title: "Establish ownership", copy: "Support privacy frameworks, consent operations and ongoing leadership through the vDPO capability." },
    ],
    insights: ["privacy-governance", "continuous-assurance"],
  },
  {
    slug: "digital-engineering", number: "04", name: "Digital Engineering",
    description: "Build secure, scalable digital platforms with modern engineering and development practices.",
    headline: "Build what comes next. Securely.",
    overview: "Connect product goals with architecture, delivery and secure engineering. Develop digital platforms across web, mobile, cloud and connected systems with security embedded throughout the lifecycle.",
    practice: "forgeloop", practiceName: "ForgeLoop",
    practiceCopy: "ForgeLoop is HabileSec's secure digital engineering practice, spanning product delivery, modern technologies and flexible engineering capacity.",
    source: "https://www.habilesec.com/forgeloop",
    services: [
      { id: "web-mobile", name: "Web & Mobile Development", description: "Develop web applications and native or cross-platform mobile experiences, with backend and API integration.", evidence: "Product Development; Mobile App Development; Engineering portfolio" },
      { id: "cloud-devops", name: "Cloud & DevOps Engineering", description: "Design cloud architecture and delivery pipelines with infrastructure automation, containers and orchestration.", evidence: "Cloud & DevOps" },
      { id: "secure-sdlc", name: "Secure SDLC & DevSecOps", description: "Embed threat modeling, code review, automated security gates and release checks throughout product delivery.", evidence: "Code, Compile, Craft - Repeat; DevOps acceleration" },
      { id: "ai-ml-iot", name: "AI/ML & IoT Solutions", description: "Develop and integrate AI/ML capabilities and connected-device solutions across edge, cloud and data platforms.", evidence: "AI & ML; Internet of Things (IoT)" },
      { id: "platform-engineering", name: "Custom Platform Engineering", description: "Build modular, API-first platforms and modernize existing systems around business and product needs.", evidence: "Product Development; Digital Engineering" },
      { id: "dedicated-teams", name: "Dedicated Engineering Teams", description: "Extend delivery capacity with dedicated engineers or cross-functional product pods aligned with your roadmap.", evidence: "Flexible Engagement Models: Product pods; Dedicated resources" },
    ],
    challenges: ["Product roadmaps that need engineering capacity and clear technical direction.", "Legacy platforms that need to evolve across cloud and modern integrations.", "Security checks that arrive too late in the development lifecycle."],
    approach: [
      { title: "Discover and architect", copy: "Clarify users, goals and constraints, then shape the architecture, roadmap and security guardrails." },
      { title: "Build and assure", copy: "Deliver product increments with integration, testing, code review and security checks throughout development." },
      { title: "Launch and evolve", copy: "Support production delivery, monitoring and ongoing improvements with an engagement model suited to the roadmap." },
    ],
    insights: ["secure-product-engineering", "ai-governance"],
  },
  {
    slug: "incident-response", number: "05", name: "Incident Response & Forensics",
    description: "Investigate security incidents, contain threats, and support organizations through recovery.",
    headline: "Understand the incident. Recover with clarity.",
    overview: "Establish the scope of compromise, preserve evidence and coordinate containment and recovery. Connect technical investigation with reporting and stakeholder needs.",
    practice: "hexn6", practiceName: "HexN6",
    practiceCopy: "HexN6 brings incident response and digital forensics together, from compromise assessment and containment to recovery and reporting.",
    source: "https://www.habilesec.com/hexn6",
    services: [
      { id: "incident-investigation", name: "Incident Investigation & Response", description: "Triage and scope active incidents, reconstruct attacker activity and support containment and eradication.", evidence: "Incident Response; Identify; Contain; Eradicate" },
      { id: "digital-forensics", name: "Digital Forensics", description: "Collect and analyze endpoint, server, mobile and cloud artifacts with evidence integrity and traceability in view.", evidence: "Digital Forensics; Evidence Flow" },
      { id: "ransomware-response", name: "Ransomware Response", description: "Contain ransomware incidents and plan recovery with validation and security hardening.", evidence: "Incident Response; Ransomware Recovery" },
      { id: "recovery-support", name: "Recovery Support", description: "Support restoration of clean systems, validate integrity and monitor for signs of renewed compromise.", evidence: "Ransomware Recovery; Recover" },
      { id: "compromise-assessment", name: "Compromise Assessment", description: "Determine whether systems, identities or data have been affected and establish the investigation scope.", evidence: "Compromise Assessment" },
      { id: "cloud-log-forensics", name: "Cloud & Log Forensics", description: "Investigate cloud environments, identities, SaaS platforms and audit trails to reconstruct incident activity.", evidence: "Cloud & Log Forensics" },
      { id: "malware-analysis", name: "Malware Analysis", description: "Analyze malicious code to understand its behavior, persistence and indicators of compromise.", evidence: "Malware Analysis" },
      { id: "breach-coordination", name: "Breach Notification & Regulatory Coordination", description: "Support incident reporting, notification advisory and coordination with relevant authorities and stakeholders.", evidence: "Report & coordinate; Notify. Investigate. Communicate." },
    ],
    challenges: ["Uncertainty about the scope, entry point and impact of a suspected breach.", "The need to contain threats while preserving useful evidence.", "Recovery and stakeholder reporting that must follow the investigation findings."],
    approach: [
      { title: "Identify and preserve", copy: "Scope the compromise, collect relevant artifacts and establish a forensic timeline." },
      { title: "Contain and recover", copy: "Isolate affected systems, remove persistence and support validated restoration." },
      { title: "Report and learn", copy: "Document findings, coordinate notifications and use lessons from the incident to strengthen controls." },
    ],
    insights: ["incident-response-evidence", "continuous-assurance"],
  },
];

export const categoryHref = (category: Pick<ServiceCategory, "slug">) => `/what-we-do/${category.slug}`;
export const serviceHref = (category: Pick<ServiceCategory, "slug">, service: { id: string }) => `${categoryHref(category)}#${service.id}`;

export const engagementStages = [
  { title: "Understand", copy: "Identify business needs, constraints and the challenges that matter most." },
  { title: "Assess", copy: "Evaluate the current environment and agree on priorities." },
  { title: "Act", copy: "Recommend and implement improvements appropriate to the agreed scope." },
  { title: "Evolve", copy: "Review progress and support continuous improvement and resilience." },
];
