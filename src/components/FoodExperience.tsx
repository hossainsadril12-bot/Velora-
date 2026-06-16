import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ImageReveal, ButtonReveal, DividerLine } from "./anim";

const IMG_LEFT =
  "https://admin.sanfelice.com/app/uploads/2023/02/Sakalis-1144x652-1.png";

const IMG_RIGHT =
  "https://admin.sanfelice.com/app/uploads/2023/02/Sakalis-548x738-1.png";

const IMG_BOTTOM =
  "https://admin.sanfelice.com/app/uploads/2023/04/Olio-horizontal-gallery.jpg";

export default function FoodExperience() {
  return (
    <section className="overflow-hidden bg-cream">
      {/* TOP SPACE */}
      <div className="h-[35px]" />

      {/* HEADING */}
      <div className="relative mx-6 mb-2 sm:mx-10 lg:mx-[64px]">
        <RevealText
          as="h1"
          dir="fromBottom"
          className="relative m-0 select-none whitespace-nowrap text-center font-serif text-[64px] uppercase leading-none text-dark-text sm:text-[120px] lg:text-[192px] lg:leading-[192px]"
        >
          Velora Emporio
        </RevealText>
      </div>

      {/* DIVIDER LINE — slides in from the left */}
      <div className="mx-6 sm:mx-10 lg:mx-[64px]">
        <DividerLine className="text-dark-text" />
      </div>

      {/* CONTENT AREA */}
      <div className="grid grid-cols-1 items-start gap-10 px-6 pt-[34px] sm:px-10 lg:grid-cols-[40fr_44fr_22fr] lg:gap-[64px] lg:px-[64px] lg:pt-[34px]">
        {/* LEFT BIG IMAGE */}
        <ImageReveal scaleFrom={1.8} className="h-[420px] w-full lg:h-[552px]">
          <Image
            src={IMG_LEFT}
            alt="Restaurant Poggio Rosso terrace outdoor dining"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </ImageReveal>

        {/* CENTER CONTENT */}
        <div className="flex flex-col">
          <div className="lg:pt-[55px]">


            <h2 className="m-0 mt-[35px] font-serif text-[32px] font-normal uppercase leading-[35.2px] text-dark-text">
              <RevealText as="span" dir="fromBottom">
                A Life time
              </RevealText>
              <RevealText as="span" dir="fromBottom" delay={0.2}>
                Shoping mall
              </RevealText>
            </h2>

            <p className="m-0 mt-[34px] max-w-[650px] font-sans text-[16px] leading-[1.5] text-dark-text/75">
              Welcome to Velora Inani, the first of its kind ‘Lifestyle Hotel’ in Cox’s Bazar with world-class features and amenities for International & Local tourists. Designed by HuaDu Architecture & Urban Design, a Shanghai-based architecture firm that operates across three continents and holds a first-rate qualification from China’s State Construction Ministry.


            </p>

            <ButtonReveal className="mt-[36px]" delay={0.6}>
              <CtaButton variant="tan" href="#">
                Discover
              </CtaButton>
            </ButtonReveal>
          </div>

          {/* BOTTOM IMAGE */}

        </div>

        {/* RIGHT SMALL IMAGE */}
        <ImageReveal
          scaleFrom={1.8}
          className="h-[300px] w-full lg:h-[300px] lg:w-[260px] lg:justify-self-end"
        >
          <Image
            src={IMG_RIGHT}
            alt="Michelin star restaurant detail — blue patterned plate"
            fill
            sizes="(max-width: 1024px) 100vw, 260px"
            className="object-cover"
          />
        </ImageReveal>
      </div>

      <div className="h-[60px]" />
    </section>
  );
}
