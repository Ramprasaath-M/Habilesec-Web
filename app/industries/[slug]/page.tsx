import { IndustryDetail } from "@/components/enterprise/pages";
import { industries } from "@/data/site";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const i = industries.find((i) => i.slug === slug);
  if (!i) notFound();
  return pageMetadata(i.name, i.challenge, `/industries/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!industries.some((i) => i.slug === slug)) notFound();
  return <IndustryDetail slug={slug} />;
}
