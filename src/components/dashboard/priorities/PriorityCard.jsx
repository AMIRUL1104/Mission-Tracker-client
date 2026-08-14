"use client";

import { useState } from "react";

export default function PriorityCard({
  priority,
  onToggleMilestone,
  onAddMilestone,
  onDeletePriority,
  onDeleteMilestone,
}) {
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

  const handleAddMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    onAddMilestone(priority.id, newMilestoneTitle);
    setNewMilestoneTitle("");
  };

  return (
    <div className="bg-[#141720] border border-[#252a38] rounded-xl p-5 mb-4 shadow-sm">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-bold text-white font-mono">
            {priority.title}
          </h3>
          {priority.description && (
            <p className="text-xs text-[#8892b0] mt-1">
              {priority.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDeletePriority(priority.id)}
          className="text-[#ff5555] opacity-60 hover:opacity-100 text-xs font-mono cursor-pointer transition-all"
        >
          [Delete]
        </button>
      </div>

      {/* Progress Bar */}
      <div className="my-4">
        <div className="flex justify-between text-xs font-mono mb-1">
          <span className="text-[#8892b0]">Progress</span>
          <span className="text-[#3dd68c] font-bold">{priority.progress}%</span>
        </div>
        <div className="w-full bg-[#1a1e2a] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#3dd68c] h-full transition-all duration-300 rounded-full"
            style={{ width: `${priority.progress}%` }}
          />
        </div>
      </div>

      {/* Milestones List */}
      <div className="mt-4 border-t border-[#252a38] pt-3">
        <h4 className="text-xs font-mono text-[#8892b0] mb-2 uppercase tracking-wider">
          Milestones
        </h4>

        <div className="space-y-2 mb-3">
          {priority.milestones?.map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-center justify-between group"
            >
              <label className="flex items-center gap-2 text-xs text-[#d8ddf0] cursor-pointer">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={(e) =>
                    onToggleMilestone(milestone.id, e.target.checked)
                  }
                  className="accent-[#5b6af0] rounded cursor-pointer"
                />
                <span
                  className={
                    milestone.completed ? "line-through text-[#8892b0]" : ""
                  }
                >
                  {milestone.title}
                </span>
              </label>
              <button
                onClick={() => onDeleteMilestone(milestone.id)}
                className="text-[10px] text-[#ff5555] opacity-0 group-hover:opacity-100 cursor-pointer transition-all"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Milestone Form */}
        <form onSubmit={handleAddMilestoneSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="+ Add milestone..."
            value={newMilestoneTitle}
            onChange={(e) => setNewMilestoneTitle(e.target.value)}
            className="bg-[#0d0f14] border border-[#252a38] text-xs text-white px-3 py-1.5 rounded w-full focus:outline-none focus:border-[#5b6af0]"
          />
          <button
            type="submit"
            className="bg-[#5b6af0]/10 text-[#5b6af0] border border-[#5b6af0]/30 hover:bg-[#5b6af0]/20 text-xs px-3 py-1.5 rounded cursor-pointer transition-all font-mono"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
