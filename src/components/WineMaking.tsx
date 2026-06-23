import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ButtonReveal, DividerLine, FadeUp } from "./anim";

const BOTTLE_LEFT = "https://admin.sanfelice.com/app/uploads/2023/04/Vigorello_2020-annate-img.png";
const BOTTLE_CENTER = "https://admin.sanfelice.com/app/uploads/2023/04/BellAja_Bolgheri-Superiore_2021-annate-img.png";
const BOTTLE_RIGHT = "https://admin.sanfelice.com/app/uploads/2023/04/CampoGiovanni_2019-annate-img.png";

export default function WineMaking() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 flex flex-col items-center justify-center min-h-[60vh]">
      {/* Background Image */}
      <Image
        src="/HandShake Image.png"
        alt="Handshake background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center px-6 sm:px-10 lg:px-[64px]">
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
        <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
          <RevealText
            as="h1"
            dir="fromTopRotated"
            origin="center bottom"
            className="font-serif uppercase leading-[0.92] text-white text-[44px] sm:text-[80px] md:text-[110px] lg:text-[153px] font-thin"
          >
            Equity
          </RevealText>
          <RevealText
            as="h1"
            dir="fromBottomRotated"
            delay={0.15}
            origin="center bottom"
            className="font-serif uppercase leading-[0.92] text-white text-[44px] sm:text-[80px] md:text-[110px] lg:text-[153px] font-thin"
          >
            Partners
          </RevealText>
          {/* <RevealText
            as="h1"
            dir="fromBottomRotated"
            delay={0.3}
            origin="center bottom"
            className="font-serif uppercase leading-[0.92] text-white text-[64px] sm:text-[110px] lg:text-[153px]"
          >
            Matters
          </RevealText> */}
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
        <div className="relative z-30 mx-auto mt-14 flex max-w-[920px] flex-col items-center text-center w-full">
          {/* divider line slides in from the left */}
          <DividerLine className="mb-8 max-w-[880px] text-white/30" />

          {/* Small Label */}
          {/* <RevealText
            as="p"
            dir="fromBottom"
            className="m-0 font-sans text-[13px] font-semibold uppercase leading-none tracking-[5px] text-cream"
          >
            Passionate Wine Makers
          </RevealText> */}

          {/* Main Paragraph */}
          <p className="m-0 mt-8 max-w-[880px] font-sans text-[16px] font-normal leading-[1.3] text-cream/90">
            Enjoy an exciting independent profession by becoming an Equity Partner
            of  Velora Inani.
          </p>

          {/* Horizontal Points */}
          <FadeUp className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 max-w-[880px]" delay={0.45}>
            {[
              "Own a hotel unit paying 15 Lac Taka",
              "Be a Registered Equity Partner yourself",
              "Start Selling Shares to bring in Shareholders*",
              "Earn up to 55 Lac Taka in just 2.5 Years*",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-[12px] font-sans font-medium uppercase tracking-wider text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-tan shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </FadeUp>

          <ButtonReveal className="mt-8" delay={0.6}>
            <CtaButton variant="cream-outlined" href="#">
              Discover More
            </CtaButton>
          </ButtonReveal>
        </div>
      </div>
    </section>
  );
}
