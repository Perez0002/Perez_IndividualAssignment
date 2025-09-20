import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Engineer, Task, CompletedTask } from "../types/interfaces";

  interface ManagerPageProps {
    engineers: Engineer[];
    setEngineers: React.SetStateAction<Engineer[]>;
    tasks: Task[];
    setTasks: React.SetStateAction<Task[]>;
    completedTasks: CompletedTask[];
    setCompletedTasks: React.SetStateAction<CompletedTask[]>;
  }

  function ManagerPage({ engineers, setEngineers, tasks, setTasks, completedTasks, setCompletedTasks }: ManagerPageProps) {
    const [newEngineer, setNewEngineer] = useState("");
    const [newTask, setNewTask] = useState({ name: "", description: "", estimatedTime: 0 });
    const [assignTaskName, setAssignTaskName] = useState("");
    const [assignEngineerName, setAssignEngineerName] = useState("");
    const navigate = useNavigate();

    // Engineer use cases
    const handleAddEngineer = () => {};
    const handleRemoveEngineer = () => {};

    // Task use cases
    const handleAddTask = () => {};
    const handleRemoveTask = () => {};

    // Assign use case
    const handleAssignTask = () => {};

    return (
      <div>
        <button onClick={() => navigate("/engineer")}>To Engineer View</button>
        <h1>Manager Dashboard</h1>
        
        {/* Engineer use cases */}
        <h2>Engineers</h2>
        <form onSubmit={e => { e.preventDefault(); handleAddEngineer(); }}>
          <label>Add Engineer:</label>
          <input
            type="text"
            placeholder="Engineer Name"
            value={newEngineer}
            onChange={e => setNewEngineer(e.target.value)}
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
            {engineers.map(e => (
              <tr key={e.name}>
                <td>{e.name}</td>
                <td>
                  <button type="button" onClick={() => handleRemoveEngineer(e.name)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tasks use cases */}
        <h2>Tasks</h2>
        <form onSubmit={e => {handleAddTask(); }}>
          <label>Add Task:</label>
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.name}
            onChange={e => setNewTask()}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={e => setNewTask()}
          />
          <input
            type="number"
            placeholder="Estimated Time (minutes)"
            value={newTask.estimatedTime || ""}
            onChange={e => setNewTask()}
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
            {tasks.map(t => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>{t.description}</td>
                <td>{t.estimatedTime}</td>
                <td>{t.assignedEngineer || ""}</td>
                <td>
                  <button type="button" onClick={() => handleRemoveTask()}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Assign task use case */}
        <form onSubmit={e => {handleAssignTask(); }}>
          <label>Assign Task:</label>
          <select value={assignTaskName} onChange={e => setAssignTaskName(e.target.value)}>
            <option value="">--task list--</option>
          </select>
          <label> to </label>
          <select value={assignEngineerName} onChange={e => setAssignEngineerName(e.target.value)}>
            <option value="">--engineer list--</option>
          </select>
          <button type="submit">Assign</button>
        </form>

        {/* Completed tasks */}
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
      </div>
    );
  }

  export default ManagerPage;