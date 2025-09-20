import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task, CompletedTask } from "../types/interfaces";

interface EngineerPageProps {
	tasks: Task[];
	setTasks: React.SetStateAction<Task[]>;
	completedTasks: CompletedTask[];
	setCompletedTasks: React.SetStateAction<CompletedTask[]>;
}

function EngineerPage({ tasks, setTasks, completedTasks, setCompletedTasks }: EngineerPageProps) {
	const [actualTimes, setActualTimes] = useState<{ [key: string]: number }>({});
	const navigate = useNavigate();

	const assignedTasks = tasks.filter(t => t.assignedEngineer);

	const handleActualTimeChange = () => {};

	const handleCompleteTask = ()=> {};

	return (
		<div>
			<button onClick={() => navigate("/manager")}>Switch to Manager View</button>
			<h1>Engineer Dashboard</h1>

			<h2>My Assigned Tasks</h2>
			<table border={1} cellSpacing={0} cellPadding={5}>
				<thead>
					<tr>
						<th>Task Name</th>
						<th>Task Description</th>
						<th>Estimated Time (min)</th>
						<th>Actual Time (min)</th>
						<th>Mark as Done</th>
					</tr>
				</thead>
				<tbody>
					{assignedTasks.map(task => (
						<tr key={task.name}>
							<td>{task.name}</td>
							<td>{task.description}</td>
							<td>{task.estimatedTime}</td>
							<td>
								<input
									type="number"
									placeholder="Enter minutes"
									value={actualTimes[task.name] || ""}
									onChange={e => handleActualTimeChange()}
									min={1}
								/>
							</td>
							<td>
								<button
									type="button"
									onClick={() => handleCompleteTask(task)}
									disabled={!actualTimes[task.name] || actualTimes[task.name] <= 0}
								>
									Done
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Completed Tasks</h2>
			<table border={1} cellSpacing={0} cellPadding={5}>
				<thead>
					<tr>
						<th>Task</th>
						<th>Estimated Time (min)</th>
						<th>Actual Time (min)</th>
					</tr>
				</thead>
				<tbody>
					{completedTasks.map((task, index) => (
						<tr key={index}>
							<td>{task.name}</td>
							<td>{task.estimatedTime}</td>
							<td>{task.actualTime}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default EngineerPage;
