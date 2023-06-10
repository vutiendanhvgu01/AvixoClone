import { FormControl, InputLabel, OutlinedInput, styled } from '@mui/material';
import React from 'react';
import { AmountInputProps } from './amount-input-types';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const AmountInput = ({ inputLabel = 'Amount', ...props }: AmountInputProps) => (
  <FormControlComponent fullWidth>
    <InputLabel id="taxRate-field" required>
      {inputLabel}
    </InputLabel>
    <OutlinedInput {...props} id="amount" name="amount" type="number" label="Amount" />
  </FormControlComponent>
);

export default AmountInput;
