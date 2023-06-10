import * as Yup from 'yup';

const PhoneNumberFormSchema = Yup.object().shape({
  phoneNumber: Yup.string(),
  countryCode: Yup.string(),
});

export default PhoneNumberFormSchema;
