import gsap from "gsap";

/** Hero entrance: eyebrow, headline lines, copy, actions and selector rise in on one timeline. */
export function heroIntro(scope: HTMLElement, delay = 0) {
  const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });
  tl.from(scope.querySelectorAll("[data-hero-line]"), { yPercent: 120, duration: 1.2, stagger: 0.14 })
    .from(scope.querySelectorAll("[data-hero-fade]"), { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7")
    .from(scope.querySelectorAll("[data-hero-chip]"), { y: 20, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.6");
  return tl;
}
