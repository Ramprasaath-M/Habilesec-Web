// Landing-grid presentation only. Keep detail-page content and image choices
// in industries.ts unchanged. Photo provenance: docs/industry-cards.md.
export type IndustryCardPresentation = {
  description: string;
  image: string;
  position: string;
};

export const industryCardPresentation: Record<string, IndustryCardPresentation> = {
  "banking-financial-services": {
    description: "Strengthening financial security and regulatory readiness.",
    image: "/images/industries/banking-financial.webp",
    position: "58% 50%",
  },
  "healthcare-life-sciences": {
    description: "Protecting patient data and connected care systems.",
    image: "/images/industries/healthcare-life-sciences.webp",
    position: "42% 45%",
  },
  "information-technology-saas": {
    description: "Securing digital products, platforms and cloud environments.",
    image: "/images/industries/technology-saas.webp",
    position: "45% 50%",
  },
  "manufacturing-industrial": {
    description: "Strengthening security across connected operations.",
    image: "/media/manufacturing.webp",
    position: "50% 50%",
  },
  "retail-ecommerce": {
    description: "Protecting digital commerce and customer interactions.",
    image: "/images/industries/retail-ecommerce.webp",
    position: "50% 50%",
  },
  "education-edtech": {
    description: "Creating safer digital learning environments.",
    image: "/images/industries/card-education.webp",
    position: "34% 50%",
  },
  "government-public-sector": {
    description: "Strengthening security across public digital services.",
    image: "/images/case-studies/compliance-readiness.webp",
    position: "50% 28%",
  },
  telecommunications: {
    description: "Protecting critical networks and connectivity.",
    image: "/images/industries/card-telecommunications.webp",
    position: "50% 58%",
  },
  "energy-utilities": {
    description: "Supporting security and operational resilience.",
    image: "/images/industries/card-energy.webp",
    position: "50% 50%",
  },
  "logistics-transportation": {
    description: "Securing connected supply chains and operations.",
    image: "/videos/industries/logistics-poster.jpg",
    position: "64% 50%",
  },
  "professional-business-services": {
    description: "Protecting client information and business trust.",
    image: "/images/industries/professional-services.webp",
    position: "38% 45%",
  },
  "media-digital-platforms": {
    description: "Securing content, platforms and digital experiences.",
    image: "/images/industries/card-media.webp",
    position: "44% 48%",
  },
};
