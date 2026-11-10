"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Rises into view once. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "span" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </Tag>
  );
}

/** The map-pin from the logo, as a small marker. */
export function PinDot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 26" aria-hidden className={`h-[1.1em] w-auto shrink-0 ${className}`}>
      <path d="M10 25C6 19 .5 14.5 .5 9.5A9.5 9.5 0 0 1 19.5 9.5C19.5 14.5 14 19 10 25Z" fill="#d4202c" />
      <circle cx="10" cy="9.5" r="3.6" fill="#fff" />
    </svg>
  );
}

/** A small capital label with the pin. */
export function Label({ children, className = "", light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`label flex items-center gap-2.5 ${light ? "text-white" : "text-ink"} ${className}`}>
      <PinDot />
      {children}
    </p>
  );
}

const styles = {
  solid: "border-ink bg-ink text-white hover:border-red hover:bg-red",
  line: "border-ink bg-white/60 text-ink hover:bg-ink hover:text-white",
  white: "border-white bg-white text-ink hover:border-red hover:bg-red hover:text-white",
  ghost: "border-white bg-transparent text-white hover:bg-white hover:text-ink",
} as const;

/** Hard-edged capital button. */
export function Btn({ href, children, tone = "solid", external, className = "" }: { href: string; children: ReactNode; tone?: keyof typeof styles; external?: boolean; className?: string }) {
  const cls = `label inline-flex min-h-[52px] items-center justify-center border px-7 text-center transition-colors duration-300 ${styles[tone]} ${className}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
