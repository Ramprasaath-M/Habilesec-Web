import { Hero } from "./hero";
import { TrustStrip } from "./trust-strip";
import { BusinessReality } from "./business-reality";
import { Approach } from "./approach";
import { ChallengeExplorer } from "./challenge-explorer";
import { ServiceShowcase } from "./service-showcase";
import { Closing } from "@/components/ui/closing";

export function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BusinessReality />
      <Approach />
      <ChallengeExplorer />
      <ServiceShowcase />
      <Closing />
    </>
  );
}
