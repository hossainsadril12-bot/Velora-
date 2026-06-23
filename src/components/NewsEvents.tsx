import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ImageReveal, ButtonReveal, DividerLine, FadeUp } from "./anim";

type News = {
  src: string;
  alt: string;
  title: string;
  date: string;
  href: string;
  contain?: boolean;
};

const CARDS: News[] = [
  {
    src: "/thisisengineering-jy2q5tz7JUI-unsplash.jpg",
    alt: "Lorem Ipsum 1",
    title: "Lorem Ipsum",
    date: "09/03/2023",
    href: "#",
  },
  {
    src: "/stem-list-EVgsAbL51Rk-unsplash.jpg",
    alt: "Lorem Ipsum 2",
    title: "Lorem Ipsum",
    date: "25/05/2022",
    href: "#",
  },
  {
    src: "/you-le-hRWsD2ti-os-unsplash.jpg",
    alt: "Lorem Ipsum 3",
    title: "Lorem Ipsum",
    date: "23/03/2022",
    href: "#",
  },
];

function Card({ n }: { n: News }) {
  return (
    <a
      href={n.href}
      className="group block h-[520px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
    >
      {/* IMAGE AREA — clip wipe + Ken Burns */}
      <ImageReveal scaleFrom={1.4} className="h-[285px] w-full bg-cream">
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
      <div className="flex h-[235px] flex-col justify-between bg-white px-6 pb-7 pt-7">
        <FadeUp y={10}>
          <h3 className="font-serif text-[30px] uppercase leading-[0.95] text-dark-text font-thin">
            {n.title}
          </h3>
        </FadeUp>

        <FadeUp y={0} delay={0.3} duration={0.5}>
          <p className="font-sans text-sm font-bold tracking-wide text-dark-text/70">
            {n.date}
          </p>
        </FadeUp>
      </div>
    </a>
  );
}

export default function NewsEvents() {
  return (
    <section className="bg-cream px-6 py-12 sm:py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[30fr_70fr] lg:gap-16">
        {/* LEFT LABEL */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-[48px] uppercase leading-none text-dark-text lg:text-[56px] font-thin">
            <RevealText as="span" dir="fromTopRotated" origin="right bottom">
              News &amp;
            </RevealText>
            <RevealText
              as="span"
              dir="fromBottomRotated"
              delay={0.1}
              origin="right bottom"
            >
              Events
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
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
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
