"use client";
export default function StreakStatsCards({ stats }) {
  const {
    currentStreak = 0,
    bestStreak = 0,
    totalCompletedDays = 0,
  } = stats || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Current Streak */}
      <div className="bg-[#1a1e2a] border border-[#252a38] p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">
            Current Streak
          </p>
          <h3 className="text-3xl font-bold text-white font-mono">
            {currentStreak}{" "}
            <span className="text-sm font-normal text-gray-400">Days</span>
          </h3>
        </div>
        <div className="text-3xl bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
          🔥
        </div>
      </div>

      {/* Best Streak */}
      <div className="bg-[#1a1e2a] border border-[#252a38] p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">
            Best Streak
          </p>
          <h3 className="text-3xl font-bold text-white font-mono">
            {bestStreak}{" "}
            <span className="text-sm font-normal text-gray-400">Days</span>
          </h3>
        </div>
        <div className="text-3xl bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
          🏆
        </div>
      </div>

      {/* Total Completed */}
      <div className="bg-[#1a1e2a] border border-[#252a38] p-5 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">
            Total Completed
          </p>
          <h3 className="text-3xl font-bold text-white font-mono">
            {totalCompletedDays}{" "}
            <span className="text-sm font-normal text-gray-400">Days</span>
          </h3>
        </div>
        <div className="text-3xl bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          📊
        </div>
      </div>
    </div>
  );
}
