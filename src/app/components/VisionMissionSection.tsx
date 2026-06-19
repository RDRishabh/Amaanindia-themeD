import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Eye, Target } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

const c = getThemeColors();

const identityBlocks = [
  {
    title: "Peace",
    desc: "Calm, balanced environments that elevate everyday life.",
  },
  {
    title: "Assurance",
    desc: "Trusted quality, meticulous planning, and dependable execution.",
  },
  {
    title: "Quiet Confidence",
    desc: "Timeless design that speaks through substance, not excess.",
  },
];

const directionBlocks = [
  {
    id: "01",
    title: "Vision",
    text: "To redefine modern living with elegance, innovation and purpose.",
    support: "Design-led thinking for spaces that remain relevant, graceful and future-ready.",
    icon: Eye,
  },
  {
    id: "02",
    title: "Mission",
    text: "To build with integrity, design with intent and deliver with excellence.",
    support: "Execution anchored in quality, collaboration and long-term value creation.",
    icon: Target,
  },
];

export function VisionMissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: c.sectionDark }}>
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `rgba(${c.accentRgb},0.08)` }} />
      <div className="absolute -bottom-20 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: `rgba(${c.accentRgb},0.06)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* Left: About text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: c.accent }} />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: c.accent,
                }}
                className="uppercase"
              >
                Who We Are
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
              className="text-4xl md:text-5xl mb-7"
            >
              About <span className="italic" style={{ color: c.accent }}>Amaan India</span>
            </h2>

            <div className="mb-7" style={{ height: 1, background: `linear-gradient(to right, rgba(${c.accentRgb},0.8), transparent)` }} />

            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.85, color: c.textSecondary }}
              className="mb-5"
            >
              Amaan stands for peace, assurance, and quiet confidence. It reflects thoughtfully crafted spaces designed with precision, purpose, and enduring quality—places that feel calm, secure, and timeless.
            </p>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.85, color: c.textSecondary }}
              className="mb-8"
            >
              At Amaan, luxury is understated. It is found in thoughtful design, refined execution, and developments created to deliver lasting value and meaningful experiences.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {identityBlocks.map((block, i) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.12 + i * 0.08 }}
                  className="p-4"
                  style={{
                    background: c.cardBg,
                    border: `1px solid ${c.borderSubtle}`,
                  }}
                >
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", color: c.accent }}
                    className="uppercase mb-2"
                  >
                    {block.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.6, color: c.textSecondary }}
                  >
                    {block.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Vision + Mission stacked */}
          <div className="flex flex-col gap-6">
            {directionBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                className="relative p-8 md:p-9 group overflow-hidden"
                style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.accent;
                  el.style.boxShadow = `0 10px 44px rgba(${c.accentRgb},0.14)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.borderSubtle;
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, ${c.accent}, transparent)` }}
                />

                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    fontSize: "4.8rem",
                    lineHeight: 1,
                    color: `rgba(${c.accentRgb},0.06)`,
                    position: "absolute",
                    top: 12,
                    right: 20,
                    userSelect: "none",
                  }}
                >
                  {block.id}
                </span>

                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 transition-colors duration-400 group-hover:bg-[var(--t-accent)]"
                  style={{ background: c.cardBgSubtle }}
                >
                  <block.icon
                    size={18}
                    className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
                    style={{ color: c.accent }}
                  />
                </div>

                <span
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.18em", color: c.accent }}
                  className="uppercase block mb-3"
                >
                  {block.title}
                </span>
                <p
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.6, color: c.textPrimary }}
                  className="mb-4 max-w-[34ch]"
                >
                  {block.text}
                </p>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.84rem", lineHeight: 1.75, color: c.textSecondary }}
                  className="max-w-[48ch]"
                >
                  {block.support}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
