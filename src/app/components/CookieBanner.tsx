import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { getThemeColors } from "../../styles/themes";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const c = getThemeColors();

  useEffect(() => {
    const consent = localStorage.getItem("amaan_cookie_consent");
    if (!consent) {
      // Small delay for natural entrance
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("amaan_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("amaan_cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] shadow-2xl rounded-sm overflow-hidden"
          style={{
            background: c.cardBg,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            border: `1px solid ${c.borderMedium}`,
            padding: "20px 24px",
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="p-2.5 rounded-sm flex-shrink-0"
              style={{ background: `rgba(${c.accentRgb}, 0.12)`, color: c.accent }}
            >
              <Cookie size={22} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <h4 
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", color: c.textPrimary }}
                  className="uppercase"
                >
                  Cookie Policy
                </h4>
                <button 
                  onClick={handleDecline}
                  className="transition-colors duration-200"
                  style={{ color: c.textMuted }}
                  onMouseEnter={(e) => e.currentTarget.style.color = c.textPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = c.textMuted}
                >
                  <X size={16} />
                </button>
              </div>

              <p 
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.6, color: c.textSecondary }}
                className="mb-4"
              >
                We use cookies to ensure you get the best experience on our website and to track for remarketing and retargeting. Read our{" "}
                <a 
                  href="/cookie-policy" 
                  className="underline font-normal transition-colors"
                  style={{ color: c.accent }}
                >
                  Cookie Policy
                </a>.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 transition-all duration-300 flex-1 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    background: c.accent,
                    color: c.onAccent,
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 16px rgba(${c.accentRgb}, 0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  ACCEPT COOKIES
                </button>
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 transition-all duration-300 flex-1 text-center"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
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
                  DECLINE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
