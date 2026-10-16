import { Plus } from "lucide-react";
import { useState } from "react";

export default function TaskInput({ onAddTask, isDarkMode }) {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !scheduledAt) return;

    onAddTask({ title: trimmedTitle, scheduledAt });
    setTitle("");
    setScheduledAt("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Add a new task..."
        aria-label="New task"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={`h-[52px] min-w-0 flex-1 rounded-lg border px-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          isDarkMode
            ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-400 focus:ring-blue-900"
            : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-sm"
        }`}
      />
      <input
        type="datetime-local"
        aria-label="Task date and time"
        required
        value={scheduledAt}
        onChange={(event) => setScheduledAt(event.target.value)}
        className={`h-[52px] min-w-0 rounded-lg border px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-[250px] ${
          isDarkMode
            ? "border-slate-700 bg-slate-900 text-slate-100 focus:ring-blue-900"
            : "border-slate-200 bg-white text-slate-800 shadow-sm"
        }`}
      />
      <button
        type="submit"
        className="flex h-[52px] items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <Plus className="h-6 w-6" />
        <span>Add Task</span>
      </button>
    </form>
  );
}
