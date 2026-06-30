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
  title: "Velora — Eiman Estates",
  description:
    "Velora by Eiman Estates — where design excellence meets trusted leadership.",
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
