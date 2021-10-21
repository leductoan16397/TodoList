/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, ReactNode, useState } from 'react';
import { TodoContent, Todo, Todos } from 'types/todo.type';
import { getTodo, storageTodos } from 'utils/localstorage';

export const TodoContext = createContext<TodoContent | null>(null);

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todos>(getTodo() || { todo: [], inProgress: [], done: [] });

  const addTodo = (todo: Todo): void => {
    const newTodos: Todos = { ...todos, todo: [...todos.todo, todo] };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const moveToInProgress = (id: string): void => {
    const movedItem = todos.todo.find((item) => item.id === id) as Todo;
    const newTodos: Todos = {
      ...todos,
      inProgress: [...todos.inProgress, movedItem],
      todo: [...todos.todo.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const moveToDone = (id: string): void => {
    const movedItem = todos.inProgress.find((item) => item.id === id) as Todo;
    const newTodos: Todos = {
      ...todos,
      inProgress: [...todos.inProgress.filter((item) => item.id !== id)],
      done: [...todos.done, movedItem],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeTodo = (id: string): void => {
    const newTodos: Todos = {
      ...todos,
      todo: [...todos.todo.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeInProgress = (id: string): void => {
    const newTodos: Todos = {
      ...todos,
      inProgress: [...todos.inProgress.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeDone = (id: string): void => {
    const newTodos: Todos = {
      ...todos,
      done: [...todos.done.filter((item) => item.id !== id)],
    };
    setTodos(newTodos);
    storageTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeInProgress,
        removeDone,
        moveToInProgress,
        moveToDone,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
