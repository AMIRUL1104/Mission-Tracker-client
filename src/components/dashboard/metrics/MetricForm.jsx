"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function MetricForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  // React Compiler Optimization: Extract primitives to prevent dependency mismatch warnings
  const initialName = initialData?.name;
  const initialValue = initialData?.value;
  const initialTarget = initialData?.target;
  const initialUnit = initialData?.unit;

  useEffect(() => {
    if (isOpen) {
      setName(initialName || "");
      setValue(
        initialValue !== undefined && initialValue !== null
          ? initialValue
          : "0",
      );
      setTarget(
        initialTarget !== undefined && initialTarget !== null
          ? initialTarget
          : "0",
      );
      setUnit(initialUnit || "");
    } else {
      setName("");
      setValue("");
      setTarget("");
      setUnit("");
    }
  }, [isOpen, initialName, initialValue, initialTarget, initialUnit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      value: Number(value) || 0,
      target: Number(target) || 0,
      unit: unit.trim() || null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {initialData ? "Edit Success Metric" : "Add New Metric"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Metric Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Books Read, LeetCode Solved"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Value
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Value
              </label>
              <input
                type="number"
                min="0"
                step="any"
                required
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unit (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. books, hours, commits"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {initialData ? "Save Changes" : "Create Metric"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
