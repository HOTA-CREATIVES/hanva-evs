import { motion } from "framer-motion";
import { Award, Sparkles, Layers, Users, ShieldCheck } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ADVANTAGES: FeatureCard[] = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Premium Quality",
    desc: "We adhere to 1mm tolerances. Every structure and furniture detail is engineered with elite-tier craftsmanship and flawless execution.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Custom Solutions",
    desc: "We do not replicate templates. We craft bespoke spatial concepts, custom-tailored layouts, and woodwork designed around your specific lifestyle.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "End-to-End Execution",
    desc: "From raw material sourcing and logistics routing to staging setup, technical installs, and site handovers, we oversee the entire life cycle.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Experienced Team",
    desc: "A hand-selected collective of principal interior architects, master builders, technical experts, and elite event coordinators.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Transparent Pricing",
    desc: "Enjoy peace of mind with detailed milestone billing, clear material breakdowns, and absolute financial accountability with no hidden costs.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-[#02140A] text-white border-y border-[#09472A]/30 overflow-hidden">
      {/* Background light leaks */}
      <div className="absolute left-[5%] top-1/3 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute right-[5%] bottom-1/3 w-80 h-80 bg-[#1F6B41]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold font-montserrat">
            Our Standard
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Architects of <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Distinction</span>
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
            Haanav Eviors combines raw technical precision with artistic audacity. We deliver an end-to-end luxury experience built on trust, quality, and complete transparency.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((card, index) => {
            const isCenterOffset = index === 4; // Special visual placement if needed
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.8 }}
                className={`group p-8 border border-[#D4AF37]/15 bg-[#011c0c]/45 backdrop-blur-md hover:border-[#D4AF37]/45 transition-all duration-500 rounded-2xl relative overflow-hidden shadow-lg ${
                  isCenterOffset ? "lg:col-start-2" : ""
                }`}
              >
                {/* Gold light corner hover line */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-700" />
                
                {/* Icon container */}
                <div className="p-3 text-[#D4AF37] bg-stone-900/60 rounded-xl border border-stone-850 w-fit mb-6 group-hover:bg-[#D4AF37] group-hover:text-stone-950 group-hover:border-transparent transition-all duration-500">
                  {card.icon}
                </div>

                {/* Title */}
                <h4 className="font-montserrat text-xs font-bold tracking-widest text-white uppercase mb-3">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed text-justify">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
