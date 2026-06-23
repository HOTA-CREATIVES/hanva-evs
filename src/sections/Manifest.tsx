import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getFirestorePortfolios } from "@/firebase/config";
import type { PortfolioItem } from "@/firebase/config";

interface ValueItem {
  number: string;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    number: "01",
    title: "Curated Materials",
    description: "Sourcing authentic teakwood, custom brass, and tactile linens.",
  },
  {
    number: "02",
    title: "Architectural Rigor",
    description: "Engineering fluid zoning, acoustics, and seamless lighting.",
  },
  {
    number: "03",
    title: "Exclusivity",
    description: "Catering to a selected roster of private commissions annually.",
  },
];

const LOCAL_FALLBACK_PORTFOLIO: PortfolioItem[] = [
  {
    id: "portfolio-1",
    rank: 1,
    title: "Heritage Wedding Canopy",
    description: "A majestic open-air Telugu wedding canopy featuring hand-woven marigold grids, suspended brass bells, and a warm golden sunset backdrop.",
    img: "/assets/portfolio_wedding.png",
    category: "Weddings",
    tags: ["Bespoke Weddings", "large"]
  },
  {
    id: "portfolio-2",
    rank: 2,
    title: "Andhra Teakwood Lounge",
    description: "A custom residential drawing room showcasing solid Andhra teakwood panelling, hand-polished brass accents, and low-profile linen seating.",
    img: "/assets/portfolio_interior_living.png",
    category: "Residential",
    tags: ["Residential Interiors", "large"]
  },
  {
    id: "portfolio-3",
    rank: 3,
    title: "Executive Launch Stage",
    description: "An editorial corporate stage layout utilizing volumetric concrete geometry, warm scenic spotlights, and a seamless widescreen backdrop.",
    img: "/assets/portfolio_corporate.png",
    category: "Corporate Events",
    tags: ["Corporate Events", "medium"]
  },
  {
    id: "portfolio-4",
    rank: 4,
    title: "Minimalist Penthouse",
    description: "A high-rise luxury residence detailing fluted wall dividers, integrated ceiling lighting lanes, and custom bouclé-upholstered armchairs.",
    img: "/assets/hero_right_interiors.png",
    category: "Residential",
    tags: ["Residential Interiors", "medium"]
  },
  {
    id: "portfolio-5",
    rank: 5,
    title: "The Orchid Sanctuary",
    description: "An immersive indoor ceremony setup featuring suspended white orchid chandeliers and a mirror-finish ivory aisle.",
    img: "/assets/hero_telugu_wedding.png",
    category: "Weddings",
    tags: ["Bespoke Weddings", "small"]
  },
  {
    id: "portfolio-6",
    rank: 6,
    title: "Studio Pietra",
    description: "An architectural studio workspace showcasing raw concrete texturing, warm oak slats, and floor-to-ceiling glass paneling.",
    img: "/assets/about_bg.png",
    category: "Luxury Interiors",
    tags: ["Luxury Interiors", "small"]
  }
];

interface ManifestProps {
  activeTab?: "all" | "events" | "interiors";
  setActiveTab?: (tab: "all" | "events" | "interiors") => void;
}

export function Manifest({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }: ManifestProps = {}) {
  const [localActiveTab, setLocalActiveTab] = useState<"all" | "events" | "interiors">("all");
  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setLocalActiveTab;

  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getFirestorePortfolios();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(LOCAL_FALLBACK_PORTFOLIO);
        }
      } catch (err) {
        console.error("Failed to load portfolio items from Firestore:", err);
        setProjects(LOCAL_FALLBACK_PORTFOLIO);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const getSegment = (item: PortfolioItem) => {
    const cat = item.category.toLowerCase();
    const tagsStr = item.tags.map((t) => t.toLowerCase()).join(" ");
    if (
      cat.includes("wedding") ||
      cat.includes("event") ||
      tagsStr.includes("wedding") ||
      tagsStr.includes("event")
    ) {
      return "events";
    }
    return "interiors";
  };

  const filteredProjects = projects.filter((item) => {
    if (activeTab === "all") return true;
    return getSegment(item) === activeTab;
  });

  const handlePrev = () => {
    if (selectedIdx === null || filteredProjects.length === 0) return;
    setSelectedIdx((prev) => (prev === null ? 0 : (prev - 1 + filteredProjects.length) % filteredProjects.length));
  };

  const handleNext = () => {
    if (selectedIdx === null || filteredProjects.length === 0) return;
    setSelectedIdx((prev) => (prev === null ? 0 : (prev + 1) % filteredProjects.length));
  };

  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredProjects]);

  return (
    <section 
      id="about" 
      className="relative py-28 bg-[#FBF8F3] text-[#1C1F1D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Row 1: The Asymmetrical 2-Column Manifest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-20">
          
          {/* LEFT COLUMN: Trust Anchor & Founder Portrait (5 columns wide) */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Portrait Frame Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded overflow-hidden shadow-2xl bg-stone-100 mb-8 self-center">
              
              {/* Animated Offset Accent Gold Hairline Frame */}
              <motion.div 
                variants={{
                  rest: { x: 12, y: 12 },
                  hover: { x: 4, y: 4 }
                }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute inset-0 border border-[#D4A256] rounded pointer-events-none z-10"
              />
              
              {/* Main Image */}
              <img 
                src="/assets/about_bg.png" 
                alt="Founders & Principal Designers" 
                className="w-full h-full object-cover brightness-[0.96] transition-transform duration-700 hover:scale-103"
              />
              
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Founder Quote in Cormorant Garamond */}
            <blockquote className="font-serif italic font-light text-lg md:text-xl text-stone-800 leading-relaxed mb-3 mt-2 pr-2 text-justify text-balance">
              "We do not construct spaces. We edit light, wood, and motion until only your narrative remains."
            </blockquote>
            
            {/* Signature Title */}
            <span className="font-montserrat uppercase text-[9px] tracking-widest text-stone-500 font-bold">
              — Founders & Principal Designers, Haanav Eviors
            </span>
          </motion.div>
          
          {/* RIGHT COLUMN: Manifesto & Core Values (6 columns wide | Offset by 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-7 flex flex-col items-start text-left lg:mt-4"
          >
            {/* Eyebrow */}
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold mb-4 block font-montserrat">
              The Architects of Atmosphere
            </span>
            
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0B2B1A] leading-tight tracking-wide mb-6">
              Choreographing Ephemeral Celebrations & Permanent Sanctuaries
            </h2>
            
            {/* Philosophy Paragraphs */}
            <div className="space-y-6 text-stone-700 font-sans text-xs md:text-sm leading-relaxed mb-12 text-justify text-balance">
              <p>
                At Haanav Eviors, we think of a wedding, a corporate milestone, or a private residence not as a checklist, but as a meticulously designed narrative. We believe true luxury lies in the unseen details—the warm illumination of a brass samayalu lamp, the tactile grain of draped ivory linen, and the spatial harmony of contemporary grids.
              </p>
              <p>
                Our dual disciplines allow us to bridge the transient and the permanent. We choreograph the ephemeral architecture of elite celebrations with the same structural rigor and artistic vision that we apply to crafting luxury villas and workspace interiors.
              </p>
            </div>

            {/* Core Values Triptych List */}
            <div className="w-full border-t border-stone-200 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {VALUES.map((val, index) => (
                <div key={index} className="flex flex-col items-start">
                  <span className="font-montserrat text-stone-400 text-[10px] font-bold tracking-widest mb-1.5">
                    {val.number} /
                  </span>
                  <h4 className="font-montserrat uppercase text-[10px] font-extrabold tracking-widest text-[#0B2B1A] mb-1">
                    {val.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 font-sans leading-relaxed text-justify">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* Row 2: Curator's Portfolio Segment Divider */}
        <div className="border-t border-stone-200 pt-16 mt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A256] font-semibold font-montserrat">
                Curated Commissions
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-light tracking-wide uppercase mt-2">
                Featured <span className="italic font-normal text-[#D4A256]">Portfolio</span>
              </h3>
            </div>

            {/* Segment Switcher Tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-stone-200/60 pb-2 md:pb-0 md:border-none">
              {(["all", "events", "interiors"] as const).map((tab) => {
                const label =
                  tab === "all"
                    ? "ALL COMMISSIONS"
                    : tab === "events"
                    ? "TRANSIENT (EVENTS)"
                    : "PERMANENT (INTERIORS)";
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedIdx(null);
                    }}
                    className={`relative pb-2 text-[10px] md:text-[11px] font-montserrat uppercase font-extrabold tracking-widest cursor-pointer transition-colors duration-300 ${
                      isActive ? "text-[#0B2B1A]" : "text-stone-400 hover:text-[#0B2B1A]"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A256]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#D4A256]/30 border-t-[#D4A256] rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((item, idx) => {
                  const isLarge = item.tags.includes("large");
                  const cardLayout = isLarge
                    ? "col-span-1 md:col-span-2 aspect-[16/10] md:aspect-[16/10]"
                    : "col-span-1 aspect-[3/4]";

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedIdx(idx)}
                      className={`group relative bg-[#123D26] border border-[#1F6B41]/10 rounded-xl overflow-hidden shadow-lg flex flex-col justify-end p-6 text-left cursor-pointer ${cardLayout}`}
                    >
                      {/* Image */}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 brightness-[0.75] group-hover:brightness-[0.85]"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B1A]/95 via-[#0B2B1A]/20 to-transparent pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-start translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[8px] tracking-[0.2em] font-montserrat font-bold text-[#D4A256] uppercase">
                            {item.category}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A256]/50" />
                          <span className="text-[8px] tracking-[0.1em] font-sans text-stone-300">
                            {getSegment(item) === "events" ? "Transient Space" : "Permanent Space"}
                          </span>
                        </div>
                        <h4 className="font-serif text-base md:text-lg font-light text-white tracking-wide leading-snug">
                          {item.title}
                        </h4>
                      </div>

                      {/* Hover eye icon indicator */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 bg-black/40 rounded-full border border-white/10 text-white">
                        <Eye className="w-4 h-4" />
                      </div>

                      {/* Signature Gold top hairline reveals on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4A256] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Lightbox Modal Overlay */}
        <AnimatePresence>
          {selectedIdx !== null && filteredProjects[selectedIdx] && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="absolute inset-0 bg-[#0B2B1A]/95 backdrop-blur-md"
              />

              {/* Lightbox Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl bg-[#0B2B1A] text-[#F8F1E5] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#D4A256]/30 z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-[#123D26] text-[#F8F1E5] rounded-full hover:bg-[#D4A256] hover:text-[#0B2B1A] transition-all duration-300 shadow-lg cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Large Image */}
                <div className="w-full md:w-3/5 h-64 md:h-[65vh] relative overflow-hidden bg-stone-950 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={filteredProjects[selectedIdx].id}
                      src={filteredProjects[selectedIdx].img}
                      alt={filteredProjects[selectedIdx].title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Side: Narrative & details */}
                <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between bg-[#123D26]">
                  <div>
                    {/* Eyebrow Segment Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4A256] font-bold font-montserrat">
                        {filteredProjects[selectedIdx].category}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A256]/60" />
                      <span className="text-[9px] uppercase tracking-[0.1em] font-sans text-stone-300">
                        {getSegment(filteredProjects[selectedIdx]) === "events" ? "Transient Space" : "Permanent Space"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-serif font-light tracking-wide text-white mb-4">
                      {filteredProjects[selectedIdx].title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans mb-8 text-justify">
                      {filteredProjects[selectedIdx].description}
                    </p>

                    {/* Custom Seeded Tags */}
                    {filteredProjects[selectedIdx].tags && filteredProjects[selectedIdx].tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {filteredProjects[selectedIdx].tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 bg-[#0B2B1A]/60 border border-[#1F6B41]/30 rounded text-[9px] uppercase tracking-widest text-[#D4A256] font-bold font-montserrat"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Navigation Panel */}
                  <div className="flex items-center justify-between border-t border-[#1F6B41]/30 pt-6 mt-8">
                    {/* Index Indicator */}
                    <span className="font-montserrat text-xs tracking-widest text-[#D4A256] font-bold">
                      {String(selectedIdx + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                    </span>

                    {/* Controls */}
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrev}
                        className="p-2 border border-[#1F6B41]/40 rounded-full hover:border-[#D4A256] hover:bg-[#D4A256]/15 text-[#F8F1E5] hover:text-[#D4A256] transition-all duration-300 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-2 border border-[#1F6B41]/40 rounded-full hover:border-[#D4A256] hover:bg-[#D4A256]/15 text-[#F8F1E5] hover:text-[#D4A256] transition-all duration-300 cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default Manifest;
