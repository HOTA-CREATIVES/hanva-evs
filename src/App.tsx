import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/ui/Navbar";
import Footer from "./sections/Footer";
import SplitHero from "./sections/SplitHero";
import MoodboardStudio from "./components/MoodboardStudio";
import InteractivePortfolio from "./sections/InteractivePortfolio";
import ContactPage from "./pages/ContactPage";
import AdminInquiriesPage from "./pages/AdminInquiriesPage";
import PageTransition from "./components/ui/PageTransition";
import { Compass } from "lucide-react";

// Home Page Layout combining Hero, Moodboard, and Portfolio
function Home() {
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <SplitHero />
      
      {/* Concept Moodboard Builder */}
      <MoodboardStudio />

      {/* About Section */}
      <section id="about" className="py-24 bg-[#031F12] html-light:bg-[#FAFAFA] border-t border-[#073C23] html-light:border-stone-200 text-stone-300 html-light:text-stone-700 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(77,93,59,0.06),rgba(0,0,0,0))] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-stone-900/60 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] animate-spin-slow">
              <Compass size={24} />
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-montserrat text-[#D4AF37] block mb-3">
            Boutique Philosophy
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white html-light:text-stone-900 font-light tracking-wide leading-relaxed">
            "We Design experiences . <span className="italic font-normal text-[#D4AF37]">You live them.</span>"
          </h2>
          <p className="text-xs md:text-sm text-stone-400 html-light:text-stone-500 font-light leading-relaxed max-w-2xl mx-auto mt-8 font-sans">
            Haanav Eviors merges grand scenography with detailed structural layouts. Based in Bhimavaram, Andhra Pradesh, we specialize in high-end weddings, immersive corporate releases, and premium residential interior architecture.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <InteractivePortfolio />

      {/* Inquiry Form Section */}
      <ContactPage />
    </PageTransition>
  );
}

// Route animator wrapper to handle route changes
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminInquiriesPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative bg-[#031F12] html-light:bg-[#FAFAFA] transition-colors duration-300">
        {/* Universal Navigation bar */}
        <Navbar />
        
        {/* Render animated routes */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        
        {/* Universal Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
