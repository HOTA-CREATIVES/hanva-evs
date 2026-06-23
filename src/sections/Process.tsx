import { motion } from "framer-motion";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Reserve Briefing",
    description: "We align on a private consultation to establish your spatial narrative, design style, and event/interior scope.",
  },
  {
    number: "02",
    title: "Concept Blueprint",
    description: "Our design producers sketch detailed architectural plans, custom lighting schemes, and mood integrations.",
  },
  {
    number: "03",
    title: "Material Sourcing",
    description: "We handpick premium materials—from hand-carved heritage teakwood to custom brass accents and draped linen.",
  },
  {
    number: "04",
    title: "Spatial Delivery",
    description: "Our production and setup team constructs your landmark celebration or installs your interior sanctuary.",
  },
];

export function Process() {
  return (
    <section 
      id="process" 
      className="relative py-24 bg-[#FBF8F3] text-[#1C1F1D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold font-montserrat">
            How We Build
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Spatial <span className="italic font-normal text-[#D4A256]">Chronology</span>
          </h3>
          <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed">
            From the initial blueprint sketch to spatial execution, we follow a rigorous workflow to ensure absolute fidelity to the design manifest.
          </p>
        </div>

        {/* Chronology Steps */}
        <div className="relative">
          
          {/* Horizontal connecting line (hidden on mobile/tablet) */}
          <div className="absolute top-10 left-12 right-12 h-[1px] bg-[#D4A256]/30 hidden lg:block z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-start text-left relative pl-6 lg:pl-0 border-l border-[#D4A256]/20 lg:border-l-0"
              >
                {/* Mobile/Tablet Vertical connector indicator */}
                <div className="absolute top-2 left-0 w-2 h-2 rounded-full bg-[#D4A256] -translate-x-[5px] lg:hidden" />

                {/* Step Number Badge */}
                <div className="w-14 h-14 rounded-full bg-[#FBF8F3] border border-[#D4A256] flex items-center justify-center shadow-md relative z-10 mb-6 group hover:bg-[#D4A256] transition-colors duration-500">
                  <span className="font-montserrat text-base font-bold text-[#0B2B1A] group-hover:text-stone-950 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-montserrat uppercase text-xs font-bold tracking-[0.15em] text-[#0B2B1A] mb-3">
                  {step.title}
                </h4>

                {/* Step Description */}
                <p className="text-stone-600 font-sans text-xs leading-relaxed max-w-xs text-justify">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Process;
