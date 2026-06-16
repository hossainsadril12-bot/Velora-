"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import HeroLogo from "./HeroLogo";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const CUSTOM_EASE = [0.68, 0.09, 0, 0.97] as const;

const PRIMARY_NAV = [
  {
    index: "01",
    before: "Wine",
    after: "Estates",
    href: "#estates",
    img: "https://admin.sanfelice.com/app/uploads/2023/04/DSC_6934-scaled.jpg",
  },
  {
    index: "02",
    before: "Our",
    after: "Wines",
    href: "#wines",
    img: "https://admin.sanfelice.com/app/uploads/2023/05/Foglia-rossa-uva-nera-orizz-scaled.jpg",
  },
  {
    index: "03",
    before: "BSF",
    after: "Resort",
    href: "#borgo",
    img: "https://admin.sanfelice.com/app/uploads/2023/02/borgo1.jpg",
  },
  {
    index: "04",
    before: "About",
    after: "Us",
    href: "#about",
    img: "https://admin.sanfelice.com/app/uploads/2023/02/hands.jpg",
  },
];

const SECONDARY_NAV = [
  { index: "05", label: "Sustainability", href: "#sustainability" },
  { index: "06", label: "Olive Oil", href: "#olive-oil" },
  { index: "07", label: "Orto and Aia Felice", href: "#orto" },
  { index: "08", label: "Projects", href: "#projects" },
  { index: "09", label: "News & Events", href: "#news" },
  { index: "10", label: "Contact Us", href: "#contact" },
];

function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="12"
            x2="12"
            y2="2"
            transform={`rotate(${i * 45} 12 12)`}
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 6h12M5.5 1.5v3M10.5 1.5v3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.5 3c.3 1 .7 1.9 1.2 2.7-.3.6-.8 1-.6 1.5.6 1.3 1.7 2.4 3 3 .5.2.9-.3 1.5-.6.8.5 1.7.9 2.7 1.2.2 1-.2 2-1.2 2.1C6.9 13.4 2.6 9.1 1.8 3.7 1.9 2.7 2.9 2.3 3.9 2.5L5.5 3z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M2.5 4.5L8 8.5l5.5-4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12.6" cy="5.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M11 5.5h-1.3c-.6 0-.95.4-.95 1V8H11l-.3 2H8.75v5.5h-2V10H5V8h1.75V6.2C6.75 4.6 7.7 3.5 9.4 3.5H11v2z"
        fill="currentColor"
      />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="55" height="24" viewBox="0 0 90 40" fill="none" aria-hidden="true" className="text-current">
      <path d="M80 10H10" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
      <path
        d="M80 30H10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
        className="origin-[80px_30px] scale-x-[0.435] transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <span className="relative flex h-[54px] w-[54px] items-center justify-center">
      <span className="absolute h-[1.5px] w-[46px] rotate-45 bg-current" />
      <span className="absolute h-[1.5px] w-[46px] -rotate-45 bg-current" />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    if (menuOpen) {
      panelRef.current?.focus();
    } else {
      setHovered(null);
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const onDark = !scrolled;
  const navColor = onDark ? "text-cream" : "text-dark-text";

  const headerInit = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeSlide = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0"
              style={{ backgroundColor: "#B6CFD0", zIndex: 998 }}
              initial={{ y: "-100%" }}
              animate={{
                y: "0%",
                transition: { ease: EASE, duration: 0.65, delay: 0.08 },
              }}
              exit={{
                y: "-100%",
                transition: { ease: EASE, duration: 0.45, delay: 0 },
              }}
            />

            <motion.div
              className="fixed inset-0"
              style={{ backgroundColor: "#183029", zIndex: 999 }}
              initial={{ y: "-100%" }}
              animate={{
                y: "0%",
                transition: { ease: EASE, duration: 0.65, delay: 0 },
              }}
              exit={{
                y: "-100%",
                transition: { ease: EASE, duration: 0.45, delay: 0.08 },
              }}
            />

            <motion.div
              ref={panelRef}
              id="main-nav-overlay"
              tabIndex={-1}
              className="fixed inset-0 flex flex-col overflow-hidden bg-dark-green text-cream outline-none"
              style={{ zIndex: 1000 }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.35, delay: 0.25 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              {/* TOP BAR */}
              <div className="relative flex h-[112px] shrink-0 items-center justify-between px-[70px]">
                <motion.div
                  className="hidden items-center gap-[22px] lg:flex"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.5, delay: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <Link
                    href="#"
                    className="flex h-[52px] w-[178px] items-center justify-center gap-[42px] border border-cream/65 font-sans text-[16px] font-bold text-cream transition-colors duration-300 hover:bg-cream hover:text-dark-green"
                  >
                    <span>E-shop</span>
                    <ArrowUpRight />
                  </Link>

                  <button className="flex h-[52px] w-[215px] cursor-pointer items-center justify-center gap-[12px] border border-cream/65 font-sans text-[16px] font-bold text-cream transition-colors duration-300 hover:bg-cream hover:text-dark-green">
                    <span>Book A Tasting</span>
                    <Chevron />
                  </button>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[51px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-cream"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.5, delay: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <Link href="/">
                    <Logo className="h-10 w-auto" />
                  </Link>
                </motion.div>

                <motion.div
                  className="ml-auto flex items-center gap-[46px]"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.5, delay: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <Link
                    href="#"
                    className="hidden h-[52px] w-[205px] items-center justify-center gap-[38px] bg-cream font-sans text-[16px] font-bold text-black transition-opacity duration-300 hover:opacity-80 lg:flex"
                  >
                    <span>Book Now</span>
                    <CalendarIcon />
                  </Link>

                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex cursor-pointer items-center justify-center text-cream transition-opacity duration-300 hover:opacity-70"
                  >
                    <CloseIcon />
                  </button>
                </motion.div>
              </div>

              {/* MAIN MENU */}
              <motion.nav
                role="navigation"
                aria-label="Primary"
                className="flex flex-1 flex-col px-[84px]"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.52,
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.04,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {PRIMARY_NAV.map((item, i) => {
                  const layout = [
                    // FIXED: first item text now starts further right,
                    // so number 01 has proper breathing space.
                    { numberLeft: "52px", textMargin: "88px" },
                    { numberLeft: "468px", textMargin: "505px" },
                    { numberLeft: "254px", textMargin: "291px" },
                    { numberLeft: "465px", textMargin: "505px" },
                  ][i];

                  const active = hovered === i;
                  const dim = hovered !== null && hovered !== i;

                  return (
                    <motion.div
                      key={item.index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 35,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { ease: EASE, duration: 0.65 },
                        },
                        exit: {
                          opacity: 0,
                          y: -20,
                          transition: { duration: 0.25 },
                        },
                      }}
                      className="group relative border-b border-cream/30"
                    >
                      <span className="absolute -bottom-[1px] left-0 z-20 h-[1.5px] w-full origin-left scale-x-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative flex h-[141px] items-end overflow-hidden pb-[20px] text-cream"
                      >
                        <span
                          className="absolute bottom-[27px] z-10 font-sans text-[15px] font-bold leading-none text-cream"
                          style={{ left: layout.numberLeft }}
                        >
                          {item.index}
                        </span>

                        <motion.div
                          className="flex items-end"
                          style={{
                            marginLeft: layout.textMargin,
                            transformOrigin: "left center",
                          }}
                          initial={false}
                          animate={{
                            opacity: dim ? 0.45 : 1,
                            scale: dim ? 1.06 : 1,
                          }}
                          transition={{ ease: EASE, duration: 0.45 }}
                        >
                          <span className="block font-serif text-[132px] uppercase leading-[0.82] tracking-[-0.035em] xl:text-[142px]">
                            {item.before}
                          </span>

                          <motion.span
                            className="relative mx-[28px] mb-[14px] block shrink-0 overflow-hidden"
                            initial={false}
                            animate={{
                              width: active ? "255px" : "0px",
                              height: active ? "86px" : "0px",
                              opacity: active ? 1 : 0,
                            }}
                            transition={{ ease: CUSTOM_EASE, duration: 0.8 }}
                          >
                            <motion.span
                              className="block h-full w-[255px] bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${item.img})`,
                                transformOrigin: "center center",
                              }}
                              initial={false}
                              animate={{
                                scale: active ? 1 : 1.65,
                              }}
                              transition={{ ease: CUSTOM_EASE, duration: 0.8 }}
                            />
                          </motion.span>

                          <span className="block font-serif text-[132px] uppercase leading-[0.82] tracking-[-0.035em] xl:text-[142px]">
                            {item.after}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* SECONDARY NAV DESKTOP */}
                <motion.div
                  className="mx-auto mt-[45px] hidden w-full max-w-[1040px] grid-cols-6 items-start gap-[28px] lg:grid"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.55, delay: 0.85 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {SECONDARY_NAV.map((item) => (
                    <Link
                      key={item.index}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex flex-col items-center text-center font-sans"
                    >
                      <span className="text-[18px] font-semibold leading-none text-cream/35 transition-colors duration-300 group-hover:text-cream/70">
                        {item.index}
                      </span>

                      <span className="mt-[7px] whitespace-nowrap text-[15px] font-semibold leading-[1.15] text-cream transition-opacity duration-300 group-hover:opacity-70">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </motion.div>

                {/* SECONDARY NAV MOBILE */}
                <motion.div
                  className="mt-8 grid grid-cols-2 gap-5 pb-8 lg:hidden"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.55, delay: 0.85 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {SECONDARY_NAV.map((item) => (
                    <Link
                      key={item.index}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex flex-col items-center text-center font-sans"
                    >
                      <span className="text-[16px] font-semibold leading-none text-cream/35">
                        {item.index}
                      </span>

                      <span className="mt-1 text-[14px] font-semibold leading-tight text-cream">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              </motion.nav>

              {/* FOOTER */}
              <motion.div
                className="relative hidden h-[92px] shrink-0 grid-cols-[1fr_auto_1fr] items-center px-[70px] pb-[22px] text-cream lg:grid"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1, duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="absolute bottom-[22px] left-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black text-cream">
                  <span className="font-sans text-[18px] font-bold tracking-[-0.08em]">
                    co
                  </span>
                </div>

                <div className="flex items-center gap-[90px] justify-self-start">
                  <a
                    href="tel:+39057739911"
                    className="flex items-center gap-[14px] font-sans text-[15px] font-bold text-cream/55 transition-opacity duration-300 hover:opacity-70"
                  >
                    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-cream text-cream">
                      <PhoneIcon />
                    </span>
                    <span>+39 0577 39911</span>
                  </a>

                  <a
                    href="mailto:info@sanfelice.com"
                    className="flex items-center gap-[14px] font-sans text-[15px] font-bold text-cream/55 transition-opacity duration-300 hover:opacity-70"
                  >
                    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-cream text-cream">
                      <MailIcon />
                    </span>
                    <span>info@sanfelice.com</span>
                  </a>
                </div>

                <div className="justify-self-center text-center font-sans text-[14px] font-normal leading-[1.25] text-cream/45">
                  Società Agricola San Felice S.p.A.
                  <br />
                  Loc. San Felice, 53019 Castelnuovo Berardenga (Siena)
                </div>

                <div className="flex items-center gap-[16px] justify-self-end">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream text-cream transition-colors duration-300 hover:bg-cream hover:text-dark-green"
                  >
                    <InstagramIcon />
                  </a>

                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream text-cream transition-colors duration-300 hover:bg-cream hover:text-dark-green"
                  >
                    <FacebookIcon />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* NORMAL HEADER */}
      {!menuOpen && (
        <motion.header
          initial="hidden"
          animate="show"
          variants={headerInit}
          className={`fixed left-0 top-0 w-full border-b transition-colors duration-[400ms] ${scrolled
              ? "border-dark-green/10 bg-cream/95 backdrop-blur-sm"
              : "border-cream/15 bg-transparent"
            }`}
          style={{
            zIndex: 1001,
            transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="mx-auto flex h-[70px] items-center justify-between px-6 lg:h-[100px] lg:px-10">
            <div className="flex flex-1 items-center gap-6">
              <motion.nav
                variants={fadeSlide}
                className={`hidden items-center gap-6 lg:flex ${navColor}`}
              >
                <button className="group relative flex cursor-pointer items-center gap-1 font-sans text-[15px] font-bold">
                  En <Chevron />
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                </button>

                <button className="group relative flex cursor-pointer items-center gap-1.5 font-sans text-[15px] font-bold">
                  <SearchIcon /> Search
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                </button>
              </motion.nav>
            </div>

            <motion.div
              variants={fadeSlide}
              className={`flex flex-col items-center transition-colors duration-300 ${onDark ? "text-cream" : "text-dark-text"
                }`}
            >
              <Link href="/">
                <HeroLogo className="h-8 sm:h-10 w-auto" />
              </Link>
            </motion.div>

            <motion.div variants={fadeSlide} className="flex flex-1 items-center justify-end gap-6">
              <nav className={`hidden items-center gap-6 lg:flex ${navColor}`}>
                <Link href="#" className="group relative font-sans text-[15px] font-bold">
                  Book an appointment
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                </Link>
              </nav>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="main-nav-overlay"
                className={`group flex h-[44px] w-[58px] cursor-pointer items-center justify-center transition-colors duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-current ${onDark ? "text-cream" : "text-dark-text"
                  }`}
              >
                <BurgerIcon />
              </button>
            </motion.div>
          </div>
        </motion.header>
      )}
    </>
  );
}