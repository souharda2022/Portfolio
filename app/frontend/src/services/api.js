// src/services/api.js
import axios from "axios";

/**
 * Static mode (for GitHub Pages):
 * - Set REACT_APP_USE_STATIC=1 in .env.production
 * - Put JSON files in public/data/*.json
 * Local/dev mode:
 * - Use REACT_APP_BACKEND_URL (e.g., http://localhost:8001)
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
// In static mode, post to a third-party form service (e.g., Formspree)
const FORMSPREE = process.env.REACT_APP_FORMSPREE_ENDPOINT || "";

export const contactAPI = {
  submitContact: async (data) => {
    if (USE_STATIC) {
      if (!FORMSPREE) {
        throw new Error(
          "Static mode: Set REACT_APP_FORMSPREE_ENDPOINT in .env.production to enable contact form."
        );
      }
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Form submission failed");
      return { ok: true };
    }
    // dev/local backend
    return axios.post(`${API_URL}/contact`, data).then((r) => r.data);
  },

  getContacts: async () => {
    if (USE_STATIC) return []; // not supported in static hosting
    return axios.get(`${API_URL}/contacts`).then((r) => r.data);
  },
};

export const isStaticMode = () => USE_STATIC;
