import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white"
        >
          {/* Subtle architectural framing detail */}
          <div className="absolute inset-8 border border-stone-900 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo and tracking title */}
            <motion.h1
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif tracking-[0.35em] text-white font-light text-center uppercase"
            >
              HANWA <span className="text-[#D4AF37] font-normal">EVS</span>
            </motion.h1>
            
            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-[#D4AF37]/50 my-6"
            />
            
            {/* Luxury Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.25em] text-stone-300 font-sans"
            >
              bespoke events &amp; interior architecture
            </motion.p>
          </div>

          {/* Dynamic premium loader bar at bottom */}
          <div className="absolute bottom-16 w-32 h-[1px] bg-stone-900 overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default LoadingScreen;
