import { CountUp } from "@/components/ui/count-up";

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  subLabel: string;
}

const STATS_DATA: StatItem[] = [
  {
    number: 350,
    suffix: "+",
    label: "Bespoke Portfolios",
    subLabel: "Completed projects globally",
  },
  {
    number: 150,
    suffix: "+",
    label: "Milestone Events",
    subLabel: "Exquisite designs and execution",
  },
  {
    number: 200,
    suffix: "+",
    label: "Couture Spaces",
    subLabel: "Premium interior architectures",
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Loyalty",
    subLabel: "Retainer-based and refer-backs",
  },
];

export function Stats() {
  return (
    <section className="relative bg-stone-950 dark:bg-stone-950 py-20 border-y border-stone-900/60 z-10 overflow-hidden">
      {/* Subtle gold grid accents */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Statistics Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-stone-900 bg-stone-950/40 divide-y lg:divide-y-0 sm:divide-x divide-stone-900 backdrop-blur-sm rounded">
          {STATS_DATA.map((item, index) => (
            <div
              key={index}
              className="group p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:bg-[#D4AF37]/[0.015]"
            >
              {/* Stat Animated Number */}
              <div className="text-4xl md:text-5xl font-serif font-light text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                <CountUp end={item.number} suffix={item.suffix} />
              </div>

              {/* Stat Name */}
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                {item.label}
              </h4>

              {/* Sub-label details */}
              <p className="text-[11px] text-stone-400 font-sans tracking-wide">
                {item.subLabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Stats;
