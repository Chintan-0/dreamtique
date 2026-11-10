import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OptionSwitcher } from "@/components/OptionSwitcher";
import { Providers } from "@/components/Providers";
import { PinDefs } from "@/components/ui";
import { site } from "@/lib/content";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description:
    "Dreamtique Tourism plans hotels, tourism packages, itineraries, visas and chauffeur services. Destinations include Dubai, Georgia and Armenia.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/assets/dubai-skyline-unsplash.jpg", width: 1920, height: 1280 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phones[0],
  address: { "@type": "PostalAddress", streetAddress: "Office 101 519, MASHREQ, Al Suq Al Kabeer", addressLocality: "Dubai", addressCountry: "AE" },
  foundingDate: "2024",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="flex min-h-svh flex-col">
        <PinDefs />
        <a href="#main" className="absolute -top-20 left-4 z-[100] bg-ink px-4 py-3 text-white focus:top-3">
          Skip to content
        </a>
        <Providers>
          <OptionSwitcher current={1} />
          <Header />
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
