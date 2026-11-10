import type { Metadata } from "next";
import { PageTop } from "@/components/PageTop";
import { DestinationPanels, FinalPanel } from "@/components/Panels";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Dubai, Georgia and Armenia: where Dreamtique Tourism plans journeys. Other destinations on request.",
};

export default function Destinations() {
  return (
    <>
      <PageTop crumb="Destinations" title="Where to next?" lead="Dubai, Georgia and Armenia to begin with. Other destinations can be requested." image="/images/dubai-frame.jpg" alt="The Dubai Frame observation deck" />
      <div className="mt-16">
        <DestinationPanels compact />
      </div>
      <FinalPanel />
    </>
  );
}
