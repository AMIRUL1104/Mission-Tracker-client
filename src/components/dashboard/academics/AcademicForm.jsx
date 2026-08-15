"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AcademicForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [subject, setSubject] = useState("");
  const [targetHours, setTargetHours] = useState("");

  // Primitive values extract for clean React Compiler tracking
  const initialSubject = initialData?.subject;
  const initialTargetHours = initialData?.targetHours;

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject || "");
      setTargetHours(
        initialTargetHours !== undefined && initialTargetHours !== null
          ? initialTargetHours
          : "",
      );
    } else {
      setSubject("");
      setTargetHours("");
    }
  }, [isOpen, initialSubject, initialTargetHours]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onSubmit({
      subject: subject.trim(),
      targetHours: Number(targetHours) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {initialData ? "Edit Subject" : "Add New Subject"}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Data Structures & Algorithms"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Target Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              placeholder="e.g. 40"
              value={targetHours}
              onChange={(e) => setTargetHours(e.target.value)}
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
              {initialData ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
