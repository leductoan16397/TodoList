/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, useState } from 'react';
import { getTodo, storageTodos } from 'utils/localstorage';

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(getTodo() || { todo: [], inProgress: [], done: [] });

  const addTodo = (todo) => {
    const newTodos = { ...todos, todo: [...todos.todo, todo] };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const moveToInProgress = (id) => {
    const movedItem =
      todos.todo.find((item) => item.id === id) || todos.done.find((item) => item.id === id);
    const newTodos = {
      inProgress: [...todos.inProgress, movedItem],
      todo: [...todos.todo.filter((item) => item.id !== id)],
      done: [...todos.done.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const moveToTodo = (id) => {
    const movedItem = todos.inProgress.find((item) => item.id === id);
    const newTodos = {
      todo: [...todos.todo, movedItem],
      inProgress: [...todos.inProgress.filter((item) => item.id !== id)],
      done: [...todos.done.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const moveToDone = (id) => {
    const movedItem = todos.inProgress.find((item) => item.id === id);
    const newTodos = {
      inProgress: [...todos.inProgress.filter((item) => item.id !== id)],
      done: [...todos.done, movedItem],
      todo: [...todos.todo.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = {
      ...todos,
      todo: [...todos.todo.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeInProgress = (id) => {
    const newTodos = {
      ...todos,
      inProgress: [...todos.inProgress.filter((item) => item.id !== id)],
    };
    storageTodos(newTodos);
    setTodos(newTodos);
  };

  const removeDone = (id) => {
    const newTodos = {
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
        removeTodo,
        removeInProgress,
        removeDone,
        moveToTodo,
        moveToInProgress,
        moveToDone,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
