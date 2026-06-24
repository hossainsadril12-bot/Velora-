"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "./BookingProvider";
import HeroLogo from "./HeroLogo";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    dateTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset state on modal open/close
  useEffect(() => {
    if (!isOpen) {
      // Small timeout to allow exit animation to complete before clearing state
      const timer = setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          address: "",
          email: "",
          dateTime: "",
        });
        setIsSubmitted(false);
        setErrors({});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Mobile Number is required";
    if (!formData.address.trim()) newErrors.address = "Contact Address is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.dateTime) newErrors.dateTime = "Preferred date & time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Slow-fading Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] bg-white rounded-none p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] z-10 overflow-hidden font-sans text-[#050505]"
          >
            {/* Close Button */}
            <button
              onClick={closeBooking}
              aria-label="Close booking modal"
              className="absolute top-6 right-6 text-gray-400 hover:text-[#050505] transition-colors duration-300 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="booking-form-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Heading with Eiman Estates Logo */}
                  <div className="flex flex-col items-center text-[#050505] mb-6">
                    <HeroLogo className="h-10 sm:h-12 w-auto mb-3 text-[#050505]" />
                    <h3 className="font-serif text-2xl uppercase tracking-wider text-[#050505] font-light">
                      Appointment Form
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="w-full space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        * Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-tan outline-none py-2 text-sm text-[#050505] transition-colors duration-300 placeholder-gray-400"
                        placeholder=""
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        * Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-tan outline-none py-2 text-sm text-[#050505] transition-colors duration-300 placeholder-gray-400"
                        placeholder=""
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Address Input */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        * Contact Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-tan outline-none py-2 text-sm text-[#050505] transition-colors duration-300 placeholder-gray-400"
                        placeholder=""
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        * Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-tan outline-none py-2 text-sm text-[#050505] transition-colors duration-300 placeholder-gray-400"
                        placeholder="+880 17XX XXXXXX"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Preferred Date & Time Input */}
                    <div className="relative">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        * Preferred Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-tan outline-none py-2 text-sm text-[#050505] transition-colors duration-300 placeholder-gray-400"
                      />
                      {errors.dateTime && (
                        <p className="text-xs text-red-500 mt-1">{errors.dateTime}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-4 bg-tan hover:bg-[#9c8965] text-white text-xs font-bold uppercase tracking-[2.5px] rounded-none transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success-content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center text-center py-6 w-full"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tan/10 text-tan mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>

                  <h3 className="font-serif text-2xl uppercase tracking-wider text-[#050505] font-light mb-4">
                    Booking Requested
                  </h3>

                  <p className="text-sm leading-relaxed text-[#050505] px-2 font-normal">
                    Thanks for your request. You will soon receive a confirmation call/text/email from our designated official. Note, appointment slots are scheduled following availability
                  </p>

                  <div className="mt-8 w-full">
                    <button
                      onClick={closeBooking}
                      className="w-full py-3 border border-tan text-tan hover:bg-tan hover:text-white text-xs font-bold uppercase tracking-[2px] rounded-none transition-all duration-300 focus:outline-none cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
