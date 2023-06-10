import { CircularProgress, Stack } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { parsePhoneNumber } from 'libphonenumber-js';
import { FormControlAuth, TextError } from '../AvixoAuthForm/components/commons';
import InvalidPanelComponent from '../AvixoAuthForm/invalid-panel';
import Yup from '../../services/yup';
import 'yup-phone-lite';
import { LoginButton, LoginSubtitle, LoginTitle } from '../AvixoAuthForm/auth-form';
import { PhoneAuthFormSubmitTypes, PhoneAuthFormTypes } from './phone-auth-form.types';

export const PhoneForm = styled('form')(({ theme }) => ({
  padding: '52px 48px 52px 48px',
  background: 'white',
  width: 414,
  borderRadius: 16,
  [theme.breakpoints.down('sm')]: {
    width: 345,
    padding: '40px 24px 24px 24px',
  },
}));

const PhoneFormSchema = Yup.object({
  phone: Yup.string().phone('SG', 'Please enter a valid phone number').required('A phone number is required'),
});

interface PhoneAuthForm {
  title: string;
  subtitle?: string;
  error?: string;
  submitLabel?: string;
  onSubmit: (arg: PhoneAuthFormTypes) => void;
}

const PhoneAuthForm: React.FC<PhoneAuthForm> = props => {
  const { submitLabel = 'Submit', error = '', title, subtitle = '', onSubmit = () => null } = props;
  const initialValues = { phone: '' };

  const handleFormSubmit = async (values: PhoneAuthFormSubmitTypes) => {
    const phoneNumber = parsePhoneNumber(values.phone, 'SG');
    const phoneInfo = {
      ext: parseInt(phoneNumber.countryCallingCode, 10),
      phone: parseInt(phoneNumber.nationalNumber, 10),
      fullPhone: phoneNumber.number,
    };
    await onSubmit(phoneInfo);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PhoneFormSchema}
      onSubmit={handleFormSubmit}
      validateOnChange={false}
    >
      {({ errors, touched, handleSubmit, values, setFieldValue, isSubmitting }) => (
        <PhoneForm method="POST" data-cy="phoneForm" onSubmit={handleSubmit}>
          <Stack>
            <LoginTitle variant="h4" style={{ whiteSpace: 'pre-wrap' }}>
              {title}
            </LoginTitle>
            <LoginSubtitle variant="subtitle1">{subtitle}</LoginSubtitle>
            <FormControlAuth>
              <TextField
                variant="outlined"
                label="Phone number"
                name="phone"
                data-cy="phone"
                id="phone"
                placeholder="+65 XXXX XXXX"
                value={values.phone}
                onChange={e => {
                  const inputPhone = e.target.value;
                  let formattedPhone = inputPhone.replace(/(?<!^)\D/g, ''); // remove non-digits
                  if (formattedPhone.length > 0 && formattedPhone[0] !== '+') {
                    formattedPhone = `+${formattedPhone}`; // add plus sign
                  }
                  if (formattedPhone.length >= 3) {
                    formattedPhone = formattedPhone.replace(/^(\+65)(\d{4})(\d{4})$/, '$1 $2 $3'); // apply Singapore phone number pattern
                  }
                  setFieldValue('phone', formattedPhone);
                }}
                error={!!errors.phone}
                inputProps={{
                  'data-testid': 'phone-number-input',
                }}
              />
              {!!(touched.phone && errors.phone) && <TextError error>{errors.phone}</TextError>}
            </FormControlAuth>
            {error && <InvalidPanelComponent message={error} />}
            <LoginButton type="submit" data-cy="submitBtn">
              {isSubmitting ? <CircularProgress color="inherit" size={30} /> : submitLabel}
            </LoginButton>
          </Stack>
        </PhoneForm>
      )}
    </Formik>
  );
};
export default React.memo(PhoneAuthForm);
