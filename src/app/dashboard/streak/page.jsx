"use client";

import { useState, useEffect, useCallback } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import StreakStatsCards from "@/components/dashboard/streak/StreakStatsCards";
import StreakCalendarGrid from "@/components/dashboard/streak/StreakCalendarGrid";
import { fetchStreakStats } from "@/lib/streakApi";

export default function StreakPage() {
  const { currentMonthData, loadingMonth } = useTracker();
  const { token } = useAuth();

  const [stats, setStats] = useState({
    currentStreak: 0,
    bestStreak: 0,
    totalCompletedDays: 0,
    monthStreaks: [],
  });
  const [loading, setLoading] = useState(false);

  // loadStreakData-কে useCallback দিয়ে মেমোইজ করে নেওয়া হলো
  const loadStreakData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const monthKey = currentMonthData?.monthKey;
      const res = await fetchStreakStats(token, monthKey);
      if (res?.success && res?.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to load streak stats:", err);
    } finally {
      setLoading(false);
    }
  }, [token, currentMonthData?.monthKey]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const monthKey = currentMonthData?.monthKey;
        const res = await fetchStreakStats(token, monthKey);
        if (!ignore && res?.success && res?.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to load streak stats:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true; // Component unmount বা dependency চেঞ্জে Cascading Render রোধ করে
    };
  }, [currentMonthData?.monthKey, token]);

  if (loadingMonth || (loading && !stats.monthStreaks.length)) {
    return (
      <div className="p-6 font-mono text-xs text-[#8892b0]">
        Loading streak data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white md:text-3xl">
          Streak & Consistency
        </h1>
        <p className="mt-1 text-sm text-[#8892b0]">
          Track your daily momentum automatically as you complete tasks.
        </p>
      </div>

      {/* Stats Cards Overview */}
      <StreakStatsCards stats={stats} />

      {/* Monthly Interactive Calendar (Auto-Synced) */}
      <StreakCalendarGrid
        monthStreaks={stats.monthStreaks}
        currentMonthData={currentMonthData}
      />
    </div>
  );
}
