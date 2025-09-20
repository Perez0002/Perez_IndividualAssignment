import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './App.css'
import EngineerPage from "./pages/EngineerPage";
import ManagerPage from "./pages/ManagerPage";

import { useState } from "react";
import type { Engineer, Task, CompletedTask } from "./types/interfaces";

const initialEngineers: Engineer[] = [
  { name: "Olivia Perez" },
  { name: "Professor/TA" },
];
const initialTasks: Task[] = [
  { name: "Task 1", description: "Design manager view mockup", estimatedTime: 60, assignedEngineer: "Olivia Perez" },
  { name: "Task 2", description: "Design engineer view mockup", estimatedTime: 30, assignedEngineer: "Olivia Perez" },
  { name: "Task 3", description: "Grade hw", estimatedTime: 45, assignedEngineer: "Professor/TA" },
  { name: "Task 4", description: "misc task", estimatedTime: 180 },
];
const initialCompletedTasks: CompletedTask[] = [
  { name: "Task 0", engineer: "Olivia Perez", estimatedTime: 60, actualTime: 45 },
];

function App() {
  const [engineers, setEngineers] = useState<Engineer[]>(initialEngineers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(initialCompletedTasks);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/manager" />} />
        <Route path="/engineer" element={<EngineerPage
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />} />
        <Route path="/manager" element={<ManagerPage
          engineers={engineers}
          setEngineers={setEngineers}
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />} />
      </Routes>
    </Router>
  );
}

export default App
