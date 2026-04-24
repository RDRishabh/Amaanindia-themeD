import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
import { submitContact } from "../lib/api";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });

  const c = getThemeColors();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      await submitContact(form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", phone: "", email: "", interest: "", message: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to submit your enquiry.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full border px-4 py-4 outline-none transition-colors duration-300`;
  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300 as const,
    fontSize: "0.88rem",
    background: c.inputBg,
    borderColor: c.borderMedium,
    color: c.textPrimary,
  };

  return (
    <section id="contact" className="py-28" style={{ background: c.sectionMid }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: c.accent }} />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em", color: c.accent }}
              className="uppercase"
            >
              Get In Touch
            </span>
            <div className="h-px w-10" style={{ background: c.accent }} />
          </div>
          <h2
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.15, color: c.textPrimary }}
            className="text-4xl md:text-5xl"
          >
            Get In <span className="italic" style={{ color: c.accent }}>Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div>
              <h3
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.35rem", lineHeight: 1.2, color: c.textPrimary }}
                className="mb-3"
              >
                We'd Love To Hear From You
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.8, color: c.textSecondary }}
              >
                Have a question or need guidance? Our team is here to help, seamlessly.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href="tel:+919000090000"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center transition-colors duration-400 flex-shrink-0 group-hover:bg-[var(--t-accent)]"
                  style={{ background: c.cardBgSubtle }}
                >
                  <Phone
                    size={18}
                    className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
                    style={{ color: c.accent }}
                  />
                </div>
                <div>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em", color: c.textMuted }}
                    className="uppercase block"
                  >
                    Call Us
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem", color: c.textPrimary }}
                    className="group-hover:text-[var(--t-accent)] transition-colors"
                  >
                    +91 9000090000
                  </span>
                </div>
              </a>

              <a
                href="mailto:connect@amaanindia.com"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center transition-colors duration-400 flex-shrink-0 group-hover:bg-[var(--t-accent)]"
                  style={{ background: c.cardBgSubtle }}
                >
                  <Mail
                    size={18}
                    className="transition-colors duration-400 group-hover:text-[var(--t-on-accent)]"
                    style={{ color: c.accent }}
                  />
                </div>
                <div>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em", color: c.textMuted }}
                    className="uppercase block"
                  >
                    Email Us
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem", color: c.textPrimary }}
                    className="group-hover:text-[var(--t-accent)] transition-colors"
                  >
                    connect@amaanindia.com
                  </span>
                </div>
              </a>

              {/* <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: c.cardBgSubtle }}
                >
                  <MapPin size={18} style={{ color: c.accent }} />
                </div>
                <div>
                  <span
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em", color: c.textMuted }}
                    className="uppercase block"
                  >
                    Office
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.6, color: c.textSecondary }}
                  >
                    304, DLF Corporate Park, Sector 74A, Gurugram, Haryana 122004
                  </span>
                </div>
              </div> */}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919000090000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-4 transition-all duration-300 group self-start"
            >
              <MessageCircle size={20} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em" }} className="uppercase">
                Chat on WhatsApp
              </span>
            </a>

            {/* Map */}
            <div
              className="rounded-sm overflow-hidden flex-1 min-h-[200px]"
              style={{ border: `1px solid ${c.borderMedium}` }}
            >
              <iframe
                title="Amaan India Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6!2d77.089!3d28.459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzMyLjQiTiA3N8KwMDUnMjAuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, filter: c.mapFilter }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 md:p-10"
              style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <CheckCircle size={56} style={{ color: c.accent }} />
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.5rem", color: c.textPrimary }}
                    className="text-center"
                  >
                    Message Received!
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: c.textSecondary }}
                    className="text-center"
                  >
                    Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", color: c.accent }}
                        className="uppercase block mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        style={{ ...inputStyle }}
                        onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
                        onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
                      />
                    </div>
                    <div>
                      <label
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", color: c.accent }}
                        className="uppercase block mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        style={{ ...inputStyle }}
                        onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
                        onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", color: c.accent }}
                      className="uppercase block mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      style={{ ...inputStyle }}
                      onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
                      onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
                    />
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", color: c.accent }}
                      className="uppercase block mb-2"
                    >
                      Property Interest
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                      style={{ ...inputStyle }}
                      onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
                      onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
                    >
                      <option value="" style={{ background: c.inputBg }}>Select your interest</option>
                      <option value="Residential" style={{ background: c.inputBg }}>Residential Property</option>
                      <option value="Commercial" style={{ background: c.inputBg }}>Commercial Property</option>
                      <option value="Luxury" style={{ background: c.inputBg }}>Luxury Segment</option>
                      <option value="Investment" style={{ background: c.inputBg }}>Real Estate Investment</option>
                      <option value="Loan" style={{ background: c.inputBg }}>Home Loan Assistance</option>
                      <option value="Other" style={{ background: c.inputBg }}>Other Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", color: c.accent }}
                      className="uppercase block mb-2"
                    >
                      Message / Property Requirements
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your requirements — budget, preferred location, configuration, timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      style={{ ...inputStyle }}
                      onFocus={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.accent}
                      onBlur={(e) => (e.currentTarget as HTMLElement).style.borderColor = c.borderMedium}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(${c.accentRgb},0.4)` }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-5 transition-all duration-300"
                    style={{ background: c.accent, color: c.onAccent, opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                  >
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em" }} className="uppercase">
                      {submitting ? "Sending..." : "Submit Enquiry"}
                    </span>
                    <Send size={16} />
                  </motion.button>

                  {submitError && (
                    <p
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.78rem", color: "#fca5a5" }}
                      className="text-center"
                    >
                      {submitError}
                    </p>
                  )}

                  <p
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: c.textMuted }}
                    className="text-center"
                  >
                    By submitting, you agree to our Privacy Policy. We'll never spam you.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
