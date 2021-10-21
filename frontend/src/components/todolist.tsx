/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import { FC, useState } from 'react';
import { Todo } from 'types/todo.type';
import { AddTodoComponent } from './addTodoComponent';
import { TodoComponent } from './todo';
import './todolist.css';

interface TodoListProps {
  title: 'Todo' | 'In Progress' | 'Done';
  todos?: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ title, todos }) => {
  const [addFlag, setAddFlag] = useState<boolean>(false);

  return (
    <div className="todolist">
      <div className="header">{title}</div>
      <div className="todolistbody">
        {todos &&
          todos.map((todo, index) => (
            <TodoComponent key={`todo_${title}_${index + 1}`} type={title} todo={todo} />
          ))}
        {title === 'Todo' && !addFlag && (
          <div className="add-todo">
            <button type="button" className="addBtn" onClick={() => setAddFlag(true)}>
              Add
            </button>
          </div>
        )}
        {addFlag && <AddTodoComponent setAddFlag={setAddFlag} />}
      </div>
    </div>
  );
};
