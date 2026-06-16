import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ButtonReveal, DividerLine } from "./anim";

const BOTTLE_LEFT = "https://admin.sanfelice.com/app/uploads/2023/04/Vigorello_2020-annate-img.png";
const BOTTLE_CENTER = "https://admin.sanfelice.com/app/uploads/2023/04/BellAja_Bolgheri-Superiore_2021-annate-img.png";
const BOTTLE_RIGHT = "https://admin.sanfelice.com/app/uploads/2023/04/CampoGiovanni_2019-annate-img.png";

export default function WineMaking() {
  return (
    <section className="relative overflow-hidden bg-secondary-background/20 py-24 lg:py-32">
      {/* side bottles (decorative, desktop only) - Hidden for now
      <div className="pointer-events-none absolute left-[4%] top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[rgba(200,200,200,0.3)]">
          <Image
            src={BOTTLE_LEFT}
            alt="Vigorello wine bottle"
            width={90}
            height={300}
            className="animate-float h-auto w-auto max-h-[340px] object-contain drop-shadow-xl"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute right-[4%] top-[30%] hidden -translate-y-1/2 lg:block">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[rgba(200,200,200,0.3)]">
          <Image
            src={BOTTLE_RIGHT}
            alt="Campogiovanni wine bottle"
            width={90}
            height={300}
            className="animate-float h-auto w-auto max-h-[340px] object-contain drop-shadow-xl [animation-delay:0.5s]"
          />
        </div>
      </div>
      */}

      {/* giant text — each line slides in from a different direction with rotation */}
      <div className="relative z-10 text-center">
        <RevealText
          as="h1"
          dir="fromTopRotated"
          origin="right bottom"
          className="font-serif uppercase leading-[0.92] text-dark-text text-[64px] sm:text-[110px] lg:text-[153px]"
        >
          Own
        </RevealText>
        <RevealText
          as="h1"
          dir="fromBottomRotated"
          delay={0.15}
          origin="right bottom"
          className="font-serif uppercase leading-[0.92] text-dark-text text-[64px] sm:text-[110px] lg:text-[153px]"
        >
          What
        </RevealText>
        <RevealText
          as="h1"
          dir="fromBottomRotated"
          delay={0.3}
          origin="right bottom"
          className="font-serif uppercase leading-[0.92] text-dark-text text-[64px] sm:text-[110px] lg:text-[153px]"
        >
          Matters
        </RevealText>
      </div>

      {/* center bottle overlapping text - Hidden for now
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <Image
          src={BOTTLE_CENTER}
          alt="Bell'Aja wine bottle"
          width={120}
          height={460}
          className="animate-float h-auto w-auto max-h-[460px] object-contain drop-shadow-2xl [animation-delay:0.25s]"
        />
      </div>
      */}

      {/* copy */}
      <div className="relative z-30 mx-auto mt-14 flex max-w-[920px] flex-col items-center px-6 text-center sm:px-10">
        {/* divider line slides in from the left */}
        <DividerLine className="mb-8 max-w-[880px] text-dark-text/30" />

        {/* Small Label */}
        <RevealText
          as="p"
          dir="fromBottom"
          className="m-0 font-sans text-[13px] font-semibold uppercase leading-none tracking-[5px] text-dark-text"
        >
          Passionate Wine Makers
        </RevealText>

        {/* Main Paragraph */}
        <p className="m-0 mt-8 max-w-[880px] font-sans text-[16px] font-normal leading-[1.3] text-dark-text/85">
          Our estates are located in the most prestigious wine regions of
          Tuscany: San Felice in Chianti Classico, Campogiovanni in Montalcino,
          and Bell&apos;Aja in Bolgheri. Together, the three properties cover a total
          area of 685 hectares, of which 188 are cultivated as vineyards, with
          15,000 olive trees, in addition to arable land and woodlands.
        </p>
        <ButtonReveal className="mt-8" delay={0.6}>
          <CtaButton variant="dark-outlined" href="#">
            Discover More
          </CtaButton>
        </ButtonReveal>
      </div>
    </section>
  );
}
