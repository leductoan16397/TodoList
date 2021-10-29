import { TodoContext } from 'contexts/TodoContext';
import React, { FC, useContext, useState } from 'react';
import { Todo } from 'types/todo.type';
import './index.css';

interface TodoProps {
  type: 'Todo' | 'In Progress' | 'Done';
  todo: Todo;
}

export const TodoComponent: FC<TodoProps> = ({ type, todo }) => {
  const { todoLoaded, updateTodoStatus, removeTodo } = useContext(TodoContext);

  const [fetching, setFetching] = useState(false);

  const handleUpdate = async (status: 'todo' | 'inProgress' | 'done'): Promise<void> => {
    setFetching(true);
    await updateTodoStatus(todo.id, status);
    setFetching(false);
  };

  const handleRemove = async (): Promise<void> => {
    setFetching(true);
    await removeTodo(todo.id);
    setFetching(false);
  };

  return (
    <div className="todo">
      <span>{todo.todoName}</span>
      {(type === 'Todo' || type === 'Done') && (
        <>
          <button
            disabled={fetching || !todoLoaded}
            type="button"
            onClick={() => handleUpdate('inProgress')}
          >
            In Progerss
          </button>
        </>
      )}

      {type === 'In Progress' && (
        <>
          <button
            disabled={fetching || !todoLoaded}
            type="button"
            onClick={() => handleUpdate('todo')}
          >
            Todo
          </button>
          <button
            type="button"
            disabled={fetching || !todoLoaded}
            onClick={() => handleUpdate('done')}
          >
            Done
          </button>
        </>
      )}

      <button type="button" disabled={fetching || !todoLoaded} onClick={() => handleRemove()}>
        Remove
      </button>
    </div>
  );
};
