import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number; // in seconds
  suffix?: string;
}

function CountUp({ end, duration = 1.5, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const endVal = end;
    const totalTicks = 50;
    const intervalTime = (duration * 1000) / totalTicks;
    const increment = endVal / totalTicks;
    let currentTick = 0;

    const timer = setInterval(() => {
      currentTick++;
      start += increment;
      if (currentTick >= totalTicks) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  subLabel: string;
}

const STATS_DATA: StatItem[] = [
  {
    number: 10,
    suffix: "+",
    label: "Years of Excellence",
    subLabel: "Premium design & coordination",
  },
  {
    number: 500,
    suffix: "+",
    label: "Projects Completed",
    subLabel: "Bespoke events & luxury interiors",
  },
  {
    number: 350,
    suffix: "+",
    label: "Happy Clients",
    subLabel: "Exquisite client satisfaction",
  },
  {
    number: 15,
    suffix: "+",
    label: "Cities Served",
    subLabel: "Landmarks crafted across regions",
  },
];

export function Stats() {
  return (
    <section className="relative bg-[#02140A] py-20 border-y border-[#09472A]/30 z-10 overflow-hidden">
      {/* Subtle gold grid/light leaks */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute left-10 top-10 w-60 h-60 bg-[#1F6B41]/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Statistics Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-8 bg-[#011c0c]/45 border border-[#D4AF37]/15 backdrop-blur-md hover:border-[#D4AF37]/40 transition-all duration-500 rounded-xl flex flex-col items-center text-center shadow-xl relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent group-hover:via-[#D4AF37] transition-all duration-500" />
              
              {/* Stat Animated Number */}
              <div className="text-4xl md:text-5xl font-serif font-light text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                <CountUp end={item.number} suffix={item.suffix} />
              </div>

              {/* Stat Name */}
              <h4 className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-2">
                {item.label}
              </h4>

              {/* Sub-label details */}
              <p className="text-[11px] text-stone-400 font-sans tracking-wide leading-relaxed">
                {item.subLabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
