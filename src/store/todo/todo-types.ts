export interface Todo {
  id: number;
  isDone: boolean;
  text: string;
}

export interface PureTodo extends Omit<Todo, "id" | "isDone"> {}

export interface TodoState {
  list: Todo[];
}
