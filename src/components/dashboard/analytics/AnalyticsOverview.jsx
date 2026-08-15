"use client";

import { useMemo } from "react";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Award,
  BookOpen,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsOverview({
  academics = [],
  tasks = [],
  metrics = [],
  loading = false,
}) {
  // 1. Calculate Aggregated Data (Memoized for performance)
  const analyticsData = useMemo(() => {
    // Academic Hours Calculation
    let totalTargetHours = 0;
    let totalSpentHours = 0;

    const weeklyBreakdown = [
      { name: "Week 1", spent: 0 },
      { name: "Week 2", spent: 0 },
      { name: "Week 3", spent: 0 },
      { name: "Week 4", spent: 0 },
    ];

    academics.forEach((item) => {
      totalTargetHours += item.targetHours || 0;
      if (Array.isArray(item.weeks)) {
        item.weeks.forEach((w, idx) => {
          const hours = Number(w.hoursSpent) || 0;
          totalSpentHours += hours;
          if (weeklyBreakdown[idx]) {
            weeklyBreakdown[idx].spent += hours;
          }
        });
      }
    });

    // Task Completion Rate
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.isCompleted).length;
    const taskRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Metrics Average Completion
    const totalMetrics = metrics.length;
    const metricsProgressSum = metrics.reduce((acc, curr) => {
      const pct = curr.target > 0 ? Math.min(100, (curr.value / curr.target) * 100) : 0;
      return acc + pct;
    }, 0);
    const metricsRate = totalMetrics > 0 ? Math.round(metricsProgressSum / totalMetrics) : 0;

    // Study Hours Completion Rate
    const hoursRate = totalTargetHours > 0 ? Math.min(100, Math.round((totalSpentHours / totalTargetHours) * 100)) : 0;

    // Overall Productivity Score (Weighted Average: 40% Study, 40% Tasks, 20% Metrics)
    const productivityScore = Math.round(hoursRate * 0.4 + taskRate * 0.4 + metricsRate * 0.2);

    // Dynamic Status Remark
    let statusRemark = { text: "Getting Started", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-700" };
    if (productivityScore >= 80) {
      statusRemark = { text: "On Track 🚀", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" };
    } else if (productivityScore >= 50) {
      statusRemark = { text: "Good Progress 👍", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/40" };
    } else if (productivityScore > 0) {
      statusRemark = { text: "Needs Focus ⚠️", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" };
    }

    // Subject Breakdown Data for Bar Chart
    const subjectData = academics.map((ac) => {
      const spent = ac.weeks ? ac.weeks.reduce((sum, w) => sum + (Number(w.hoursSpent) || 0), 0) : 0;
      return {
        subject: ac.subject,
        target: ac.targetHours || 0,
        spent: spent,
      };
    });

    return {
      totalTargetHours,
      totalSpentHours,
      hoursRate,
      taskRate,
      metricsRate,
      productivityScore,
      statusRemark,
      weeklyBreakdown,
      subjectData,
    };
  }, [academics, tasks, metrics]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading analytics engine...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Section: Productivity Score Header */}
      <div className={`flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 p-6 shadow-sm sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-800 ${analyticsData.statusRemark.bg}`}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Monthly Performance Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {analyticsData.productivityScore}%
              </span>
              <span className={`text-sm font-semibold ${analyticsData.statusRemark.color}`}>
                {analyticsData.statusRemark.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Study Hours */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Study Hours</span>
            <Clock className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.totalSpentHours} <span className="text-xs font-normal text-gray-500">/ {analyticsData.totalTargetHours}h</span>
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {analyticsData.hoursRate}%
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${analyticsData.hoursRate}%` }}
            />
          </div>
        </div>

        {/* Card 2: Tasks Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Tasks Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.taskRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {tasks.filter((t) => t.isCompleted).length}/{tasks.length} Done
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${analyticsData.taskRate}%` }}
            />
          </div>
        </div>

        {/* Card 3: Success Metrics */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Metrics Target</span>
            <Target className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.metricsRate}%
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {metrics.length} Active Goals
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${analyticsData.metricsRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Weekly Study Velocity (Area Chart) */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <TrendingUp className="h-4 w-4 text-indigo-600" /> Weekly Study Velocity (Hours)
            </h4>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.weeklyBreakdown}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Area type="monotone" dataKey="spent" name="Hours Spent" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Subject Time Breakdown (Bar Chart) */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <BookOpen className="h-4 w-4 text-indigo-600" /> Subject-wise Target vs Spent
            </h4>
          </div>
          <div className="h-64 w-full">
            {analyticsData.subjectData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No subjects added for this month yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.subjectData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                  <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="spent" name="Spent (h)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target (h)" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}