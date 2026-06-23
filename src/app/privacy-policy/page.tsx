"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen overflow-hidden bg-velora-cream px-6 pb-12 pt-24 sm:px-12 sm:pb-16 sm:pt-28 lg:px-24 lg:pb-20 lg:pt-32 text-[#000000]"
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

        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center">
          {/* PAGE HEADER */}
          <div className="mb-12 w-full border-b border-[#183029]/25 pb-8 text-center">
            <h1 className="font-serif text-4xl font-light text-dark-text md:text-5xl lg:text-6xl">
              PRIVACY POLICY
            </h1>
          </div>

          {/* CONTENT */}
          <div className="w-full space-y-8 text-center font-sans text-sm font-light leading-relaxed md:text-base">
            <section className="space-y-4">
              <p>
                We respect and recognize the importance of protecting your
                personal information when you browse our website and seek our
                services. This Privacy Policy explains how we collect, use, and
                protect your information. We are committed to complying with this
                policy to ensure that your privacy is not breached.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Information We Collect
              </h2>

              <p>
                When you use our services, you may voluntarily provide personal
                information such as your name, phone number, email address,
                contact address, or other relevant details. We may collect
                personal identification information through contact form
                submissions, blog subscriptions, service requests, application
                forms, or other features available on our website.
              </p>

              <p>
                We only collect information when you provide it to us
                voluntarily. This helps us enhance your user experience and
                provide better products, services, and support.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Cookies
              </h2>

              <p>
                Cookies are small pieces of data that may be transmitted from a
                website to your computer or device while browsing. They help
                identify your browser and improve your experience on our website.
              </p>

              <p>
                When you interact with our website and use our services, we may
                store one or more cookies on your device. This allows us to
                customize your experience and provide you with relevant
                information more efficiently.
              </p>

              <p>
                You may choose to disable cookies by changing your browser
                settings. However, if you do so, some features and resources on
                our website may not function properly or may not be available.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Usage Logs
              </h2>

              <p>
                When you interact with our website, your device may automatically
                transmit non-personal identification information. This may
                include your IP address, browser software, device information,
                operating system, and other technical details.
              </p>

              <p>
                This information helps us understand how visitors use our
                website, improve website performance, and maintain security.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                How We Use the Information Collected
              </h2>

              <p>
                We may use the information we collect for the following
                purposes:
              </p>

              <div className="mx-auto mt-6 w-full max-w-3xl border-t border-[#183029]/20">
                {[
                  "To improve our customer service.",
                  "To personalize your experience.",
                  "To make our website more user-friendly.",
                  "To send periodic emails regarding updates, content, services, or relevant information.",
                  "To respond to your questions, requests, or inquiries.",
                ].map((item) => (
                  <div
                    key={item}
                    className="border-b border-[#183029]/20 px-4 py-4 text-center font-sans text-base font-light leading-relaxed tracking-wide text-[#2B2B2B] md:text-lg"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p>
                If at any time you would like to unsubscribe from receiving
                future emails, we include unsubscribe instructions at the bottom
                of each email. You may also contact us through our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                How We Protect Your Information
              </h2>

              <p>
                Your privacy is important to us, and we are committed to
                protecting your personal information. We implement appropriate
                data collection, storage, and security measures to protect your
                information from unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Children Under the Age of 13
              </h2>

              <p>
                We do not knowingly collect personal identification information
                from any person under the age of 13. Our services and website are
                not designed to attract anyone under the age of 13.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Changes / Amendments
              </h2>

              <p>
                Eiman Estates Ltd. reserves the right to update this Privacy
                Policy at any time. We encourage visitors to check this page
                frequently to stay informed about how we protect the information
                we collect.
              </p>

              <p>
                By using this website, you indicate your acceptance of this policy
                and terms of service. And in case of any changes in the privacy
                policy, your continued use of the website and services will be
                regarded as your consent to our policy. If you have any queries,
                please feel free to{" "}
                <Link
                  href="/contact"
                  className="text-tan font-bold underline underline-offset-4 transition-colors duration-300 hover:text-tan/70"
                >
                  contact us
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}