import React, { FC, SyntheticEvent, useState } from 'react';
import { useInput, Toast } from 'utils';
import { Auth } from 'aws-amplify';
import { Button, CircularProgress, TextField, styled } from '@mui/material';

import { Link, useHistory } from 'react-router-dom';

const Field = styled(TextField)({
  margin: '10px 0',
});

const DLink = styled(Link)({
  margin: '15px 0',
  textAlign: 'right',
});

export const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await Auth.signIn(email, password);
      console.log(user);

      Toast('Success!!', 'Login Successfully', 'success');
      history.push('/');
    } catch (error: any) {
      Toast('Error!!', error.message, 'danger');
    }
    setLoading(false);
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onSubmit={handleSubmit}
    >
      <h1 style={{ fontSize: '22px', fontWeight: 800 }}> Sign in to an existing account</h1>
      <Field label="Email" {...bindEmail} type="email" />
      <Field label="Password" type="password" {...bindPassword} />
      <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Login to Your Account
      </Button>
      <DLink to="/signup">make a new account &rarr;</DLink>
    </form>
  );
};
