// No package prices are published. Every package enquiry is directed to the company.

export type PackageCollection = {
  slug: string;
  name: string;
  line: string;
  image: string;
  imageAlt: string;
  highlights: string[];
};

export const packageCollections: PackageCollection[] = [
  {
    slug: "luxury",
    name: "Luxury",
    line: "Luxury getaways",
    image: "/images/dubai/burj-al-arab.jpg",
    imageAlt: "The Burj Al Arab hotel on the Dubai coast",
    highlights: ["Luxury hotels and resorts", "Chauffeur-driven transfers", "Tailored itinerary"],
  },
  {
    slug: "cultural",
    name: "Cultural",
    line: "Cultural experiences",
    image: "/images/georgia/narikala.jpg",
    imageAlt: "Narikala fortress above Tbilisi",
    highlights: ["Museums and landmarks", "Guided tours", "Food and wine experiences"],
  },
  {
    slug: "adventure",
    name: "Adventure",
    line: "Adventure travel",
    image: "/images/georgia/ushguli.jpg",
    imageAlt: "Stone towers of Ushguli in the Svaneti mountains",
    highlights: ["Outdoor activities", "Mountain scenery", "Expert recommendations"],
  },
];

export const packageIncludes = [
  { title: "Stay", text: "Luxury hotels and resorts, or budget-friendly options." },
  { title: "Experiences", text: "Guided tours, museums and landmarks, food and wine, outdoor activities." },
  { title: "Paperwork", text: "Visa application assistance and document processing." },
  { title: "Transport", text: "Airport transfers, hourly chauffeurs and city-to-city transfers." },
];

export const journalTopics = [
  { title: "Travel tips", text: "Advice for planning and enjoying your trip." },
  { title: "Destination guides", text: "In-depth guides to popular destinations." },
  { title: "Travel planning advice", text: "How to plan an itinerary that fits you." },
  { title: "Industry news", text: "Updates on travel and tourism trends." },
  { title: "Packing and preparation", text: "What to bring and how to get ready." },
];

