import { DestinationExplorer } from "@/components/destination/DestinationExplorer";
import { ScrollStory } from "@/components/destination/ScrollStory";
import { Hero } from "@/components/hero/Hero";
import { AboutPreview, Faq, FinalCta, PackagesPreview, Process, Testimonials } from "@/components/sections/sections";
import { ServiceCards } from "@/components/services/ServiceCards";
import { Button } from "@/components/ui/Button";
import { Heading, Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="after-hero" />
      <DestinationExplorer />
      <AboutPreview />

      <section aria-labelledby="svc-h" className="relative bg-navy section-y">
        <div className="gutter">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading id="svc-h" className="max-w-[9em]">Everything the trip needs.</Heading>
            <Reveal className="max-w-[34ch] text-white/75">
              <p>Six services, one team, from the first idea to the ride home.</p>
              <div className="mt-5"><Button href="/services" tone="glass">All services</Button></div>
            </Reveal>
          </div>
          <div className="mt-14"><ServiceCards /></div>
        </div>
      </section>

      <ScrollStory />
      <Process />
      <PackagesPreview />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
