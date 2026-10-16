import { InsightsLanding } from "@/components/pages/insight-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Insights",
  "Practice notes on cybersecurity, governance, privacy and secure engineering from HabileSec.",
  "/insights",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <InsightsLanding category={category} />;
}
