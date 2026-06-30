import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ImageReveal, ButtonReveal, DividerLine, FadeUp } from "./anim";

type News = {
  src: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  href: string;
  contain?: boolean;
};

const CARDS: News[] = [
  {
    src: "/coxs-bazar-airport.jpg",
    alt: "Cox's Bazar Airport",
    title: "Intl. Airport in a few months",
    description: "During a recent parliament session, Afroza Khanam MP, Minister for Civil Aviation and Tourism, confirmed it would take her Government a few more months to upgrade Cox's Bazar Airport to an international facility…",
    date: "09/06/2026",
    href: "#",
  },
  {
    src: "/stem-list-EVgsAbL51Rk-unsplash.jpg",
    alt: "News Event 2",
    title: "Own a hotel unit paying 15 Lac",
    description: "Enjoy an exciting independent profession by becoming an Equity Partner of Velora Inani. Lorem ipsum dolor sit amet, consectetur adipisicing elit.......",
    date: "09/06/2026",
    href: "#",
  },
  {
    src: "/Own a hotel.png",
    alt: "Own a Hotel Unit",
    title: "A 'Lifestyle Hotel' amidst nature",
    description: "Velora Inani, the first of its kind 'Lifestyle Hotel' in Cox's Bazar with world-class features and amenities for International & Local tourists. Designed by HuaDu Architecture & Urban Design,…..",
    date: "09/06/2026",
    href: "#",
  },
];

function Card({ n }: { n: News }) {
  return (
    <a
      href={n.href}
      className="group flex flex-col h-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
    >
      {/* IMAGE AREA */}
      <ImageReveal scaleFrom={1.4} className="h-[285px] w-full shrink-0 bg-cream">
        <Image
          src={n.src}
          alt={n.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 35vw"
          className={
            n.contain
              ? "object-contain p-12"
              : "object-cover transition-transform duration-700 group-hover:scale-105"
          }
        />
      </ImageReveal>

      {/* CONTENT AREA */}
      <div className="flex flex-1 flex-col justify-between bg-white px-8 pb-8 pt-8">
        <div className="flex flex-col gap-5">
          <FadeUp y={10}>
            <h3 className="font-metro-thin text-[26px] sm:text-[30px] leading-[1.15] text-dark-text/90">
              {n.title}
            </h3>
          </FadeUp>

          <FadeUp y={10} delay={0.1}>
            <p className="font-sans text-[14px] leading-[1.7] text-dark-text/80">
              {n.description}{" "}
              <span className="text-tan ml-1 font-medium transition-colors group-hover:text-dark-green">
                Read more
              </span>
            </p>
          </FadeUp>
        </div>

        <FadeUp y={0} delay={0.3} duration={0.5} className="mt-8">
          <p className="font-sans text-[13px] font-bold tracking-wide text-dark-text">
            {n.date}
          </p>
        </FadeUp>
      </div>
    </a>
  );
}

export default function NewsEvents() {
  return (
    <section id="news" className="bg-cream px-6 py-12 sm:py-16 lg:px-10 lg:py-24 xl:px-16">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[30fr_70fr] lg:gap-16">
        {/* LEFT LABEL (with 60px left margin as requested) */}
        <div className="lg:sticky lg:top-28 lg:self-start lg:ml-[60px]">
          <h2 className="font-serif text-[48px] leading-none text-dark-text lg:text-[56px] font-thin">
            <RevealText as="span" dir="fromTopRotated" origin="right bottom">
              News &amp;
            </RevealText>
            <RevealText
              as="span"
              dir="fromBottomRotated"
              delay={0.1}
              origin="right bottom"
            >
              events
            </RevealText>
          </h2>

          <DividerLine className="mt-10 text-dark-text/30" />

          <ButtonReveal className="mt-20" delay={0.8}>
            <CtaButton variant="tan" href="#">
              View All
            </CtaButton>
          </ButtonReveal>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          <Card n={CARDS[0]} />
          <Card n={CARDS[1]} />
          {/* THIRD CARD BELOW FIRST CARD */}
          <div className="sm:col-start-1">
            <Card n={CARDS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
