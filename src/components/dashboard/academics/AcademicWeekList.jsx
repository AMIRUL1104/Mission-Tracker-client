"use client";
import { useState } from "react";

export default function AcademicWeekList({ weeklyLogs = [], onUpdateHours }) {
  const [editingWeekId, setEditingWeekId] = useState(null);
  const [hoursInput, setHoursInput] = useState("");

  const handleStartEdit = (week) => {
    setEditingWeekId(week.id);
    setHoursInput(week.hoursSpent);
  };

  const handleSave = (weekId) => {
    const value = parseFloat(hoursInput);
    if (!isNaN(value) && value >= 0) {
      onUpdateHours(weekId, value);
    }
    setEditingWeekId(null);
  };

  return (
    <div className="space-y-2">
      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Weekly Hours Log
      </span>
      <div className="grid grid-cols-4 gap-2">
        {weeklyLogs.map((log) => (
          <div
            key={log.id}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              W{log.weekNumber}
            </span>
            {editingWeekId === log.id ? (
              <input
                type="number"
                step="0.5"
                autoFocus
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                onBlur={() => handleSave(log.id)}
                onKeyDown={(e) => e.key === "Enter" && handleSave(log.id)}
                className="mt-1 w-12 rounded border p-0.5 text-center text-xs focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <button
                onClick={() => handleStartEdit(log)}
                className="mt-1 text-sm font-semibold text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
              >
                {log.hoursSpent}h
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
