/* eslint-disable no-console */
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Amplify, { Hub } from 'aws-amplify';
import { AuthContextProvider } from 'contexts/AuthContext';
import { createBrowserHistory } from 'history';
import { Router, withRouter } from 'react-router-dom';
import { COGNITO } from 'aws-config/aws';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure(COGNITO);
const customHistory = createBrowserHistory();
const AppRootWithRouter = withRouter(App);

const Root: FC = () => {
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('sign in', data);
          break;
        case 'signOut':
          console.log('sign out');
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <Router history={customHistory}>
      <AuthContextProvider>
        <AppRootWithRouter />
      </AuthContextProvider>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
