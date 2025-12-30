import api from "./axios";
import type { Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (payload: Partial<Task>) => {
  return api.post("/tasks", payload);
};
