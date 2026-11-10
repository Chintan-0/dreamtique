import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OptionSwitcher } from "@/components/OptionSwitcher";
import { site } from "@/data/site";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Dreamtique Tourism | Experiences, hotels, visas and chauffeurs", template: "%s | Dreamtique Tourism" },
  description: "Plan Dubai, Georgia and Armenia with Dreamtique Tourism: experiences, hotels, packages, itineraries, visa services and chauffeur services.",
  openGraph: { type: "website", siteName: site.name, images: [{ url: "/images/marina.jpg", width: 1920, height: 1255 }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phones[0],
  foundingDate: String(site.founded),
  address: { "@type": "PostalAddress", streetAddress: "Office 101 519, MASHREQ, Al Suq Al Kabeer", addressLocality: "Dubai", addressCountry: "AE" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="absolute -top-20 left-4 z-[100] rounded-full bg-ink px-5 py-3 text-white focus:top-3">Skip to content</a>
        <OptionSwitcher current={3} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
