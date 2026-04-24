export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
};

export type ContactEntry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = options.headers
    ? { "Content-Type": "application/json", ...options.headers }
    : { "Content-Type": "application/json" };

  const response = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data as T;
}

export async function fetchBlogs(limit = 6): Promise<Blog[]> {
  const data = await request<{ blogs: Blog[] }>(`/api/blogs?limit=${limit}`);
  return data.blogs;
}

export async function submitContact(payload: {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}) {
  return request<{ success: boolean }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginDashboard(userId: string, password: string) {
  return request<{ token: string; userId: string }>("/api/dashboard/login", {
    method: "POST",
    body: JSON.stringify({ userId, password }),
  });
}

export async function fetchDashboardBlogs(token: string): Promise<Blog[]> {
  const data = await request<{ blogs: Blog[] }>("/api/dashboard/blogs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.blogs;
}

export async function createDashboardBlog(
  token: string,
  payload: { title: string; excerpt: string; content: string; author: string },
): Promise<Blog> {
  const data = await request<{ blog: Blog }>("/api/dashboard/blogs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return data.blog;
}

export async function fetchDashboardContacts(token: string): Promise<ContactEntry[]> {
  const data = await request<{ contacts: ContactEntry[] }>("/api/dashboard/contacts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.contacts;
}
