"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTracker } from "@/context/TrackerContext";
import { overviewService } from "@/lib/overviewApi";

import { Loader2, CheckCircle2, Circle } from "lucide-react";

export default function DashboardOverview() {
  const { user, token } = useAuth();
  const { currentMonthData, loadingMonth } = useTracker();

  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  const monthId = currentMonthData?.id;
  console.log(overviewData);
  // আজকের তারিখ ফরম্যাট: "YYYY-MM-DD"
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const fetchOverview = useCallback(async () => {
    if (!monthId || !token) return;
    setLoading(true);
    try {
      const res = await overviewService.getOverview(monthId, token);
      if (res.success) {
        setOverviewData(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard overview:", err);
    } finally {
      setLoading(false);
    }
  }, [monthId, token]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (loadingMonth || loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-[#8892b0] font-mono">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#5b6af0]" />
        Loading Dashboard Overview...
      </div>
    );
  }

  // Schema অনুযায়ী ডাটা এক্সট্র্যাক্ট করা
  const monthData = overviewData?.month;
  const rawStreaks = overviewData?.streaks || [];

  const priorities = monthData?.priorities || [];
  const tasks = monthData?.tasks || [];
  const academics = monthData?.academics || [];
  const metrics = monthData?.metrics || [];

  // ------------------------------------------------------------------
  // Streak Calculation Logic
  // ------------------------------------------------------------------
  const totalCompletedDays = rawStreaks.filter((s) => s.completed).length;

  // Current & Best Streak Calc
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  // তারিখ সাজিয়ে নিয়ে স্ট্রিক বের করা
  const sortedStreaks = [...rawStreaks].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  for (let i = 0; i < sortedStreaks.length; i++) {
    if (sortedStreaks[i].completed) {
      tempStreak++;
      if (tempStreak > bestStreak) bestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Current Streak Calculation (আজ বা গতকাল থেকে আগের দিনগুলো)
  for (let i = 0; i < sortedStreaks.length; i++) {
    if (sortedStreaks[i].completed) {
      currentStreak++;
    } else {
      break;
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
      {/* Welcome Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 md:col-span-full">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          Welcome
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Overview &amp; Navigation
        </div>
        <p className="text-[13px] text-[#d8ddf0] leading-[1.6] mb-3">
          Welcome back, <strong>{user?.name}</strong>! This is your Mission
          Tracker dashboard. Use the navigation on the left to access your
          priorities, daily tasks, streak calendar, academic progress, custom
          metrics, and settings.
        </p>
        <p className="text-[11px] text-[#8892b0] font-mono">
          Ship &gt; Wait · Finish &gt; Perfect · Learn &gt; Overthink
        </p>
      </div>

      {/* Priority Goals (Top 2) */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
            Focus Allocation
          </div>
          <div className="text-[15px] font-semibold text-white mb-4">
            Priority Goals (Top 2)
          </div>

          {priorities.length === 0 ? (
            <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
              No priorities set yet.
            </div>
          ) : (
            <div className="space-y-3">
              {priorities.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141721] p-3 rounded-lg border border-[#252a38]"
                >
                  <div className="flex justify-between text-xs text-white font-medium mb-1">
                    <span>{item.title}</span>
                    <span className="text-[#8892b0] font-mono">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[#252a38] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5b6af0] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(item.progress, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <a
            href="/dashboard/priorities"
            className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-4 cursor-pointer"
          >
            View Priorities →
          </a>
        </div>
      </div>

      {/* Daily Tasks Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
            Today
          </div>
          <div className="text-[15px] font-semibold text-white mb-4">
            Daily Non-Negotiables
          </div>

          {tasks.length === 0 ? (
            <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
              No tasks added for today.
            </div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => {
                // Check if today's dailyCheck exists and is completed
                const isCompletedToday = task.dailyChecks?.some(
                  (check) => check.date === todayStr && check.completed,
                );

                return (
                  <li
                    key={task.id}
                    className="flex items-center gap-2 text-xs text-[#d8ddf0]"
                  >
                    {isCompletedToday ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-[#8892b0] shrink-0" />
                    )}
                    <span
                      className={
                        isCompletedToday ? "line-through text-[#8892b0]" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div>
          <a
            href="/dashboard/tasks"
            className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-4 cursor-pointer"
          >
            View Tasks →
          </a>
        </div>
      </div>

      {/* Streak Calendar Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
            Consistency
          </div>
          <div className="text-[15px] font-semibold text-white mb-4">
            Streak Calendar
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#141721] p-3 rounded-lg border border-[#252a38] text-center">
              <div className="text-sm font-bold text-white font-mono">
                {currentStreak} Days
              </div>
              <div className="text-xs mt-1">🔥</div>
              <div className="text-[10px] text-[#8892b0] mt-1 uppercase font-mono">
                Current
              </div>
            </div>

            <div className="bg-[#141721] p-3 rounded-lg border border-[#252a38] text-center">
              <div className="text-sm font-bold text-white font-mono">
                {bestStreak} Days
              </div>
              <div className="text-xs mt-1">🏆</div>
              <div className="text-[10px] text-[#8892b0] mt-1 uppercase font-mono">
                Best
              </div>
            </div>

            <div className="bg-[#141721] p-3 rounded-lg border border-[#252a38] text-center">
              <div className="text-sm font-bold text-white font-mono">
                {totalCompletedDays} Days
              </div>
              <div className="text-xs mt-1">📅</div>
              <div className="text-[10px] text-[#8892b0] mt-1 uppercase font-mono">
                Total
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            href="/dashboard/streak"
            className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-4 cursor-pointer"
          >
            View Streak →
          </a>
        </div>
      </div>

      {/* Academic Tracker (Top 3 Subjects) */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
            Learning
          </div>
          <div className="text-[15px] font-semibold text-white mb-4">
            Academic Tracker (Top 3)
          </div>

          {academics.length === 0 ? (
            <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
              No academic subjects added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {academics.slice(0, 3).map((sub) => {
                // Progress calculation based on completed chapters vs total chapters
                const totalChapters = sub.chapters?.length || 0;
                const completedChapters =
                  sub.chapters?.filter((c) => c.isCompleted).length || 0;
                const progressPct =
                  totalChapters > 0
                    ? Math.round((completedChapters / totalChapters) * 100)
                    : 0;

                return (
                  <div
                    key={sub.id}
                    className="bg-[#141721] p-2.5 rounded-lg border border-[#252a38]"
                  >
                    <div className="flex justify-between text-xs text-white font-medium mb-1">
                      <span>{sub.subject}</span>
                      <span className="text-[#8892b0] font-mono">
                        {progressPct}%
                      </span>
                    </div>
                    <div className="w-full bg-[#252a38] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <a
            href="/dashboard/academics"
            className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-4 cursor-pointer"
          >
            View Academics →
          </a>
        </div>
      </div>

      {/* Success Metrics (Top 3 Metrics) */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 md:col-span-full flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
            30-Day Targets
          </div>
          <div className="text-[15px] font-semibold text-white mb-4">
            Success Metrics (Top 3)
          </div>

          {metrics.length === 0 ? (
            <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
              No metrics added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {metrics.slice(0, 3).map((m) => {
                const percentage =
                  m.target > 0
                    ? Math.min(Math.round((m.value / m.target) * 100), 100)
                    : 0;
                return (
                  <div
                    key={m.id}
                    className="bg-[#141721] p-3 rounded-lg border border-[#252a38]"
                  >
                    <div className="text-xs font-semibold text-white truncate">
                      {m.name}
                    </div>
                    <div className="text-xs text-[#8892b0] font-mono mt-1">
                      {m.value} / {m.target} {m.unit || ""}
                    </div>
                    <div className="w-full bg-[#252a38] h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <a
            href="/dashboard/metrics"
            className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-4 cursor-pointer"
          >
            View Metrics →
          </a>
        </div>
      </div>
    </div>
  );
}
