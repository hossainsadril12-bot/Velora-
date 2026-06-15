import Image from "next/image";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

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
        <h1 className="relative m-0 select-none whitespace-nowrap text-center font-serif text-[64px] uppercase leading-none text-dark-green sm:text-[120px] lg:text-[192px] lg:leading-[192px]">
          Food Experience
        </h1>
      </div>

      {/* DIVIDER LINE */}
      <div className="mx-6 flex items-center sm:mx-10 lg:mx-[64px]">
        <hr className="m-0 w-full border-0 border-t border-dark-green" />
      </div>

      {/* CONTENT AREA */}
      <div className="grid grid-cols-1 items-start gap-10 px-6 pt-[34px] sm:px-10 lg:grid-cols-[40fr_44fr_22fr] lg:gap-[64px] lg:px-[64px] lg:pt-[34px]">
        {/* LEFT BIG IMAGE */}
        <Reveal className="relative h-[420px] w-full lg:h-[552px]">
          <Image
            src={IMG_LEFT}
            alt="Restaurant Poggio Rosso terrace outdoor dining"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </Reveal>

        {/* CENTER CONTENT */}
        <Reveal delay={0.1} className="flex flex-col">
          <div className="lg:pt-[55px]">
            <h5 className="m-0 font-sans text-[11.2px] font-bold uppercase leading-none tracking-[2px] text-dark-green">
              Restaurants
            </h5>

            <h2 className="m-0 mt-[35px] font-serif text-[32px] font-normal uppercase leading-[35.2px] text-dark-green">
              All-Round Dedication
            </h2>

            <p className="m-0 mt-[34px] max-w-[650px] font-sans text-[16px] leading-[1.5] text-black/55">
              The hamlet is home to two wonderful restaurants, Poggio Rosso with
              a Michelin Star and Osteria Il Grigio brimming with rustic charm.
              Fill your days discovering the flavours of Italy, the abundant
              produce of Orto and Aia Felice and the fruits of our Chianti
              vineyards.
            </p>

            <div className="mt-[36px]">
              <CtaButton variant="dark-filled" href="#">
                Discover
              </CtaButton>
            </div>
          </div>

          {/* BOTTOM IMAGE */}
          <div className="relative mt-[80px] h-[200px] w-full lg:mt-[122px] lg:h-[200px] lg:w-[490px]">
            <Image
              src={IMG_BOTTOM}
              alt="Food plating detail from Poggio Rosso"
              fill
              sizes="(max-width: 1024px) 100vw, 490px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* RIGHT SMALL IMAGE */}
        <Reveal
          delay={0.2}
          className="relative h-[300px] w-full lg:h-[300px] lg:w-[260px] lg:justify-self-end"
        >
          <Image
            src={IMG_RIGHT}
            alt="Michelin star restaurant detail — blue patterned plate"
            fill
            sizes="(max-width: 1024px) 100vw, 260px"
            className="object-cover"
          />
        </Reveal>
      </div>

      <div className="h-[60px]" />
    </section>
  );
}