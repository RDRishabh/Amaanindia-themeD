import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, HelpCircle } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

export function AssistancePopup() {
  const [visible, setVisible] = useState(false);
  const c = getThemeColors();

  useEffect(() => {
    const shown = localStorage.getItem("amaan_assistance_prompt_shown");
    if (!shown) {
      setVisible(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("amaan_assistance_prompt_shown", "yes");
    setVisible(false);
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNo = () => {
    localStorage.setItem("amaan_assistance_prompt_shown", "no");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -80, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-24 left-6 right-6 md:right-auto md:left-6 md:max-w-xs z-[99] shadow-2xl rounded-sm overflow-hidden"
          style={{
            background: c.cardBg,
            border: `1px solid ${c.borderMedium}`,
            padding: "18px 20px",
          }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="p-2 rounded-sm flex-shrink-0"
              style={{ background: `rgba(${c.accentRgb}, 0.12)`, color: c.accent }}
            >
              <HelpCircle size={20} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.08em", color: c.textPrimary }}
                  className="uppercase"
                >
                  Assistance
                </h4>
                <button 
                  onClick={handleNo}
                  className="transition-colors duration-200"
                  style={{ color: c.textMuted }}
                  onMouseEnter={(e) => e.currentTarget.style.color = c.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = c.textMuted}
                >
                  <X size={15} />
                </button>
              </div>

              <p 
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.5, color: c.textSecondary }}
                className="mb-3.5"
              >
                Welcome to Amaan India. Can we help you?
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleYes}
                  className="px-4 py-2 transition-all duration-300 flex-1 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    background: c.accent,
                    color: c.onAccent,
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 12px rgba(${c.accentRgb}, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  YES
                </button>
                <button
                  onClick={handleNo}
                  className="px-4 py-2 transition-all duration-300 flex-1 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    background: "transparent",
                    color: c.textSecondary,
                    border: `1px solid ${c.borderMedium}`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.textPrimary;
                    e.currentTarget.style.color = c.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = c.borderMedium;
                    e.currentTarget.style.color = c.textSecondary;
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
