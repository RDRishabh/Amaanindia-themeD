import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Building2, Users, Award, TrendingUp, MapPin, Play } from "lucide-react";
import gsap from "gsap";
import { getThemeColors } from "../../styles/themes";
const c = getThemeColors();

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1772175159665-164d64e02c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHQlMjBjaXR5JTIwbGlnaHRzfGVufDF8fHx8MTc3NDU1ODE2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Premium Living",
    location: "Gurugram, Haryana",
  },
  {
    image:
      "https://images.unsplash.com/photo-1673745963492-32d46cfaf1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdmlsbGElMjBpbmZpbml0eSUyMHBvb2wlMjBhZXJpYWwlMjB2aWV3JTIwbHV4dXJ5fGVufDF8fHx8MTc3NDU1ODE2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Iconic Villas",
    location: "Noida Extension",
  },
  {
    image:
      "https://images.unsplash.com/photo-1675012706065-173ab554c46a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjByb29mdG9wJTIwbW9kZXJuJTIwaW50ZXJpb3IlMjBsdXh1cnklMjBhcGFydG1lbnR8ZW58MXx8fHwxNzc0NTU4MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tagline: "Sky Penthouses",
    location: "South Delhi",
  },
];

const stats = [
  { value: "500+", label: "Properties Sold", icon: Building2 },
  { value: "15+", label: "Years of Trust", icon: Award },
  { value: "2,000+", label: "Happy Families", icon: Users },
  { value: "₹500Cr+", label: "Portfolio Value", icon: TrendingUp },
];

// ── 3-D Orb made from CSS-perspective rings ──────────────────────────
function OrbDecoration() {
  const spin1 = useRef<HTMLDivElement>(null);
  const spin2 = useRef<HTMLDivElement>(null);
  const spin3 = useRef<HTMLDivElement>(null);
  const dotGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(spin1.current, { rotateY: 360, duration: 14, ease: "none", repeat: -1 });
    gsap.to(spin2.current, { rotateY: -360, duration: 22, ease: "none", repeat: -1 });
    gsap.to(spin3.current, { rotateY: 360, duration: 34, ease: "none", repeat: -1 });
    gsap.to(dotGroupRef.current, { rotateZ: 360, duration: 20, ease: "none", repeat: -1 });
  }, []);

  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const r = 150;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, delay: i * 0.25 };
  });

  return (
    <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            `radial-gradient(ellipse at center, rgba(${c.accentRgb},0.12) 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Ring 1 – wide, nearly horizontal */}
      <div
        ref={spin1}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: `1px solid rgba(${c.accentRgb},0.55)`,
            transform: "rotateX(74deg)",
            boxShadow: `0 0 18px rgba(${c.accentRgb},0.15)`,
          }}
        />
      </div>

      {/* Ring 2 – medium, tilted */}
      <div
        ref={spin2}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          style={{
            width: 250,
            height: 250,
            borderRadius: "50%",
            border: `1px solid rgba(${c.accentRgb},0.38)`,
            transform: "rotateX(62deg) rotateZ(38deg)",
          }}
        />
      </div>

      {/* Ring 3 – small, steep tilt */}
      <div
        ref={spin3}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          style={{
            width: 168,
            height: 168,
            borderRadius: "50%",
            border: `1px solid rgba(${c.accentRgb},0.28)`,
            transform: "rotateX(55deg) rotateZ(-55deg)",
          }}
        />
      </div>

      {/* Orbiting dots */}
      <div
        ref={dotGroupRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {dots.map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 4, height: 4, left: "50%", top: "50%", marginLeft: -2, marginTop: -2, x: d.x, y: d.y, backgroundColor: c.accent }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Centre diamond */}
      <motion.div
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          width: 44,
          height: 44,
          border: `2px solid ${c.accent}`,
          background: `rgba(${c.accentRgb},0.1)`,
          transform: "rotate(45deg)",
          position: "absolute",
          boxShadow: `0 0 20px rgba(${c.accentRgb},0.4), inset 0 0 10px rgba(${c.accentRgb},0.15)`,
        }}
      />

      {/* Inner pulsing glow */}
      <motion.div
        className="absolute rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 80,
          height: 80,
          background: `radial-gradient(circle, rgba(${c.accentRgb},0.5) 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

// ── Floating property card ────────────────────────────────────────────
function PropertyCard() {
  return (
    <motion.div
      className="hero-card"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.9, ease: "easeOut" }}
      whileHover={{ y: -6, boxShadow: `0 30px 60px rgba(${c.accentRgb},0.2)`, transition: { type: "spring", stiffness: 240, damping: 22 } }}
      style={{
        position: "absolute",
        bottom: -30,
        right: 0,
        minWidth: 230,
        background: "rgba(8,20,14,0.78)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(201,164,74,0.40)",
        borderTop: "2px solid rgba(201,164,74,0.55)",
        borderRadius: 2,
        boxShadow: "0 20px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ padding: "18px 20px" }}>
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={12} style={{ color: "#C9A44A" }} />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "#C9A44A",
              textTransform: "uppercase",
            }}
          >
            Featured Property
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: "0.92rem",
            color: "#fff",
            marginBottom: 4,
          }}
        >
          The Grand Meridian
        </p>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={10} className="text-white/40" />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)" }}>
            Sector 54, Gurugram
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#C9A44A" }}>
            ₹3.2 Cr+
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}
          >
            Ready to Move
          </span>
        </div>
        {/* progress bar */}
        <div className="mt-3 h-px bg-white/10">
          <div className="h-full" style={{ width: "72%", background: "linear-gradient(to right, #C9A44A, rgba(201,164,74,0.4))" }} />
        </div>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>
          72% Sold
        </span>
      </div>
    </motion.div>
  );
}

// ── Main HeroSection ─────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Slide auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".hero-overline, .hero-title-wrap, .hero-sub, .hero-btns, .hero-stat", {
        opacity: 0,
      });
      gsap.set(".hero-title-inner", { y: 70 });
      gsap.set(".hero-overline", { x: -40 });
      gsap.set(".hero-sub", { y: 24 });
      gsap.set(".hero-btns", { y: 24 });
      gsap.set(".hero-stat", { y: 30 });

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(".hero-overline", { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
        .to(".hero-title-wrap", { opacity: 1, duration: 0.01 }, "-=0.4")
        .to(".hero-title-inner", { y: 0, stagger: 0.14, duration: 0.85, ease: "power3.out" }, "-=0.4")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(".hero-btns", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(".hero-stat", { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out" }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(".hero-bg-layer", {
      x: x * 28,
      y: y * 20,
      duration: 1.5,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".hero-orb-wrap", {
      x: x * -18,
      y: y * -12,
      duration: 1.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const scrollDown = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        height: isMobile ? "auto" : "100svh",
        minHeight: isMobile ? "100svh" : 680,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Background slides ── */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <img
            src={slide.image}
            alt={slide.tagline}
            className="hero-bg-layer w-full h-full object-cover"
            style={{
              transformOrigin: "center center",
              transition: "transform 7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: i === current ? "scale(1.12)" : "scale(1.06)",
            }}
          />
        </motion.div>
      ))}

      {/* ── Gradient overlays ── */}
      {/* Left→Right: deep forest-green tint — strong for text, fades to preserve image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to right, rgba(10,22,16,0.82) 0%, rgba(10,22,16,0.52) 42%, rgba(10,22,16,0.18) 68%, transparent 100%)` }}
      />
      {/* Top→Bottom: atmospheric depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, rgba(10,22,16,0.48) 0%, transparent 38%, rgba(10,22,16,0.72) 100%)` }}
      />
      {/* Edge vignette — soft luxury depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 58%, rgba(5,12,9,0.60) 100%)` }}
      />

      {/* ── Animated light streak ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.06, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        style={{
          background:
            `linear-gradient(135deg, transparent 30%, rgba(${c.accentRgb},0.25) 50%, transparent 70%)`,
        }}
      />

      {/* ── Main layout ── */}
      <div
        className="relative z-10 flex flex-col justify-between"
        style={{
          minHeight: isMobile ? "100svh" : "100%",
          height: isMobile ? "auto" : "100%",
        }}
      >
        {/* Content row – flex-1 keeps this from pushing bottom bar */}
        <div className="flex-1 flex items-center px-6 sm:px-10 md:px-14 pt-20 pb-8 sm:pb-12">
          {/* Left panel */}
          <div className="w-full lg:w-[56%] flex flex-col" style={{ gap: "1.4rem" }}>
            {/* Overline */}
            <div className="hero-overline flex items-center gap-3">
              <div
                style={{
                  width: 36,
                  height: 1,
                  background: `linear-gradient(to right, ${c.accent}, transparent)`,
                }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.68rem",
                    letterSpacing: "0.32em",
                    color: "#C9A44A",
                    textTransform: "uppercase",
                  }}
                >
                  {slides[current].tagline}
                </motion.span>
              </AnimatePresence>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginLeft: 8,
                  padding: "3px 10px",
                  border: `1px solid rgba(201,164,74,0.30)`,
                  borderRadius: 1,
                }}
              >
                <MapPin size={9} color={`rgba(201,164,74,0.80)`} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: `rgba(201,164,74,0.80)`,
                    }}
                  >
                    {slides[current].location}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Headline – each line in its own overflow:hidden clip */}
            <div>
              {[
                { text: "Timeless Spaces",   style: { color: "#FFFFFF",   fontStyle: "normal" as const } },
                { text: "Thoughtfully Built",    style: { color: "#C9A44A",   fontStyle: "italic"  as const } },
              ].map((line, i) => (
                <div key={i} className="hero-title-wrap overflow-hidden" style={{ lineHeight: 1 }}>
                  <div
                    className="hero-title-inner"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.7rem, 3.4vw, 3.2rem)",
                      lineHeight: 1.15,
                      display: "block",
                      paddingBottom: "0.08em",
                      textShadow: "0 2px 16px rgba(0,0,0,0.55)",
                      ...line.style,
                    }}
                  >
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <p
              className="hero-sub"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.84)",
                maxWidth: 620,
                textShadow: "0 1px 8px rgba(0,0,0,0.45)",
              }}
            >
              Amaan is a development firm committed to creating thoughtful, enduring environments across residential, commercial and institutional spaces. Our work is guided by clarity of design, strength of construction and a long-term view of value.
              <br className="hidden md:block" />
              We believe quality is timeless - and luxury is found in restraint, precision and purpose.
            </p>

            {/* CTA buttons */}
            <div className="hero-btns flex flex-wrap gap-3">
              <button
                onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: `linear-gradient(135deg, ${c.accent} 0%, ${c.accentLight} 50%, ${c.accent} 100%)`,
                  backgroundSize: "200% 100%",
                  color: "#FBF6EA",
                  padding: "14px 28px",
                  border: "none",
                  borderBottom: "2px solid rgba(201,164,74,0.70)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(44,74,58,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 0";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 48px rgba(${c.accentRgb},0.65), 0 8px 28px rgba(0,0,0,0.45), 0 0 20px rgba(201,164,74,0.25)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(201,164,74,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 0";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(44,74,58,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(201,164,74,0.70)";
                }}
              >
                Explore Our Projects
              </button>

              <button
                onClick={() => { const el = document.querySelector("#projects"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.90)",
                  padding: "13px 24px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.38)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A44A";
                  (e.currentTarget as HTMLButtonElement).style.color = "#C9A44A";
                  (e.currentTarget as HTMLButtonElement).style.background = `rgba(201,164,74,0.10)`;
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 18px rgba(201,164,74,0.20)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.38)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.90)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <Play size={12} style={{ fill: "currentColor" }} />
                View Projects
              </button>
            </div>
          </div>

          {/* Right panel – 3-D orb (desktop only) */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative">
            <div className="hero-orb-wrap relative" style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}>
              <OrbDecoration />
              <PropertyCard />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="px-6 sm:px-10 md:px-14 pb-7 pt-4 flex flex-row items-end justify-between gap-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-4 gap-y-3 md:gap-10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="hero-stat flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon size={11} style={{ color: "#C9A44A", opacity: 0.75 }} />
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)",
                        color: "#C9A44A",
                        lineHeight: 1,
                        textShadow: "0 1px 10px rgba(201,164,74,0.35)",
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.48)",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Slide indicators + scroll */}
          <div className="flex flex-col items-end gap-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: i === current ? 28 : 7,
                    height: 7,
                    borderRadius: 4,
                    background: i === current ? c.accent : "rgba(255,255,255,0.28)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                    boxShadow: i === current ? `0 0 8px rgba(${c.accentRgb},0.5)` : "none",
                  }}
                />
              ))}
            </div>

            {/* Scroll CTA */}
            <motion.button
              onClick={scrollDown}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5 group"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.38)",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: 1,
                  height: 28,
                  background: `linear-gradient(to bottom, rgba(${c.accentRgb},0.7), transparent)`,
                  borderRadius: 1,
                }}
              />
              <ArrowDown size={13} style={{ color: `rgba(${c.accentRgb},0.65)` }} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
