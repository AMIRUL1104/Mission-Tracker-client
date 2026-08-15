const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const overviewService = {
  // Get complete dashboard overview data by monthId
  getOverview: async (monthId, token) => {
    const res = await fetch(`${API_BASE}/overview/${monthId}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return await res.json();
  },
};
