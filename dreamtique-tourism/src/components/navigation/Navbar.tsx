"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/company";
import { PinMark } from "@/components/ui/PinMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Dreamtique Tourism, home" className={cn("group flex items-center gap-3", className)}>
      <PinMark draw={false} glow={false} className="h-9 w-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" />
      <span className="leading-none">
        <span className="block text-[1.35rem] font-bold tracking-[-0.02em]">
          DREAM<span className="text-brand-red">TIQUE</span>
        </span>
        <span className="mt-1 block text-[0.7rem] font-medium tracking-[0.5em] text-electric-soft">TOURISM</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("fixed inset-x-0 top-9 z-50 transition-all duration-500", solid ? "glass !border-x-0 !border-t-0 !bg-none !bg-midnight/90 py-2" : "py-4")}>
      <div className="gutter flex items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {nav.slice(0, 7).map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined} className="relative py-2 text-[0.95rem] font-medium text-white/80 transition-colors hover:text-white aria-[current=page]:text-white">
              {l.label}
              {current(l.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 mx-auto h-[3px] w-6 rounded-full bg-brand-red shadow-glow-red" />}
            </Link>
          ))}
          <Button href="/booking" className="!min-h-[46px] !px-5 text-[0.95rem]">
            Plan Your Journey
          </Button>
        </nav>
        <button type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)} className="glass inline-flex min-h-[46px] items-center gap-2 rounded-full px-5 font-medium xl:hidden">
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="gutter absolute inset-x-0 top-full h-[calc(100svh-72px)] overflow-y-auto bg-midnight/95 pb-10 pt-6 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid gap-1">
              {nav.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[2rem] font-bold tracking-tight">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/booking">Plan Your Journey</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
