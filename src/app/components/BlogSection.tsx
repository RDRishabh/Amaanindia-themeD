import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, PenLine, UserRound } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
import { fetchBlogs, type Blog } from "../lib/api";

const c = getThemeColors();

const fallbackBlogs: Blog[] = [
  {
    id: -1,
    title: "Designing Spaces That Stay Relevant",
    excerpt:
      "Amaan focuses on clarity, restraint, and proportion to create environments that feel refined today and remain meaningful over time.",
    content:
      "Amaan focuses on clarity, restraint, and proportion to create environments that feel refined today and remain meaningful over time.",
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
  {
    id: -2,
    title: "Material Integrity as a Long-Term Strategy",
    excerpt:
      "From structure to finish, every decision is made with durability and lifecycle value in mind to ensure each project ages gracefully.",
    content:
      "From structure to finish, every decision is made with durability and lifecycle value in mind to ensure each project ages gracefully.",
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
  {
    id: -3,
    title: "Purposeful Development Across Typologies",
    excerpt:
      "Residential, commercial, and institutional projects each demand different priorities, but all are guided by intent, precision, and relevance.",
    content:
      "Residential, commercial, and institutional projects each demand different priorities, but all are guided by intent, precision, and relevance.",
    author: "Amaan Editorial",
    created_at: new Date().toISOString(),
  },
];

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
              At the intersection of innovation and elegance, Amaan India reimagines modern real estate through purposeful design, superior craftsmanship, and a commitment to delivering enduring value.
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
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative p-8 group"
                  style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                    style={{ background: `linear-gradient(to right, ${c.accent}, transparent)` }}
                  />

                  <div
                    className="w-11 h-11 flex items-center justify-center mb-5"
                    style={{ background: c.cardBgSubtle }}
                  >
                    <PenLine size={18} style={{ color: c.accent }} />
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
                    className="mb-3"
                  >
                    {blog.title}
                  </h3>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.75, color: c.textSecondary }}>
                    {blog.excerpt}
                  </p>
                </motion.article>
              ))}

              {!blogs.length && (
                <div className="p-8" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
                  <p style={{ color: c.textSecondary }}>No blogs yet. Publish your first post from the dashboard.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
