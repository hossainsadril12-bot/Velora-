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
                <svg width="50" height="50" viewBox="0 0 1254 1254" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M668.178 310.627C676.071 310.144 684.405 313.124 690.313 318.351C696.24 323.624 699.816 331.052 700.233 338.977C700.71 348.147 697.489 354.804 691.599 361.395C697.563 367.951 697.802 373.685 700.98 381.574C752.529 389.813 779.655 414.711 837.162 408.172C835.411 395.177 840.199 383.416 854.19 380.678C860.118 379.495 866.277 380.784 871.237 384.245C876.093 387.583 879.344 392.792 880.207 398.623C882.528 414.221 871.268 422.644 857.234 424.553C874.268 472.702 895.037 521.915 912.855 570.116C918.213 570.07 928.377 568.996 927.643 577.127C919.493 667.339 777.132 668.22 766.441 578.438C765.339 569.186 775.552 569.975 781.418 570.074L819.846 471.235C825.939 455.559 834.499 435.245 839.471 419.532C787.902 428.512 750.368 404.111 703.227 393.822C705.805 407.972 708.15 420.344 692.469 427.535C692.26 507.834 694.575 589.187 694.85 669.629C706.858 669.733 711.891 671.766 719.539 681.654C725.306 689.112 731.074 696.711 736.787 704.218C748.39 704.132 759.149 703.452 768.278 712.459C775.962 720.04 777.046 728.269 777.04 738.299C789.611 738.237 812.486 735.06 813.031 755.547C813.197 761.885 814.489 778.888 810.833 783.113C804.784 785.109 768.749 784.35 759.687 784.35L674.455 784.332L582.519 784.344C566.803 784.35 551.105 784.473 535.384 784.24C527.585 784.552 527.643 779.335 527.451 772.949C526.412 738.439 532.131 737.95 563.814 738.36C563.7 728.643 564.752 720.15 572.143 712.802C581.552 703.452 592.24 704.132 604.15 704.206C609.547 696.87 615.049 689.523 620.559 682.279C628.103 672.372 633.032 669.635 645.401 669.665C645.131 589.769 647.244 507.643 648.009 427.605C632.126 419.793 634.869 408.409 637.098 393.764C624.95 396.023 612.114 400.503 600.386 404.561C567.611 415.901 536.337 425.828 501.191 419.297L539.907 518.169C546.543 535.142 554.041 553.048 560.119 570.118C572.641 570.039 577.473 570.151 574.387 584.749C558.999 657.523 451.697 666.922 419.821 601.634C416.966 595.787 415.102 589.127 414.204 582.685C412.298 569.006 417.807 569.911 428.653 570.117C434.176 553.426 442.758 532.752 449.157 516.118L484.065 424.684C470.754 422.77 460.071 416.498 460.32 401.338C460.408 395.59 462.859 390.132 467.096 386.248C471.751 381.941 478.009 379.8 484.327 380.352C490.151 380.786 495.534 383.619 499.189 388.175C504.105 394.354 504.332 400.726 503.337 408.048C555.755 415.579 590.417 390.999 639.933 381.337C642.045 373.375 643.049 367.8 648.493 361.458C644.605 356.899 642.009 352.291 640.845 346.318C639.253 338.218 641.078 329.821 645.878 323.108C651.456 315.342 659.037 311.979 668.178 310.627Z" fill="currentColor"/>
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
