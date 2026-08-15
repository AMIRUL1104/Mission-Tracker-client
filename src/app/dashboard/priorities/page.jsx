"use client";

import { useState, useEffect, useCallback } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import PriorityCard from "@/components/dashboard/priorities/PriorityCard";
import {
  fetchPrioritiesByMonth,
  createPriorityApi,
  deletePriorityApi,
  addMilestoneApi,
  toggleMilestoneApi,
  deleteMilestoneApi,
} from "@/services/priorityService";

export default function PrioritiesPage() {
  const { currentMonthData, loadingMonth } = useTracker();
  const { token } = useAuth();

  const monthId = currentMonthData?.id;

  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Priority Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ১. Memoized Data Loader
  const loadPriorities = useCallback(async () => {
    if (!monthId || !token) return;
    setLoading(true);
    try {
      const res = await fetchPrioritiesByMonth(monthId, token);
      if (res?.success) setPriorities(res.data);
    } catch (err) {
      console.error("Failed to load priorities", err);
    } finally {
      setLoading(false);
    }
  }, [monthId, token]);

  // ২. Safe useEffect Hook
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!monthId || !token) return;
      setLoading(true);
      try {
        const res = await fetchPrioritiesByMonth(monthId, token);
        if (!ignore && res?.success) {
          setPriorities(res.data);
        }
      } catch (err) {
        console.error("Failed to load priorities", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [monthId, token]);

  // Create Priority
  const handleCreatePriority = async (e) => {
    e.preventDefault();
    if (!title.trim() || !monthId) return;

    const res = await createPriorityApi({ monthId, title, description }, token);
    if (res?.success) {
      setTitle("");
      setDescription("");
      loadPriorities(); // Refresh list
    }
  };

  // Delete Priority
  const handleDeletePriority = async (id) => {
    const res = await deletePriorityApi(id, token);
    if (res?.success) loadPriorities();
  };

  // Add Milestone
  const handleAddMilestone = async (priorityId, title) => {
    const res = await addMilestoneApi(priorityId, title, token);
    if (res?.success) loadPriorities();
  };

  // Toggle Milestone
  const handleToggleMilestone = async (milestoneId, completed) => {
    const res = await toggleMilestoneApi(milestoneId, completed, token);
    if (res?.success) loadPriorities();
  };

  // Delete Milestone
  const handleDeleteMilestone = async (milestoneId) => {
    const res = await deleteMilestoneApi(milestoneId, token);
    if (res?.success) loadPriorities();
  };

  if (loadingMonth)
    return (
      <div className="font-mono text-xs text-[#8892b0]">Loading month...</div>
    );

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 font-mono text-xl font-bold text-white">
        <span className="text-[#5b6af0]">{"//"}</span> Monthly Priorities
      </h1>

      {/* Add New Priority Form */}
      <form
        onSubmit={handleCreatePriority}
        className="mb-6 rounded-xl border border-[#252a38] bg-[#141720] p-4"
      >
        <h2 className="mb-3 font-mono text-sm text-white">Set New Priority</h2>
        <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Priority Title (e.g. Master Next.js)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-[#252a38] bg-[#0d0f14] p-2.5 text-xs text-white focus:border-[#5b6af0] focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded border border-[#252a38] bg-[#0d0f14] p-2.5 text-xs text-white focus:border-[#5b6af0] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#5b6af0] px-4 py-2 font-mono text-xs text-white transition-all hover:bg-[#4b59d0]"
        >
          + Add Priority
        </button>
      </form>

      {/* Priorities List */}
      {loading ? (
        <div className="font-mono text-xs text-[#8892b0]">
          Loading priorities...
        </div>
      ) : priorities.length === 0 ? (
        <div className="rounded-xl border border-[#252a38] bg-[#141720] p-6 text-center font-mono text-xs text-[#8892b0]">
          No priorities set for this month yet.
        </div>
      ) : (
        priorities.map((p) => (
          <PriorityCard
            key={p.id}
            priority={p}
            onToggleMilestone={handleToggleMilestone}
            onAddMilestone={handleAddMilestone}
            onDeletePriority={handleDeletePriority}
            onDeleteMilestone={handleDeleteMilestone}
          />
        ))
      )}
    </div>
  );
}
