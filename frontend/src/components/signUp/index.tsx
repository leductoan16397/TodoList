import React, { FC, SyntheticEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Button, CircularProgress, TextField, styled } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { Toast, useInput } from 'utils';

const Field = styled(TextField)({
  margin: '10px 0',
});

const DLink = styled(Link)({
  margin: '15px 0',
  textAlign: 'right',
});

export const Signup: FC = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { value: name, bind: bindName } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: phone, bind: bindPhone } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');

  const handleSignUp = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Toast('Error!!', 'Password and Confirm Password should be same', 'danger');
      return;
    }
    try {
      const rs = await Auth.signUp({
        username: email,
        password: confirmPassword,
        attributes: {
          email,
          name,
          phone_number: phone,
        },
      });
      console.log(rs);

      Toast('Success!!', 'Signup was successful', 'success');
      history.push('/confirmation');
    } catch (error: any) {
      console.error(error);
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
      onSubmit={handleSignUp}
    >
      <h1 style={{ fontSize: '22px', fontWeight: 800 }}> New Account Registration</h1>
      <Field label="Name" {...bindName} />
      <Field label="Email" {...bindEmail} type="email" />
      <Field label="Phone" {...bindPhone} type="tel" />
      <Field label="Password" type="password" {...bindPassword} />
      <Field label="Confirm Password" type="password" {...bindConfirmPassword} />
      <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Sign Up
      </Button>
      <DLink to="/signin">go to login &rarr;</DLink>
    </form>
  );
};
