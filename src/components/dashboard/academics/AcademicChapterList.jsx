"use client";
import { useState } from "react";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";

export default function AcademicChapterList({
  chapters = [],
  onAddChapter,
  onToggleChapter,
  onDeleteChapter,
}) {
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddChapter(newTitle.trim());
    setNewTitle("");
  };

  const completedCount = chapters.filter((c) => c.isCompleted).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="font-semibold uppercase tracking-wider">Chapters</span>
        <span>
          {completedCount} of {chapters.length} completed
        </span>
      </div>

      {/* Add Chapter Input */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          placeholder="Add chapter name..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>

      {/* Chapter List */}
      <ul className="max-h-48 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-700/50">
        {chapters.length === 0 ? (
          <li className="py-2 text-center text-xs text-gray-400">
            No chapters added yet
          </li>
        ) : (
          chapters.map((chapter) => (
            <li
              key={chapter.id}
              className="group flex items-center justify-between py-2 text-sm"
            >
              <button
                onClick={() =>
                  onToggleChapter(chapter.id, !chapter.isCompleted)
                }
                className="flex items-center gap-2 text-left"
              >
                {chapter.isCompleted ? (
                  <CheckSquare className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Square className="h-4 w-4 shrink-0 text-gray-400" />
                )}
                <span
                  className={
                    chapter.isCompleted
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-200"
                  }
                >
                  {chapter.title}
                </span>
              </button>
              <button
                onClick={() => onDeleteChapter(chapter.id)}
                className="opacity-0 transition-opacity group-hover:opacity-100 p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
