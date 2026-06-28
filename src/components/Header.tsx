"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import HeroLogo from "./HeroLogo";
import TransitionLink from "./TransitionLink";
import { useBooking } from "./BookingProvider";
import { useIntro } from "./IntroProvider";
import { smoothScrollToId, lockScroll } from "@/lib/scroll";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const PRIMARY_NAV = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "People",
    href: "/people",
  },
  {
    label: "Honourable Adviser",
    href: "/adviser",
  },
  {
    label: "Equity Partners",
    href: "/?scroll=equity-partners",
    scrollId: "equity-partners",
  },
];

const SECONDARY_NAV = [
  { label: "Compliance", href: "/compliance" },
  { label: "Environment", href: "/environment" },
  { label: "Collaboration", href: "/collaboration" },
  { label: "Projects", href: "/?scroll=projects", scrollId: "projects" },
  { label: "News & Events", href: "#news" },
  { label: "Contact Us", href: "/?scroll=footer", scrollId: "footer" },
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

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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

function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24,2.5A21.52,21.52,0,0,0,5.15,34.36L2.5,45.5l11.14-2.65A21.5,21.5,0,1,0,24,2.5ZM13.25,12.27h5.86a1,1,0,0,1,1,1,10.4,10.4,0,0,0,.66,3.91,1.93,1.93,0,0,1-.66,2.44l-2.05,2a18.6,18.6,0,0,0,3.52,4.79A18.6,18.6,0,0,0,26.35,30l2-2.05c1-1,1.46-1,2.44-.66a10.4,10.4,0,0,0,3.91.66,1.05,1.05,0,0,1,1,1v5.86a1.05,1.05,0,0,1-1,1,23.68,23.68,0,0,1-15.64-6.84,23.6,23.6,0,0,1-6.84-15.64A1.07,1.07,0,0,1,13.25,12.27Z" />
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

export default function Header({ theme = "default" }: { theme?: "default" | "light" } = {}) {
  const { openBooking } = useBooking();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [selectedLang, setSelectedLang] = useState("En");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setHovered(null);
  };

  useEffect(() => {
    lockScroll(menuOpen);

    if (menuOpen) {
      panelRef.current?.focus();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };

    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownOpen]);

  const pathname = usePathname();
  const { introState, introDone } = useIntro();
  // The cinematic intro only runs on the homepage. While it runs, the logo
  // stays fixed in its navbar position (no morph) and the nav controls hold
  // back until the hero image has covered the frame.
  const introRunning = pathname === "/" && !introDone;

  /** Handles clicks on scroll-anchor links inside the nav menu */
  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    scrollId: string
  ) => {
    e.preventDefault();
    closeMenu();
    if (pathname === "/") {
      // Already on home: just scroll after menu close animation
      setTimeout(() => smoothScrollToId(scrollId, 2200, 80), 300);
    } else {
      // On another page: save target, then navigate home
      sessionStorage.setItem("scrollTo", scrollId);
      router.push("/");
    }
  };

  const onDark = theme === "light" ? false : !scrolled;
  const navColor = onDark ? "text-cream" : "text-black";

  // Logo color during the homepage intro: dark over the cream idle frame,
  // then cream once the hero image expands to cover the viewport. Outside the
  // intro it follows the normal nav color.
  const logoColor = introRunning
    ? introState === "idle"
      ? "text-black"
      : "text-cream"
    : onDark
      ? "text-cream"
      : "text-black";

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
              <div className="relative flex h-[112px] shrink-0 items-center justify-between px-6 lg:px-[70px]">
                <div />

                <motion.div
                  className="absolute left-1/2 top-[51px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.5, delay: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <TransitionLink href="/" direction="backward">
                    <HeroLogo className="h-12 w-auto text-white" />
                  </TransitionLink>
                </motion.div>

                <motion.div
                  className="ml-auto flex items-center"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: EASE, duration: 0.5, delay: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <button
                    onClick={closeMenu}
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
                className="flex flex-1 flex-col items-center justify-center px-6 lg:px-[84px]"
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
                <div className="w-full max-w-[1040px]">
                  {PRIMARY_NAV.map((item, i) => {
                    const active = hovered === i;
                    const dim = hovered !== null && hovered !== i;

                    return (
                      <motion.div
                        key={item.label}
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

                        {"scrollId" in item && item.scrollId ? (
                          <a
                            href={item.href}
                            onClick={(e) => handleScrollClick(e, item.scrollId as string)}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex h-[118px] items-center justify-center overflow-hidden text-center text-cream lg:h-[128px] cursor-pointer"
                          >
                            <motion.div
                              className="flex items-center justify-center"
                              style={{ transformOrigin: "center center" }}
                              initial={false}
                              animate={{
                                opacity: dim ? 0.45 : 1,
                                x: active ? 10 : 0,
                              }}
                              transition={{ ease: EASE, duration: 0.45 }}
                            >
                              <span className="block font-serif text-[38px] font-thin leading-none tracking-tight transition-colors duration-300 sm:text-[48px] md:text-[60px] lg:text-[72px]">
                                {item.label}
                              </span>
                            </motion.div>
                          </a>
                        ) : (
                          <TransitionLink
                            href={item.href}
                            onClick={closeMenu}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            direction="forward"
                            className="relative flex h-[118px] items-center justify-center overflow-hidden text-center text-cream lg:h-[128px]"
                          >
                            <motion.div
                              className="flex items-center justify-center"
                              style={{ transformOrigin: "center center" }}
                              initial={false}
                              animate={{
                                opacity: dim ? 0.45 : 1,
                                x: active ? 10 : 0,
                              }}
                              transition={{ ease: EASE, duration: 0.45 }}
                            >
                              <span className="block font-serif text-[38px] font-thin leading-none tracking-tight transition-colors duration-300 sm:text-[48px] md:text-[60px] lg:text-[72px]">
                                {item.label}
                              </span>
                            </motion.div>
                          </TransitionLink>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

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
                  {SECONDARY_NAV.map((item) =>
                    "scrollId" in item && item.scrollId ? (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleScrollClick(e, item.scrollId as string)}
                        className="group flex flex-col items-center text-center font-sans cursor-pointer"
                      >
                        <span className="whitespace-nowrap text-[15px] font-thin leading-[1.15] text-cream transition-opacity duration-300 group-hover:opacity-70">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <TransitionLink
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        direction="forward"
                        className="group flex flex-col items-center text-center font-sans"
                      >
                        <span className="whitespace-nowrap text-[15px] font-thin leading-[1.15] text-cream transition-opacity duration-300 group-hover:opacity-70">
                          {item.label}
                        </span>
                      </TransitionLink>
                    )
                  )}
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
                  {SECONDARY_NAV.map((item) =>
                    "scrollId" in item && item.scrollId ? (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleScrollClick(e, item.scrollId as string)}
                        className="group flex flex-col items-center text-center font-sans cursor-pointer"
                      >
                        <span className="text-[14px] font-thin leading-tight text-cream">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <TransitionLink
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        direction="forward"
                        className="group flex flex-col items-center text-center font-sans"
                      >
                        <span className="text-[14px] font-thin leading-tight text-cream">
                          {item.label}
                        </span>
                      </TransitionLink>
                    )
                  )}
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
                    href="tel:+8801335086800"
                    className="flex items-center gap-[14px] font-sans text-[15px] font-bold text-cream/55 transition-opacity duration-300 hover:opacity-70"
                  >
                    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-cream text-cream">
                      <PhoneIcon />
                    </span>
                    <span>+880 1335 086800</span>
                  </a>

                  <a
                    href="mailto:info@eimanestates.com"
                    className="flex items-center gap-[14px] font-sans text-[15px] font-bold text-cream/55 transition-opacity duration-300 hover:opacity-70"
                  >
                    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-cream text-cream">
                      <MailIcon />
                    </span>
                    <span>info@eimanestates.com</span>
                  </a>
                </div>

                <div className="justify-self-center text-center font-sans text-[14px] font-normal leading-[1.25] text-cream/45">
                  Rupsha Tower, Flat 10/B, Plot 7
                  <br />
                  Road 17, Banani, Dhaka 1213, Bangladesh
                </div>

                <div className="flex items-center gap-[16px] justify-self-end">
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream text-white transition-colors duration-300 hover:bg-cream hover:text-dark-green"
                  >
                    <WhatsAppIcon />
                  </a>

                  <a
                    href="#"
                    aria-label="X"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream text-cream transition-colors duration-300 hover:bg-cream hover:text-dark-green"
                  >
                    <XIcon />
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
          className={`fixed left-0 top-0 w-full border-b transition-colors duration-[400ms] ${theme === "light"
            ? "border-black/10 bg-white"
            : scrolled
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
                animate={introRunning ? "hidden" : "show"}
                className={`flex items-center gap-3 lg:gap-6 ${navColor}`}
              >
                <div className="relative" ref={langDropdownRef}>
                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="group relative flex cursor-pointer items-center gap-1 font-sans text-[15px] font-bold focus:outline-none"
                    aria-haspopup="listbox"
                    aria-expanded={langDropdownOpen}
                  >
                    <span>{selectedLang}</span>

                    <motion.span
                      animate={{ rotate: langDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center"
                    >
                      <Chevron />
                    </motion.span>

                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100 ${langDropdownOpen ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {langDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 z-50 mt-3 flex w-24 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/45 py-1.5 text-white shadow-xl backdrop-blur-md"
                        role="listbox"
                      >
                        {["En", "Bn", "Ar", "Ch"].map((lang) => (
                          <button
                            key={lang}
                            role="option"
                            aria-selected={selectedLang === lang}
                            onClick={() => {
                              setSelectedLang(lang);
                              setLangDropdownOpen(false);
                            }}
                            className={`block w-full cursor-pointer px-4 py-2 text-left font-sans text-[14px] font-bold transition-colors duration-200 ${selectedLang === lang
                              ? "text-tan"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                              }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  aria-label="Search"
                  className="group relative flex cursor-pointer items-center gap-1.5 font-sans text-[15px] font-bold"
                >
                  <SearchIcon /> <span className="hidden lg:inline">Search</span>
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                </button>
              </motion.nav>
            </div>

            <motion.div
              variants={fadeSlide}
              className={`flex flex-col items-center transition-colors duration-700 ${logoColor}`}
            >
              <TransitionLink href="/" direction="backward">
                <div className="block" style={{ color: "inherit" }}>
                  <HeroLogo className="h-8 w-auto sm:h-10" />
                </div>
              </TransitionLink>
            </motion.div>

            <motion.div
              variants={fadeSlide}
              animate={introRunning ? "hidden" : "show"}
              className="flex flex-1 items-center justify-end gap-6"
            >
              <nav className={`hidden items-center gap-6 lg:flex ${navColor}`}>
                <button
                  onClick={openBooking}
                  className="group relative cursor-pointer font-sans text-[15px] font-bold focus:outline-none"
                >
                  Book an Appointment
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100" />
                </button>
              </nav>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="main-nav-overlay"
                className={`group flex h-[44px] w-[58px] cursor-pointer items-center justify-center transition-colors duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-current ${onDark ? "text-cream" : "text-black"
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