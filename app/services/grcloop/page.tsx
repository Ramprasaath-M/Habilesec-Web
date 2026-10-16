import { PracticeDetail } from "@/components/pages/service-pages";
import { services } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
const item = services.find((s) => s.slug === "grcloop")!;
export const metadata = pageMetadata(item.title, item.summary, item.href);
export default function Page() {
  return <PracticeDetail slug="grcloop" />;
}
