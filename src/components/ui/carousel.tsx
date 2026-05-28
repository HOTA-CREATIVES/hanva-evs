import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function Carousel({
  children,
  autoplay = true,
  autoplayInterval = 6000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const length = children.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, isHovered, length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 50) {
      // Swiped Left -> Next
      nextSlide();
    }
    if (touchStart.current - touchEnd.current < -50) {
      // Swiped Right -> Prev
      prevSlide();
    }
  };

  if (length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Testimonial Active Slide Viewer */}
      <div className="min-h-[320px] md:min-h-[250px] flex items-center justify-center px-4 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {children[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between px-2 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-2 border border-stone-800 hover:border-stone-500 rounded-full bg-stone-950/40 hover:bg-stone-950/90 text-white cursor-pointer pointer-events-auto transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 border border-stone-800 hover:border-stone-500 rounded-full bg-stone-950/40 hover:bg-stone-950/90 text-white cursor-pointer pointer-events-auto transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "w-6 bg-[#D4AF37]"
                : "bg-stone-700/60 dark:bg-stone-700/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
