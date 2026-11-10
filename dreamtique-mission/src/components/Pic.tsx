import Image from "next/image";
import { Passport } from "./Passport";

const photo: Record<string, { src?: string; alt: string }> = {
  "hotel-bookings": { src: "/images/dubai/burj-al-arab.jpg", alt: "A landmark luxury hotel on the Dubai coast" },
  "tourism-packages": { src: "/images/georgia/ushguli.jpg", alt: "Stone towers in the mountains of Svaneti" },
  "attractions-experiences": { src: "/images/sulfur-baths.jpg", alt: "The domed sulfur baths of old Tbilisi" },
  "itinerary-planning": { src: "/images/sevan.jpg", alt: "Lake Sevan in Armenia" },
  "visa-services": { alt: "Travel documents with entry stamps" },
  "chauffeur-services": { src: "/images/dubai/marina.jpg", alt: "Dubai Marina towers along a waterfront road" },
};

/** A service's picture: a photograph, or a drawn passport where no honest photograph exists. */
export function Pic({ slug, sizes, className = "" }: { slug: string; sizes: string; className?: string }) {
  const p = photo[slug];
  return p.src ? (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} className="object-cover" />
    </div>
  ) : (
    <Passport className={className} />
  );
}
