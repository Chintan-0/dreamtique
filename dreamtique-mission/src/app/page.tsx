import { Faq, JourneyPlan, PackagesRow, PromiseGrid, ServicesIndex, Statement } from "@/components/Sections";
import { CustomPanel, DestinationPanels, ExplorePanel, FinalPanel, Hero } from "@/components/Panels";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <DestinationPanels />
      <ServicesIndex />
      <ExplorePanel />
      <JourneyPlan />
      <PackagesRow />
      <CustomPanel />
      <PromiseGrid />
      <Faq />
      <FinalPanel />
    </>
  );
}
