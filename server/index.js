import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "change-this-in-production";

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in environment.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
  }),
);
app.use(express.json());

function buildExcerpt(content = "") {
  const trimmed = content.trim();
  if (trimmed.length <= 170) return trimmed;
  return `${trimmed.slice(0, 167)}...`;
}

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS dashboard_users (
      id SERIAL PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      pass_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_entries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      interest TEXT,
      message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

async function ensureDefaultAdmin() {
  const adminId = process.env.DASHBOARD_ADMIN_ID;
  const adminPass = process.env.DASHBOARD_ADMIN_PASS;

  if (!adminId || !adminPass) {
    return;
  }

  const existing = await pool.query(
    "SELECT id FROM dashboard_users WHERE user_id = $1 LIMIT 1",
    [adminId],
  );

  if (existing.rowCount && existing.rowCount > 0) {
    return;
  }

  const passHash = await bcrypt.hash(adminPass, 10);
  await pool.query(
    "INSERT INTO dashboard_users (user_id, pass_hash) VALUES ($1, $2)",
    [adminId, passHash],
  );

  console.log(`Seeded dashboard user: ${adminId}`);
}

async function ensureDefaultBlogs() {
  const check = await pool.query("SELECT COUNT(*)::int AS count FROM blogs");
  const count = check.rows[0]?.count || 0;
  if (count > 0) return;

  const seedBlogs = [
    {
      title: "Designing Calm in Urban Environments",
      content:
        "True luxury in contemporary development is not excess, but clarity. At Amaan, our planning process focuses on proportion, daylight, circulation, and material consistency to create environments that feel composed and restorative.",
      author: "Amaan Editorial",
    },
    {
      title: "How Material Integrity Creates Long-Term Value",
      content:
        "Construction decisions have long-term consequences. Durable finishes, robust structural choices, and practical detailing help reduce lifecycle costs while preserving aesthetic quality. This is central to our development philosophy.",
      author: "Amaan Editorial",
    },
    {
      title: "Residential, Commercial, and Institutional: A Unified Approach",
      content:
        "Different typologies require different functional priorities, but the foundation remains the same: intentional planning, disciplined execution, and contextual design. We apply these principles across all project categories.",
      author: "Amaan Editorial",
    },
    {
      title: "Why Understated Architecture Ages Better",
      content:
        "Architecture that relies on timeless proportions and coherent detailing tends to remain relevant longer. We pursue restraint and precision so that our spaces mature gracefully over time rather than feeling dated after trends shift.",
      author: "Amaan Editorial",
    },
  ];

  for (const item of seedBlogs) {
    await pool.query(
      "INSERT INTO blogs (title, excerpt, content, author) VALUES ($1, $2, $3, $4)",
      [item.title, buildExcerpt(item.content), item.content, item.author],
    );
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/blogs", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 6), 12);
    const result = await pool.query(
      `
      SELECT id, title, excerpt, content, author, created_at
      FROM blogs
      ORDER BY created_at DESC
      LIMIT $1
      `,
      [limit],
    );

    res.json({ blogs: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, interest = "", message = "" } = req.body || {};

  if (!name || !phone || !email) {
    return res.status(400).json({ error: "Name, phone, and email are required." });
  }

  try {
    await pool.query(
      `
      INSERT INTO contact_entries (name, phone, email, interest, message)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name.trim(), phone.trim(), email.trim(), interest.trim(), message.trim()],
    );

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to submit contact form" });
  }
});

app.post("/api/dashboard/login", async (req, res) => {
  const { userId, password } = req.body || {};

  if (!userId || !password) {
    return res.status(400).json({ error: "User ID and password are required." });
  }

  try {
    const result = await pool.query(
      "SELECT user_id, pass_hash FROM dashboard_users WHERE user_id = $1 LIMIT 1",
      [userId.trim()],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const matched = await bcrypt.compare(password, user.pass_hash);

    if (!matched) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "12h" });

    return res.json({ token, userId: user.user_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/dashboard/contacts", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name, phone, email, interest, message, created_at
      FROM contact_entries
      ORDER BY created_at DESC
      LIMIT 200
      `,
    );

    return res.json({ contacts: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch contact entries" });
  }
});

app.get("/api/dashboard/blogs", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, title, excerpt, content, author, created_at
      FROM blogs
      ORDER BY created_at DESC
      LIMIT 200
      `,
    );

    return res.json({ blogs: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dashboard blogs" });
  }
});

app.post("/api/dashboard/blogs", requireAuth, async (req, res) => {
  const { title, excerpt = "", content, author = "" } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  try {
    const safeAuthor = author.trim() || req.user.userId || "Amaan Editorial";
    const safeExcerpt = excerpt.trim() || buildExcerpt(content);

    const result = await pool.query(
      `
      INSERT INTO blogs (title, excerpt, content, author)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, excerpt, content, author, created_at
      `,
      [title.trim(), safeExcerpt, content.trim(), safeAuthor],
    );

    return res.status(201).json({ blog: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create blog" });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Unexpected server error" });
});

async function start() {
  try {
    await ensureSchema();
    await ensureDefaultAdmin();
    await ensureDefaultBlogs();

    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to boot server", error);
    process.exit(1);
  }
}

start();
