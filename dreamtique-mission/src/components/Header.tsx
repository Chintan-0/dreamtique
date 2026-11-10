"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Btn } from "./ui";
import { links } from "./links";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // over the full-screen footage on the home page the bar is clear with white type; everywhere else it is white
  const dark = pathname === "/" && !solid && !open;
  return (
    <header className={`fixed inset-x-0 top-9 z-50 transition-colors duration-300 ${dark ? "bg-transparent text-white" : "border-b border-line bg-white/95 text-ink backdrop-blur"}`}>
      <div className="gutter mx-auto flex min-h-[72px] max-w-[1700px] items-center justify-between gap-6">
        <Link href="/" aria-label="Dreamtique Tourism, home" className="block shrink-0" onClick={() => setOpen(false)}>
          <Image src={dark ? "/brand/dt-logo-light.png" : "/brand/dt-logo-color.png"} alt="Dreamtique Tourism" width={387} height={134} priority className="h-[54px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined} className={`label relative py-2 transition-colors hover:text-red aria-[current=page]:text-red ${dark ? "text-white" : "text-ink"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Btn href="/contact#enquire" tone={dark ? "white" : "solid"} className="max-lg:hidden !min-h-[46px]">
            Plan your journey
          </Btn>
          <button type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)} className={`label inline-flex min-h-[46px] items-center gap-2 border px-4 lg:hidden ${dark ? "border-white text-white" : "border-ink bg-white/70 text-ink"}`}>
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            <span className="max-[380px]:sr-only">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="menu" aria-label="Menu" className="gutter fixed inset-x-0 bottom-0 top-[108px] overflow-y-auto bg-white pb-12 pt-8 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ul className="border-t border-line">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4 }} className="border-b border-line">
                  <Link href={l.href} onClick={() => setOpen(false)} className="display flex items-center justify-between py-4 text-[clamp(2.2rem,11vw,3.4rem)]">
                    {l.label}
                    <span className="label text-mute">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Btn href="/contact#enquire" className="mt-8 w-full">
              Plan your journey
            </Btn>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
