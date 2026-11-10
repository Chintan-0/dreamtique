import { DestinationPicker } from "@/components/DestinationPicker";
import { Hero } from "@/components/Hero";
import { AboutPanel, EnquirySection, FaqSection, PackageFields, ServiceTiles, Steps, VideoBand } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPanel />
      <ServiceTiles />
      <DestinationPicker />
      <VideoBand />
      <Steps />
      <PackageFields />
      <FaqSection />
      <EnquirySection />
    </>
  );
}
