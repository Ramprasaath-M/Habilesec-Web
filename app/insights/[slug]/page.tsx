import { PerspectiveDetail } from "@/components/pages/insight-pages";
import { articles } from "@/data/editorial";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return pageMetadata(a.title, a.summary, `/insights/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!articles.some((a) => a.slug === slug)) notFound();
  return <PerspectiveDetail slug={slug} />;
}
