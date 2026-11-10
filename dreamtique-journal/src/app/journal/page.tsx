import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { FinalCta, PageHero } from "@/components/sections/sections";
import { Button } from "@/components/ui/Button";
import { Heading, Reveal } from "@/components/ui/Reveal";
import { journalTopics } from "@/data/packages";

export const metadata: Metadata = {
  title: "Travel Journal",
  description: "Travel tips, destination guides, planning advice, industry news and packing guides from Dreamtique Tourism.",
};

// The structure is ready. Articles are published only when genuine content is available.
export default function Journal() {
  return (
    <>
      <PageHero title="Travel Journal." lead="Tips, guides and ideas for travelers, coming as the Dreamtique team writes them." image="/images/armenia/republic-square.jpg" alt="Republic Square in Yerevan" />

      <section aria-labelledby="topics-h" className="bg-ivory text-ink section-y">
        <div className="gutter">
          <Heading id="topics-h" className="max-w-[10em]">What we will write about.</Heading>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journalTopics.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 3) * 0.06} className="rounded-[1.75rem] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(10,22,51,0.4)]">
                <BookOpen aria-hidden className="text-brand-red" />
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-2 text-ink/75">{t.text}</p>
                <p className="mt-6 text-sm font-medium text-ink/50">First articles coming soon</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-14 flex flex-wrap items-center gap-5">
            <p className="max-w-[44ch] text-ink/75">Want a guide to a place we do not cover yet? Ask us and we will write it.</p>
            <Button href="/contact" tone="ink">Suggest a topic</Button>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
