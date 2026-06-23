import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClosingCTA() {
  const navigate = useNavigate();
  const handleScrollToConsultation = () => {
    navigate("/contact");
  };

  return (
    <section 
      id="contact" 
      className="relative pt-24 pb-12 bg-[#0B2B1A] text-[#F8F1E5] overflow-hidden border-t border-[#09472A]/40"
    >
      
      {/* Dynamic Gold Arc Accent Line at the top seam */}
      <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none select-none z-10">
        <svg 
          width="400" 
          height="80" 
          viewBox="0 0 400 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          <path 
            d="M0 0C100 60 300 60 400 0" 
            stroke="#D4A256" 
            strokeWidth="1.5" 
          />
        </svg>
      </div>

      {/* Background visual details */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4A256]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center items-center h-full">
        
        {/* Main CTA Block */}
        <div className="text-center max-w-2xl mx-auto py-12 flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4A256] font-semibold font-montserrat flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Private Commission</span>
          </span>
          
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight mb-6">
            Coordinate Your <br />
            <span className="italic font-normal text-[#D4A256]">Landmark Vision</span>
          </h3>
          
          <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mb-10 max-w-md">
            Our spatial designers and event producers are ready to coordinate your landmark celebration or luxury residential project. Let us curate your atmosphere.
          </p>
          
          <Button
            variant="gold"
            size="lg"
            className="font-montserrat tracking-[0.2em] uppercase font-bold px-10 py-5 text-xs hover:shadow-[0_0_30px_rgba(212,162,86,0.5)]"
            onClick={handleScrollToConsultation}
          >
            Reserve Private Consultation
          </Button>
        </div>

      </div>
    </section>
  );
}

export default ClosingCTA;
