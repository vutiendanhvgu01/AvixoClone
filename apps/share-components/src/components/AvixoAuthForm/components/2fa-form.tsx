import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useState, useRef } from 'react';
import * as React from 'react';
import { useFormik } from 'formik';
import LeftIcon from '../../AvixoIcons/left-icon';
import { ResetPasswordContainer } from './commons';
import { formatHexToRGBA } from '../../../utils/formatUtils';
import yup from '../../../services/yup';
import InvalidPanelComponent from '../invalid-panel';

const INITIAL_SECONDS = 120;

interface TwoFAForm {
  onBack?: () => void;
  handleRequestOtp?: () => void;
  method?: 'sms' | 'email';
  sessionId: string;
  contact: string;
  isInvalidOTP: boolean;
}

const FA_TYPES = {
  email: 'email',
  sms: 'SMS OTP',
};

const AvixoTwoFAForm: FC<TwoFAForm> = ({
  method = 'sms',
  contact,
  sessionId,
  onBack,
  handleRequestOtp,
  isInvalidOTP,
}) => {
  const theme = useTheme();
  const [seconds, setSeconds] = useState(isInvalidOTP ? 0 : INITIAL_SECONDS);
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: yup.object().shape({
      otp: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly least 6 integers'),
    }),
    onSubmit: () => {
      form.current?.submit();
    },
  });

  const { errors, getFieldProps, values } = formik;
  useEffect(() => {
    const resendInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(resendInterval);
    };
  }, [seconds]);

  const minute = Math.floor(seconds / 60);
  const formattedSeconds = `0${seconds % 60}`.slice(-2);
  const isResendEnabled = seconds === 0;

  const handleResendCode = useCallback(() => {
    if (handleRequestOtp) {
      handleRequestOtp();
    }
    if (isResendEnabled) {
      setSeconds(INITIAL_SECONDS);
    }
  }, [isResendEnabled, handleRequestOtp]);

  return (
    <ResetPasswordContainer>
      <Button
        variant="contained"
        color="neutral"
        sx={{
          paddingX: '8px',
          color: 'neutral.500',
        }}
        onClick={onBack}
        startIcon={<LeftIcon />}
      >
        Back
      </Button>
      <form ref={form} method="POST" data-cy="form" onSubmit={formik.handleSubmit} noValidate>
        <input type="text" hidden name="action" value="verify-otp" />
        {sessionId && <input type="text" hidden name="sessionId" value={sessionId} />}
        <Box my={4}>
          <Typography variant="overline" component="h1" mb={1}>
            2 Factor Authentication
          </Typography>
          <Typography variant="body2" component="p">
            You have enabled 2 factor authentication on your contact via {FA_TYPES[method]}. Please enter the login code
            that was sent to <strong>{contact}</strong>.
          </Typography>
          <Typography
            mt={3}
            sx={{
              textAlign: 'right',
              fontWeight: 600,
              color: isResendEnabled ? theme.palette.chart?.blue4 : formatHexToRGBA(theme.palette.disabled.main, 0.4),
              cursor: isResendEnabled ? 'pointer' : '',
            }}
            onClick={handleResendCode}
          >
            Resend code {!isResendEnabled && `(${minute}:${formattedSeconds})`}
          </Typography>
        </Box>
        <TextField fullWidth label="Login Code" type="text" error={Boolean(errors.otp)} {...getFieldProps('otp')} />
        {isInvalidOTP && <InvalidPanelComponent message="Invalid login code" />}
        <Button fullWidth type="submit" disabled={Boolean(Object.keys(errors).length > 0) || values.otp === ''}>
          Submit
        </Button>
      </form>
    </ResetPasswordContainer>
  );
};
export default AvixoTwoFAForm;
