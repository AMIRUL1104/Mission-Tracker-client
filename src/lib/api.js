// lib/api.js - Centralized API client

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add JWT token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "An error occurred" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  auth: {
    register(data) {
      return api.request("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    login(data) {
      return api.request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    logout() {
      return api.request("/auth/logout", {
        method: "POST",
      });
    },

    getMe() {
      return api.request("/auth/me");
    },
  },
};
