import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const c = getThemeColors();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1759763494381-540baf5b656b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjByb29mdG9wJTIwY2l0eSUyMHZpZXd8ZW58MXx8fHwxNzc0NTU3MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${c.ctaOverlayStart}, ${c.ctaOverlayMid}, ${c.ctaOverlayEnd})`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: c.accent }} />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
                className="uppercase"
              >
                Founder's Note
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.1, color: c.textPrimary }}
              className="text-4xl md:text-5xl mb-8"
            >
              Built on a
              <span className="block italic" style={{ color: c.accent }}>Simple Belief</span>
            </h2>

            <div className="space-y-5 mb-12 max-w-2xl">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, color: c.textSecondary }}>
                Amaan was founded on a simple belief: that well‑designed, well‑built spaces have a lasting impact on how people live, work and engage with their surroundings.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, color: c.textSecondary }}>
                From the outset, the intention has never been to build for scale alone, but to build with care — placing architecture, construction quality and long‑term relevance at the centre of every decision. Each project is approached with restraint, clarity and respect for context, guided by collaboration with accomplished architects and trusted construction partners.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, color: c.textSecondary }}>
                At Amaan, luxury is not defined by excess, but by assurance — the confidence that comes from thoughtful planning, refined execution and spaces built to endure.
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.88rem", letterSpacing: "0.05em", color: c.accent }}>
                This commitment continues to shape everything we create.
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.82rem", letterSpacing: "0.08em", color: c.textMuted }}>
                — Founder, Amaan
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-3 px-8 py-5 transition-all duration-300 group"
                style={{ background: c.accent, color: c.onAccent }}
              >
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em" }} className="uppercase">
                  Get In Touch
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="tel:+919000090000"
                className="flex items-center gap-3 px-8 py-5 transition-all duration-400 backdrop-blur-sm group"
                style={{ border: `1px solid rgba(255,255,255,0.30)`, color: "rgba(255,255,255,0.9)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.accent;
                  el.style.color = c.accent;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.30)";
                  el.style.color = "rgba(255,255,255,0.9)";
                }}
              >
                <Phone size={16} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                  Call: +91 9000090000
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: `linear-gradient(to right, ${c.accent}, ${c.accentLight}, transparent)` }}
      />
    </section>
  );
}
