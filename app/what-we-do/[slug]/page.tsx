import { ServiceDetail } from "@/components/pages/service-pages";
import { CapabilityPage } from "@/components/pages/capability-page";
import { serviceCategories } from "@/data/service-categories";
import { capabilities } from "@/data/capabilities";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...serviceCategories.map((c) => ({ slug: c.slug })),
    ...capabilities.map((c) => ({ slug: c.slug })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = serviceCategories.find((c) => c.slug === slug);
  if (c) return pageMetadata(c.name, c.description, `/what-we-do/${slug}`);
  const k = capabilities.find((c) => c.slug === slug);
  if (!k) notFound();
  return pageMetadata(k.name, k.summary, `/what-we-do/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = serviceCategories.find((c) => c.slug === slug);
  if (c) return <ServiceDetail category={c} />;
  const k = capabilities.find((c) => c.slug === slug);
  if (!k) notFound();
  return <CapabilityPage capability={k} />;
}
