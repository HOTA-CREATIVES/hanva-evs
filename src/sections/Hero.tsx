import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* 1. Cinematic Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_bg.png"
          alt="Luxury Italian Villa Terrace Showcase"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.05] dark:brightness-[0.35]"
        />
        {/* Soft linear overlays for architectural elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/80" />
      </div>

      {/* 2. Premium Fine-Lined Architectural Accents */}
      <div className="absolute inset-10 border border-stone-800/20 pointer-events-none z-10 hidden md:block">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-stone-800/10" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-stone-800/10" />
        <div className="absolute left-0 top-1/3 w-full h-[1px] bg-stone-800/10" />
      </div>

      {/* 3. Hero Copy Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-20">
        {/* Elite Brand Accent */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
            Bespoke Event Production &amp; Architecture
          </span>
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
        </motion.div>

        {/* Large Bold Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-white leading-[1.15] mb-8 text-balance uppercase"
        >
          Crafting Extraordinary <br className="hidden md:inline" />
          Experiences &amp; <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Elegant</span> Spaces
        </motion.h2>

        {/* Premium Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-stone-300 dark:text-stone-300 font-sans text-sm md:text-base tracking-wide max-w-2xl font-light leading-relaxed mb-12 text-balance"
        >
          Haanav Eviors combines premium high-end event management with modern interior architecture to shape unforgettable milestones and timeless, bespoke environments.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => handleScrollTo("services")}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Explore Services
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-stone-700 text-white hover:border-[#D4AF37]"
            onClick={() => handleScrollTo("portfolio")}
          >
            View Portfolio
          </Button>
        </motion.div>
      </div>

      {/* 4. Elegant Interactive Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 inset-x-0 mx-auto flex flex-col items-center gap-2 select-none z-20 cursor-pointer w-fit"
        onClick={() => handleScrollTo("services")}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-medium">
          Discover
        </span>
        {/* Animated Mouse Wheel Indicator */}
        <div className="w-[18px] h-[30px] border border-stone-500 rounded-full flex justify-center p-1 bg-stone-900/30">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
export default Hero;
