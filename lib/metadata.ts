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
          url: "/media/business-advisory.webp",
          alt: "Professionals discussing business strategy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HabileSec`,
      description,
      images: ["/media/business-advisory.webp"],
    },
  };
}
