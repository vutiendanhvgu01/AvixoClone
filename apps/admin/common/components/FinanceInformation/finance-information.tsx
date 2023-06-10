import { Grid, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import AmountInput from 'share-components/src/components/AmountInput/amount-input';
import CurrencySelect from 'share-components/src/components/CurrencySelect/currency-select';
import TaxRateInput from 'share-components/src/components/TaxRateInput/tax-rate-input';
import { FinanceInformationProps } from './finance-information-types';

const FinanceInformationForm = styled(Stack)(() => ({
  padding: '32px',
}));
const FinanceInformation = ({
  sx,
  label,
  amountInputProps,
  taxInputProps,
  currencySelectProps,
  formProps,
  labelProps,
}: FinanceInformationProps) => (
  <FinanceInformationForm {...formProps} sx={{ ...sx }}>
    {label && (
      <Typography
        variant="h6"
        sx={{
          marginBottom: '32px',
        }}
        {...labelProps}
      >
        {label}
      </Typography>
    )}
    <Grid container spacing={2}>
      <Grid item xs={taxInputProps?.column ?? 12} sm={taxInputProps?.column ?? 12} xl={taxInputProps?.column ?? 12}>
        <TaxRateInput {...taxInputProps} />
      </Grid>
      <Grid
        item
        xs={amountInputProps?.column ?? true}
        sm={amountInputProps?.column ?? true}
        xl={amountInputProps?.column ?? true}
      >
        <AmountInput {...amountInputProps} />
      </Grid>
      <Grid
        item
        xs={currencySelectProps?.column ?? true}
        sm={currencySelectProps?.column ?? true}
        xl={currencySelectProps?.column ?? true}
      >
        <CurrencySelect inputLabel="Currency" {...currencySelectProps} />
      </Grid>
    </Grid>
  </FinanceInformationForm>
);
export default FinanceInformation;
