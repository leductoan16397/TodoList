/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import TodoApp from 'components/Todoapp';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUp } from 'components/signUp';
import { SignIn } from 'components/signIn';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            {/* <Route path="/confirmation">
              <Confirmation />
            </Route> */}
            <Route path="/">
              <Route component={TodoApp} />
            </Route>
          </Switch>
        </Router>
        {/* <TodoApp /> */}
      </div>
    </div>
  );
}

export default App;
