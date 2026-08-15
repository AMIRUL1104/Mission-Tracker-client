"use client";

export default function StreakCalendarGrid({
  monthStreaks = [],
  currentMonthData,
}) {
  const year = currentMonthData?.year || new Date().getFullYear();
  const month = currentMonthData?.month || new Date().getMonth() + 1;

  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const totalDaysInMonth = new Date(year, month, 0).getDate();
  const todayStr = new Date().toISOString().split("T")[0];

  const completedSet = new Set(monthStreaks);

  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => {
    const day = i + 1;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${monthStr}-${formattedDay}`;
  });

  return (
    <div className="rounded-xl border border-[#252a38] bg-[#1a1e2a] p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-lg font-bold text-white">
          Monthly Calendar Overview
        </h3>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
          ⚡ Auto-Synced with Daily Tasks
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center md:gap-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1 font-mono text-xs text-gray-400">
            {d}
          </div>
        ))}

        {daysArray.map((dateStr) => {
          const dayNum = parseInt(dateStr.split("-")[2], 10);
          const isDone = completedSet.has(dateStr);
          const isToday = dateStr === todayStr;
          const isFuture = dateStr > todayStr;

          return (
            <div
              key={dateStr}
              title={
                isDone
                  ? "All tasks completed!"
                  : isFuture
                    ? "Future date"
                    : "Tasks pending"
              }
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center font-mono text-sm transition-all duration-200 border select-none
                ${isFuture ? "bg-[#141720]/50 text-gray-600 border-[#252a38]/30" : ""}
                ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-lg shadow-emerald-500/5"
                    : "bg-[#141720] text-gray-400 border-[#252a38]"
                }
                ${isToday ? "ring-2 ring-blue-500" : ""}
              `}
            >
              <span>{dayNum}</span>
              {isDone && (
                <span className="mt-0.5 text-[10px] font-bold text-emerald-400">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
