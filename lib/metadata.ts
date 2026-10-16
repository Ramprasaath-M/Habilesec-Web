import type { Metadata } from "next";
export const BASE_URL = "https://www.habilesec.com";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | HabileSec`,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/images/habilesec-difference/ascending-staircase.webp",
          alt: "A professional climbing a white staircase toward an open door filled with sunlight",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HabileSec`,
      description,
      images: ["/images/habilesec-difference/ascending-staircase.webp"],
    },
  };
}
