export interface Engineer {
  name: string;
}

export interface Task {
  name: string;
  description: string;
  estimatedTime: number;
  assignedEngineer?: string;
  actualTime?: number;
}

export interface CompletedTask {
  name: string;
  engineer: string;
  estimatedTime: number;
  actualTime: number;
}
