import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiry } from "@/firebase/config";
import { Button } from "@/components/ui/button";

const SERVICES_LIST = [
  "Corporate Events",
  "Bespoke Weddings",
  "Product Launches",
  "Exhibitions & Expos",
  "Stage & Set Design",
  "Private Celebrations",
  "Residential Interiors",
  "Commercial Interiors",
  "Executive Workspaces",
  "Luxury Living Spaces",
  "Modular Formulations",
  "Bespoke Space Planning",
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      setStatus({
        type: "error",
        message: "Please compile all required inquiry fields.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const result = await submitInquiry(formData);
      
      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        });
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: "Failed to dispatch inquiry. Please check your credentials.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred during submission.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-stone-950 text-white border-b border-stone-900">
      {/* Background visual detail */}
      <div className="absolute right-[5%] top-[10%] w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Inquiries
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Initiate Your <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Consultation</span>
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
            Ready to shape extraordinary experiences and architectural environments? File your details below. A designated executive consultant will respond within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info & Stylized Architectural Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Info Cards */}
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-5 p-5 border border-stone-900 bg-stone-950/20 rounded">
                <div className="p-3 text-[#D4AF37] bg-stone-900 border border-stone-850 rounded h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">
                    HQ Design Office
                  </h5>
                  <p className="font-sans text-xs tracking-wide text-white leading-relaxed">
                    12 Corso Magenta, 20123 Milano, Italy
                  </p>
                  <p className="font-sans text-[10px] tracking-wide text-stone-500 mt-1">
                    By private appointment only.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 p-5 border border-stone-900 bg-stone-950/20 rounded">
                <div className="p-3 text-[#D4AF37] bg-stone-900 border border-stone-850 rounded h-fit">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">
                    Concierge Channels
                  </h5>
                  <a
                    href="mailto:inquiries@haanaveviors.com"
                    className="font-sans text-xs tracking-wide text-white hover:text-[#D4AF37] transition-colors block mb-1"
                  >
                    inquiries@haanaveviors.com
                  </a>
                  <a
                    href="mailto:gurunadar@gmail.com"
                    className="font-sans text-[10px] tracking-wide text-stone-400 hover:text-[#D4AF37] transition-colors"
                  >
                    Admin: gurunadar@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5 p-5 border border-stone-900 bg-stone-950/20 rounded">
                <div className="p-3 text-[#D4AF37] bg-stone-900 border border-stone-850 rounded h-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-1">
                    Telephonic Concierge
                  </h5>
                  <a
                    href="tel:+39021234567"
                    className="font-sans text-xs tracking-wide text-white hover:text-[#D4AF37] transition-colors block"
                  >
                    +39 02 123 4567
                  </a>
                  <span className="text-[10px] text-stone-500 font-sans tracking-wide block mt-1">
                    Mon - Fri, 09:00 - 18:00 CET
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Stylized Map (SVG instead of heavy Iframe) */}
            <div className="relative w-full aspect-[4/3] rounded border border-stone-900 bg-stone-950/80 shadow-2xl overflow-hidden flex flex-col justify-center items-center p-4 group select-none">
              {/* SVG Abstract Grid Pattern mimicking Milano Center block */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full opacity-15 filter brightness-105"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 0,50 L 400,80 M 0,150 L 400,120 M 0,220 L 400,250" stroke="#888" strokeWidth="1" />
                <path d="M 50,0 L 90,300 M 180,0 L 150,300 M 300,0 L 320,300" stroke="#888" strokeWidth="1" />
                <circle cx="165" cy="135" r="50" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
                <path d="M 120,80 L 220,190" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
              </svg>

              {/* Gold target marker */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center gap-2 cursor-default"
              >
                <div className="w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center border-4 border-stone-950 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                <div className="bg-stone-900 border border-stone-850 px-3 py-1.5 rounded shadow-lg">
                  <span className="font-serif text-[10px] uppercase text-white font-light tracking-[0.12em]">
                    HAANAV <span className="text-[#D4AF37] font-semibold">EVIORS</span>
                  </span>
                </div>
              </motion.div>
              
              {/* Map branding banner */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 bg-stone-900/60 p-3 rounded backdrop-blur-sm border border-stone-900/50">
                <span className="text-[9px] uppercase tracking-widest text-stone-400">Milano Design District</span>
                <span className="text-[8px] text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded">45.46° N, 9.17° E</span>
              </div>
            </div>
          </div>

          {/* Right: Stateful Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/10 border border-stone-900 rounded p-8 md:p-10 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Status Banner */}
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-start gap-3 p-4 rounded border text-xs tracking-wide leading-relaxed font-sans ${
                      status.type === "success"
                        ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-white"
                        : "bg-red-950/15 border-red-900/40 text-red-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aria Moretti"
                  className="w-full bg-stone-900/60 border border-stone-850 focus:border-[#D4AF37] text-stone-200 focus:text-white px-4 py-3 rounded text-xs outline-none transition-all duration-300 font-sans"
                  required
                />
              </div>

              {/* Email & Phone Split Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. aria@moretti.com"
                    className="w-full bg-stone-900/60 border border-stone-850 focus:border-[#D4AF37] text-stone-200 focus:text-white px-4 py-3 rounded text-xs outline-none transition-all duration-300 font-sans"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +39 333 123 4567"
                    className="w-full bg-stone-900/60 border border-stone-850 focus:border-[#D4AF37] text-stone-200 focus:text-white px-4 py-3 rounded text-xs outline-none transition-all duration-300 font-sans"
                    required
                  />
                </div>
              </div>

              {/* Service Dropdown Selection */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                  Service of Interest *
                </label>
                <div className="relative">
                  <select
                    id="service-select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-stone-900/60 border border-stone-850 focus:border-[#D4AF37] text-stone-200 focus:text-white px-4 py-3.5 rounded text-xs outline-none transition-all duration-300 font-sans cursor-pointer appearance-none"
                    required
                  >
                    <option value="" disabled className="bg-stone-950 text-stone-600">
                      Select Service Category...
                    </option>
                    {SERVICES_LIST.map((service, i) => (
                      <option key={i} value={service} className="bg-stone-950 text-stone-200">
                        {service}
                      </option>
                    ))}
                  </select>
                  {/* Subtle chevron drop symbol overlay */}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500 text-[10px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                  Brief / Requirements *
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Outline your event scenography or architectural interior requirements in detail..."
                  className="w-full bg-stone-900/60 border border-stone-850 focus:border-[#D4AF37] text-stone-200 focus:text-white px-4 py-3 rounded text-xs outline-none transition-all duration-300 font-sans resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gold"
                size="md"
                disabled={loading}
                className="w-full mt-4"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                {loading ? "Dispatching..." : "Submit Secure Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
