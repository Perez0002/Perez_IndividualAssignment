import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Engineer, Task, CompletedTask } from "../types/interfaces";
import TaskSummaryTable from "../components/TaskSummaryTable";

interface ManagerPageProps {
  engineers: Engineer[];
  setEngineers: React.Dispatch<React.SetStateAction<Engineer[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: CompletedTask[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<CompletedTask[]>>;
}

function ManagerPage({
  engineers,
  setEngineers,
  tasks,
  setTasks,
  completedTasks,
}: ManagerPageProps) {
  const [newEngineer, setNewEngineer] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    estimatedTime: 0,
  });
  const [assignTaskName, setAssignTaskName] = useState("");
  const [assignEngineerName, setAssignEngineerName] = useState("");
  const navigate = useNavigate();

  // Engineer use cases
  const handleAddEngineer = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newEngineer.trim() &&
      !engineers.find(
        (e) => e.name.toLowerCase() === newEngineer.toLowerCase().trim() //unique name
      )
    ) {
      setEngineers([...engineers, { name: newEngineer.trim() }]);
    }
    setNewEngineer("");
  };
  const handleRemoveEngineer = (name: string) => {
    setEngineers(engineers.filter((e) => e.name !== name));
  };

  // Task use cases
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.name && newTask.description && newTask.estimatedTime > 0) {
      setTasks([...tasks, { ...newTask }]);
    }
    setNewTask({ name: "", description: "", estimatedTime: 0 });
  };
  const handleRemoveTask = (name: string) => {
    const task = tasks.find((t) => t.name === name);
    if (task && !task.assignedEngineer) {
      setTasks(tasks.filter((t) => t.name !== name));
    }
  };

  // Assign task use case
  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks(
      tasks.map((t) =>
        t.name === assignTaskName && !t.assignedEngineer && assignEngineerName
          ? { ...t, assignedEngineer: assignEngineerName }
          : t
      )
    );
    setAssignTaskName("");
    setAssignEngineerName("");
  };

  return (
    <div>
      <button onClick={() => navigate("/engineer")}>
        Switch to Engineer View
      </button>
      <h1>Manager Dashboard</h1>

      {/* Engineers use cases */}
      <h2>Engineers</h2>
      <form onSubmit={handleAddEngineer}>
        <label>Add Engineer:</label>
        <input
          type="text"
          placeholder="Engineer Name"
          value={newEngineer}
          onChange={(e) => setNewEngineer(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <table border={1} cellSpacing={0} cellPadding={5}>
        <thead>
          <tr>
            <th>Engineer Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {engineers.map((e) => (
            <tr key={e.name}>
              <td>{e.name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveEngineer(e.name)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tasks use cases */}
      <h2>Tasks</h2>
      <form onSubmit={handleAddTask}>
        <label>Add Task:</label>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Estimated Time (minutes)"
          value={newTask.estimatedTime || ""}
          onChange={(e) =>
            setNewTask({ ...newTask, estimatedTime: Number(e.target.value) })
          }
        />
        <button type="submit">Add</button>
      </form>
      <table border={1} cellSpacing={0} cellPadding={5}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Estimated Time (min)</th>
            <th>Assigned Engineer</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.description}</td>
              <td>{t.estimatedTime}</td>
              <td>{t.assignedEngineer || ""}</td>
              <td>
                <button
                  type="button"
                  disabled={!!t.assignedEngineer}
                  onClick={() => handleRemoveTask(t.name)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign task use case */}
      <form onSubmit={handleAssignTask}>
        <label>Assign Task:</label>
        <select
          value={assignTaskName}
          onChange={(e) => setAssignTaskName(e.target.value)}
        >
          <option value="">--task list--</option>
          {tasks
            .filter((t) => !t.assignedEngineer)
            .map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
        </select>
        <label> to </label>
        <select
          value={assignEngineerName}
          onChange={(e) => setAssignEngineerName(e.target.value)}
        >
          <option value="">--engineer list--</option>
          {engineers.map((e) => (
            <option key={e.name} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <button type="submit">Assign</button>
      </form>

      {/* Completed Tasks Section */}
      <h2>Completed Tasks</h2>
      <table border={1} cellSpacing={0} cellPadding={5}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Engineer</th>
            <th>Estimated Time (min)</th>
            <th>Actual Time (min)</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.engineer}</td>
              <td>{task.estimatedTime}</td>
              <td>{task.actualTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task minute summary */}
      <TaskSummaryTable
        completedTasks={completedTasks}
        uncompletedTasks={tasks.filter(
          (t) =>
            !t.assignedEngineer ||
            !completedTasks.some((ct) => ct.name === t.name)
        )}
      />
    </div>
  );
}

export default ManagerPage;
