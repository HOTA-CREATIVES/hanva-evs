import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  tag: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Haanav Eviors transformed our heritage estate into an architectural wonderland. The transition from the teakwood indoor setting to the open-air Telugu wedding canopy felt like pure cinema. They design atmospheres, not just layouts.",
    author: "Pranav & Deepthi Rao",
    role: "Bespoke Telugu Wedding Commission",
    tag: "WEDDING",
  },
  {
    id: 2,
    quote: "For our flagship executive showroom, we wanted our heritage roots to merge with contemporary minimalism. The team delivered fluid spatial zoning and modular teakwood paneling that has completely elevated our client interactions.",
    author: "Anirudh K. Reddy",
    role: "Managing Director, HOTA Developments",
    tag: "COMMERCIAL INTERIORS",
  },
  {
    id: 3,
    quote: "The corporate summit they coordinated was flawless. Acoustic planning, scenic spotlights, and stage layouts were handled with absolute precision. Their standard of design excellence remains unmatched.",
    author: "Siddharth Sen",
    role: "VP of Operations, TechCorp Asia",
    tag: "CORPORATE SUMMIT",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="relative py-28 bg-[#0B2B1A] text-[#F8F1E5] overflow-hidden border-b border-[#09472A]/40"
    >
      {/* Faint oversized quote mark texture in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none text-[#123D26] text-[18rem] md:text-[28rem] font-serif font-bold leading-none opacity-20">
        “
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Category Label */}
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold mb-6 block font-montserrat">
          Client Testimonials
        </span>

        {/* Carousel Content */}
        <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Service Tag */}
              <span className="text-[9px] uppercase tracking-[0.2em] font-montserrat text-stone-500 font-bold mb-6">
                {TESTIMONIALS[activeIndex].tag}
              </span>

              {/* Large quote in Cormorant Garamond */}
              <blockquote className="font-serif italic font-light text-xl md:text-2xl text-stone-100 leading-relaxed text-balance mb-8">
                "{TESTIMONIALS[activeIndex].quote}"
              </blockquote>

              {/* Author and Role details */}
              <div className="flex flex-col items-center">
                <span className="font-montserrat uppercase text-xs font-bold tracking-[0.2em] text-[#D4A256]">
                  {TESTIMONIALS[activeIndex].author}
                </span>
                <span className="font-sans text-[10px] text-stone-400 tracking-wide mt-1.5 uppercase font-medium">
                  {TESTIMONIALS[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-2.5 mt-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === index
                  ? "bg-[#D4A256] w-6"
                  : "bg-[#1F6B41]/50 hover:bg-[#D4A256]/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
