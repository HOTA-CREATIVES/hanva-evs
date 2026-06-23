import { Sparkles, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import branding from "../../data/branding.json";

export function Footer() {
  const { company, services } = branding;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02150C] html-light:bg-stone-100 text-stone-300 html-light:text-stone-700 border-t border-[#073C23] html-light:border-stone-200 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Info Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-lg tracking-[0.2em] font-medium text-white html-light:text-stone-900">
              HAANAV <span className="text-[#D4AF37]">EVIORS</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 html-light:text-stone-500 leading-relaxed font-sans max-w-sm mt-2">
            {company.about}
          </p>
          <p className="text-[11px] text-[#D4AF37] italic font-serif mt-1">
            "{company.slogan}"
          </p>
        </div>

        {/* Services Columns */}
        <div>
          <h4 className="font-serif text-sm tracking-wider text-white html-light:text-stone-900 uppercase mb-4">
            Bespoke Events
          </h4>
          <ul className="space-y-2 text-xs">
            {services.events.map((service, index) => (
              <li key={index} className="text-stone-400 html-light:text-stone-500">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm tracking-wider text-white html-light:text-stone-900 uppercase mb-4">
            Luxury Interiors
          </h4>
          <ul className="space-y-2 text-xs">
            {services.interiors.map((service, index) => (
              <li key={index} className="text-stone-400 html-light:text-stone-500">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-3 text-xs">
          <h4 className="font-serif text-sm tracking-wider text-white html-light:text-stone-900 uppercase mb-4">
            Concierge Office
          </h4>
          
          <div className="flex items-start gap-2.5">
            <MapPin size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <span className="text-stone-400 html-light:text-stone-500 leading-normal">
              {company.location.address}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone size={14} className="text-[#D4AF37] shrink-0" />
            <a href={`tel:${company.contacts.phoneRaw}`} className="text-stone-400 html-light:text-stone-500 hover:text-white html-light:hover:text-stone-900 transition-colors duration-300">
              {company.contacts.phone}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail size={14} className="text-[#D4AF37] shrink-0" />
            <a href={`mailto:${company.contacts.email}`} className="text-stone-400 html-light:text-stone-500 hover:text-white html-light:hover:text-stone-900 transition-colors duration-300">
              {company.contacts.email}
            </a>
          </div>

          {/* WhatsApp Direct Chat Button */}
          <div className="mt-4">
            <a
              href={company.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#052A19] hover:bg-[#073D25] border border-[#0A502F] text-[#D4AF37] text-[11px] tracking-wider uppercase font-medium rounded-sm transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={14} />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#042817] html-light:border-stone-200 text-center text-[10px] text-stone-500 tracking-wider">
        <p>&copy; {currentYear} {company.name}. All Rights Reserved. Crafted with Luxury Design System.</p>
      </div>
    </footer>
  );
}

export default Footer;
