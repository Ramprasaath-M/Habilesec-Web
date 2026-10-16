// Business facts: read-only reference src/lib/content.js and the live HabileSec site.
// Deliberately excludes unconfirmed statistics, testimonials and certifications.
export const platformProducts = [
  {
    slug: "certanika-lite",
    name: "Certanika Lite",
    category: "ISO 27001 readiness",
    summary:
      "Bring policies, controls, risks and audit-ready evidence into one guided workspace.",
    intro:
      "A practical route from understanding ISO 27001 requirements to organizing the work and evidence behind readiness.",
    features: [
      "Guided gap assessment",
      "Statement of Applicability",
      "Policy and control library",
      "Risk treatment planning",
      "Evidence and audit readiness",
    ],
    external: "https://habilesec.com/Certanika-Lite",
  },
  {
    slug: "tanikkai",
    name: "Tanikkai",
    category: "Governance, risk & compliance",
    summary:
      "Connect compliance and privacy management with AI-assisted insights and automation.",
    intro:
      "A unified platform for governance, risk and compliance management, helping teams connect regulatory requirements with their work.",
    features: [
      "Compliance management",
      "Privacy management",
      "Third-party risk management",
      "AI-assisted insights and automation",
    ],
    external: "https://www.tanikkai.com",
  },
];
export const industryMedia: Record<string, string> = {
  government: "/media/government.webp",
  bfsi: "/media/business-advisory.webp",
  technology: "/media/secure-engineering.webp",
  manufacturing: "/media/manufacturing.webp",
  healthcare: "/media/healthcare.webp",
  retail: "/media/retail.webp",
};
export const serviceMedia: Record<string, string> = {
  cybersecurity: "/media/secure-engineering.webp",
  "governance-compliance": "/media/business-advisory.webp",
  "data-privacy": "/media/business-advisory.webp",
  "digital-engineering": "/media/secure-engineering.webp",
  "incident-response": "/media/secure-engineering.webp",
};
export const challengeEntries = [
  {
    title: "Strengthen our security",
    copy: "Understand exposure across your applications, infrastructure and cloud.",
    href: "/what-we-do/cybersecurity",
    detail:
      "Security assessments, application testing and practical remediation priorities.",
  },
  {
    title: "Prepare for compliance",
    copy: "Connect regulatory requirements with controls, owners and evidence.",
    href: "/what-we-do/governance-compliance",
    detail: "ISO and SOC 2 readiness, risk management and governance advisory.",
  },
  {
    title: "Build a digital product",
    copy: "Move from an idea to a secure, scalable product or platform.",
    href: "/what-we-do/digital-engineering",
    detail:
      "Web, mobile, cloud and AI engineering with security throughout delivery.",
  },
  {
    title: "Respond to an incident",
    copy: "Establish what happened, contain the threat and plan recovery.",
    href: "/what-we-do/incident-response",
    detail:
      "Incident response, digital forensics and recovery support through HexN6.",
  },
];
export const differentiators = [
  {
    title: "Connected expertise",
    copy: "Governance, cybersecurity and digital engineering work together across GRCLoop, ForgeLoop and HexN6.",
  },
  {
    title: "Leadership when you need it",
    copy: "Virtual CISO, DPO and advisory services connect technical decisions with business responsibilities.",
  },
  {
    title: "Support through delivery",
    copy: "From assessments and readiness to product engineering and incident response, practical work follows the advice.",
  },
];

export const industryAlt: Record<string, string> = {
  government: "The Houses of Parliament in London",
  bfsi: "Professionals discussing business priorities",
  technology: "A software engineering team at work",
  manufacturing: "Automated production equipment in a factory",
  healthcare: "A healthcare professional holding a tablet",
  retail: "A shopping cart beside a laptop",
};
