"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Estate = {
  name: string;
  bg: string;
  bgAlt: string;
  logo: string;
  logoAlt: string;
  href: string;
};

const ESTATES: Estate[] = [
  {
    name: "San Felice",
    bg: "https://admin.sanfelice.com/app/uploads/2023/04/DSC_6934-scaled.jpg",
    bgAlt: "San Felice vineyard rows",
    logo: "https://admin.sanfelice.com/app/uploads/2023/04/SF-CHIANTICLASSICO-logo-WHITE.png",
    logoAlt: "San Felice Chianti Classico logo",
    href: "/en/estates/san-felice",
  },
  {
    name: "Campogiovanni",
    bg: "https://admin.sanfelice.com/app/uploads/2023/04/CAMPOGIOVANNI_hero-2040x1120-1.jpg",
    bgAlt: "Campogiovanni estate in Montalcino",
    logo: "https://admin.sanfelice.com/app/uploads/2023/04/CampogiovanniMontalcino-logo-BIANCO-1.png",
    logoAlt: "Campogiovanni Montalcino logo",
    href: "/en/estates/campogiovanni",
  },
  {
    name: "Bell'Aja",
    bg: "https://admin.sanfelice.com/app/uploads/2025/04/1920x-1054.png",
    bgAlt: "Bell'Aja vineyard in Bolgheri",
    logo: "https://admin.sanfelice.com/app/uploads/2023/03/BellAjaBolghieri-logo-BIANCO.png",
    logoAlt: "Bell'Aja Bolgheri logo",
    href: "/en/estates/bellaja-bolgheri",
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

const cardVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  show: (i: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.15 },
  }),
};

export default function WineEstates() {
  return (
    <section className="bg-dark-green overflow-hidden py-4">
      {/* Part 1 — title band */}
      <motion.div
        className="flex items-center justify-center overflow-hidden h-[88px] sm:h-[140px] lg:h-[192px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2
          className="font-serif text-light-blue uppercase whitespace-nowrap m-0 select-none leading-none text-[64px] sm:text-[120px] lg:text-[192px] lg:leading-[192px]"
          style={{ fontWeight: 400 }}
          variants={{
            hidden: { y: "120%" },
            show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
          }}
        >
          Wine Estates
        </motion.h2>
      </motion.div>

      {/* Part 2 — Cards grid */}
      <motion.div
        className="flex flex-col lg:flex-row px-6 lg:px-8 gap-6 w-full mt-10 lg:mt-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {ESTATES.map((estate, i) => (
          <motion.div
            key={estate.name}
            className="estate-card relative overflow-hidden cursor-default w-full lg:w-auto lg:flex-1 h-[480px] lg:h-[72vh]"
            variants={cardVariants}
            custom={i}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="we-img-inner">
                <Image
                  src={estate.bg}
                  alt={estate.bgAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="we-overlay absolute inset-0 bg-black" />

            <div className="we-logo-wrap absolute inset-0 flex items-center justify-center">
              <Image
                src={estate.logo}
                alt={estate.logoAlt}
                width={230}
                height={120}
                className="object-contain"
                style={{ width: "230px", height: "120px" }}
              />
            </div>

            <div
              className="we-title-overlay absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center"
              style={{ gap: "8px", paddingBottom: "60px" }}
            >
              <span className="block overflow-hidden h-[12px]">
                <h5
                  className="we-estate-label font-sans text-cream uppercase m-0"
                  style={{
                    fontSize: "11.2px",
                    lineHeight: "12px",
                    fontWeight: 400,
                    letterSpacing: "2px",
                  }}
                >
                  Estate
                </h5>
              </span>

              <span className="block overflow-hidden h-[44px]">
                <h2
                  className="we-estate-name font-serif text-cream uppercase m-0"
                  style={{
                    fontSize: "40px",
                    lineHeight: "44px",
                    fontWeight: 400,
                  }}
                >
                  {estate.name}
                </h2>
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "46px",
                }}
              >
                <div className="we-discover-btn">
                  <a
                    href={estate.href}
                    className="font-sans font-bold text-black uppercase"
                    style={{
                      display: "inline-block",
                      padding: "18px 35px",
                      fontSize: "10px",
                      letterSpacing: "2.5px",
                      lineHeight: "13px",
                      textDecoration: "none",
                      background: "transparent",
                    }}
                  >
                    Discover
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}