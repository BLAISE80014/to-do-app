function TaskItem({ task, onToggle, onDelete, isDarkMode }) {
  const getPriorityBadge = (prio) => {
    switch (prio) {
      case "High":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Medium":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "Low":
        return "bg-sky-100 text-sky-700 border border-sky-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div
      className={`p-5 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/80 ${isDarkMode ? "hover:bg-slate-700/50" : ""}`}
    >
      <div className="flex items-start gap-4 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            task.completed
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-slate-300 hover:border-blue-500"
          }`}
        >
          {task.completed && <CheckSquare className="w-3.5 h-3.5" />}
        </button>

        <div className="min-w-0">
          <h3
            className={`font-semibold text-sm truncate ${task.completed ? "line-through text-slate-400" : isDarkMode ? "text-slate-100" : "text-slate-800"}`}
          >
            {task.title}
          </h3>
          <p className="text-xs text-slate-400 truncate mt-0.5">{task.desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityBadge(task.priority)}`}
        >
          {task.priority}
        </span>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.date}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskItem;