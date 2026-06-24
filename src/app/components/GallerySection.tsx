import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
const c = getThemeColors();

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYXBhcnRtZW50JTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NDU1NzMxNnww&ixlib=rb-4.1.0&q=80&w=800",
    label: "Living Area",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc0NTU3MzE5fDA&ixlib=rb-4.1.0&q=80&w=800",
    label: "Master Bedroom",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1639173925921-5d5fd027713c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc3NDU1NzMzMHww&ixlib=rb-4.1.0&q=80&w=800",
    label: "Modern Kitchen",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjByZXNvcnQlMjBhbWVuaXRpZXMlMjBsdXh1cnl8ZW58MXx8fHwxNzc0NTU3MzIwfDA&ixlib=rb-4.1.0&q=80&w=800",
    label: "Infinity Pool",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwZ3ltJTIwZml0bmVzcyUyMGNlbnRlcnxlbnwxfHx8fDE3NzQ1NTczMjl8MA&ixlib=rb-4.1.0&q=80&w=800",
    label: "Fitness Centre",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1753596727275-15b5abc2b53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxhbmRzY2FwZSUyMGdhcmRlbiUyMGx1eHVyeSUyMHJlc2lkZW5jZXxlbnwxfHx8fDE3NzQ1NTczMzB8MA&ixlib=rb-4.1.0&q=80&w=800",
    label: "Zen Garden",
    tall: false,
  },
];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28" style={{ background: c.sectionLight }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: c.accent }} />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
              className="uppercase"
            >
              Visual Journey
            </span>
            <div className="h-px w-10" style={{ background: c.accent }} />
          </div>
          <h2
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
            className="text-4xl md:text-5xl"
          >
            Property <span className="italic" style={{ color: c.accent }}>Gallery</span>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: "220px" }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden ${img.tall ? "md:row-span-2" : "md:row-span-1"}`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 text-center">
                  <ZoomIn size={28} className="text-white mx-auto mb-2" />
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.95rem" }}
                    className="text-white"
                  >
                    {img.label}
                  </span>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <span
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.1em" }}
                  className="text-white uppercase"
                >
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0a0a0a]/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[var(--t-accent)] transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].label}
            className="max-h-[85vh] max-w-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "1rem" }}
              className="text-white"
            >
              {galleryImages[lightbox].label}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
