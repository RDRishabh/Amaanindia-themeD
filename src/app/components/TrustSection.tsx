import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Users, TrendingUp } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
const c = getThemeColors();

const pillars = [
  {
    icon: Award,
    title: "Architectural Precision",
    desc: "Every project is shaped through close collaboration with renowned architects, ensuring each space is refined in design and resolved in detail.",
  },
  {
    icon: TrendingUp,
    title: "Functionally Efficient",
    desc: "Spaces are designed to serve people well — planned for how they are actually used, not simply how they appear.",
  },
  {
    icon: Users,
    title: "So Every Property Endures The Test Of Time",
    desc: "We build with material integrity and long-term relevance in mind, so every environment endures beyond its first impression.",
  },
];

function useAnimateInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export function TrustSection() {
  const { ref, isInView } = useAnimateInView();

  return (
    <section id="approach" className="py-28 overflow-hidden" style={{ background: c.sectionLight }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.08fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: Brand text ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Overline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: c.accent }} />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
                className="uppercase"
              >
                Our Approach
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.12, color: c.textPrimary }}
              className="text-4xl md:text-5xl mb-8"
            >
              A Development Firm
              <span className="block italic" style={{ color: c.accent }}>Built on Purpose</span>
            </h2>

            {/* Thin rule */}
            <div className="mb-8" style={{ height: 1, background: `linear-gradient(to right, ${c.accent}, transparent)` }} />

            {/* Body copy */}
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.85, color: c.textSecondary }}
              className="mb-10"
            >
              At Amaan, development begins with intent. Every project is shaped through close collaboration with renowned architects and experienced construction contractors, ensuring each space is both refined in design and robust in execution.
            </p>

            {/* CTA */}
            <button
              onClick={() => { const el = document.querySelector("#projects"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.15em",
                background: c.accent,
                color: c.onAccent,
                padding: "16px 32px",
                textTransform: "uppercase" as const,
                transition: "all 0.4s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = c.accentHover; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = c.accent; }}
            >
              View Our Projects
            </button>
          </motion.div>

          {/* ── Right: Pillars as editorial vertical stack ── */}
          <div className="flex flex-col lg:pt-12">
            {/* Top rule */}
            <div className="h-px mb-3" style={{ background: c.borderSubtle }} />

            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.18 + 0.15 }}
                className="relative group"
              >
                {/* Accent top bar — slides in on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(to right, ${c.accent}, transparent)` }}
                />

                <div
                  className="flex gap-7 py-10 transition-all duration-400 group-hover:pl-3"
                  style={{ borderBottom: `1px solid ${c.borderSubtle}` }}
                >
                  {/* Left: number + icon column */}
                  <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-1">
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.18em",
                        color: c.accent,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div className="w-px flex-1" style={{ background: c.borderSubtle, minHeight: 32 }} />
                    <div
                      className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors duration-400 group-hover:bg-[var(--t-accent)]"
                      style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
                    >
                      <p.icon
                        size={18}
                        className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
                        style={{ color: c.accent }}
                      />
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1 pt-1">
                    {/* Ghost number */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        fontSize: "5.5rem",
                        lineHeight: 1,
                        color: `rgba(${c.accentRgb},0.045)`,
                        position: "absolute",
                        top: 12,
                        right: 0,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      0{i + 1}
                    </span>

                    <h3
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.25, color: c.textPrimary }}
                      className="mb-3"
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8, color: c.textSecondary }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
