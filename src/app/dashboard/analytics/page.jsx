"use client";

import { useState, useEffect } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import AnalyticsOverview from "@/components/dashboard/analytics/AnalyticsOverview";
import { academicService } from "@/lib/academicApi";
import { metricService } from "@/lib/metricApi";

export default function AnalyticsPage() {
  const { currentMonthData, loadingMonth } = useTracker();
  const { token } = useAuth();

  const [academics, setAcademics] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract primitive for React Compiler optimization
  const monthId = currentMonthData?.id;

  useEffect(() => {
    if (!monthId || !token) return;

    let isMounted = true;

    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const [academicRes, metricRes] = await Promise.all([
          academicService.getAcademics(monthId, token),
          metricService.getMetrics(monthId, token),
        ]);

        if (isMounted) {
          if (academicRes.success) setAcademics(academicRes.data);
          if (metricRes.success) setMetrics(metricRes.data);
        }
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnalyticsData();

    return () => {
      isMounted = false;
    };
  }, [monthId, token]);

  if (loadingMonth) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-gray-500">
        Loading month data...
      </div>
    );
  }

  if (!currentMonthData) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-gray-500">
        No active month selected. Please select or create a month first.
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Performance & Analytics Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visual insights for {currentMonthData.name || "Selected Month"}
        </p>
      </div>

      <AnalyticsOverview
        academics={academics}
        tasks={currentMonthData.tasks || []}
        metrics={metrics}
        loading={loading}
      />
    </main>
  );
}
