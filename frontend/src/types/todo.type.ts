/* eslint-disable no-unused-vars */

export type Todo = {
  auth?: string;
  id: string;
  title: string;
  createdAt: Date;
  updateAt: Date;
};

export interface Todos {
  todo: Todo[];
  inProgress: Todo[];
  done: Todo[];
}

export interface TodoContent {
  todos: Todos;
  addTodo: (todo: Todo) => void;
  moveToInProgress: (id: string) => void;
  moveToDone: (id: string) => void;
  removeTodo: (id: string) => void;
  removeInProgress: (id: string) => void;
  removeDone: (id: string) => void;
}
