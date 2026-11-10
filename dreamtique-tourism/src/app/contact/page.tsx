import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/booking/ContactForm";
import { Faq, PageHero, PhotoStrip } from "@/components/sections/sections";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dreamtique Tourism in Dubai: email, phone, WhatsApp and an enquiry form.",
};

export default function Contact() {
  return (
    <>
      <PageHero title="Get in touch." lead="Tell us where you want to go. We will take care of the rest." image="/images/dubai/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" />

      <section aria-label="Contact" className="bg-midnight section-y">
        <div className="gutter grid gap-8 lg:grid-cols-12">
          <Reveal className="glass grid content-start gap-6 rounded-[2rem] p-8 lg:col-span-5 lg:p-10">
            <h2 className="text-3xl font-bold tracking-[-0.03em]">Dreamtique Tourism</h2>
            <address className="grid gap-5 not-italic">
              <a href={`mailto:${company.email}`} className="flex items-start gap-4 [overflow-wrap:anywhere] hover:text-electric-soft"><Mail aria-hidden className="mt-1 shrink-0 text-electric" />{company.email}</a>
              {company.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex items-start gap-4 hover:text-electric-soft"><Phone aria-hidden className="mt-1 shrink-0 text-electric" />{p}</a>
              ))}
              <span className="flex items-start gap-4"><MapPin aria-hidden className="mt-1 shrink-0 text-electric" />{company.address}</span>
            </address>
            <div className="flex flex-wrap gap-3">
              <Button href={company.whatsapp} external tone="electric" arrow={false}><MessageCircle size={18} aria-hidden /> WhatsApp</Button>
              <Button href="/booking" tone="glass">Plan Your Journey</Button>
            </div>
          </Reveal>
          <div className="lg:col-span-7"><ContactForm /></div>
        </div>
      </section>

      <Faq dark={false} />
      <PhotoStrip />
    </>
  );
}
