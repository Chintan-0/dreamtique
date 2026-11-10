// Source of truth: the supplied company document and the contact details approved for reuse.
// Not invented: prices, ratings, reviews, guest counts, awards, team or founder details.

export const site = {
  name: "Dreamtique Tourism",
  url: "https://dreamtiquetourism.com",
  founded: 2024,
  headline: "Unforgettable Journeys, Crafted with Passion",
  email: "info@dreamtiquetourism.com",
  phones: ["+971 54490 9184", "+971 52617 2795"],
  whatsapp: "https://wa.me/971544909184",
  address: "Office 101 519, MASHREQ, Al Suq Al Kabeer, Dubai, United Arab Emirates",
};

export const nav = [
  { href: "/experiences", label: "Experiences" },
  { href: "/destinations", label: "Destinations" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type ServiceKey = "hotels" | "packages" | "experiences" | "itineraries" | "visas" | "chauffeur";

export const categories: { key: ServiceKey; label: string; href: string; blurb: string; items: string[]; tone: string }[] = [
  { key: "hotels", label: "Hotels", href: "/services#hotels", blurb: "Luxury hotels and resorts, or budget-friendly options.", items: ["Luxury hotels and resorts", "Budget-friendly options", "Global coverage"], tone: "bg-sky text-ink" },
  { key: "packages", label: "Packages", href: "/packages", blurb: "Cultural, adventure and romantic journeys.", items: ["Customized itineraries", "Cultural experiences", "Adventure travel", "Romantic getaways"], tone: "bg-[#ffe9c2] text-ink" },
  { key: "experiences", label: "Experiences", href: "/experiences", blurb: "Guided tours, landmarks, food and outdoor activities.", items: ["Guided tours", "Museums and landmarks", "Food and wine experiences", "Outdoor activities"], tone: "bg-[#d9f3e8] text-ink" },
  { key: "itineraries", label: "Itineraries", href: "/services#itineraries", blurb: "Personalized plans and expert recommendations.", items: ["Personalized travel plans", "Expert recommendations", "Real-time updates"], tone: "bg-[#fde0e2] text-ink" },
  { key: "visas", label: "Visas", href: "/services#visas", blurb: "Application assistance and document processing.", items: ["Visa application assistance", "Document processing", "Global visa expertise"], tone: "bg-[#e7e1fb] text-ink" },
  { key: "chauffeur", label: "Chauffeur", href: "/services#chauffeur", blurb: "Luxury vehicles, airport transfers and professional chauffeurs.", items: ["Luxury vehicles", "Professional chauffeurs", "Airport transfers", "Hourly chauffeurs", "City-to-city transfers"], tone: "bg-ink text-white" },
];

export const welcome =
  "Founded in 2024, Dreamtique Tourism is a premier travel company dedicated to crafting unforgettable journeys and providing exceptional chauffeur services. Our mission is to empower travelers to explore the world with ease, luxury and personalized attention.";
export const story =
  "Dreamtique Tourism was born from a passion for travel and a commitment to excellence. Our team of experienced travel professionals and chauffeur experts came together to create a unique travel experience that combines the finest accommodations, expert guidance and seamless transportation.";
export const vision =
  "To become the leading provider of bespoke travel experiences, harmoniously blending luxury, culture and adventure. We aim to inspire a sense of wonder, fostering meaningful connections between people, places and cultures, and to create lifelong memories for our discerning clients.";
export const mission = {
  intro: "To empower travelers to explore the world with confidence and style. We promise to:",
  promises: ["Deliver tailored travel itineraries", "Provide expert visa and travel documentation services", "Offer luxurious chauffeur-driven experiences", "Ensure 24/7 customer support"],
};

export const why = [
  { title: "Global expertise", text: "Our team has extensive knowledge of global destinations." },
  { title: "Personalized attention", text: "We tailor our services to meet your unique needs." },
  { title: "Quality guarantee", text: "We ensure the highest standards in accommodations and transportation." },
  { title: "Seamless experience", text: "We handle every detail, from booking to departure." },
];

export const values = [
  ["Customer delight", "Exceed expectations through personalized attention and lasting trust."],
  ["Quality excellence", "The highest standards in planning, accommodation and transportation."],
  ["Innovation", "Technology and fresh ideas for smoother travel."],
  ["Expertise", "Experienced professionals with in-depth destination knowledge."],
  ["Integrity", "Transparency, honesty, confidentiality and data protection."],
  ["Sustainability", "Eco-friendly travel and responsible suppliers."],
  ["Collaboration", "Open communication and teamwork with staff and partners."],
  ["Passion", "A love of travel that inspires curiosity and wonder."],
  ["Accountability", "Ownership of mistakes and prompt solutions."],
  ["Community", "Responsible tourism that supports local communities."],
] as const;

export const faq = [
  { q: "Which services does Dreamtique Tourism offer?", a: "Hotel bookings, tourism packages, attractions and experiences, travel itinerary planning, visa services and chauffeur services." },
  { q: "How do I get a price?", a: "Send an enquiry with your destination, dates and service. We follow up with availability and a quotation." },
  { q: "Can you help with my visa?", a: "Yes. We assist with visa applications and document processing, with expertise across many countries." },
  { q: "What kinds of chauffeur service do you offer?", a: "Airport transfers, hourly chauffeurs and city-to-city transfers, with luxury vehicles and professional chauffeurs." },
  { q: "Which destinations do you cover?", a: "Our popular destinations include Dubai, Georgia and Armenia. Other destinations can be requested." },
  { q: "Will someone be available during my trip?", a: "Yes. We provide 24/7 customer support, so help is available while you travel." },
];

export const credits = [
  { title: "Dubai - Burj Al Arab - Sheikh-Zayed-Road", by: "giggel", licence: "CC BY 3.0", licenceUrl: "https://creativecommons.org/licenses/by/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=53250013" },
  { title: "Dubai Marina", by: "Francisco Anzola", licence: "CC BY 3.0", licenceUrl: "https://creativecommons.org/licenses/by/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=71405693" },
  { title: "A car on Dubai Dune bashing", by: "iMahesh", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:A_car_on_Dubai_Dune_bashing.jpg" },
  { title: "Abra at Dubai Creek (Old Dubai)", by: "selmaperictuzla", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Abra_at_Dubai_Creek_(_Old_Dubai_).jpg" },
  { title: "The Dubai Frame Observation Deck", by: "Richard N Horne", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:The_Dubai_Frame_Observation_Deck_in_Dubai,_United_Arab_Emirates.jpg" },
  { title: "Narikala fortress, Tbilisi, Georgia", by: "George Melashvili", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=12714763" },
  { title: "Tbilisi Peace Bridge and Kura River", by: "falco", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", page: "https://commons.wikimedia.org/w/index.php?curid=97801346" },
  { title: "Tbilisi Sulfur baths", by: "Art Anderson", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=48505466" },
  { title: "Gergeti Trinity Church with Mountain Backdrop", by: "Adam Jones", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/", page: "https://commons.wikimedia.org/wiki/File:Gergeti_Trinity_Church_with_Mountain_Backdrop_-_Outside_Kazbegi_-_Georgia_-_01_(18562272796)_(2).jpg" },
  { title: "Ushguli Svaneti Georgia", by: "Florian Pinel", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Ushguli_Svaneti_Georgia.JPG" },
  { title: "Monasterio de Tatev, Armenia", by: "Diego Delso", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Monasterio_de_Tatev,_Armenia,_2016-10-01,_DD_86-88_HDR.jpg" },
  { title: "Templo de Garni, Armenia", by: "Diego Delso", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Templo_de_Garni,_Armenia,_2016-10-02,_DD_03.jpg" },
  { title: "Lake Sevan 011", by: "Dav Sargsyan", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Lake_Sevan_011.jpg" },
  { title: "Republic-square-Yerevan (27)", by: "23artashes", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/w/index.php?curid=28415589" },
];
