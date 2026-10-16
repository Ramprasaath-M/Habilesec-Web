import { PlatformDetail } from "@/components/pages/product-pages";
import { platformProducts } from "@/data/enterprise";
import { pageMetadata } from "@/lib/metadata";
const item = platformProducts.find((p) => p.slug === "tanikkai")!;
export const metadata = pageMetadata(
  item.name,
  item.summary,
  "/products/tanikkai",
);
export default function Page() {
  return <PlatformDetail slug="tanikkai" />;
}
