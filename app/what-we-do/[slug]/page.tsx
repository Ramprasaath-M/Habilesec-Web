import { ServiceDetail } from "@/components/enterprise/pages";
import { serviceCategories } from "@/data/service-categories";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return serviceCategories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = serviceCategories.find((c) => c.slug === slug);
  if (!c) notFound();
  return pageMetadata(c.name, c.description, `/what-we-do/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = serviceCategories.find((c) => c.slug === slug);
  if (!c) notFound();
  return <ServiceDetail category={c} />;
}
