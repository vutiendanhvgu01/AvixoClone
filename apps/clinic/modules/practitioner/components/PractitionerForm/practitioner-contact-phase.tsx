import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { AddressFill, EmailFill, PhoneNumberFill } from 'share-components';
import { PHASE_LABEL } from '../../constants';

interface PractitionerContactPhase {
  formikProps: Partial<FormikProps<any>>;
}

const GroupSection = styled(Box)({
  borderBottom: `1px solid #E6E8F0`,
  padding: 32,
});

const PractitionerContactPhase: FC<PractitionerContactPhase> = ({ formikProps }) => {
  const { values, setFieldValue, errors } = formikProps;

  return (
    <Grid
      sx={{
        '.MuiFormControl-fullWidth.MuiFormControl-fullWidth': { mb: 0 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 4,
          pb: 0,
        }}
      >
        {PHASE_LABEL.contact}
      </Typography>
      <GroupSection>
        <PhoneNumberFill
          initData={[...values.phoneNumbers].map(phoneNo => ({
            phoneValue: phoneNo.phoneValue,
            countryCode: phoneNo.countryCode,
            isPrimary: false,
          }))}
          isShowValidationError={Boolean(errors?.phoneNumbers)}
          onChange={phoneNumbers => {
            setFieldValue?.('phoneNumbers', phoneNumbers);
          }}
        />
      </GroupSection>
      <GroupSection>
        <EmailFill
          initData={[...values.emails].map(email => ({
            email,
            isPrimary: false,
          }))}
          isShowValidationError={Boolean(errors?.emails)}
          onChange={emails => {
            setFieldValue?.('emails', emails);
          }}
        />
      </GroupSection>
      <GroupSection>
        <AddressFill
          initData={values.addresses}
          isShowValidationError={Boolean(errors?.addresses)}
          onChange={data => {
            setFieldValue?.(`addresses`, data);
          }}
        />
      </GroupSection>
    </Grid>
  );
};

export default PractitionerContactPhase;
