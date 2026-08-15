"use client";

import { useState, useEffect, useCallback } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import { metricService } from "@/lib/metricApi";
import MetricTracker from "@/components/dashboard/metrics/MetricTracker"; // তোমার তৈরি করা MetricTracker
import { RefreshCw, Target } from "lucide-react";

export default function MetricsPage() {
  const { currentMonthData, loadingMonth } = useTracker();
  const { token } = useAuth();

  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthId = currentMonthData?.id;

  // 1. Fetch metrics for selected month
  const fetchMetrics = useCallback(async () => {
    if (!monthId || !token) return;

    setLoading(true);
    try {
      const res = await metricService.getMetrics(monthId, token);
      if (res.success) {
        setMetrics(res.data);
      }
    } catch (err) {
      console.error("Failed to load metrics:", err);
    } finally {
      setLoading(false);
    }
  }, [monthId, token]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // Loading state when checking month context
  if (loadingMonth) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
        Loading month context...
      </div>
    );
  }

  // If no active month is selected
  if (!currentMonthData) {
    return (
      <div className="m-6 flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-800">
        <Target className="mb-3 h-10 w-10 text-gray-400" />
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          No active month selected
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Please select or create a month to manage your success metrics.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <MetricTracker
        monthId={monthId}
        token={token}
        metrics={metrics}
        loading={loading}
        onRefresh={fetchMetrics}
      />
    </main>
  );
}
