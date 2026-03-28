import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Dumbbell, Shield, Car, Trees, Waves, Wifi,
  Coffee, Zap, Baby, Heart, Camera, Wind
} from "lucide-react";

const amenities = [
  { icon: Dumbbell, label: "World-Class Gym" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Car, label: "Ample Parking" },
  { icon: Trees, label: "Green Spaces" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Coffee, label: "Clubhouse" },
  { icon: Zap, label: "Power Backup" },
  { icon: Baby, label: "Kids Play Area" },
  { icon: Heart, label: "Wellness Centre" },
  { icon: Camera, label: "CCTV Surveillance" },
  { icon: Wind, label: "Landscaped Gardens" },
];

export function AmenitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
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
              World-Class Facilities
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.15 }}
            className="text-white text-4xl md:text-5xl"
          >
            Premium <span className="italic text-[#C9A84C]">Amenities</span>
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8 }}
            className="text-white/50 mt-4 max-w-xl mx-auto"
          >
            Every Amaan India property comes with thoughtfully curated amenities designed for luxury living.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col items-center gap-4 p-6 border border-[#1e1e1e] hover:border-[#C9A84C] bg-[#111111] hover:bg-[#0f0f0f] transition-all duration-400 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a1a] group-hover:bg-[#C9A84C] transition-colors duration-400">
                <amenity.icon size={20} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-400" />
              </div>
              <span
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.78rem", lineHeight: 1.3, textAlign: "center" }}
                className="text-white/60 group-hover:text-white transition-colors duration-400"
              >
                {amenity.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Image Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="relative h-64 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwZ3ltJTIwZml0bmVzcyUyMGNlbnRlcnxlbnwxfHx8fDE3NzQ1NTczMjl8MA&ixlib=rb-4.1.0&q=80&w=800"
              alt="Gym"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.3rem" }}
              className="absolute bottom-4 left-4 text-white"
            >
              Fitness Centre
            </span>
          </div>
          <div className="relative h-64 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjByZXNvcnQlMjBhbWVuaXRpZXMlMjBsdXh1cnl8ZW58MXx8fHwxNzc0NTU3MzIwfDA&ixlib=rb-4.1.0&q=80&w=800"
              alt="Pool"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.3rem" }}
              className="absolute bottom-4 left-4 text-white"
            >
              Infinity Pool
            </span>
          </div>
          <div className="relative h-64 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1753596727275-15b5abc2b53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxhbmRzY2FwZSUyMGdhcmRlbiUyMGx1eHVyeSUyMHJlc2lkZW5jZXxlbnwxfHx8fDE3NzQ1NTczMzB8MA&ixlib=rb-4.1.0&q=80&w=800"
              alt="Garden"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.3rem" }}
              className="absolute bottom-4 left-4 text-white"
            >
              Landscaped Gardens
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
