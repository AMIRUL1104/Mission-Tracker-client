const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const metricService = {
  // Get all metrics by monthId
  getMetrics: async (monthId, token) => {
    const res = await fetch(`${API_BASE}/metrics/${monthId}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return await res.json();
  },

  // Create a new metric
  createMetric: async (data, token) => {
    const res = await fetch(`${API_BASE}/metrics`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Update metric
  updateMetric: async (id, data, token) => {
    const res = await fetch(`${API_BASE}/metrics/${id}`, {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Delete metric
  deleteMetric: async (id, token) => {
    const res = await fetch(`${API_BASE}/metrics/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });
    return await res.json();
  },
};
