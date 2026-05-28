import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageSquare } from "lucide-react";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-stone-950 text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-stone-950">
      
      {/* 1. Global Navigation Navbar */}
      <Navbar />

      {/* 2. Main Page Render Canvas */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Floating Call-Actions Hub */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-4 items-center">
        
        {/* Elegant Back-To-Top Trigger */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleScrollToTop}
              className="p-3 border border-stone-800 hover:border-[#D4AF37] rounded-full bg-stone-950/85 hover:bg-[#D4AF37] text-white hover:text-stone-950 shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Luxury WhatsApp Direct Floating Action */}
        <motion.a
          href="https://wa.me/39021234567?text=Hello%20Hanwa%20EVS%20Concierge%2C%20I%20would%20like%20to%20inquire%20about..."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="group relative flex items-center justify-center p-3.5 bg-stone-950 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-stone-950 border border-[#D4AF37]/45 hover:border-transparent rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.25)] transition-all duration-500 cursor-pointer"
          aria-label="Direct Chat via WhatsApp"
        >
          {/* Subtle gold ripple ring */}
          <span className="absolute -inset-1 border border-[#D4AF37]/15 rounded-full scale-100 group-hover:scale-110 group-hover:opacity-0 transition-all duration-[1000ms] pointer-events-none" />
          
          <MessageSquare className="w-4 h-4" />

          {/* Hover tool caption */}
          <span className="absolute right-14 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-stone-900 border border-stone-850 px-3 py-1.5 rounded text-[9px] uppercase tracking-widest text-[#D4AF37] transition-all duration-350 pointer-events-none font-semibold shadow-2xl whitespace-nowrap">
            Chat Concierge
          </span>
        </motion.a>

      </div>
    </div>
  );
}
export default MainLayout;
