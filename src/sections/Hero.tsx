import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, X, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [isConceptOpen, setIsConceptOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Background visual cross-fade loops between Event Setup & Interior Space
  const backgrounds = [
    "/assets/hero_bg.png", // Luxury Lakeside Gala Event
    "/assets/portfolio_interior_living.png", // Custom Residential Penthouse Interior
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000); // 8-second slow transition loop
    return () => clearInterval(interval);
  }, []);

  const handleScrollToContact = (serviceCategory: "Corporate Events" | "Residential Interiors") => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Auto-set the dropdown value in form
      const selectElement = document.getElementById("service-select") as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = serviceCategory;
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-stone-950 pt-24"
    >
      {/* 1. Dynamic Cross-Fading Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={bgIndex}
            src={backgrounds[bgIndex]}
            alt="Masters of Atmosphere Showcase"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.52, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05]"
          />
        </AnimatePresence>
        
        {/* Luxury Vignettes and volumetric overlays (Neutral Dark, no green tint) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />
      </div>

      {/* Fine-Lined Architectural Accents */}
      <div className="absolute inset-10 border border-stone-800/10 pointer-events-none z-10 hidden md:block">
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-stone-900/10" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-stone-900/10" />
      </div>

      {/* 2. Primary Copywriting Canvas */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center flex-grow pt-10">
        
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2.5 mb-6"
        >
          <span className="h-[1px] w-6 bg-[#D4AF37]" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Masters of Atmosphere &bull; Curated Environments
          </span>
          <span className="h-[1px] w-6 bg-[#D4AF37]" />
        </motion.div>

        {/* 3. THE HOOK (Headline) */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-white leading-[1.12] mb-8 text-balance uppercase"
        >
          We Script the Transient. <br />
          We Sculpt the <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Permanent</span>.
        </motion.h2>

        {/* 4. THE SUB-HEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-stone-300 dark:text-stone-300 font-sans text-sm md:text-base tracking-wide max-w-2xl font-light leading-relaxed mb-10 text-balance text-justify sm:text-center"
        >
          Haanav Eviors composes the atmosphere of your realities—orchestrating high-profile luxury events that vanish in a single night, and curating permanent interior architectures that endure for generations.
        </motion.p>

        {/* 5. DUAL CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-5 z-20 mb-8"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => handleScrollToContact("Corporate Events")}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Orchestrate An Event
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-stone-750 text-white hover:border-[#D4AF37] bg-stone-950/20 backdrop-blur-sm"
            onClick={() => handleScrollToContact("Residential Interiors")}
          >
            Commission A Space
          </Button>
        </motion.div>

        {/* Interactive Visual Narrative Reveal Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 0.8 }}
          onClick={() => setIsConceptOpen(true)}
          className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-400 hover:text-[#D4AF37] font-semibold transition-all duration-300 cursor-pointer mb-6"
        >
          <HelpCircle className="w-3 h-3 text-[#D4AF37]" />
          <span>Reveal Visual Loop Narrative Concept</span>
        </motion.button>
      </div>

      {/* 6. TRUST STRIP (Minimalist Bottom Banner) */}
      <div className="relative z-20 w-full border-t border-stone-900 bg-stone-950/65 backdrop-blur-md select-none py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 md:divide-x divide-stone-900 text-center">
          
          <div className="flex flex-col items-center pt-2 sm:pt-0">
            <span className="text-white font-serif text-lg font-light tracking-wide flex items-center gap-1.5 justify-center">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> 150+
            </span>
            <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
              Fleeting Milestones
            </span>
          </div>

          <div className="flex flex-col items-center pt-2 sm:pt-0">
            <span className="text-white font-serif text-lg font-light tracking-wide flex items-center gap-1.5 justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> 200+
            </span>
            <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
              Enduring Handovers
            </span>
          </div>

          <div className="flex flex-col items-center pt-2 sm:pt-0">
            <span className="text-white font-serif text-lg font-light tracking-wide">
              &euro;450M+
            </span>
            <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
              Combined Asset Valuation
            </span>
          </div>

          <div className="flex flex-col items-center pt-2 sm:pt-0">
            <span className="text-[#D4AF37] font-serif text-lg font-medium">
              98%
            </span>
            <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
              Patron Retention
            </span>
          </div>

        </div>
      </div>

      {/* 7. VISUAL CONCEPT MODAL OVERLAY */}
      <AnimatePresence>
        {isConceptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConceptOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-900 border border-stone-800 p-8 md:p-10 rounded max-w-2xl shadow-2xl cursor-default relative text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsConceptOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-white rounded-full bg-stone-950 border border-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                Visual Identity Narrative Blueprint
              </span>
              
              <h4 className="font-serif text-2xl font-light uppercase text-white tracking-wide mb-6">
                4K Cinematic Background Video Loop Concept
              </h4>

              <div className="space-y-4 font-sans text-xs leading-relaxed text-stone-300 text-justify">
                <p>
                  <strong>The Ambient Setting:</strong> The visual canvas opens inside a dimly lit, high-concept architectural Italian penthouse (minimalist concrete texture slates, warm dark wood slats, floor-to-ceiling glass windows streaming deep sunset rays). A slow tracking shot glides forward over custom marble flooring.
                </p>
                <p>
                  <strong>The Seamless Transition:</strong> As the camera moves forward, a thin gold vertical pillar slowly wipes across the frame. Behind this passing boundary line, the environment shifts: the concrete floor seamlessly becomes an exquisite dark-mirrored gala runway reflecting suspended overhead fairy lights.
                </p>
                <p>
                  <strong>The Metamorphosis:</strong> The raw wood slates dissolve into an elegant, climbing wall of white orchids. The quiet sunset rays bloom into dramatic, golden volumetric spotlights centered around high-end dinner service details.
                </p>
                <p>
                  <strong>The Atmospheric Binder:</strong> The entire loop is bound together by a slow, suspended levitation of glowing champagne-gold particles drifting throughout the air—symbolizing both the dust of custom architectural builds and the sparkling fragments of luxury celebrations.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-850 flex items-center justify-between text-[10px] text-stone-500">
                <span>Haanav Eviors &copy; {new Date().getFullYear()}</span>
                <span className="text-[#D4AF37]">Masters of Atmosphere</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
export default Hero;
