"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What exactly do I own when I purchase a unit?",
    answer:
      "You own a specific hotel unit with a registered deed (Saf Kabala) in your name, along with a proportional undivided share in the project land. Both are legally documented and registered under the laws of Bangladesh.",
  },
  {
    question: "Will I receive a registered deed in my name?",
    answer:
      "Yes. Upon full payment, a Unit Ownership Deed (Saf Kabala) is executed and registered under the Registration Act, 1908. Your proportional land share is also mutated and registered in your name.",
  },
  {
    question: "How does the profit sharing work?",
    answer:
      "The hotel operates as a single business. All revenue is pooled, operating costs and a management fee are deducted, and the remaining net profit is distributed to unit owners in proportion to their unit's size relative to the total hotel.",
  },
  {
    question: "Can I use my unit personally?",
    answer:
      "This is your property — and we want you to enjoy it. Unit owners have priority booking rights and discounted usage of their unit and hotel facilities, subject to the hotel's operational schedule and availability.",
  },
  {
    question: "Can I sell or transfer my unit?",
    answer:
      "Your unit is a legally owned asset that can be held, transferred, or inherited. All transfers are subject to the terms of your ownership agreement and require prior written approval from Eiman Estates to ensure operational continuity.",
  },
  {
    question: "What is the equity model?",
    answer:
      "The equity model allows you to introduce additional participants into your unit — family members, business partners, or trusted associates — each holding a documented fractional interest. You remain the primary registered owner. All sub-participation is structured and managed under the oversight of Eiman Estates.",
  },
  {
    question: "Who manages the hotel?",
    answer:
      "Eiman Estates retains full and exclusive operational control of the hotel — from construction through to daily guest experience and financial reporting. Owners are not required to be involved in any aspect of hotel management.",
  },
  {
    question: "Who designed the project?",
    answer:
      "Velora Inani is designed by HuaDu Architecture & Urban Design (HDD), a Shanghai-based firm with projects across Asia, Europe, and the Americas. Structural advisory is led by Prof. Dr. M Shamim Z Bosunia, one of Bangladesh's most prominent structural engineers.",
  },
  {
    question: "What stage is the project currently at?",
    answer:
      "The project land at Inani has been secured and development is underway. A limited number of units are being offered in this first phase.",
  },
  {
    question: "When will the hotel be operational?",
    answer:
      "Construction timelines and projected completion dates are shared with investors during the onboarding process. Eiman Estates provides regular progress updates to all unit owners throughout the development phase.",
  },
  {
    question: "Where exactly is the project located?",
    answer:
      "Velora Inani is located on Marine Drive, Inani, Cox's Bazar — set along an elevated stretch of coastline where the hills meet the sea, away from the main tourist corridor.",
  },
  {
    question: "Is my investment legally protected?",
    answer:
      "Your ownership is structured under the Registration Act, 1908, the Transfer of Property Act, 1882, and the Companies Act, 1994, among other applicable laws of Bangladesh. All terms are documented in a comprehensive ownership agreement.",
  },
  {
    question: "What happens to my unit if Eiman Estates faces financial difficulty?",
    answer:
      "Your unit and proportional land share are registered in your name under the laws of Bangladesh. This ownership survives independently of the Company's status. Your registered deed and land title are your assets — they do not form part of the Company's holdings.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <><main className="min-h-screen bg-[#FDFBF7] px-6 pb-24 pt-32 sm:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-3xl flex flex-col items-center">
          {/* HEADER */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[72px] font-thin text-dark-text tracking-widest uppercase mb-0">
              FAQ
            </h1>
          </div>

          {/* FAQ LIST */}
          <div className="w-full flex flex-col">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const isLast = idx === FAQS.length - 1;

              return (
                <div
                  key={idx}
                  className={`w-full transition-all duration-300 ${
                    !isLast ? "border-b border-tan/20" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full flex-col items-center text-center py-6 md:py-8 focus:outline-none cursor-pointer group"
                  >
                    <span className="font-sans text-[22px] sm:text-[32px] font-light leading-snug text-[#2B2B2B] transition-colors duration-300 group-hover:text-tan">
                      {faq.question}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#4A4A4A] text-center max-w-2xl mx-auto">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main></>
  );
}
