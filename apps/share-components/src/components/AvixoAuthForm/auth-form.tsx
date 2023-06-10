import { Box, Button, InputLabel, Link as LinkMui, OutlinedInput, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import AuthFormProps, { LoginValues, RegisterValues } from './auth-form-types';
import { FormControlAuth, TextError } from './components/commons';
import TextFieldPassword from './components/commons/text-field-password';
import InvalidPanelComponent from './invalid-panel';
import PanelSupportComponent from './panel-support';
import { LoginSchema, RegisterSchema } from './schema';

const primaryColorForm = '#111827';

const LoginForm = styled('form')(({ theme }) => ({
  padding: 32,
  background: 'white',
  width: 414,
  borderRadius: 16,
  [theme.breakpoints.down('sm')]: {
    width: 345,
    padding: '40px 24px 24px 24px',
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary?.main,
  height: 48,
  borderRadius: 8,
  fontSize: 16,
  lineHeight: '26px',
  fontWeight: 600,
}));
const TextBase = styled(Typography)(({ theme }) => ({
  display: 'contents',
  letterSpacing: '-0.0183em',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
    lineHeight: '24px',
    display: 'block',
  },
}));
const LinkAuth = styled(LinkMui)(({ theme }) => ({
  color: '#0C7CD5',
  fontSize: 14,
  lineHeight: '22px',
  marginTop: 32,
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: {
    display: 'inline',
    lineHeight: '24px',
    marginTop: 16,
    fontSize: 16,
  },
  cursor: 'pointer',
  letterSpacing: '-0.02em',
}));
export const LoginTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 32,
  color: primaryColorForm,
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

export const LoginSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  color: '#6B7280',
  marginTop: 8,
  marginBottom: 32,

  [theme.breakpoints.down('sm')]: {
    marginBottom: 24,
    textAlign: 'center',
  },
}));
const TermSection = styled(Box)(({ theme }) => ({
  marginTop: 32,
  [theme.breakpoints.down('sm')]: {
    marginTop: 24,
  },
}));

const loginValues: LoginValues = {
  username: '',
  password: '',
};
const registerValues: RegisterValues = {
  username: '',
  password: '',
  /**
   * please add more field when implement
   * ...
   *  */
};

const AvixoAuthForm: FC<AuthFormProps> = props => {
  const {
    authType = 'login',
    submitLabel = 'Login',
    invalid = false,
    title = 'Log in',
    subtitle = '',
    contact,
  } = props;
  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(invalid);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(false);
  const initialValues = authType === 'login' ? loginValues : registerValues;
  const schema = authType === 'login' ? LoginSchema : RegisterSchema;

  const setPanel = useCallback((open = true) => {
    setIsForgotPassword(open);
    setIsLoginFailed(!open);
  }, []);

  const handleClickOpenForgotPassword = useCallback(() => {
    setPanel();
  }, [setPanel]);

  const handleLoginFailed = useCallback(() => {
    setPanel(false);
    setIsLoginFailed(true);
  }, [setPanel]);

  useEffect(() => {
    if (invalid) {
      handleLoginFailed();
    }
  }, [invalid]);

  // declare to require of formik's type, in fact we never run this function
  const onSubmit = useCallback((values: typeof initialValues, { setValues }: any) => {
    setValues(values);
  }, []);

  const handleSubmitWithFormik = useCallback(
    (values: typeof initialValues, errors: any, handleSubmit: any) =>
      (e: FormEvent<HTMLFormElement>): void => {
        const haveErrors = Object.keys(errors).length > 0;
        if (haveErrors || values.username === '' || values.password === '') {
          e.preventDefault();
          handleSubmit();
        }
      },
    [],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
      {({ errors, touched, handleChange, handleSubmit, values }) => (
        <LoginForm
          method="POST"
          action="login"
          data-cy="form"
          onSubmit={handleSubmitWithFormik(values, errors, handleSubmit)}
        >
          <input hidden name="action" value="login" />
          <Stack>
            <LoginTitle variant="h4" style={{ whiteSpace: 'pre-wrap' }}>
              {title}
            </LoginTitle>
            <LoginSubtitle variant="subtitle1">{subtitle}</LoginSubtitle>
            <FormControlAuth>
              <InputLabel htmlFor="component-outlined">Email</InputLabel>
              <OutlinedInput
                label="Email"
                name="username"
                inputProps={{
                  'data-cy': 'username',
                }}
                onChange={handleChange}
                error={!!(touched.username && errors.username)}
              />
              {!!(touched.username && errors.username) && <TextError error>{errors.username}</TextError>}
            </FormControlAuth>
            <TextFieldPassword
              error={!!(touched.password && errors.password)}
              errorText={errors.password}
              onChange={handleChange}
            />
            {isLoginFailed && <InvalidPanelComponent message="Invalid credentials" />}
            {isAccountLocked && (
              <InvalidPanelComponent message="Your account has been locked due to multiple failed login attempts. To regain access, please reach out to your system administrator for further information and assistance." />
            )}
            {isForgotPassword && <PanelSupportComponent contact={contact} />}
            <LoginButton data-cy="submit" type="submit">
              {submitLabel}
            </LoginButton>
            <TermSection>
              <TextBase>By logging in, you agree to our </TextBase>
              <LinkAuth mt={0} href="#" underline="always">
                Terms of Service
              </LinkAuth>
            </TermSection>
            <LinkAuth onClick={handleClickOpenForgotPassword} mt={4} data-cy="forgot-password" underline="none">
              Forgot password?
            </LinkAuth>
          </Stack>
        </LoginForm>
      )}
    </Formik>
  );
};
export default React.memo(AvixoAuthForm);
