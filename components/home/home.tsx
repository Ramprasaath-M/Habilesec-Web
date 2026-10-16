import { Hero } from "./hero";
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
