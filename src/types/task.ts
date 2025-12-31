import type { SubTask } from "./subtask";

export interface Task {
  id: string;
  title: string;
  description?: string;
  task_date: string;
  deadline: string;
  use_progress: boolean;
  progress: number;
  subtasks?: SubTask[];
}
