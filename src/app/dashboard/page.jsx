"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardOverview() {
  const { user } = useAuth();

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

      {/* Priorities Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          Focus Allocation
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Priority Goals
        </div>
        <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
          No priorities yet.
        </div>
        <a
          href="/dashboard/priorities"
          className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-3 cursor-pointer"
        >
          View Priorities →
        </a>
      </div>

      {/* Tasks Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          Today
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Daily Non-Negotiables
        </div>
        <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
          No tasks yet.
        </div>
        <a
          href="/dashboard/tasks"
          className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-3 cursor-pointer"
        >
          View Tasks →
        </a>
      </div>

      {/* Streak Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          Consistency
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Streak Calendar
        </div>
        <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
          No streak data yet.
        </div>
        <a
          href="/dashboard/streak"
          className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-3 cursor-pointer"
        >
          View Streak →
        </a>
      </div>

      {/* Academics Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          Learning
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Academic Tracker
        </div>
        <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
          No subjects yet.
        </div>
        <a
          href="/dashboard/academics"
          className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-3 cursor-pointer"
        >
          View Academics →
        </a>
      </div>

      {/* Metrics Card */}
      <div className="bg-[#1a1e2a] border border-[#252a38] rounded-[10px] p-5 col-span-1 md:col-span-full">
        <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8892b0] mb-1 font-mono">
          30-Day Targets
        </div>
        <div className="text-[15px] font-semibold text-white mb-4">
          Success Metrics
        </div>
        <div className="text-center text-[#4a5270] text-xs py-5 font-mono">
          No metrics yet.
        </div>
        <a
          href="/dashboard/metrics"
          className="inline-block bg-[#5b6af0] text-white px-3 py-[6px] rounded-md text-xs font-semibold no-underline mt-3 cursor-pointer"
        >
          View Metrics →
        </a>
      </div>
    </div>
  );
}
