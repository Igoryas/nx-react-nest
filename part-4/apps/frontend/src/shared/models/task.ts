export interface Task {
  description: string;
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  completed: boolean;
}

export interface TaskForm {
  title: string;
  description: string;
}
