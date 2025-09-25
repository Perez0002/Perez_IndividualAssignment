import { describe, it, expect, vi, afterEach } from "vitest";
import {
	render,
	screen,
	fireEvent,
	within,
	cleanup,
} from "@testing-library/react";
import EngineerPage from "./EngineerPage";
import type { Engineer, Task, CompletedTask } from "../types/interfaces";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
	cleanup();
});

describe("EngineerPage - Task completion", () => {
	const setup = (
		engineers: Engineer[] = [],
		tasks: Task[] = [],
		completedTasks: CompletedTask[] = []
	) => {
		const setTasks = vi.fn();
		const setCompletedTasks = vi.fn();

		render(
			<MemoryRouter>
				<EngineerPage
					engineers={engineers}
					tasks={tasks}
					setTasks={setTasks}
					completedTasks={completedTasks}
					setCompletedTasks={setCompletedTasks}
				/>
			</MemoryRouter>
		);

		return { setTasks, setCompletedTasks };
	};

	it("does not allow completing a task without actual time input", () => {
		setup(
			[{ name: "Olivia" }],
			[
				{
					name: "Task A",
					description: "Test task",
					estimatedTime: 30,
					assignedEngineer: "Olivia",
				},
			]
		);

		const row = screen.getByText("Task A").closest("tr")!;
		const doneButton = within(row).getByRole("button", { name: /done/i });
		expect(doneButton).toHaveProperty("disabled", true);
	});

	it("allows completing a task only when actual time is inputted", () => {
		const { setTasks, setCompletedTasks } = setup(
			[{ name: "Olivia" }],
			[
				{
					name: "Task B",
					description: "Another task",
					estimatedTime: 45,
					assignedEngineer: "Olivia",
				},
			]
		);

		const row = screen.getByText("Task B").closest("tr")!;
		const input = within(row).getByPlaceholderText("Enter minutes");
		fireEvent.change(input, { target: { value: "50" } });

		const doneButton = within(row).getByRole("button", { name: /done/i });
		expect(doneButton).toHaveProperty("disabled", false);

		fireEvent.click(doneButton);
		expect(setTasks).toHaveBeenCalled();
		expect(setCompletedTasks).toHaveBeenCalled();
	});
});
