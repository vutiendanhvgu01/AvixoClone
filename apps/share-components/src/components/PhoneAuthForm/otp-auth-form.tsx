import { Stack, useTheme } from '@mui/material';
import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { FormControlAuth } from '../AvixoAuthForm/components/commons';
import InvalidPanelComponent from '../AvixoAuthForm/invalid-panel';
import { LoginSubtitle, LoginTitle } from '../AvixoAuthForm/auth-form';
import { PhoneForm } from './phone-auth-form';

interface OtpAuthForm {
  title: string;
  subtitle?: string;
  error?: string;
  onSubmit: (arg: string) => void;
  onChange?: (arg: string) => void;
}

const OtpAuthForm: React.FC<OtpAuthForm> = props => {
  const { error = '', title, subtitle = '', onSubmit, onChange = () => null } = props;
  const [otp, setOtp] = React.useState('');
  const theme = useTheme();

  const handleChange = (newValue: string) => {
    setOtp(newValue);
    onChange?.(newValue);
  };

  return (
    <PhoneForm data-cy="verifyOtpForm">
      <Stack>
        <LoginTitle variant="h4" style={{ whiteSpace: 'pre-wrap' }}>
          {title}
        </LoginTitle>
        <LoginSubtitle variant="subtitle1">{subtitle}</LoginSubtitle>
        <FormControlAuth>
          <MuiOtpInput
            autoFocus
            length={6}
            value={otp}
            onChange={handleChange}
            onComplete={onSubmit}
            TextFieldsProps={{
              variant: 'standard',
              inputProps: {
                style: {
                  fontSize: 32,
                  color: error ? theme.palette.error.light : theme.palette.primary.main,
                },
                'data-testid': 'otp-input',
              },
              sx: {
                '& .MuiInput-root:before': {
                  borderColor: error ? theme.palette.error.light : theme.palette.disabled.main,
                },
              },
            }}
          />
        </FormControlAuth>
        {error && <InvalidPanelComponent message={error} />}
      </Stack>
    </PhoneForm>
  );
};
export default React.memo(OtpAuthForm);
