"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <><motion.main
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
          <div className="mb-16 mt-24 w-full text-center">
            <h1 className="font-serif text-4xl font-light text-dark-text md:text-5xl lg:text-6xl mb-8">
              PRIVACY POLICY
            </h1>
            <p className="mx-auto max-w-3xl font-sans text-sm font-light leading-relaxed md:text-base text-[#2B2B2B]">
              We respect and recognize the importance of protecting your personal information when you browse
              our website and seek services. The following is our privacy policy and we will comply with it to ensure
              your privacy is not breached.
            </p>
            <div className="mt-16 w-full border-b border-[#183029]/15" />
          </div>

          {/* CONTENT */}
          <div className="w-full space-y-16 sm:space-y-24 lg:space-y-[130px] text-center font-sans text-sm font-light leading-relaxed md:text-base">

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Information We Collect
              </h2>

              <p>
                When you use our services, you may provide personal information about yourself <br className="hidden sm:inline" /> (your name, phone
                number, email address, contact address, etc.). We may collect personal identification information
                through several ways, including contact form submissions on our site, blog subscriptions, and via other
                services, features, or application forms we make available on our website. We only collect information
                when you provide it to us voluntarily to enhance your user experience in connection with the products
                and services we offer.
              </p>

            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Cookies
              </h2>

              <p>
                Cookies are small bits of data that can be transmitted from a website to your computer or devices
                while browsing to uniquely identify your browser. When you interact with the site and use our services,
                we may store one more cookie on your device. This is to enhance the user experience through
                customization so that we can provide you with the exact information you want regularly. You may opt
                out of receiving cookies by changing your browser settings. However, if you choose to do so, some of
                the features and resources on our website might not be available to you.
              </p>


            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Usage Logs
              </h2>

              <p>
                When you interact with the website, the device through which you browse also transmits a variety of
                non-personal identification information, such as your IP address, browser software, and other technical
                information, which we may collect.
              </p>




            </section>

            <section className="space-y-6">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                HOW WE USE THE INFORMATION COLLECTED
              </h2>

              <p>
                We use the information for the following purposes:
              </p>

              <div className="mx-auto mt-8 w-full max-w-3xl">
                {[
                  "To improve our customer service",
                  "To personalize your experience",
                  "To make our site user-friendly",
                ].map((item) => (
                  <div
                    key={item}
                    className="border-b border-[#183029]/20 px-4 py-4 text-center font-sans text-base font-light leading-relaxed tracking-wide text-[#2B2B2B] md:text-lg"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-1 font-sans text-sm font-light leading-relaxed text-[#2B2B2B] md:text-base">
                <p>To send periodic emails regarding updates, content, etc.</p>
                <p>as well as respond to your queries</p>
              </div>

              <p className="mx-auto max-w-3xl pt-4 font-sans text-sm font-light leading-relaxed text-[#2B2B2B] md:text-base">
                If at any time you would like to unsubscribe from receiving future emails, we include detailed
                unsubscribe instructions at the bottom of each email, or you may contact us via our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                How We Protect Your Information
              </h2>

              <p>
                Your privacy is important, and we are committed to protecting. We implement appropriate data
                collection & storage and ensure security measures to protect your personal information from
                unauthorized access or disclosure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                Children Under the Age of 13
              </h2>

              <p>
                We will not knowingly collect personal identification information from any person under the age of 13.
                Neither our services nor our site is designed to attract the attention of anyone under the age of 13
              </p>
            </section>

            <section className="space-y-8 pt-6">
              <h2 className="font-serif text-2xl font-light uppercase text-dark-text md:text-3xl">
                CHANGES/ AMENDMENTS
              </h2>

              <p className="mx-auto max-w-3xl font-sans text-sm font-light leading-relaxed text-[#2B2B2B] md:text-base">
                Eiman Estates Ltd. reserves the discretion to update this privacy policy at any time. We encourage you
                to check back on this page frequently to stay updated.
              </p>

              <div className="w-full border-b border-[#183029]/10 my-10" />

              <p className="mx-auto max-w-3xl font-sans text-sm font-light leading-relaxed text-[#2B2B2B] md:text-base">
                By using this website, you indicate your acceptance of this policy
                and terms of service. And in case of any changes in the privacy
                policy, your continued use of the website and services will be
                regarded as your consent to our policy. If you have any queries,
                please feel free to{" "}
                <a
                  href="mailto:info@eimanestates.com"
                  className="text-tan transition-opacity duration-300 hover:opacity-85"
                >
                  contact us
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </motion.main></>
  );
}