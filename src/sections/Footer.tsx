const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const SERVICE_LINES = [
  "Corporate Galas",
  "Bespoke Weddings",
  "Product Launches",
  "Residential Architecture",
  "Commercial Showrooms",
  "Custom Space Planning",
];

export function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 px-6 md:px-12 border-t border-stone-900 font-sans text-xs relative z-10 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        
        {/* Brand Description Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start text-left">
          <button
            onClick={() => handleScrollTo("home")}
            className="flex items-center gap-3 font-serif text-lg tracking-[0.25em] font-light text-white hover:opacity-90 uppercase cursor-pointer mb-6"
          >
            <img
              src="/assets/logo.png"
              alt="Haanav Eviors Logo"
              className="w-7 h-7 rounded-full border border-[#D4AF37]/35 object-cover"
            />
            <span className="font-serif text-base tracking-[0.12em] font-light text-white">
              Haanav <span className="text-[#D4AF37] font-semibold">Eviors</span>
            </span>
          </button>
          
          <p className="text-stone-500 font-sans tracking-wide leading-relaxed mb-6 max-w-sm">
            Orchestrating magnificent luxury experiences and drafting modern minimalist interior architecture. <strong>We Design experiences. You live them.</strong> Based in Milan, Italy, serving a global cohort of discerning patrons.
          </p>
          
          <span className="text-[10px] text-stone-600 tracking-wider">
            Corso Magenta 12, Milano, Italy
          </span>
        </div>

        {/* Navigation Quick Links Column (3 cols) */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-6">
            Quick Navigation
          </h5>
          <div className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-stone-400 hover:text-[#D4AF37] tracking-wider text-left transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Showcase Column (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <h5 className="font-sans text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-6">
            Expertise Channels
          </h5>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
            {SERVICE_LINES.map((service, index) => (
              <span
                key={index}
                className="text-stone-500 hover:text-stone-300 tracking-wide text-left cursor-default transition-colors duration-300"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright & Subscriptions Bar */}
      <div className="max-w-7xl mx-auto border-t border-stone-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-600">
        <p>&copy; {new Date().getFullYear()} Haanav Eviors. All Rights Reserved.</p>
        
        {/* Elite Sign-off */}
        <div className="flex items-center gap-4">
          <span className="hover:text-stone-400 transition-colors cursor-default">Privacy Protocol</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30" />
          <span className="hover:text-stone-400 transition-colors cursor-default">Design Codex</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
