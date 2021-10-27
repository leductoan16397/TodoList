import React, { FC, SyntheticEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Button, CircularProgress, TextField, styled } from '@mui/material';

import { Link, useHistory } from 'react-router-dom';
import { useInput, Toast } from 'utils';

const Field = styled(TextField)({
  margin: '10px 0',
});

const DLink = styled(Link)({
  margin: '15px 0',
  textAlign: 'right',
});

export const Confirmation: FC = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput('');
  const { value: code, bind: bindCode } = useInput('');

  const handleSubmit = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      Toast('Success!!', 'Verified Successfully', 'success');
      history.push('/signin');
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
      <h1 style={{ fontSize: '22px', fontWeight: 800 }}> Verify Your Account</h1>
      <Field label="Email" {...bindEmail} type="email" />
      <Field label="Verification Code" {...bindCode} />
      <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Verify your account
      </Button>
      <DLink to="/signup">make an account &rarr;</DLink>
    </form>
  );
};
