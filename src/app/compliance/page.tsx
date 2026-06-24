"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CompliancePage() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-[#FDFBF7] pt-[84px] sm:pt-[100px] lg:pt-[160px] pb-12 sm:pb-16 lg:pb-24 text-[#000000] flex flex-col"
      >
        {/* Faded Shadow Animation Overlay */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 flex-grow lg:items-center items-start">

          {/* Left Side: Context & Branding */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:pr-12 pt-4 w-full">
            <div className="flex items-center mb-6 justify-center">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[4px] text-tan">
                Regulatory Standards
              </span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-[84px] font-thin text-dark-text tracking-wide mb-6 leading-none">
              Compliance
            </h1>

            {/* Divider Ornament */}
            <div className="flex items-center gap-3 mb-8 justify-center text-tan/40">
              <div className="h-px w-20 bg-tan/40"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b09b78" strokeWidth="1.2">
                <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="h-px w-20 bg-tan/40"></div>
            </div>

            <p className="max-w-[420px] font-sans text-[15px] md:text-[16px] font-light leading-[1.8] text-[#2B2B2B] text-center">
              At Eiman Estates, we are unwavering in our commitment to safe, lawful, and transparent development. We strictly adhere to all applicable laws, regulations, and industry standards to ensure the highest quality, safety, and trust in every aspect of our project.
            </p>
          </div>

          {/* Right Side: Regulatory Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* Card 1 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1865 413.919L66.5878 410.92L45.292 389.624C36.8936 381.225 49.4912 368.328 57.8895 376.726L73.1865 392.023L125.376 339.833C133.775 331.435 146.372 344.333 137.974 352.731C131.675 359.03 79.4853 412.419 76.7858 413.019L73.1865 413.919ZM502.703 511.7H116.378C111.579 511.7 107.68 507.501 107.68 502.702V465.509C51.5908 475.407 0.300781 432.215 0.300781 375.527C0.300781 332.335 30.5949 295.742 71.087 286.444L34.1942 66.5869C33.2943 61.1879 37.4935 56.0889 43.1924 56.0889H107.68V9.29805C107.68 4.19904 111.579 0.299805 116.378 0.299805H502.703C507.502 0.299805 511.701 4.19904 511.701 9.29805V502.702C511.701 507.501 507.502 511.7 502.703 511.7ZM125.376 493.703H493.704V18.2963H125.376V290.643C202.161 321.237 201.861 430.116 125.376 460.41V493.703ZM107.68 285.544V74.0854H53.6904L89.0834 284.044L107.68 285.544ZM91.7829 302.041C51.2908 302.041 18.2973 335.034 18.2973 375.527C18.2973 416.019 51.2908 449.012 91.7829 449.012C132.275 449.012 164.969 416.019 164.969 375.527C164.969 334.135 131.375 302.041 91.7829 302.041ZM457.412 332.335H204.561C192.863 332.335 192.863 314.338 204.561 314.338H457.412C469.109 314.338 469.109 332.335 457.412 332.335ZM457.412 377.026H204.561C192.863 377.026 192.863 359.03 204.561 359.03H457.412C469.109 359.03 469.109 377.026 457.412 377.026ZM457.412 422.017H204.561C192.863 422.017 192.863 404.021 204.561 404.021H457.412C469.109 404.021 469.109 422.017 457.412 422.017ZM457.412 467.009H161.969C149.972 467.009 149.972 449.012 161.969 449.012H457.412C469.109 449.012 469.109 467.009 457.412 467.009ZM457.412 150.87H347.633C342.534 150.87 338.635 146.671 338.635 141.872V98.9805C338.635 93.8815 342.534 89.9823 347.633 89.9823H457.412C462.211 89.9823 466.41 93.8815 466.41 98.9805V141.872C466.41 146.671 462.211 150.87 457.412 150.87ZM356.331 132.874H448.413V107.979H356.331V132.874ZM457.412 287.344H288.844C284.045 287.344 279.846 283.445 279.846 278.346V235.454C279.846 230.655 284.045 226.456 288.844 226.456H457.412C462.211 226.456 466.11 230.655 466.11 235.454V278.346C466.41 283.445 462.211 287.344 457.412 287.344ZM297.843 269.347H448.413V244.452H297.843V269.347ZM253.751 282.845H161.969C149.972 282.845 149.972 264.848 161.969 264.848H253.751C265.749 264.848 265.749 282.845 253.751 282.845ZM253.751 248.951H161.969C149.972 248.951 149.972 230.955 161.969 230.955H253.751C265.749 230.955 265.749 248.951 253.751 248.951ZM234.555 205.76C228.556 205.76 152.971 176.665 152.971 73.7855C152.971 67.7866 158.37 62.9876 165.269 65.3871C165.269 65.3871 199.462 78.2846 227.356 41.3918C230.956 36.5927 238.154 36.5927 241.754 41.3918C269.348 78.2846 303.841 65.3871 303.841 65.3871C310.14 62.9876 316.139 67.7866 316.139 73.7855C316.139 176.665 240.254 205.76 234.555 205.76ZM171.267 84.8833C175.767 157.769 222.257 182.064 234.555 187.163C246.553 182.064 293.344 157.769 297.843 84.8833C283.146 86.6829 257.651 85.4832 234.555 60.888C211.46 85.4832 185.965 86.6829 171.267 84.8833Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">1. </span>Legal Frameworks
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  BNBC 2020 (structural design, earthquake resistance, materials, plumbing), Building Construction Act (1952), Real Estate Development and Management Act (2010) compliant.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                  <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path d="M12 11v6" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">2. </span>Land Usage & Zoning Clearance
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Obtained from the relevant authorities.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 16c-2 0-3-1.5-3-3s1-3 3-3 3 1.5 3 3-1 3-3 3z" />
                  <path d="M12 16c-1-1-1.5-2.5-1.5-4a3.5 3.5 0 0 1 7 0" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">3. </span>Fire Safety Approval
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Obtained NOC (No Objection Certificate) from FSCD (Fire Safety and Civil Defense).
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* House layout */}
                  <rect x="7" y="7" width="10" height="10" />
                  <path d="M10 7V4" />
                  <path d="M14 7V4" />
                  <path d="M7 10H4" />
                  <path d="M7 14H4" />
                  {/* Dimension arrows */}
                  <path d="M2 2v20" />
                  <path d="M2 12h2" />
                  <path d="M20 22H4" />
                  <path d="M12 20v2" />
                  <path d="M4 4l-2-2m2 0L2 4" />
                  <path d="M4 20l-2 2m2 0l-2-2" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">4. </span>Setbacks & Density
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Adhered to Floor Area Ratios (FAR), Maximum Ground Coverage, and Perimeter Setbacks.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  <path d="M8 11h8v4H8z" />
                  <rect x="14" y="14" width="7" height="9" rx="1" />
                  <line x1="16" y1="17" x2="19" y2="17" />
                  <line x1="16" y1="19" x2="19" y2="19" />
                  <line x1="16" y1="21" x2="19" y2="21" />
                  <path d="M17 14v-2" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">5. </span>Developer’s Responsibilities
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Continuous site supervision by registered engineers, archiving of plans and permits on-site, notifying concerned customers and stakeholders upon completing different construction for inspections.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
