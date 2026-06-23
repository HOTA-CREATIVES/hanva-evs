import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Set initial scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (selector?: string) => {
    setIsOpen(false);
    if (selector && location.pathname === "/") {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Design Studio", path: "/", selector: "#moodboard-studio" },
    { name: "Portfolio", path: "/", selector: "#portfolio" },
    { name: "About", path: "/", selector: "#about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <nav
        className={`w-full max-w-7xl mx-auto pointer-events-auto transition-all duration-500 rounded-full border shadow-xl ${
          scrolled
            ? "bg-[#031F12]/80 html-light:bg-[#FAFAFA]/80 backdrop-blur-md border-[#073C23]/60 html-light:border-stone-200 py-3.5 px-6 md:px-12"
            : "bg-[#031F12]/40 html-light:bg-[#FAFAFA]/40 backdrop-blur-md border-[#073C23]/20 html-light:border-stone-200/30 py-5 px-6 md:px-12"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo / Brand Name */}
          <Link to="/" onClick={() => handleLinkClick()} className="flex flex-col group">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-white html-light:text-stone-900 transition-colors duration-300">
                HAANAV <span className="text-[#D4AF37]">EVIORS</span>
              </span>
            </div>
            <span className="text-[9px] tracking-[0.35em] text-stone-400 html-light:text-stone-500 uppercase mt-0.5 ml-5 font-montserrat">
              Spaces & Experiences
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-montserrat text-xs tracking-widest uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.selector)}
                className="text-stone-300 html-light:text-stone-600 hover:text-white html-light:hover:text-stone-900 transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <Link
              to="/"
              onClick={() => handleLinkClick("#contact")}
              className="px-5 py-2.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#031F12] html-light:hover:text-[#FAFAFA] font-medium rounded-sm transition-all duration-300 hover:scale-105"
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-300 html-light:text-stone-600 hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Capsule */}
        {isOpen && (
          <div className="fixed top-24 right-4 w-72 max-h-[70vh] z-40 bg-[#031F12]/98 html-light:bg-[#FAFAFA]/98 backdrop-blur-lg border border-[#073C23] html-light:border-stone-200 rounded-3xl flex flex-col items-center gap-6 py-8 px-6 md:hidden shadow-2xl transition-all duration-300 pointer-events-auto overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.selector)}
                className="text-base font-serif tracking-widest text-stone-300 html-light:text-stone-600 hover:text-white html-light:hover:text-stone-900 transition-colors duration-300 w-full text-center py-2 border-b border-[#073C23]/20 html-light:border-stone-200"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);
                handleLinkClick("#contact");
              }}
              className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#031F12] html-light:hover:text-[#FAFAFA] font-medium tracking-widest rounded-xl transition-all duration-300 text-xs uppercase text-center mt-2"
            >
              Inquire Now
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
