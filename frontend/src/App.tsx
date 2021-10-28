import { TodoApp } from 'components';
import React, { FC, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Card, CircularProgress } from '@mui/material';
import './App.css';
import { Signup } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Confirmation } from 'components/Confirmation';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { AuthContext } from 'contexts/AuthContext';
import { TodoContextProvider } from 'contexts/TodoContext';

const App: FC = () => {
  const { fetching } = useContext(AuthContext);
  return (
    <div className="App">
      <div className="App-body">
        <Card style={{ width: 1200, margin: '100px auto', padding: '40px' }}>
          {!fetching ? (
            <TodoContextProvider>
              <Switch>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/confirmation">
                  <Confirmation />
                </Route>
                <Route path="/">
                  <ProtectedRoute component={TodoApp} />
                </Route>
              </Switch>
            </TodoContextProvider>
          ) : (
            <CircularProgress size={20} style={{ marginRight: 20 }} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default App;
