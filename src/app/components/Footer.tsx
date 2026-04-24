import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";
import logoImg from "../../assets/logo.png";
import { getThemeColors } from "../../styles/themes";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Approach", href: "#approach" },
  { label: "Our Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const c = getThemeColors();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: c.sectionDark, borderTop: `1px solid ${c.borderSubtle}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 54, height: 54, flexShrink: 0 }}>
                <img
                  src={logoImg}
                  alt="Amaan India"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: c.logoFilter,
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.08rem", letterSpacing: "0.05em", color: c.textPrimary }}>
                  AMAAN
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.55rem", letterSpacing: "0.24em", color: c.accent }}>
                  INDIA
                </div>
              </div>
            </div>

            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.93rem", lineHeight: 1.75, color: c.textMuted }}
              className="max-w-xl mb-7"
            >
              A development firm committed to creating thoughtful, enduring environments across residential, commercial, and institutional spaces - guided by clarity of design and strength of construction.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                  style={{ color: c.textMuted }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = c.accent;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = c.textMuted;
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", color: c.accent }}
              className="uppercase mb-5"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.9rem", color: c.textMuted }}
                    className="hover:text-[var(--t-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", color: c.accent }}
              className="uppercase mb-5"
            >
              Contact Us
            </h4>
            <div className="space-y-4">
              <a href="tel:+919000090000" className="flex items-start gap-3 group">
                <Phone size={15} className="mt-1 flex-shrink-0" style={{ color: c.accent }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.95rem", color: c.textMuted }} className="group-hover:text-[var(--t-text-primary)] transition-colors">
                  +91 9000090000
                </span>
              </a>
              <a href="mailto:connect@amaanindia.com" className="flex items-start gap-3 group">
                <Mail size={15} className="mt-1 flex-shrink-0" style={{ color: c.accent }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.95rem", color: c.textMuted }} className="group-hover:text-[var(--t-text-primary)] transition-colors">
                  connect@amaanindia.com
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-1 flex-shrink-0" style={{ color: c.accent }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.6, color: c.textMuted }}>
                  304, DLF Corporate Park,
                  <br />
                  Sector 74A, Gurugram, HR 122004
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${c.borderSubtle}` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: c.textMuted }}
          >
            © {new Date().getFullYear()} Amaan India. All rights reserved. | RERA Registered
          </p>

          <div className="flex items-center gap-6">
            <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: c.textMuted }} className="hover:text-[var(--t-accent)] transition-colors">
              Privacy Policy
            </button>
            <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: c.textMuted }} className="hover:text-[var(--t-accent)] transition-colors">
              Terms of Use
            </button>
          </div>

          <button
            onClick={scrollTop}
            className="w-9 h-9 flex items-center justify-center transition-all duration-300"
            style={{ color: c.textMuted }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = c.accent;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = c.textMuted;
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
