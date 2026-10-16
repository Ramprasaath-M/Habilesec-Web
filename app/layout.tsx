import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/enterprise/header";
import { SiteFooter } from "@/components/enterprise/footer";
const manrope = localFont({
  src: "../public/fonts/manrope.ttf",
  display: "swap",
  variable: "--font-manrope",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.habilesec.com"),
  title: {
    default: "HabileSec | Cybersecurity, Governance & Secure Engineering",
    template: "%s | HabileSec",
  },
  description:
    "HabileSec connects cybersecurity, governance, compliance and secure digital engineering.",
  openGraph: { siteName: "HabileSec", locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HabileSec",
  legalName: "HabileSec India Pvt Ltd",
  url: "https://www.habilesec.com",
  logo: "https://www.habilesec.com/brand/habilesec-logo.png",
  email: "enquiry@habilesec.com",
  telephone: "+91-435-357-5243",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "46/10 Sankar Iyer Garden, Doctor Moorthy Road",
    addressLocality: "Kumbakonam",
    postalCode: "612001",
    addressCountry: "IN",
  },
  sameAs: ["https://linkedin.com/company/habilesec"],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
