import { motion } from "framer-motion";
import { MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  const handleScrollToContact = (actionType: "consultation" | "contact") => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Auto-set focus or dropdown service
      const selectElement = document.getElementById("service-select") as HTMLSelectElement;
      const messageElement = document.getElementById("message-input") as HTMLTextAreaElement;
      
      if (selectElement) {
        if (actionType === "consultation") {
          selectElement.value = "Space Planning"; // default luxury design step
        }
      }
      if (messageElement && actionType === "consultation") {
        messageElement.value = "I would like to schedule a private design consultation...";
        messageElement.focus();
      }
    }
  };

  return (
    <section className="relative py-28 bg-stone-950 text-white overflow-hidden border-b border-stone-900">
      {/* Cinematic dark textured background */}
      <div className="absolute inset-0 bg-stone-950/90 z-0">
        {/* Repeating fine pattern or soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/10 to-stone-950" />
        <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Accent branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6"
        >
          <Calendar className="w-4 h-4" />
        </motion.div>

        {/* Large Serif Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl font-serif font-light tracking-wide uppercase leading-tight max-w-3xl mb-8"
        >
          Ready to Transform <br />
          Your Vision Into <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Bespoke</span> Reality?
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-stone-300 dark:text-stone-300 font-sans text-xs md:text-sm tracking-wide font-light max-w-xl leading-relaxed mb-12 text-balance"
        >
          Whether orchestrating a high-profile corporate product launch, setting a fairytale wedding stage, or curating your luxury residence interiors — we compose perfection.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => handleScrollToContact("consultation")}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            Book Consultation
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-stone-700 text-white hover:border-[#D4AF37]"
            onClick={() => handleScrollToContact("contact")}
            icon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            Contact Hanwa EVS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
export default Cta;
