import { IndustriesLanding } from "@/components/pages/industry-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Industries",
  "Cybersecurity, governance and secure engineering for government, financial services, technology, manufacturing, healthcare and retail.",
  "/industries",
);
export default function Page() {
  return <IndustriesLanding />;
}
