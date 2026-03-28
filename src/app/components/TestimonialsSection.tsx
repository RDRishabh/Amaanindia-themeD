import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajiv Sharma",
    role: "Senior IT Professional, Noida",
    rating: 5,
    text: "Amaan India transformed my property search completely. Their team's market knowledge is unparalleled — they helped me identify a project in Gurugram that has already appreciated 32% in 18 months. The transparency and hand-holding throughout the process was exceptional.",
    initials: "RS",
    color: "#C9A84C",
  },
  {
    name: "Priya Kapoor",
    role: "Entrepreneur & Investor, Delhi",
    rating: 5,
    text: "I've worked with many real estate consultants, but Amaan India stands in a different league entirely. Their investment advisory team gave me data-backed insights that helped me diversify across 3 properties. My portfolio has grown 45% in 2 years.",
    initials: "PK",
    color: "#8B6914",
  },
  {
    name: "Arun Mehta",
    role: "Commercial Investor, Mumbai",
    rating: 5,
    text: "Finding the right commercial space in Noida was daunting, but Amaan India made it seamless. From shortlisting to registration, every step was handled professionally. I now own a Grade-A office space that yields 9% annually. Truly the best in the business.",
    initials: "AM",
    color: "#5a4a28",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background element */}
      <div
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "18rem", lineHeight: 1, letterSpacing: "-0.05em" }}
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
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em" }}
              className="text-[#C9A84C] uppercase"
            >
              Client Stories
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.15 }}
            className="text-white text-4xl md:text-5xl"
          >
            What Our <span className="italic text-[#C9A84C]">Clients Say</span>
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
              className="relative bg-[#111111] border border-[#1e1e1e] hover:border-[#C9A84C] p-8 transition-all duration-400 group"
            >
              <Quote size={36} className="text-[#C9A84C]/20 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#C9A84C" className="text-[#C9A84C]" />
                ))}
              </div>

              <p
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.85 }}
                className="text-white/60 mb-8 italic"
              >
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1e1e1e]">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem" }}
                    className="text-white"
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem" }}
                    className="text-white block"
                  >
                    {t.name}
                  </span>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.05em" }}
                    className="text-[#C9A84C]"
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
            className="bg-[#111111] border border-[#1e1e1e] p-8"
          >
            <Quote size={32} className="text-[#C9A84C]/20 mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                <Star key={j} size={14} fill="#C9A84C" className="text-[#C9A84C]" />
              ))}
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.85 }}
              className="text-white/60 mb-6 italic"
            >
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: testimonials[current].color }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem" }} className="text-white">
                  {testimonials[current].initials}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem" }} className="text-white block">
                  {testimonials[current].name}
                </span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.7rem" }} className="text-[#C9A84C]">
                  {testimonials[current].role}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-10 h-10 border border-[#2a2a2a] hover:border-[#C9A84C] flex items-center justify-center text-white hover:text-[#C9A84C] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[2px] transition-all duration-400 ${i === current ? "w-8 bg-[#C9A84C]" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-[#2a2a2a] hover:border-[#C9A84C] flex items-center justify-center text-white hover:text-[#C9A84C] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
