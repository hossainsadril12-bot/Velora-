import Image from "next/image";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

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
    src: "https://admin.sanfelice.com/app/uploads/2023/04/DSC_6934-scaled.jpg",
    alt: "25 Chianti Classico Producers you should know",
    title: "25 CHIANTI CLASSICO PRODUCERS YOU SHOULD KNOW",
    date: "09/03/2023",
    href: "#",
  },
  {
    src: "https://admin.sanfelice.com/app/uploads/2023/04/CAMPOGIOVANNI_hero-2040x1120-1.jpg",
    alt: "What to drink on National Wine Day",
    title: "WHAT TO DRINK ON NATIONAL WINE DAY",
    date: "25/05/2022",
    href: "#",
  },
  {
    src: "https://admin.sanfelice.com/app/uploads/2023/05/Logo_Wine-gouture.png",
    alt: "Wine Couture — 50 volte Vigorello",
    title: "50 VOLTE VIGORELLO, PRIMO SUPERTUSCAN DEL CHIANTI CLASSICO",
    date: "23/03/2022",
    href: "#",
    contain: true,
  },
];

function Card({ n }: { n: News }) {
  return (
    <a
      href={n.href}
      className="group block h-[520px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
    >
      {/* IMAGE AREA */}
      <div className="relative h-[285px] w-full overflow-hidden bg-cream">
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
      </div>

      {/* CONTENT AREA */}
      <div className="flex h-[235px] flex-col justify-between bg-white px-6 pb-7 pt-7">
        <h3 className="font-serif text-[30px] uppercase leading-[0.95] text-dark-green">
          {n.title}
        </h3>

        <p className="font-sans text-sm font-bold tracking-wide text-black">
          {n.date}
        </p>
      </div>
    </a>
  );
}

export default function NewsEvents() {
  return (
    <section className="bg-cream px-6 py-24 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[30fr_70fr] lg:gap-16">
        {/* LEFT LABEL */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-[48px] uppercase leading-none text-dark-green lg:text-[56px]">
            News &amp; Events
          </h2>

          <div className="mt-20">
            <CtaButton variant="dark-filled" href="#">
              View All
            </CtaButton>
          </div>
        </Reveal>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <Reveal>
            <Card n={CARDS[0]} />
          </Reveal>

          <Reveal delay={0.1}>
            <Card n={CARDS[1]} />
          </Reveal>

          {/* THIRD CARD BELOW FIRST CARD */}
          <Reveal delay={0.15} className="sm:col-start-1">
            <Card n={CARDS[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}