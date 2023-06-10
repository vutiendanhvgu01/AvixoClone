import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, styled, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { formatHexToRGBA } from '../../../utils/formatUtils';
import { REGEX_PASSWORDS } from '../constants';
import { NewPasswordFormSchema } from '../schema';
import { ResetPasswordContainer } from './commons';
import TextFieldPassword from './commons/text-field-password';
/**
 *  screen 3
 */
const Form = styled('form')(() => ({
  marginTop: 24,
  marginBottom: 24,
}));

const ListMessage = styled('ul')(() => ({
  padding: 0,
  listStyle: 'none',
}));

const IncludeMessageItem: FC<{
  validated?: boolean;
  text: string;
}> = ({ validated = false, text }) => {
  const theme = useTheme();
  return (
    <li
      style={{
        color: validated ? 'black' : formatHexToRGBA(theme.palette.disabled.main, 0.4),
      }}
    >
      <CheckIcon
        sx={{
          width: 16,
          height: 14,
          transform: 'translateY(2px)',
          color: validated ? theme.palette.secondary.main : formatHexToRGBA(theme.palette.disabled.main, 0.4),
        }}
      />
      <Typography variant="body2" component="span" ml={1}>
        {text}
      </Typography>
    </li>
  );
};

const AvixoNewPassword: FC = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: NewPasswordFormSchema,
    onSubmit: (values: { password: string; confirmPassword: string }, { setSubmitting }) => {
      console.log(values, 'values');
    },
  });

  const { getFieldProps, values, errors } = formik;

  const [rules, setRules] = useState(REGEX_PASSWORDS);
  useEffect(() => {
    const test = rules.map(a => {
      const regex = new RegExp(a.pattern);
      return {
        ...a,
        validated: regex.test(values.password),
      };
    });
    setRules(test);
  }, [values.password]);
  return (
    <ResetPasswordContainer>
      <Box>
        <Typography variant="overline" component="h1">
          Enter new Password
        </Typography>
      </Box>
      <Form onSubmit={formik.handleSubmit}>
        <TextFieldPassword {...getFieldProps('password')} error={Boolean(errors.password)} />
        <TextFieldPassword
          {...getFieldProps('confirmPassword')}
          label="Confirm Password"
          error={Boolean(errors.confirmPassword)}
        />
        <Button fullWidth type="submit">
          Reset Password
        </Button>
      </Form>
      <ListMessage
        style={{
          listStyle: 'none',
        }}
      >
        {Array.isArray(rules) &&
          rules.map(rule => <IncludeMessageItem key={rule.message} text={rule.message} validated={rule.validated} />)}
      </ListMessage>
    </ResetPasswordContainer>
  );
};
export default AvixoNewPassword;
