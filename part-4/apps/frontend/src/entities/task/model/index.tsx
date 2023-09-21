import { create } from 'zustand';
import { Task, TaskForm } from '../../../shared';
import { deleteTask, editTask, getTasks, setTask } from './api';
import { AxiosError } from 'axios';

interface IUseTasksStore {
  loading: boolean;
  tasks: Task[];
  error: string[];
  fetchTask: () => void;
  fetchCreateTask: (formData: TaskForm) => void;
  fetchDeleteTask: (id: string) => void;
  fetchEditTask: (
    data: Pick<Task, '_id' | 'title' | 'description' | 'completed'>
  ) => void;
}

export const useTasksStore = create<IUseTasksStore>((set, get) => ({
  loading: false,
  tasks: [],
  error: [],
  fetchTask: async () => {
    const { loading } = get();
    if (!loading) {
      set({ loading: true });
      try {
        const { data } = await getTasks();
        set({ tasks: data });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }

    set({ loading: false });
  },
  fetchCreateTask: async (formData: TaskForm) => {
    const { loading } = get();

    if (!loading) {
      set({ loading: true });
      try {
        const { data } = await setTask(formData);

        set((store) => ({
          ...store,
          tasks: [data, ...store.tasks],
        }));
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }

    set({ loading: false });
  },
  fetchDeleteTask: async (taskId: string) => {
    const { loading } = get();

    if (!loading) {
      set({ loading: true });
      try {
        await deleteTask(taskId);
        set({ loading: false });
        get().fetchTask();
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }

    set({ loading: false });
  },
  fetchEditTask: async (data) => {
    const { loading } = get();

    if (!loading) {
      set({ loading: true });
      try {
        await editTask(data);
        set({ loading: false });
        get().fetchTask();
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }

    set({ loading: false });
  },
}));
