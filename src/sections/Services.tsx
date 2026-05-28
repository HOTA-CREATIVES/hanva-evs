import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Award,
  Presentation,
  Grid,
  Heart,
  Home as HomeIcon,
  Briefcase,
  Building2,
  Compass,
  Hammer,
  ArrowRight,
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const EVENTS_SERVICES: ServiceItem[] = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Corporate Events",
    desc: "Seamless, high-impact conferences, summits, and executive gala events.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Bespoke Weddings",
    desc: "Enchanting curations and custom-tailored luxury wedding production.",
  },
  {
    icon: <Presentation className="w-5 h-5" />,
    title: "Product Launches",
    desc: "Cinematic reveals designed to captivate media attention and drive brand identity.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Exhibitions & Expos",
    desc: "Architecturally curated showcase layouts and custom interactive display stands.",
  },
  {
    icon: <Grid className="w-5 h-5" />,
    title: "Stage & Set Design",
    desc: "Dramatically lit scenography, acoustic planning, and technical setups.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Private Celebrations",
    desc: "Intimate and elegant milestones designed with absolute exclusivity.",
  },
];

const INTERIOR_SERVICES: ServiceItem[] = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    title: "Residential Interiors",
    desc: "Luxury modern villas and luxury penthouses reflecting personal narratives.",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Commercial Interiors",
    desc: "Bespoke retail lounges, flagship showrooms, and fine dining architectures.",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Executive Workspaces",
    desc: "Ergonomic, modern office environments that promote productivity and branding.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Luxury Living Spaces",
    desc: "Master bedrooms, designer kitchens, and sensory-rich home theaters.",
  },
  {
    icon: <Hammer className="w-5 h-5" />,
    title: "Modular Formulations",
    desc: "Sleek, Italian-inspired custom wardrobes and integrated smart cabinetry.",
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Bespoke Space Planning",
    desc: "Fluid layout zoning, lighting placement plans, and acoustic engineering.",
  },
];

export function Services() {
  const handleScrollToContact = (serviceTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Auto-select the service in form drop-down
      const selectElement = document.getElementById("service-select") as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = serviceTitle;
      }
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 bg-stone-950 text-white border-b border-stone-900"
    >
      {/* Visual background details */}
      <div className="absolute left-0 bottom-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Bespoke Portfolios
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Dual Disciplines, <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">One</span> Standard
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
            Hanwa EVS delivers balanced excellence. We orchestrate magnificent transient gatherings and compose timeless architectural realities with equal technical precision.
          </p>
        </div>

        {/* Categories Split Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          
          {/* Column 1: Event Management */}
          <div className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-stone-900">
              <div className="p-3 bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20 text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl md:text-2xl font-light uppercase tracking-wider text-white">
                  Event Management
                </h4>
                <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase">
                  Magnificent Transient Experiences
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {EVENTS_SERVICES.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.8 }}
                  className="group relative p-6 border border-stone-900 bg-stone-950/40 hover:bg-stone-900/[0.15] hover:border-stone-800 transition-all duration-500 flex flex-col items-start rounded hover:-translate-y-1"
                >
                  {/* Subtle golden corner indicator */}
                  <span className="absolute top-0 right-0 w-0 h-0 border-t border-r border-[#D4AF37]/0 group-hover:w-4 group-hover:h-4 group-hover:border-[#D4AF37]/30 transition-all duration-500" />

                  {/* Icon */}
                  <div className="p-2.5 text-[#D4AF37] bg-stone-900/60 rounded border border-stone-800 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-500 mb-4">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h5 className="font-sans text-sm font-semibold tracking-wide text-white mb-2 uppercase">
                    {service.title}
                  </h5>

                  {/* Description */}
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed tracking-wide mb-6">
                    {service.desc}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => handleScrollToContact(service.title)}
                    className="mt-auto flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-500 group-hover:text-[#D4AF37] font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    Inquire
                    <ArrowRight className="w-2.5 h-2.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Interior Design */}
          <div className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-stone-900">
              <div className="p-3 bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20 text-[#D4AF37]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl md:text-2xl font-light uppercase tracking-wider text-white">
                  Interior Design
                </h4>
                <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase">
                  Timeless Architectural Spaces
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INTERIOR_SERVICES.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.8 }}
                  className="group relative p-6 border border-stone-900 bg-stone-950/40 hover:bg-stone-900/[0.15] hover:border-stone-800 transition-all duration-500 flex flex-col items-start rounded hover:-translate-y-1"
                >
                  {/* Subtle golden corner indicator */}
                  <span className="absolute top-0 right-0 w-0 h-0 border-t border-r border-[#D4AF37]/0 group-hover:w-4 group-hover:h-4 group-hover:border-[#D4AF37]/30 transition-all duration-500" />

                  {/* Icon */}
                  <div className="p-2.5 text-[#D4AF37] bg-stone-900/60 rounded border border-stone-800 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-500 mb-4">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h5 className="font-sans text-sm font-semibold tracking-wide text-white mb-2 uppercase">
                    {service.title}
                  </h5>

                  {/* Description */}
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed tracking-wide mb-6">
                    {service.desc}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => handleScrollToContact(service.title)}
                    className="mt-auto flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-500 group-hover:text-[#D4AF37] font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    Inquire
                    <ArrowRight className="w-2.5 h-2.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Services;
