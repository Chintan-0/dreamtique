// A sample catalogue so the marketplace layout is seen at full density. Titles describe real places and activities
// from the supplied service categories. There are no prices or ratings: every experience is enquiry-only.
// The company should confirm or replace these before launch.

export type Destination = "dubai" | "georgia" | "armenia";
export type ExperienceType = "Guided tour" | "Landmark" | "Food and wine" | "Outdoor";

export type Experience = {
  slug: string;
  title: string;
  destination: Destination;
  type: ExperienceType;
  image: string;
  alt: string;
  blurb: string;
  chauffeur: boolean;
};

export const destinationInfo: Record<
  Destination,
  { slug: Destination; name: string; country: string; image: string; alt: string; tagline: string; overview: string; mustSee: string[]; activities: string[] }
> = {
  dubai: {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/images/marina.jpg",
    alt: "The towers of Dubai Marina rising above the water",
    tagline: "Landmark towers, an old creek and the open desert.",
    overview: "Dubai pairs landmark architecture and beaches with an older harbour and desert horizons. We shape visits around your pace, with chauffeur transfers between each stop.",
    mustSee: ["The Burj Al Arab and the Jumeirah coast", "Dubai Marina and its towers", "Dubai Creek and old Dubai", "The Dubai Frame"],
    activities: ["Guided city tours", "Food experiences", "Outdoor and desert activities"],
  },
  georgia: {
    slug: "georgia",
    name: "Georgia",
    country: "The Caucasus",
    image: "/images/peace-bridge.jpg",
    alt: "The Peace Bridge over the Kura river in Tbilisi",
    tagline: "Old towns, mountain villages and long tables.",
    overview: "From the old streets of Tbilisi and Narikala fortress to the stone towers of Svaneti and the church above Kazbegi, Georgia pairs culture with mountain scenery. Food and wine are part of every day.",
    mustSee: ["The old town and Narikala fortress in Tbilisi", "The Peace Bridge over the Kura", "The sulfur bath district", "Gergeti Trinity Church above Kazbegi", "Ushguli in Svaneti"],
    activities: ["Food and wine experiences", "Mountain and outdoor activities", "Cultural walks with a guide"],
  },
  armenia: {
    slug: "armenia",
    name: "Armenia",
    country: "The South Caucasus",
    image: "/images/tatev.jpg",
    alt: "Tatev monastery on a cliff above a green gorge",
    tagline: "Ancient stone above deep valleys.",
    overview: "Armenia's monasteries and temples sit on cliffs and in quiet valleys, while Yerevan brings grand squares and lively streets. It is a compact country where culture and landscape sit side by side.",
    mustSee: ["Tatev monastery above its gorge", "Garni temple", "Lake Sevan", "Republic Square in Yerevan"],
    activities: ["Cultural experiences and museums", "Guided tours of historic sites", "Scenic drives with a chauffeur"],
  },
};

export const destinationList = Object.values(destinationInfo);

export const experiences: Experience[] = [
  { slug: "burj-al-arab-jumeirah-coast", title: "Burj Al Arab and the Jumeirah coast", destination: "dubai", type: "Landmark", image: "/images/burj-al-arab.jpg", alt: "The Burj Al Arab hotel on the Dubai coast", blurb: "See Dubai's most famous hotel from the coast road, with time to stop for photographs.", chauffeur: true },
  { slug: "dubai-marina-evening", title: "Dubai Marina evening", destination: "dubai", type: "Guided tour", image: "/images/marina.jpg", alt: "The towers of Dubai Marina rising above the water", blurb: "A guided evening among the Marina's towers and waterfront.", chauffeur: true },
  { slug: "old-dubai-creek-abra", title: "Old Dubai and the Creek by abra", destination: "dubai", type: "Guided tour", image: "/images/abra.jpg", alt: "An abra boat on Dubai Creek", blurb: "Cross the creek on a traditional abra and walk the old districts with a guide.", chauffeur: true },
  { slug: "dubai-frame-landmarks", title: "Dubai Frame and city landmarks", destination: "dubai", type: "Landmark", image: "/images/dubai-frame.jpg", alt: "The Dubai Frame observation deck", blurb: "Look across old and new Dubai from the Frame, then visit nearby landmarks.", chauffeur: true },
  { slug: "dubai-desert-dunes", title: "Desert and dune adventure", destination: "dubai", type: "Outdoor", image: "/images/dunes.jpg", alt: "A car driving over a sand dune in the Dubai desert", blurb: "Head into the dunes for an outdoor day in the desert.", chauffeur: true },
  { slug: "old-tbilisi-walk", title: "Old Tbilisi walking tour", destination: "georgia", type: "Guided tour", image: "/images/narikala.jpg", alt: "Narikala fortress above old Tbilisi", blurb: "Balconied streets, churches and viewpoints with a local guide.", chauffeur: true },
  { slug: "peace-bridge-kura", title: "Peace Bridge and the Kura river", destination: "georgia", type: "Landmark", image: "/images/peace-bridge.jpg", alt: "The Peace Bridge over the Kura river in Tbilisi", blurb: "Walk the glass-and-steel bridge and the riverside between old and new Tbilisi.", chauffeur: true },
  { slug: "tbilisi-sulfur-baths", title: "The sulfur bath district", destination: "georgia", type: "Landmark", image: "/images/sulfur-baths.jpg", alt: "The domed sulfur bath houses of Tbilisi", blurb: "Visit Abanotubani, Tbilisi's historic district of domed bath houses.", chauffeur: true },
  { slug: "georgian-food-wine", title: "Georgian food and wine experience", destination: "georgia", type: "Food and wine", image: "/images/narikala.jpg", alt: "Narikala fortress above old Tbilisi", blurb: "A long table of Georgian dishes and wines, arranged around your tastes.", chauffeur: true },
  { slug: "kazbegi-gergeti", title: "Kazbegi and Gergeti Trinity Church", destination: "georgia", type: "Outdoor", image: "/images/gergeti.jpg", alt: "Gergeti Trinity Church on a hill below the Caucasus mountains", blurb: "A mountain day to the church above Kazbegi, with scenery all the way.", chauffeur: true },
  { slug: "ushguli-svaneti", title: "Svaneti and the villages of Ushguli", destination: "georgia", type: "Outdoor", image: "/images/ushguli.jpg", alt: "Stone towers of Ushguli in the Svaneti mountains", blurb: "Stone towers and high valleys in one of Georgia's most remote regions.", chauffeur: true },
  { slug: "tatev-monastery", title: "Tatev monastery", destination: "armenia", type: "Guided tour", image: "/images/tatev.jpg", alt: "Tatev monastery on a cliff above a green gorge", blurb: "A monastery on a cliff above a deep gorge, visited with a guide.", chauffeur: true },
  { slug: "garni-temple", title: "Garni temple", destination: "armenia", type: "Landmark", image: "/images/garni.jpg", alt: "The columns of Garni temple in Armenia", blurb: "An ancient colonnaded temple in the Armenian hills.", chauffeur: true },
  { slug: "lake-sevan", title: "Lake Sevan", destination: "armenia", type: "Outdoor", image: "/images/sevan.jpg", alt: "Lake Sevan in Armenia", blurb: "A day beside Armenia's great mountain lake.", chauffeur: true },
  { slug: "yerevan-republic-square", title: "Yerevan city tour", destination: "armenia", type: "Guided tour", image: "/images/republic-square.jpg", alt: "Republic Square in Yerevan", blurb: "Republic Square, museums and lively streets in Armenia's capital.", chauffeur: true },
];

export const experienceTypes: ExperienceType[] = ["Guided tour", "Landmark", "Food and wine", "Outdoor"];

export const packageCollections = [
  { slug: "luxury", name: "Luxury getaways", image: "/images/burj-al-arab.jpg", alt: "The Burj Al Arab hotel on the Dubai coast", highlights: ["Luxury hotels and resorts", "Chauffeur-driven transfers", "A tailored itinerary"] },
  { slug: "cultural", name: "Cultural experiences", image: "/images/narikala.jpg", alt: "Narikala fortress above old Tbilisi", highlights: ["Museums and landmarks", "Guided tours", "Food and wine experiences"] },
  { slug: "adventure", name: "Adventure travel", image: "/images/ushguli.jpg", alt: "Stone towers of Ushguli in the Svaneti mountains", highlights: ["Outdoor activities", "Mountain scenery", "Expert recommendations"] },
];
