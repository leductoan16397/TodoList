/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './index.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from 'aws-config/awsconfig.json';
import awsauth from 'aws-config/awsauth.json';

export const SignIn: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Amplify.configure(awsconfig);
    // Auth.configure({ oauth: awsauth });
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('sign in', event, data);
          break;
        case 'signOut':
          console.log('sign out');
          break;
        default:
          break;
      }
    });
  }, []);

  const handleSignIn = async (data: { username: string; password: string }): Promise<void> => {
    console.log(data);
    const user = await Auth.signIn(data.username, data.password);
    console.log(user);
    setPassword('');
    setUsername('');
  };
  return (
    <div>
      <form onSubmit={() => handleSignIn({ username, password })}>
        <div className="signin-header">
          <h3>Sign In</h3>
        </div>
        <div className="signin-body">
          <input
            type="email"
            name="username"
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            value={username}
            className="signin-username"
            required
          />
          <input
            minLength={8}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            value={password}
            className="signin-password"
          />
        </div>
        <div className="signin-bottom">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
