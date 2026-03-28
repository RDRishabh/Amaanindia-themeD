import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1759763494381-540baf5b656b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjByb29mdG9wJTIwY2l0eSUyMHZpZXd8ZW58MXx8fHwxNzc0NTU3MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#0a0a0a]/60" />
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
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em" }}
                className="text-[#C9A84C] uppercase"
              >
                Take The Next Step
              </span>
            </div>

            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.1 }}
              className="text-white text-4xl md:text-6xl mb-6"
            >
              Make the Right
              <span className="block italic text-[#C9A84C]">Property Decision</span>
              <span className="block text-white/80">with Expert Guidance</span>
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8 }}
              className="text-white/65 mb-12 max-w-lg"
            >
              Whether you're a salaried professional buying your first home, a seasoned real estate investor, or a commercial buyer — our expert advisors are ready to guide you every step of the way.
            </p>

            <div className="flex flex-wrap gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-3 bg-[#C9A84C] hover:bg-[#B8963E] text-[#0a0a0a] px-8 py-5 transition-all duration-300 group shadow-[0_0_40px_rgba(201,168,76,0.3)]"
              >
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em" }} className="uppercase">
                  Get Expert Property Advice
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="tel:9540005050"
                className="flex items-center gap-3 border border-white/30 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] px-8 py-5 transition-all duration-400 backdrop-blur-sm group"
              >
                <Phone size={16} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                  Call: 9540005050
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
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-transparent origin-left"
      />
    </section>
  );
}