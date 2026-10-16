// Company facts are drawn from the public HabileSec pages; images outside the founder profiles are editorial photography.
export const leaders = [
  {
    name: "Kalaivani Srinivasan",
    role: "Founder & MD",
    image: "/images/kalaivani.jpg",
    bio: "HabileSec's founder brings mathematical rigor and strategic innovation to the architecture of secure, intelligent products.",
  },
  {
    name: "Srinivasan Mahalingam",
    role: "CEO & CISO",
    image: "/images/srinivasan.jpg",
    bio: "A former CISO and DPO with two decades of experience in enterprise security, compliance and data protection for Fortune 500 organisations.",
  },
];
export const practiceDetails = {
  grcloop: {
    title: "Governance, risk & compliance. Built for continuous assurance.",
    introduction:
      "Bring security leadership, privacy, risk management and compliance into a continuous operating model aligned with your business.",
    method: "Define. Align. Comply. Repeat.",
    groups: [
      {
        id: "governance",
        title: "Leadership & governance",
        copy: "Executive expertise for cyber strategy, board reporting, risk oversight and security maturity.",
        items: [
          "vCISO",
          "vDPO",
          "vAdvisory",
          "Governance structures & policy",
          "Board & executive reporting",
        ],
      },
      {
        id: "risk",
        title: "Risk & third-party assurance",
        copy: "Identify, assess and manage the cyber, privacy and supplier risks that affect business resilience.",
        items: [
          "Cyber risk assessment",
          "Third-party risk management (TPRM)",
          "Vendor governance",
          "Risk treatment planning",
        ],
      },
      {
        id: "compliance",
        title: "Privacy & compliance",
        copy: "Build practical programmes for audit readiness, evidence management and evolving regulatory obligations.",
        items: [
          "ISO 27001 & ISO 27701",
          "SOC 2 Type II",
          "GDPR & DPDP Act",
          "PCI DSS",
          "ISO 42001",
          "Privacy impact assessments",
        ],
      },
      {
        id: "assurance",
        title: "Security assurance",
        copy: "Test the effectiveness of controls across applications, APIs, infrastructure and cloud environments.",
        items: [
          "Security assessments",
          "Application & API testing",
          "Cloud & infrastructure testing",
          "Security hardening",
          "Risk assessments & audits",
        ],
      },
      {
        id: "operations",
        title: "Operations & awareness",
        copy: "Connect threat monitoring, security engineering and workforce awareness to continuous assurance.",
        items: [
          "Next-generation SOC",
          "Threat monitoring",
          "Security operations",
          "Security awareness",
          "Secure development training",
        ],
      },
    ],
    lifecycle: [
      {
        title: "Define",
        copy: "Establish obligations, risk appetite and target security posture.",
      },
      {
        title: "Align",
        copy: "Map controls, policies and programmes to the gaps that matter.",
      },
      {
        title: "Comply",
        copy: "Operate controls and maintain evidence against applicable standards.",
      },
      {
        title: "Repeat",
        copy: "Reassess as business priorities, regulations and threats evolve.",
      },
    ],
  },
  forgeloop: {
    title: "Secure digital engineering. From concept to scale.",
    introduction:
      "Design, build and scale digital products with security embedded throughout the engineering lifecycle.",
    method: "Code. Compile. Craft. Repeat.",
    groups: [
      {
        id: "product",
        title: "Digital product engineering",
        copy: "Full-cycle product delivery, from discovery and architecture to launch and ongoing evolution.",
        items: [
          "Product strategy & UX/UI",
          "Web & platform development",
          "API-first architecture",
          "Quality assurance",
          "Legacy modernisation",
        ],
      },
      {
        id: "mobile",
        title: "Web, mobile & connected systems",
        copy: "Build customer experiences and connected platforms across devices, edge and cloud.",
        items: [
          "Native Android & iOS",
          "Cross-platform development",
          "Web application engineering",
          "IoT solutions",
          "Edge & cloud architecture",
        ],
      },
      {
        id: "intelligence",
        title: "AI, ML & data",
        copy: "Turn data into product capabilities with model governance, privacy and secure deployment.",
        items: [
          "Custom AI/ML development",
          "Intelligent automation",
          "AI-powered features",
          "Data analytics",
          "Model governance",
        ],
      },
      {
        id: "cloud",
        title: "Cloud & DevOps",
        copy: "Create resilient foundations for reliable infrastructure and continuous product delivery.",
        items: [
          "Cloud architecture & migration",
          "CI/CD pipelines",
          "Infrastructure automation",
          "Containers & orchestration",
          "DevSecOps",
          "Monitoring & optimisation",
        ],
      },
      {
        id: "teams",
        title: "Teams around your roadmap",
        copy: "Flexible engagement models support specialised work, dedicated capacity and ongoing product development.",
        items: [
          "Product pods",
          "Dedicated engineers",
          "DevOps acceleration",
          "Ongoing product evolution",
        ],
      },
    ],
    lifecycle: [
      {
        title: "Discover",
        copy: "Clarify goals, users, constraints and the delivery roadmap.",
      },
      {
        title: "Architect",
        copy: "Set modular foundations and security guardrails.",
      },
      {
        title: "Build",
        copy: "Deliver iterative increments across products and integrations.",
      },
      {
        title: "Assure",
        copy: "Validate security, quality, performance and privacy.",
      },
      {
        title: "Evolve",
        copy: "Launch with monitoring, support and continuous improvement.",
      },
    ],
  },
  hexn6: {
    title: "Contain faster. Investigate deeper. Recover stronger.",
    introduction:
      "Expert-led incident response and digital forensics to establish the scope of compromise and restore operational confidence.",
    method: "From incident to resilience.",
    groups: [
      {
        id: "assessment",
        title: "Establish the scope",
        copy: "Determine whether systems, identities or data have been compromised, then uncover the timeline of attacker activity.",
        items: [
          "Compromise assessment",
          "Threat hunting",
          "Cloud & log forensics",
          "Digital forensics",
        ],
      },
      {
        id: "response",
        title: "Contain & recover",
        copy: "Manage active incidents with evidence preservation, safe recovery planning and security hardening.",
        items: [
          "Incident response",
          "Ransomware recovery",
          "Malware analysis",
          "Containment & eradication",
        ],
      },
      {
        id: "evidence",
        title: "Evidence & accountability",
        copy: "Maintain integrity and traceability from acquisition through technical reporting and stakeholder coordination.",
        items: [
          "Litigation & e-discovery",
          "Forensic acquisition",
          "Chain of custody",
          "Root-cause investigation",
          "Regulatory notification support",
          "Authority coordination",
        ],
      },
    ],
    lifecycle: [
      {
        title: "Prepare",
        copy: "Readiness reviews, playbooks, retainers and tabletop exercises.",
      },
      {
        title: "Identify",
        copy: "Triage alerts, scope compromise and establish forensic timelines.",
      },
      {
        title: "Contain",
        copy: "Isolate affected systems while preserving evidence.",
      },
      {
        title: "Eradicate",
        copy: "Remove malicious persistence and close exploited entry points.",
      },
      {
        title: "Recover",
        copy: "Restore clean systems, validate integrity and monitor.",
      },
      {
        title: "Learn & report",
        copy: "Document root causes, coordinate notifications and strengthen controls.",
      },
    ],
  },
};

// First-edition editorial copy, based on the published practice descriptions rather than a claim of previously published research.
export const articles = [
  {
    slug: "continuous-assurance",
    title: "Compliance is a continuous practice.",
    category: "GRC",
    readTime: "4 min read",
    image: "/images/governance.webp",
    summary:
      "Connect governance, control execution and evidence to the way your organisation operates.",
    sections: [
      {
        title: "Start with the operating model",
        copy: "Governance, risk and compliance work best when they inform everyday decisions. Clearly defined obligations, accountable owners and practical controls help teams understand what security means for their work.",
      },
      {
        title: "Make evidence part of the workflow",
        copy: "Access reviews, change management and incident handling all create evidence. Linking that evidence to control objectives supports audit readiness without relying on a last-minute documentation exercise.",
      },
      {
        title: "Keep the loop moving",
        copy: "Business priorities, threats and regulations change. The GRCLoop approach brings definition, alignment, compliance and reassessment into a repeatable process.",
      },
    ],
  },
  {
    slug: "secure-product-engineering",
    title: "Build security into the next release.",
    category: "Secure Engineering",
    readTime: "3 min read",
    image: "/images/engineering.webp",
    summary:
      "Secure architecture, delivery gates and feedback belong throughout the product lifecycle.",
    sections: [
      {
        title: "Architecture sets the direction",
        copy: "Security begins with understanding users, data, integrations and risk. Modular architecture and clear boundaries make it easier to build, test and evolve digital products.",
      },
      {
        title: "Bring assurance into delivery",
        copy: "Threat modelling, code review, automated checks and release testing create opportunities to identify problems while changes are still manageable.",
      },
      {
        title: "Learn from production",
        copy: "Monitoring, support and ongoing hardening inform the next iteration. ForgeLoop connects these activities across web, mobile, cloud, AI and connected systems.",
      },
    ],
  },
  {
    slug: "incident-response-evidence",
    title: "In an incident, clarity comes first.",
    category: "Incident Response",
    readTime: "3 min read",
    image: "/images/infrastructure.webp",
    summary:
      "Defensible evidence connects containment, investigation and recovery.",
    sections: [
      {
        title: "Establish what happened",
        copy: "An effective response starts with scope: affected systems, identities, data and the timeline of attacker activity. Compromise assessment and forensic investigation help teams make informed containment decisions.",
      },
      {
        title: "Preserve the evidence",
        copy: "Collection, chain of custody and traceable analysis support an investigation from its initial stages through technical reporting and stakeholder coordination.",
      },
      {
        title: "Recover with confidence",
        copy: "Recovery includes validating clean systems, monitoring for recurring activity and documenting root causes. HexN6 connects that learning to governance and security operations.",
      },
    ],
  },
  {
    slug: "privacy-governance",
    title: "Privacy needs an operating owner.",
    category: "Privacy",
    readTime: "3 min read",
    image: "/images/home-hero-poster.webp",
    summary: "Connect data mapping, impact assessments and privacy leadership.",
    sections: [
      {
        title: "Understand the data",
        copy: "A privacy programme begins with visibility into personal data: where it is collected, how it moves, who can access it and how it is retained.",
      },
      {
        title: "Assign accountability",
        copy: "Privacy leadership connects policies, impact assessments and operational processes. HabileSec's vDPO practice supports data mapping, governance and regulatory engagement.",
      },
      {
        title: "Maintain readiness",
        copy: "Changes to products, suppliers and processing activities need to feed back into privacy reviews. Continuous governance keeps these decisions connected.",
      },
    ],
  },
  {
    slug: "ai-governance",
    title: "Responsible AI starts with governance.",
    category: "AI Governance",
    readTime: "3 min read",
    image: "/images/engineering.webp",
    summary: "Align AI management, risk and evidence as systems evolve.",
    sections: [
      {
        title: "Set clear boundaries",
        copy: "AI development introduces decisions about datasets, models and deployment environments. Governance makes ownership, intended use and risk visible.",
      },
      {
        title: "Connect security and management",
        copy: "Security and privacy controls should remain connected to model development and production operation. HabileSec supports ISO 42001 readiness alongside secure AI/ML engineering.",
      },
      {
        title: "Review as the system changes",
        copy: "Datasets, model behaviour and integrations evolve. Regular review helps teams maintain accountability as AI capabilities grow.",
      },
    ],
  },
];
