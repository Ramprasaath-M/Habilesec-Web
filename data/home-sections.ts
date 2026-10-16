// Homepage content below the hero. Single source of truth so copy can be updated without touching components.
// Routes: only existing routes are used. Where a dedicated destination does not exist yet, the nearest route is used and marked TODO.

export const trust = {
  figure: 85,
  suffix: "+",
  label: "Organizations Globally",
  note: "Supporting organizations across cybersecurity, governance, compliance, data privacy, and technology services.",
  indicators: [
    { title: "Cybersecurity", copy: "Identify and address security risks", href: "/what-we-do/cybersecurity" },
    { title: "Compliance", copy: "Navigate standards and requirements", href: "/what-we-do/governance-compliance" },
    { title: "Data Privacy", copy: "Protect information and build trust", href: "/what-we-do/data-privacy" },
    { title: "Technology", copy: "Build and modernize digital environments", href: "/what-we-do/digital-engineering" },
  ],
};

export const challenges = {
  eyebrow: "Understanding your challenges",
  headingLines: ["Evolving risks.", "Expanding expectations.", "Real-world solutions."],
  copy: "Technology, regulation, and stakeholder expectations are changing how organizations operate. We help you stay ahead.",
  cta: { label: "Explore the challenges", href: "/what-we-do" },
  // Photos: Pexels (Pexels License, free for commercial use, attribution not required), stored locally in /public/images/challenges.
  //  cybersecurity: Zayed Hossain, https://www.pexels.com/photo/developer-working-on-code-in-a-modern-office-36706460/
  //  governance-compliance: Vitaly Gariev, https://www.pexels.com/photo/business-meeting-with-contract-review-in-office-36733329/
  //  data-privacy: olia danilevich, https://www.pexels.com/photo/a-woman-working-at-the-office-6326003/
  //  business-resilience: Tima Miroshnichenko, https://www.pexels.com/photo/man-sitting-on-an-office-chair-looking-at-the-woman-writing-on-a-white-board-5439484/
  // Each page labels the photo "Free" and links the Pexels license; the license terms themselves were not read in full.
  slides: [
    {
      title: "Cybersecurity",
      copy: "Address emerging and evolving threats with practical, business-focused security solutions.",
      image: "/images/challenges/cybersecurity.webp",
      alt: "A software developer working at dual monitors in a bright modern office",
      position: "35% 50%",
    },
    {
      title: "Governance & Compliance",
      copy: "Navigate regulatory requirements and demonstrate accountability with clear, practical governance.",
      image: "/images/challenges/governance-compliance.webp",
      alt: "A business professional reviewing a contract with a colleague in a glass-walled office",
      position: "80% 50%",
    },
    {
      title: "Data Privacy",
      copy: "Protect sensitive information, strengthen data governance, and build lasting trust.",
      image: "/images/challenges/data-privacy.webp",
      alt: "A woman working focused at a laptop in a bright, minimalist office",
      position: "62% 50%",
    },
    {
      title: "Business Resilience",
      copy: "Prepare for disruption, maintain critical operations, and build long-term resilience.",
      image: "/images/challenges/business-resilience.webp",
      alt: "A team planning on a whiteboard during a strategy session in a modern office",
      position: "58% 50%",
    },
  ],
};

export const servicesSection = {
  eyebrow: "What we do",
  title: "The expertise you need to protect, comply, and grow.",
  copy: "Six connected capabilities, delivered by one team that understands how security, compliance, and technology fit together.",
  items: [
    {
      title: "Cybersecurity Services",
      copy: "Protect digital environments, identify security weaknesses, and strengthen organizational resilience.",
      list: ["Vulnerability Assessment & Penetration Testing", "Cloud Security", "Security Assessments & Audits", "Security Hardening"],
      href: "/what-we-do/cybersecurity",
      image: "/images/services/cybersecurity.webp",
      alt: "A security analyst reviewing code and system activity on a monitor",
      summary: "Identify, prevent, and respond to evolving threats with end-to-end security solutions.",
      icon: "shield",
      position: "60% 45%",
    },
    {
      title: "Governance, Risk & Compliance",
      copy: "Build effective governance practices, manage risks, and prepare for compliance and assurance requirements.",
      list: ["ISO & SOC 2 Readiness", "Risk Management & Audits", "Virtual CISO (vCISO)", "AI Governance & Compliance"],
      href: "/what-we-do/governance-compliance",
      image: "/images/services/governance-risk-compliance.webp",
      alt: "Colleagues reviewing documents together in a conference room",
      summary: "Manage organizational risks, meet regulatory requirements, and strengthen governance.",
      icon: "file",
      position: "40% 50%",
    },
    {
      title: "Data Privacy & Protection",
      copy: "Protect personal information, strengthen privacy governance, and prepare for evolving regulatory obligations.",
      list: ["Privacy Assessments & DPIAs", "DPDP & GDPR Readiness", "Virtual Data Protection Officer (vDPO)"],
      href: "/what-we-do/data-privacy",
      image: "/images/services/data-privacy.webp",
      alt: "A professional with a tablet in front of secured server racks in a data center",
      summary: "Protect sensitive information and establish responsible data protection practices.",
      icon: "lock",
      position: "65% 50%",
    },
    {
      title: "Managed Security Services",
      copy: "Connect monitoring, detection, and investigation across cloud and hybrid environments.",
      list: ["Security Monitoring & SOC", "Security Hardening", "Cloud Security"],
      // TODO: point to a dedicated Managed Security page if one is created.
      href: "/what-we-do/cybersecurity#security-monitoring",
      image: "/images/services/managed-security.webp",
      alt: "Analysts working at monitoring stations in a large operations room",
      summary: "Continuously monitor, detect, and respond to threats across enterprise environments.",
      icon: "gear",
      position: "50% 55%",
    },
    {
      title: "Digital Engineering",
      copy: "Build secure, scalable digital platforms with modern engineering and development practices.",
      list: ["Web & Mobile Development", "Cloud & DevOps Engineering", "Secure SDLC & DevSecOps", "AI/ML & IoT Solutions"],
      href: "/what-we-do/digital-engineering",
      image: "/images/services/digital-engineering.webp",
      alt: "A software engineering team working together on code in a bright office",
      summary: "Design, build, and modernize secure digital products and technology platforms.",
      icon: "layers",
      position: "40% 50%",
    },
    {
      title: "Incident Response & Digital Forensics",
      copy: "Investigate security incidents, contain threats, and support organizations through recovery.",
      list: ["Incident Investigation & Response", "Digital Forensics", "Ransomware Response", "Compromise Assessment"],
      href: "/what-we-do/incident-response",
      image: "/images/services/incident-response-forensics.webp",
      alt: "An investigator examining systems on multiple screens during an incident",
      summary: "Investigate security incidents, preserve evidence, and support effective recovery.",
      icon: "search",
      position: "35% 50%",
    },
  ],
};

export const industriesSection = {
  eyebrow: "Industries We Serve",
  titleLines: ["Different industries.", "Different challenges.", "A practical approach", "to security and technology."],
  title: "Different industries. Different challenges. A practical approach to security and technology.",
  copy: "We combine industry knowledge with technical expertise to help organizations stay secure, compliant, and ready for what's next.",
  cta: { label: "Explore all industries", href: "/industries" },
  allHref: "/industries",
  // Photos: Pexels (free for commercial use, no attribution required), stored locally in /public/images/industries.
  items: [
    { name: "Banking & Financial Services", summary: "Strengthen security, maintain compliance, and protect sensitive financial information.", icon: "bank", href: "/industries/bfsi", image: "/images/industries/banking-financial.webp", alt: "Towers of a major financial district against a pale sky", position: "62% 40%" },
    { name: "Healthcare & Life Sciences", summary: "Protect patient information, support regulatory compliance, and strengthen healthcare resilience.", icon: "health", href: "/industries/healthcare", image: "/images/industries/healthcare-life-sciences.webp", alt: "Two scientists working at a microscope in a bright laboratory", position: "45% 50%" },
    { name: "Technology & SaaS", summary: "Secure digital platforms, manage technology risks, and support scalable innovation.", icon: "cloud", href: "/industries/technology", image: "/images/industries/technology-saas.webp", alt: "Blue-lit enterprise server racks in a data center", position: "50% 50%" },
    // TODO: Fintech has no dedicated industry page yet; Banking & Financial Services is the closest.
    { name: "Fintech & Digital Assets", summary: "Manage emerging financial technology risks, protect digital assets, and build customer trust.", icon: "chart", href: "/industries/bfsi", image: "/images/industries/fintech-digital-assets.webp", alt: "Financial analytics charts on a tablet beside a market data screen", position: "55% 45%" },
    { name: "Retail & E-commerce", summary: "Protect customer data, secure digital transactions, and support reliable commerce operations.", icon: "cart", href: "/industries/retail", image: "/images/industries/retail-ecommerce.webp", alt: "Workers moving stock along a long warehouse aisle", position: "50% 55%" },
    // TODO: no dedicated page yet; the industries overview is used.
    { name: "Professional & Business Services", summary: "Safeguard confidential information, manage operational risks, and maintain client confidence.", icon: "team", href: "/industries", image: "/images/industries/professional-services.webp", alt: "An advisor meeting with clients in a modern office", position: "40% 50%" },
  ],
};

export const why = {
  eyebrow: "The HabileSec Difference",
  titleLines: ["More than meeting requirements.", "Building confidence in how you operate."],
  paragraphs: [
    "Security, compliance, privacy, and technology are closely connected. Addressing them effectively requires an understanding of both technical risks and business priorities.",
    "HabileSec brings these areas together to help organizations make informed decisions and take practical steps toward their objectives.",
  ],
  cta: { label: "About HabileSec", href: "/about" },
  steps: [
    { title: "Business-Focused Thinking", copy: "We consider your business priorities, operational requirements, and risk exposure when identifying areas that need attention." },
    { title: "Connected Expertise", copy: "Our capabilities span cybersecurity, governance and compliance, data privacy, managed security services, and digital engineering." },
    { title: "Practical Recommendations", copy: "We focus on explaining identified gaps, their implications, and the actions organizations can take to address them." },
    { title: "Support Through the Journey", copy: "Where included in the engagement, we support remediation planning, implementation guidance, evidence preparation, and follow-up assessments." },
  ],
};

export const stories = {
  eyebrow: "Our work in action",
  title: "Challenges addressed. Progress achieved. Trust strengthened.",
  copy: "Every engagement begins with a business need. Our focus is on understanding that need, applying the right expertise, and helping the organization move toward its intended outcome.",
  disclaimer: "Illustrative examples. Not verified client engagements.",
  cta: { label: "Explore All Success Stories", href: "/our-work" },
  // Photos: Pexels (free for commercial use, no attribution required), stored locally in /public/images/case-studies.
  items: [
    {
      title: "Cybersecurity Assessment",
      subtitle: "Identifying security weaknesses and strengthening application security.",
      challenge: "An organization needed to understand security weaknesses within its digital environment and determine which issues required attention.",
      approach: "HabileSec conducted an agreed security assessment, documented identified findings, and provided remediation guidance to support corrective action.",
      outcome: "The engagement provided the organization with clearer visibility into identified risks and a structured basis for prioritizing remediation.",
      image: "/images/case-studies/cybersecurity-assessment.webp",
      position: "50% 40%",
    },
    {
      title: "Compliance Readiness",
      subtitle: "Bringing clarity to security requirements and audit preparation.",
      challenge: "An organization needed to understand gaps between its existing practices and the requirements of its target security framework.",
      approach: "HabileSec supported the gap assessment, documentation review, evidence preparation, and remediation planning within the agreed scope.",
      outcome: "The organization gained a clearer understanding of its readiness, outstanding actions, and the steps required to progress toward its compliance objectives.",
      image: "/images/case-studies/compliance-readiness.webp",
      position: "50% 30%",
    },
    {
      title: "Privacy & Governance",
      subtitle: "Strengthening data protection and privacy practices.",
      challenge: "An organization needed greater clarity on its privacy responsibilities and the practices required to support effective data protection.",
      approach: "HabileSec reviewed relevant practices, identified gaps, and provided recommendations to strengthen privacy governance and documentation.",
      outcome: "The engagement established a clearer view of improvement priorities and a practical direction for strengthening privacy practices.",
      image: "/images/case-studies/compliance-readiness.webp",
      position: "50% 85%",
    },
  ],
};

export const testimonials = {
  eyebrow: "Client experiences",
  title: "Strong partnerships are built on trust and delivery.",
  // Source: published testimonials from the previous HabileSec site (Habilesec Ex, src/data/testimonials.json).
  items: [
    { id: "t1", quote: "HabileSec provided excellent security solutions, with prompt support and expert guidance, ensuring top compliance. Highly recommended for risk management.", name: "Sivakumar Gingee", role: "CEO", org: "Krushnakkumar", href: "https://www.linkedin.com/in/sivakumarkrushnakkumargsec/" },
    { id: "t2", quote: "HabileSec ensured a smooth SOC 2 Type II audit with excellent coordination, making the entire process efficient, stress-free and thorough. Highly recommend their services.", name: "Nagarajan Anandaraman", role: "CEO", org: "GoSwift", href: "https://www.linkedin.com/in/nagarajan-anandaraman-80a74a19/" },
    { id: "t3", quote: "HabileSec provides reliable cybersecurity services - strong protection, proactive solutions and responsive support. Their expertise ensures peace of mind.", name: "Srinivasan Mahalingam", role: "Group CISO & DPO", org: "Wibmo", href: "https://www.linkedin.com/in/srinivasan-mahalingam/" },
    { id: "t4", quote: "HabileSec provided expert consulting for SOC 2 Type 2 and TX-RAMP, ensuring successful certification, enhancing security maturity and enabling growth.", name: "Ajay Bhat", role: "President", org: "Nirvaana", href: "https://www.linkedin.com/in/ajaybhat/" },
    { id: "t5", quote: "HabileSec consistently delivers comprehensive security solutions with a proactive approach and a deep understanding of industry best practices.", name: "Deepak Shankar", role: "Founder Director", org: "Techsnurf", href: "https://www.linkedin.com/in/deepak-shankarappa-74125368/" },
    { id: "t6", quote: "HabileSec excels in vulnerability assessments and compliance, with a proactive approach to strengthening our overall security posture.", name: "Melwyn Rebeiro", role: "Director & CISO", org: "InfoCom IT" },
  ],
};

// Proposed content. Edit here to update the section.
// Proposed content. Edit here to update the section.
export const vision = {
  eyebrow: "What guides us",
  title: "Building trust through security, responsibility, and innovation.",
  // Photos: Pexels (free for commercial use, no attribution required), stored locally in /public/images/what-guides-us.
  blocks: [
    { label: "Our Vision", text: "To create a digital world where businesses can innovate, operate, and grow with confidence.", image: "/images/what-guides-us/vision.webp", alt: "Abstract blue light curves against a deep black background", position: "50% 50%" },
    { label: "Our Mission", text: "To make cybersecurity, governance, privacy, and technology expertise accessible and actionable for every organization we serve.", image: "/images/what-guides-us/mission.webp", alt: "The curve of the Earth's horizon seen from space", position: "75% 40%" },
    { label: "Our Commitment", text: "Practical guidance, responsible practices, and partnerships built on trust.", image: "/images/what-guides-us/commitment.webp", alt: "A pale moon in dark space", position: "60% 50%" },
  ],
};

export const insightsSection = {
  eyebrow: "Insights | Action | Impact",
  title: "Better understanding leads to better decisions.",
  allHref: "/insights",
  items: [
    { title: "Cybersecurity Insights", copy: "Perspectives on identifying risk and building security into the way you work.", href: "/insights?category=Secure%20Engineering", image: "/images/infrastructure.webp", alt: "Network infrastructure" },
    { title: "Compliance & Regulatory Updates", copy: "Practical views on standards, regulation, and continuous assurance.", href: "/insights?category=GRC", image: "/images/governance.webp", alt: "Corporate workplace" },
    { title: "Data Privacy & Protection", copy: "How privacy governance supports customer trust and regulatory readiness.", href: "/insights?category=Privacy", image: "/images/healthcare.webp", alt: "Healthcare setting" },
    { title: "Technology & Digital Trust", copy: "Responsible adoption of cloud, AI, and connected technologies.", href: "/insights?category=AI%20Governance", image: "/images/engineering.webp", alt: "Team collaborating" },
  ],
};

export const finalCta = {
  eyebrow: "Let's move forward",
  title: "Your next step toward stronger security starts here.",
  titleLines: ["Your next step toward", "stronger security starts here."],
  copy: "Tell us what you are working toward. Our experts will help you understand where you stand and what to do next.",
  primary: { label: "Talk to Our Experts", href: "/contact" },
  secondary: { label: "Contact Us", href: "mailto:enquiry@habilesec.com" },
};
