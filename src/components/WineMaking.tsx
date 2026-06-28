import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ButtonReveal, FadeUp } from "./anim";

export default function WineMaking() {
  return (
    <section id="equity-partners" className="relative overflow-hidden py-16 sm:py-24 lg:py-32 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Background Image */}
      <Image
        src="/HandShake Image.png"
        alt="Handshake background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center px-6 sm:px-10 lg:px-[64px]">
        {/* Heading */}
        <RevealText
          as="h1"
          dir="fromBottom"
          className="font-metro-thin text-white text-[38px] sm:text-[60px] lg:text-[72px] xl:text-[84px] tracking-wide text-center leading-none"
        >
          Equity Partners
        </RevealText>

        {/* Paragraph */}
        <RevealText
          as="p"
          dir="fromBottom"
          delay={0.2}
          className="m-0 mt-6 max-w-[620px] font-metro-thin text-[16px] leading-relaxed text-white/75 text-center"
        >
          Enjoy an exciting independent profession by becoming
          <br />
          an Equity Partner of Velora Inani.
        </RevealText>

        {/* Vertical Points with horizontal dividers */}
        <FadeUp className="w-full max-w-[800px] mt-14 flex flex-col items-center" delay={0.4}>
          {/* Item 1 */}
          <div className="w-full py-6 text-center">
            <span className="font-metro-thin text-[16px] sm:text-[20px] lg:text-[24px] tracking-wide text-white/75">
              Own a hotel unit paying 15 Lac Taka
            </span>
          </div>
          <div className="w-full h-[1px] bg-white/15" />

          {/* Item 2 */}
          <div className="w-full py-6 text-center">
            <span className="font-metro-thin text-[16px] sm:text-[20px] lg:text-[24px] tracking-wide text-white/75">
              Be a Registered Equity Partner yourself
            </span>
          </div>
          <div className="w-full h-[1px] bg-white/15" />

          {/* Item 3 */}
          <div className="w-full py-6 text-center">
            <span className="font-metro-thin text-[16px] sm:text-[20px] lg:text-[24px] tracking-wide text-white/75">
              Start Selling Shares to bring in Shareholders*
            </span>
          </div>
          <div className="w-full h-[1px] bg-white/15" />

          {/* Item 4 */}
          <div className="w-full py-6 text-center">
            <span className="font-metro-thin text-[16px] sm:text-[20px] lg:text-[24px] tracking-wide text-white/75">
              Earn up to 55 Lac Taka in just 2.5 Years*
            </span>
          </div>
        </FadeUp>

        {/* Button */}
        <ButtonReveal className="mt-14" delay={0.6}>
          <CtaButton variant="cream-outlined" href="#" className="!font-metro-thin">
            Discover More
          </CtaButton>
        </ButtonReveal>
      </div>
    </section>
  );
}
