import { TodoContext } from 'contexts/TodoContext';
import React, { FC, useContext } from 'react';
import { Todo } from 'types/todo.type';
import './todo.css';

interface TodoProps {
  type: 'Todo' | 'In Progress' | 'Done';
  todo: Todo;
}

export const TodoComponent: FC<TodoProps> = ({ type, todo }) => {
  const { removeTodo, removeInProgress, removeDone, moveToTodo, moveToInProgress, moveToDone } =
    useContext(TodoContext);
  return (
    <div className="todo">
      <span>{todo.title}</span>
      {type === 'Todo' && (
        <>
          <button type="button" onClick={() => moveToInProgress(todo.id)}>
            In Progerss
          </button>
          <button type="button" onClick={() => removeTodo(todo.id)}>
            Remove
          </button>
        </>
      )}
      {type === 'In Progress' && (
        <>
          <button type="button" onClick={() => moveToTodo(todo.id)}>
            Todo
          </button>
          <button type="button" onClick={() => moveToDone(todo.id)}>
            Done
          </button>
          <button type="button" onClick={() => removeInProgress(todo.id)}>
            Remove
          </button>
        </>
      )}

      {type === 'Done' && (
        <>
          <button type="button" onClick={() => moveToInProgress(todo.id)}>
            In Progerss
          </button>
          <button type="button" onClick={() => removeDone(todo.id)}>
            Remove
          </button>
        </>
      )}
    </div>
  );
};
