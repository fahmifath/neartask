import api from "./axios";
import type { Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks?include=subtasks"); // ← TAMBAH include parameter
  return res.data;
};

export const createTask = async (payload: any) => {
  const backendPayload = {
    ...payload,
    use_progress: payload.use_progress,
    task_date: payload.task_date ? new Date(payload.task_date) : new Date(),
    deadline: payload.deadline ? new Date(payload.deadline) : new Date(),
  };
  
  return api.post("/tasks", backendPayload);
};