import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";
import logoImg from "../../assets/logo.png";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Property Consulting",
  "Investment Advisory",
  "Project Management",
  "Financial Assistance",
  "Commercial Real Estate",
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 52, height: 52, flexShrink: 0 }}>
                <img
                  src={logoImg}
                  alt="Amaan India"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1) opacity(0.85)",
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.2rem", letterSpacing: "0.05em" }} className="text-white">AMAAN</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.55rem", letterSpacing: "0.25em" }} className="text-[#C9A84C]">INDIA</div>
              </div>
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.8 }}
              className="text-white/45 mb-6"
            >
              India's most trusted real estate advisory, guiding salaried professionals, real estate investors, and commercial buyers to make confident property decisions since 2010.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 border border-[#2a2a2a] hover:border-[#C9A84C] hover:text-[#C9A84C] flex items-center justify-center text-white/40 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em" }}
              className="text-[#C9A84C] uppercase mb-6"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.85rem" }}
                    className="text-white/45 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-[#C9A84C] group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em" }}
              className="text-[#C9A84C] uppercase mb-6"
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((svc) => (
                <li key={svc}>
                  <button
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.85rem" }}
                    className="text-white/45 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-2 group text-left"
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-[#C9A84C] group-hover:w-6 transition-all duration-300" />
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em" }}
              className="text-[#C9A84C] uppercase mb-6"
            >
              Contact Us
            </h4>
            <div className="space-y-4">
              <a href="tel:9540005050" className="flex items-start gap-3 group">
                <Phone size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.85rem" }} className="text-white/45 group-hover:text-white transition-colors">+91 95400 05050</span>
              </a>
              <a href="mailto:info@amaanindia.com" className="flex items-start gap-3 group">
                <Mail size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.85rem" }} className="text-white/45 group-hover:text-white transition-colors">info@amaanindia.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.85rem", lineHeight: 1.6 }} className="text-white/45">304, DLF Corporate Park,<br />Sector 74A, Gurugram, HR 122004</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#141414]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem" }}
            className="text-white/30"
          >
            © {new Date().getFullYear()} Amaan India. All rights reserved. | RERA Registered
          </p>
          <div className="flex items-center gap-6">
            <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem" }} className="text-white/30 hover:text-[#C9A84C] transition-colors">Privacy Policy</button>
            <button style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.78rem" }} className="text-white/30 hover:text-[#C9A84C] transition-colors">Terms of Use</button>
          </div>
          <button
            onClick={scrollTop}
            className="w-9 h-9 border border-[#2a2a2a] hover:border-[#C9A84C] hover:text-[#C9A84C] flex items-center justify-center text-white/40 transition-all duration-300"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}