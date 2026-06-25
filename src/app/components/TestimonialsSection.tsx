import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

export function TestimonialsSection() {
  const c = getThemeColors();

  const testimonials = [
    { name: "Rajiv Sharma", role: "Senior IT Professional, Noida", rating: 5, text: "Amaan India transformed my property search completely. Their team's market knowledge is unparalleled — they helped me identify a project in Gurugram that has already appreciated 32% in 18 months. The transparency and hand-holding throughout the process was exceptional.", initials: "RS" },
    { name: "Priya Kapoor", role: "Entrepreneur & Investor, Delhi", rating: 5, text: "I've worked with many real estate consultants, but Amaan India stands in a different league entirely. Their investment advisory team gave me data-backed insights that helped me diversify across 3 properties. My portfolio has grown 45% in 2 years.", initials: "PK" },
    { name: "Arun Mehta", role: "Commercial Investor, Mumbai", rating: 5, text: "Finding the right commercial space in Noida was daunting, but Amaan India made it seamless. From shortlisting to registration, every step was handled professionally. I now own a Grade-A office space that yields 9% annually. Truly the best in the business.", initials: "AM" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((s) => (s - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((s) => (s + 1) % testimonials.length);

  return (
    <section id="customer-experience" className="py-28 relative overflow-hidden" style={{ background: c.sectionDark }}>
      {/* Background element */}
      <div
        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "18rem", lineHeight: 1, letterSpacing: "-0.05em" }}
        className="absolute -top-10 left-0 text-white/[0.02] pointer-events-none select-none hidden lg:block"
      >
        "
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: c.accent }} />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
              className="uppercase"
            >
              Customer Experience
            </span>
            <div className="h-px w-10" style={{ background: c.accent }} />
          </div>
          <h2
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
            className="text-4xl md:text-5xl"
          >
            What Our <span className="italic" style={{ color: c.accent }}>Clients Say</span>
          </h2>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative border p-8 transition-all duration-400 group"
              style={{ background: c.cardBg, borderColor: c.borderSubtle }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderSubtle}
            >
              <Quote size={36} className="mb-6" style={{ color: `rgba(${c.accentRgb},0.20)` }} />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} style={{ fill: c.accent, color: c.accent }} />
                ))}
              </div>

              <p
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.85, color: c.textSecondary }}
                className="mb-8 italic"
              >
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-6" style={{ borderTop: `1px solid ${c.borderSubtle}` }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: c.avatarColors[i] }}
                >
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.85rem" }}
                    className="text-white"
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: c.textPrimary }}
                    className="block"
                  >
                    {t.name}
                  </span>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.05em", color: c.accent }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Slider */}
        <div className="lg:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="border p-8"
            style={{ background: c.cardBg, borderColor: c.borderSubtle }}
          >
            <Quote size={32} className="mb-4" style={{ color: `rgba(${c.accentRgb},0.20)` }} />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                <Star key={j} size={14} style={{ fill: c.accent, color: c.accent }} />
              ))}
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.85, color: c.textSecondary }}
              className="mb-6 italic"
            >
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c.avatarColors[current] }}
              >
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.85rem" }} className="text-white">
                  {testimonials[current].initials}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: c.textPrimary }} className="block">
                  {testimonials[current].name}
                </span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.7rem", color: c.accent }}>
                  {testimonials[current].role}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{ border: `1px solid ${c.borderMedium}`, color: c.textSecondary }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.accent;
                el.style.color = c.accent;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.borderMedium;
                el.style.color = c.textSecondary;
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-[2px] transition-all duration-400"
                  style={{
                    width: i === current ? 32 : 8,
                    background: i === current ? c.accent : c.borderMedium,
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{ border: `1px solid ${c.borderMedium}`, color: c.textSecondary }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.accent;
                el.style.color = c.accent;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = c.borderMedium;
                el.style.color = c.textSecondary;
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
