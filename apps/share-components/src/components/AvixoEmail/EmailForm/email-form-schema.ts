import * as Yup from 'yup';

const EmailFormSchema = Yup.object().shape({
  email: Yup.string(),
});

export default EmailFormSchema;
