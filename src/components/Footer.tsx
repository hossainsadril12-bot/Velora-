"use client";


import { motion, useReducedMotion, type Variants } from "framer-motion";
import type React from "react";
import TextLogo from "./TextLogo";
import TransitionLink from "./TransitionLink";

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-cream text-cream">
      {children}
    </span>
  );
}

const GROUPS = {
  resources: {
    heading: "Resources",
    links: [
      { text: "Download", href: "#" },
      { text: "Newsletter", href: "#" },
      { text: "Gallery", href: "#" },
      { text: "Video", href: "#" },
      { text: "Career", href: "#" },
      { text: "Privacy Policy", href: "/privacy-Policy" },
    ],
  },
  info: {
    heading: "Info",
    links: [
      { text: "About Us", href: "#" },
      { text: "News & Events", href: "#" },
      { text: "FAQ", href: "/faq" },
      { text: "Equity Partners", href: "https://riservata.agricolasanfelice.it" },
      { text: "Contact Us", href: "#" },
    ],
  },
};

const footerReveal: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const softReveal: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left center" },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function FooterGroup({
  heading,
  links,
}: {
  heading: string;
  links: { text: string; href: string }[];
}) {
  return (
    <motion.div variants={softReveal}>
      <h4 className="m-0 font-sans text-[13px] font-normal uppercase tracking-wider text-cream">
        {heading}
      </h4>

      <motion.div
        variants={lineReveal}
        className="mt-4 h-[1px] w-full bg-cream/40"
      />

      <motion.ul
        variants={containerStagger}
        className="m-0 mt-5 flex list-none flex-col gap-[12px] p-0"
      >
        {links.map((link, index) => (
          <motion.li key={`${link.text}-${index}`} variants={softReveal}>
            {link.href === "/privacy-policy" ? (
              <TransitionLink
                href={link.href}
                className="block font-sans text-[14px] font-light leading-[1.2] text-cream transition-opacity duration-300 hover:opacity-70"
              >
                {link.text}
              </TransitionLink>
            ) : (
              <TransitionLink
                href={link.href}
                className="block font-sans text-[14px] font-light leading-[1.2] text-cream transition-opacity duration-300 hover:opacity-70"
              >
                {link.text}
              </TransitionLink>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {
      initial: false as const,
      whileInView: undefined,
    }
    : {
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: {
        once: true,
        amount: 0.18,
      },
    };

  return (
    <motion.footer
      className="relative overflow-hidden bg-tan text-cream"
      variants={footerReveal}
      {...motionProps}
    >
      <motion.div
        className="mx-auto flex min-h-[500px] max-w-[1780px] flex-col px-6 pb-12 pt-[100px] lg:px-[78px]"
        variants={containerStagger}
      >
        {/* TOP AREA */}
        <motion.div className="grid grid-cols-1 gap-20 lg:grid-cols-2" variants={containerStagger}>
          {/* LEFT AREA: LOGO & CONTACT */}
          <motion.div className="flex flex-col" variants={containerStagger}>
            {/* LOGO */}
            <motion.div className="mb-16 flex justify-start" variants={logoReveal}>
              <TextLogo className="h-[60px] w-auto text-cream lg:h-[80px]" />
            </motion.div>

            {/* CONTACT AREA */}
            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr] sm:gap-16"
              variants={containerStagger}
            >
              {/* Phone + Email */}
              <motion.div
                className="flex flex-col gap-[22px]"
                variants={containerStagger}
              >
                <motion.a
                  variants={softReveal}
                  href="tel:+8801335086800"
                  className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
                >
                  <CircleIcon>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2-3-1.5-1 1.2A8 8 0 014.8 5.5L6 4.5 4.5 1.5 3 3.5z" fill="currentColor" />
                    </svg>
                  </CircleIcon>
                  <span className="font-sans text-[14px] font-light leading-[1.2] text-cream">
                    +880 1335 086800
                  </span>
                </motion.a>

                <motion.a
                  variants={softReveal}
                  href="mailto:info@eimanestates.com"
                  className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
                >
                  <CircleIcon>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M2.5 4.5L8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </CircleIcon>
                  <span className="font-sans text-[14px] font-light leading-[1.2] text-cream">
                    info@eimanestates.com
                  </span>
                </motion.a>
              </motion.div>

              {/* Location */}
              <motion.div className="flex items-start gap-3" variants={softReveal}>
                <CircleIcon>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.3 4.5 8.5 4.5 8.5s4.5-5.2 4.5-8.5A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="8" cy="6" r="1.6" fill="currentColor" />
                  </svg>
                </CircleIcon>
                <span className="max-w-[280px] font-sans text-[14px] font-light leading-[1.4] text-cream">
                  Rupsha Tower, Flat 10/B<br />
                  Plot 7, Road 17, Banani, Dhaka 1213<br />
                  Bangladesh
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT AREA: LINKS */}
          <motion.div
            className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:pt-[24px]"
            variants={containerStagger}
          >
            <FooterGroup
              heading={GROUPS.resources.heading}
              links={GROUPS.resources.links}
            />
            <FooterGroup
              heading={GROUPS.info.heading}
              links={GROUPS.info.links}
            />
          </motion.div>
        </motion.div>

        {/* BOTTOM LEGAL TEXT */}
        <motion.div
          className="mt-[120px] flex flex-col items-start justify-between gap-6 pr-0 font-sans text-[12px] font-light text-cream/60 sm:flex-row sm:items-center sm:pr-20"
          variants={softReveal}
        >
          <span>
            © {new Date().getFullYear()} Eiman Estates Ltd. All rights reserved.
          </span>

          {/* <div className="flex gap-8">
            <TransitionLink href="#" className="transition-colors duration-300 hover:text-cream">
              Terms & Conditions
            </TransitionLink>
            <TransitionLink href="/privacy-policy" className="transition-colors duration-300 hover:text-cream">
              Privacy Policy
            </TransitionLink>
          </div> */}
        </motion.div>
      </motion.div>

    </motion.footer>
  );
}