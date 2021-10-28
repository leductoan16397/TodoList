import { TodoContext } from 'contexts/TodoContext';
import React, { FC, useContext } from 'react';
import { Todo } from 'types/todo.type';
import './index.css';

interface TodoProps {
  type: 'Todo' | 'In Progress' | 'Done';
  todo: Todo;
}

export const TodoComponent: FC<TodoProps> = ({ type, todo }) => {
  const { updateTodoStatus, removeTodo } = useContext(TodoContext);
  return (
    <div className="todo">
      <span>{todo.title}</span>
      {(type === 'Todo' || type === 'Done') && (
        <>
          <button type="button" onClick={() => updateTodoStatus(todo.id, 'inProgressF')}>
            In Progerss
          </button>
        </>
      )}

      {type === 'In Progress' && (
        <>
          <button type="button" onClick={() => updateTodoStatus(todo.id, 'todo')}>
            Todo
          </button>
          <button type="button" onClick={() => updateTodoStatus(todo.id, 'done')}>
            Done
          </button>
        </>
      )}

      <button type="button" onClick={() => removeTodo(todo.id)}>
        Remove
      </button>
    </div>
  );
};
