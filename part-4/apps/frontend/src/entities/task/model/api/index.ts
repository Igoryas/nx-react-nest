import { Task, TaskForm } from '../../../../shared';
import { axiosInstance } from '../../../../shared';

export const getTasks = async () =>
  await axiosInstance.get<Task[]>('/api/tasks');

export const setTask = async (formData: TaskForm) =>
  await axiosInstance.post<Task>('/api/tasks', formData);

export const deleteTask = async (taskId: string) =>
  await axiosInstance.delete('/api/tasks/' + taskId);

export const editTask = async (
  data: Pick<Task, '_id' | 'title' | 'description'>
) => await axiosInstance.put('/api/tasks', data);
