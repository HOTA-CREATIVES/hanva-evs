import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Palette,
  Hammer,
  Sparkles,
} from "lucide-react";

interface WorkflowStep {
  number: string;
  title: string;
  icon: React.ReactNode;
  duration: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: "01",
    title: "Consultation",
    icon: <MessageSquare className="w-5 h-5" />,
    duration: "Phase 1: Initial briefing",
    subtitle: "Private Discovery & Briefing",
    desc: "A designated design consultant meets with you privately to explore your objectives, compile aesthetic inspirations, and draft primary budget boundaries.",
    deliverables: ["Aesthetic Moodboard", "Budget Outline", "Site Feasibility Study"],
  },
  {
    number: "02",
    title: "Planning",
    icon: <FileText className="w-5 h-5" />,
    duration: "Phase 2: Days 3 - 7",
    subtitle: "Structural Zoning & Strategy",
    desc: "Our project managers draft rigorous Double-Gantt project timelines, define logistics parameters, and complete initial engineering boundary calculations.",
    deliverables: ["Logistics Strategy", "Gantt Timeline Chart", "Regulatory Safety Checks"],
  },
  {
    number: "03",
    title: "Concept Design",
    icon: <Palette className="w-5 h-5" />,
    duration: "Phase 3: Days 7 - 21",
    subtitle: "3D Rendering & Texturing",
    desc: "Architects and scenographers build high-fidelity photorealistic 3D digital walkthrough models and curate touch-boards detailing fabrics, stone, and metals.",
    deliverables: ["3D Digital Renderings", "Tactile Material Board", "Zoning Floor Plans"],
  },
  {
    number: "04",
    title: "Execution",
    icon: <Hammer className="w-5 h-5" />,
    duration: "Phase 4: Construction / Setup",
    subtitle: "High-Tolerance Craftsmanship",
    desc: "Artisans, master carpenters, and technician crews deploy to start precision building, scaffolding setups, fabrications, and volumetric lighting arrays.",
    deliverables: ["Precision Scenography", "Cabinetry & Stone Fitting", "Technical Orchestration"],
  },
  {
    number: "05",
    title: "Final Delivery",
    icon: <Sparkles className="w-5 h-5" />,
    duration: "Phase 5: Completed Unveiling",
    subtitle: "Bespoke Reality Revealed",
    desc: "Our executive director leads a walk-through quality inspection, verifies double-redundancy safety checklists, and hands over your exquisite finished reality.",
    deliverables: ["Double-QC Inspection", "Cinematic Unveiling", "Comprehensive Maintenance Handover"],
  },
];

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 bg-stone-950 text-white border-b border-stone-900">
      {/* Background visual detail */}
      <div className="absolute right-[5%] bottom-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            The Blueprint
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Bespoke <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Workflow</span> Timeline
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
            From initial sketch pads to the final cinematic reveal. We guide you through an organized, five-phase premium workflow engineered for comfort and perfection.
          </p>
        </div>

        {/* Interactive Timeline Navigation Bar */}
        <div className="relative mb-16 max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-900 -translate-y-1/2 hidden md:block" />
          <div
            className="absolute top-1/2 left-0 h-[1.5px] bg-[#D4AF37] -translate-y-1/2 hidden md:block transition-all duration-500"
            style={{ width: `${(activeStep / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
          />

          {/* Steps Horizontal Row */}
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-row md:flex-col items-center gap-4 md:gap-3 group cursor-pointer z-10"
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border font-sans text-xs transition-all duration-500 ${
                      isActive
                        ? "bg-[#D4AF37] text-stone-950 border-[#D4AF37] font-bold scale-110 shadow-md shadow-[#D4AF37]/20"
                        : isPast
                        ? "bg-stone-900 text-[#D4AF37] border-[#D4AF37]/40"
                        : "bg-stone-950 text-stone-500 border-stone-850 hover:border-stone-700 hover:text-white"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Label */}
                  <div className="text-left md:text-center">
                    <span
                      className={`block text-[9px] uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#D4AF37]" : "text-stone-500 group-hover:text-stone-300"
                      }`}
                    >
                      Step {step.number}
                    </span>
                    <span
                      className={`block text-xs uppercase tracking-wide font-medium mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-stone-400 group-hover:text-stone-200"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detail Panel (with clean fade-reveal) */}
        <div className="max-w-4xl mx-auto bg-stone-900/20 border border-stone-900 rounded p-8 md:p-12 min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full"
            >
              {/* Detailed Description */}
              <div className="md:col-span-7 text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  {WORKFLOW_STEPS[activeStep].duration}
                </span>
                <h4 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide text-white mt-1.5 mb-6">
                  {WORKFLOW_STEPS[activeStep].subtitle}
                </h4>
                <p className="text-stone-300 dark:text-stone-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                  {WORKFLOW_STEPS[activeStep].desc}
                </p>
              </div>

              {/* Deliverables Panel */}
              <div className="md:col-span-5 text-left border-t md:border-t-0 md:border-l border-stone-900 pt-6 md:pt-0 md:pl-8">
                <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-4">
                  Phase Deliverables
                </h5>
                <ul className="flex flex-col gap-3">
                  {WORKFLOW_STEPS[activeStep].deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-300 dark:text-stone-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[11px] font-sans tracking-wide">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
export default Workflow;
