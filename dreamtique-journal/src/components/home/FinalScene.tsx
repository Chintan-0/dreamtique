import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Scene 10. The planet rises from below, then the ways to reach us. */
export function FinalScene() {
  return (
    <section aria-labelledby="fin-h" className="relative isolate overflow-hidden bg-midnight pt-[clamp(72px,10vw,160px)]">
      <div aria-hidden className="absolute left-1/2 top-[48%] -z-10 aspect-square w-[150vw] max-w-[1900px] -translate-x-1/2 rounded-full bg-[url('/earth/day.jpg')] bg-[length:240%_120%] bg-[position:60%_40%] shadow-[0_0_140px_rgba(61,139,255,0.6),inset_0_60px_160px_rgba(2,8,28,0.55)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight via-midnight/70 to-midnight/20" />
      <div className="gutter mx-auto max-w-[1500px] text-center">
        <Reveal as="h2" className="mx-auto max-w-[11em] text-[clamp(2.4rem,8vw,6.4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-glow">
          <span id="fin-h">The world is waiting. Where will you go next?</span>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/booking">Plan Your Journey</Button>
          <Button href={company.whatsapp} external tone="glass" arrow={false}>WhatsApp us</Button>
        </Reveal>
      </div>
      <address className="gutter relative mx-auto mt-24 grid max-w-[1500px] gap-4 pb-14 not-italic sm:grid-cols-2 lg:mt-40 lg:grid-cols-4">
        <a href={`mailto:${company.email}`} className="glass !bg-none !bg-midnight/85 flex items-start gap-3 rounded-3xl p-5 [overflow-wrap:anywhere] hover:bg-white/15"><Mail aria-hidden className="mt-1 shrink-0 text-electric-soft" />{company.email}</a>
        <div className="glass !bg-none !bg-midnight/85 grid gap-1 rounded-3xl p-5">
          {company.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex items-start gap-3 hover:text-electric-soft"><Phone aria-hidden size={20} className="mt-1 shrink-0 text-electric-soft" />{p}</a>
          ))}
        </div>
        <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="glass !bg-none !bg-midnight/85 flex items-start gap-3 rounded-3xl p-5 hover:bg-white/15"><MessageCircle aria-hidden className="mt-1 shrink-0 text-electric-soft" />Message us on WhatsApp</a>
        <p className="glass !bg-none !bg-midnight/85 flex items-start gap-3 rounded-3xl p-5"><MapPin aria-hidden className="mt-1 shrink-0 text-electric-soft" />{company.address}</p>
      </address>
    </section>
  );
}
