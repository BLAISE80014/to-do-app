import { CheckSquare, Clock3, House } from "lucide-react";

export default function Sidebar({
  activeNav,
  setActiveNav,
  setFilter,
  totalCount,
  completedCount,
  pendingCount,
  isDarkMode,
}) {
  const navItems = [
    { name: "All Tasks", icon: House, count: totalCount, filter: "All" },
    { name: "Completed", icon: CheckSquare, count: completedCount, filter: "Completed" },
    { name: "Pending", icon: Clock3, count: pendingCount, filter: "Pending" },
  ];

  const handleNavClick = (item) => {
    setActiveNav(item.name);
    setFilter(item.filter);
  };

  return (
    <aside
      className={`w-full shrink-0 border-b p-3 sm:w-[280px] sm:border-b-0 sm:border-r sm:p-5 ${
        isDarkMode
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-blue-100 bg-gradient-to-b from-blue-50/80 to-slate-50 text-slate-700"
      }`}
    >
      <nav className="flex gap-2 sm:flex-col sm:gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.name;
          const countColor =
            item.name === "Completed"
              ? "bg-green-500 text-white"
              : item.name === "Pending"
                ? "bg-amber-300 text-amber-900"
                : "bg-blue-600 text-white";

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => handleNavClick(item)}
              aria-pressed={isActive}
              className={`flex min-w-0 flex-1 items-center justify-between gap-1 rounded-lg px-1.5 py-2.5 text-xs font-medium transition-colors sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${
                isActive
                  ? "bg-blue-100/80 text-blue-600"
                  : isDarkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-700 hover:bg-white/70"
              }`}
            >
              <span className="flex min-w-0 items-center gap-1 sm:gap-4">
                <Icon
                  className={`hidden h-5 w-5 shrink-0 sm:block ${
                    isActive ? "text-blue-600" : isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </span>
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs ${countColor}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
