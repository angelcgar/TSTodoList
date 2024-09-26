export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface SetTodo {
  title: string;
  description: string;
  completed: boolean;
}
