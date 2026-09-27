"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBooking } from "@/components/BookingProvider";
import { BROCHURE_PDF } from "@/lib/brochure";
import { CalendarIcon, DownloadIcon, GridIcon, MoreIcon } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const itemClass =
  "flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 text-left font-sans text-[15px] text-dark-text transition-colors duration-200 hover:bg-dark-text/[0.05] focus-visible:bg-dark-text/[0.06] focus-visible:outline-none";

/** Phone-only overflow menu: the download and booking actions live here. */
export default function BrochureActions({ onOpenGrid }: { onOpenGrid(): void }) {
  const { openBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const wrap = wrapRef.current;
    wrap?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

    const onPointer = (e: PointerEvent) => {
      if (wrap && !wrap.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (!wrap) return;
      const items = [...wrap.querySelectorAll<HTMLElement>('[role="menuitem"]')];
      const at = items.indexOf(document.activeElement as HTMLElement);
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(at + 1) % items.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(at - 1 + items.length) % items.length]?.focus();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const run = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full text-dark-text transition-colors duration-200 active:bg-dark-text/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text"
      >
        <MoreIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Brochure actions"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute right-0 top-full z-30 mt-2 w-56 origin-top-right overflow-hidden rounded-xl bg-white py-1.5 shadow-[0_6px_8px_rgb(0_0_0/0.10)]"
          >
            <a
              role="menuitem"
              href={BROCHURE_PDF}
              download="Velora-Inani-Brochure.pdf"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <DownloadIcon size={20} />
              Download PDF
            </a>
            <button type="button" role="menuitem" onClick={run(openBooking)} className={itemClass}>
              <CalendarIcon size={20} />
              Book Appointment
            </button>
            <button type="button" role="menuitem" onClick={run(onOpenGrid)} className={itemClass}>
              <GridIcon size={20} />
              All pages
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
