import * as Yup from 'yup';

const EmailFormSchema = Yup.object().shape({
  email: Yup.string().email(),
});

export default EmailFormSchema;
