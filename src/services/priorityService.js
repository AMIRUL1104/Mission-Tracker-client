const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ১. নির্দিষ্ট মাসের Priorities আনা
export const fetchPrioritiesByMonth = async (monthId, token) => {
  const res = await fetch(`${API_BASE_URL}/priorities/month/${monthId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// ২. নতুন Priority তৈরি করা
export const createPriorityApi = async (data, token) => {
  const res = await fetch(`${API_BASE_URL}/priorities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ৩. Priority ডিলিট করা
export const deletePriorityApi = async (priorityId, token) => {
  const res = await fetch(`${API_BASE_URL}/priorities/${priorityId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// ৪. Milestone যোগ করা
export const addMilestoneApi = async (priorityId, title, token) => {
  const res = await fetch(
    `${API_BASE_URL}/priorities/${priorityId}/milestones`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    },
  );
  return res.json();
};

// ৫. Milestone Check/Uncheck (Toggle) করা
export const toggleMilestoneApi = async (milestoneId, completed, token) => {
  const res = await fetch(
    `${API_BASE_URL}/priorities/milestones/${milestoneId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    },
  );
  return res.json();
};

// ৬. Milestone ডিলিট করা
export const deleteMilestoneApi = async (milestoneId, token) => {
  const res = await fetch(
    `${API_BASE_URL}/priorities/milestones/${milestoneId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.json();
};
