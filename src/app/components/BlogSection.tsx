import { motion, AnimatePresence, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, BookOpen, UserRound, X } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
import { fetchBlogs, type Blog } from "../lib/api";

const c = getThemeColors();

const fallbackBlogs: Blog[] = [
  {
    id: -1,
    title: "Designing Spaces That Stay Relevant",
    excerpt:
      "Amaan focuses on clarity, restraint and proportion to create environments that feel refined today and remain meaningful over time.",
    content: `True architectural relevance is rarely loud. It is built through disciplined proportions, material continuity and spaces that support real life over many years. At Amaan, design begins with intent and evolves through a process that balances functionality with lasting visual calm.

We believe people should feel immediately grounded in the environments they inhabit. This means clear circulation, natural light where it matters most and details that reduce visual noise rather than add it.

When development is approached with restraint and precision, spaces do not just impress at launch - they continue to feel complete, coherent and contemporary over time.`,
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
  {
    id: -2,
    title: "Material Integrity as a Long-Term Strategy",
    excerpt:
      "From structure to finish, every decision is made with durability and lifecycle value in mind to ensure each project ages gracefully.",
    content: `Material selection is not only an aesthetic decision. It is a long-term commitment that determines how well a space performs through daily use, seasonal change and time. At Amaan, we evaluate finishes, systems and construction assemblies through a lifecycle lens.

Our focus is to build environments that remain dependable and elegant, not just visually strong at handover. This includes practical detailing, robust structural choices and execution standards that reduce long-term maintenance stress.

In our approach, quality is not an upgrade. It is the baseline that protects value, preserves design integrity and strengthens user trust for years ahead.`,
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
  {
    id: -3,
    title: "Purposeful Development Across Typologies",
    excerpt:
      "Residential, commercial and institutional projects each demand different priorities, but all are guided by intent, precision and relevance.",
    content: `Each project typology has its own demands. Residential spaces prioritize comfort and liveability. Commercial environments require efficiency and adaptability. Institutional developments must support purpose with clarity and permanence.

At Amaan, we do not force one template across all categories. Instead, we apply a unified methodology: clear briefing, contextual design and execution discipline tailored to the project's role and users.

This is how we create developments that are not only functional in the present, but also durable in relevance - serving people, institutions and communities with confidence.`,
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
];

function splitContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const hasDom = globalThis.document !== undefined;

  useEffect(() => {
    let active = true;

    const loadBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const rows = await fetchBlogs(6);
        if (!active) return;

        if (rows.length > 0) {
          setBlogs(rows);
        } else {
          setBlogs(fallbackBlogs);
          setError("No live blogs yet. Showing featured articles.");
        }
      } catch (err) {
        if (!active) return;
        console.error("Blog fetch failed:", err);
        setBlogs(fallbackBlogs);
        setError("Live blogs unavailable right now. Showing featured articles.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!activeBlog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveBlog(null);
      }
    };

    globalThis.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      globalThis.removeEventListener("keydown", handleEsc);
    };
  }, [activeBlog]);

  return (
    <section id="blog" className="py-24" style={{ background: c.sectionWhite }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: c.accent }} />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: c.accent,
              }}
              className="uppercase"
            >
              Blog
            </span>
            <div className="h-px w-10" style={{ background: c.accent }} />
          </div>

          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.2, color: c.textPrimary }}
              className="text-3xl md:text-4xl mb-5"
            >
              Insights From <span className="italic" style={{ color: c.accent }}>Amaan India</span>
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.9, color: c.textSecondary }}
              className="max-w-4xl mx-auto"
            >
              At the intersection of innovation and elegance, Amaan India reimagines modern real estate through purposeful design, superior craftsmanship and a commitment to delivering enduring value.
            </p>
          </div>

          {loading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {["one", "two", "three"].map((key) => (
                <div
                  key={`skeleton-${key}`}
                  className="p-8 animate-pulse"
                  style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
                >
                  <div className="w-10 h-10 mb-5" style={{ background: c.cardBgSubtle }} />
                  <div className="h-4 w-20 mb-4" style={{ background: c.cardBgSubtle }} />
                  <div className="h-6 w-3/4 mb-3" style={{ background: c.cardBgSubtle }} />
                  <div className="h-4 w-full mb-2" style={{ background: c.cardBgSubtle }} />
                  <div className="h-4 w-5/6" style={{ background: c.cardBgSubtle }} />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-4 text-center mb-6" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
              <p style={{ color: c.textSecondary }}>{error}</p>
            </div>
          )}

          {!loading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogs.map((blog, idx) => (
                <motion.button
                  key={blog.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative p-8 group text-left transition-all duration-400 hover:shadow-2xl hover:-translate-y-1.5 hover:!border-[var(--t-accent)]"
                  style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
                  onClick={() => setActiveBlog(blog)}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                    style={{ background: `linear-gradient(to right, ${c.accent}, transparent)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-all duration-350"
                    style={{
                      background: `linear-gradient(135deg, rgba(${c.accentRgb}, 0.12) 0%, rgba(${c.accentRgb}, 0.03) 100%)`,
                      border: `1px solid rgba(${c.accentRgb}, 0.28)`,
                      boxShadow: `0 4px 10px rgba(${c.accentRgb}, 0.06)`,
                    }}
                  >
                    <BookOpen size={18} style={{ color: c.accent }} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem", color: c.textMuted }}>
                      <CalendarDays size={12} />
                      {formatDate(blog.created_at)}
                    </span>
                    <span style={{ color: c.borderMedium }}>•</span>
                    <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem", color: c.textMuted }}>
                      <UserRound size={12} />
                      {blog.author}
                    </span>
                  </div>

                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.35, color: c.textPrimary }}
                    className="mb-3 transition-colors duration-300 group-hover:text-[var(--t-accent)]"
                  >
                    {blog.title}
                  </h3>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.75, color: c.textSecondary }}>
                    {blog.excerpt}
                  </p>

                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      color: c.accent,
                    }}
                    className="uppercase inline-flex items-center gap-1 mt-5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    Read Full Article &rarr;
                  </span>
                </motion.button>
              ))}

              {!blogs.length && (
                <div className="p-8" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
                  <p style={{ color: c.textSecondary }}>No blogs yet. Publish your first post from the dashboard.</p>
                </div>
              )}
            </div>
          )}

          {hasDom &&
            createPortal(
              <AnimatePresence>
                {activeBlog && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] grid place-items-center p-4 md:p-8"
                  >
                    <button
                      type="button"
                      className="absolute inset-0"
                      style={{ background: "rgba(6, 12, 9, 0.78)", backdropFilter: "blur(7px)" }}
                      onClick={() => setActiveBlog(null)}
                      aria-label="Close blog overlay"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="relative w-full max-w-4xl max-h-[88vh] overflow-hidden"
                      style={{ background: c.cardBg, border: `1px solid ${c.borderMedium}` }}
                    >
                      <div className="px-7 md:px-10 py-6 border-b" style={{ borderColor: c.borderSubtle }}>
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: c.textMuted }}>
                                <CalendarDays size={12} />
                                {formatDate(activeBlog.created_at)}
                              </span>
                              <span style={{ color: c.borderMedium }}>•</span>
                              <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: c.textMuted }}>
                                <UserRound size={12} />
                                {activeBlog.author}
                              </span>
                            </div>

                            <h3
                              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, lineHeight: 1.3, color: c.textPrimary }}
                              className="text-2xl md:text-3xl"
                            >
                              {activeBlog.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveBlog(null)}
                            aria-label="Close"
                            className="w-10 h-10 flex items-center justify-center shrink-0"
                            style={{ border: `1px solid ${c.borderSubtle}`, color: c.textSecondary }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="px-7 md:px-10 py-7 overflow-auto max-h-[calc(88vh-140px)]">
                        {splitContent(activeBlog.content).map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 40)}
                            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.96rem", lineHeight: 1.95, color: c.textSecondary }}
                            className="mb-5"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              globalThis.document.body,
            )}
        </motion.div>
      </div>
    </section>
  );
}
