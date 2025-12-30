import api from "./axios";

export const getSubTasks = async (taskId: string) => {
  const res = await api.get(`/tasks/${taskId}/subtasks`);
  return res.data;
};

export const createSubTask = async (
  taskId: string,
  payload: {
    title: string;
    weight: number;
  }
) => {
  return api.post(`/tasks/${taskId}/subtasks`, payload);
};

export const updateSubTask = async (
  id: string,
  payload: {
    is_done: boolean;
  }
) => {
  return api.put(`/subtasks/${id}`, payload);
};
