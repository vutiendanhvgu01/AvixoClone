interface AuthFormProps {
  authType?: 'login' | ' register';
  submitLabel?: string;
  invalid: boolean;
  title?: string;
  subtitle?: string;
  contact?: string;
}

export interface LoginValues {
  username: string;
  password: string;
}
export type RegisterValues = LoginValues;

export default AuthFormProps;
