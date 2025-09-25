import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import ManagerPage from "./ManagerPage";
import type { Engineer, Task, CompletedTask } from "../types/interfaces";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("ManagerPage - Engineer management", () => {
  const setup = (engineers: Engineer[] = [], tasks: Task[] = []) => {
    const setEngineers = vi.fn();
    const setTasks = vi.fn();
    const setCompletedTasks = vi.fn();

    render(
      <MemoryRouter>
        <ManagerPage
          engineers={engineers}
          setEngineers={setEngineers}
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={[] as CompletedTask[]}
          setCompletedTasks={setCompletedTasks}
        />
      </MemoryRouter>
    );

    return { setEngineers, setTasks, setCompletedTasks };
  };

  it("adds a new engineer", () => {
    const { setEngineers } = setup([]);

    const input = screen.getByPlaceholderText("Engineer Name");
    fireEvent.change(input, { target: { value: "Olivia" } });

    const form = input.closest("form")!;
    const addButton = within(form).getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(setEngineers).toHaveBeenCalledWith([{ name: "Olivia" }]);
  });

  it("removes an engineer", () => {
    const { setEngineers } = setup([{ name: "Liv" }]);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(setEngineers).toHaveBeenCalledWith([]);
  });

  it("does not add a duplicate engineer", () => {
    const { setEngineers } = setup([{ name: "Olivia" }]);

    const input = screen.getByPlaceholderText("Engineer Name");
    fireEvent.change(input, { target: { value: "Olivia" } });

    const form = input.closest("form")!;
    const addButton = within(form).getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(setEngineers).not.toHaveBeenCalledWith([
      { name: "Olivia" },
      { name: "Olivia" },
    ]);
  });

  it("disables remove button for a task assigned to an engineer", () => {
    setup(
      [],
      [
        {
          name: "Task A",
          description: "Important task",
          estimatedTime: 45,
          assignedEngineer: "Olivia",
        },
      ]
    );

    const row = screen.getByText("Task A").closest("tr")!;
    const removeButton = within(row).getByRole("button", { name: /remove/i });

    expect(removeButton).toHaveProperty("disabled", true);
  });

  it("assigns a task to an engineer", () => {
    const { setTasks } = setup(
      [{ name: "Josh" }],
      [
        {
          name: "Task B",
          description: "Write docs",
          estimatedTime: 30,
        },
      ]
    );

    // the first select is the task dropdown
    const selects = screen.getAllByRole("combobox");
    const taskSelect = selects[0];
    const engineerSelect = selects[1];

    // choose Task B
    fireEvent.change(taskSelect, { target: { value: "Task B" } });

    // choose Josh
    fireEvent.change(engineerSelect, { target: { value: "Josh" } });

    // click Assign button
    fireEvent.click(screen.getByRole("button", { name: /assign/i }));

    expect(setTasks).toHaveBeenCalledWith([
      {
        name: "Task B",
        description: "Write docs",
        estimatedTime: 30,
        assignedEngineer: "Josh",
      },
    ]);
  });
});
