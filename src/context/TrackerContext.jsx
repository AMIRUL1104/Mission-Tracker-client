"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TrackerContext = createContext();

export function TrackerProvider({ children }) {
  const { token } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default: today
  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [loadingMonth, setLoadingMonth] = useState(true);

  // ব্যাকএন্ড থেকে নির্দিষ্ট মাসের ডেটা আনার ফংশন
  const fetchMonthData = async (date) => {
    if (!token) return;
    setLoadingMonth(true);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/months/find?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const resData = await response.json();
      if (resData.success) {
        setCurrentMonthData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching month data:", error);
    } finally {
      setLoadingMonth(false);
    }
  };

  //   console.log(currentMonthData);

  // তারিখ পরিবর্তন হলে মাস রিলোড হবে
  useEffect(() => {
    if (token) {
      fetchMonthData(selectedDate);
    }
  }, [selectedDate, token]);

  // ১ মাস পেছনে যাওয়ার ফংশন
  const prevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1),
    );
  };

  // ১ মাস সামনে যাওয়ার ফংশন
  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1),
    );
  };

  // বর্তমান মাসে ফিরে আসার ফংশন
  const resetToCurrentMonth = () => {
    setSelectedDate(new Date());
  };

  return (
    <TrackerContext.Provider
      value={{
        selectedDate,
        currentMonthData,
        loadingMonth,
        prevMonth,
        nextMonth,
        resetToCurrentMonth,
        refetchMonth: () => fetchMonthData(selectedDate),
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within TrackerProvider");
  }
  return context;
}
