import type { MetadataRoute } from "next";
import { industries } from "@/data/site";
import { articles } from "@/data/editorial";
import { serviceCategories } from "@/data/service-categories";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/what-we-do",
    "/products",
    "/products/certanika-lite",
    "/products/certanika",
    "/products/tanikkai",
    "/industries",
    "/insights",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
    "/our-work",
    "/services/grcloop",
    "/services/forgeloop",
    "/services/hexn6",
    ...serviceCategories.map((c) => `/what-we-do/${c.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
  ].map((path) => ({ url: `https://www.habilesec.com${path}` }));
}
