import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ImageReveal, ButtonReveal, FadeUp } from "./anim";

const IMG_LEFT = "/diane-picchiottino-noiua71q1Sc-unsplash.jpg";

export default function FoodExperience() {
  return (
    <section className="relative w-full overflow-hidden bg-velora-cream lg:h-screen lg:min-h-[800px]">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN - FULL IMAGE */}
        <div className="relative h-[400px] sm:h-[500px] w-full lg:h-full">
          <ImageReveal scaleFrom={1.2} className="h-full w-full">
            <Image
              src={IMG_LEFT}
              alt="Velora Emporio Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </ImageReveal>
        </div>

        {/* RIGHT COLUMN - CONTENT */}
        <div className="flex h-full flex-col items-center justify-center px-6 py-20 sm:px-12 lg:px-20 lg:py-0">
          <FadeUp delay={0.2} className="flex flex-col items-center justify-center">
            {/* LOGO (Image replacement for Velora logo) */}
            <div className="flex items-center justify-center">
              <img
                src="/Velora Emporio.png"
                alt="Velora Emporio Logo"
                className="h-[52px] sm:h-[70px] lg:h-[92px] w-auto object-contain"
              />
            </div>

            {/* PARAGRAPH */}
            <p className="mt-10 sm:mt-14 lg:mt-16 max-w-[540px] text-center font-sans text-[14px] sm:text-[15px] leading-[1.9] text-dark-text/80">
              Welcome to Velora Inani, the first of its kind 'Lifestyle Hotel'
              in Cox's Bazar with world-class features and amenities for International &
              Local tourists. Designed by HuaDu Architecture & Urban Design,
              a Shanghai-based architecture firm that operates across three continents
              and holds a first-rate qualification from China's
              State Construction Ministry.
            </p>

            {/* BUTTON */}
            <ButtonReveal className="mt-10 sm:mt-14 lg:mt-16">
              <CtaButton variant="tan" href="#" className="px-8 py-3 text-[11px] font-bold tracking-[0.2em]">
                LEARN MORE
              </CtaButton>
            </ButtonReveal>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
