import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OptionSwitcher } from "@/components/OptionSwitcher";
import { company } from "@/data/company";

const barlow = Barlow({ variable: "--font-barlow", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const condensed = Barlow_Condensed({ variable: "--font-barlow-condensed", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

export const viewport: Viewport = { themeColor: "#ffffff" };

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: "Dreamtique Tourism | Unforgettable Journeys, Crafted with Passion", template: "%s | Dreamtique Tourism" },
  description: "Dreamtique Tourism crafts unforgettable journeys: hotel bookings, tourism packages, itinerary planning, visa services and chauffeur services. Dubai, Georgia, Armenia and more.",
  openGraph: { type: "website", siteName: company.name, images: [{ url: "/images/dubai/burj-al-arab.jpg" }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: company.name,
  url: company.url,
  email: company.email,
  telephone: company.phones[0],
  foundingDate: String(company.founded),
  address: { "@type": "PostalAddress", streetAddress: "Office 101 519, MASHREQ, Al Suq Al Kabeer", addressLocality: "Dubai", addressCountry: "AE" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${condensed.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="absolute -top-20 left-4 z-[200] bg-ink px-5 py-3 text-white focus:top-12">
          Skip to content
        </a>
        <OptionSwitcher current={4} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
