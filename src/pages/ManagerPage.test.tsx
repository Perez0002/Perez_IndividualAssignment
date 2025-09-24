import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ManagerPage from "./ManagerPage";
import type { Engineer, Task, CompletedTask } from "../types/interfaces";
import { MemoryRouter } from "react-router-dom";

describe("ManagerPage - Engineer management", () => {
  const setup = (engineers: Engineer[] = []) => {
    const setEngineers = vi.fn();
    const setTasks = vi.fn();
    const setCompletedTasks = vi.fn();

    render(
      <MemoryRouter>
        <ManagerPage
          engineers={engineers}
          setEngineers={setEngineers}
          tasks={[] as Task[]}
          setTasks={setTasks}
          completedTasks={[] as CompletedTask[]}
          setCompletedTasks={setCompletedTasks}
        />
      </MemoryRouter>
    );

    return { setEngineers, setTasks, setCompletedTasks };
  };

  it("add new engineer", () => {
    const { setEngineers } = setup([]);

    const input = screen.getByPlaceholderText("Engineer Name");
    fireEvent.change(input, { target: { value: "Olivia" } });

    // scope to the engineer form so we don’t grab the wrong Add button
    const form = input.closest("form")!;
    const addButton = within(form).getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(setEngineers).toHaveBeenCalledWith([{ name: "Olivia" }]); //checks
    
  });

  it("removes an engineer", () => {
    const { setEngineers } = setup([{ name: "Liv" }]);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(setEngineers).toHaveBeenCalledWith([]);
  });
});
