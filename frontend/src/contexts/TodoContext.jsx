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
      setTodoLoaded(false);
      let rs = {
        data: {
          todo: [],
          inProgress: [],
          done: [],
        },
      };
      if (logedUserToken) {
        rs = await getAllTodo(logedUserToken);
      }
      setTodoLoaded(true);
      setTodos(rs.data);
    } catch (error) {
      setTodoLoaded(true);
      Toast('Error!!', error.message, 'danger');
    }
  };

  useEffect(() => {
    fetchData();
  }, [logedUserToken]);

  const addTodo = async (todo) => {
    try {
      await addNewTodo(todo, logedUserToken);
      Toast('Success!!', 'Add Todo Successfully', 'success');
      fetchData();
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
      fetchData();
    }
  };

  const updateTodoStatus = async (id, status) => {
    try {
      await updateTodo(id, { status }, logedUserToken);
      Toast('Success!!', 'Move Todo Successfully', 'success');
      fetchData();
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
      fetchData();
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id, logedUserToken);
      Toast('Success!!', 'Delete Todo Successfully', 'success');
      fetchData();
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
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
