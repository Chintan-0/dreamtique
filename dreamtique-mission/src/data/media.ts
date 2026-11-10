// The full-screen picture behind each panel.
// To use real footage, drop a file in public/videos and set `video` (and a `poster` still) on the panel.
// A panel with no video shows its photograph with a slow camera drift.
export type PanelMedia = { image: string; alt: string; video?: string; poster?: string };

export const media = {
  hero: { image: "/images/dubai/burj-al-arab.jpg", alt: "A wing above the clouds", video: "/videos/hero-wing.webm", poster: "/videos/hero-wing.jpg" },
  dubai: { image: "/images/dubai/marina.jpg", alt: "The towers of Dubai Marina rising above the water" },
  georgia: { image: "/images/georgia/peace-bridge.jpg", alt: "The Peace Bridge over the Kura river in Tbilisi", video: "/videos/georgia-church.webm", poster: "/videos/georgia-church.jpg" },
  armenia: { image: "/images/armenia/tatev.jpg", alt: "Tatev monastery on a cliff above a green gorge" },
  explore: { image: "/images/dunes.jpg", alt: "Clouds seen from a plane", video: "/videos/clouds.webm", poster: "/videos/clouds.jpg" },
  custom: { image: "/images/georgia/ushguli.jpg", alt: "Stone towers in the mountains of Svaneti" },
  final: { image: "/images/armenia/republic-square.jpg", alt: "Republic Square in Yerevan" },
} satisfies Record<string, PanelMedia>;
