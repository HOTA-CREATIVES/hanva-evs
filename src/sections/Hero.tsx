import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, X, Calendar, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/firebase/config";

interface HeroProps {
  onExplorePortfolio?: (tab: "events" | "interiors") => void;
}

export function Hero({ onExplorePortfolio }: HeroProps) {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [mobileActiveTab, setMobileActiveTab] = useState<"left" | "right">("left");
  const [isConceptOpen, setIsConceptOpen] = useState(false);
  const revealButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Quick Lead Capture State
  const [leadForm, setLeadForm] = useState({
    name: "",
    contact: "",
    service: "Corporate Events",
  });
  const [leadStatus, setLeadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [leadLoading, setLeadLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.contact) {
      setLeadStatus({
        type: "error",
        message: "Please enter your name and contact details.",
      });
      return;
    }
    setLeadLoading(true);
    setLeadStatus({ type: null, message: "" });

    try {
      const result = await submitInquiry({
        name: leadForm.name,
        email: leadForm.contact.includes("@") ? leadForm.contact : "haanaveviors@gmail.com",
        phone: !leadForm.contact.includes("@") ? leadForm.contact : "0000000000",
        service: leadForm.service,
        message: `Quick Callback Inquiry from Redesigned Split Hero.`,
      });

      if (result.success) {
        setLeadStatus({
          type: "success",
          message: "Request received. A design representative will reach out shortly.",
        });
        setLeadForm({ name: "", contact: "", service: "Corporate Events" });
      } else {
        setLeadStatus({
          type: "error",
          message: "Callback registration failed. Please try again.",
        });
      }
    } catch (err) {
      setLeadStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLeadLoading(false);
    }
  };

  // Focus management for Accessibility
  useEffect(() => {
    if (isConceptOpen) {
      setTimeout(() => closeButtonRef.current?.focus());
    } else {
      setTimeout(() => revealButtonRef.current?.focus());
    }
  }, [isConceptOpen]);



  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-between overflow-hidden bg-[#021A0D] pt-20"
    >
      {/* A. DUAL INTERACTIVE VISUAL DISPLAY */}
      
      {/* 1. DESKTOP SPLIT PANEL VIEW (lg and above) */}
      <div className="hidden lg:flex relative w-full h-[78vh] overflow-hidden bg-[#01140A]">
        
        {/* LEFT PANEL: LUXURY EVENTS */}
        <motion.div
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            width: hoveredSide === "left" ? "62%" : hoveredSide === "right" ? "38%" : "50%"
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="relative h-full overflow-hidden cursor-pointer"
          onClick={() => {
            if (onExplorePortfolio) {
              onExplorePortfolio("events");
            } else {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {/* Background Image with Ken Burns zoom */}
          <motion.div
            animate={{
              scale: hoveredSide === "left" ? 1.05 : 1,
              filter: hoveredSide === "right" ? "brightness(0.35) grayscale(20%)" : "brightness(0.68)"
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/hero_left_events.png')` }}
          />
          
          {/* Edge Masking & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021A0D]/20 to-[#021A0D]" />

          {/* Left Text & Button Overlay */}
          <motion.div 
            animate={{ 
              opacity: hoveredSide === "right" ? 0.15 : 1,
              x: hoveredSide === "left" ? 10 : 0
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-y-0 left-0 pl-16 pr-12 flex flex-col justify-center z-20 max-w-xl text-left select-none pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-montserrat text-[#D4AF37] font-semibold mb-3 block">
              Haanav Events & Weddings
            </span>
            <h2 className="text-3xl xl:text-4xl font-serif font-light uppercase tracking-wide text-white leading-tight mb-4">
              Orchestrate <br />
              <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">The Extraordinary</span>
            </h2>
            <p className="text-stone-300 font-sans text-xs tracking-wider leading-relaxed mb-6">
              We translate grand visions into breathtaking transient realities. From bespoke high-society weddings to high-impact corporate summits, we choreograph every detail.
            </p>
            <div>
              <Button
                variant={hoveredSide === "left" ? "gold" : "outline"}
                size="sm"
                className="pointer-events-auto border-[#D4AF37]/35 text-white hover:border-[#D4AF37]"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onExplorePortfolio) {
                    onExplorePortfolio("events");
                  } else {
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore Events Portfolio
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL: LUXURY INTERIORS */}
        <motion.div
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            width: hoveredSide === "right" ? "62%" : hoveredSide === "left" ? "38%" : "50%"
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="relative h-full overflow-hidden cursor-pointer"
          onClick={() => {
            if (onExplorePortfolio) {
              onExplorePortfolio("interiors");
            } else {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {/* Background Image with Ken Burns zoom */}
          <motion.div
            animate={{
              scale: hoveredSide === "right" ? 1.05 : 1,
              filter: hoveredSide === "left" ? "brightness(0.35) grayscale(20%)" : "brightness(0.68)"
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/hero_right_interiors.png')` }}
          />

          {/* Edge Masking & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-l from-stone-950/70 via-stone-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021A0D]/20 to-[#021A0D]" />

          {/* Right Text & Button Overlay */}
          <motion.div 
            animate={{ 
              opacity: hoveredSide === "left" ? 0.15 : 1,
              x: hoveredSide === "right" ? -10 : 0
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-y-0 right-0 pr-16 pl-12 flex flex-col justify-center items-end text-right z-20 max-w-xl ml-auto select-none pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-montserrat text-[#D4AF37] font-semibold mb-3 block">
              Haanav Luxury Interiors
            </span>
            <h2 className="text-3xl xl:text-4xl font-serif font-light uppercase tracking-wide text-white leading-tight mb-4">
              Commission <br />
              <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">The Timeless</span>
            </h2>
            <p className="text-stone-300 font-sans text-xs tracking-wider leading-relaxed mb-6">
              We compose modern, high-end environments that reflect personal narratives. Custom villas, flagship retail lounges, smart cabinetry, and bespoke corporate architectures.
            </p>
            <div>
              <Button
                variant={hoveredSide === "right" ? "gold" : "outline"}
                size="sm"
                className="pointer-events-auto border-[#D4AF37]/35 text-white hover:border-[#D4AF37]"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onExplorePortfolio) {
                    onExplorePortfolio("interiors");
                  } else {
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore Interiors Portfolio
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. DYNAMIC CENTER MEDALLION & SEPARATOR */}
        <div 
          className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] z-30 flex items-center justify-center pointer-events-none select-none"
          style={{
            left: hoveredSide === "left" ? "62%" : hoveredSide === "right" ? "38%" : "50%",
            transition: "left 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Vertical Separator Line */}
          <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
          
          {/* Floating Monogram Medallion */}
          <motion.div
            animate={{
              rotate: hoveredSide === "left" ? -15 : hoveredSide === "right" ? 15 : 0,
              scale: hoveredSide ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 rounded-full bg-[#021A0D] border-2 border-[#D4AF37]/80 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)] relative"
          >
            <img
              src="/assets/logo.png"
              alt="Haanav Eviors Monogram"
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* Fine rotating rings */}
            <div className="absolute -inset-2.5 border border-[#D4AF37]/15 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute -inset-4 border border-dashed border-[#D4AF37]/10 rounded-full animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
          </motion.div>
        </div>

      </div>

      {/* 2. MOBILE TABS CAROUSEL VIEW (below lg) */}
      <div className="lg:hidden relative w-full h-[62vh] overflow-hidden flex flex-col justify-between pt-6 pb-8 bg-[#01140A]">
        
        {/* Navigation Selector Tabs */}
        <div className="flex justify-center px-6 z-20">
          <div className="flex bg-stone-950/85 border border-[#0A502F]/60 backdrop-blur-md rounded-full p-1.5 w-full max-w-[280px]">
            <button
              onClick={() => setMobileActiveTab("left")}
              className={`flex-1 text-center py-2 text-[9px] uppercase tracking-[0.2em] font-montserrat font-semibold rounded-full transition-all duration-300 ${
                mobileActiveTab === "left"
                  ? "bg-[#D4AF37] text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setMobileActiveTab("right")}
              className={`flex-1 text-center py-2 text-[9px] uppercase tracking-[0.2em] font-montserrat font-semibold rounded-full transition-all duration-300 ${
                mobileActiveTab === "right"
                  ? "bg-[#D4AF37] text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Interiors
            </button>
          </div>
        </div>

        {/* Tabbed Backgrounds */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {mobileActiveTab === "left" ? (
              <motion.div
                key="mobile-events-bg"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center brightness-[0.38]"
                style={{ backgroundImage: `url('/assets/hero_left_events.png')` }}
              />
            ) : (
              <motion.div
                key="mobile-interiors-bg"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center brightness-[0.38]"
                style={{ backgroundImage: `url('/assets/hero_right_interiors.png')` }}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021A0D]/50 to-[#021A0D]" />
        </div>

        {/* Dynamic Content Switching */}
        <div className="relative z-10 px-6 flex flex-col justify-end h-full">
          <AnimatePresence mode="wait">
            {mobileActiveTab === "left" ? (
              <motion.div
                key="mobile-events-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center max-w-sm mx-auto"
              >
                <span className="text-[9px] tracking-[0.25em] uppercase font-montserrat text-[#D4AF37] font-semibold mb-2">
                  Haanav Events
                </span>
                <h2 className="text-2xl font-serif font-light uppercase tracking-wide text-white mb-3">
                  Orchestrate <span className="font-serif italic font-normal text-[#D4AF37]">The Extraordinary</span>
                </h2>
                <p className="text-stone-300 font-sans text-[11px] leading-relaxed mb-5">
                  We shape magnificent transient gatherings, creating grand milestones that leave lasting legacies. High-impact corporate events and bespoke wedding productions.
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    if (onExplorePortfolio) {
                      onExplorePortfolio("events");
                    } else {
                      const el = document.getElementById("about");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Explore Events Portfolio
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-interiors-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center max-w-sm mx-auto"
              >
                <span className="text-[9px] tracking-[0.25em] uppercase font-montserrat text-[#D4AF37] font-semibold mb-2">
                  Haanav Interiors
                </span>
                <h2 className="text-2xl font-serif font-light uppercase tracking-wide text-white mb-3">
                  Commission <span className="font-serif italic font-normal text-[#D4AF37]">The Timeless</span>
                </h2>
                <p className="text-stone-300 font-sans text-[11px] leading-relaxed mb-5">
                  We compose elite spatial realities that represent you. Luxury residential architecture, modern villas, smart cabinetry, and bespoke commercial environments.
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    if (onExplorePortfolio) {
                      onExplorePortfolio("interiors");
                    } else {
                      const el = document.getElementById("about");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Explore Interiors Portfolio
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* B. BORDER TRANSITION LEAD-CAPTURE GATEWAY */}
      <div className="relative w-full bg-gradient-to-b from-[#021A0D] to-stone-950 pt-8 pb-12 z-30 select-none border-t border-[#09472A]/30">
        
        {/* Symmetrical Gold Line Separator Accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent flex items-center justify-center">
          <div className="px-4 bg-[#021A0D] text-[#D4AF37] flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-medium font-montserrat">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Consultation Gateway</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#011c0c]/85 backdrop-blur-md border border-[#D4AF37]/25 rounded-lg p-5 md:p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle internal light leak */}
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full filter blur-[50px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              
              {/* Left Column: Descriptive text */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Reserve Private Consultation
                </span>
                <h4 className="font-serif text-lg font-light uppercase text-white tracking-wide">
                  Coordinate Your <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Vision</span>
                </h4>
                <p className="text-[11px] text-stone-400 font-sans tracking-wide leading-relaxed">
                  Our spatial architects and event producers are ready to design your landmark celebration. Request a quick callback below.
                </p>
              </div>

              {/* Right Column: Lead Form */}
              <div className="lg:col-span-8">
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Name Input */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your Name"
                        required
                        disabled={leadLoading}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4AF37] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Contact Input */}
                    <div className="relative">
                      <input
                        type="text"
                        name="contact"
                        value={leadForm.contact}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, contact: e.target.value }))}
                        placeholder="Email or Phone"
                        required
                        disabled={leadLoading}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4AF37] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Service Selection */}
                    <div className="relative">
                      <select
                        name="service"
                        value={leadForm.service}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, service: e.target.value }))}
                        disabled={leadLoading}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4AF37] text-stone-300 rounded px-3 py-2.5 text-xs font-sans transition-all focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="Corporate Events" className="bg-stone-950">Corporate Events</option>
                        <option value="Bespoke Weddings" className="bg-stone-950">Bespoke Weddings</option>
                        <option value="Residential Interiors" className="bg-stone-950">Residential Interiors</option>
                        <option value="Commercial Interiors" className="bg-stone-950">Commercial Interiors</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>

                  </div>

                  {/* Submission Row & Feedback */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-1">
                    
                    {/* Feedback Messages */}
                    <div className="flex-grow">
                      <AnimatePresence mode="wait">
                        {leadStatus.type && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className={`flex items-center gap-2 text-[10px] tracking-wide font-sans ${
                              leadStatus.type === "success" ? "text-emerald-400" : "text-amber-500"
                            }`}
                          >
                            {leadStatus.type === "success" ? (
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            )}
                            <span>{leadStatus.message}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="sm"
                      disabled={leadLoading}
                      className="px-6 py-2.5 font-montserrat uppercase text-[9px] tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      {leadLoading ? "Processing..." : "Submit Inquiry"}
                    </Button>
                    
                  </div>

                </form>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Minimal Concept Blueprint link */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsConceptOpen(true)}
            ref={revealButtonRef}
            type="button"
            className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-500 hover:text-[#D4AF37] font-semibold transition-all duration-300 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-[#D4AF37]" />
            <span className="font-montserrat">Concept Blueprint</span>
          </button>
        </div>

      </div>

      {/* C. VISUAL CONCEPT MODAL OVERLAY */}
      <AnimatePresence>
        {isConceptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConceptOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="visual-concept-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-900 border border-stone-850 p-8 md:p-10 rounded max-w-2xl shadow-2xl cursor-default relative text-left"
              tabIndex={-1}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsConceptOpen(false)}
                ref={closeButtonRef}
                type="button"
                aria-label="Close visual concept"
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-white rounded-full bg-stone-950 border border-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                Visual Identity Narrative Blueprint
              </span>

              <h4
                id="visual-concept-title"
                className="font-serif text-2xl font-light uppercase text-white tracking-wide mb-6"
              >
                4K Cinematic Background Video Loop Concept
              </h4>

              <div className="space-y-4 font-sans text-xs leading-relaxed text-stone-300 text-justify">
                <p>
                  <strong>The Ambient Setting:</strong> The visual canvas opens
                  inside a grand modern residential living room inspired by
                  Andhra Pradesh heritage. Sunset streams through expansive
                  glass panes, illuminating custom dark teakwood slates,
                  hand-carved relief borders, and warm glowing brass samayalu
                  lamps on stone platforms.
                </p>
                <p>
                  <strong>The Seamless Transition:</strong> As the camera glides
                  forward over seamless polished stone, a thin golden archway
                  wipes across the frame. Behind this passing boundary line, the
                  residential sanctuary transforms into a grand open-air Telugu
                  wedding mandapam under a star-swept sky.
                </p>
                <p>
                  <strong>The Metamorphosis:</strong> The heritage teakwood
                  panels dissolve into an majestic wall of fresh orange marigold
                  and white jasmine flower garlands. The soft ambient room glow
                  rises into dramatic, warm golden spotlight shafts centered
                  around a brilliant, gold-carved temple-pillar wedding canopy.
                </p>
                <p>
                  <strong>The Atmospheric Binder:</strong> The entire loop is
                  bound together by a slow, suspended drift of golden dust
                  particles and marigold petal fragments floating through the
                  air—representing both the dust of high-tolerance craftsmanship
                  and the sparkles of elite celebration.
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
