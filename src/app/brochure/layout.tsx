import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brochure",
  description:
    "Browse the Velora Inani brochure — Cox's Bazar's first premium lifestyle hotel by Eiman Estates. Flip through every page or download the PDF.",
  openGraph: {
    title: "Brochure | Velora — Eiman Estates",
    description:
      "Browse the Velora Inani brochure — Cox's Bazar's first premium lifestyle hotel by Eiman Estates. Flip through every page or download the PDF.",
    url: "https://velora.eimanestates.com/brochure",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brochure/pages/page-01.webp", width: 1600, height: 1600, alt: "Velora brochure cover" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
