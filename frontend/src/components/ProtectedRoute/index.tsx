import React, { createElement, FC, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: FC;
}

export const ProtectedRoute: FC<Props> = ({ component }) => {
  const [isAuthenticated, setLoggedIn] = useState(true);
  useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        setLoggedIn(false);
      }
    })();
  });

  return (
    <Route
      render={() => (isAuthenticated ? createElement(component) : <Redirect to="/signin" />)}
    />
  );
};
