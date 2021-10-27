import TodoApp from 'components/Todoapp';
import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Card } from '@mui/material';
import './App.css';
import { Signup } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Confirmation } from 'components/Confirmation';
import { ProtectedRoute } from 'components/ProtectedRoute';
import Amplify from 'aws-amplify';
import { COGNITO } from 'aws-config/aws';

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const App: FC = () => {
  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Card style={{ width: 900, margin: '100px auto', padding: '40px' }}>
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
          </Card>
        </Router>
      </div>
    </div>
  );
};

export default App;
