import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingSocial from "@/components/FloatingSocial";
import TransitionProvider from "@/components/TransitionProvider";
import BookingProvider from "@/components/BookingProvider";
import IntroProvider from "@/components/IntroProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Velora — Eiman Estates",
    template: "%s | Velora — Eiman Estates",
  },
  description:
    "Velora Inani — a first-of-its-kind Lifestyle Hotel on Marine Drive, Inani, Cox's Bazar. Own a hotel unit. Earn returns. Backed by Eiman Estates.",
  keywords: [
    "Velora Inani",
    "Velora Emporio",
    "Eiman Estates",
    "hotel investment Cox's Bazar",
    "Inani Beach hotel",
    "lifestyle hotel Bangladesh",
    "hotel unit ownership",
  ],
  metadataBase: new URL(process.env.SITE_URL || "https://velora.eimanestates.com"),
  openGraph: {
    title: "Velora — Eiman Estates",
    description:
      "Velora Inani — a first-of-its-kind Lifestyle Hotel on Marine Drive, Inani, Cox's Bazar. Own a hotel unit. Earn returns. Backed by Eiman Estates.",
    url: "https://velora.eimanestates.com",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora — Eiman Estates",
    description:
      "Velora Inani — a first-of-its-kind Lifestyle Hotel on Marine Drive, Inani, Cox's Bazar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/metropolis.min.css" />
      </head>
      <body className="min-h-full bg-cream text-dark-green">
        <IntroProvider>
          <TransitionProvider>
            <BookingProvider>
              <SmoothScroll>{children}</SmoothScroll>
              <FloatingSocial />
            </BookingProvider>
          </TransitionProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
