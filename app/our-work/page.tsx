import { OurWorkPage } from "@/components/enterprise/pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Work",
  "Explore how HabileSec connects governance, secure engineering and incident response with practical execution.",
  "/our-work",
);
export default function Page() {
  return <OurWorkPage />;
}
