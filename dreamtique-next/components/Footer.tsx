import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { ButtonLink } from "./ui";
import { Year } from "./Year";

const letters = [
  ["D", "bg-accent", "100%"],
  ["R", "bg-blue", "78%"],
  ["E", "bg-sky", "92%"],
  ["A", "bg-accent", "66%"],
  ["M", "bg-blue", "100%"],
  ["T", "bg-sky", "84%"],
  ["I", "bg-accent", "72%"],
  ["Q", "bg-blue", "96%"],
  ["U", "bg-sky", "62%"],
  ["E", "bg-accent", "88%"],
] as const;

export function Footer() {
  return (
    <footer className="on-dark bg-navy px-[clamp(16px,2.2vw,32px)] pb-6 pt-[clamp(40px,4.5vw,64px)] text-navy-ink">
      <div className="flex h-[26svh] min-h-[140px] items-end gap-1" role="img" aria-label="Dreamtique">
        {letters.map(([l, bg, h], i) => (
          <span
            key={i}
            className={`grid flex-1 place-items-end overflow-hidden pb-[0.06em] text-center text-[clamp(2rem,9.5vw,11rem)] font-bold leading-[0.82] tracking-[-0.04em] text-navy ${bg}`}
            style={{ height: h }}
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 text-[0.9375rem] md:grid-cols-12">
        <FootNav title="Pages" className="md:col-span-2" links={[["/", "Home"], ["/about", "About"], ["/services", "Services"]]} />
        <FootNav title="Travel" className="md:col-span-2" links={[["/destinations", "Destinations"], ["/packages", "Packages"], ["/contact", "Plan your journey"]]} />
        <FootNav
          title="Services"
          className="md:col-span-2"
          links={[["/services/hotel-bookings", "Hotel bookings"], ["/services/visa-services", "Visa services"], ["/services/chauffeur-services", "Chauffeur services"]]}
        />
        <FootNav title="Help" className="md:col-span-2" links={[["/contact#faq", "Questions"], ["/contact", "Contact"]]} />
        <address className="col-span-2 grid content-start gap-2 not-italic md:col-span-4">
          <b className="font-medium text-navy-muted">{site.name}</b>
          <p>Explore the world with us and experience the art of travel, redefined.</p>
          <a className="inline-flex items-center gap-2 hover:text-sky" href={`mailto:${site.email}`}>
            <Mail size={16} aria-hidden /> {site.email}
          </a>
          {site.phones.map((p) => (
            <a key={p} className="inline-flex items-center gap-2 hover:text-sky" href={`tel:${p.replace(/[^+\d]/g, "")}`}>
              <Phone size={16} aria-hidden /> {p}
            </a>
          ))}
          <span className="inline-flex items-start gap-2">
            <MapPin size={16} aria-hidden className="mt-1 shrink-0" /> {site.address}
          </span>
        </address>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-[0.9375rem]">
        <span>Copyright <Year /> Dreamtique Tourism</span>
        <ButtonLink href="/contact" tone="light" className="min-h-[44px] px-5 text-[0.9375rem]">
          Get in touch
        </ButtonLink>
      </div>
    </footer>
  );
}

function FootNav({ title, links, className = "" }: { title: string; links: string[][]; className?: string }) {
  return (
    <nav aria-label={title} className={`grid content-start gap-2.5 ${className}`}>
      <b className="font-medium text-navy-muted">{title}</b>
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="hover:text-sky">
          {label}
        </Link>
      ))}
    </nav>
  );
}
