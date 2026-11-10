import type { Metadata } from "next";
import { DestinationPicker } from "@/components/DestinationPicker";
import { Cta, DestinationGuide, PageHead, VideoBand } from "@/components/sections";
import { destinations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Destination guides for Dubai, Georgia and Armenia: overview, must-see attractions and recommended activities.",
};

export default function Destinations() {
  return (
    <>
      <PageHead title="Destinations" lead="Guides to where we travel most: an overview, what to see, what to do." image="georgia" />
      <DestinationPicker heading="Choose a place" />
      <VideoBand />
      <section aria-label="Destination guides">
        {destinations.map((d) => (
          <DestinationGuide key={d.slug} slug={d.slug} />
        ))}
      </section>
      <Cta heading="We plan beyond these three too" />
    </>
  );
}
