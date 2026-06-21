import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X, ChevronRight } from "lucide-react";
import logoImg from "../../assets/logo.png";
import { getThemeColors } from "../../styles/themes";

const c = getThemeColors();

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Founder's Letter", href: "#founder" },
  { label: "Approach", href: "#approach" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Customer Experience", href: "" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCookiePolicy = typeof window !== "undefined" && (window.location.pathname === "/cookie-policy" || window.location.pathname === "/cookie-policy/");
  const isCustomerExperience = typeof window !== "undefined" && (window.location.pathname === "/customer-experience" || window.location.pathname === "/customer-experience/");
  const isNavbarScrolled = scrolled || mobileOpen || isCookiePolicy || isCustomerExperience;

  const [activeLink, setActiveLink] = useState(() => {
    if (typeof window !== "undefined") {
      if (isCookiePolicy) return "";
      if (isCustomerExperience) return "/customer-experience";
    }
    return "#home";
  });

  useEffect(() => {
    if (isCookiePolicy || isCustomerExperience) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const anchor = window.scrollY + window.innerHeight * 0.35;
      let current = navLinks[0].href;

      navLinks.forEach((link) => {
        if (!link.href.startsWith("#")) return;
        const section = document.querySelector<HTMLElement>(link.href);
        if (!section) return;
        if (anchor >= section.offsetTop) {
          current = link.href;
        }
      });

      setActiveLink((prev) => (prev === current ? prev : current));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isCookiePolicy, isCustomerExperience]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setActiveLink(href);

    const isSpecialPage = typeof window !== "undefined" && (
      window.location.pathname === "/cookie-policy" ||
      window.location.pathname === "/cookie-policy/" ||
      window.location.pathname === "/customer-experience" ||
      window.location.pathname === "/customer-experience/"
    );

    if (isSpecialPage) {
      if (href.startsWith("#")) {
        window.location.href = "/" + href;
      } else {
        window.location.href = href;
      }
      return;
    }

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavbarScrolled ? "backdrop-blur-xl" : ""}`}
        style={{
          padding: isNavbarScrolled ? "10px 0" : "18px 0",
          background: isNavbarScrolled ? c.navScrolledBg : "transparent",
          boxShadow: isNavbarScrolled ? c.navShadow : "none",
        }}
      >
        <div className="mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* ── Logo ── */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-3 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ width: 44, height: 44, flexShrink: 0 }}
            >
              <img
                src={logoImg}
                alt="Amaan India Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: isNavbarScrolled ? c.logoFilter : "brightness(0) invert(1)",
                  transition: "filter 0.5s",
                }}
              />
            </motion.div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "0.08em",
                  color: isNavbarScrolled ? c.textPrimary : "#fff",
                  lineHeight: 1,
                  transition: "color 0.5s",
                }}
                className="group-hover:text-[var(--t-accent)]"
              >
                AMAAN
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.52rem",
                  letterSpacing: "0.28em",
                  color: isNavbarScrolled ? c.textPrimary : "#fff",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  transition: "color 0.5s",
                }}
                className="group-hover:text-[var(--t-accent)]"
              >
                India
              </span>
            </div>
          </button>

          {/* ── Desktop links ── */}
          <nav className="hidden nav-lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              const activeColor = isNavbarScrolled ? c.accent : "#C9A44A";
              const inactiveColor = isNavbarScrolled ? c.textSecondary : "rgba(255,255,255,0.80)";
              const linkColor = isActive ? activeColor : inactiveColor;

              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    padding: "4px 0",
                    color: linkColor,
                    transition: "color 0.5s",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = isNavbarScrolled ? c.textPrimary : "#fff"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = isNavbarScrolled ? c.textSecondary : "rgba(255,255,255,0.80)"; }}
                >
                  {link.label}
                  {/* underline indicator */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: isActive ? "100%" : "0%",
                      height: 1,
                      background: `linear-gradient(to right, ${c.accent}, rgba(${c.accentRgb},0.3))`,
                      transition: "width 0.35s ease",
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden nav-lg:flex items-center gap-5">
            <a
              href="tel:+919000090000"
              className="flex items-center gap-2 group"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: `1px solid ${isNavbarScrolled ? `rgba(${c.accentRgb},0.4)` : "rgba(255,255,255,0.4)"}`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
                className="group-hover:border-[var(--t-accent)] group-hover:bg-[var(--t-card-bg-subtle)]"
              >
                <Phone size={12} style={{ color: isNavbarScrolled ? c.accent : "#fff" }} />
              </div>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.76rem",
                  color: isNavbarScrolled ? c.textSecondary : "rgba(255,255,255,0.75)",
                  transition: "color 0.5s",
                  letterSpacing: "0.04em",
                }}
                className="group-hover:text-[var(--t-accent)]"
              >
                9000090000
              </span>
            </a>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 0 28px rgba(${c.accentRgb},0.45)` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav("#contact")}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: `linear-gradient(135deg, ${c.accent}, ${c.accentLight})`,
                color: c.onAccent,
                padding: "10px 22px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Get In Touch
              <ChevronRight size={12} />
            </motion.button>
          </div>

          {/* ── Mobile toggle ── */}
          <motion.button
            className="nav-lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: isNavbarScrolled ? c.textPrimary : "#fff",
              transition: "color 0.5s",
            }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Gold line below navbar when scrolled */}
        <motion.div
          animate={{ scaleX: isNavbarScrolled ? 1 : 0, opacity: isNavbarScrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, rgba(${c.accentRgb},0.4), transparent)`,
            transformOrigin: "left",
          }}
        />
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: c.mobileMenuBg, backdropFilter: "blur(20px)" }}
          >
            {/* Diamond logo centered */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.06 }}
              transition={{ delay: 0.2 }}
              className="absolute"
              style={{ width: 260, height: 260 }}
            >
              <img
                src={logoImg}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: c.logoFilter,
                }}
              />
            </motion.div>

            <div className="flex flex-col items-center gap-3.5 relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: "easeOut" }}
                  onClick={() => handleNav(link.href)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    letterSpacing: "0.06em",
                    color: c.textPrimary,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  whileHover={{ color: c.accent, x: 8 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-col items-center gap-3"
              >
                <a
                  href="tel:+919000090000"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    color: c.accent,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  <Phone size={14} />
                  9000090000
                </a>
                <button
                  onClick={() => handleNav("#contact")}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: `linear-gradient(135deg, ${c.accent}, ${c.accentLight})`,
                    color: c.onAccent,
                    padding: "10px 22px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: 2,
                  }}
                >
                  Get In Touch
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
