import { ProductsLanding } from "@/components/enterprise/pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Products",
  "Explore Certanika Lite and Tanikkai: platforms for readiness, governance, risk and compliance.",
  "/products",
);
export default function Page() {
  return <ProductsLanding />;
}
