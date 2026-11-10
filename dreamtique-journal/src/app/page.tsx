import { Faq, Testimonials } from "@/components/sections/sections";
import { FinalScene } from "@/components/home/FinalScene";
import { GlobeScene } from "@/components/home/GlobeScene";
import { Hero } from "@/components/home/Hero";
import { Journey, Packages, PromiseScene, ServicesList, Showcase, Story } from "@/components/home/Scenes";

export default function Home() {
  return (
    <>
      <Hero />
      <GlobeScene />
      <Showcase />
      <Story />
      <ServicesList />
      <Journey />
      <Packages />
      <PromiseScene />
      <Testimonials />
      <Faq dark />
      <FinalScene />
    </>
  );
}
