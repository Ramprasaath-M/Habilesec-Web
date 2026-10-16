import { ServicesLanding } from "@/components/pages/service-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "What We Do",
  "Cybersecurity, governance, privacy, digital engineering and incident response from HabileSec.",
  "/what-we-do",
);
export default function Page() {
  return <ServicesLanding />;
}
