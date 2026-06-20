import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { getThemeColors } from "../../styles/themes";

export function CustomerExperiencePage() {
  const c = getThemeColors();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Customer Experience | Amaan India";
  }, []);

  return (
    <div style={{ background: c.sectionLight, minHeight: "100vh" }} className="flex flex-col justify-between">
      <Navbar />

      {/* Blank content container with placeholder spacing */}
      <div className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 text-center px-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: c.textPrimary }}
            className="text-4xl md:text-5xl uppercase tracking-wider"
          >
            Customer Experience
          </h1>
          <p 
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: c.textSecondary }}
            className="mt-6 text-sm uppercase tracking-widest"
          >
            Coming Soon
          </p>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
