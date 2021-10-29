import { FC, SyntheticEvent, useContext, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { DLink, Field, useInput } from 'utils';
import { AuthContext } from 'contexts/AuthContext';

export const Confirmation: FC = () => {
  const [loading, setLoading] = useState(false);
  const { doConfirmation } = useContext(AuthContext);

  const { value: email, bind: bindEmail } = useInput('');
  const { value: code, bind: bindCode } = useInput('');

  const handleSubmit = async (e: SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    await doConfirmation(email, code);
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
