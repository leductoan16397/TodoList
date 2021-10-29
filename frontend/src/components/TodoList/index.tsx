import { TodoComponent, AddTodoComponent } from 'components';
import { FC, useState } from 'react';
import { Todo } from 'types/todo.type';
import './index.css';

interface TodoListProps {
  title: 'Todo' | 'In Progress' | 'Done';
  todos?: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ title, todos }) => {
  const [addFlag, setAddFlag] = useState<boolean>(false);

  return (
    <div className="todolist">
      <div className="header text-center">{title}</div>
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
