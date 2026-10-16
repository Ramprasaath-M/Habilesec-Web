// Art direction for the redesign: one place that says which local photograph
// represents which business concept, with descriptive alt text.
// Provenance for every file is recorded in ASSET_INVENTORY.md.

export type Visual = {
  src: string;
  alt: string;
  /** CSS object-position for cover crops */
  pos?: string;
  /** Natural size, used only to reserve aspect ratio where a frame is not fixed */
  w?: number;
  h?: number;
};

export const heroVisual: Visual = {
  src: "/images/habilesec-difference/ascending-staircase.webp",
  alt: "A professional climbing a white staircase toward an open door filled with sunlight",
  pos: "62% 55%",
  w: 1816,
  h: 866,
};

/** Index matches challengeEntries in data/enterprise.ts */
export const challengeVisuals: Visual[] = [
  {
    src: "/images/challenges/cybersecurity.webp",
    alt: "A developer reviewing code across several monitors",
    pos: "55% 40%",
  },
  {
    src: "/images/challenges/governance-compliance.webp",
    alt: "A professional reviewing a document at a desk",
    pos: "50% 35%",
  },
  {
    src: "/images/engineering.webp",
    alt: "A software team working together on laptops",
    pos: "50% 45%",
  },
  {
    src: "/images/services/incident-response-forensics.webp",
    alt: "An analyst investigating activity on several screens in a dim workspace",
    pos: "50% 50%",
  },
];

export const serviceVisuals: Record<string, Visual> = {
  cybersecurity: {
    src: "/images/case-studies/cybersecurity-assessment.webp",
    alt: "Glass office towers seen from below against a blue sky",
    pos: "50% 40%",
  },
  "governance-compliance": {
    src: "/images/services/governance-risk-compliance.webp",
    alt: "A team reviewing documents around a meeting table",
    pos: "50% 50%",
  },
  "data-privacy": {
    src: "/images/services/data-privacy.webp",
    alt: "A professional with a tablet in a data centre corridor",
    pos: "55% 40%",
  },
  "digital-engineering": {
    src: "/images/services/digital-engineering.webp",
    alt: "A software engineering team working in an open office",
    pos: "50% 50%",
  },
  "incident-response": {
    src: "/images/services/managed-security.webp",
    alt: "A security operations centre with a wall of monitors",
    pos: "50% 45%",
  },
};

export const practiceVisuals: Record<string, Visual> = {
  grcloop: {
    src: "/images/governance.webp",
    alt: "A modern office corridor with glass partitions",
    pos: "50% 50%",
  },
  forgeloop: {
    src: "/images/reference/product-development.jpg",
    alt: "A product team collaborating at laptops",
    pos: "50% 45%",
  },
  hexn6: {
    src: "/images/services/managed-security.webp",
    alt: "A security operations centre with a wall of monitors",
    pos: "50% 45%",
  },
};

export const industryVisuals: Record<string, Visual> = {
  government: {
    src: "/images/case-studies/compliance-readiness.webp",
    alt: "A white institutional building façade against a clear blue sky",
    pos: "50% 30%",
  },
  bfsi: {
    src: "/images/industries/fintech-digital-assets.webp",
    alt: "A tablet showing financial market charts",
    pos: "50% 30%",
  },
  technology: {
    src: "/images/industries/technology-saas.webp",
    alt: "Rows of illuminated server racks",
    pos: "50% 50%",
  },
  manufacturing: {
    src: "/media/manufacturing.webp",
    alt: "Automated production equipment in a factory",
    pos: "50% 50%",
  },
  healthcare: {
    src: "/images/industries/healthcare-life-sciences.webp",
    alt: "Scientists working in a clean laboratory",
    pos: "45% 40%",
  },
  retail: {
    src: "/images/retail.webp",
    alt: "A clothing store interior with shelves and display tables",
    pos: "50% 50%",
  },
};

export const articleVisuals: Record<string, Visual> = {
  "continuous-assurance": {
    src: "/images/governance.webp",
    alt: "A modern office corridor with glass partitions",
    pos: "50% 50%",
  },
  "secure-product-engineering": {
    src: "/images/reference/product-development.jpg",
    alt: "A product team collaborating at laptops",
    pos: "50% 45%",
  },
  "incident-response-evidence": {
    src: "/images/case-studies/incident-preparedness.webp",
    alt: "A mountain ridge under dark storm clouds",
    pos: "50% 50%",
  },
  "privacy-governance": {
    src: "/images/challenges/data-privacy.webp",
    alt: "A professional working on a laptop at a bright desk",
    pos: "60% 40%",
  },
  "ai-governance": {
    src: "/images/services/data-privacy.webp",
    alt: "A professional with a tablet in a data centre corridor",
    pos: "55% 40%",
  },
};

export const productVisuals: Record<string, Visual> = {
  "certanika-lite": {
    src: "/images/challenges/business-resilience.webp",
    alt: "Colleagues planning with sticky notes on a whiteboard",
    pos: "50% 40%",
  },
  tanikkai: {
    src: "/images/challenges/data-privacy.webp",
    alt: "A professional working on a laptop at a bright desk",
    pos: "60% 40%",
  },
};

export const tanikkaiLogo: Visual = {
  src: "/images/reference/tanikkai-logo.jpeg",
  alt: "Tanikkai logo",
  w: 660,
  h: 210,
};

export const founderVisuals: Visual[] = [
  {
    src: "/media/kalaivani-srinivasan.webp",
    alt: "Portrait of Kalaivani Srinivasan",
    pos: "50% 26%",
  },
  {
    src: "/media/srinivasan-mahalingam.webp",
    alt: "Portrait of Srinivasan Mahalingam",
    pos: "50% 34%",
  },
];

export const aboutVisual: Visual = {
  src: "/images/challenges-glass.webp",
  alt: "Glass office towers rising into a blue sky",
  pos: "50% 40%",
};

/**
 * Mirrors company.locations in data/site.ts (city + role). Confirm that every
 * delivery location is current before publication.
 */
export const presence = [
  { city: "Kumbakonam", role: "Head office", hq: true },
  { city: "Bangalore", role: "Engineering" },
  { city: "Ahmedabad", role: "Advisory" },
  { city: "Bhilwara", role: "Delivery" },
  { city: "Hyderabad", role: "Operations" },
  { city: "Canada", role: "North America" },
  { city: "USA", role: "North America" },
  { city: "Hong Kong", role: "APAC" },
  { city: "Dubai", role: "Middle East" },
];
