import { TodoContext } from 'contexts/TodoContext.jsx';
import React, { useContext } from 'react';
import './Todoapp.css';
import { TodoList } from './todolist';

const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);
  return (
    <div className="todoapp">
      <div className="todoapp-title">Todo List</div>
      <div className="todoapp-content">
        <TodoList title="Todo" todos={todos.todo || []} />
        <TodoList title="In Progress" todos={todos.inProgress || []} />
        <TodoList title="Done" todos={todos.done || []} />
      </div>
    </div>
  );
};

export default TodoApp;
