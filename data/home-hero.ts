export type HeroMedia =
  | { type: "image"; src: string; mobileSrc?: string; width: number; height: number; mobileWidth?: number; mobileHeight?: number }
  | { type: "video"; src: string; poster: string };

export const heroContent = {
  media: {
    type: "image",
    src: "/images/home/hero/habilesec-hero-desktop.webp",
    width: 1672,
    height: 941,
    mobileSrc: "/images/home/hero/habilesec-hero-mobile.webp",
    mobileWidth: 705,
    mobileHeight: 941,
  } as HeroMedia,
  eyebrow: "INSIGHTS / ACTION / IMPACT",
  title: ["Turning complexity", "into clarity."],
  description:
    "We help organizations stay ahead of evolving risks, regulatory changes, and technology disruption with practical solutions that create lasting value.",
  cta: { label: "Explore Our Expertise", href: "/services" },
  panels: [
    {
      number: "01", title: "SECURE",
      description: "Protect systems, cloud, code and operations before vulnerabilities become business risks.",
      linkLabel: "Explore security", href: "/services",
    },
    {
      number: "02", title: "COMPLIANT",
      description: "Stay ready for evolving standards, regulations and assurance requirements.",
      linkLabel: "Explore compliance", href: "/services/grcloop",
    },
    {
      number: "03", title: "TRUSTED",
      description: "Build confidence with customers, boards and regulators through demonstrable security.",
      linkLabel: "Why HabileSec", href: "/about",
    },
  ],
};
