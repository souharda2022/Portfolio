// src/services/api.js
import axios from "axios";

/**
 * Modes
 * -----
 * Static (GitHub Pages):
 *   - set REACT_APP_USE_STATIC=1 in .env.production
 *   - set REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
 *   - optional: put JSON data under public/data/*.json
 *
 * Dynamic (local/backend):
 *   - set REACT_APP_BACKEND_URL (e.g., http://localhost:8001)
 *   - form submits go to `${REACT_APP_BACKEND_URL}/api/contact`
 */

const USE_STATIC = process.env.REACT_APP_USE_STATIC === "1";
const API_URL = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const PUBLIC_JSON = (name) =>
  `${process.env.PUBLIC_URL || ""}/data/${name}.json`;

const getStatic = (name) => axios.get(PUBLIC_JSON(name)).then((r) => r.data);

// ---------------- Portfolio API ----------------
export const portfolioAPI = {
  getPortfolio: () =>
    USE_STATIC
      ? getStatic("portfolio")
      : axios.get(`${API_URL}/portfolio`).then((r) => r.data),

  getProjects: () =>
    USE_STATIC
      ? getStatic("projects")
      : axios.get(`${API_URL}/portfolio/projects`).then((r) => r.data),

  getExperience: () =>
    USE_STATIC
      ? getStatic("experience")
      : axios.get(`${API_URL}/portfolio/experience`).then((r) => r.data),

  getSkills: () =>
    USE_STATIC
      ? getStatic("skills")
      : axios.get(`${API_URL}/portfolio/skills`).then((r) => r.data),
};

// ---------------- Contact API ----------------
// Static mode: POST directly to Formspree (or compatible form service)
const FORMSPREE = process.env.REACT_APP_FORMSPREE_ENDPOINT || "";

// Defensive JSON parse (Formspree may return empty body on success)
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const contactAPI = {
  /**
   * submitContact({ name, email, subject, message })
   * - In static mode: POSTs FormData to REACT_APP_FORMSPREE_ENDPOINT
   * - In dynamic mode: POSTs JSON to `${API_URL}/contact`
   * Returns: { message: string }
   */
  submitContact: async ({ name, email, subject, message }) => {
    if (USE_STATIC) {
      if (!FORMSPREE) {
        throw new Error(
          "Static mode: Missing REACT_APP_FORMSPREE_ENDPOINT in .env.production"
        );
      }

      // Use FormData (preferred by Formspree)
      const data = new FormData();
      data.append("name", name || "");
      data.append("email", email || "");
      data.append("subject", subject || "");
      data.append("message", message || "");

      // Honeypot field to deter basic bots
      data.append("_gotcha", "");

      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" }, // ask for JSON if available
        body: data,
      });

      if (!res.ok) {
        const err = await safeJson(res);
        throw new Error(err?.error || "Form submission failed");
      }

      const json = await safeJson(res);
      const ok =
        json?.ok === true ||
        json?.status === "success" ||
        res.status >= 200 && res.status < 300;

      return {
        message: ok
          ? "Thanks! Your message was sent."
          : "Message sent. (No response body)",
      };
    }

    // Dynamic / dev backend path (JSON)
    const { data: resp } = await axios.post(`${API_URL}/contact`, {
      name,
      email,
      subject,
      message,
    });
    // Normalize return to match the static path expectation
    return { message: resp?.message || "Thanks! Your message was sent." };
  },

  getContacts: async () => {
    if (USE_STATIC) return []; // not supported on static hosting
    const { data } = await axios.get(`${API_URL}/contacts`);
    return data;
  },
};

export const isStaticMode = () => USE_STATIC;
