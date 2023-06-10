import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import React from 'react';
import { CurrencySelectProps } from './currency-select-types';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const CurrencySelect = ({ inputLabel = 'Currency', currencyData, ...props }: CurrencySelectProps) => (
  <FormControlComponent fullWidth>
    <InputLabel id="currency-options" required>
      {inputLabel}
    </InputLabel>
    <Select {...props} labelId="currency-options" id="currency-options-select" name="currencyID" label="Currency">
      {currencyData?.map(currency => (
        <MenuItem key={`currency-item-${currency.id}`} value={currency.id}>
          {currency.name}
        </MenuItem>
      ))}
    </Select>
  </FormControlComponent>
);

export default CurrencySelect;
