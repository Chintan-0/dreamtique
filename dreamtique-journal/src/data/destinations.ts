export type Destination = {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  tagline: string;
  overview: string;
  mustSee: string[];
  activities: string[];
};

export const destinations: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    region: "United Arab Emirates",
    lat: 25.2,
    lon: 55.3,
    image: "/images/dubai/marina.jpg",
    imageAlt: "The towers of Dubai Marina rising above the water",
    gallery: [
      { src: "/images/dubai/burj-al-arab.jpg", alt: "The Burj Al Arab hotel on the Dubai coast" },
      { src: "/images/dubai/marina.jpg", alt: "The towers of Dubai Marina rising above the water" },
    ],
    tagline: "Where the future is built beside the sea.",
    overview: "Dubai is a city of landmark architecture, beaches and desert horizons. We shape visits around your pace, from landmark days to quiet evenings, with chauffeur transfers between each stop.",
    mustSee: ["The Burj Al Arab and the Jumeirah coast", "Dubai Marina and its towers", "Landmarks and museums with a guide"],
    activities: ["Guided city tours", "Food experiences", "Outdoor and desert activities"],
  },
  {
    slug: "georgia",
    name: "Georgia",
    region: "The Caucasus",
    lat: 41.7,
    lon: 44.8,
    image: "/images/georgia/peace-bridge.jpg",
    imageAlt: "The Peace Bridge over the Kura river in Tbilisi",
    gallery: [
      { src: "/images/georgia/narikala.jpg", alt: "Narikala fortress above Tbilisi" },
      { src: "/images/georgia/ushguli.jpg", alt: "Stone towers of Ushguli in the Svaneti mountains" },
      { src: "/images/georgia/peace-bridge.jpg", alt: "The Peace Bridge over the Kura river in Tbilisi" },
    ],
    tagline: "Old towns, mountain villages and long tables.",
    overview: "From the old streets of Tbilisi and Narikala fortress to the stone towers of Svaneti, Georgia pairs culture with dramatic mountain scenery. Food and wine are part of every day.",
    mustSee: ["The old town and Narikala fortress in Tbilisi", "The Peace Bridge over the Kura", "Ushguli in Svaneti"],
    activities: ["Food and wine experiences", "Mountain and outdoor activities", "Cultural walks with a guide"],
  },
  {
    slug: "armenia",
    name: "Armenia",
    region: "The South Caucasus",
    lat: 40.2,
    lon: 44.5,
    image: "/images/armenia/tatev.jpg",
    imageAlt: "Tatev monastery on a cliff above a green gorge",
    gallery: [
      { src: "/images/armenia/tatev.jpg", alt: "Tatev monastery on a cliff above a green gorge" },
      { src: "/images/armenia/republic-square.jpg", alt: "Republic Square in Yerevan" },
    ],
    tagline: "Ancient stone above deep valleys.",
    overview: "Armenia's monasteries sit on cliffs and in quiet valleys, while Yerevan brings grand squares and lively streets. It is a compact country where culture and landscape sit side by side.",
    mustSee: ["Tatev monastery above its gorge", "Republic Square in Yerevan", "Historic sites with a guide"],
    activities: ["Cultural experiences and museums", "Guided tours of historic sites", "Scenic drives with a chauffeur"],
  },
];
