import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer/Footer";
import { CursorGlow } from "@/components/navigation/CursorGlow";
import { LogoIntro } from "@/components/navigation/LogoIntro";
import { Navbar } from "@/components/navigation/Navbar";
import { OptionSwitcher } from "@/components/navigation/OptionSwitcher";
import { Providers } from "@/components/navigation/Providers";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { PinDefs } from "@/components/ui/PinMark";
import { company } from "@/data/company";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

export const viewport: Viewport = { themeColor: "#050b1c" };

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: "Dreamtique Tourism | Unforgettable Journeys, Crafted with Passion", template: "%s | Dreamtique Tourism" },
  description: "Dreamtique Tourism crafts unforgettable journeys: hotel bookings, tourism packages, itinerary planning, visa services and chauffeur services. Dubai, Georgia, Armenia and more.",
  openGraph: { type: "website", siteName: company.name, images: [{ url: "/images/dubai/marina.jpg", width: 1920, height: 1255 }] },
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
    <html lang="en" className={jost.variable}>
      <body className="flex min-h-svh flex-col">
        <PinDefs />
        <a href="#main" className="absolute -top-20 left-4 z-[200] rounded-full bg-white px-5 py-3 text-midnight focus:top-3">
          Skip to content
        </a>
        <Providers>
          <LogoIntro />
          <ScrollProgress />
          <CursorGlow />
          <OptionSwitcher current={2} />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
