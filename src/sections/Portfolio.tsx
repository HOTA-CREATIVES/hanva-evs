import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";

interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: string; // The specific filtering category
  displayCategory: string; // User-facing clean category
  desc: string;
  size: "small" | "large" | "medium"; // Masonry-like size variations
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    src: "/assets/portfolio_wedding.png",
    category: "Weddings",
    displayCategory: "Bespoke Weddings",
    title: "The Orchid Sanctuary",
    desc: "A cathedral wedding layout featuring suspended white orchids and warm scenographic lights.",
    size: "large",
  },
  {
    id: 2,
    src: "/assets/portfolio_corporate.png",
    category: "Corporate Events",
    displayCategory: "Corporate Events",
    title: "Vanguard Tech Reveal",
    desc: "Minimalist volumetric stage design for a high-end electronic hardware launch.",
    size: "medium",
  },
  {
    id: 3,
    src: "/assets/portfolio_interior_living.png",
    category: "Residential",
    displayCategory: "Residential Interiors",
    title: "Casa di Marmo",
    desc: "Luxury residential living room incorporating custom matte charcoal panels and brushed brass.",
    size: "large",
  },
  {
    id: 4,
    src: "/assets/hero_bg.png",
    category: "Commercial",
    displayCategory: "Commercial Interiors",
    title: "Terrazza del Lago",
    desc: "A premium lakeside cocktail terrace showroom designed with high-end Italian architectural stone.",
    size: "medium",
  },
  {
    id: 5,
    src: "/assets/about_bg.png",
    category: "Luxury Interiors",
    displayCategory: "Luxury Interiors",
    title: "Studio Pietra",
    desc: "Architectural workspace showcasing raw concrete texturing, warm oak slats, and floor-to-ceiling glass.",
    size: "small",
  },
  {
    id: 6,
    src: "/assets/portfolio_interior_living.png",
    category: "Luxury Interiors",
    displayCategory: "Luxury Interiors",
    title: "Aura Penthouse Suite",
    desc: "High-end luxury suite detailing integrated shelf illumination and custom furniture layouts.",
    size: "small",
  },
];

const CATEGORIES = ["All", "Weddings", "Corporate Events", "Luxury Interiors", "Residential", "Commercial"];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter logic
  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Prepare images for Lightbox
  const lightboxImages = filteredItems.map((item) => ({
    src: item.src,
    title: item.title,
    category: item.displayCategory,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="relative py-24 bg-stone-950 text-white">
      {/* Background radial accent */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Archive
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-4">
              Featured <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Portfolios</span>
            </h3>
            <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
              Explore a curated selection of our finest creations. Every event is an extraordinary narrative; every space is a timeless architectural statement.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-medium transition-all duration-300 rounded-full cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#D4AF37] text-stone-950 font-semibold shadow-md shadow-[#D4AF37]/20"
                    : "bg-stone-900/40 text-stone-400 border border-stone-800/45 hover:text-white hover:border-stone-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden bg-stone-900 border border-stone-900/60 cursor-zoom-in rounded ${
                  item.size === "large"
                    ? "md:row-span-2 md:h-[620px]"
                    : item.size === "medium"
                    ? "md:h-[400px]"
                    : "md:h-[300px]"
                } h-[320px]`}
              >
                {/* Portfolio Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-[800ms] ease-out"
                />

                {/* Glassmorphic Gradient Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* High-end Hover Details */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none">
                  {/* Category Accent */}
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                    {item.displayCategory}
                  </span>
                  
                  {/* Title */}
                  <h4 className="font-serif text-xl font-light text-white uppercase mb-2 tracking-wide">
                    {item.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-[11px] text-stone-300 font-sans tracking-wide leading-relaxed mb-6 line-clamp-2 max-w-sm">
                    {item.desc}
                  </p>

                  {/* Zoom Action Icon */}
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/80 font-bold">
                    <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Project</span>
                  </div>
                </div>

                {/* Sub-card minimal branding (visible in default state) */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent group-hover:hidden transition-all duration-300">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-medium">
                      {item.displayCategory}
                    </span>
                    <h5 className="font-sans text-xs font-semibold text-white tracking-wide uppercase mt-1">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Trigger Hook */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
export default Portfolio;
