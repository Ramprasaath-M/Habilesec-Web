import { ContactPage } from "@/components/pages/company-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact",
  "Contact HabileSec to discuss cybersecurity, governance, engineering or incident response.",
  "/contact",
);
export default function Page() {
  return <ContactPage />;
}
