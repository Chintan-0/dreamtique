import { CategoryGrid, CityTiles, CtaBand, DestinationRails, FaqSection, Hero, HowItWorks, PackagesRow, VisaBanner, WhySection } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <CityTiles />
      <DestinationRails />
      <CategoryGrid />
      <VisaBanner />
      <PackagesRow />
      <HowItWorks />
      <WhySection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
