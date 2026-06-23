import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Home, ArrowRight } from "lucide-react";

export function SplitHero() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<"left" | "right">("left");

  const scrollIntoSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[90vh] md:h-screen flex flex-col md:flex-row overflow-hidden bg-[#031F12]">
      {/* Background/Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(0,0,0,0))] pointer-events-none z-10" />

      {/* MOBILE 2-TAB VIEW (Flex md:hidden) */}
      <div className="flex md:hidden flex-col w-full h-full justify-between relative p-6 pb-14 pt-28">
        {/* Animated Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMobileTab}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                activeMobileTab === "left"
                  ? "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MCLN4EH5Qjh0mDrIO5yBAG4yLQ3aMSfYr-VZoh7zMnDPEydfhBjlcNnT&s=10')"
                  : "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFFtgBs3kNxTn0x5IjFQaI88oODg2Im8HfU8S7j44_IzFDe66H_xnAMXY&s=10')",
            }}
          />
        </AnimatePresence>
        
        {/* Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02150C] via-[#02150C]/60 to-[#02150C]/40 z-0 pointer-events-none" />

        {/* Tab switcher pill */}
        <div className="relative z-10 flex justify-center w-full">
          <div className="flex bg-stone-950/80 backdrop-blur-md border border-[#073C23]/60 rounded-full p-1 w-full max-w-xs shadow-lg">
            <button
              onClick={() => setActiveMobileTab("left")}
              className={`flex-grow py-2.5 rounded-full text-[10px] font-montserrat tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer ${
                activeMobileTab === "left"
                  ? "bg-[#D4AF37] text-[#031F12] font-bold"
                  : "text-stone-400"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveMobileTab("right")}
              className={`flex-grow py-2.5 rounded-full text-[10px] font-montserrat tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer ${
                activeMobileTab === "right"
                  ? "bg-[#D4AF37] text-[#031F12] font-bold"
                  : "text-stone-400"
              }`}
            >
              Interiors
            </button>
          </div>
        </div>

        {/* Active tab content */}
        <div className="relative z-10 max-w-sm mt-auto">
          <AnimatePresence mode="wait">
            {activeMobileTab === "left" ? (
              <motion.div
                key="events-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-medium font-montserrat mb-4">
                  <Calendar size={11} />
                  Bespoke Events
                </div>

                <h2 className="text-3xl font-serif text-white font-light tracking-wide leading-tight">
                  Designing <br />
                  <span className="italic font-normal text-[#D4AF37]">Grand Memories.</span>
                </h2>
                
                <p className="text-[11px] text-stone-300 font-sans mt-3 leading-relaxed font-light">
                  Cathedral wedding layouts, suspended white orchids, and premium corporate stages configured with luxurious details.
                </p>

                <button
                  onClick={() => scrollIntoSection("#portfolio")}
                  className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat cursor-pointer"
                >
                  View Events Portfolio <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="interiors-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4D5D3B]/20 border border-[#4D5D3B]/40 text-[#FAFAFA] text-[9px] uppercase tracking-[0.2em] font-medium font-montserrat mb-4">
                  <Home size={11} />
                  Permanent Interiors
                </div>

                <h2 className="text-3xl font-serif text-white font-light tracking-wide leading-tight">
                  Creating <br />
                  <span className="italic font-normal text-stone-200">Luxury Architecture.</span>
                </h2>
                
                <p className="text-[11px] text-stone-300 font-sans mt-3 leading-relaxed font-light">
                  Luxury residential suite layouts, commercial showrooms, and custom design solutions integrating marble, concrete, and brass.
                </p>

                <button
                  onClick={() => scrollIntoSection("#moodboard-studio")}
                  className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat cursor-pointer"
                >
                  Open Concept Builder <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DESKTOP SPLIT VIEW (Hidden on mobile) */}
      <div className="hidden md:flex flex-row w-full h-full relative overflow-hidden bg-[#031F12]">
        {/* Left Side: Events */}
        <motion.div
          className="relative h-full flex flex-col justify-end p-16 overflow-hidden cursor-pointer group"
          animate={{
            width: hoveredSide === "left" ? "62%" : hoveredSide === "right" ? "38%" : "50%",
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => scrollIntoSection("#portfolio")}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MCLN4EH5Qjh0mDrIO5yBAG4yLQ3aMSfYr-VZoh7zMnDPEydfhBjlcNnT&s=10')" }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02150C] via-[#02150C]/60 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[#031F12]/30 group-hover:bg-[#4D5D3B]/20 transition-colors duration-300" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-medium font-montserrat mb-4"
            >
              <Calendar size={11} />
              Bespoke Events
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-serif text-white font-light tracking-wide leading-tight">
              Designing <br />
              <span className="italic font-normal text-[#D4AF37]">Grand Memories.</span>
            </h2>
            
            <p className="text-xs text-stone-300 font-sans mt-4 leading-relaxed max-w-sm font-light">
              Cathedral wedding layouts, suspended white orchids, and premium corporate stages configured with luxurious details.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat group-hover:translate-x-1.5 transition-transform duration-300">
              View Events Portfolio <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>

        {/* Elegant Split Line (Desktop only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/45 to-[#D4AF37]/0 z-20 pointer-events-none transform -translate-x-1/2" />

        {/* Right Side: Interiors */}
        <motion.div
          className="relative h-full flex flex-col justify-end p-16 overflow-hidden cursor-pointer group"
          animate={{
            width: hoveredSide === "right" ? "62%" : hoveredSide === "left" ? "38%" : "50%",
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => scrollIntoSection("#moodboard-studio")}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFFtgBs3kNxTn0x5IjFQaI88oODg2Im8HfU8S7j44_IzFDe66H_xnAMXY&s=10')" }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02150C] via-[#02150C]/60 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[#031F12]/30 group-hover:bg-[#031F12]/50 transition-colors duration-300" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4D5D3B]/20 border border-[#4D5D3B]/40 text-[#FAFAFA] text-[10px] uppercase tracking-[0.2em] font-medium font-montserrat mb-4"
            >
              <Home size={11} />
              Permanent Interiors
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-serif text-white font-light tracking-wide leading-tight">
              Creating <br />
              <span className="italic font-normal text-stone-200">Luxury Architecture.</span>
            </h2>
            
            <p className="text-xs text-stone-300 font-sans mt-4 leading-relaxed max-w-sm font-light">
              Luxury residential suite layouts, commercial showrooms, and custom design solutions integrating marble, concrete, and brass.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat group-hover:translate-x-1.5 transition-transform duration-300">
              Open Concept Builder <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <div 
          onClick={() => scrollIntoSection("#moodboard-studio")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-montserrat text-stone-400">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-3 rounded-full bg-[#D4AF37]"
          />
        </div>
      </div>
    </div>
  );
}

export default SplitHero;
