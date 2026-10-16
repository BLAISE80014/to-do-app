import { Check, Moon, Sun } from "lucide-react";

export default function Header({ isDarkMode, setIsDarkMode }) {
  return (
    <header
      className={`flex h-[72px] shrink-0 items-center justify-between border-b px-5 sm:px-8 ${
        isDarkMode ? "border-slate-800 bg-slate-900" : "border-blue-100 bg-white"
      }`}
    >
      <a href="#" className="flex items-center gap-3" aria-label="To-Do List home">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
          <Check className="h-6 w-6" strokeWidth={3} />
        </span>
        <span
          className={`text-xl font-bold tracking-tight sm:text-2xl ${
            isDarkMode ? "text-slate-100" : "text-slate-900"
          }`}
        >
          To-Do List
        </span>
      </a>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`rounded-full p-2 transition-colors ${
            isDarkMode
              ? "text-amber-300 hover:bg-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {isDarkMode ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shadow-sm">
          B
        </div>
      </div>
    </header>
  );
}
