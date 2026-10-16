export type LinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type Service = {
  slug: "grcloop" | "forgeloop" | "hexn6";
  eyebrow: string;
  title: string;
  shortTitle: string;
  href: string;
  summary: string;
  bullets: string[];
  loop: string[];
  image: string;
};

export type Industry = {
  slug: string;
  name: string;
  challenge: string;
  risk: string[];
  helps: string[];
  image: string;
};

export type Insight = {
  title: string;
  type: "Perspective" | "Article" | "Guide" | "Report" | "Security Update";
  category: string;
  date: string;
  readTime: string;
  summary: string;
};

export type CaseStudy = {
  client: string;
  sector: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  placeholder?: boolean;
};
