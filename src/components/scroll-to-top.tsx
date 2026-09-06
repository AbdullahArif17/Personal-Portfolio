"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50"
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-zinc-800 bg-[#0a0a0c]/90 text-zinc-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-[#8b5cf6] hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 