import { Todos } from 'types/todo.type';

export const getTodo = (): Todos | null => {
  const data = localStorage.getItem(process.env.REACT_APP_TODO_STORAGE_NAME || 'devtodo');
  if (data) {
    const todos: Todos = JSON.parse(data);
    return todos;
  }
  return null;
};

export const storageTodos = (todos: Todos | null | undefined): void => {
  if (!todos) {
    localStorage.removeItem(process.env.REACT_APP_TODO_STORAGE_NAME || 'devtodo');
  }
  localStorage.setItem(process.env.REACT_APP_TODO_STORAGE_NAME || 'devtodo', JSON.stringify(todos));
};
