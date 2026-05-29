import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, X, Calendar, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/firebase/config";

/* 
// Background visual cross-fade loops commented out as requested
const backgrounds = [
  "/assets/hero_telugu_wedding.png", 
  "/assets/hero_andhra_interior.png", 
];
*/

export function Hero() {
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
        email: leadForm.contact.includes("@") ? leadForm.contact : "quick-lead@hanavevs.com",
        phone: !leadForm.contact.includes("@") ? leadForm.contact : "0000000000",
        service: leadForm.service,
        message: `Quick Callback Inquiry from Hero Border Gateway.`,
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

  // Focus management: focus dialog close button when opened, restore to opener when closed
  useEffect(() => {
    if (isConceptOpen) {
      setTimeout(() => closeButtonRef.current?.focus());
    } else {
      setTimeout(() => revealButtonRef.current?.focus());
    }
  }, [isConceptOpen]);

  const handleScrollToContact = (
    serviceCategory: "Corporate Events" | "Residential Interiors",
  ) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });

      // Auto-set the dropdown value in form
      const selectElement = document.getElementById(
        "service-select",
      ) as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = serviceCategory;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#021A0D] pt-28"
    >

      {/* Fine-Lined Architectural Accents removed for clean, borderless appearance */}

      {/* B. CENTER CANVASES AREA (Brand Identity and Symmetrical Action block) */}
      <div className="relative z-20 max-w-xl mx-auto px-6 flex-grow flex flex-col items-center justify-center py-10 gap-6 text-center w-full">
        
        {/* Centered Brand Logo Monogram (Seamlessly Merged with Page Background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[700px] aspect-[5/4] overflow-hidden select-none"
        >
          <img
            src="/assets/logo_full.jpg"
            alt="Haanav Eviors - Events & Interiors Logo"
            className="w-full h-full object-cover filter brightness-[1.03]"
            style={{
              maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
            }}
          />
        </motion.div>

        {/* Action buttons Block (Symmetrical Fit) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-4 w-full max-w-[320px] mt-2"
        >
          <Button
            variant="gold"
            size="lg"
            className="w-full justify-center"
            onClick={() => handleScrollToContact("Corporate Events")}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Orchestrate An Event
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center border-stone-850 text-white hover:border-[#D4AF37] bg-stone-950/20 backdrop-blur-sm"
            onClick={() => handleScrollToContact("Residential Interiors")}
          >
            Commission A Space
          </Button>

          {/* Minimal concept link */}
          <button
            onClick={() => setIsConceptOpen(true)}
            ref={revealButtonRef}
            type="button"
            className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-500 hover:text-[#D4AF37] font-semibold transition-all duration-300 cursor-pointer mt-2 py-2"
          >
            <HelpCircle className="w-3 h-3 text-[#D4AF37]" />
            <span className="font-montserrat">Narrative Concept</span>
          </button>
        </motion.div>

      </div>


      {/* 4. VISUAL CONCEPT MODAL OVERLAY */}
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
              className="bg-stone-900 border border-stone-800 p-8 md:p-10 rounded max-w-2xl shadow-2xl cursor-default relative text-left"
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

      {/* 3. BORDER TRANSITION LEAD-CAPTURE GATEWAY */}
      <div className="relative w-full border-t border-stone-850/20 bg-gradient-to-b from-[#021A0D] to-stone-950 pt-10 pb-16 z-30 select-none">
        
        {/* Symmetrical Gold/Line Separator Accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent flex items-center justify-center">
          <div className="px-4 bg-[#021A0D] text-[#D4AF37] flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-medium font-montserrat">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Consultation Gateway</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#011c0c]/85 backdrop-blur-md border border-[#D4AF37]/25 rounded p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle internal light leak */}
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full filter blur-[50px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Column 1: Descriptive text */}
              <div className="lg:col-span-5 flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Reserve Private Consultation
                </span>
                <h4 className="font-serif text-lg md:text-xl font-light uppercase text-white tracking-wide">
                  Coordinate Your <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Vision</span>
                </h4>
                <p className="text-[11px] text-stone-400 font-sans tracking-wide leading-relaxed max-w-sm">
                  Our spatial architects and event producers are ready to design your landmark celebration or luxury residential project. Request a quick callback below.
                </p>
              </div>

              {/* Column 2: Lead Form */}
              <div className="lg:col-span-7">
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
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2">
                    
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

      </div>
    </section>
  );
}
export default Hero;
