import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

const filters = ["All", "Residential", "Commercial", "Institutional"];

export function ProjectsSection() {
  const c = getThemeColors();

  const projects = [
    {
      name: "Amaan Celestia",
      location: "Dwarka Expressway, Gurugram",
      type: "Residential",
      price: "₹1.2Cr – ₹3.5Cr",
      tag: "Ready to Move",
      tagColor: "#22c55e",
      image: "https://images.unsplash.com/photo-1762337009787-bad651efb880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjByZWFsJTIwZXN0YXRlJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBuaWdodHxlbnwxfHx8fDE3NzQ1NTczMTV8MA&ixlib=rb-4.1.0&q=80&w=800",
      beds: "2, 3 BHK",
      area: "1,200 – 2,800 sqft",
    },
    {
      name: "Amaan Riviera",
      location: "Sector 150, Noida",
      type: "Residential",
      price: "₹3.5Cr – ₹7.2Cr",
      tag: "New Launch",
      tagColor: c.accent,
      image: "https://images.unsplash.com/photo-1757439402115-c3c496fe81ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwcG9vbHxlbnwxfHx8fDE3NzQ0NjEwMTJ8MA&ixlib=rb-4.1.0&q=80&w=800",
      beds: "4, 5 BHK + Penthouse",
      area: "3,500 – 8,000 sqft",
    },
    {
      name: "Amaan Sky View",
      location: "Golf Course Rd, Gurugram",
      type: "Residential",
      price: "₹5Cr – ₹12Cr",
      tag: "Under Construction",
      tagColor: "#3b82f6",
      image: "https://images.unsplash.com/photo-1759763494381-540baf5b656b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjByb29mdG9wJTIwY2l0eSUyMHZpZXd8ZW58MXx8fHwxNzc0NTU3MzE4fDA&ixlib=rb-4.1.0&q=80&w=800",
      beds: "3, 4 BHK + Sky Villas",
      area: "2,500 – 6,500 sqft",
    },
    {
      name: "Amaan Business Park",
      location: "Sector 62, Noida",
      type: "Commercial",
      price: "₹80L – ₹2.5Cr",
      tag: "Ready to Move",
      tagColor: "#22c55e",
      image: "https://images.unsplash.com/photo-1769697694222-016642c08125?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGNvbW1lcmNpYWwlMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc3NDU1NzMxOXww&ixlib=rb-4.1.0&q=80&w=800",
      beds: "Office Spaces",
      area: "500 – 5,000 sqft",
    },
    {
      name: "Amaan Green Homes",
      location: "Sohna Road, Gurugram",
      type: "Residential",
      price: "₹60L – ₹1.5Cr",
      tag: "New Launch",
      tagColor: c.accent,
      image: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYXBhcnRtZW50JTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NDU1NzMxNnww&ixlib=rb-4.1.0&q=80&w=800",
      beds: "1, 2, 3 BHK",
      area: "650 – 1,850 sqft",
    },
    {
      name: "Amaan Signature",
      location: "Chattarpur, New Delhi",
      type: "Institutional",
      price: "₹8Cr – ₹20Cr",
      tag: "Exclusive",
      tagColor: "#a855f7",
      image: "https://images.unsplash.com/photo-1764222233275-87dc016c11dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwcHJlbWl1bSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NDU1NzMzMXww&ixlib=rb-4.1.0&q=80&w=800",
      beds: "Independent Villas",
      area: "5,000 – 15,000 sqft",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="py-28" style={{ background: c.sectionWhite }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: c.accent }} />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
                className="uppercase"
              >
                Our Portfolio
              </span>
            </div>
            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
              className="text-4xl md:text-5xl"
            >
              Featured <span className="italic" style={{ color: c.accent }}>Projects</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  padding: "8px 20px",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  background: activeFilter === f ? c.accent : "transparent",
                  color: activeFilter === f ? c.onAccent : c.textSecondary,
                  border: `1px solid ${activeFilter === f ? c.accent : c.borderMedium}`,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = c.accent;
                    el.style.color = c.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = c.borderMedium;
                    el.style.color = c.textSecondary;
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500"
              style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />

                {/* Tag */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-white text-xs"
                  style={{ backgroundColor: proj.tagColor, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.08em" }}
                >
                  {proj.tag}
                </div>

                {/* Type */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/20">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.62rem", letterSpacing: "0.1em" }} className="text-white uppercase">
                    {proj.type}
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <button
                    className="flex items-center gap-2 px-6 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-400"
                    style={{ background: c.accent, color: c.onAccent }}
                  >
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em" }}>View Details</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.2rem", lineHeight: 1.2, color: c.textPrimary }}
                  className="mb-2"
                >
                  {proj.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={12} style={{ color: c.accent }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.8rem", color: c.textSecondary }}>
                    {proj.location}
                  </span>
                </div>
                <div
                  className="flex justify-between items-end pt-4"
                  style={{ borderTop: `1px solid ${c.borderSubtle}` }}
                >
                  <div>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.08em", color: c.textMuted }} className="uppercase block">Price Range</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1rem", color: c.accent }}>{proj.price}</span>
                  </div>
                  <div className="text-right">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.08em", color: c.textMuted }} className="uppercase block">{proj.beds}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.82rem", color: c.textSecondary }}>{proj.area}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              border: `2px solid ${c.textPrimary}`,
              color: c.textPrimary,
              background: "transparent",
              padding: "16px 40px",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              transition: "all 0.4s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = c.textPrimary;
              el.style.color = c.sectionWhite;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = c.textPrimary;
            }}
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
