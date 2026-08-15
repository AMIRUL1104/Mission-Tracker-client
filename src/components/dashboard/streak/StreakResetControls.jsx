"use client";

import { useState } from "react";

export default function StreakResetControls({ onReset }) {
  const [loading, setLoading] = useState(false);

  const handleResetClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all streak history? This action cannot be undone.",
    );
    if (!confirmed) return;

    setLoading(true);
    await onReset();
    setLoading(false);
  };

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={handleResetClick}
        disabled={loading}
        className="cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Streak History"}
      </button>
    </div>
  );
}
