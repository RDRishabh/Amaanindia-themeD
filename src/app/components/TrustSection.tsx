import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Building, Compass, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
const c = getThemeColors();

const pillars = [
  {
    icon: Award,
    title: "Architectural Precision",
    desc: "Design shaped through thoughtful planning, expert detailing and collaboration with renowned architects. Every proportion, line and material choice is intentional.",
  },
  {
    icon: Building,
    title: "Construction Precision",
    desc: "We work with the finest construction partners, contractors and engineering teams. Our execution is defined by structural discipline, material integrity and rigorous on‑site quality control.",
  },
  {
    icon: Compass,
    title: "Purpose‑Led Functionality",
    desc: "Spaces crafted for how people truly live, work and interact — not just how they appear. Layouts are optimized for light, movement, efficiency and comfort.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Age Gracefully",
    desc: "Developments engineered for longevity and long‑term performance. We build for generations, ensuring every property stands the test of time.",
  },
  {
    icon: Heart,
    title: "Material Honesty",
    desc: "Authentic, durable materials selected for their integrity and the way they age over time.",
  },
  {
    icon: Sparkles,
    title: "Future‑Ready Thinking",
    desc: "Sustainability, technology and adaptability integrated into every project to ensure relevance for decades",
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
    <section id="approach" className="py-28" style={{ background: c.sectionLight }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.08fr] gap-14 lg:gap-20">

          {/* ── Left: Brand text ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl lg:sticky lg:top-[100px] lg:self-start h-fit lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto pr-3"
          >
            {/* Overline */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: c.accent }} />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: "0.25em", color: c.accent }}
                className="uppercase"
              >
                Our Approach
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.2, color: c.textPrimary }}
              className="text-2xl md:text-3xl mb-3"
            >
              Purposeful. Precise.
              <span className="block italic" style={{ color: c.accent }}>Future‑ready.</span>
            </h2>

            {/* Thin rule */}
            <div className="mb-4" style={{ height: 1, background: `linear-gradient(to right, ${c.accent}, transparent)` }} />

            {/* Body copy */}
            <div className="space-y-2.5 mb-5">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.6, color: c.textSecondary }}>
                At Amaan India, development begins with clarity of intent.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.6, color: c.textSecondary }}>
                Every project — residential, commercial or mixed‑use — is shaped through thoughtful design, disciplined execution and a commitment to long‑term value.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.6, color: c.textSecondary }}>
                We partner with leading architects, engineers and construction specialists to craft environments that are refined in character, functional in purpose and built to endure with quiet confidence.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.6, color: c.textSecondary }}>
                Our approach ensures every development feels intentional, modern and enduring — today and for decades to come.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => { const el = document.querySelector("#projects"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                background: c.accent,
                color: c.onAccent,
                padding: "10px 20px",
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
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", color: c.accent }}
              className="uppercase mb-5"
            >
              Our Core Principles
            </h4>
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
