import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();
  const handleScrollToSection = (id: string) => {
    if (id === "contact") {
      navigate("/contact");
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0B2B1A] text-[#F8F1E5] pt-16 pb-12 border-t border-[#09472A]/50 select-none overflow-hidden">
      
      {/* Symmetrical Gold Line/Dot Separator at the top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A256]/35 to-transparent flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A256]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start text-left text-xs font-sans text-stone-400">
          
          {/* Column 1: Brand details (5 columns wide) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/logo.png" 
                alt="Haanav Logo" 
                className="w-8 h-8 rounded-full border border-[#D4A256]/30 object-cover"
              />
              <span className="font-serif text-sm tracking-[0.1em] text-white">
                Haanav <span className="text-[#D4A256] font-semibold">Eviors</span>
              </span>
            </div>
            
            <p className="font-serif italic font-light text-stone-300 leading-relaxed text-sm max-w-xs">
              "We Design experiences . You live them."
            </p>
            
            <span className="text-[9px] font-montserrat uppercase tracking-widest text-stone-500 block mt-2">
              Boutique Studio • Events & Interiors
            </span>
          </div>

          {/* Column 2: Navigation Links (3 columns wide) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-montserrat uppercase text-[10px] tracking-widest text-white font-bold">
              Quick Links
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", id: "home" },
                { label: "About Studio", id: "about" },
                { label: "Our Services", id: "services" },
                { label: "Design Process", id: "process" },
                { label: "Contact Concierge", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollToSection(link.id)}
                  className="text-left text-stone-400 hover:text-[#D4A256] transition-colors duration-300 cursor-pointer font-montserrat text-[10px] uppercase tracking-widest font-semibold"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info (4 columns wide) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-montserrat uppercase text-[10px] tracking-widest text-white font-bold">
              Contact Details
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A256] mt-0.5 flex-shrink-0" />
                <span>Bhimavaram, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4A256] flex-shrink-0" />
                <span>+91 81791 14167</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A256] flex-shrink-0" />
                <a href="mailto:haanaveviors@gmail.com" className="hover:underline text-stone-400 hover:text-[#D4A256]">
                  haanaveviors@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-16 pt-6 border-t border-[#09472A]/20 flex flex-col sm:flex-row items-center justify-between text-[9px] font-montserrat uppercase tracking-widest text-stone-500">
          <span>&copy; {new Date().getFullYear()} Haanav Eviors. All rights reserved.</span>
          <span className="text-[#D4A256] font-bold mt-2 sm:mt-0">Masters of Atmosphere</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
