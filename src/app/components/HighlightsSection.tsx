import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, TrendingUp, ShieldCheck, Sparkles, LineChart } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

const highlights = [
  {
    icon: MapPin,
    title: "Prime Locations",
    desc: "Properties situated in high-growth corridors with excellent proximity, seamless connectivity, and robust infrastructure development.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "High Rental Yield",
    desc: "Consistent and premium rental income opportunities driven by strong tenant demand, top-tier property maintenance, and key location value.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Developer",
    desc: "A solid legacy of structural excellence, material integrity, transparent legal compliance, and consistent delivery assurance.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Sparkles,
    title: "Premium Amenities",
    desc: "Resort-inspired lifestyles featuring fitness centers, private clubs, swimming pools, and beautifully landscaped green parks.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: LineChart,
    title: "Future Appreciation Potential",
    desc: "Secured capital growth and asset appreciation backed by rapid regional transformation and elite-level property standard retention.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
];

export function HighlightsSection() {
  const c = getThemeColors();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="highlights" className="py-28 relative overflow-hidden" style={{ background: c.sectionMid }}>
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(${c.accentRgb}, 0.05)` }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(${c.accentRgb}, 0.03)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: c.accent }} />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
              className="uppercase"
            >
              Why Invest
            </span>
            <div className="h-px w-10" style={{ background: c.accent }} />
          </div>
          <h2
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
            className="text-4xl md:text-5xl"
          >
            Key <span className="italic" style={{ color: c.accent }}>Highlights</span>
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8, color: c.textSecondary }}
            className="mt-4 max-w-xl mx-auto"
          >
            Discover the strategic advantages that make Amaan India properties an unparalleled investment choice.
          </p>
        </motion.div>

        {/* Highlights Cards (Flex Grid for centering the bottom row) */}
        <div className="flex flex-wrap justify-center gap-8">
          {highlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-sm flex flex-col hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.accent;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.borderSubtle;
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                {/* Icon Badge overlapping */}
                <div
                  className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-400 group-hover:scale-110"
                  style={{ background: c.accent, border: `1px solid ${c.borderSubtle}` }}
                >
                  <highlight.icon size={18} style={{ color: c.onAccent }} />
                </div>
              </div>

              {/* Text / Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.08rem", color: c.textPrimary }}
                    className="mb-3 uppercase tracking-wide group-hover:text-[var(--t-accent)] transition-colors duration-300"
                  >
                    {highlight.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.7, color: c.textSecondary }}
                  >
                    {highlight.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
