import { Box, Stack } from '@mui/material';
import FinanceInformation from 'common/components/FinanceInformation/finance-information';
import { currencySelectData } from 'modules/organisation/components/organisation-form';
import React from 'react';
import PremiseFormAction from './premise-form-action';
import { FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

const PremiseFormFinance: React.FC<PremiseFormDetailProps> = props => {
  const { header, values, errors, handleChange, handleBlur, touched } = props;

  return (
    <Box
      sx={{
        '.MuiFormControl-fullWidth.MuiFormControl-fullWidth': {
          mb: 0,
        },
      }}
    >
      <FormFieldsContainer>
        <Stack
          sx={{
            height: 'calc(100vh - 250px)',
          }}
        >
          <StackTitle variant="h6">{header}</StackTitle>
          <FinanceInformation
            sx={{
              padding: 0,
            }}
            amountInputProps={{
              error: !!(touched.taxRate && errors.taxRate),
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            taxInputProps={{
              error: !!(touched.taxRate && errors.taxRate),
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.taxRate,
            }}
            currencySelectProps={{
              currencyData: currencySelectData,
              value: values.currencyID,
              onChange: handleChange,
            }}
          />
          <PremiseFormAction {...props} title="4. Timezone" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormFinance;
