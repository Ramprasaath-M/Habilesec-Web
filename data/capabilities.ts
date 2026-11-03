// Source of truth for the What We Do menu: seven approved capability areas, in order.
// Descriptions define each discipline in general terms; they make no claims
// about certifications, partners, clients or metrics.

export type Capability = {
  slug: string;
  number: string;
  name: string;
  /** Two-line description used in the menu preview and page introduction */
  summary: string;
  /** Existing practice page the area is delivered through, when the site's own content supports it */
  practice?: "grcloop" | "forgeloop" | "hexn6";
  /** Sub-services shown in the menu, taken from services already described in the site's own content */
  services: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "cloud-devops",
    number: "01",
    name: "Cloud & DevOps",
    summary:
      "Cloud architecture, delivery pipelines and infrastructure automation, designed with security and reliability in mind.",
    practice: "forgeloop",
    services: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud (GCP)",
      "DevOps",
      "DevSecOps",
      "Cloud Security",
    ],
  },
  {
    slug: "security-testing",
    number: "02",
    name: "Security Testing",
    summary:
      "Testing of applications, infrastructure and cloud environments to find weaknesses and prioritize remediation.",
    practice: "grcloop",
    services: [
      "Web Application VAPT",
      "Mobile Application VAPT",
      "API Security Testing",
      "Network VAPT",
      "Cloud Security Testing",
      "Source Code Review",
    ],
  },
  {
    slug: "governance-risk-compliance",
    number: "03",
    name: "Governance, Risk & Compliance",
    summary:
      "Governance structures, risk management and compliance readiness aligned to your business and regulatory obligations.",
    practice: "grcloop",
    services: [
      "ISO 27001",
      "ISO 27701",
      "ISO 42001",
      "SOC 1 & SOC 2",
      "PCI DSS",
      "GDPR & DPDP",
    ],
  },
  {
    slug: "software-engineering",
    number: "04",
    name: "Software Engineering",
    summary:
      "Secure web, mobile and platform engineering, from product idea through delivery and ongoing evolution.",
    practice: "forgeloop",
    services: [
      "Web Application Development",
      "Mobile Application Development",
      "Custom Software Development",
      "Enterprise Application Development",
    ],
  },
  {
    slug: "ai-iot-blockchain",
    number: "05",
    name: "AI, IoT & Blockchain",
    summary:
      "Engineering and advisory for emerging technologies, with security and governance considered from the start.",
    practice: "forgeloop",
    services: [
      "Artificial Intelligence & ML",
      "Internet of Things (IoT)",
      "Blockchain Development",
      "AI-Powered Solutions",
    ],
  },
  {
    slug: "security-operations",
    number: "06",
    name: "Security Operations",
    summary:
      "Monitoring, detection and response processes that keep security visible and actionable day to day.",
    practice: "grcloop",
    services: [
      "SOC Monitoring",
      "SIEM & SOAR",
      "Threat Hunting",
      "Incident Response",
      "Digital Forensics",
    ],
  },
  {
    slug: "security-advisory",
    number: "07",
    name: "Security Advisory",
    summary:
      "Experienced guidance that connects security decisions to business priorities, risk and accountability.",
    practice: "grcloop",
    services: [
      "vCISO & vDPO",
      "Risk Assessment",
      "Third-Party Risk Management",
      "Security Architecture",
      "Security Hardening",
    ],
  },
];
