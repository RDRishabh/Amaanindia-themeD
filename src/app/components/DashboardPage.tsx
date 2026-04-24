import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileText, Inbox, Lock, PlusCircle, User } from "lucide-react";
import { getThemeColors } from "../../styles/themes";
import {
  createDashboardBlog,
  fetchDashboardBlogs,
  fetchDashboardContacts,
  loginDashboard,
  type Blog,
  type ContactEntry,
} from "../lib/api";

const c = getThemeColors();
const DASHBOARD_TOKEN_KEY = "amaan_dashboard_token";
const DASHBOARD_USER_KEY = "amaan_dashboard_user";

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DashboardPage() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
  });

  const isLoggedIn = useMemo(() => Boolean(token), [token]);

  useEffect(() => {
    const savedToken = localStorage.getItem(DASHBOARD_TOKEN_KEY) || "";
    const savedUser = localStorage.getItem(DASHBOARD_USER_KEY) || "";

    if (savedToken) {
      setToken(savedToken);
      setActiveUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const [blogRows, contactRows] = await Promise.all([
          fetchDashboardBlogs(token),
          fetchDashboardContacts(token),
        ]);
        setBlogs(blogRows);
        setContacts(contactRows);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard data.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const result = await loginDashboard(userId.trim(), password);
      localStorage.setItem(DASHBOARD_TOKEN_KEY, result.token);
      localStorage.setItem(DASHBOARD_USER_KEY, result.userId);
      setToken(result.token);
      setActiveUser(result.userId);
      setPassword("");
      setNotice("Login successful.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(DASHBOARD_TOKEN_KEY);
    localStorage.removeItem(DASHBOARD_USER_KEY);
    setToken("");
    setActiveUser("");
    setBlogs([]);
    setContacts([]);
    setNotice("Logged out.");
  };

  const handleCreateBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    setError("");
    setNotice("");
    setLoading(true);

    try {
      const created = await createDashboardBlog(token, {
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        author: blogForm.author || activeUser,
      });
      setBlogs((prev) => [created, ...prev]);
      setBlogForm({ title: "", excerpt: "", content: "", author: "" });
      setNotice("Blog published successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to create blog.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: c.sectionDark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <a
            href="/"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              color: c.textSecondary,
              textDecoration: "none",
            }}
            className="uppercase inline-flex items-center gap-2 hover:text-[var(--t-accent)]"
          >
            <ArrowLeft size={14} />
            Back to Site
          </a>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: c.accent,
                color: c.onAccent,
                padding: "10px 18px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout ({activeUser})
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, lineHeight: 1.1, color: c.textPrimary }}
            className="text-3xl md:text-5xl mb-3"
          >
            Content & Enquiries <span className="italic" style={{ color: c.accent }}>Dashboard</span>
          </h1>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8, color: c.textSecondary }}
            className="max-w-3xl"
          >
            Securely sign in with your dashboard ID and password. Create blog posts and review all Get In Touch form submissions from one place.
          </p>
        </motion.div>

        {error && (
          <div className="mb-5 p-4" style={{ border: `1px solid #b91c1c`, color: "#fecaca", background: "rgba(185,28,28,0.15)" }}>
            {error}
          </div>
        )}

        {notice && (
          <div className="mb-5 p-4" style={{ border: `1px solid ${c.borderSubtle}`, color: c.textPrimary, background: c.cardBg }}>
            {notice}
          </div>
        )}

        {!isLoggedIn ? (
          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl p-8 space-y-5"
            style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Lock size={18} style={{ color: c.accent }} />
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.2rem", color: c.textPrimary }}>
                Dashboard Login
              </h2>
            </div>

            <div>
              <label className="uppercase block mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", color: c.accent }}>
                ID
              </label>
              <input
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 border"
                style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                placeholder="dashboard admin id"
              />
            </div>

            <div>
              <label className="uppercase block mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", color: c.accent }}>
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border"
                style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                placeholder="your secure password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3"
              style={{
                background: c.accent,
                color: c.onAccent,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.74rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <User size={14} />
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </motion.form>
        ) : (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="space-y-8">
              <section className="p-8" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
                <div className="flex items-center gap-3 mb-6">
                  <PlusCircle size={18} style={{ color: c.accent }} />
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.15rem", color: c.textPrimary }}>
                    Write a Blog
                  </h2>
                </div>

                <form onSubmit={handleCreateBlog} className="space-y-4">
                  <input
                    required
                    placeholder="Blog Title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border"
                    style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                  />
                  <input
                    placeholder="Excerpt (optional)"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-4 py-3 border"
                    style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                  />
                  <input
                    placeholder="Author (optional)"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border"
                    style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                  />
                  <textarea
                    required
                    rows={7}
                    placeholder="Write your blog content..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 border resize-none"
                    style={{ background: c.inputBg, borderColor: c.borderMedium, color: c.textPrimary }}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: c.accent,
                      color: c.onAccent,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      padding: "12px 18px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {loading ? "Publishing..." : "Publish Blog"}
                  </button>
                </form>
              </section>

              <section className="p-8" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
                <div className="flex items-center gap-3 mb-5">
                  <FileText size={18} style={{ color: c.accent }} />
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: c.textPrimary }}>
                    Published Blogs ({blogs.length})
                  </h2>
                </div>

                <div className="space-y-4 max-h-[440px] overflow-auto pr-2">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="p-4" style={{ border: `1px solid ${c.borderSubtle}`, background: c.inputBg }}>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: c.textPrimary }} className="mb-2">
                        {blog.title}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: c.textSecondary }} className="mb-2">
                        {blog.excerpt}
                      </p>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.72rem", color: c.textMuted }}>
                        {blog.author} · {formatDate(blog.created_at)}
                      </span>
                    </div>
                  ))}
                  {!blogs.length && <p style={{ color: c.textMuted }}>No blogs yet.</p>}
                </div>
              </section>
            </div>

            <section className="p-8" style={{ background: c.cardBg, border: `1px solid ${c.borderSubtle}` }}>
              <div className="flex items-center gap-3 mb-5">
                <Inbox size={18} style={{ color: c.accent }} />
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: c.textPrimary }}>
                  Get In Touch Entries ({contacts.length})
                </h2>
              </div>

              <div className="space-y-4 max-h-[920px] overflow-auto pr-2">
                {contacts.map((entry) => (
                  <div key={entry.id} className="p-4" style={{ border: `1px solid ${c.borderSubtle}`, background: c.inputBg }}>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.92rem", color: c.textPrimary }}>
                        {entry.name}
                      </h3>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.7rem", color: c.textMuted }}>
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.8rem", color: c.textSecondary }}>
                      {entry.email} · {entry.phone}
                    </p>
                    {entry.interest && (
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.76rem", color: c.accent }} className="mt-1">
                        Interest: {entry.interest}
                      </p>
                    )}
                    {entry.message && (
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: c.textSecondary }} className="mt-2">
                        {entry.message}
                      </p>
                    )}
                  </div>
                ))}
                {!contacts.length && <p style={{ color: c.textMuted }}>No enquiries yet.</p>}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
