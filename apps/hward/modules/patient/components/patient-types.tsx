import Yup from 'share-components/src/services/yup';
import 'yup-phone-lite';

export const PatientFormSchema = Yup.object({
  fullName: Yup.string().required('Must provide full name'),
  gender: Yup.string().oneOf(['Male', 'Female']).required('Must provide gender'),
  nric: Yup.string().isValidNRIC('Invalid NRIC').required(),
  birthdate: Yup.date().nullable(),
  contact: Yup.string().phone('SG', 'Invalid phone number').required('Must provide phone number'),
  alternativeContact: Yup.string().phone('SG', 'Invalid phone number'),
  address: Yup.object({
    fullAddress: Yup.string(),
    unit: Yup.string().nullable(),
    city: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
    coordinates: Yup.object({
      lat: Yup.number(),
      lng: Yup.number(),
    }),
  }),
});

export type PatientFormValues = Yup.InferType<typeof PatientFormSchema>;

export const initialPatientFormData: PatientFormValues = {
  fullName: '',
  gender: '',
  nric: '',
  birthdate: null,
  contact: '',
  alternativeContact: '',
  address: {
    fullAddress: '',
    unit: '',
    city: '',
    postalCode: '',
    country: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
};
