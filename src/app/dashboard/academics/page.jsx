"use client";

import { useState, useEffect } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import AcademicTracker from "@/components/dashboard/academics/AcademicTracker";
import { academicService } from "@/lib/academicApi";

export default function AcademicsPage() {
  const { currentMonthData, loadingMonth } = useTracker();
  const { token } = useAuth();

  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Primitive Variable Extract (React Compiler optimization fix)
  const monthId = currentMonthData?.id;
  console.log(monthId)

  // 2. Main Fetch Function (Re-usable for refresh)
  const loadAcademics = async () => {
    if (!monthId || !token) return;
    setLoading(true);
    try {
      const res = await academicService.getAcademics(monthId, token);
      if (res.success) {
        setAcademics(res.data);
      }
    } catch (err) {
      console.error("Failed to load academic data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Initial Load Effect
  useEffect(() => {
    if (!monthId || !token) return;

    let isMounted = true;

    // Direct async call without triggering immediate state sync issues
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await academicService.getAcademics(monthId, token);
        if (isMounted && res.success) {
          setAcademics(res.data);
        }
      } catch (err) {
        console.error("Failed to load academic data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

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
      <AcademicTracker
        monthId={monthId}
        token={token}
        academics={academics}
        loading={loading}
        onRefresh={loadAcademics}
      />
    </main>
  );
}
