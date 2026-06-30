"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type Estate = {
  name: string;
  bg: string;
  bgAlt: string;
  logo: string;
  logoAlt: string;
  href: string;
  headingLogo?: string;
};

const ESTATES: Estate[] = [
  {
    name: "Velora Inani",
    bg: "/Velora Inani.jpg.jpeg",
    bgAlt: "San Felice vineyard rows",
    logo: "https://admin.sanfelice.com/app/uploads/2023/04/SF-CHIANTICLASSICO-logo-WHITE.png",
    logoAlt: "San Felice Chianti Classico logo",
    href: "/en/estates/san-felice",
    headingLogo: "/Velora inani.png",
  },
  {
    name: "Velora Emporio",
    bg: "/Emporio - Main.webp",
    bgAlt: "Campogiovanni estate in Montalcino",
    logo: "https://admin.sanfelice.com/app/uploads/2023/04/CampogiovanniMontalcino-logo-BIANCO-1.png",
    logoAlt: "Campogiovanni Montalcino logo",
    href: "/en/estates/campogiovanni",
    headingLogo: "/Velora Emporio W.png",
  },
  {
    name: "Upcoming",
    bg: "/UPCOMING - BLUR.jpg.jpeg",
    bgAlt: "Bell'Aja vineyard in Bolgheri",
    logo: "https://admin.sanfelice.com/app/uploads/2023/03/BellAjaBolghieri-logo-BIANCO.png",
    logoAlt: "Bell'Aja Bolgheri logo",
    href: "/en/estates/bellaja-bolgheri",
  },
];

const EASE = [0.43, 0.07, 0.39, 0.96] as const;

function EstateCard({
  estate,
  index,
  isActive,
  onActivate,
  onDeactivate,
  revealY,
}: {
  estate: Estate;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
  onDeactivate: () => void;
  revealY?: MotionValue<string>;
}) {
  return (
    <motion.div
      className="relative h-[420px] sm:h-[480px] w-full min-w-0 cursor-pointer overflow-hidden basis-auto lg:h-[78vh] lg:min-h-[560px] lg:max-h-[820px] lg:basis-0"
      style={{
        flexShrink: 1,
        y: revealY,
        willChange: "transform",
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {
          flexGrow: 1,
          transition: {
            ease: EASE,
            duration: 0.7,
            delay: 0.1,
          },
        },
        hover: {
          flexGrow: 2.8,
          transition: {
            ease: EASE,
            duration: 0.7,
            delay: 0.1,
          },
        },
      }}
      onHoverStart={() => onActivate(index)}
      onHoverEnd={onDeactivate}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          transformOrigin: "center center",
        }}
        animate={{
          scale: isActive ? 1.2 : 1,
        }}
        transition={{
          ease: EASE,
          duration: 1.2,
        }}
      >
        <Image
          src={estate.bg}
          alt={estate.bgAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority={index === 0}
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          zIndex: 4,
        }}
        animate={{
          opacity: isActive ? 0.4 : 0.6,
        }}
        transition={{
          ease: EASE,
          duration: 0.9,
        }}
      />

      {/* Center text heading default state */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-4 text-center"
        style={{
          zIndex: 5,
        }}
        animate={{
          opacity: isActive ? 0 : 1,
          scale: isActive ? 0.95 : 1,
        }}
        transition={{
          ease: EASE,
          duration: 0.6,
        }}
      >
        {estate.headingLogo ? (
          index === 1 ? (
            <div className="flex items-center justify-center h-[72px]">
              <img
                src={estate.headingLogo}
                alt={estate.name}
                className="h-[72px] w-auto object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img
                src={estate.headingLogo}
                alt={estate.name}
                className="h-[32px] sm:h-[42px] lg:h-[55px] xl:h-[64px] w-auto object-contain"
              />
            </div>
          )
        ) : (
          <h2 className="m-0 font-serif text-cream text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] leading-tight font-thin tracking-[-0.03em]">
            {estate.name}
          </h2>
        )}
      </motion.div>

      {/* Hover content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center"
        style={{
          zIndex: 5,
          gap: "8px",
          paddingBottom: "60px",
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.95,
          y: isActive ? 0 : 15,
        }}
        transition={{
          ease: EASE,
          duration: 0.7,
          delay: 0.1,
        }}
      >
        <span className="block h-[40px] lg:h-[44px] xl:h-[52px] overflow-hidden">
          <motion.h2
            className="m-0 font-serif text-cream font-thin tracking-[-0.03em] text-[36px] leading-[40px] lg:text-[40px] lg:leading-[44px] xl:text-[48px] xl:leading-[52px]"
            style={{
              fontWeight: 100,
            }}
            variants={{
              hidden: {
                y: "120%",
              },
              show: {
                y: "0%",
                transition: {
                  ease: EASE,
                  duration: 0.6,
                  delay: 0.2,
                },
              },
            }}
            animate={isActive ? "show" : "hidden"}
          >
            {estate.name}
          </motion.h2>
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "46px",
          }}
        >
          <motion.div
            style={{
              background: "#b09b78",
            }}
            variants={{
              initial: {
                clipPath: "inset(100% 0% 0% 0%)",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
              show: {
                clipPath: "inset(0% 0% 0% 0%)",
                transition: {
                  ease: EASE,
                  duration: 0.6,
                  delay: 0.4,
                },
              },
            }}
            animate={isActive ? "show" : "initial"}
          >
            <a
              href={estate.href}
              className="inline-block bg-transparent font-sans font-bold uppercase text-white transition-colors duration-300 hover:bg-white hover:text-tan"
              style={{
                padding: "18px 35px",
                fontSize: "10px",
                letterSpacing: "2.5px",
                lineHeight: "13px",
                textDecoration: "none",
              }}
            >
              Discover
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WineEstates() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Animation timing:
   * Slightly faster than previous version.
   * Still starts when section enters and finishes before next section.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 20%"],
  });

  /**
   * Smooth progress:
   * Higher stiffness + lower mass = slightly faster response.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 46,
    damping: 26,
    mass: 0.9,
  });

  /**
   * Heading animation:
   * Heading comes first.
   * When heading reaches around half-position, cards start.
   */
  const headingY = useTransform(
    smoothProgress,
    [0, 0.32, 0.68],
    ["-115%", "-50%", "0%"]
  );

  const headingX = useTransform(
    smoothProgress,
    [0, 0.68],
    ["-2.5vw", "0vw"]
  );

  const headingRotate = useTransform(
    smoothProgress,
    [0, 0.32, 0.68],
    [-4.5, -2, 0]
  );

  const headingSkew = useTransform(smoothProgress, [0, 0.68], [-5, 0]);

  const headingClip = useTransform(
    smoothProgress,
    [0, 0.26, 0.68],
    [
      "inset(0% 100% 0% 0%)",
      "inset(0% 42% 0% 0%)",
      "inset(0% 0% 0% 0%)",
    ]
  );

  /**
   * Cards animation:
   * Starts when heading is around halfway.
   * Slightly faster than previous version.
   */
  const cardsY = useTransform(
    smoothProgress,
    [0.28, 0.76],
    ["190px", "0px"]
  );

  const cardsOpacity = useTransform(smoothProgress, [0.28, 0.44], [0, 1]);

  const cardOneY = useTransform(
    smoothProgress,
    [0.3, 0.7],
    ["135px", "0px"]
  );

  const cardTwoY = useTransform(
    smoothProgress,
    [0.34, 0.74],
    ["155px", "0px"]
  );

  const cardThreeY = useTransform(
    smoothProgress,
    [0.38, 0.78],
    ["175px", "0px"]
  );

  return (
    <section id="projects" ref={sectionRef} className="overflow-hidden bg-tan py-[16px]">
      {/* Heading */}
      <div className="relative w-full overflow-hidden px-6 sm:px-10 lg:px-[30px] pb-0">
        <motion.h2
          style={{
            y: headingY,
            x: headingX,
            rotate: headingRotate,
            skewX: headingSkew,
            clipPath: headingClip,
            transformOrigin: "left top",
            willChange: "transform, clip-path",
          }}
          className="relative m-0 block select-none whitespace-nowrap text-center font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em] text-white font-thin"
        >
          Projects
        </motion.h2>
      </div>

      {/* Cards */}
      <motion.div
        style={{
          y: cardsY,
          opacity: cardsOpacity,
          willChange: "transform, opacity",
        }}
        className="mt-6 flex w-full flex-col gap-6 px-6 sm:px-10 lg:flex-row lg:gap-6 lg:px-[30px]"
      >
        {ESTATES.map((estate, i) => {
          const revealY =
            i === 0 ? cardOneY : i === 1 ? cardTwoY : cardThreeY;

          return (
            <EstateCard
              key={estate.name}
              estate={estate}
              index={i}
              isActive={activeIndex === i}
              onActivate={setActiveIndex}
              onDeactivate={() => setActiveIndex(-1)}
              revealY={revealY}
            />
          );
        })}
      </motion.div>
    </section>
  );
}