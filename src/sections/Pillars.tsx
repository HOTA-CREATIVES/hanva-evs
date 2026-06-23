import { motion } from "framer-motion";
import { Sparkles, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PillarsProps {
  onExplorePortfolio?: (tab: "events" | "interiors") => void;
}

export function Pillars({ onExplorePortfolio }: PillarsProps) {
  const handleScrollToContact = (
    serviceCategory: "Corporate Events" | "Residential Interiors"
  ) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });

      const selectElement = document.getElementById(
        "service-select"
      ) as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = serviceCategory;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } else {
      // If contact isn't directly on page, scroll to home consultation gateway
      const home = document.getElementById("home");
      if (home) {
        home.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-28 bg-[#0B2B1A] text-[#F8F1E5] overflow-hidden border-t border-[#09472A]/40 border-b border-[#09472A]/40"
    >
      {/* Linen/paper texture simulation overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Light leaks */}
      <div className="absolute -left-48 top-1/4 w-96 h-96 bg-[#D4A256]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 bg-[#D4A256]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold font-montserrat">
            Core Disciplines
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Dual Pillars, <span className="italic font-normal text-[#D4A256]">One</span> Aesthetic
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
            Haanav Eviors balances the ephemeral and the enduring. We design majestic transient gatherings and compose timeless structural realities with absolute design cohesion.
          </p>
        </div>

        {/* 2 Staggered Columns Grid / Mobile Swipe Deck */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:gap-16 lg:pb-0 items-start no-scrollbar">
          
          {/* Pillar 1: Events Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="group relative bg-[#123D26] border border-[#1F6B41]/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col items-start transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex-shrink-0 w-[88vw] sm:w-[70vw] snap-center lg:w-auto lg:snap-none"
          >
            {/* Signature Gold Hairline reveals on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4A256] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            {/* Image display */}
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-stone-900 relative">
              <img 
                src="/assets/portfolio_wedding.png" 
                alt="Haanav Luxury Events Showcase" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123D26]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Icon & Title */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-2.5 bg-[#D4A256]/15 border border-[#D4A256]/30 rounded text-[#D4A256] group-hover:bg-[#D4A256] group-hover:text-stone-950 transition-colors duration-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg md:text-xl font-light uppercase tracking-wider text-white">
                  Transient Spaces
                </h4>
                <p className="text-[9px] text-[#D4A256] tracking-[0.2em] font-montserrat uppercase font-semibold">
                  Luxury Events & Weddings
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mb-8 text-justify">
              We orchestrate majestic, short-lived gatherings that leave permanent memories. From landmark corporate launch summits to bespoke luxury wedding mandapams, we handle branding, scenography, lighting, and technical coordination.
            </p>

            {/* Button */}
            <Button
              variant="gold"
              size="sm"
              className="w-full sm:w-auto font-montserrat tracking-widest text-[9px] uppercase font-bold py-3 hover:shadow-[0_0_20px_rgba(212,162,86,0.35)]"
              onClick={() => {
                if (onExplorePortfolio) {
                  onExplorePortfolio("events");
                } else {
                  handleScrollToContact("Corporate Events");
                }
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Events Portfolio
            </Button>
          </motion.div>

          {/* Pillar 2: Interiors Card (Staggered/Stretched on Desktop via mt-12) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="group relative bg-[#123D26] border border-[#1F6B41]/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col items-start transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:mt-12 flex-shrink-0 w-[88vw] sm:w-[70vw] snap-center lg:w-auto lg:snap-none"
          >
            {/* Signature Gold Hairline reveals on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4A256] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            {/* Image display */}
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-stone-900 relative">
              <img 
                src="/assets/portfolio_interior_living.png" 
                alt="Haanav Luxury Interiors Showcase" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123D26]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Icon & Title */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-2.5 bg-[#D4A256]/15 border border-[#D4A256]/30 rounded text-[#D4A256] group-hover:bg-[#D4A256] group-hover:text-stone-950 transition-colors duration-500">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg md:text-xl font-light uppercase tracking-wider text-white">
                  Permanent Spaces
                </h4>
                <p className="text-[9px] text-[#D4A256] tracking-[0.2em] font-montserrat uppercase font-semibold">
                  Luxury Residential & Workspace
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mb-8 text-justify">
              We compose modern, heritage-rich residential villas, flagship showrooms, and executive corporate environments. Tailored teakwood installations, modular formulations, fluid space zoning, and smart acoustic integrations.
            </p>

            {/* Button */}
            <Button
              variant="gold"
              size="sm"
              className="w-full sm:w-auto font-montserrat tracking-widest text-[9px] uppercase font-bold py-3 hover:shadow-[0_0_20px_rgba(212,162,86,0.35)]"
              onClick={() => {
                if (onExplorePortfolio) {
                  onExplorePortfolio("interiors");
                } else {
                  handleScrollToContact("Residential Interiors");
                }
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Interiors Portfolio
            </Button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Pillars;
