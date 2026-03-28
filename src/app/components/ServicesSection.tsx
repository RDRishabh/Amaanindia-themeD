import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Home, BarChart2, Briefcase, CreditCard, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Property Consulting",
    desc: "Personalized guidance to find the property that perfectly aligns with your lifestyle, budget, and long-term goals.",
    features: ["Site Visit Coordination", "Comparative Market Analysis", "Negotiation Support"],
  },
  {
    icon: BarChart2,
    title: "Investment Advisory",
    desc: "Data-driven investment strategies to maximize ROI across residential and commercial real estate segments.",
    features: ["Portfolio Diversification", "Rental Yield Analysis", "Capital Appreciation Forecasting"],
  },
  {
    icon: Briefcase,
    title: "Project Management",
    desc: "Comprehensive management of your property development lifecycle, from planning to handover.",
    features: ["Timeline & Budget Control", "Vendor Management", "Quality Assurance"],
  },
  {
    icon: CreditCard,
    title: "Financial Assistance",
    desc: "Seamless home loan facilitation with preferred rates through our banking partnerships.",
    features: ["Home Loan Processing", "EMI Planning", "Tax Benefit Advisory"],
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-[#0a0a0a]">
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
              What We Offer
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.15 }}
            className="text-white text-4xl md:text-5xl"
          >
            Our Core <span className="italic text-[#C9A84C]">Services</span>
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative bg-[#111111] border border-[#2a2a2a] hover:border-[#C9A84C] p-8 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Hover BG */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number */}
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "4rem", lineHeight: 1 }}
                className="absolute top-4 right-4 text-white/5 group-hover:text-[#C9A84C]/10 transition-colors duration-500"
              >
                0{i + 1}
              </span>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#1a1a1a] group-hover:bg-[#C9A84C] flex items-center justify-center mb-6 transition-colors duration-500">
                  <svc.icon size={22} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-500" />
                </div>

                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.35rem", lineHeight: 1.2 }}
                  className="text-white mb-3"
                >
                  {svc.title}
                </h3>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.7 }}
                  className="text-white/50 mb-6"
                >
                  {svc.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
                      <span
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.78rem" }}
                        className="text-white/50"
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-[#C9A84C] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em" }} className="uppercase">Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
