import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Loader2 } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";
import { getFirestorePortfolios } from "@/firebase/config";
import type { PortfolioItem } from "@/firebase/config";

const CATEGORIES = ["All", "Weddings", "Corporate Events", "Luxury Interiors", "Residential", "Commercial"];

const DEFAULT_PORTFOLIOS: PortfolioItem[] = [
  {
    id: "portfolio-1",
    rank: 1,
    title: "The Orchid Sanctuary",
    description: "A cathedral wedding layout featuring suspended white orchids and warm scenographic lights.",
    img: "/assets/portfolio_wedding.png",
    category: "Weddings",
    tags: ["Bespoke Weddings", "large"]
  },
  {
    id: "portfolio-2",
    rank: 2,
    title: "Vanguard Tech Reveal",
    description: "Minimalist volumetric stage design for a high-end electronic hardware launch.",
    img: "/assets/portfolio_corporate.png",
    category: "Corporate Events",
    tags: ["Corporate Events", "medium"]
  },
  {
    id: "portfolio-3",
    rank: 3,
    title: "Casa di Marmo",
    description: "Luxury residential living room incorporating custom matte charcoal panels and brushed brass.",
    img: "/assets/portfolio_interior_living.png",
    category: "Residential",
    tags: ["Residential Interiors", "large"]
  },
  {
    id: "portfolio-4",
    rank: 4,
    title: "Terrazza del Lago",
    description: "A premium lakeside cocktail terrace showroom designed with high-end Italian architectural stone.",
    img: "/assets/hero_bg.png",
    category: "Commercial",
    tags: ["Commercial Interiors", "medium"]
  },
  {
    id: "portfolio-5",
    rank: 5,
    title: "Studio Pietra",
    description: "Architectural workspace showcasing raw concrete texturing, warm oak slats, and floor-to-ceiling glass.",
    img: "/assets/about_bg.png",
    category: "Luxury Interiors",
    tags: ["Luxury Interiors", "small"]
  },
  {
    id: "portfolio-6",
    rank: 6,
    title: "Aura Penthouse Suite",
    description: "High-end luxury suite detailing integrated shelf illumination and custom furniture layouts.",
    img: "/assets/portfolio_interior_living.png",
    category: "Luxury Interiors",
    tags: ["Luxury Interiors", "small"]
  }
];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getFirestorePortfolios();
        if (data && data.length > 0) {
          setPortfolioItems(data);
        } else {
          setPortfolioItems(DEFAULT_PORTFOLIOS);
        }
      } catch (error) {
        console.error("Failed to load portfolios from Firestore, using offline fallback:", error);
        setPortfolioItems(DEFAULT_PORTFOLIOS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic
  const filteredItems = portfolioItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Prepare images for Lightbox
  const lightboxImages = filteredItems.map((item) => {
    const displayCategory = item.tags && item.tags[0] ? item.tags[0] : item.category;
    return {
      src: item.img,
      title: item.title,
      category: displayCategory,
    };
  });

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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-sans font-light">Loading Portfolios...</span>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const displayCategory = item.tags && item.tags[0] ? item.tags[0] : item.category;
                const size = item.tags && item.tags[1] ? item.tags[1] : "medium";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className={`group relative overflow-hidden bg-stone-900 border border-stone-900/60 cursor-zoom-in rounded ${
                      size === "large"
                        ? "md:row-span-2 md:h-[620px]"
                        : size === "medium"
                        ? "md:h-[400px]"
                        : "md:h-[300px]"
                    } h-[320px]`}
                  >
                    {/* Portfolio Image */}
                    <img
                      src={item.img}
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
                        {displayCategory}
                      </span>
                      
                      {/* Title */}
                      <h4 className="font-serif text-xl font-light text-white uppercase mb-2 tracking-wide">
                        {item.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-[11px] text-stone-300 font-sans tracking-wide leading-relaxed mb-6 line-clamp-2 max-w-sm">
                        {item.description}
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
                          {displayCategory}
                        </span>
                        <h5 className="font-sans text-xs font-semibold text-white tracking-wide uppercase mt-1">
                          {item.title}
                        </h5>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
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
