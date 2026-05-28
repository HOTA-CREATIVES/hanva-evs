import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  title: string;
  category: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    // Prevent body scrolling when open
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onIndexChange((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 z-10 select-none">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              {currentImage.category}
            </span>
            <h4 className="text-white text-sm font-sans font-medium tracking-wide">
              {currentImage.title}
            </h4>
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-xs">
            <span>
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-[#D4AF37] hover:scale-110 transition-all rounded-full bg-stone-900/50 border border-stone-800/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 text-white hover:text-[#D4AF37] bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800/60 rounded-full hover:scale-105 transition-all select-none cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 text-white hover:text-[#D4AF37] bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800/60 rounded-full hover:scale-105 transition-all select-none cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Active Image Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center p-2 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-[75vh] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-stone-900 select-none rounded"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
