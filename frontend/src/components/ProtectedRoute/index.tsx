/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createElement, FC, useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

interface Props {
  component: FC;
}

export const ProtectedRoute: FC<Props> = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route render={() => (isLoggedIn ? createElement(component) : <Redirect to="/signin" />)} />
  );
};
