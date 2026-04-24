import "../styles/index.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustSection } from "./components/TrustSection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AmenitiesSection } from "./components/AmenitiesSection";
import { GallerySection } from "./components/GallerySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CTASection } from "./components/CTASection";
import { ContactSection } from "./components/ContactSection";
import { BlogSection } from "./components/BlogSection";
import { DashboardPage } from "./components/DashboardPage";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const hasWindow = typeof globalThis.window !== "undefined";
  const dashboardEnabled = import.meta.env.VITE_ENABLE_DASHBOARD === "true";
  const isDashboardRoute = hasWindow && globalThis.window.location.pathname.startsWith("/dashboard");

  useEffect(() => {
    if ((dashboardEnabled && isDashboardRoute) || !appRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-section]");

      sections.forEach((section) => {
        const content = section.querySelector<HTMLElement>("[data-scroll-content]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 35%",
            scrub: 1,
          },
        });

        tl.fromTo(
          section,
          {
            autoAlpha: 0,
            y: 64,
            scale: 0.985,
            transformPerspective: 900,
            rotationX: 3,
            transformOrigin: "50% 80%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            ease: "power2.out",
          },
        );

        if (content) {
          tl.fromTo(
            content,
            {
              autoAlpha: 0.82,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
            },
            0,
          );
        }
      });

      gsap.from(".app-intro", {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        ease: "power3.out",
      });
    }, appRef);

    return () => {
      ctx.revert();
    };
  }, [dashboardEnabled, isDashboardRoute]);

  if (dashboardEnabled && isDashboardRoute) {
    return <DashboardPage />;
  }

  return (
    <div
      ref={appRef}
      className="min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}
    >
      <Navbar />
      <div className="app-intro">
        <HeroSection />
      </div>

      <div data-scroll-section>
        <div data-scroll-content>
          <VisionMissionSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <TrustSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <ServicesSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <ProjectsSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <AmenitiesSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <GallerySection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <TestimonialsSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <CTASection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <ContactSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <BlogSection />
        </div>
      </div>
      <div data-scroll-section>
        <div data-scroll-content>
          <Footer />
        </div>
      </div>
    </div>
  );
}