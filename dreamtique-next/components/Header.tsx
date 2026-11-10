"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { ButtonLink } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = nav.slice(0, 5);
  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-bg">
      <div className="gutter flex min-h-[76px] items-center justify-between gap-6">
        {/* the logo image is cropped to the wordmark and blended into the page */}
        <Link href="/" aria-label="Dreamtique Tourism, home" className="relative block h-[68px] w-[200px] shrink-0 overflow-hidden">
          <Image
            src="/Final-Logo-1.webp"
            alt="Dreamtique Tourism"
            width={500}
            height={500}
            priority
            className="absolute -left-[34px] -top-[97px] h-auto w-[263px] max-w-none mix-blend-multiply"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current(l.href) ? "page" : undefined}
              className="py-2 font-medium transition-colors hover:text-accent aria-[current=page]:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="min-h-[46px] px-5">
            Plan your journey
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 bg-ink px-4 font-medium text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          <span className="max-[380px]:sr-only">Menu</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full overflow-hidden bg-bg lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="gutter grid pb-6 pt-2">
              {nav.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-xl font-medium">
                  {l.label}
                </Link>
              ))}
              <ButtonLink href="/contact" className="mt-3 justify-center">
                Plan your journey
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
