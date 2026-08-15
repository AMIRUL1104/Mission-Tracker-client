"use client";
import { Edit2, Trash2 } from "lucide-react";
import AcademicChapterList from "./AcademicChapterList";
import AcademicWeekList from "./AcademicWeekList";

export default function AcademicCard({
  academic,
  onEdit,
  onDelete,
  onAddChapter,
  onToggleChapter,
  onDeleteChapter,
  onUpdateWeekHours,
}) {
  const chapters = academic.chapters || [];
  const weeklyLogs = academic.weeklyLogs || [];

  // Calculate Output Progress (Chapter based)
  const totalChapters = chapters.length;
  const completedChapters = chapters.filter((c) => c.isCompleted).length;
  const chapterProgress =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  // Calculate Total Hours Spent
  const totalHoursSpent = weeklyLogs.reduce(
    (acc, curr) => acc + (curr.hoursSpent || 0),
    0,
  );

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">
              {academic.subject}
            </h4>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Total Spent:{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {totalHoursSpent}h
              </span>{" "}
              / Target: {academic.targetHours}h
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(academic)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(academic.id)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chapter Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span>Chapter Completion</span>
            <span>{chapterProgress}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
              style={{ width: `${chapterProgress}%` }}
            />
          </div>
        </div>

        <hr className="my-4 border-gray-100 dark:border-gray-700" />

        {/* Chapters Section */}
        <AcademicChapterList
          chapters={chapters}
          onAddChapter={(title) => onAddChapter(academic.id, title)}
          onToggleChapter={onToggleChapter}
          onDeleteChapter={onDeleteChapter}
        />
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-700">
        {/* Weekly Hours Section */}
        <AcademicWeekList
          weeklyLogs={weeklyLogs}
          onUpdateHours={(weekId, hours) =>
            onUpdateWeekHours(academic.id, weekId, hours)
          }
        />
      </div>
    </div>
  );
}
