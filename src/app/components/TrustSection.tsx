import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Users, TrendingUp, Shield } from "lucide-react";

const pillars = [
  {
    icon: Award,
    title: "15+ Years of Expertise",
    desc: "A decade and a half of navigating India's dynamic real estate market, delivering results that matter.",
  },
  {
    icon: TrendingUp,
    title: "In-Depth Market Knowledge",
    desc: "Real-time insights across residential, commercial, and investment segments in top metro cities.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Over 2,000 families and investors have placed their trust in Amaan India for their property decisions.",
  },
  {
    icon: Shield,
    title: "End-to-End Advisory",
    desc: "From site visits to legal due diligence and financial planning — we handle every step of the journey.",
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
    <section id="about" className="py-28 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em" }}
                className="text-[#C9A84C] uppercase"
              >
                Who We Are
              </span>
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.15 }}
              className="text-[#0a0a0a] text-4xl md:text-5xl mb-6"
            >
              India's Premier
              <span className="block italic text-[#C9A84C]">Real Estate</span>
              Advisory Firm
            </h2>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8 }}
              className="text-[#4a4a4a] mb-6"
            >
              At Amaan India, we believe every property decision is a defining moment. Since 2010, we have guided <strong>salaried professionals</strong>, <strong>real estate investors</strong>, and <strong>commercial buyers</strong> through India's most dynamic property markets — with transparency, expertise, and unwavering integrity.
            </p>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8 }}
              className="text-[#4a4a4a] mb-10"
            >
              We don't just sell properties — we craft investment journeys tailored to your lifestyle, financial goals, and long-term aspirations.
            </p>
            <button
              onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.15em" }}
              className="bg-[#0a0a0a] hover:bg-[#C9A84C] text-white hover:text-[#0a0a0a] px-8 py-4 uppercase transition-all duration-500"
            >
              Get Expert Property Advice
            </button>
          </motion.div>

          {/* Right Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 + 0.2 }}
                className="bg-white p-8 border border-[#e8e2d8] hover:border-[#C9A84C] hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all duration-400 group"
              >
                <div className="w-12 h-12 bg-[#F8F5EF] group-hover:bg-[#C9A84C] flex items-center justify-center mb-4 transition-colors duration-400">
                  <p.icon size={20} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-400" />
                </div>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.2rem", lineHeight: 1.3 }}
                  className="text-[#0a0a0a] mb-3"
                >
                  {p.title}
                </h3>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.7 }}
                  className="text-[#6a6a6a]"
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}