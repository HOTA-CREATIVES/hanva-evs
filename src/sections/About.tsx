import { motion } from "framer-motion";

interface PhilosophyItem {
  number: string;
  title: string;
  desc: string;
}

const PHILOSOPHIES: PhilosophyItem[] = [
  {
    number: "01",
    title: "Design-First Mandate",
    desc: "Every detail begins with bespoke sketching and architectural zonation. We do not use templates; we build spaces and events that speak unique personal histories.",
  },
  {
    number: "02",
    title: "Uncompromising Integrity",
    desc: "From Italian-sourced marble structures to state-of-the-art volumetric lighting arrays, our sourcing and technical planning adhere to absolute standards of premium quality.",
  },
  {
    number: "03",
    title: "Absolute Personalization",
    desc: "We serve an exclusive clientele. By limiting our intake of projects annually, our executive director and principal designers provide high-end, dedicated focus to every lead.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-stone-950 text-white overflow-hidden border-b border-stone-900"
    >
      {/* Background visual detail */}
      <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Premium Brand Storytelling */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
              Our Legacy
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mb-8 leading-tight">
              Shaping Bespoke Realities <br />
              With <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Architectural</span> Vision
            </h3>
            
            <p className="text-stone-300 dark:text-stone-300 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed mb-8 max-w-2xl text-justify">
              Founded on the pillars of luxury, elegant minimalism, and cinematic execution, <strong>Hanwa EVS</strong> is a unified creative agency. We bridge the temporary art of high-end Event Production with the permanent structure of modern Interior Architecture. 
            </p>
            
            <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed mb-12 max-w-2xl text-justify">
              Our designs are heavily influenced by the rich minimalism of contemporary Italian design. Whether engineering the scenery for a media launch or drafting the marble zoning of a private villa penthouse, we maintain a singular, uncompromising signature: understated opulence.
            </p>

            {/* Brand Philosophy Blocks */}
            <div className="flex flex-col gap-6 w-full max-w-2xl">
              {PHILOSOPHIES.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="flex gap-6 p-5 border border-stone-900 bg-stone-950/20 rounded hover:border-[#D4AF37]/20 transition-all duration-300"
                >
                  <span className="font-serif text-lg md:text-xl text-[#D4AF37]/80 font-normal">
                    {item.number}
                  </span>
                  <div>
                    <h5 className="font-sans text-xs font-semibold uppercase tracking-wider text-white mb-2">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-stone-400 font-sans leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: High-End Architectural Framed Image */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            {/* Elegant double gold offsets */}
            <div className="absolute -inset-1 border border-stone-800 pointer-events-none rounded" />
            <div className="absolute inset-2 border border-[#D4AF37]/20 pointer-events-none rounded" />
            <div className="absolute top-1/2 left-[-15px] -translate-y-1/2 w-4 h-16 bg-[#D4AF37]/30 pointer-events-none hidden lg:block" />

            <div className="relative w-full aspect-[4/5] max-w-md overflow-hidden rounded border border-stone-900 shadow-2xl">
              <img
                src="/assets/about_bg.png"
                alt="Luxury Italian Minimalist Architectural Studio"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] hover:scale-102 transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default About;
