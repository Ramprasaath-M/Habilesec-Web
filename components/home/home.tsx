import { Hero } from "./hero";
import { TrustStrip } from "./trust-strip";
import { BusinessReality } from "./business-reality";
import { Approach } from "./approach";
import { ChallengeExplorer } from "./challenge-explorer";
import { ServiceShowcase } from "./service-showcase";
import { ProductStage } from "./product-stage";
import { IndustryTiles } from "./industry-tiles";
import { InsightsEditorial } from "./insights-editorial";
import { CompanyStory } from "./company-story";
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
      <ProductStage />
      <IndustryTiles />
      <InsightsEditorial />
      <CompanyStory />
      <Closing />
    </>
  );
}
