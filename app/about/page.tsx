import { AboutPage } from "@/components/pages/company-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About HabileSec",
  "Meet HabileSec: founded in 2020 to connect cybersecurity, governance and secure digital engineering.",
  "/about",
);
export default function Page() {
  return <AboutPage />;
}
