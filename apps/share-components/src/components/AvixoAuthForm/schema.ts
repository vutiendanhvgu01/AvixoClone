import yup from '../../services/yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().min(5, 'Username is too short - should be 5 chars minimum.').required('Required'),
  password: yup.string().min(5, 'Password is too short - should be 5 chars minimum.').required('Required'),
});

export const RegisterSchema = yup.object().shape({
  username: yup.string().min(5, 'Username is too short - should be 5 chars minimum.').required('Required'),
  password: yup.string().min(5, 'Password is too short - should be 5 chars minimum.').required('Required'),
});

export const NewPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Required')
    .matches(/[a-z]+/, 'At least 1 lower case letter')
    .matches(/[A-Z]+/, 'At least 1 upper case letter')
    .matches(/[@$!%*#?&]+/, 'At least 1 special character')
    .matches(/\d+/, 'At least 1 numeric character')
    .matches(/[a-zA-Z0-9]{12}/, 'At least 12 alphanumeric characters'),
  confirmPassword: yup.string().when('password', {
    is: (val: string) => !!(val && val.length > 0),
    then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),
});

export default LoginSchema;
