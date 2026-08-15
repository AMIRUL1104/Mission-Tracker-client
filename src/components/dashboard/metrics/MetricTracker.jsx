"use client";

import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { metricService } from "@/lib/metricApi";
import MetricCard from "./MetricCard";
import MetricForm from "./MetricForm";

export default function MetricTracker({
  monthId,
  token,
  metrics = [],
  loading = false,
  onRefresh,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);

  // 1. Create or Update Metric Handler
  const handleSaveMetric = async (formData) => {
    try {
      if (editingMetric) {
        await metricService.updateMetric(editingMetric.id, formData, token);
      } else {
        await metricService.createMetric({ ...formData, monthId }, token);
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Save metric error:", err);
    }
  };

  // 2. Direct Quick Update Handler
  const handleUpdateMetric = async (id, updatedFields) => {
    try {
      await metricService.updateMetric(id, updatedFields, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Update metric error:", err);
    }
  };

  // 3. Delete Metric Handler
  const handleDeleteMetric = async (id) => {
    if (!confirm("Are you sure you want to delete this metric?")) return;
    try {
      await metricService.deleteMetric(id, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete metric error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Target className="h-5 w-5 text-indigo-600" /> Success Metrics
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track key performance indicators and monthly milestones
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingMetric(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add Metric
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading metrics...
        </div>
      ) : metrics.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500">
            No metrics defined for this month yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((item) => (
            <MetricCard
              key={item.id}
              metric={item}
              onUpdate={handleUpdateMetric}
              onDelete={handleDeleteMetric}
              onEdit={(m) => {
                setEditingMetric(m);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Form */}
      <MetricForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveMetric}
        initialData={editingMetric}
      />
    </div>
  );
}
