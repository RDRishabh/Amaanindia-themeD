import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

export function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const c = getThemeColors();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Scroll to Top Arrow */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: c.accent,
              borderColor: c.accent,
              color: c.onAccent 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer border transition-colors duration-300"
            style={{
              backgroundColor: c.cardBg,
              borderColor: c.borderMedium,
              color: c.textPrimary,
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating CTA */}
      <motion.a
        href="https://wa.me/919000090000"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg cursor-pointer transition-shadow duration-300"
        style={{
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.45)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 211, 102, 0.45)";
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} className="stroke-[2.5]" />
      </motion.a>
    </div>
  );
}
