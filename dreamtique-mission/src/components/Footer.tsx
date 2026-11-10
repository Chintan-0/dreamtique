import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { Btn } from "./ui";
import { links } from "./links";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="border-t border-ink bg-white">
      <div className="gutter mx-auto grid max-w-[1700px] gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <p className="display text-[clamp(2.6rem,5vw,4.6rem)]">Explore beyond.</p>
          <p className="mt-4 max-w-[36ch] text-mute">Explore the world with us and experience the art of travel, redefined.</p>
          <div className="mt-8">
            <Btn href="/contact#enquire">Plan your journey</Btn>
          </div>
        </div>
        <nav aria-label="Pages" className="lg:col-span-2">
          <p className="label text-mute">Explore</p>
          <ul className="mt-4 grid gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-red">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Services" className="lg:col-span-2">
          <p className="label text-mute">Services</p>
          <ul className="mt-4 grid gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-red">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic lg:col-span-3">
          <p className="label text-mute">Contact</p>
          <div className="mt-4 grid gap-2">
            <a href={`mailto:${company.email}`} className="[overflow-wrap:anywhere] hover:text-red">
              {company.email}
            </a>
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="hover:text-red">
                {p}
              </a>
            ))}
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-red">
              WhatsApp
            </a>
            <span className="text-mute">{company.address}</span>
          </div>
        </address>
      </div>
      <div className="gutter mx-auto flex max-w-[1700px] flex-wrap justify-between gap-3 border-t border-line py-6 text-[0.9375rem] text-mute">
        <span>
          Copyright <Year /> Dreamtique Tourism. All rights reserved.
        </span>
        <span className="label">Dubai · Georgia · Armenia</span>
      </div>
    </footer>
  );
}
