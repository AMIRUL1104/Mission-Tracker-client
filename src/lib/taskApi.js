const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchTasksByMonth = async (monthId, token) => {
  const res = await fetch(`${API_BASE_URL}/tasks/month/${monthId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTaskApi = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const toggleDailyCheckApi = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/tasks/toggle-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTaskApi = async (taskId, token) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
