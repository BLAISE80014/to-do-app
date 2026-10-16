import { useEffect, useState } from "react";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import TaskInput from "./component/TaskInput";
import TaskList from "./component/TaskList";

const storageKey = "todoapp-tasks";

const initialTasks = [
  { id: 1, title: "Complete React project", completed: false },
  { id: 2, title: "Read a book", completed: true },
  { id: 3, title: "Go to the gym", completed: false },
  { id: 4, title: "Learn JavaScript", completed: true },
  { id: 5, title: "Plan tomorrow's work", completed: false },
];

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(storageKey);
    if (storedTasks === null) return initialTasks;

    const parsedTasks = JSON.parse(storedTasks);
    if (
      !Array.isArray(parsedTasks) ||
      !parsedTasks.every(
        (task) =>
          task &&
          (typeof task.id === "number" || typeof task.id === "string") &&
          typeof task.title === "string" &&
          typeof task.completed === "boolean" &&
          (task.scheduledAt === undefined || typeof task.scheduledAt === "string"),
      )
    ) {
      throw new Error("Saved task list has an invalid format.");
    }

    return parsedTasks;
  } catch (error) {
    console.error("Unable to load saved tasks:", error);
    return initialTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("All Tasks");

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, title) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, title } : task)),
    );
  };

  const handleAddTask = ({ title, scheduledAt }) => {
    setTasks((currentTasks) => [
      { id: Date.now(), title, completed: false, scheduledAt },
      ...currentTasks,
    ]);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div
      className={`flex min-h-screen flex-col font-sans ${
        isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-800"
      }`}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-1 flex-col sm:flex-row">
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          setFilter={setFilter}
          totalCount={tasks.length}
          completedCount={completedCount}
          pendingCount={pendingCount}
          isDarkMode={isDarkMode}
        />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-6xl space-y-6 p-5 sm:p-[30px]">
            <div>
              <h1
                className={`text-3xl font-bold tracking-tight sm:text-[34px] ${
                  isDarkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                My To-Do List
              </h1>
              <p className="mt-1 text-base text-slate-500">
                Stay organized and get things done!
              </p>
            </div>
            <TaskInput onAddTask={handleAddTask} isDarkMode={isDarkMode} />
            <TaskList
              tasks={tasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
              isDarkMode={isDarkMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
}