// Industries experience — single source of truth for the landing grid and
// the 12 individual industry pages. Content follows the approved editorial
// direction: real, verifiable challenges and services only. No certification,
// contract, or specialist-capability claims are made unless explicitly
// confirmed (see inline notes on Healthcare, Manufacturing, Government and
// Energy & Utilities below).

export type IndustryChallenge = { title: string; description: string };

export type Industry = {
  slug: string;
  number: string;
  name: string;
  /** Short line shown on the landing grid card. */
  tagline: string;
  heading: string;
  intro: string;
  /** Root-relative path under /images/industries (or reused project asset), or
   *  null when no verified, genuinely relevant photograph is available — the
   *  page then uses a clean typographic treatment instead of a stock image. */
  image: { src: string; alt: string } | null;
  challenges: IndustryChallenge[];
  /** How HabileSec helps — practical capability statements, no guarantees. */
  helps: string[];
  /** Capability slugs from data/capabilities.ts, in display order. */
  services: string[];
  /** Only true where a real success-story record is tagged to this sector. */
  showSuccessStories: boolean;
};

export const industries: Industry[] = [
  {
    slug: "banking-financial-services",
    number: "01",
    name: "Banking & Financial Services",
    tagline: "Confidence in financial security and regulatory readiness.",
    heading: "Building Confidence in Financial Security.",
    intro:
      "Financial organizations must protect sensitive information, manage cyber risks, and address complex regulatory and operational requirements.",
    image: { src: "/images/industries/banking-financial.webp", alt: "Modern financial services workplace" },
    challenges: [
      { title: "Protecting Customer and Financial Data", description: "Sensitive financial records and transaction data require strong controls against unauthorized access and exposure." },
      { title: "Securing Digital Banking Applications and APIs", description: "Online and mobile banking channels expand the attack surface and need continuous testing." },
      { title: "Managing Third-Party and Regulatory Risk", description: "Vendor relationships and evolving regulations add layers of risk that require structured oversight." },
      { title: "Detecting and Responding to Security Threats", description: "Financial services are a frequent target, making timely detection and response essential." },
    ],
    helps: [
      "Assess the security posture of digital banking channels and APIs.",
      "Support governance and compliance readiness for applicable regulatory frameworks.",
      "Strengthen monitoring and incident response capabilities.",
      "Provide advisory support for third-party and vendor risk oversight.",
    ],
    services: ["security-testing", "governance-risk-compliance", "security-operations", "security-advisory"],
    showSuccessStories: false,
  },
  {
    slug: "healthcare-life-sciences",
    number: "02",
    name: "Healthcare & Life Sciences",
    tagline: "Protecting patient data and connected care systems.",
    heading: "Protecting Healthcare Data and Digital Systems.",
    intro:
      "Healthcare organizations manage highly sensitive patient information while relying on an expanding set of connected digital systems and partners.",
    image: { src: "/images/industries/healthcare-life-sciences.webp", alt: "Healthcare technology environment" },
    challenges: [
      { title: "Patient Information Confidentiality", description: "Protected health information requires careful handling across clinical and administrative systems." },
      { title: "Healthcare Application Security", description: "Patient portals, records systems and connected devices need to be assessed for exploitable weaknesses." },
      { title: "Data Privacy and Access Management", description: "Appropriate access controls help ensure only authorized personnel can reach sensitive records." },
      { title: "Operational Resilience and Third-Party Risk", description: "Dependence on external vendors and platforms introduces risk that needs active management." },
    ],
    // No HIPAA certification or healthcare-specific accreditation is claimed.
    helps: [
      "Assess security exposure across clinical and administrative applications.",
      "Support privacy governance and access-control practices.",
      "Strengthen resilience planning for care-critical systems.",
      "Provide advisory guidance on third-party and vendor risk.",
    ],
    services: ["security-testing", "governance-risk-compliance", "security-advisory", "cloud-devops"],
    showSuccessStories: false,
  },
  {
    slug: "information-technology-saas",
    number: "03",
    name: "Information Technology & SaaS",
    tagline: "Secure, scalable digital products customers can trust.",
    heading: "Building Secure and Scalable Digital Products.",
    intro:
      "Technology and SaaS companies must deliver software quickly while giving customers confidence in how their data and platforms are protected.",
    image: { src: "/images/industries/technology-saas.webp", alt: "Software engineering team at work" },
    challenges: [
      { title: "Secure Software Delivery", description: "Fast release cycles need security checks built into the development process rather than added at the end." },
      { title: "Cloud Configuration Risk", description: "Misconfigured cloud environments are a common source of exposure for SaaS platforms." },
      { title: "Application and API Vulnerabilities", description: "Customer-facing applications and APIs require regular testing to identify exploitable weaknesses." },
      { title: "Customer Security Assurance and Compliance Readiness", description: "Enterprise customers increasingly expect evidence of security and compliance maturity." },
    ],
    helps: [
      "Assess applications, APIs and cloud environments for security weaknesses.",
      "Support secure software delivery practices across the development lifecycle.",
      "Help prepare for customer security reviews and compliance readiness.",
      "Advise on cloud architecture and configuration best practices.",
    ],
    services: ["cloud-devops", "security-testing", "software-engineering", "governance-risk-compliance"],
    // The five published success stories are all tagged "Technology" in both
    // the old project's database export and its static JSON — a verified
    // match for this sector specifically, not assumed for any other.
    showSuccessStories: true,
  },
  {
    slug: "manufacturing-industrial",
    number: "04",
    name: "Manufacturing & Industrial",
    tagline: "Strengthening security across connected operations.",
    heading: "Strengthening Security Across Connected Operations.",
    intro:
      "Manufacturers increasingly connect operational technology, enterprise systems and suppliers, expanding the scope of what needs to be protected.",
    image: { src: "/images/manufacturing.webp", alt: "Modern manufacturing facility" },
    challenges: [
      { title: "Connected Infrastructure Security", description: "Linking operational and enterprise systems introduces new pathways that need to be understood and secured." },
      { title: "Supply-Chain and Third-Party Risk", description: "Suppliers and partners can introduce risk that extends beyond an organization's own environment." },
      { title: "Business Continuity", description: "Disruptions to production systems can have significant operational and financial consequences." },
      { title: "Secure Integration of Enterprise Technology", description: "Introducing new enterprise technology requires careful attention to how it connects with existing systems." },
    ],
    // No specialist OT/ICS testing capability is claimed.
    helps: [
      "Assess security exposure across connected enterprise environments.",
      "Support governance and risk management for supplier relationships.",
      "Strengthen security operations and incident readiness.",
      "Advise on secure integration of new enterprise technology.",
    ],
    services: ["security-advisory", "security-operations", "governance-risk-compliance", "security-testing"],
    showSuccessStories: false,
  },
  {
    slug: "retail-ecommerce",
    number: "05",
    name: "Retail & E-Commerce",
    tagline: "Securing every digital customer interaction.",
    heading: "Securing Every Digital Customer Interaction.",
    intro:
      "Retail and e-commerce businesses handle customer data and payment information across a growing number of digital touchpoints.",
    image: { src: "/images/industries/retail-ecommerce.webp", alt: "Digital commerce operations" },
    challenges: [
      { title: "Customer Information Protection", description: "Online stores and loyalty platforms hold personal data that needs consistent protection." },
      { title: "Payment-Related Security Risk", description: "Payment processing introduces specific obligations and exposure that need careful management." },
      { title: "E-Commerce Application Vulnerabilities", description: "Storefronts, checkout flows and integrations require regular security testing." },
      { title: "Fraud-Related Exposure and Third-Party Integrations", description: "Connected platforms and partners can introduce additional risk." },
    ],
    helps: [
      "Assess e-commerce applications and payment flows for security weaknesses.",
      "Support compliance readiness for applicable payment and data-protection requirements.",
      "Advise on cloud architecture for retail platforms.",
      "Strengthen monitoring across customer-facing systems.",
    ],
    services: ["security-testing", "governance-risk-compliance", "cloud-devops", "security-operations"],
    showSuccessStories: false,
  },
  {
    slug: "education-edtech",
    number: "06",
    name: "Education & EdTech",
    tagline: "Creating safer digital learning environments.",
    heading: "Creating Safer Digital Learning Environments.",
    intro:
      "Educational institutions and EdTech providers manage student data across a growing mix of cloud platforms and third-party tools.",
    image: null,
    challenges: [
      { title: "Student and Institutional Data Protection", description: "Academic and personal records require careful handling across administrative systems." },
      { title: "Learning Platform Security", description: "Online learning platforms and portals need to be assessed for exploitable weaknesses." },
      { title: "Cloud Access and Configuration", description: "Cloud-based learning tools need properly managed access and configuration." },
      { title: "Privacy and Third-Party Platform Risk", description: "Use of multiple third-party platforms introduces data-sharing and privacy considerations." },
    ],
    helps: [
      "Assess learning platforms and portals for security exposure.",
      "Support privacy governance across student and institutional data.",
      "Advise on secure cloud configuration for education platforms.",
      "Support secure development of learning applications.",
    ],
    services: ["security-testing", "cloud-devops", "governance-risk-compliance", "software-engineering"],
    showSuccessStories: false,
  },
  {
    slug: "government-public-sector",
    number: "07",
    name: "Government & Public Sector",
    tagline: "Strengthening trust in public digital services.",
    heading: "Strengthening Trust in Public Digital Services.",
    intro:
      "Public sector organizations manage sensitive information and citizen-facing services that depend on consistent security practices.",
    image: { src: "/images/governance.webp", alt: "Modern public-sector office environment" },
    challenges: [
      { title: "Sensitive Information Protection", description: "Government systems hold data that requires careful access control and protection." },
      { title: "Public-Facing Application Security", description: "Citizen-facing portals and services need to be tested for exploitable weaknesses." },
      { title: "Risk Governance", description: "Public organizations need structured approaches to identifying and managing risk." },
      { title: "Security Monitoring and Incident Readiness", description: "Timely detection and a clear response plan help limit the impact of security incidents." },
    ],
    // No government contracts, approvals, or empanelment are claimed.
    helps: [
      "Advise on governance structures for managing security risk.",
      "Assess public-facing applications and services for security weaknesses.",
      "Support compliance readiness for applicable frameworks.",
      "Strengthen monitoring and incident-response readiness.",
    ],
    services: ["security-advisory", "governance-risk-compliance", "security-testing", "security-operations"],
    showSuccessStories: false,
  },
  {
    slug: "telecommunications",
    number: "08",
    name: "Telecommunications",
    tagline: "Protecting critical networks and connectivity.",
    heading: "Protecting Critical Networks and Connectivity.",
    intro:
      "Telecommunications providers operate infrastructure that underpins connectivity for many other organizations, making its security a shared priority.",
    image: { src: "/images/infrastructure.webp", alt: "Network infrastructure and server racks" },
    challenges: [
      { title: "Network Infrastructure Exposure", description: "Core and edge network components need to be assessed for exploitable weaknesses." },
      { title: "Service Availability and Resilience", description: "Disruptions can have wide-reaching consequences, making resilience planning important." },
      { title: "Vulnerability Management", description: "Ongoing identification and remediation of weaknesses helps reduce exposure over time." },
      { title: "Threat Detection and Incident Response", description: "Timely detection and response help limit the impact of security incidents." },
    ],
    helps: [
      "Assess network infrastructure and supporting systems for security weaknesses.",
      "Support vulnerability management processes.",
      "Strengthen threat detection and incident-response capabilities.",
      "Advise on security priorities aligned with operational requirements.",
    ],
    services: ["security-testing", "security-operations", "security-advisory"],
    showSuccessStories: false,
  },
  {
    slug: "energy-utilities",
    number: "09",
    name: "Energy & Utilities",
    tagline: "Building resilience for essential operations.",
    heading: "Building Resilience for Essential Operations.",
    intro:
      "Energy and utility providers deliver essential services where operational continuity and risk management are closely connected.",
    image: null,
    challenges: [
      { title: "Critical System Risk", description: "Systems supporting essential operations require careful attention to security and reliability." },
      { title: "Business Continuity", description: "Disruptions to operations can have significant downstream consequences." },
      { title: "Third-Party Security", description: "Vendors and partners can introduce risk that extends beyond an organization's own environment." },
      { title: "Incident Readiness", description: "A clear, practiced response plan helps limit the impact of security incidents." },
    ],
    // No specialist industrial-control-system assessment capability is implied.
    helps: [
      "Advise on governance and risk management for essential operations.",
      "Support third-party risk assessment and oversight.",
      "Strengthen security operations and monitoring capabilities.",
      "Support incident-readiness planning.",
    ],
    services: ["security-advisory", "governance-risk-compliance", "security-operations"],
    showSuccessStories: false,
  },
  {
    slug: "logistics-transportation",
    number: "10",
    name: "Logistics & Transportation",
    tagline: "Securing connected supply chains.",
    heading: "Securing Connected Supply Chains.",
    intro:
      "Logistics and transportation organizations rely on connected systems and partners to keep goods and information moving reliably.",
    image: null,
    challenges: [
      { title: "Supply-Chain Data Protection", description: "Shipment and partner data needs to be protected as it moves across connected systems." },
      { title: "Third-Party Integration Risk", description: "Integrations with carriers, partners and platforms can introduce additional exposure." },
      { title: "Operational Availability", description: "Disruptions to tracking and logistics systems can affect day-to-day operations." },
      { title: "Application and Cloud Security", description: "Logistics platforms and the cloud environments that support them need regular assessment." },
    ],
    helps: [
      "Assess logistics applications and cloud environments for security exposure.",
      "Advise on third-party and supply-chain risk management.",
      "Support cloud architecture and configuration for logistics platforms.",
      "Strengthen monitoring across operational systems.",
    ],
    services: ["security-testing", "cloud-devops", "security-advisory", "security-operations"],
    showSuccessStories: false,
  },
  {
    slug: "professional-business-services",
    number: "11",
    name: "Professional & Business Services",
    tagline: "Protecting client trust and confidentiality.",
    heading: "Protecting Client Trust and Confidentiality.",
    intro:
      "Professional services firms are trusted with confidential client information and must demonstrate strong governance to maintain that trust.",
    image: { src: "/images/industries/professional-services.webp", alt: "Professional consulting workplace" },
    challenges: [
      { title: "Confidential Client Information", description: "Client data and work product require consistent protection across systems and teams." },
      { title: "Access Governance", description: "Clear policies for who can access what information help reduce unnecessary exposure." },
      { title: "Regulatory and Contractual Requirements", description: "Client contracts and applicable regulations often set specific security expectations." },
      { title: "Vendor Security and Compliance Readiness", description: "Supporting vendors and platforms need to be assessed as part of overall risk management." },
    ],
    helps: [
      "Support governance structures and access-control policies.",
      "Advise on security priorities aligned with client and regulatory expectations.",
      "Assess applications and platforms for security weaknesses.",
      "Support compliance readiness for applicable requirements.",
    ],
    services: ["governance-risk-compliance", "security-advisory", "security-testing", "cloud-devops"],
    showSuccessStories: false,
  },
  {
    slug: "media-digital-platforms",
    number: "12",
    name: "Media & Digital Platforms",
    tagline: "Securing content, platforms and digital experiences.",
    heading: "Securing Content, Platforms and Digital Experiences.",
    intro:
      "Media and digital platform providers manage user data and content delivery across applications that need to remain secure at scale.",
    image: null,
    challenges: [
      { title: "Web and API Security", description: "Platforms and the APIs behind them require regular testing for exploitable weaknesses." },
      { title: "User Information Protection", description: "Audience and subscriber data needs careful handling and access control." },
      { title: "Secure Platform Development", description: "New features and platforms need security considered throughout development." },
      { title: "Cloud Infrastructure Exposure", description: "Cloud environments supporting media platforms need to be properly configured and monitored." },
    ],
    helps: [
      "Assess platforms, applications and APIs for security weaknesses.",
      "Support secure development practices for new platform features.",
      "Advise on cloud configuration and infrastructure security.",
      "Strengthen monitoring across digital platforms.",
    ],
    services: ["security-testing", "software-engineering", "cloud-devops", "security-operations"],
    showSuccessStories: false,
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
