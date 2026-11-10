export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** True when the visitor asks for less motion, or the device is a touch device (heavier effects are trimmed). */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export const whatsappLink = (base: string, text: string) => `${base}?text=${encodeURIComponent(text)}`;
