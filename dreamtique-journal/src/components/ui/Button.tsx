"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/animations/interactions";
import { cn } from "@/lib/utils";

const tones = {
  red: "bg-brand-red text-white shadow-glow-red hover:bg-[#f23842]",
  electric: "bg-electric text-midnight shadow-glow hover:bg-electric-soft",
  glass: "glass text-white hover:bg-white/15",
  ink: "bg-ink text-ivory hover:bg-deep",
  ivory: "bg-ivory text-ink hover:bg-white",
} as const;

/** A call-to-action with a magnetic pull toward the pointer on desktop. */
export function Button({
  href,
  children,
  tone = "red",
  className,
  external,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();
  const cls = cn(
    "group relative inline-flex min-h-[54px] items-center gap-3 rounded-full px-7 text-[1.0625rem] font-medium leading-none transition-colors duration-300",
    tones[tone],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight aria-hidden size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </>
  );
  if (external) {
    return (
      <a ref={ref} href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls}>
      {inner}
    </Link>
  );
}
