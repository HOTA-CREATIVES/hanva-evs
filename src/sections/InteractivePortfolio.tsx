import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, MessageCircle } from "lucide-react";
import { db, isMock, mockDb } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface PortfolioItem {
  id: string;
  rank: number;
  title: string;
  description: string;
  img: string;
  category: string;
  tags: string[];
}

interface TestimonialItem {
  id: string;
  rank: number;
  name: string;
  description: string;
  workingtitle: string;
  tags: string[];
  portfolioId: string;
}

// Inlined fallback data from seed-db.js to ensure immediate render
const fallbackPortfolios: PortfolioItem[] = [
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

const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "testimonial-1",
    rank: 1,
    name: "Aria Moretti",
    description: "Haanav Eviors transformed our flagship penthouse suite. Their architectural detailing, wood paneling integrations, and material selection reflect absolute minimalism. Casa di Marmo is a masterpiece.",
    workingtitle: "Principal Owner, Moretti Residences",
    tags: ["rating-5", "AM"],
    portfolioId: "portfolio-3"
  },
  {
    id: "testimonial-2",
    rank: 2,
    name: "Marcus Vance",
    description: "The Apex launch set was absolutely phenomenal. The volumetric light rays and seamless wide-screen stage design delivered a cinematic, immersive experience that completely wowed our global press partners.",
    workingtitle: "Director of Global Branding, Vanguard Systems",
    tags: ["rating-5", "MV"],
    portfolioId: "portfolio-2"
  },
  {
    id: "testimonial-3",
    rank: 3,
    name: "Elena Rostova",
    description: "For our wedding sanctuary, they crafted a breathtaking white orchid dreamscape. Every technician was highly professional, and the execution was flawless down to the last custom gold-accented seating placement.",
    workingtitle: "Private Client, Villa d'Este Weddings",
    tags: ["rating-5", "ER"],
    portfolioId: "portfolio-1"
  }
];

export function InteractivePortfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(fallbackPortfolios);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (!isMock && db) {
          // Fetch from Firestore
          const portSnap = await getDocs(collection(db, "portfolios"));
          const portList: any[] = [];
          portSnap.forEach((doc) => portList.push({ id: doc.id, ...doc.data() }));

          const testSnap = await getDocs(collection(db, "testimonials"));
          const testList: any[] = [];
          testSnap.forEach((doc) => testList.push({ id: doc.id, ...doc.data() }));

          if (portList.length > 0) setPortfolios(portList.sort((a, b) => a.rank - b.rank));
          if (testList.length > 0) setTestimonials(testList.sort((a, b) => a.rank - b.rank));
        } else {
          // Fetch from LocalStorage Mock
          const portList = await mockDb.getDocs("portfolios");
          const testList = await mockDb.getDocs("testimonials");

          if (portList.length > 0) setPortfolios(portList.sort((a, b) => a.rank - b.rank));
          if (testList.length > 0) setTestimonials(testList.sort((a, b) => a.rank - b.rank));
        }
      } catch (err) {
        console.error("Error loading portfolio from database:", err);
      }
    }
    loadData();
  }, []);

  const categories = ["All", "Weddings", "Corporate Events", "Residential", "Commercial", "Luxury Interiors"];

  const filteredPortfolios = activeFilter === "All"
    ? portfolios
    : portfolios.filter((item) => item.category === activeFilter);

  // Find corresponding testimonial
  const getTestimonialForPortfolio = (portfolioId: string) => {
    return testimonials.find((t) => t.portfolioId === portfolioId);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#02150C] html-light:bg-stone-50 border-t border-[#073C23] html-light:border-stone-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-montserrat text-[#D4AF37] block mb-3">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white html-light:text-stone-900 font-light tracking-wide">
              Selected <span className="italic font-normal text-[#D4AF37]">Portfolios</span>
            </h2>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 border rounded-full text-xs font-montserrat tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[#D4AF37] border-[#D4AF37] text-[#031F12] font-bold"
                    : "bg-transparent border-[#073C23] html-light:border-stone-200 text-stone-400 html-light:text-stone-500 hover:border-[#D4AF37]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolios.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(item)}
                className="group relative h-96 bg-stone-900 rounded-sm overflow-hidden border border-[#073C23] html-light:border-stone-200 cursor-pointer shadow-xl"
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                
                {/* Hover Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02150C] via-[#02150C]/65 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#031F12]/15 group-hover:bg-[#4D5D3B]/10 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold font-montserrat">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif text-white font-medium tracking-wide mt-2">
                    {item.title}
                  </h3>
                  
                  {/* Slide details */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-16 group-hover:mt-3 transition-all duration-500 ease-in-out">
                    <p className="text-[11px] text-stone-400 leading-relaxed font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-montserrat">
                    View Project <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Elegant corner accent */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020F08]/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full max-w-4xl bg-[#031F12] html-light:bg-[#FAFAFA] border border-[#D4AF37]/40 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white html-light:hover:text-stone-900 bg-stone-900/40 border border-stone-800 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Left Side: Image (1/2) */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedProject.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031F12] md:bg-gradient-to-r md:from-transparent md:to-[#031F12]/10 via-[#031F12]/10 to-transparent" />
                </div>

                {/* Right Side: Text details (1/2) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-medium font-montserrat rounded-sm">
                        {selectedProject.category}
                      </span>
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-stone-500 uppercase tracking-wider font-montserrat">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif text-white html-light:text-stone-900 font-light tracking-wide leading-tight">
                      {selectedProject.title}
                    </h3>
                    
                    <p className="text-xs text-stone-300 html-light:text-stone-600 font-light mt-6 leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>

                    {/* Testimonial Relationship Mapping */}
                    {getTestimonialForPortfolio(selectedProject.id) && (
                      <div className="mt-8 border-t border-[#073C23] html-light:border-stone-200 pt-6">
                        <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block font-montserrat mb-3">
                          Client Experience
                        </span>
                        <blockquote className="text-xs italic text-stone-400 html-light:text-stone-500 leading-relaxed font-serif">
                          "{getTestimonialForPortfolio(selectedProject.id)?.description}"
                        </blockquote>
                        <cite className="block text-[10px] text-white html-light:text-stone-800 font-semibold tracking-wide not-italic mt-3 font-sans">
                          — {getTestimonialForPortfolio(selectedProject.id)?.name}
                          <span className="text-stone-500 font-normal font-montserrat block text-[9px] mt-0.5">
                            {getTestimonialForPortfolio(selectedProject.id)?.workingtitle}
                          </span>
                        </cite>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-[#073C23] html-light:border-stone-200 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/918179114167?text=Hello%20Haanav%20Eviors%20Concierge%2C%20I%20saw%20your%20project%20"${encodeURIComponent(selectedProject.title)}"%20and%20would%20like%20to%20inquire%20about...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#052A19] hover:bg-[#073D25] border border-[#0A502F] text-[#D4AF37] text-xs uppercase font-bold tracking-widest rounded-sm text-center transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} />
                      WhatsApp Inquiry
                    </a>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const el = document.querySelector("#moodboard-studio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#031F12] text-xs uppercase font-bold tracking-widest rounded-sm text-center transition-all duration-300"
                    >
                      Build Concept
                    </button>
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

export default InteractivePortfolio;
