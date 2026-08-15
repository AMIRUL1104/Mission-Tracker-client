"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { academicService } from "@/lib/academicApi";
import AcademicCard from "./AcademicCard";
import AcademicForm from "./AcademicForm";

export default function AcademicTracker({
  monthId,
  token,
  academics = [],
  loading = false,
  onRefresh,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAcademic, setEditingAcademic] = useState(null);

  // 1. Subject Add/Update Handler
  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingAcademic) {
        await academicService.updateAcademic(
          editingAcademic.id,
          formData,
          token,
        );
      } else {
        await academicService.createAcademic({ ...formData, monthId }, token);
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Save subject error:", err);
    }
  };

  // 2. Delete Subject
  const handleDeleteAcademic = async (id) => {
    if (!confirm("Are you sure you want to delete this subject?")) return;
    try {
      await academicService.deleteAcademic(id, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete subject error:", err);
    }
  };

  // 3. Add Chapter
  const handleAddChapter = async (academicId, title) => {
    try {
      await academicService.addChapter(academicId, title, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Add chapter error:", err);
    }
  };

  // 4. Toggle Chapter Completion
  const handleToggleChapter = async (chapterId, isCompleted) => {
    try {
      await academicService.updateChapter(chapterId, { isCompleted }, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Toggle chapter error:", err);
    }
  };

  // 5. Delete Chapter
  const handleDeleteChapter = async (chapterId) => {
    try {
      await academicService.deleteChapter(chapterId, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete chapter error:", err);
    }
  };

  // 6. Update Weekly Spent Hours
  const handleUpdateWeekHours = async (academicId, weekId, hoursSpent) => {
    try {
      await academicService.updateWeekHours(
        academicId,
        weekId,
        hoursSpent,
        token,
      );
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Update week hours error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <BookOpen className="h-5 w-5 text-indigo-600" /> Academic Tracker
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track chapter progress & weekly hours spent per subject
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAcademic(null);
            setIsModalOpen(true);
          }}
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add Subject
        </button>
      </div>

      {/* Main Content Grid */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading Academic Tracker...
        </div>
      ) : academics.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500">
            No subjects added for this month yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {academics.map((item) => (
            <AcademicCard
              key={item.id}
              academic={item}
              onEdit={(ac) => {
                setEditingAcademic(ac);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteAcademic}
              onAddChapter={handleAddChapter}
              onToggleChapter={handleToggleChapter}
              onDeleteChapter={handleDeleteChapter}
              onUpdateWeekHours={handleUpdateWeekHours}
            />
          ))}
        </div>
      )}

      {/* Academic Add/Edit Modal */}
      <AcademicForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingAcademic}
      />
    </div>
  );
}
