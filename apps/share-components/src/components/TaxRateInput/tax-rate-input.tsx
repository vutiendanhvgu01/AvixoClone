import styled from '@emotion/styled';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

import React from 'react';
import { TaxRateInputProps } from './tax-rate-input-types';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const TaxRateInput = ({ inputLabel = 'Tax Rate', ...props }: TaxRateInputProps) => (
  <FormControlComponent fullWidth>
    <InputLabel id="taxRate-field" required>
      {inputLabel}
    </InputLabel>
    <OutlinedInput
      {...props}
      id="taxRate"
      name="taxRate"
      type="number"
      label="Tax Rate"
      endAdornment={<InputAdornment position="end">%</InputAdornment>}
    />
  </FormControlComponent>
);
export default TaxRateInput;
