const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Fetch overall streak stats and monthly completed dates
 */
export async function fetchStreakStats(token, monthKey = "") {
  const url = monthKey
    ? `${API_BASE_URL}/streaks/stats?monthKey=${monthKey}`
    : `${API_BASE_URL}/streaks/stats`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

/**
 * Reset all streak history
 */
// export async function resetStreaksApi(token) {
//   const res = await fetch(`${API_BASE_URL}/streaks`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   return res.json();
// }
