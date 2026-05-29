import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const scrollProgress = useScrollProgress();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll event detector
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Listen for navigation state from other pages (e.g. returning from Admin dashboard)
  useEffect(() => {
    if (location.pathname === "/" && location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      // Clear navigation state
      navigate("/", { replace: true, state: {} });
      // Timeout to wait for load
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location, navigate]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: scrollDirection === "down" ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-stone-950/80 dark:bg-stone-950/80 border-b border-stone-900/40 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        {/* Top Scroll Progress Indicator */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#D4AF37] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 hover:opacity-90 cursor-pointer text-left"
          >
            <img
              src="/assets/logo.png"
              alt="Haanav Eviors Logo"
              className="w-8 h-8 rounded-full border border-[#D4AF37]/40 object-cover"
            />
            <span className="font-serif text-sm md:text-base tracking-[0.12em] font-light text-white">
              Haanav <span className="text-[#D4AF37] font-semibold">Eviors</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-stone-300 dark:text-stone-300 hover:text-white dark:hover:text-white text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-300 relative py-1.5 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </div>

          {/* Controls: Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/40 border border-stone-800/40 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-[77px] inset-x-0 bg-stone-950 border-b border-stone-900/80 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col gap-5 px-8 py-10">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-left text-stone-300 hover:text-[#D4AF37] text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
export default Navbar;
