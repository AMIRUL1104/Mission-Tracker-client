"use client";

import { useState, useEffect } from "react";
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

  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Priority Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Month ডাটা লোড হলে Priorities নিয়ে আসা
  const loadPriorities = async () => {
    if (!currentMonthData?.id || !token) return;
    setLoading(true);
    try {
      const res = await fetchPrioritiesByMonth(currentMonthData.id, token);
      if (res.success) setPriorities(res.data);
    } catch (err) {
      console.error("Failed to load priorities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPriorities();
  }, [currentMonthData, token]);

  // Create Priority
  const handleCreatePriority = async (e) => {
    e.preventDefault();
    if (!title.trim() || !currentMonthData?.id) return;

    const res = await createPriorityApi(
      { monthId: currentMonthData.id, title, description },
      token,
    );
    if (res.success) {
      setTitle("");
      setDescription("");
      loadPriorities(); // Refresh list
    }
  };

  // Delete Priority
  const handleDeletePriority = async (id) => {
    const res = await deletePriorityApi(id, token);
    if (res.success) loadPriorities();
  };

  // Add Milestone
  const handleAddMilestone = async (priorityId, title) => {
    const res = await addMilestoneApi(priorityId, title, token);
    if (res.success) loadPriorities();
  };

  // Toggle Milestone
  const handleToggleMilestone = async (milestoneId, completed) => {
    const res = await toggleMilestoneApi(milestoneId, completed, token);
    if (res.success) loadPriorities();
  };

  // Delete Milestone
  const handleDeleteMilestone = async (milestoneId) => {
    const res = await deleteMilestoneApi(milestoneId, token);
    if (res.success) loadPriorities();
  };

  if (loadingMonth)
    return (
      <div className="text-xs font-mono text-[#8892b0]">Loading month...</div>
    );

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-bold font-mono text-white mb-6">
        <span className="text-[#5b6af0]">{"//"}</span> Monthly Priorities
      </h1>

      {/* Add New Priority Form */}
      <form
        onSubmit={handleCreatePriority}
        className="bg-[#141720] border border-[#252a38] p-4 rounded-xl mb-6"
      >
        <h2 className="text-sm font-mono text-white mb-3">Set New Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Priority Title (e.g. Master Next.js)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#0d0f14] border border-[#252a38] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#5b6af0]"
            required
          />
          <input
            type="text"
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#0d0f14] border border-[#252a38] text-xs text-white p-2.5 rounded focus:outline-none focus:border-[#5b6af0]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#5b6af0] hover:bg-[#4b59d0] text-white text-xs font-mono px-4 py-2 rounded cursor-pointer transition-all"
        >
          + Add Priority
        </button>
      </form>

      {/* Priorities List */}
      {loading ? (
        <div className="text-xs font-mono text-[#8892b0]">
          Loading priorities...
        </div>
      ) : priorities.length === 0 ? (
        <div className="text-xs font-mono text-[#8892b0] bg-[#141720] p-6 rounded-xl border border-[#252a38] text-center">
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
