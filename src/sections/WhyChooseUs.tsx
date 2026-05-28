import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Lightbulb,
  Award,
  Layers,
  Clock,
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ADVANTAGES: FeatureCard[] = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Premium Execution",
    desc: "We adhere to 1mm tolerances. Every structure is engineered with elite-tier global craftsmanship and precision.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "Meticulous Detailing",
    desc: "We align color balances, materials, lighting scenarios, and acoustic dynamics to produce absolute visual luxury.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Creative Innovation",
    desc: "Integrating premium 3D virtual renderings, VR client walk-throughs, and interactive lighting design systems.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Couture Collective",
    desc: "A hand-selected team of leading interior architects, scenic builders, and high-end executive coordinators.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "End-to-End Care",
    desc: "We manage structural licensing, vendor coordination, staging setup, floral design, and final site handovers.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Timely Deliverance",
    desc: "Our project managers utilize strict double-Gantt charting to deliver completed portfolios exactly on scheduled timings.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-stone-950 text-white border-b border-stone-900">
      {/* Background visual detail */}
      <div className="absolute left-[5%] top-1/3 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Our Standard
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Architects of <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Distinction</span>
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
            At Hanwa EVS, luxury is not just an aesthetic; it is an exact technical standard. We combine structural safety, artistic boldness, and perfect coordination.
          </p>
        </div>

        {/* Six Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8 }}
              className="group p-8 border border-stone-900 bg-stone-950/40 hover:bg-stone-900/[0.1] hover:border-stone-800 transition-all duration-500 rounded relative overflow-hidden"
            >
              {/* Gold light corner hover line */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/35 transition-all duration-700" />
              
              {/* Icon container */}
              <div className="p-3 text-[#D4AF37] bg-stone-900/60 rounded border border-stone-850 w-fit mb-6 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                {card.icon}
              </div>

              {/* Title */}
              <h4 className="font-sans text-sm font-semibold tracking-wide text-white uppercase mb-3">
                {card.title}
              </h4>

              {/* Description */}
              <p className="text-[11px] text-stone-400 font-sans tracking-wide leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhyChooseUs;
