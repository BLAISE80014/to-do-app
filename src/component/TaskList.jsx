import { Check, Pencil, Square, Trash2, X } from "lucide-react";
import { useState } from "react";

function TaskRow({ task, onToggle, onDelete, onEdit, isDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onEdit(task.id, trimmedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`grid min-h-[70px] grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b px-4 py-3 sm:grid-cols-[32px_minmax(0,1fr)_112px_32px_32px] sm:gap-x-3 sm:px-5 ${
        isDarkMode
          ? "border-slate-800 text-slate-100"
          : "border-blue-100/80 text-slate-800"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark ${task.title} pending` : `Mark ${task.title} completed`}
        className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
          task.completed
            ? "border-blue-600 bg-blue-600 text-white"
            : isDarkMode
              ? "border-slate-600 text-transparent hover:border-blue-400"
              : "border-slate-300 text-transparent hover:border-blue-500"
        }`}
      >
        {task.completed ? <Check className="h-5 w-5" strokeWidth={3} /> : <Square className="h-5 w-5" />}
      </button>

      {isEditing ? (
        <form onSubmit={handleSave} className="flex min-w-0 items-center gap-2 sm:col-start-2">
          <input
            autoFocus
            aria-label={`Edit ${task.title}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={`min-w-0 flex-1 rounded-md border px-2 py-1 text-sm outline-none focus:border-blue-500 ${
              isDarkMode
                ? "border-slate-700 bg-slate-900 text-slate-100"
                : "border-slate-200 bg-white text-slate-800"
            }`}
          />
          <button type="submit" aria-label="Save task" className="text-blue-600 hover:text-blue-700">
            <Check className="h-5 w-5" />
          </button>
          <button type="button" onClick={handleCancel} aria-label="Cancel editing" className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <div className="min-w-0">
          <span
            className={`block truncate text-base ${
              task.completed
                ? "text-slate-400 line-through"
                : isDarkMode
                  ? "text-slate-100"
                  : "text-slate-800"
            }`}
          >
            {task.title}
          </span>
          {task.scheduledAt && (
            <time
              dateTime={task.scheduledAt}
              className={`mt-0.5 block truncate text-xs ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Scheduled for{" "}
              {new Intl.DateTimeFormat(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }).format(new Date(task.scheduledAt))}
            </time>
          )}
        </div>
      )}

      <span
        className={`col-start-2 w-fit rounded-full px-3.5 py-1 text-xs font-semibold sm:col-start-auto ${
          task.completed
            ? isDarkMode
              ? "bg-green-900/50 text-green-300"
              : "bg-green-100 text-green-700"
            : isDarkMode
              ? "bg-amber-900/50 text-amber-300"
              : "bg-amber-100 text-amber-700"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>

      {!isEditing && (
        <button
          type="button"
          onClick={() => {
            setTitle(task.title);
            setIsEditing(true);
          }}
          aria-label={`Edit ${task.title}`}
          className={`col-start-3 row-start-1 rounded p-1 transition-colors sm:col-start-auto sm:row-start-auto ${
            isDarkMode ? "text-slate-400 hover:text-blue-300" : "text-slate-500 hover:text-blue-600"
          }`}
        >
          <Pencil className="h-5 w-5" />
        </button>
      )}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className={`col-start-3 row-start-2 rounded p-1 transition-colors sm:col-start-5 sm:row-start-auto ${
          isDarkMode ? "text-rose-400 hover:text-rose-300" : "text-red-500 hover:text-red-700"
        }`}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit, isDarkMode }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <section
      aria-label="Tasks"
      className={`overflow-hidden rounded-lg border shadow-sm ${
        isDarkMode ? "border-slate-800 bg-slate-900" : "border-blue-100 bg-white"
      }`}
    >
      {filteredTasks.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          No tasks in this list yet.
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isDarkMode={isDarkMode}
          />
        ))
      )}
      <footer
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-4 text-xs ${
          isDarkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        <span>Showing {filteredTasks.length} tasks</span>
        <span aria-hidden="true">|</span>
        <span>{completedCount} completed</span>
        <span aria-hidden="true">|</span>
        <span>{pendingCount} pending</span>
      </footer>
    </section>
  );
}
