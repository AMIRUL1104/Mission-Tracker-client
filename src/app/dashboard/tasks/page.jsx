"use client";

import { useState, useEffect } from "react";
import { useTracker } from "@/context/TrackerContext";
import { useAuth } from "@/context/AuthContext";
import AddTaskForm from "@/components/dashboard/tasks/AddTaskForm";
import TaskCheckButton from "@/components/dashboard/tasks/TaskCheckButton";
import {
  fetchTasksByMonth,
  createTaskApi,
  toggleDailyCheckApi,
  deleteTaskApi,
} from "@/lib/taskApi";

export default function TasksPage() {
  const { currentMonthData, selectedDate, loadingMonth } = useTracker();
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // নির্ধারিত মাসের মোট দিন সংখ্যা বের করার লজিক
  const daysInMonth = currentMonthData
    ? new Date(currentMonthData.year, currentMonthData.month, 0).getDate()
    : 30;

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const loadTasks = async () => {
    if (!currentMonthData?.id || !token) return;
    setLoading(true);
    try {
      const res = await fetchTasksByMonth(currentMonthData.id, token);
      if (res.success) setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [currentMonthData, token]);

  const handleAddTask = async (data) => {
    if (!currentMonthData?.id) return;
    const res = await createTaskApi(
      { monthId: currentMonthData.id, ...data },
      token,
    );
    if (res.success) loadTasks();
  };

  const handleToggleCheck = async (taskId, date, completed) => {
    const res = await toggleDailyCheckApi({ taskId, date, completed }, token);
    if (res.success) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id !== taskId) return task;
          const existingChecks = task.dailyChecks || [];
          const updatedChecks = existingChecks.some((c) => c.date === date)
            ? existingChecks.map((c) =>
                c.date === date ? { ...c, completed } : c,
              )
            : [...existingChecks, { taskId, date, completed }];
          return { ...task, dailyChecks: updatedChecks };
        }),
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    const res = await deleteTaskApi(taskId, token);
    if (res.success) loadTasks();
  };

  if (loadingMonth)
    return (
      <div className="text-xs font-mono text-[#8892b0]">Loading month...</div>
    );

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold font-mono text-white mb-6">
        <span className="text-[#5b6af0]">{"//"}</span> Daily Task Tracker
      </h1>

      <AddTaskForm onAddTask={handleAddTask} />

      {loading ? (
        <div className="text-xs font-mono text-[#8892b0]">
          Loading tasks grid...
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-xs font-mono text-[#8892b0] bg-[#141720] p-6 rounded-xl border border-[#252a38] text-center">
          No tasks added for this month yet.
        </div>
      ) : (
        <div className="bg-[#141720] border border-[#252a38] rounded-xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#252a38] bg-[#0d0f14]/50">
                <th className="text-left text-xs font-mono text-[#8892b0] p-3 sticky left-0 bg-[#141720] z-10 min-w-[180px]">
                  Task
                </th>
                {daysArray.map((day) => {
                  const dateStr = `${currentMonthData.year}-${String(
                    currentMonthData.month,
                  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isToday =
                    new Date().toISOString().split("T")[0] === dateStr;

                  return (
                    <th
                      key={day}
                      className={`text-center text-[10px] font-mono p-2 min-w-[36px] ${
                        isToday
                          ? "text-[#5b6af0] font-bold bg-[#5b6af0]/10"
                          : "text-[#8892b0]"
                      }`}
                    >
                      {day}
                    </th>
                  );
                })}
                <th className="p-3 text-xs font-mono text-[#ff5555]"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#252a38]/50 hover:bg-[#1a1e2a]/30"
                >
                  <td className="p-3 text-xs text-white font-mono sticky left-0 bg-[#141720] z-10 border-r border-[#252a38]/40">
                    <div>{task.title}</div>
                    {task.category && (
                      <span className="text-[9px] text-[#5b6af0] bg-[#5b6af0]/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {task.category}
                      </span>
                    )}
                  </td>

                  {daysArray.map((day) => {
                    const dateStr = `${currentMonthData.year}-${String(
                      currentMonthData.month,
                    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                    const checkRecord = task.dailyChecks?.find(
                      (c) => c.date === dateStr,
                    );
                    const isChecked = checkRecord
                      ? checkRecord.completed
                      : false;

                    return (
                      <td key={day} className="p-1 text-center">
                        <TaskCheckButton
                          taskId={task.id}
                          date={dateStr}
                          isChecked={isChecked}
                          onToggle={handleToggleCheck}
                        />
                      </td>
                    );
                  })}

                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-[#ff5555] opacity-50 hover:opacity-100 text-xs font-mono px-2"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
