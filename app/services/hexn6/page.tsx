import { PracticeDetail } from "@/components/pages/service-pages";
import { services } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
const item = services.find((s) => s.slug === "hexn6")!;
export const metadata = pageMetadata(item.title, item.summary, item.href);
export default function Page() {
  return <PracticeDetail slug="hexn6" />;
}
