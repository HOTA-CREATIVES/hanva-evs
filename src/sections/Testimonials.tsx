import { Star } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Aria Moretti",
    role: "Principal Owner",
    company: "Moretti Residences",
    quote: "Haanav Eviors transformed our flagship penthouse suite. Their architectural detailing, wood paneling integrations, and material selection reflect absolute minimalism. Casa di Marmo is a masterpiece.",
    rating: 5,
    avatar: "AM",
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Director of Global Branding",
    company: "Vanguard Systems",
    quote: "The Apex launch set was absolutely phenomenal. The volumetric light rays and seamless wide-screen stage design delivered a cinematic, immersive experience that completely wowed our global press partners.",
    rating: 5,
    avatar: "MV",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Private Client",
    company: "Villa d'Este Weddings",
    quote: "For our wedding sanctuary, they crafted a breathtaking white orchid dreamscape. Every technician was highly professional, and the execution was flawless down to the last custom gold-accented seating placement.",
    rating: 5,
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 bg-stone-950 text-white border-b border-stone-900 overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute left-[-5%] bottom-[-5%] w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Vouched Luxury
          </span>
          <h3 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase mt-3 mb-6">
            Client <span className="font-serif italic font-normal text-[#D4AF37] tracking-normal">Testimonials</span>
          </h3>
          <p className="text-stone-400 font-sans text-xs md:text-sm tracking-wide font-light leading-relaxed">
            We partner with discerning patrons and global enterprises. Read about their customized design journeys with the Haanav Eviors executive team.
          </p>
        </div>

        {/* Carousel Holder */}
        <div className="max-w-3xl mx-auto">
          <Carousel autoplay={true} autoplayInterval={7000}>
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="w-full p-8 md:p-12 bg-stone-900/10 border border-stone-900/60 backdrop-blur-md rounded flex flex-col items-center text-center shadow-lg relative"
              >
                {/* Gold Quote Accent Decor */}
                <span className="absolute top-6 left-8 font-serif text-5xl text-[#D4AF37]/10 font-bold pointer-events-none select-none">
                  “
                </span>

                {/* Stars */}
                <div className="flex gap-1 justify-center mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Quote Quote */}
                <p className="text-stone-200 dark:text-stone-200 font-serif font-light text-sm md:text-base leading-relaxed italic mb-8 max-w-2xl text-balance">
                  "{item.quote}"
                </p>

                {/* Client Metadata */}
                <div className="flex items-center gap-4 text-left">
                  {/* Text Avatar */}
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-850 flex items-center justify-center font-sans text-xs text-[#D4AF37] font-bold">
                    {item.avatar}
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-semibold text-white tracking-wide uppercase">
                      {item.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 font-sans tracking-wide">
                      {item.role}, <span className="text-[#D4AF37]/80">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
