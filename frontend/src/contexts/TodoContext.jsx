/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addNewTodo, deleteTodo, getAllTodo, updateTodo } from 'api';
import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from 'utils';
import { AuthContext } from './AuthContext';

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState();
  const [todoLoaded, setTodoLoaded] = useState(false);

  const { logedUserToken } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      const rs = await getAllTodo(logedUserToken);
      console.log(rs);
      setTodoLoaded(true);
      setTodos([...rs.data]);
    } catch (error) {
      setTodoLoaded(true);
      Toast('Error!!', error.message, 'danger');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (todo) => {
    try {
      await addNewTodo(todo, logedUserToken);
      fetchData();
    } catch (error) {
      fetchData();
    }
  };

  const updateTodoStatus = async (id, status) => {
    try {
      await updateTodo(id, { status }, logedUserToken);
      fetchData();
    } catch (error) {
      fetchData();
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id, logedUserToken);
      fetchData();
    } catch (error) {
      fetchData();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        todoLoaded,
        addTodo,
        updateTodoStatus,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
