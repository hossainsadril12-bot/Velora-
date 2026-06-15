import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiscoverPanel from "@/components/DiscoverPanel";
import BorgoResort from "@/components/BorgoResort";
import WineEstates from "@/components/WineEstates";
import WineMaking from "@/components/WineMaking";
import FoodExperience from "@/components/FoodExperience";
import NewsEvents from "@/components/NewsEvents";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
