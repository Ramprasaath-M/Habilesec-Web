import { CertanikaDetail } from "@/components/pages/product-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Certanika",
  "Explore certification and assessment support and understand how it differs from ISO readiness.",
  "/products/certanika",
);
export default function Page() {
  return <CertanikaDetail />;
}
