import Image from "next/image";
import CtaButton from "./CtaButton";

const BOTTLE_LEFT = "https://admin.sanfelice.com/app/uploads/2023/04/Vigorello_2020-annate-img.png";
const BOTTLE_CENTER = "https://admin.sanfelice.com/app/uploads/2023/04/BellAja_Bolgheri-Superiore_2021-annate-img.png";
const BOTTLE_RIGHT = "https://admin.sanfelice.com/app/uploads/2023/04/CampoGiovanni_2019-annate-img.png";

export default function WineMaking() {
  return (
    <section className="relative overflow-hidden bg-blush-pink py-24 lg:py-32">
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

      {/* giant text */}
      <div className="relative z-10 text-center">
        <h1 className="font-serif uppercase leading-[0.92] text-wine-red text-[64px] sm:text-[110px] lg:text-[153px]">
          Love
        </h1>
        <h1 className="font-serif uppercase leading-[0.92] text-wine-red text-[64px] sm:text-[110px] lg:text-[153px]">
          For Wine
        </h1>
        <h1 className="font-serif uppercase leading-[0.92] text-wine-red text-[64px] sm:text-[110px] lg:text-[153px]">
          Making
        </h1>
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
      <div className="relative z-30 mx-auto mt-14 flex max-w-[480px] flex-col items-center px-5 text-center">
        <h5 className="font-sans text-[11.2px] font-bold uppercase tracking-[2px] text-wine-red">
          Passionate Wine Makers
        </h5>
        <p className="mt-6 font-sans text-base leading-relaxed text-wine-red">
          Our estates are located in the most prestigious wine regions of Tuscany: San Felice in
          Chianti Classico, Campogiovanni in Montalcino, and Bell&apos;Aja in Bolgheri. Together, the
          three properties cover a total area of 685 hectares, of which 188 are cultivated as
          vineyards, with 15,000 olive trees, in addition to arable land and woodlands.
        </p>
        <div className="mt-8">
          <CtaButton variant="wine-outlined" href="#">
            Discover More
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
