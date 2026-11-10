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

export const credits = [
  { title: "Dubai - Burj Al Arab - Sheikh-Zayed-Road", by: "giggel", licence: "CC BY 3.0", licenceUrl: "https://creativecommons.org/licenses/by/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=53250013" },
  { title: "Dubai Marina", by: "Francisco Anzola", licence: "CC BY 3.0", licenceUrl: "https://creativecommons.org/licenses/by/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=71405693" },
  { title: "Narikala fortress, Tbilisi, Georgia", by: "George Melashvili", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=12714763" },
  { title: "Tbilisi Peace Bridge and Kura River", by: "falco", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", page: "https://commons.wikimedia.org/w/index.php?curid=97801346" },
  { title: "Ushguli Svaneti Georgia", by: "Florian Pinel", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Ushguli_Svaneti_Georgia.JPG" },
  { title: "Monasterio de Tatev, Armenia", by: "Diego Delso", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Monasterio_de_Tatev,_Armenia,_2016-10-01,_DD_86-88_HDR.jpg" },
  { title: "Republic-square-Yerevan (27)", by: "23artashes", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=28415589" },
  { title: "Tbilisi life - Georgia Travel (video)", by: "Mostafameraji", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Tbilisi_life_-_Georgia_Travel_-_canon_camera_Eosm14_-_Creative_commons.ogv" },
];
