import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/firebase/config";

export function ContactPage() {
  const navigate = useNavigate();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detailed client form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Corporate Events",
    timeline: "",
    budget: "25 - 50 Lakhs",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setStatus({
        type: "error",
        message: "Please enter your name, email, and phone number.",
      });
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Format message to bundle extra fields (timeline, budget) for schema compliance
    const formattedMessage = `[Project Timeline/Date: ${form.timeline || "TBD"}] [Budget Bracket: ${form.budget}] Client Brief: ${form.message}`;

    try {
      const result = await submitInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: formattedMessage,
      });

      if (result.success) {
        setStatus({
          type: "success",
          message: "Commission inquiry received. A design representative will reach out within 24 hours.",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "Corporate Events",
          timeline: "",
          budget: "25 - 50 Lakhs",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: "Form submission failed. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2B1A] text-[#F8F1E5] pt-32 pb-24 relative overflow-hidden select-none">
      
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -left-48 top-1/4 w-96 h-96 bg-[#D4A256]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 bg-[#D4A256]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation back helper */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-stone-400 hover:text-[#D4A256] text-[10px] uppercase tracking-widest font-montserrat font-bold transition-colors duration-300 mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Site
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Studio Information (5 columns wide) */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold font-montserrat flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Reserve Consultation
              </span>
              <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight">
                Commission <br />
                Your <span className="italic font-normal text-[#D4A256] tracking-normal">Vision</span>
              </h3>
              <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mt-4 max-w-sm">
                Our spatial architects and event producers are ready to coordinate your landmark celebration or luxury residential project. Let us curate your atmosphere.
              </p>
            </div>

            {/* Studio parameters */}
            <div className="flex flex-col gap-4 font-sans text-stone-400 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A256] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-white font-bold block mb-1">Studio Address</span>
                  <span>Andhra Pradesh Heritage Circle, Road No. 4, Hyderabad, IN</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4A256] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-white font-bold block mb-1">Direct Call</span>
                  <span>+91 90000 12345</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4A256] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-white font-bold block mb-1">Email Inquiries</span>
                  <span>concierge@hanavevs.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4A256] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-white font-bold block block mb-1">Studio Hours</span>
                  <span>Monday – Saturday: 10:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Faded brand credit */}
            <div className="flex items-center gap-2.5 pt-8 border-t border-[#09472A]/50">
              <img 
                src="/assets/logo.png" 
                alt="Haanav Logo" 
                className="w-8 h-8 rounded-full border border-[#D4A256]/30"
              />
              <span className="font-serif tracking-[0.1em] text-white">
                Haanav <span className="text-[#D4A256] font-semibold">Eviors</span>
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Client Form Card (7 columns wide) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#123D26]/75 backdrop-blur-md border border-[#1F6B41]/25 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left"
            >
              
              {/* Gold Top Hairline Border */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A256] to-transparent" />

              <h4 className="font-montserrat text-xs uppercase tracking-widest text-white font-bold mb-6">
                Consultation Brief Setup
              </h4>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* 2-Field Row: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anirudh K. Reddy"
                      disabled={loading}
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anirudh@domain.com"
                      disabled={loading}
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2-Field Row: Phone & Service Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 90000 12345"
                      disabled={loading}
                      value={form.phone}
                      onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Service of Interest</label>
                    <div className="relative">
                      <select
                        value={form.service}
                        disabled={loading}
                        onChange={(e) => setForm(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-stone-300 rounded px-3 py-2.5 text-xs font-sans transition-all focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="Corporate Events" className="bg-stone-950">Corporate Events</option>
                        <option value="Bespoke Weddings" className="bg-stone-950">Bespoke Weddings</option>
                        <option value="Residential Interiors" className="bg-stone-950">Residential Interiors</option>
                        <option value="Commercial Interiors" className="bg-stone-950">Commercial Interiors</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2-Field Row: Projected Timeline & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Projected Timeline / Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. October 2026 / Dec 15"
                        disabled={loading}
                        value={form.timeline}
                        onChange={(e) => setForm(prev => ({ ...prev, timeline: e.target.value }))}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none"
                      />
                      <Calendar className="absolute right-3 top-3 w-3.5 h-3.5 text-stone-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Estimated Budget Bracket</label>
                    <div className="relative">
                      <select
                        value={form.budget}
                        disabled={loading}
                        onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-stone-300 rounded px-3 py-2.5 text-xs font-sans transition-all focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="Under 10 Lakhs" className="bg-stone-950">Under 10 Lakhs</option>
                        <option value="10 - 25 Lakhs" className="bg-stone-950">10 - 25 Lakhs</option>
                        <option value="25 - 50 Lakhs" className="bg-stone-950">25 - 50 Lakhs</option>
                        <option value="50 Lakhs +" className="bg-stone-950">50 Lakhs +</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-stone-400 font-montserrat font-semibold">Design Brief / Message Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your design parameters, style preferences, and key goals..."
                    disabled={loading}
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-stone-950/60 border border-stone-850/60 focus:border-[#D4A256] text-white rounded px-3 py-2.5 text-xs font-sans placeholder-stone-600 transition-all focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Row & Feedback */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2">
                  
                  {/* Feedback Messages */}
                  <div className="flex-grow">
                    <AnimatePresence mode="wait">
                      {status.type && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={`flex items-center gap-2 text-[10px] tracking-wide font-sans ${
                            status.type === "success" ? "text-emerald-400" : "text-[#D4A256]"
                          }`}
                        >
                          {status.type === "success" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          )}
                          <span>{status.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="gold"
                    size="sm"
                    disabled={loading}
                    className="px-8 py-3.5 font-montserrat uppercase text-[9px] tracking-widest font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(212,162,86,0.25)] hover:shadow-[0_0_35px_rgba(212,162,86,0.45)]"
                  >
                    {loading ? "Processing..." : "Submit Consultation Request"}
                  </Button>
                  
                </div>

              </form>

            </motion.div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ContactPage;
