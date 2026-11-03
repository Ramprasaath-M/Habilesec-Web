import { testimonials } from "./home-sections";

export type CustomerTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
  href?: string;
  image?: string;
  companyLogo?: string;
};

// Keep the existing full published quotations as the single source of truth.
// Avatar mapping is explicit in EX/src/data/testimonials.json; company logos
// are recovered from its existing partners directory, never generated.
export const customerTestimonials: readonly CustomerTestimonial[] = testimonials.items.map(item => ({
  ...item,
  image: item.id === "t3" ? "/images/testimonials/srinivasan-mahalingam.webp" : undefined,
  companyLogo: item.id === "t5" ? "/images/testimonials/techsnurf.webp" : item.id === "t6" ? "/images/testimonials/infocom.webp" : undefined,
}));
