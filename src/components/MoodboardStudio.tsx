import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Palette, Lightbulb, Check, ChevronRight } from "lucide-react";

interface StyleOption {
  id: string;
  name: string;
  desc: string;
  bgUrl: string;
  colorTheme: string;
}

interface MaterialOption {
  id: string;
  name: string;
  type: "Events" | "Interiors" | "Both";
  color: string;
}

export function MoodboardStudio() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState<"Events" | "Interiors">("Interiors");
  const [selectedStyle, setSelectedStyle] = useState<string>("minimalist");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["brushed-brass", "oak-slats"]);
  const [lighting, setLighting] = useState<string>("warm");

  const styles: StyleOption[] = [
    {
      id: "minimalist",
      name: "Minimalist Alabaster",
      desc: "Clean geometric profiles, warm ivory hues, raw textures, and understated luxury.",
      bgUrl: "/assets/about_bg.png",
      colorTheme: "border-[#4D5D3B]"
    },
    {
      id: "royal-forest",
      name: "Royal Gold & Forest",
      desc: "Deep forest greens, gold accent panels, suspended foliage, and premium styling.",
      bgUrl: "/assets/portfolio_wedding.png",
      colorTheme: "border-[#D4AF37]"
    },
    {
      id: "volumetric-dark",
      name: "Volumetric Charcoal",
      desc: "Industrial raw concrete, matte black metal slabs, and amber accent strip lights.",
      bgUrl: "/assets/portfolio_corporate.png",
      colorTheme: "border-stone-500"
    }
  ];

  const materials: MaterialOption[] = [
    { id: "oak-slats", name: "Warm Oak Slats", type: "Interiors", color: "bg-[#B8860B]" },
    { id: "white-orchids", name: "Suspended Orchids", type: "Events", color: "bg-[#FAFAFA] border border-stone-300" },
    { id: "brushed-brass", name: "Brushed Brass Trims", type: "Both", color: "bg-[#D4AF37]" },
    { id: "raw-concrete", name: "Raw Concrete Texturing", type: "Interiors", color: "bg-[#808080]" },
    { id: "italian-stone", name: "High-End Italian Stone", type: "Interiors", color: "bg-[#E0DCCF]" },
    { id: "velvet-drapes", name: "Velvet Emerald Draping", type: "Events", color: "bg-[#093A24]" },
    { id: "warm-lights", name: "Scenographic Spotlights", type: "Both", color: "bg-[#FFD700] shadow-[0_0_10px_#FFD700]" }
  ];

  const handleMaterialToggle = (id: string) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== id));
    } else {
      if (selectedMaterials.length < 3) {
        setSelectedMaterials([...selectedMaterials, id]);
      }
    }
  };

  const getLightingOverlay = () => {
    switch (lighting) {
      case "warm":
        return "bg-[#D4AF37]/15 mix-blend-color-burn";
      case "cool":
        return "bg-cyan-500/10 mix-blend-overlay";
      case "amber":
        return "bg-orange-500/20 mix-blend-screen";
      default:
        return "bg-transparent";
    }
  };

  const currentStyleObj = styles.find((s) => s.id === selectedStyle) || styles[0];

  const handleProceedToInquiry = () => {
    const summary = {
      serviceType,
      style: currentStyleObj.name,
      materials: materials
        .filter((m) => selectedMaterials.includes(m.id))
        .map((m) => m.name)
        .join(", "),
      lighting: lighting.toUpperCase()
    };
    sessionStorage.setItem("haanav_moodboard", JSON.stringify(summary));
    navigate("/contact");
  };

  return (
    <section id="moodboard-studio" className="py-20 bg-[#031F12] html-light:bg-[#FAFAFA] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-montserrat text-[#D4AF37] block mb-3">
            Interactive Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white html-light:text-stone-900 font-light tracking-wide">
            Concept <span className="italic font-normal text-[#D4AF37]">Moodboard Studio</span>
          </h2>
          <p className="text-xs text-stone-400 html-light:text-stone-500 font-light max-w-md mx-auto mt-4 leading-relaxed font-sans">
            Customize and visualize your luxury interior or event concept in real time, then send it directly to our design concierge.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Options (Columns: 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#02150C] html-light:bg-stone-50 border border-[#073C23] html-light:border-stone-200 p-6 md:p-8 rounded-sm shadow-xl">
            
            {/* Step 1: Service Type */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-montserrat block mb-3">
                1. Select Domain
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setServiceType("Interiors")}
                  className={`py-3 text-xs tracking-wider uppercase font-medium border rounded-sm transition-all duration-300 ${
                    serviceType === "Interiors"
                      ? "bg-[#D4AF37] text-[#031F12] border-[#D4AF37] font-bold"
                      : "bg-transparent text-stone-300 html-light:text-stone-600 border-stone-800 html-light:border-stone-300 hover:border-[#D4AF37]/50"
                  }`}
                >
                  Luxury Interiors
                </button>
                <button
                  onClick={() => setServiceType("Events")}
                  className={`py-3 text-xs tracking-wider uppercase font-medium border rounded-sm transition-all duration-300 ${
                    serviceType === "Events"
                      ? "bg-[#D4AF37] text-[#031F12] border-[#D4AF37] font-bold"
                      : "bg-transparent text-stone-300 html-light:text-stone-600 border-stone-800 html-light:border-stone-300 hover:border-[#D4AF37]/50"
                  }`}
                >
                  Bespoke Events
                </button>
              </div>
            </div>

            {/* Step 2: Choose Style */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-montserrat block mb-3">
                2. Design Concept Theme
              </label>
              <div className="flex flex-col gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`flex items-start gap-3 p-3.5 text-left border rounded-sm transition-all duration-300 ${
                      selectedStyle === style.id
                        ? "bg-[#052A19] html-light:bg-[#F2ECE4] border-[#D4AF37]"
                        : "bg-transparent border-stone-800 html-light:border-stone-200 hover:border-stone-700"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedStyle === style.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-stone-600'} shrink-0 mt-0.5 flex items-center justify-center`}>
                      {selectedStyle === style.id && <Check size={10} className="text-[#031F12]" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white html-light:text-stone-900 tracking-wide">
                        {style.name}
                      </h4>
                      <p className="text-[10px] text-stone-400 html-light:text-stone-500 mt-1 leading-normal font-light">
                        {style.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Material Textures */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-montserrat">
                  3. Textures & Accents (Pick Max 3)
                </label>
                <span className="text-[9px] text-stone-400 font-sans">
                  {selectedMaterials.length}/3 Selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {materials
                  .filter((m) => m.type === serviceType || m.type === "Both")
                  .map((material) => {
                    const isSelected = selectedMaterials.includes(material.id);
                    return (
                      <button
                        key={material.id}
                        onClick={() => handleMaterialToggle(material.id)}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-sm text-[11px] font-sans tracking-wide transition-all duration-300 ${
                          isSelected
                            ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white html-light:text-stone-900"
                            : "bg-transparent border-stone-800 html-light:border-stone-200 text-stone-400 html-light:text-stone-500 hover:border-stone-700"
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${material.color}`} />
                        {material.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Step 4: Lighting Tone */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-montserrat block mb-3">
                4. Scenographic Lighting Highlight
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "warm", name: "Warm Gold" },
                  { id: "cool", name: "Cool Ambient" },
                  { id: "amber", name: "Sunset Amber" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLighting(item.id)}
                    className={`py-2 text-[10px] uppercase tracking-wider font-montserrat border rounded-sm transition-all duration-300 ${
                      lighting === item.id
                        ? "bg-[#0A502F] html-light:bg-[#E5DFD3] border-[#D4AF37] text-white html-light:text-stone-900 font-bold"
                        : "bg-transparent border-stone-800 html-light:border-stone-200 text-stone-400 html-light:text-stone-500 hover:border-stone-700"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleProceedToInquiry}
              className="w-full mt-4 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#031F12] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-md shadow-[#D4AF37]/15"
            >
              Inquire with this Moodboard
              <ChevronRight size={14} />
            </button>

          </div>

          {/* Right Panel: Interactive digital canvas (Columns: 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950/40 html-light:bg-[#1C1C1C] border border-[#073C23] html-light:border-stone-800 p-6 md:p-8 rounded-sm relative min-h-[500px] overflow-hidden">
            
            {/* Design canvas container */}
            <div className="absolute inset-0 z-0 bg-[#080808]">
              {/* Main moodboard aesthetic bg */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStyle}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentStyleObj.bgUrl}')` }}
                />
              </AnimatePresence>
              
              {/* Lighting overlay tint */}
              <div className={`absolute inset-0 transition-colors duration-700 ${getLightingOverlay()}`} />
              
              {/* Elegant framing borders */}
              <div className="absolute inset-4 border border-[#D4AF37]/25 pointer-events-none" />
              <div className="absolute inset-6 border border-[#D4AF37]/10 pointer-events-none" />
            </div>

            {/* Canvas Header */}
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  HAANAV DESIGN LAB
                </span>
                <h3 className="text-xl font-serif text-white font-light tracking-wide mt-1">
                  Virtual Concept Layout
                </h3>
              </div>
              <div className="px-2.5 py-1 bg-stone-900/90 border border-[#D4AF37]/45 rounded-sm text-[8px] tracking-widest text-[#D4AF37] uppercase font-montserrat">
                Live Rendering
              </div>
            </div>

            {/* Collage Blocks (Framer Motion Grid) */}
            <div className="relative z-10 grid grid-cols-6 gap-4 my-8 max-w-xl mx-auto w-full">
              
              {/* Main Title Collage Card */}
              <div className="col-span-6 sm:col-span-4 bg-stone-900/90 border border-stone-800/80 p-4 rounded-sm shadow-xl">
                <span className="text-[8px] uppercase tracking-widest text-stone-500 font-montserrat block mb-1">
                  CONCEPT DESIGN PILLAR
                </span>
                <div className="font-serif text-base text-white font-medium flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {serviceType === "Interiors" ? "Luxury Interior Architecture" : "Bespoke Event Production"}
                </div>
                <div className="text-[10px] text-stone-400 mt-2 font-sans font-light leading-normal">
                  Custom-tailored spacing, custom furniture layouts, and scenographic material designs.
                </div>
              </div>

              {/* Style Card */}
              <div className="col-span-3 sm:col-span-2 bg-[#02150C]/90 border border-[#D4AF37]/40 p-4 rounded-sm flex flex-col justify-between shadow-xl">
                <span className="text-[8px] uppercase tracking-widest text-stone-500 block mb-1">
                  THEME
                </span>
                <div className="font-serif text-sm text-[#D4AF37] font-semibold uppercase leading-tight mt-1">
                  {currentStyleObj.name.split(" ")[0]} <br />
                  <span className="text-white text-xs lowercase font-light font-sans tracking-normal italic block">
                    {currentStyleObj.name.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>

              {/* Textures Swatch Card */}
              <div className="col-span-3 sm:col-span-3 bg-stone-900/95 border border-stone-850 p-4 rounded-sm shadow-xl flex flex-col gap-3">
                <span className="text-[8px] uppercase tracking-widest text-stone-500 block">
                  TEXTURE PALETTE
                </span>
                <div className="flex flex-col gap-2 mt-1">
                  {selectedMaterials.length === 0 ? (
                    <div className="text-[10px] text-stone-500 italic">No materials selected</div>
                  ) : (
                    materials
                      .filter((m) => selectedMaterials.includes(m.id))
                      .map((m) => (
                        <div key={m.id} className="flex items-center gap-2 text-[10px] text-stone-300 font-light">
                          <span className={`w-2 h-2 rounded-full ${m.color} shrink-0`} />
                          {m.name}
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Scenographic Tint/Glow Card */}
              <div className="col-span-6 sm:col-span-3 bg-[#031C10]/95 border border-[#073C23] p-4 rounded-sm flex items-center justify-between shadow-xl">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] uppercase tracking-widest text-stone-500 block">
                    LIGHT TONE
                  </span>
                  <div className="font-serif text-xs text-white uppercase font-bold tracking-widest mt-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3 text-[#D4AF37]" />
                    {lighting} Tone
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full bg-[#D4AF37] ${lighting === "warm" ? 'ring-2 ring-white scale-110' : 'opacity-40'}`} />
                  <span className={`w-3.5 h-3.5 rounded-full bg-cyan-400 ${lighting === "cool" ? 'ring-2 ring-white scale-110' : 'opacity-40'}`} />
                  <span className={`w-3.5 h-3.5 rounded-full bg-orange-400 ${lighting === "amber" ? 'ring-2 ring-white scale-110' : 'opacity-40'}`} />
                </div>
              </div>

            </div>

            {/* Concept Info Footer */}
            <div className="relative z-10 pt-4 border-t border-stone-900/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-stone-500">
                  Haanav Concierge Setup
                </p>
                <p className="text-[11px] text-white/80 font-light mt-0.5">
                  Selected Theme: <strong className="text-[#D4AF37] font-semibold">{currentStyleObj.name}</strong>
                </p>
              </div>
              <div className="text-[8px] text-stone-400 italic">
                *Exporting parameters directly to your digital inquiry form.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default MoodboardStudio;
