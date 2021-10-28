/* eslint-disable @typescript-eslint/no-explicit-any */
import { TodoContext } from 'contexts/TodoContext';
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './index.css';
import { TodoList } from 'components';
import { AuthContext } from 'contexts/AuthContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const { doSignOut } = useContext(AuthContext);

  const handleLogout = async (): Promise<void> => {
    await doSignOut();
  };

  return (
    <div className="todoapp">
      <div className="todoapp-title text-center">Todo List</div>
      <div className="todoapp-content">
        <TodoList title="Todo" todos={todos?.todo || []} />
        <TodoList title="In Progress" todos={todos?.inProgress || []} />
        <TodoList title="Done" todos={todos?.done || []} />
      </div>
      <div className="todoap-bottom">
        <Button variant="contained" color="inherit" onClick={handleLogout}>
          <ExitToAppIcon /> Logout
        </Button>
      </div>
    </div>
  );
};
