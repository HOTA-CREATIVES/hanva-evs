import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Sparkles, Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import branding from "../../data/branding.json";
import { db, isMock, mockDb, appsScriptUrl } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

interface MoodboardData {
  serviceType: string;
  style: string;
  materials: string;
  lighting: string;
}

export function ContactPage() {
  const { company } = branding;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [moodboard, setMoodboard] = useState<MoodboardData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load moodboard configurations
  useEffect(() => {
    const raw = sessionStorage.getItem("haanav_moodboard");
    if (raw) {
      try {
        const parsed: MoodboardData = JSON.parse(raw);
        setMoodboard(parsed);
        
        // Auto-select matching service
        const matchedService = parsed.serviceType === "Events" ? "Bespoke Events" : "Luxury Interiors";
        
        setFormData((prev) => ({
          ...prev,
          service: matchedService,
          message: `Interested in creating a concept based on my moodboard:\n- Domain: ${parsed.serviceType}\n- Style Theme: ${parsed.style}\n- Textures: ${parsed.materials}\n- Accent Glow: ${parsed.lighting}\n\n[Please describe your specific requirements here...]`,
        }));
      } catch (e) {
        console.error("Failed to parse moodboard from storage", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearMoodboard = () => {
    sessionStorage.removeItem("haanav_moodboard");
    setMoodboard(null);
    setFormData((prev) => ({
      ...prev,
      service: "",
      message: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Email, and Service).");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const payload = {
      ...formData,
      moodboard: moodboard ? `${moodboard.style} | Textures: ${moodboard.materials} | Light: ${moodboard.lighting}` : "None",
      timestamp: new Date().toISOString(),
      status: "New"
    };

    try {
      // 1. Save in Firestore / LocalStorage Mock DB for Admin Dashboard visibility
      if (!isMock && db) {
        await addDoc(collection(db, "inquiries"), payload);
      } else {
        await mockDb.addDoc("inquiries", payload);
      }

      // 2. Submit to Google Apps Script (if configured)
      if (appsScriptUrl) {
        try {
          // Send as text/plain to avoid pre-flight issues in Google Apps Script redirects
          await fetch(appsScriptUrl, {
            method: "POST",
            mode: "no-cors", // Crucial for Google Apps Script redirects
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        } catch (scriptErr) {
          console.warn("Google Apps Script delivery warning (leads still saved locally):", scriptErr);
        }
      }

      // Reset Form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      sessionStorage.removeItem("haanav_moodboard");
      setMoodboard(null);
      setSubmitStatus("success");
    } catch (err: any) {
      console.error("Submission failed", err);
      setSubmitStatus("error");
      setErrorMessage(err.message || "An error occurred while saving your inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full min-h-screen bg-[#031F12] html-light:bg-[#FAFAFA] text-stone-100 html-light:text-stone-900 transition-colors duration-300 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-montserrat text-[#D4AF37] block mb-3 animate-pulse">
            Private Consultation
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white html-light:text-stone-900 font-light tracking-wide">
            Bespoke <span className="italic font-normal text-[#D4AF37]">Inquiry Form</span>
          </h1>
          <p className="text-xs text-stone-400 html-light:text-stone-500 font-light mt-4 leading-relaxed font-sans">
            Connect with our executive design team. Every project begins with a conversation about scale, aesthetics, and materials.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details (Columns: 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 p-8 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat block mb-2">
                Office Hours
              </span>
              <h3 className="font-serif text-lg text-white html-light:text-stone-950 font-light tracking-wide">
                Haanav Concierge Office
              </h3>
              <p className="text-xs text-stone-400 html-light:text-stone-500 font-sans font-light mt-3 leading-relaxed">
                Our luxury design specialists are available Monday to Saturday for visual walk-throughs and site assessments.
              </p>
            </div>

            <div className="flex flex-col gap-4 font-sans text-xs">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#D4AF37] shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-semibold text-white html-light:text-stone-900 mb-0.5">Address</h4>
                  <p className="text-stone-400 html-light:text-stone-500 leading-normal">{company.location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[#D4AF37] shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-semibold text-white html-light:text-stone-900 mb-0.5">Phone</h4>
                  <a href={`tel:${company.contacts.phoneRaw}`} className="text-stone-400 html-light:text-stone-500 hover:text-white html-light:hover:text-stone-950 transition-colors">
                    {company.contacts.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-[#D4AF37] shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-semibold text-white html-light:text-stone-900 mb-0.5">Email</h4>
                  <a href={`mailto:${company.contacts.email}`} className="text-stone-400 html-light:text-stone-500 hover:text-white html-light:hover:text-stone-950 transition-colors">
                    {company.contacts.email}
                  </a>
                </div>
              </div>
            </div>

            {/* If moodboard active, show it */}
            {moodboard && (
              <div className="border-t border-[#073C23] html-light:border-stone-200 pt-6 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold font-montserrat flex items-center gap-1">
                    <Sparkles size={11} />
                    Active Moodboard
                  </span>
                  <button
                    onClick={handleClearMoodboard}
                    className="text-[9px] text-stone-500 hover:text-[#D4AF37] uppercase tracking-wider font-montserrat transition-colors"
                  >
                    Clear Setup
                  </button>
                </div>

                <div className="bg-[#031C10] html-light:bg-stone-200/50 p-4 border border-[#D4AF37]/25 rounded-sm">
                  <p className="text-[11px] text-stone-300 html-light:text-stone-700 leading-relaxed font-light">
                    Your form is pre-loaded with **{moodboard.style}** concept parameters, texture palette selections (**{moodboard.materials}**), and lighting accents.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Submission Form (Columns: 7) */}
          <div className="lg:col-span-7 bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 p-8 rounded-sm shadow-xl">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Validation Feedback Banner */}
              {submitStatus === "success" && (
                <div className="flex items-start gap-3 p-4 bg-[#0A502F]/20 border border-green-500/50 rounded-sm text-green-300 text-xs">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-green-400" />
                  <div>
                    <h4 className="font-bold text-white html-light:text-stone-900">Inquiry Received Successfully!</h4>
                    <p className="mt-1 text-stone-400 html-light:text-stone-600 leading-normal">
                      Thank you for contacting Haanav Eviors. A luxury consultant has been notified and will reach out to you within 24 business hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-950/20 border border-red-500/50 rounded-sm text-red-300 text-xs">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <h4 className="font-bold text-white html-light:text-stone-900">Submission Alert</h4>
                    <p className="mt-1 text-stone-400 html-light:text-stone-600 leading-normal">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Name field */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 font-montserrat">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Marcus Vance"
                  required
                  className="w-full px-4 py-3 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-white html-light:text-stone-900 rounded-sm focus:outline-none focus:border-[#D4AF37] font-sans text-xs transition-colors duration-300"
                />
              </div>

              {/* Email and Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 font-montserrat">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. marcus@vanguard.com"
                    required
                    className="w-full px-4 py-3 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-white html-light:text-stone-900 rounded-sm focus:outline-none focus:border-[#D4AF37] font-sans text-xs transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 font-montserrat">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full px-4 py-3 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-white html-light:text-stone-900 rounded-sm focus:outline-none focus:border-[#D4AF37] font-sans text-xs transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Service selection */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 font-montserrat">
                  Bespoke Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-stone-300 html-light:text-stone-800 rounded-sm focus:outline-none focus:border-[#D4AF37] font-sans text-xs transition-colors duration-300"
                >
                  <option value="" disabled>Select a Domain</option>
                  <option value="Bespoke Events">Bespoke Events (Weddings / Gatherings)</option>
                  <option value="Luxury Interiors">Luxury Interiors (Residential / Commercial)</option>
                  <option value="Renovation Projects">Renovation Projects</option>
                  <option value="Custom Design Solutions">Custom Design Solutions</option>
                </select>
              </div>

              {/* Message field */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 font-montserrat">
                  Requirements / Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about the space or event scale, location, timelines, and preferred materials..."
                  className="w-full px-4 py-3 bg-[#031C10] html-light:bg-white border border-[#073C23] html-light:border-stone-300 text-white html-light:text-stone-900 rounded-sm focus:outline-none focus:border-[#D4AF37] font-sans text-xs leading-relaxed transition-colors duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] disabled:bg-stone-800 disabled:text-stone-600 disabled:cursor-not-allowed text-[#031F12] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] shadow-lg shadow-[#D4AF37]/10"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Submitting Concierge Pipeline...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Submit Private Inquiry
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ContactPage;
