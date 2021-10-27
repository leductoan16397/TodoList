import { TodoContext } from 'contexts/TodoContext';
import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { Toast } from 'utils';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { TodoList } from './todolist';
import './Todoapp.css';

const TodoApp: React.FC = () => {
  const history = useHistory();
  const { todos } = useContext(TodoContext);
  const handleLogout = async (): Promise<void> => {
    try {
      await Auth.signOut();
      Toast('Success!!', 'Logged out successfully!', 'success');
      history.push('/signin');
    } catch (error: any) {
      Toast('Error!!', error.message, 'danger');
    }
  };
  return (
    <div className="todoapp">
      <div className="todoapp-title">Todo List</div>
      <div className="todoapp-content">
        <TodoList title="Todo" todos={todos.todo || []} />
        <TodoList title="In Progress" todos={todos.inProgress || []} />
        <TodoList title="Done" todos={todos.done || []} />
      </div>
      <div className="todoap-bottom">
        <Button variant="contained" onClick={handleLogout}>
          <ExitToAppIcon /> Logout
        </Button>
      </div>
    </div>
  );
};

export default TodoApp;
