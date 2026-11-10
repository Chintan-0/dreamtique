import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import type { Tone } from "@/lib/content";

export const toneClass: Record<Tone, string> = {
  blue: "bg-blue text-white",
  sky: "bg-sky text-ink",
  navy: "bg-navy text-navy-ink",
  surface: "bg-surface text-ink",
  red: "bg-accent text-white",
};

/** The motif: the logo's map pin, as a small filled mark. */
export function PinDot({ className = "" }: { className?: string }) {
  return <i aria-hidden className={`pin-clip inline-block h-[0.92em] w-[0.72em] shrink-0 bg-current ${className}`} />;
}

/** SVG defs for the pin clip path. Rendered once in the layout. */
export function PinDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <clipPath id="pin" clipPathUnits="objectBoundingBox">
          <path d="M0.5 1 C0.34 0.82 0.02 0.6 0.02 0.36 C0.02 0.16 0.23 0 0.5 0 C0.77 0 0.98 0.16 0.98 0.36 C0.98 0.6 0.66 0.82 0.5 1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const btnBase =
  "inline-flex min-h-[52px] items-center gap-3 px-7 text-[1.0625rem] font-medium leading-none transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 active:translate-y-0";

const btnTone = {
  accent: "bg-accent text-white hover:bg-accent-dark",
  ink: "bg-ink text-white hover:bg-[#1b3358]",
  light: "bg-white text-ink hover:bg-sky",
} as const;

export function ButtonLink({
  href,
  children,
  tone = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof btnTone;
  className?: string;
}) {
  return (
    <Link href={href} className={`${btnBase} ${btnTone[tone]} ${className}`}>
      <MapPin aria-hidden size={18} strokeWidth={2.4} className={tone === "light" ? "text-accent" : ""} />
      {children}
    </Link>
  );
}

export function PinList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-3">
          <PinDot className="text-accent [.on-dark_&]:text-current [.bg-blue_&]:text-current [.bg-accent_&]:text-current" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** A photograph cut to the pin shape. The parent sets the width. */
export function PinImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 30vw, 70vw",
  bg = "bg-accent",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  bg?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`pin-clip relative aspect-[4/5] ${bg} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
