"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function MetricCard({ metric, onUpdate, onDelete, onEdit }) {
  const { id, name, value, target, unit } = metric;
  const [isUpdating, setIsUpdating] = useState(false);

  // Percentage calculation with safeguard against division by zero
  const percentage =
    target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  const isCompleted = percentage >= 100;

  // Quick +1 increment handler
  const handleQuickIncrement = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(id, { value: value + 1 });
    } catch (err) {
      console.error("Failed to increment metric value:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div>
        {/* Card Header: Title & Actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            {isCompleted && (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onEdit(metric)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              title="Edit metric"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              title="Delete metric"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stats Display */}
        <div className="mt-4 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}{" "}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              / {target} {unit || ""}
            </span>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
            }`}
          >
            {percentage}%
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              isCompleted
                ? "bg-emerald-500"
                : "bg-indigo-600 dark:bg-indigo-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700/60">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {isCompleted ? "Goal achieved!" : "Progress update"}
        </span>
        <button
          type="button"
          disabled={isUpdating}
          onClick={handleQuickIncrement}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400"
        >
          <Plus className="h-3.5 w-3.5" /> +1 {unit || ""}
        </button>
      </div>
    </div>
  );
}
