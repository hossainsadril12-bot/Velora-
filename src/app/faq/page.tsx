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
    <>
      <Header theme="light" />

      <main className="min-h-screen bg-velora-cream px-6 pb-24 pt-32 sm:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {/* HEADER */}
          <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl font-light text-dark-text md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 font-sans text-base text-[#2B2B2B] md:text-lg">
              Everything you need to know about owning a unit at Velora Inani.
            </p>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="overflow-hidden transition-all duration-300 border-[1.5px] bg-white border-tan"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left md:p-6"
                  >
                    <span className="font-sans text-lg font-medium pr-6 md:text-xl transition-colors duration-300 text-[#050505]">
                      {faq.question}
                    </span>
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:h-10 md:w-10 bg-tan text-white">
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-6 pt-0 font-sans text-base leading-relaxed text-[#555] md:px-6 md:text-lg">
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
      </main>

      <Footer />
    </>
  );
}
