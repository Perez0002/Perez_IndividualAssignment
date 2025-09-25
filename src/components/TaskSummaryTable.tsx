import React from "react";
import type { Task, CompletedTask } from "../types/interfaces";

interface TaskSummaryTableProps {
  completedTasks: CompletedTask[];
  uncompletedTasks: Task[];
}

const TaskSummaryTable: React.FC<TaskSummaryTableProps> = ({
  completedTasks,
  uncompletedTasks,
}) => {
  const totalActualMinutes = completedTasks.reduce(
    (sum, t) => sum + (t.actualTime || 0),
    0
  );
  const totalPredictedMinutes = uncompletedTasks.reduce(
    (sum, t) => sum + (t.estimatedTime || 0),
    0
  );

  return (
    <>
      {" "}
      <h2>Task Summary</h2>
      <table border={1} cellSpacing={0} cellPadding={5}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Minutes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Completed Tasks (Actual)</td>
            <td>{totalActualMinutes}</td>
          </tr>
          <tr>
            <td>Uncompleted Tasks (Predicted)</td>
            <td>{totalPredictedMinutes}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TaskSummaryTable;
