import { Box, Grid, Typography, styled } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import { AddressFill, EmailFill, PhoneNumberFill } from 'share-components';
import { PHASE_LABEL } from '../../constants';
import { PractitionerFormValues } from '../../types/practitioner-form';

const GroupSection = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: 32,
  marginBottom: 32
}));

const PractitionerContactPhase: FC = () => {
  const { values, setFieldValue, errors } = useFormikContext<PractitionerFormValues>();

  return (
    <Grid>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {PHASE_LABEL.contact}
      </Typography>
      <GroupSection>
        <PhoneNumberFill
          initData={values.phoneNumbers?.map(({ phoneValue, countryCode, isPrimary }) => ({
            phoneValue,
            countryCode,
            isPrimary,
          }))}
          isShowValidationError={Boolean(errors.phoneNumbers)}
          onChange={phoneNumbers => {
            setFieldValue('phoneNumbers', phoneNumbers);
          }}
        />
      </GroupSection>
      <GroupSection>
        <EmailFill
          initData={[...values.emails].map(email => ({
            email: email.email,
            isPrimary: !!email.isPrimary,
          }))}
          isShowValidationError={Boolean(errors.emails)}
          onChange={emails => {
            setFieldValue('emails', emails);
          }}
        />
      </GroupSection>
      <GroupSection>
        <AddressFill
          initData={values.addresses}
          isShowValidationError={Boolean(errors.addresses)}
          onChange={data => {
            setFieldValue('addresses', data);
          }}
        />
      </GroupSection>
    </Grid>
  );
};

export default PractitionerContactPhase;
