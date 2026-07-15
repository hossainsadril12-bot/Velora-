"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "X",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "WhatsApp",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.77.464 3.493 1.344 5.01L2 22l5.12-1.341c1.464.846 3.146 1.293 4.911 1.293 5.541 0 10.031-4.49 10.031-10.032S17.572 2 12.031 2zm5.498 14.51c-.244.686-1.42 1.3-1.956 1.378-.506.074-1.166.115-3.328-.781-2.604-1.08-4.28-3.742-4.41-3.916-.13-.174-1.054-1.403-1.054-2.678 0-1.275.663-1.905.898-2.158.235-.253.513-.317.686-.317.173 0 .346.002.497.009.16.007.373-.064.582.441.218.528.686 1.674.747 1.796.06.122.101.265.014.44-.087.174-.13.282-.26.425-.13.144-.275.32-.39.426-.13.116-.265.244-.117.502.149.259.664 1.101 1.428 1.785.986.88 1.815 1.149 2.074 1.272.26.123.411.102.564-.071.152-.174.654-.761.828-1.021.174-.26.347-.217.585-.128.238.089 1.503.708 1.761.838.258.129.431.194.493.303.061.108.061.632-.183 1.318z" />
        </svg>
      ),
      url: "#",
    },
  ];

  return (
    <div
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-center gap-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } }}
            className="flex flex-col gap-5 pb-2"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  delay: (socialLinks.length - 1 - index) * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_16px_0_rgba(1,86,63,0.15)] text-dark-green transition-all hover:bg-white/70 hover:scale-110"
                aria-label={link.name}
              >
                {link.icon}
                <span className="absolute right-full mr-4 rounded-md bg-white/60 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-dark-green opacity-0 shadow-sm transition-opacity group-hover:opacity-100 whitespace-nowrap">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(1,86,63,0.2)] text-dark-green transition-transform hover:scale-105 focus:outline-none"
        aria-label="Social media menu"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full border border-white/60 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>
    </div>
  );
}
