"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { BrochurePage } from "@/lib/brochure";

type ThumbnailStripProps = {
  pages: BrochurePage[];
  activeIndices: number[];
  reducedMotion: boolean;
  onSelect(index: number): void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ThumbnailStrip({ pages, activeIndices, reducedMotion, onSelect }: ThumbnailStripProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const first = activeIndices[0];
  const last = activeIndices[activeIndices.length - 1];

  // Keep the active page in view without moving the page scroll.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-index="${first}"]`);
    if (!list || !item) return;
    const target = item.offsetLeft - list.clientWidth / 2 + item.offsetWidth * (activeIndices.length / 2);
    list.scrollTo({ left: Math.max(0, target), behavior: reducedMotion ? "auto" : "smooth" });
  }, [first, activeIndices.length, reducedMotion]);

  return (
    <nav aria-label="Brochure pages" className="relative">
      <ol
        ref={listRef}
        className="brochure-thumbs flex gap-4 overflow-x-auto px-1 pb-2 pt-3 [perspective:900px] sm:gap-6"
      >
        {pages.map((page, i) => {
          const active = i >= first && i <= last;
          // Cover-flow: neighbours lean toward the active page.
          const offset = i < first ? i - first : i > last ? i - last : 0;
          const tilt = reducedMotion || Math.abs(offset) !== 1 ? 0 : offset < 0 ? 10 : -10;
          return (
            <li key={page.n} data-index={i} className="shrink-0">
              <button
                type="button"
                aria-label={`Go to page ${page.n}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onSelect(i)}
                className="group flex cursor-pointer flex-col items-center gap-2.5 focus-visible:outline-none"
              >
                <motion.span
                  initial={false}
                  animate={{
                    y: active && !reducedMotion ? -5 : 0,
                    scale: active && !reducedMotion ? 1.04 : 1,
                    rotateY: tilt,
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE }}
                  className={`relative block size-[88px] overflow-hidden rounded-[3px] bg-dark-text/5 shadow-[0_2px_6px_rgb(0_0_0/0.08)] outline-offset-[3px] transition-[outline-color,box-shadow] duration-300 sm:size-[112px] ${
                    active
                      ? "shadow-[0_6px_14px_rgb(0_0_0/0.14)] outline-[1.5px] outline-solid outline-dark-text"
                      : "outline-[1.5px] outline-solid outline-transparent group-hover:shadow-[0_4px_10px_rgb(0_0_0/0.12)] group-focus-visible:outline-dark-text/60"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP thumbs */}
                  <img
                    src={page.thumb}
                    alt=""
                    width={240}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover"
                  />
                </motion.span>
                <span
                  className={`font-sans text-[13px] tabular-nums transition-colors duration-300 ${
                    active ? "font-bold text-dark-text" : "text-dark-text/70"
                  }`}
                >
                  {page.n}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
