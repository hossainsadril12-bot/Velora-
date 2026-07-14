"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiscoverPanel from "@/components/DiscoverPanel";
import BorgoResort from "@/components/BorgoResort";
import WineEstates from "@/components/WineEstates";
import WineMaking from "@/components/WineMaking";
import FoodExperience from "@/components/FoodExperience";
import NewsEvents from "@/components/NewsEvents";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import { smoothScrollToId } from "@/lib/scroll";

export default function Home() {
  const pathname = usePathname();

  // Fires every time this route becomes active (including client-side nav back to /)
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTo");
    if (!scrollTarget) return;

    // Clear immediately so manual refresh doesn't re-trigger
    sessionStorage.removeItem("scrollTo");

    // Short delay to let the page paint; smoothScrollToId will retry up to 6s
    // to find the element in DOM (handles intro animation timing automatically)
    const timer = setTimeout(() => {
      smoothScrollToId(scrollTarget, 2200, 80);
    }, 500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IntroOverlay />
      <Header />
      <main className="relative w-full">
        <HeroSection />
        <DiscoverPanel />
        <BorgoResort />
        <WineEstates />
        <WineMaking />
        <FoodExperience />
        <NewsEvents />
      </main>
      <Footer />
    </>
  );
}
