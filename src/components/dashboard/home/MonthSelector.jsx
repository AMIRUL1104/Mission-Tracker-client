"use client";

import { useTracker } from "@/context/TrackerContext";

export default function MonthSelector() {
  const {
    selectedDate,
    prevMonth,
    nextMonth,
    resetToCurrentMonth,
    loadingMonth,
  } = useTracker();

  const formattedMonth = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-3 bg-[#141720] border border-[#252a38] p-2 rounded-lg font-mono text-xs">
      <button
        onClick={prevMonth}
        className="px-2 py-1 bg-[#1a1e2a] hover:bg-[#252a38] text-[#8892b0] hover:text-white rounded cursor-pointer transition-all"
      >
        ◀
      </button>

      <span className="text-white font-semibold min-w-[120px] text-center">
        {loadingMonth ? "Loading..." : formattedMonth}
      </span>

      <button
        onClick={nextMonth}
        className="px-2 py-1 bg-[#1a1e2a] hover:bg-[#252a38] text-[#8892b0] hover:text-white rounded cursor-pointer transition-all"
      >
        ▶
      </button>

      <button
        onClick={resetToCurrentMonth}
        className="px-2 py-1 text-[10px] bg-[#5b6af0]/10 text-[#5b6af0] border border-[#5b6af0]/30 hover:bg-[#5b6af0]/20 rounded cursor-pointer transition-all ml-1"
      >
        Today
      </button>
    </div>
  );
}
