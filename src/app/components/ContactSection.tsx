import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", interest: "", message: "" });
  };

  const inputClass = `w-full bg-[#111111] border border-[#2a2a2a] focus:border-[#C9A84C] text-white placeholder-white/30 px-4 py-4 outline-none transition-colors duration-300`;
  const inputStyle = { fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem" };

  return (
    <section id="contact" className="py-28 bg-[#0d0d0d]">
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
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.25em" }}
              className="text-[#C9A84C] uppercase"
            >
              Get In Touch
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.15 }}
            className="text-white text-4xl md:text-5xl"
          >
            Get Expert <span className="italic text-[#C9A84C]">Property Advice</span>
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
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.6rem", lineHeight: 1.2 }}
                className="text-white mb-3"
              >
                We'd Love To Hear From You
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.8 }}
                className="text-white/50"
              >
                Whether you're a salaried professional, a real estate investor, or a commercial buyer — reach out for a complimentary consultation. No obligations, just clear expert guidance.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href="tel:9540005050"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-[#1a1a1a] group-hover:bg-[#C9A84C] flex items-center justify-center transition-colors duration-400 flex-shrink-0">
                  <Phone size={18} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-400" />
                </div>
                <div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em" }} className="text-white/40 uppercase block">Call Us</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem" }} className="text-white group-hover:text-[#C9A84C] transition-colors">+91 95400 05050</span>
                </div>
              </a>

              <a
                href="mailto:info@amaanindia.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-[#1a1a1a] group-hover:bg-[#C9A84C] flex items-center justify-center transition-colors duration-400 flex-shrink-0">
                  <Mail size={18} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-400" />
                </div>
                <div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em" }} className="text-white/40 uppercase block">Email Us</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "1rem" }} className="text-white group-hover:text-[#C9A84C] transition-colors">info@amaanindia.com</span>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.1em" }} className="text-white/40 uppercase block">Office</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.6 }} className="text-white/70">304, DLF Corporate Park, Sector 74A, Gurugram, Haryana 122004</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919540005050"
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
            <div className="rounded-sm overflow-hidden border border-[#2a2a2a] flex-1 min-h-[200px]">
              <iframe
                title="Amaan India Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6!2d77.089!3d28.459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzMyLjQiTiA3N8KwMDUnMjAuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
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
            <div className="bg-[#111111] border border-[#1e1e1e] p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <CheckCircle size={56} className="text-[#C9A84C]" />
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.8rem" }}
                    className="text-white text-center"
                  >
                    Message Received!
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem" }}
                    className="text-white/50 text-center"
                  >
                    Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em" }} className="text-[#C9A84C] uppercase block mb-2">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em" }} className="text-[#C9A84C] uppercase block mb-2">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em" }} className="text-[#C9A84C] uppercase block mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em" }} className="text-[#C9A84C] uppercase block mb-2">
                      Property Interest
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                      style={inputStyle}
                    >
                      <option value="" className="bg-[#111111]">Select your interest</option>
                      <option value="Residential" className="bg-[#111111]">Residential Property</option>
                      <option value="Commercial" className="bg-[#111111]">Commercial Property</option>
                      <option value="Luxury" className="bg-[#111111]">Luxury Segment</option>
                      <option value="Investment" className="bg-[#111111]">Real Estate Investment</option>
                      <option value="Loan" className="bg-[#111111]">Home Loan Assistance</option>
                      <option value="Other" className="bg-[#111111]">Other Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em" }} className="text-[#C9A84C] uppercase block mb-2">
                      Message / Property Requirements
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your requirements — budget, preferred location, configuration, timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#C9A84C] hover:bg-[#B8963E] text-[#0a0a0a] flex items-center justify-center gap-3 py-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
                  >
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em" }} className="uppercase">
                      Get Expert Property Advice
                    </span>
                    <Send size={16} />
                  </motion.button>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem" }} className="text-white/30 text-center">
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