import { Home } from "@/components/home/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Cybersecurity, governance & secure engineering",
  "HabileSec connects cybersecurity, governance, compliance and secure digital engineering to help organizations move forward with confidence.",
  "/",
);

export default function HomePage() {
  return <Home />;
}
