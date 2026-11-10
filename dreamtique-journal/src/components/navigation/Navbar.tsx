"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Compass, Home, Layers, Mail, Menu, X } from "lucide-react";
import { nav } from "@/data/company";
import { PinMark } from "@/components/ui/PinMark";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Dreamtique Tourism, home" className={cn("group flex items-center gap-3", className)}>
      <PinMark draw={false} glow={false} className="h-9 w-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" />
      <span className="leading-none">
        <span className="block text-[1.3rem] font-bold tracking-[-0.02em]">
          DREAM<span className="text-brand-red">TIQUE</span>
        </span>
        <span className="mt-1 block text-[0.75rem] font-medium tracking-[0.5em] text-electric-soft">TOURISM</span>
      </span>
    </Link>
  );
}

const dock = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/destinations", label: "Explore", Icon: Compass },
  { href: "/services", label: "Discover", Icon: Layers },
  { href: "/contact", label: "Contact", Icon: Mail },
];

/** Logo and menu stay at the top; a floating dock holds the four main places at the thumb. On desktop the top bar becomes a floating pill. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30);
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

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-9 z-50 px-3 pt-3 sm:px-5">
        <div className={cn("mx-auto flex max-w-[1500px] items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 transition-all duration-500 lg:pl-6", solid ? "glass !bg-none !bg-midnight/85" : "bg-transparent")}>
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined} className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/15 aria-[current=page]:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/booking" className="inline-flex min-h-[46px] items-center rounded-full bg-brand-red px-5 text-[0.95rem] font-medium text-white shadow-glow-red transition-colors hover:bg-[#f23842] max-sm:hidden">
              Plan Your Journey
            </Link>
            <button type="button" aria-expanded={open} aria-controls="menu-sheet" onClick={() => setOpen((o) => !o)} className="glass inline-flex min-h-[46px] items-center gap-2 rounded-full px-4 font-medium lg:hidden">
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              <span className="max-[380px]:sr-only">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav id="menu-sheet" aria-label="Menu" className="gutter fixed inset-0 z-[55] overflow-y-auto bg-midnight/97 pb-32 pt-36 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid gap-1">
              {nav.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.5 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[clamp(1.75rem,8vw,2.5rem)] font-bold tracking-tight">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link href="/booking" onClick={() => setOpen(false)} className="mt-8 inline-flex min-h-[56px] items-center rounded-full bg-brand-red px-8 font-medium shadow-glow-red">
              Plan Your Journey
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      <nav aria-label="Quick navigation" className="safe-bottom fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 lg:hidden">
        <ul className="glass flex w-full max-w-[460px] items-center justify-between rounded-full !bg-none !bg-midnight/80 p-1.5 shadow-glow">
          {dock.map(({ href, label, Icon }) => {
            const on = current(href);
            return (
              <li key={href} className="flex-1">
                <Link href={href} aria-current={on ? "page" : undefined} className={cn("flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-full text-[0.8125rem] font-medium transition-colors", on ? "bg-white text-midnight" : "text-white/80 hover:text-white")}>
                  <Icon size={20} aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
