export type Service = {
  slug: string;
  name: string;
  short: string;
  detail: string;
  items: string[];
  image: string;
  imageAlt: string;
  accent: string; // each service has its own visual identity
  glow: string;
};

export const services: Service[] = [
  {
    slug: "hotel-bookings",
    name: "Hotel Bookings",
    short: "Luxury hotels, resorts and budget-friendly options.",
    detail: "Stays chosen to suit the journey and the budget, with global coverage.",
    items: ["Luxury hotels and resorts", "Budget-friendly options", "Global coverage"],
    image: "/images/dubai/burj-al-arab.jpg",
    imageAlt: "The Burj Al Arab hotel on the Dubai coast",
    accent: "#3d8bff",
    glow: "rgba(61,139,255,0.45)",
  },
  {
    slug: "tourism-packages",
    name: "Tourism Packages",
    short: "Cultural, adventure and romantic journeys.",
    detail: "Pre-designed and customized packages, built around how you like to travel.",
    items: ["Customized itineraries", "Cultural experiences", "Adventure travel", "Romantic getaways"],
    image: "/images/armenia/tatev.jpg",
    imageAlt: "Tatev monastery on a cliff above a green gorge",
    accent: "#e0262f",
    glow: "rgba(224,38,47,0.45)",
  },
  {
    slug: "attractions-experiences",
    name: "Attractions & Experiences",
    short: "Guided tours, landmarks, food and outdoor activities.",
    detail: "The sights, tastes and outdoor days that make a destination worth the journey.",
    items: ["Guided tours", "Museums and landmarks", "Food and wine experiences", "Outdoor activities"],
    image: "/images/georgia/narikala.jpg",
    imageAlt: "Narikala fortress above Tbilisi",
    accent: "#f5b84a",
    glow: "rgba(245,184,74,0.4)",
  },
  {
    slug: "itinerary-planning",
    name: "Travel Itinerary Planning",
    short: "Personalized plans and expert recommendations.",
    detail: "A plan designed around you, with expert recommendations and updates as things change.",
    items: ["Personalized travel plans", "Expert recommendations", "Real-time updates"],
    image: "/images/georgia/ushguli.jpg",
    imageAlt: "Stone towers of Ushguli in the Svaneti mountains",
    accent: "#4fd1b5",
    glow: "rgba(79,209,181,0.4)",
  },
  {
    slug: "visa-services",
    name: "Visa Services",
    short: "Application assistance and document processing.",
    detail: "Support with the paperwork, so a visa never stands between you and the trip.",
    items: ["Visa application assistance", "Document processing", "Global visa expertise"],
    image: "/images/armenia/republic-square.jpg",
    imageAlt: "Republic Square in Yerevan",
    accent: "#ff7aa8",
    glow: "rgba(255,122,168,0.4)",
  },
  {
    slug: "chauffeur-services",
    name: "Chauffeur Services",
    short: "Luxury vehicles, airport transfers and professional chauffeurs.",
    detail: "Professional chauffeurs and luxury vehicles for every leg of the journey.",
    items: ["Luxury vehicles", "Professional chauffeurs", "Airport transfers", "Hourly chauffeurs", "City-to-city transfers"],
    image: "/images/dubai/marina.jpg",
    imageAlt: "The towers of Dubai Marina rising above the water",
    accent: "#e0262f",
    glow: "rgba(224,38,47,0.45)",
  },
];
