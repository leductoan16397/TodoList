/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from 'aws-amplify';
import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'utils';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [logedUserToken, setlogedUserToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [fetching, setFeching] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        const accessToken = currentSession.getAccessToken();
        const jwt = accessToken.getJwtToken();
        // const refreshToken = currentSession.getRefreshToken().getToken();
        setlogedUserToken(jwt);
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        setFeching(false);
      } catch (error) {
        setFeching(false);
      }
    }
    fetchUser();
  }, []);

  const doSignIn = async (email, password) => {
    try {
      await Auth.signIn(email, password);
      setLoggedIn(true);
      Toast('Success!!', 'Login Successfully', 'success');
      history.push('/');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doSignOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      Toast('Success!!', 'Logged out successfully!', 'success');
      history.push('/signin');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doConfirmation = async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code);
      Toast('Success!!', 'Verified Successfully', 'success');
      history.push('/signin');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doSignUp = async ({ email, confirmPassword, name, phone }) => {
    try {
      await Auth.signUp({
        username: email,
        password: confirmPassword,
        attributes: {
          email,
          name,
          phone_number: phone,
        },
      });

      Toast('Success!!', 'Signup was successful', 'success');
      history.push('/confirmation');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        fetching,
        userInfo,
        setUserInfo,
        logedUserToken,
        setlogedUserToken,
        doSignIn,
        doSignUp,
        doSignOut,
        doConfirmation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
