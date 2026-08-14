"use client";

import { useState } from "react";

export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, category });
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 bg-[#141720] border border-[#252a38] p-3 rounded-xl"
    >
      <input
        type="text"
        placeholder="Task name (e.g., 4 Hours Web Dev Practice)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-[#0d0f14] border border-[#252a38] text-xs text-white p-2.5 rounded w-full focus:outline-none focus:border-[#5b6af0]"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-[#0d0f14] border border-[#252a38] text-xs text-[#8892b0] p-2.5 rounded focus:outline-none"
      >
        <option value="Development">Development</option>
        <option value="Academic">Academic</option>
        <option value="Health">Health</option>
        <option value="Routine">Routine</option>
      </select>
      <button
        type="submit"
        className="bg-[#5b6af0] hover:bg-[#4b59d0] text-white text-xs font-mono px-4 py-2 rounded cursor-pointer transition-all whitespace-nowrap"
      >
        + Add Task
      </button>
    </form>
  );
}
