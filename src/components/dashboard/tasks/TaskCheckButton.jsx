"use client";

import { useState } from "react";

export default function TaskCheckButton({ taskId, date, isChecked, onToggle }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle(taskId, date, !isChecked);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs border transition-all cursor-pointer ${
        isChecked
          ? "bg-[#3dd68c]/20 border-[#3dd68c] text-[#3dd68c]"
          : "bg-[#0d0f14] border-[#252a38] text-[#8892b0] hover:border-[#8892b0]"
      }`}
    >
      {loading ? "..." : isChecked ? "✓" : ""}
    </button>
  );
}
