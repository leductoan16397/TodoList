import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react';
import { TextField, styled } from '@mui/material';
import { Link } from 'react-router-dom';

interface UseInputReturn {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  reset: () => void;
  bind: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required: boolean;
  };
}

export const useInput = (initialValue: string): UseInputReturn => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
      },
      required: true,
    },
  };
};

export const Field = styled(TextField)({
  margin: '10px 0',
});

export const DLink = styled(Link)({
  margin: '15px 0',
  textAlign: 'right',
});
