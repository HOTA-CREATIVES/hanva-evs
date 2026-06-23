import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
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
    if (id === "contact") {
      navigate("/contact");
      return;
    }
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scroll to target section when returning from other routes
  useEffect(() => {
    if (location.pathname === "/" && location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      navigate("/", { replace: true, state: {} });
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
          y: scrollDirection === "down" && isScrolled ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B2B1A]/90 border-b border-[#1F6B41]/10 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        {/* Top Scroll Progress Indicator */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#D4A256] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo Monogram */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 hover:opacity-90 cursor-pointer text-left"
          >
            <img
              src="/assets/logo.png"
              alt="Haanav Eviors Logo"
              className="w-8 h-8 rounded-full border border-[#D4A256]/40 object-cover"
            />
            <span className="font-serif text-sm md:text-base tracking-[0.12em] font-light text-white">
              Haanav <span className="text-[#D4A256] font-semibold">Eviors</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-stone-300 hover:text-white text-[11px] font-montserrat font-medium uppercase tracking-[0.2em] transition-colors duration-300 relative py-1.5 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4A256] group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Icon Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/40 border border-stone-850/40 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Full-screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-[68px] inset-x-0 bg-[#0B2B1A] border-b border-[#1F6B41]/10 overflow-hidden shadow-2xl z-30"
            >
              <div className="flex flex-col gap-6 px-10 py-16 text-left">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-left text-stone-200 hover:text-[#D4A256] text-sm font-montserrat font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer py-1"
                  >
                    {link.label}
                  </motion.button>
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
