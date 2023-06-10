import { Box, Stack } from '@mui/material';
import React from 'react';
import { AddressFill, EmailFill, PhoneNumberFill } from 'share-components';
import PremiseFormAction from './premise-form-action';
import { BoxWrapper, FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

const PremiseFormContact: React.FC<PremiseFormDetailProps> = props => {
  const { header, values, setFieldValue } = props;
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
          <BoxWrapper>
            <PhoneNumberFill
              initData={[...values.phones].map(phoneNo => ({
                ...phoneNo,
                phoneValue: phoneNo.number,
                countryCode: phoneNo.countryCode,
                isPrimary: false,
              }))}
              onChange={phoneNumbers => {
                setFieldValue?.('phones', phoneNumbers);
              }}
            />
          </BoxWrapper>
          <BoxWrapper>
            <EmailFill
              initData={[...values.emails].map(email => ({
                ...email,
                email: email.email,
                isPrimary: false,
              }))}
              onChange={emails => {
                setFieldValue?.('emails', emails);
              }}
            />
          </BoxWrapper>
          <BoxWrapper sx={{ paddingBottom: '120px' }}>
            <AddressFill
              initData={values.addresses}
              onChange={data => {
                setFieldValue?.(`addresses`, data);
              }}
            />
          </BoxWrapper>
          <PremiseFormAction {...props} title="3. Finance Information" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormContact;
