"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

function ArrowLeft({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

/** "Back to Home" link used at the top of every inner page. */
export function BackToHomeLink({ className = "" }: { className?: string }) {
  return (
    <TransitionLink
      href="/"
      direction="backward"
      className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] text-dark-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-text ${className}`}
    >
      <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
      <span className="relative whitespace-nowrap">
        <span className="sm:hidden">Back</span>
        <span className="hidden sm:inline">Back to Home</span>
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </span>
    </TransitionLink>
  );
}

// Pages that place the link themselves (the brochure pairs it with Download).
const OWN_LINK = new Set(["/", "/brochure"]);

/**
 * Sits just under the fixed header on every inner page, aligned with the
 * header's left gutter, and scrolls away with the page.
 *
 * It stays in normal flow: the top padding clears the fixed header and the
 * matching negative margin hands that space back, so each page's own header
 * offset still applies and its content moves down by exactly one link row.
 */
export default function BackToHome() {
  const pathname = usePathname();
  if (OWN_LINK.has(pathname)) return null;

  return (
    <div className="relative z-40 -mb-[70px] px-6 pt-[70px] lg:-mb-[100px] lg:px-10 lg:pt-[100px]">
      <div className="pt-3 lg:pt-2">
        <BackToHomeLink />
      </div>
    </div>
  );
}
