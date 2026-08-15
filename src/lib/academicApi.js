const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const academicService = {
  // Get all academics for a month
  getAcademics: async (monthId, token) => {
    const res = await fetch(`${API_BASE}/academics/${monthId}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return await res.json();
  },

  // Create subject
  createAcademic: async (data, token) => {
    const res = await fetch(`${API_BASE}/academics`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Update subject details
  updateAcademic: async (id, data, token) => {
    const res = await fetch(`${API_BASE}/academics/${id}`, {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Delete subject
  deleteAcademic: async (id, token) => {
    const res = await fetch(`${API_BASE}/academics/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });
    return await res.json();
  },

  // Add Chapter
  addChapter: async (academicId, title, token) => {
    const res = await fetch(`${API_BASE}/academics/${academicId}/chapters`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ title }),
    });
    return await res.json();
  },

  // Update Chapter (Toggle complete / rename)
  updateChapter: async (chapterId, data, token) => {
    const res = await fetch(`${API_BASE}/academics/chapters/${chapterId}`, {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Delete Chapter
  deleteChapter: async (chapterId, token) => {
    const res = await fetch(`${API_BASE}/academics/chapters/${chapterId}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });
    return await res.json();
  },

  // Update Weekly Hours
  updateWeekHours: async (academicId, weekId, hoursSpent, token) => {
    const res = await fetch(
      `${API_BASE}/academics/${academicId}/weeks/${weekId}`,
      {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify({ hoursSpent }),
      },
    );
    return await res.json();
  },
};
