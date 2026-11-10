// All copy comes from the client's Word document (DREAMTIQUE TOURISM.docx).
// Contact details were taken from the existing site with the client's approval.

export const site = {
  name: "Dreamtique Tourism",
  url: "https://dreamtiquetourism.com",
  tagline: "Unforgettable journeys, crafted with passion",
  email: "info@dreamtiquetourism.com",
  phones: ["+971 54490 9184", "+971 52617 2795"],
  address: "Office 101 519, MASHREQ, Al Suq Al Kabeer, Dubai, United Arab Emirates",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export type Tone = "blue" | "sky" | "navy" | "surface" | "red";

export type Service = {
  slug: string;
  name: string;
  tone: Tone;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  { slug: "hotel-bookings", name: "Hotel bookings", tone: "blue", summary: "Stays that suit the trip and the budget, anywhere we plan a journey.", items: ["Luxury hotels and resorts", "Budget-friendly options", "Global coverage"] },
  { slug: "tourism-packages", name: "Tourism packages", tone: "sky", summary: "Pre-designed or customized packages for every kind of traveler.", items: ["Customized itineraries", "Cultural experiences", "Adventure travel", "Romantic getaways"] },
  { slug: "attractions-experiences", name: "Attractions and experiences", tone: "navy", summary: "The sights, tastes and outdoor days that make a destination worth visiting.", items: ["Guided tours", "Museums and landmarks", "Food and wine experiences", "Outdoor activities"] },
  { slug: "itinerary-planning", name: "Travel itinerary planning", tone: "surface", summary: "A plan built around you, with expert recommendations and updates as things change.", items: ["Personalized travel plans", "Expert recommendations", "Real-time updates"] },
  { slug: "visa-services", name: "Visa services", tone: "red", summary: "Help with the paperwork so a visa never stands between you and the trip.", items: ["Visa application assistance", "Document processing", "Global visa expertise"] },
  { slug: "chauffeur-services", name: "Chauffeur services", tone: "blue", summary: "Luxury vehicles and professional chauffeurs for every leg of the journey.", items: ["Luxury vehicles", "Professional chauffeurs", "Airport transfers", "Hourly chauffeurs", "City-to-city transfers"] },
];

export type Destination = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  color: string;
  lat: number;
  lon: number;
  tagline: string;
  blurb: string;
  mustSee: string[];
  activities: string[];
};

export const destinations: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    image: "/assets/dubai-skyline-unsplash.jpg",
    alt: "Dubai skyline with the Burj Khalifa reflected in the water at night",
    color: "#d4202c",
    lat: 25.2,
    lon: 55.3,
    tagline: "A modern city with an older harbour at its heart.",
    blurb: "A skyline led by the Burj Khalifa, the old creek with its wooden dhows, and desert beyond the city. Our guides cover the must-see sights and the best activities.",
    mustSee: ["Burj Khalifa and the downtown skyline", "Dubai Creek and its wooden dhows"],
    activities: ["City tours and guided experiences", "Outdoor and desert activities"],
  },
  {
    slug: "georgia",
    name: "Georgia",
    image: "/assets/tbilisi-old-town-georgia.jpg",
    alt: "Old Tbilisi houses with balconies along the Kura river",
    color: "#1f5aa6",
    lat: 41.7,
    lon: 44.8,
    tagline: "Old towns, vineyards and the high Caucasus.",
    blurb: "Balconied streets in the old town of Tbilisi, and high Caucasus scenery around Kazbegi. Food, wine and mountain air.",
    mustSee: ["The old town of Tbilisi", "Gergeti Trinity Church above Kazbegi"],
    activities: ["Food and wine experiences", "Mountain and outdoor activities"],
  },
  {
    slug: "armenia",
    name: "Armenia",
    image: "/assets/khor-virap-monastery-and-mount-ararat-armenia.jpg",
    alt: "Khor Virap monastery with snow-capped Mount Ararat behind",
    color: "#0b1b33",
    lat: 40.2,
    lon: 44.5,
    tagline: "Ancient monasteries beneath Mount Ararat.",
    blurb: "Ancient monasteries such as Khor Virap, set against the snow of Mount Ararat. Culture and landscape in one short journey.",
    mustSee: ["Khor Virap monastery", "Views of Mount Ararat"],
    activities: ["Cultural experiences and museums", "Guided tours of historic sites"],
  },
];

export const images = {
  dubai: { src: "/assets/dubai-skyline-unsplash.jpg", alt: destinations[0].alt },
  dhow: { src: "/assets/dhow-on-dubai-creek.jpg", alt: "A wooden dhow on Dubai Creek" },
  tbilisi: { src: "/assets/tbilisi-old-town-georgia.jpg", alt: destinations[1].alt },
  georgia: { src: "/assets/gergeti-trinity-church-kazbegi-georgia-36130111370.jpg", alt: "Gergeti Trinity Church on a hill below the Caucasus mountains" },
  armenia: { src: "/assets/khor-virap-monastery-and-mount-ararat-armenia.jpg", alt: destinations[2].alt },
};

export const video = {
  src: "/assets/tbilisi-life-georgia-travel-canon-camera-eosm10.webm",
  poster: "/assets/tbilisi-life-georgia-travel-canon-camera-eosm10-poster.jpg",
};

export const faq = [
  { q: "Which services does Dreamtique Tourism offer?", a: "Hotel bookings, tourism packages, attractions and experiences, travel itinerary planning, visa services and chauffeur services." },
  { q: "Can you help with my visa?", a: "Yes. We assist with visa applications and document processing, with expertise across many countries." },
  { q: "What kinds of chauffeur service do you offer?", a: "Airport transfers, hourly chauffeurs and city-to-city transfers, with luxury vehicles and professional chauffeurs." },
  { q: "Which destinations do you cover?", a: "Our popular destinations include Dubai, Georgia and Armenia, and we plan journeys beyond them on request." },
  { q: "Can I get a package made just for me?", a: "Yes. Our customized packages are built around your destination, dates and interests, from cultural experiences to adventure travel and romantic getaways." },
  { q: "Will someone be available during my trip?", a: "Yes. We provide 24/7 customer support, so help is available while you travel." },
];

export const values = [
  ["Customer delight", "We exceed expectations through personalized attention and build lasting relationships on trust."],
  ["Quality excellence", "We keep the highest standards in planning, accommodation and transportation."],
  ["Innovation", "We embrace technology for smooth travel and stay ahead of industry trends."],
  ["Expertise", "Experienced professionals with in-depth knowledge of destinations."],
  ["Integrity", "Transparency, honesty and ethics, with client confidentiality and data protection."],
  ["Sustainability", "We promote eco-friendly travel and work with responsible suppliers."],
  ["Collaboration", "Open communication and teamwork among staff and partners."],
  ["Passion", "We share our love of travel and inspire curiosity and wonder."],
  ["Accountability", "We take ownership of mistakes and resolve issues promptly."],
  ["Community", "We support local communities through responsible tourism."],
] as const;

export const steps = [
  { name: "Planned", text: "We design a personalized itinerary with expert recommendations and destination guidance.", image: "tbilisi" },
  { name: "Prepared", text: "Hotels are booked, visas and documents are handled, and your plan updates in real time.", image: "dhow" },
  { name: "Travelled", text: "A professional chauffeur meets you, and 24/7 support stays with you until you are home.", image: "dubai" },
] as const;

export const credits = [
  { title: "Tbilisi, Old town, Georgia", by: "Vyacheslav Argenberg", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0", page: "https://commons.wikimedia.org/wiki/File:Tbilisi,_Old_town,_Georgia.jpg" },
  { title: "Dhow on Dubai Creek", by: "A.Davey", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Dhow_on_Dubai_Creek.jpg" },
  { title: "Khor Virap Monastery and Mount Ararat, Armenia", by: "Andrew Behesnilian (MrAndrew47)", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Khor_Virap_Monastery_and_Mount_Ararat,_Armenia.jpg" },
  { title: "Dubai skyline unsplash", by: "Robert Bock", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg" },
  { title: "Gergeti Trinity Church. Kazbegi, Georgia", by: "Stefan Wisselink", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Gergeti_Trinity_Church._Kazbegi,_Georgia_(36130111370).jpg" },
  { title: "Tbilisi life - Georgia Travel (video)", by: "Mostafameraji", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Tbilisi_life_-_Georgia_Travel_-_canon_camera_Eosm10_-_Creative_commons.ogv" },
];
