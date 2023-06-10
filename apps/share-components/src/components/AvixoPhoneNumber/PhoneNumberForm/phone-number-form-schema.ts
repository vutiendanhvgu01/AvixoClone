import * as Yup from 'yup';

const PhoneNumberFormSchema = Yup.object().shape({
  countryCode: Yup.string(),
  number: Yup.string(),
});

export default PhoneNumberFormSchema;
