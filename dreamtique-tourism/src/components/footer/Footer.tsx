import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, nav } from "@/data/company";
import { services } from "@/data/services";
import { Logo } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/Button";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-midnight">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />
      <div className="gutter relative grid gap-14 pb-10 pt-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-6 max-w-[38ch] text-white/70">Explore the world with us and experience the art of travel, redefined.</p>
          <div className="mt-8">
            <Button href="/booking">Plan Your Journey</Button>
          </div>
        </div>

        <nav aria-label="Pages" className="grid content-start gap-3 lg:col-span-2">
          <b className="font-medium text-electric-soft">Explore</b>
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Services" className="grid content-start gap-3 lg:col-span-2">
          <b className="font-medium text-electric-soft">Services</b>
          {services.map((s) => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="text-white/75 transition-colors hover:text-white">
              {s.name}
            </Link>
          ))}
        </nav>

        <address className="grid content-start gap-3 not-italic lg:col-span-3">
          <b className="font-medium text-electric-soft">Contact</b>
          <a className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={`mailto:${company.email}`}>
            <Mail size={16} aria-hidden /> {company.email}
          </a>
          {company.phones.map((p) => (
            <a key={p} className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={`tel:${p.replace(/[^+\d]/g, "")}`}>
              <Phone size={16} aria-hidden /> {p}
            </a>
          ))}
          <a className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={company.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} aria-hidden /> WhatsApp
          </a>
          <span className="inline-flex items-start gap-2 text-white/75">
            <MapPin size={16} aria-hidden className="mt-1 shrink-0" /> {company.address}
          </span>
        </address>
      </div>

      <div className="gutter relative border-t border-white/10 pb-8 pt-8">
        <p className="mt-6 text-[0.9375rem] text-white/60">
          Copyright <Year /> Dreamtique Tourism. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
