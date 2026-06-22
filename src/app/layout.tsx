import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingSocial from "@/components/FloatingSocial";
import TransitionProvider from "@/components/TransitionProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "San Felice — Authentic Tuscan Soul",
  description:
    "Borgo San Felice: a luxury Tuscan winery & Relais & Châteaux resort. Discover Star Bene, the Italian way of feeling good.",
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
      <body className="min-h-full bg-cream text-dark-green">
        <TransitionProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <FloatingSocial />
        </TransitionProvider>
      </body>
    </html>
  );
}
