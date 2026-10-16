import type {
  CaseStudy,
  Industry,
  Insight,
  LinkItem,
  Service,
} from "@/types/site";

export const company = {
  name: "HabileSec India Pvt Ltd",
  founded: "2020",
  email: "enquiry@habilesec.com",
  phone: "+91 435-357-5243",
  address:
    "46/10 Sankar Iyer Garden, Doctor Moorthy Road, Kumbakonam, India 612001",
  locations: [
    "Bangalore Engineering",
    "Ahmedabad Advisory",
    "Bhilwara Delivery",
    "Hyderabad Operations",
    "Canada North America",
    "USA North America",
    "Hong Kong APAC",
    "Dubai Middle East",
  ],
  mission:
    "To empower organizations with cybersecurity governance and secure engineering, enabling confident innovation while maintaining strong protection against evolving threats.",
  vision:
    "To be the most trusted cybersecurity and digital-engineering partner for enterprises globally, setting the standard for integrated security and innovation.",
};

export const standards = [
  "ISO 27001",
  "ISO 27701",
  "ISO 42001",
  "SOC 2",
  "GDPR",
  "DPDPA",
];

export const navItems: LinkItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    slug: "grcloop",
    eyebrow: "Governance, Risk & Compliance",
    title: "GRCLoop",
    shortTitle: "Govern, assure and comply",
    href: "/services/grcloop",
    summary:
      "Strategic cyber governance, privacy leadership, regulatory readiness, security assurance, SOC operations and workforce awareness in one continuous model.",
    bullets: [
      "ISO 27001, SOC 2, GDPR, DPDP and PCI DSS",
      "vCISO, vDPO and GRC advisory",
      "Security testing, SOC and threat monitoring",
    ],
    loop: ["Define", "Align", "Comply", "Repeat"],
    image: "/images/governance.webp",
  },
  {
    slug: "forgeloop",
    eyebrow: "Secure Digital Engineering",
    title: "ForgeLoop",
    shortTitle: "Design, build and secure",
    href: "/services/forgeloop",
    summary:
      "Full-spectrum digital engineering across web, mobile, IoT, AI, cloud and dedicated teams built with security, scalability and resilience from day one.",
    bullets: [
      "Custom web, mobile and platform engineering",
      "Cloud, DevOps, AI/ML and IoT solutions",
      "Healthcare, financial services, marketplaces and analytics",
    ],
    loop: ["Code", "Compile", "Craft", "Repeat"],
    image: "/images/engineering.webp",
  },
  {
    slug: "hexn6",
    eyebrow: "Digital Forensics & Incident Response",
    title: "HexN6",
    shortTitle: "Prepare, respond and recover",
    href: "/services/hexn6",
    summary:
      "Senior responders help contain breaches, uncover root causes and restore trust through forensically sound incident response.",
    bullets: [
      "Incident response and ransomware recovery",
      "Digital forensics, cloud/log forensics and malware analysis",
      "Regulatory notification and authority coordination",
    ],
    loop: ["Prepare", "Identify", "Contain", "Recover"],
    image: "/images/infrastructure.webp",
  },
];

export const product = {
  title: "Certanika Lite",
  href: "/products/certanika-lite",
  summary:
    "An ISO 27001 readiness product that brings policies, controls, risks, Statement of Applicability and audit-ready evidence into a guided workspace.",
  features: [
    "Guided gap assessment",
    "Statement of Applicability",
    "Policy and control library",
    "Risk treatment",
    "Evidence tracker",
    "Audit readiness",
  ],
};

// Product catalogue. Copy for Certanika and Tanikkai is taken from those products' own sites/apps; confirm wording before launch.
export const products = [
  {
    slug: "certanika-lite",
    title: product.title,
    eyebrow: "ISO 27001 readiness",
    summary: product.summary,
    href: product.href,
  },
  {
    slug: "certanika",
    title: "Certanika",
    eyebrow: "Certification and assessment",
    summary:
      "ISO 27001, 27701, 22301, 20000-1 and 42001 certification, plus SOC 2, GDPR, HIPAA and PCI DSS assessments.",
    href: "/products/certanika",
    // TODO: confirm with the Certanika team that linking out to the live site is wanted here.
    externalUrl: "https://certanika.com",
    highlights: [
      "ISO 27001, 27701, 22301, 20000-1 and 42001 certification",
      "SOC 2, GDPR, HIPAA and PCI DSS assessments",
      "Training and a knowledge hub",
      "Certificate verification",
    ],
  },
  {
    slug: "tanikkai",
    title: "Tanikkai",
    eyebrow: "Compliance and privacy automation",
    summary:
      "AI automation for compliance and privacy management, bringing multiple regulatory requirements into one platform.",
    href: "/products/tanikkai",
    highlights: [
      "AI-driven compliance automation",
      "Privacy management",
      "Third-party risk management (TPRM)",
      "Multiple regulatory requirements in one platform",
    ],
  },
] as const;

export const industries: Industry[] = [
  {
    slug: "government",
    name: "Government",
    challenge:
      "Securing digital governance and citizen services while modernising legacy systems.",
    risk: [
      "Legacy systems and modernization pressure",
      "Complex regulatory and compliance requirements",
    ],
    helps: [
      "Secure cloud and digital transformation strategies",
      "Alignment with CERT-In, ISO 27001 and government standards",
    ],
    image: "/images/home-hero-poster.webp",
  },
  {
    slug: "bfsi",
    name: "BFSI",
    challenge:
      "Maintaining trust, resilience and audit readiness across high-volume financial environments.",
    risk: [
      "Regulatory pressure and third-party dependency",
      "Identity, transaction and data exposure risks",
    ],
    helps: [
      "Control design, SOC 2, ISO 27001 and PCI DSS readiness",
      "Security operations, testing and risk governance",
    ],
    image: "/images/governance.webp",
  },
  {
    slug: "technology",
    name: "Technology",
    challenge:
      "Building products quickly without weakening security, privacy or assurance.",
    risk: [
      "Fast release cycles and cloud attack surface",
      "Customer assurance and enterprise procurement scrutiny",
    ],
    helps: [
      "Secure SDLC, cloud assurance and product engineering",
      "SOC 2, ISO 27001 and privacy readiness",
    ],
    image: "/images/infrastructure.webp",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    challenge:
      "Protecting operational continuity across connected plants, suppliers and industrial systems.",
    risk: [
      "IoT, supply-chain and infrastructure exposure",
      "Operational disruption and ransomware impact",
    ],
    helps: [
      "Security assessments, hardening and TPRM",
      "Incident response readiness and recovery planning",
    ],
    image: "/images/manufacturing.webp",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    challenge:
      "Protecting sensitive data and care delivery systems while meeting privacy obligations.",
    risk: [
      "Sensitive personal and health data",
      "Availability risk across clinical and digital platforms",
    ],
    helps: [
      "Privacy governance, secure engineering and testing",
      "Security monitoring and incident response planning",
    ],
    image: "/images/healthcare.webp",
  },
  {
    slug: "retail",
    name: "Retail",
    challenge:
      "Securing customer data, payments and digital commerce at scale.",
    risk: [
      "Payment exposure and seasonal traffic spikes",
      "Vendor ecosystem and customer trust risk",
    ],
    helps: [
      "PCI DSS readiness, application testing and cloud hardening",
      "Continuous monitoring and vendor risk management",
    ],
    image: "/images/retail.webp",
  },
];

export const outcomes = [
  "Protect critical systems",
  "Meet regulatory obligations",
  "Build secure digital products",
  "Respond to cyber incidents",
  "Strengthen governance",
  "Maintain continuous assurance",
];

export const caseStudies: CaseStudy[] = [
  {
    client: "IPCS Workfinity",
    sector: "Digital service platforms",
    title: "SOC 2 readiness for enterprise service platforms",
    challenge:
      "Legacy practices, limited audit logging and decentralised controls made consistent control execution difficult to demonstrate.",
    approach:
      "HabileSec developed a customised SOC 2 control architecture tied to workflows such as access provisioning, change management and incident handling.",
    outcome:
      "The public story states that IPCS maintains documented, traceable control execution with less operational friction and stronger enterprise confidence.",
  },
  {
    client: "BUSoftTech",
    sector: "Product and digital transformation",
    title: "Integrated compliance at scale",
    challenge:
      "Three concurrent frameworks, ISO 27001, SOC 2 Type 2 and ISO 9001, created documentation overlap and inconsistent readiness.",
    approach:
      "HabileSec built a unified control architecture with an ISO-to-SOC crosswalk and continuous assurance workflows.",
    outcome:
      "The public story states that BUSoftTech gained a scalable foundation for future standards and more efficient audit cycles.",
  },
  {
    client: "ISIX.AI",
    sector: "AI and data analytics",
    title: "ISO-aligned governance for AI innovation",
    challenge:
      "The company needed stronger governance for sensitive datasets and proprietary algorithms without slowing research.",
    approach:
      "HabileSec defined security boundaries across experimentation, development and production with lightweight controls.",
    outcome:
      "The public story states that security accountability, data and IP protection, and governance maturity improved as the company progresses toward certification.",
  },
];

export const insights: Insight[] = [
  {
    title: "How continuous assurance changes ISO 27001 readiness",
    type: "Perspective",
    category: "GRC",
    date: "2026-10-07",
    readTime: "6 min read",
    summary:
      "A practical view of treating certification as an operating model instead of a one-time project.",
  },
  {
    title: "Security built into product engineering",
    type: "Article",
    category: "Secure Engineering",
    date: "2026-10-07",
    readTime: "5 min read",
    summary:
      "How secure architecture, code review and release gates reduce risk without slowing delivery.",
  },
  {
    title: "Incident response evidence that stands up to scrutiny",
    type: "Guide",
    category: "Incident Response",
    date: "2026-10-07",
    readTime: "7 min read",
    summary:
      "The evidence workflow behind defensible investigations, reporting and regulatory coordination.",
  },
  {
    title: "AI governance and ISO 42001 readiness",
    type: "Report",
    category: "AI Governance",
    date: "2026-10-07",
    readTime: "8 min read",
    summary:
      "A frontend placeholder for future research content on responsible AI controls and evidence.",
  },
];

export const metrics = [
  { value: company.founded, label: "Founded" },
  { value: "6", label: "Published industry sectors" },
  { value: "6", label: "Referenced standards and frameworks" },
];
